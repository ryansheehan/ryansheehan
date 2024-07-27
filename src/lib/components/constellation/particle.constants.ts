export const maxWorkers = 4;
export const particleCount = 100_000;
export const stride = 4; // 4 floats x,y,dx,dy
export const byteStride = stride * 4; // 4 bytes per float
export const renderingStride = 4; // 4 bytes per pixel (r,g,b,a)
export const particlesState = new SharedArrayBuffer(particleCount * byteStride);

// shared variables:
export const sharedVariables = new SharedArrayBuffer(
    1 + // uint8: backBuffer
    1 + // uint8: stride
    1 + // uint8: byteStride
    1 + // uint8: renderingStride
    2 + // uint16: width
    2 + // uint16: height    
    8   // double: dt 
);

export function buildSharedViews(sharedVars: SharedArrayBuffer): [Uint8Array, Uint16Array, Float64Array] {
    return [
        new Uint8Array(sharedVars), 
        new Uint16Array(sharedVars, 4), 
        new Float64Array(sharedVars, 8)
    ];
}

export interface ParticleWorkerData {
    id: number;
    particleCount: number;
    particleOffset: number;
    sharedVariables: SharedArrayBuffer;
    particlesState: SharedArrayBuffer;
    renderingBuffers: [SharedArrayBuffer, SharedArrayBuffer];
}

export interface ParticleWorkerResponseData {
    id: number;
}


export function parseSharedVariables(vars: SharedArrayBuffer, uint8View: Uint8Array, uint16View: Uint16Array, float64View: Float64Array) {
    const [backBuffer, stride, byteStride, renderingStride] = uint8View;
    const [width, height] = uint16View;
    const [dt] = float64View;

    return {
        backBuffer,
        stride,
        byteStride,
        renderingStride,
        width,
        height,
        dt
    }
}

export function buildRenderingBuffers(w: number, h: number):[SharedArrayBuffer, SharedArrayBuffer]  {
    return [new SharedArrayBuffer(w * h * renderingStride), new SharedArrayBuffer(w * h * renderingStride)];
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
