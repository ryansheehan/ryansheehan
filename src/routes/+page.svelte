<script lang="ts">
    import Hero from '$lib/components/hero.svelte';
    import WorkTimeline from '$lib/components/work-timeline.svelte';
    // import {onMount} from 'svelte';
    // import Worker from '$lib/worker?worker';

    // onMount(() => {
    //     console.log('Worker created');
    //     const worker = new Worker();
    //     worker.addEventListener('message', ({data}: MessageEvent<{result: number}>) => {
    //         console.log('Worker replied: ', data.result);
    //     });
    //     console.log('Sending message to worker');
    //     worker.postMessage({n: 8});
    // });
</script>

<article class="content-grid">
    <Hero skipTarget="#work-timeline"/>    
    <WorkTimeline id="work-timeline"/>
</article>

<style>
    
</style>


