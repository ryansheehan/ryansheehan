import {parseSharedVariables, buildSharedViews, type ParticleWorkerData, type ParticleWorkerResponseData} from './particle.constants';

let hasNoSharedViews = true;
let sharedUint8ArrayView: Uint8Array;
let sharedUint16ArrayView: Uint16Array;
let sharedFloat64ArrayView: Float64Array;

addEventListener('message', ({data}: MessageEvent<ParticleWorkerData>) => {    
    const {
        id,
        particleCount,
        particleOffset,
        sharedVariables,
        particlesBuffer,
        renderingBuffers,
    } = data;

    if (hasNoSharedViews) {
        [
            sharedUint8ArrayView, 
            sharedUint16ArrayView, 
            sharedFloat64ArrayView
        ] = buildSharedViews(sharedVariables);
        hasNoSharedViews = false;
    }

    const {backBuffer, stride, byteStride, width, height, dt} = parseSharedVariables(sharedUint8ArrayView, sharedUint16ArrayView, sharedFloat64ArrayView);
    
    const particlesView = new Float32Array(particlesBuffer, particleOffset * byteStride, particleCount * stride);
    const renderingView = new Uint8Array(renderingBuffers[backBuffer]);

    // update particles
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

    // draw particles
    for (let i = 0; i < particleCount; i++) {
        const x = particlesView[i * stride + 0];
        const y = particlesView[i * stride + 1];
        if ((x < 0 || x >= width) || (y < 0 || y >= height)) continue;
        const index = ((y|0) * width + (x|0)) * 4;         
    
        const rx = x / width;
        const ry = y / height;

        Atomics.add(renderingView, index    , 25 + 50 * rx);        // red
        Atomics.add(renderingView, index + 1, 25 + 50 * ry);        // green
        Atomics.add(renderingView, index + 2, 25 + 50 * (1-rx));    // blue

        Atomics.store(renderingView, index + 3, 255);              // alpha

        // renderingView[index    ] += 25 + 50 * rx; // red
        // renderingView[index + 1] += 25 + 50 * ry; // green
        // renderingView[index + 2] += 25 + 50 * (1-rx); // blue
        // renderingView[index + 3] = 255; // alpha
                
        // renderingView[index    ] = renderingView[index + 1] = renderingView[index + 2] = renderingView[index + 3] = 255;
    }    

    const responseData: ParticleWorkerResponseData = {id};
    self.postMessage(responseData);
});

