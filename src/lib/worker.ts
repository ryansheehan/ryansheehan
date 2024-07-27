addEventListener('message', ({data}: MessageEvent<{n: number}>) => {
    postMessage({result: data.n * data.n});
});