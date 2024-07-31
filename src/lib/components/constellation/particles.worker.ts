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

    // formula for graviation force between two particles
    // F = G * m1 * m2 / r^2
    // where G is the gravitational constant
    // m1 and m2 are the massses of the gravity well and particle
    // r is the distance between the gravity well and the particle
    // 
    // if we assume G=1 and m1=1 then the formula simplifies to
    // F = m2 / r^2
    // assumes gravity = 1 and particle mass = 1
    const gravityWellMass = 568260; // 516600; // 600000; //258300 * 2 = 516600
    
    // if the gravity well is turned on, then attract everything
    // this is just for fun!
    const minForce = 2400;

    // how the the particles slow down when no force is applied
    // the closer this is to 1 the less friction and the more particles
    // will slide without the presence of the gravity well
    const frictionScalar = 0.80; // 0.75;

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

        gravDx = vx * frictionScalar;
        gravDy = vy * frictionScalar;
        if(pointerDown) {
            gravDx = pointerX - x;
            gravDy = pointerY - y;
            dist = Math.sqrt(gravDx * gravDx + gravDy * gravDy);
            force = Math.min(minForce, gravityWellMass / (dist * dist));
            gravDx *= force / dist;
            gravDy *= force / dist;
        }

        particlesView[xi] = x + gravDx * dt;
        particlesView[yi] = y + gravDy * dt;
        particlesView[vxi] = gravDx;
        particlesView[vyi] = gravDy;
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
            Math.min(255, (Atomics.load(renderingView, index) + 25 + (50 * rx)))
        );

        // green
        Atomics.store(
            renderingView,
            index + 1,
            Math.min(255, (Atomics.load(renderingView, index + 1) + 25 + (50 * ry)))
        );

        // blue
        Atomics.store(
            renderingView,
            index + 2,
            Math.min(255, (Atomics.load(renderingView, index + 2) + 25 + (50 * (1-rx))))
        );

        // alpha  
        Atomics.store(renderingView, index + 3, 255);                    
    }    

    const responseData: ParticleWorkerResponseData = {id};
    self.postMessage(responseData);
});

