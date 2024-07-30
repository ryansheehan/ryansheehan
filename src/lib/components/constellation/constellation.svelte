<script lang="ts">
    import {onMount, onDestroy} from 'svelte';    
    import {
        maxWorkers,
        stride, byteStride, 
        renderingStride,         
        sharedVariables,
        setWidthHeight,
        buildRenderingBuffers,
        type ParticleWorkerData,
		type ParticleWorkerResponseData,
	 	getBackBuffer,
	 	setBackBuffer,
		setDeltaTime, 
        setConstants,
        buildSharedViews,    
        buildBlockAlignedBuffer,
		initializeParticlesState,
		setPointerPosition,
		setPointerDown,           
    } from './particle.constants';
    import ParticleWorker from './particles.worker?worker';

    const [
        sharedUint8ArrayView,
        sharedUint16ArrayView,
        sharedFloat64ArrayView,
    ] = buildSharedViews(sharedVariables);    

    // initialize fixed constants for shared memory
    setConstants(stride, byteStride, renderingStride, sharedUint8ArrayView);
    
    let width = $state(0);
    let height = $state(0);
    let canvas = $state<HTMLCanvasElement>();
    let ctx = $derived(canvas?.getContext('2d')!);    

    let renderingBuffers: [SharedArrayBuffer, SharedArrayBuffer];
    let renderingBufferViews: [Uint8ClampedArray, Uint8ClampedArray];
    let imageData: ImageData;

    let cleanUp: () => void = () => {};
    
    let activeWorkers = 0;
    let workers: Worker[]; 
    let particlesCount: number;
    let particlesBuffer: SharedArrayBuffer;    
    let particlesView:Float32Array;
    let particleBlockSize: number;

    function workerResponseHandler({data}: MessageEvent<ParticleWorkerResponseData>) {
        const {id} = data;
        activeWorkers--;
    }

    let animFrameHandle = -1;
    function startSimulation() {        
        let lastTime: DOMHighResTimeStamp;

        function runSimulation(currentTime: DOMHighResTimeStamp) {
            if (activeWorkers === 0) {  
                const dt = (currentTime - lastTime) / 1000;              
                setDeltaTime((currentTime - lastTime) / 1000, sharedFloat64ArrayView);
                lastTime = currentTime;            

                // get the current back buffer to render
                let backBufferIndex = getBackBuffer(sharedUint8ArrayView);             
                const frontBuffer = renderingBufferViews[backBufferIndex];

                // swap the back buffer index
                backBufferIndex ^= 1;
                setBackBuffer(backBufferIndex, sharedUint8ArrayView);

                // clear the new back buffer
                renderingBufferViews[backBufferIndex].fill(0);                

                // notify workers to process the current simulation frame         
                for(let id = 0; id < maxWorkers; id++) {
                    const frameData: ParticleWorkerData = {
                        id,
                        particleCount: particleBlockSize,
                        particleOffset: id * particleBlockSize,
                        sharedVariables,
                        particlesBuffer,
                        renderingBuffers,
                    };
                    workers[id].postMessage(frameData);
                }
                activeWorkers = maxWorkers;                 

                // render the simulation frame                   
                imageData.data.set(frontBuffer);
                ctx.putImageData(imageData, 0, 0);
            }
            animFrameHandle = requestAnimationFrame(runSimulation);    
        }

        // start the simulation!
        lastTime = performance.now();
        runSimulation(lastTime);
    }

    onMount(() => {
        const parentElement = canvas!.parentElement!;
        width = Math.floor(parentElement.clientWidth);
        height = Math.floor(parentElement.clientHeight);
        
        const resizeObserver = new ResizeObserver(([ele]) => {
            const {contentRect} = ele;
            const {width: containerWidth, height: containerHeight} = contentRect;
            if (width !== containerWidth) width = Math.floor(containerWidth);
            if (height !== containerHeight) height = Math.floor(containerHeight);           
        });
        resizeObserver.observe(parentElement);

        initWorld(width, height);

        workers = Array.from({length: maxWorkers}, () => new ParticleWorker());
        workers.forEach(worker => worker.addEventListener('message', workerResponseHandler));

        document.addEventListener('mousemove', mouseMove);
        document.addEventListener('touchmove', touchMove);

        cleanUp = () => {
            cancelAnimationFrame(animFrameHandle);
            resizeObserver.disconnect();  
            for(const worker of workers) {
                worker.terminate();
            } 
            document.removeEventListener('mousemove', mouseMove);
            document.removeEventListener('touchmove', touchMove);
        };

        startSimulation();
    })

    onDestroy(() => {
        cleanUp();
    })

    function initWorld(w: number, h: number) {        
        renderingBuffers = buildRenderingBuffers(w, h);
        renderingBufferViews = [new Uint8ClampedArray(renderingBuffers[0]), new Uint8ClampedArray(renderingBuffers[1])];
        imageData = new ImageData(w, h);
        setWidthHeight(w, h, sharedUint16ArrayView);

        // the world size has changed, so we should reset the particles state as well
        const {count, buffer} = buildBlockAlignedBuffer(w, h, 0.25);
        particlesCount = count;
        particleBlockSize = count / maxWorkers;
        particlesBuffer = buffer;
        particlesView = new Float32Array(particlesBuffer);
        initializeParticlesState(particlesView, w, h, 10);
    }

    $effect(() => {
        canvas!.width = width;
        canvas!.height = height;

        initWorld(Math.floor(width), Math.floor(height));                
    });

    export function reset() {
        initializeParticlesState(particlesView, width, height, 10);
    }
  
    function calculatePosition(tx: number, ty: number) {
        if(!canvas || !ctx) return;

        const {left, top} = canvas?.getBoundingClientRect()!;
        const cx = tx - left;
        const cy = ty - top;

        const inverseMatrix = ctx?.getTransform()

        const x = inverseMatrix.a * cx + inverseMatrix.c * cy + inverseMatrix.e;
        const y = inverseMatrix.b * cx + inverseMatrix.d * cy + inverseMatrix.f;

        setPointerPosition(x, y, sharedUint16ArrayView);
    }

    function mouseMove({clientX, clientY}: MouseEvent) {
        calculatePosition(clientX, clientY);
    }

    function mouseDown({button}: MouseEvent) {
        if (button === 0) {
            setPointerDown(true, sharedUint8ArrayView);
        }
    }

    function mouseUp({button}: MouseEvent) {
        if (button === 0) {
            setPointerDown(false, sharedUint8ArrayView);
        }
    }

    function touchStart({touches}: TouchEvent) {        
        const {clientX, clientY} = touches[0];
        calculatePosition(clientX, clientY);              
        setPointerDown(true, sharedUint8ArrayView);
    }

    function touchEnd(e: TouchEvent) {
        setPointerDown(false, sharedUint8ArrayView);
    }

    function touchMove({touches}: TouchEvent) {              
        const {clientX, clientY} = touches[0];
        calculatePosition(clientX, clientY);
    }
</script>

<canvas class="full-width" 
    bind:this={canvas}     
    ontouchstart={touchStart}
    ontouchend={touchEnd}        
    onmousedown={mouseDown}
    
    aria-label="Particle simulation with thousands of particles that fall into the touch/mouse position when clicked."
></canvas>

<svelte:window onmouseup={mouseUp} />

<style>
    canvas {            
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;  
        touch-action: none;      
    }
</style>