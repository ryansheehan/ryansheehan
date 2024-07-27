<script lang="ts">
    import {onMount, onDestroy} from 'svelte';    
    import {
        maxWorkers,
        particleCount, 
        stride, byteStride, 
        renderingStride, 
        particlesState, 
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
    } from './particle.constants';
    import ParticleWorker from './particles.worker?worker';

    const [
        sharedUint8ArrayView,
        sharedUint16ArrayView,
        sharedFloat64ArrayView,
    ] = buildSharedViews(sharedVariables);

    const particlesView = new Float32Array(particlesState);

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
    const particleBlockSize = particleCount / maxWorkers;

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
                        particlesState,
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
        width = parentElement.clientWidth;
        height = parentElement.clientHeight;
        
        const resizeObserver = new ResizeObserver(([ele]) => {
            const {contentRect} = ele;
            const {width: containerWidth, height: containerHeight} = contentRect;
            if (width !== containerWidth) width = containerWidth;
            if (height !== containerHeight) height = containerHeight;           
        });
        resizeObserver.observe(parentElement);

        initRenderingBuffers(width, height);

        workers = Array.from({length: maxWorkers}, () => new ParticleWorker());
        workers.forEach(worker => worker.addEventListener('message', workerResponseHandler));

        startSimulation();

        cleanUp = () => {
            cancelAnimationFrame(animFrameHandle);
            resizeObserver.disconnect();  
            for(const worker of workers) {
                worker.terminate();
            }            
        };

    })

    onDestroy(() => {
        cleanUp();
    })

    function resetParticlesState(w: number, h: number) {
        for (let i = 0; i < particleCount; i++) {
            particlesView[i * stride + 0] = Math.random() * width; // x
            particlesView[i * stride + 1] = Math.random() * height; // y
            particlesView[i * stride + 2] = (Math.random() * 2 - 1) * 10; // dx
            particlesView[i * stride + 3] = (Math.random() * 2 - 1) * 10; // dy
        }
    }

    function initRenderingBuffers(w: number, h: number) {
        renderingBuffers = buildRenderingBuffers(w, h);
        renderingBufferViews = [new Uint8ClampedArray(renderingBuffers[0]), new Uint8ClampedArray(renderingBuffers[1])];
        imageData = new ImageData(w, h);
        setWidthHeight(w, h, sharedUint16ArrayView);

        // the world size has changed, so we should reset the particles state as well
        resetParticlesState(w, h);
    }

    $effect(() => {
        canvas!.width = width;
        canvas!.height = height;

        initRenderingBuffers(width, height);                
    });
  
</script>

<canvas class="full-width" bind:this={canvas}></canvas>

<style>
    canvas {        
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: -100;
    }
</style>