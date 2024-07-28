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

    const {backBuffer, stride, byteStride, width, height, dt, pointerDown, pointerX, pointerY} = parseSharedVariables(sharedUint8ArrayView, sharedUint16ArrayView, sharedFloat64ArrayView);
    
    const particlesView = new Float32Array(particlesBuffer, particleOffset * byteStride, particleCount * stride);
    const renderingView = new Uint8Array(renderingBuffers[backBuffer]);

    // update particles
    // for(let i = 0; i < particleCount; i++) {
    //     particlesView[i * stride + 0] += particlesView[i * stride + 2] * dt;
    //     particlesView[i * stride + 1] += particlesView[i * stride + 3] * dt;

    //     // bounce particles off the walls
    //     if (particlesView[i * stride + 0] < 0 || particlesView[i * stride + 0] >= width) {
    //         particlesView[i * stride + 2] *= -1;
    //     }
    //     if (particlesView[i * stride + 1] < 0 || particlesView[i * stride + 1] >= height) {
    //         particlesView[i * stride + 3] *= -1;
    //     }
    // }

    let x, xi, y, yi, vx, vxi, vy, vyi, gravDx, gravDy, dist, force: number;

    // update particles
    for(let i = 0; i < particleCount; i++) {
        xi = i * stride + 0;
        yi = i * stride + 1;
        vxi = i * stride + 2;
        vyi = i * stride + 3;

        x = particlesView[xi];
        y = particlesView[yi];
        vx = particlesView[vxi];
        vy = particlesView[vyi];

        gravDx = vx * 0.9;
        gravDy = vy * 0.9;
        if(pointerDown) {
            gravDx = pointerX - x;
            gravDy = pointerY - y;
            dist = Math.sqrt(gravDx * gravDx + gravDy * gravDy);
            force = 2 * Math.min(1200, 258300 / (dist * dist));
            gravDx *= force / dist;
            gravDy *= force / dist;
        }

        // particlesView[i * stride + 0] += particlesView[i * stride + 2] * dt;
        // particlesView[i * stride + 1] += particlesView[i * stride + 3] * dt;
        particlesView[xi] = x + gravDx * dt;
        particlesView[yi] = y + gravDy * dt;
        particlesView[vxi] = gravDx;
        particlesView[vyi] = gravDy;

        // bounce particles off the walls
        // if (particlesView[i * stride + 0] < 0 || particlesView[i * stride + 0] >= width) {
        //     particlesView[i * stride + 2] *= -1;
        // }
        // if (particlesView[i * stride + 1] < 0 || particlesView[i * stride + 1] >= height) {
        //     particlesView[i * stride + 3] *= -1;
        // }
    }

    // draw particles
    for (let i = 0; i < particleCount; i++) {
        const x = particlesView[i * stride + 0];
        const y = particlesView[i * stride + 1];
        if ((x < 0 || x >= width) || (y < 0 || y >= height)) continue;
        const index = ((y|0) * width + (x|0)) * 4;         
    
        const rx = x / width;
        const ry = y / height;

        // red
        Atomics.store(
            renderingView,
            index,
            Math.min(255, Atomics.load(renderingView, index) + 25 + 50 * rx)
        );

        // green
        Atomics.store(
            renderingView,
            index + 1,
            Math.min(255, Atomics.load(renderingView, index + 1) + 25 + 50 * ry)
        );

        // blue
        Atomics.store(
            renderingView,
            index + 2,
            Math.min(255, Atomics.load(renderingView, index + 2) + 25 + 50 * (1-rx))
        );

        // alpha  
        Atomics.store(renderingView, index + 3, 255);                    
    }    

    const responseData: ParticleWorkerResponseData = {id};
    self.postMessage(responseData);
});

