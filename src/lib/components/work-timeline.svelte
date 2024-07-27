<script lang="ts">
    import Marker from './timeline/marker.svelte';
    import Timeline from './timeline/timeline.svelte';

    const currentYear = (new Date()).getFullYear().toString();
</script>

<Timeline class="work-timeline">
    <Marker year={currentYear} active>
        <h2>Software Development Manager</h2>
        <p class="description">Lead a cross-functional team of application developers, user experience designers, systems architects, and infrastructure engineers, delivering Tyler's cloud platform control plane. Directed the development of Tyler's Forge UX design system.</p>
    </Marker>
    <Marker year="2020">
        <h2>Lead Software Engineer</h2>
        <p class="description">Guide the development of robust web applications through technical leadership, mentoring, and hands-on coding. Champion cutting-edge technologies and blaze the trail for Tyler's cloud transformation.</p>
    </Marker>
    <Marker year="2016">
        <h2>Scrum Master / Senior Engineer</h2>
        <p class="description">Initially hired as a senior engineer, then moved into the role of Scrum Master. Responsible for leading a team of developers in agile practices, modernizing a primary product's financial system.</p>
    </Marker>
    <Marker year="2013">
        <h2>Software Engineer</h2>
        <p class="description">Consulted on applying game development technology and techniques to build a 3D real-time down-hole well-monitoring technology. Design and built a process tracking application to manage sign-offs and procedures for teams in the field.</p>
    </Marker>
    <Marker year="2010">
        <h2>Software Engineer</h2>
        <p class="description">Consulted on applying game development technology and techniques to build a 3D real-time down-hole well-monitoring technology. Design and built a process tracking application to manage sign-offs and procedures for teams in the field.</p>
    </Marker>
    <Marker year="2008"></Marker>
</Timeline>

<style>
    :global(.work-timeline) {
        --timeline-size: var(--size-8);
        --timeline-marker-height: 300px;        
    }

    h2 {
        max-inline-size: var(--size-header-3);
        text-align: end;
        margin-inline-start: auto;

        font-size: var(--font-size-3);
        line-height: var(--line-height-3);
        font-weight: var(--font-weight-6);        
    }

    p.description {
        max-inline-size: var(--size-content-2);
        text-align: justify;        
    }
</style>