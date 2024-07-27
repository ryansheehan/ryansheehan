import {particleCount, stride, particlesState} from './particle.constants';

export type RestartSimulationFn = (w: number, h: number, renderingContext: CanvasRenderingContext2D) => void;

export function startSimulation(w: number, h: number, renderContext: CanvasRenderingContext2D) {
    let lastTime: DOMHighResTimeStamp = 0;
    let animFrameHandle: number | null = null;
    
    const particlesView = new Float32Array(particlesState);

    let ctx = renderContext;
    let frameBuffer: [ImageData, ImageData];
    let backBuffer: number;
    let width: number;
    let height: number;


    function initializeSimulation(w: number, h: number, ctx: CanvasRenderingContext2D) {
        width = w;
        height = h;

        // initialize rendering buffers
        frameBuffer = [new ImageData(width, height), new ImageData(width, height)];
        frameBuffer[0].data.fill(0);
        frameBuffer[1].data.fill(0);
        backBuffer = 0;

        //initialize particles
        for (let i = 0; i < particleCount; i++) {
            particlesView[i * stride + 0] = Math.random() * width; // x
            particlesView[i * stride + 1] = Math.random() * height; // y
            particlesView[i * stride + 2] = (Math.random() * 2 - 1) * 10; // dx
            particlesView[i * stride + 3] = (Math.random() * 2 - 1) * 10; // dy
        }

        lastTime = performance.now();
    }

    function updateParticles(dt: number) {
        for(let i = 0; i < particleCount; i++) {
            particlesView[i * stride + 0] += particlesView[i * stride + 2] * dt;
            particlesView[i * stride + 1] += particlesView[i * stride + 3] * dt;

            // bounce particles off the walls
            if (particlesView[i * stride + 0] < 0 || particlesView[i * stride + 0] >= width) {
                particlesView[i * stride + 2] *= -1;
            }
            if (particlesView[i * stride + 1] < 0 || particlesView[i * stride + 1] >= height) {
                particlesView[i * stride + 3] *= -1;
            }
        }
    }

    function drawBuffer(buffer: ImageData) {
        buffer.data.fill(0);
        for (let i = 0; i < particleCount; i++) {
            const x = particlesView[i * stride + 0];
            const y = particlesView[i * stride + 1];
            if ((x < 0 || x >= width) || (y < 0 || y >= height)) continue;
            const index = ((y|0) * width + (x|0)) * 4;

            const rx = x / width;
            const ry = y / height;

            // buffer.data[index    ] += 25 + 50 * rx; // red
            // buffer.data[index + 1] += 25 + 50 * ry; // green
            // buffer.data[index + 2] += 25 + 50 * (1-rx); // blue
            // buffer.data[index + 3] = 255; // alpha

            buffer.data[index    ] += 145 + 50 * rx; // red
            buffer.data[index + 1] += 145 + 50 * ry; // green
            buffer.data[index + 2] += 145 + 50 * (1-rx); // blue
            buffer.data[index + 3] = 255; // alpha

            // buffer.data[index    ] = buffer.data[index + 1] = buffer.data[index + 2] = buffer.data[index + 3] = 255;
        }
        return buffer;
    }

    function renderBuffer(buffer: ImageData) {
        ctx.putImageData(buffer, 0, 0);
    }

    function runSimulation(currentTime: DOMHighResTimeStamp) {
        const dt = Math.min(1, (currentTime - lastTime) / 1000); // no more than 1 second for dt        

        lastTime = currentTime;
        updateParticles(dt);
        const buffer = drawBuffer(frameBuffer[backBuffer]);
        renderBuffer(buffer);
        backBuffer ^= 1;
        requestAnimationFrame(runSimulation);
    }

    function cleanUp() {
        if (animFrameHandle !== null) {
            cancelAnimationFrame(animFrameHandle);
            animFrameHandle = null;
        }
    }

    const restartSimulation: RestartSimulationFn = (w: number, h: number, renderingContext: CanvasRenderingContext2D) => {
        cleanUp();
        initializeSimulation(w, h, renderingContext);
        runSimulation(lastTime);
    }

    // restartSimulation(w, h, renderContext);

    return {
        restartSimulation,
        cleanUp,
    }
}
