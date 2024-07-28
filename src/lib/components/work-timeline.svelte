<script lang="ts">
    import Marker from './timeline/marker.svelte';
    import Timeline from './timeline/timeline.svelte';

    const currentYear = (new Date()).getFullYear().toString();
</script>

<section>
    <h2>Professional Timeline</h2>
    <Timeline class="work-timeline">
        <Marker year="2024" active>
            <hgroup>
                <h3>Executive MBA</h3>
                <p><a href="https://www.smu.edu/cox/business-degrees/mba-programs/executive-mba/curriculum">Southern Methodist University</a></p>
            </hgroup>
            <!-- <p class="description">Lead a cross-functional team of application developers, user experience designers, systems architects, and infrastructure engineers, delivering Tyler's cloud platform control plane. Directed the development of Tyler's Forge UX design system.</p> -->
        </Marker>
        <Marker year="2020" active>
            <hgroup>
                <h3>Software Development Manager</h3>
                <p><a href="https://www.tylertech.com/">Tyler Technologies</a></p>
            </hgroup>
            <p class="description">Lead a cross-functional team of application developers, user experience designers, systems architects, and infrastructure engineers, delivering Tyler's cloud platform control plane. Directed the development of Tyler's Forge UX design system.</p>
        </Marker>
        <Marker year="2016">
            <hgroup>
                <h3>Lead Software Engineer</h3>
                <p><a href="https://www.tylertech.com/">Tyler Technologies</a></p>
            </hgroup>
            <p class="description">Guide the development of robust web applications through technical leadership, mentoring, and hands-on coding. Champion cutting-edge technologies and blaze the trail for Tyler's cloud transformation.</p>
        </Marker>
        <Marker year="2013">
            <hgroup>
                <h3>Scrum Master / Senior Engineer</h3>
                <p><a href="https://www.tylertech.com/">Tyler Technologies</a></p>
            </hgroup>
            <p class="description">Initially hired as a senior engineer, then moved into the role of Scrum Master. Responsible for leading a team of developers in agile practices, modernizing a primary product's financial system.</p>
        </Marker>
        <Marker year="2010">
            <hgroup>
                <h3>Software Engineer Consultant</h3>
                <p><a href="https://www.halliburton.com/">Halliburton</a></p>
            </hgroup>
            <p class="description">Consulted on applying game development technology and techniques to build a 3D real-time down-hole well-monitoring technology. Design and built a process tracking application to manage sign-offs and procedures for teams in the field.</p>
        </Marker>
        <Marker year="2008">
            <hgroup>
                <h3>Software Engineer</h3>
                <p><a href="https://www.high-voltage.com/">High Voltage Software</a></p>
            </hgroup>
            <p class="description">Software engineer building cross-platform video games. Worked closely with artists, animators, audio engineers,designers, and testers to implement the vision for the look and feel of a title.</p>
        </Marker>
        <Marker year="2006">
            <hgroup>
                <h3>Masters Interactive Technology</h3>
                <p><a href="https://www.smu.edu/guildhall">SMU Guildhall</a></p>
            </hgroup>
        </Marker>

    </Timeline>
</section>

<style>
    :global(.work-timeline) {
        --timeline-size: var(--size-8);        
    }

    section {
        padding-block-start: var(--spacing-block-2);
    }

    h2 {
        font-size: var(--font-size-fluid-2);
        /* line-height: var(--line-height-6); */
        padding-bottom: var(--spacing-block-2);
    }

    hgroup {
        margin-bottom: var(--spacing-block-1);
    }

    hgroup h3 {
        max-inline-size: var(--size-header-3);        
        font-size: var(--font-size-3);
        line-height: var(--line-height-3);
        font-weight: var(--font-weight-6);        
    }

    hgroup p {
        font-style: italic;

        & a {            
            text-decoration: none;

            &:visited {
                color: var(--clr-text);
            }

            &:hover, &:focus {
                text-decoration: underline;
            }
        }
    }

    p.description {
        max-inline-size: var(--size-content-2);  
        padding-bottom: var(--spacing-block-2);         
        text-wrap: normal;
    }
</style>