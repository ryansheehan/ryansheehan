export const maxWorkers = 4;
export const stride = 4; // 4 floats x,y,dx,dy
export const byteStride = stride * 4; // 4 bytes per float
export const renderingStride = 4; // 4 bytes per pixel (r,g,b,a)

// export const particleCount = 100_000;
// export const particlesState = new SharedArrayBuffer(particleCount * byteStride);

// initialize the particle memory block with random positions and velocities
// returns the FLoat32Array view of the shared memory
export function initializeParticlesState(particles: Float32Array, w: number, h: number, speed = 10) {    
    for (let i = 0;  i < particles.length; i++) {
        particles[i * stride + 0] = Math.random() * w;
        particles[i * stride + 1] = Math.random() * h;
        particles[i * stride + 2] = 0; // (Math.random() * 2 - 1) * speed;
        particles[i * stride + 3] = 0; // (Math.random() * 2 - 1) * speed;
    }
    return particles;
}

// generate a shared buffer aligned by the memStride and blockSize 
// to ensure the buffer can be evenly divided by the blockSize 
export function buildBlockAlignedBuffer(w: number, h: number, percent: number, blockSize = maxWorkers, memStride = byteStride) {
    const count = ((w * h * percent / blockSize) | 0) * blockSize;
    const buffer = new SharedArrayBuffer(count * memStride);
    return { count, buffer };
}

// shared variables:
export const sharedVariables = new SharedArrayBuffer(
    1 + // uint8: backBuffer
    1 + // uint8: stride
    1 + // uint8: byteStride
    1 + // uint8: renderingStride
    1 + // uint8: pointer down
    1 + // empty
    2 + // uint16: width
    2 + // uint16: height    
    2 + // uint16: pointer x
    2 + // uint16: pointer y    
    2 + // empty
    8   // double: dt 
);

export function buildSharedViews(sharedVars: SharedArrayBuffer): [Uint8Array, Uint16Array, Float64Array] {
    return [
        new Uint8Array(sharedVars), 
        new Uint16Array(sharedVars, 6), 
        new Float64Array(sharedVars, 16),

        // new Uint8Array(sharedVars), 
        // new Uint16Array(sharedVars, 4), 
        // new Float64Array(sharedVars, 8)
    ];
}

export interface ParticleWorkerData {
    id: number;
    particleCount: number;
    particleOffset: number;
    sharedVariables: SharedArrayBuffer;
    particlesBuffer: SharedArrayBuffer;    
    particleCountBuffers: [SharedArrayBuffer, SharedArrayBuffer];
}

export interface ParticleWorkerResponseData {
    id: number;
}


export function parseSharedVariables(uint8View: Uint8Array, uint16View: Uint16Array, float64View: Float64Array) {
    const [backBuffer, stride, byteStride, renderingStride, pointerDown] = uint8View;
    const [width, height, pointerX, pointerY] = uint16View;
    const [dt] = float64View;

    return {
        backBuffer,
        stride,
        byteStride,
        renderingStride,
        pointerDown,
        width,
        height,
        pointerX,
        pointerY,
        dt
    }
}

export function buildParticleCountBuffers(w: number, h: number):[SharedArrayBuffer, SharedArrayBuffer] {    
    return [
        new SharedArrayBuffer(w * h * 4),
        new SharedArrayBuffer(w * h * 4),
    ];     
}

export function setDeltaTime(dt: DOMHighResTimeStamp, float64View: Float64Array) {    
    float64View[0] = dt;
}

export function setBackBuffer(backBuffer: number, uint8View: Uint8Array) {        
    uint8View[0] = backBuffer;    
}

export function getBackBuffer(uint8View: Uint8Array) {    
    return uint8View[0];
}

export function setWidthHeight(width: number, height: number, uint16View: Uint16Array) {
    uint16View[0] = width;
    uint16View[1] = height;
}

export function setConstants(stride: number, byteStride: number, renderingStride: number, uint8View: Uint8Array) {
    uint8View[1] = stride;
    uint8View[2] = byteStride;
    uint8View[3] = renderingStride;
}

export function getPointerPosition(uint16View: Uint16Array): [number, number] {
    return [uint16View[2], uint16View[3]];
}

export function setPointerPosition(x: number, y: number, uint16View: Uint16Array) {
    uint16View[2] = x;
    uint16View[3] = y;
}

export function getPointerDown(uint8View: Uint8Array) {
    return uint8View[4];
}

export function setPointerDown(down: boolean, uint8View: Uint8Array) {
    uint8View[4] = down ? 1 : 0;
}