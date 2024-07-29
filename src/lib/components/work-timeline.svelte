<script lang="ts">
    import Marker, {createActiveContext} from './timeline/marker.svelte';
    import Timeline from './timeline/timeline.svelte';

    import type {HTMLAttributes} from 'svelte/elements';

    interface Props extends HTMLAttributes<HTMLElement> {

    }
    const {...attrs}: Props = $props();

    const register = createActiveContext();
</script>

<section {...attrs}>
    <h2>Professional Timeline</h2>
    <Timeline class="work-timeline">
        <Marker {register} yearStart="2020" yearEnd="current" active>
            <hgroup>
                <h3 class="current">Software Development Manager</h3>
                <p><a href="https://www.tylertech.com/">Tyler Technologies</a></p>
            </hgroup>
            <p class="description">Lead a cross-functional team of application developers, user experience designers, systems architects, and infrastructure engineers to deliver Tyler's cloud platform control plane. Direct the development of Tyler's Forge UX design system built with standard web-components. Oversee development and maintenance of over a dozen web applications built on a variety of tech stacks.</p>
        </Marker>
        <Marker {register} yearStart="2022" yearEnd="2024">
            <hgroup>
                <h3>Executive MBA</h3>
                <p><a href="https://www.smu.edu/cox/business-degrees/mba-programs/executive-mba/curriculum">Southern Methodist University</a></p>
            </hgroup>            
            <p class="description">Courses: Accounting, Finance, Statistics, Operations Management, Decision Modeling, Marketing, Executive Leadership, Economics, Business Law, Strategic Financial Analysis, Negotiations, Entrepreneurship, War Games.</p>
            <p class="description">GPA: 3.818</p>
        </Marker>
        <Marker {register} yearStart="2016" yearEnd="2020">
            <hgroup>
                <h3>Lead Software Engineer</h3>
                <p><a href="https://www.tylertech.com/">Tyler Technologies</a></p>
            </hgroup>
            <p class="description">Guided the development of robust web applications through technical leadership, mentoring, and hands-on coding. Championed cutting-edge technologies and blazed the trail for Tyler's cloud transformation. Web applications were mostly built on DotNet Core and Angular, with isolated development environments through the use of Docker and Docker Compose.</p>
        </Marker>
        <Marker {register} yearStart="2014" yearEnd="2016">
            <hgroup>
                <h3>Scrum Master</h3>
                <p><a href="https://www.tylertech.com/">Tyler Technologies</a></p>
            </hgroup>
            <p class="description">Led a team of developers, testers, and analysts in Agile practices, modernizing a primary product's financial system. Developed a behavior-driven development framework to aid in testing between new and old systems, ensuring no net-new issues are introduced.</p>
        </Marker>
        <Marker {register} yearStart="2013" yearEnd="2014">
            <hgroup>
                <h3>Senior Engineer</h3>
                <p><a href="https://www.tylertech.com/">Tyler Technologies</a></p>
            </hgroup>
            <p class="description">Built an extensible jury selection product in WPF. Used Microsoft's Managed Extensibility Framework to modify business logic and user interfaces, facilitating jurisdicitional differences in the selection process.</p>
        </Marker>
        <Marker {register} yearStart="2010" yearEnd="2013">
            <hgroup>
                <h3>Software Engineer Consultant</h3>
                <p><a href="https://www.halliburton.com/">Halliburton</a></p>
            </hgroup>
            <p class="description">Consulted on applying the Unity Game Development engine. Merged enterprise UI techniques to build a 3D real-time down-hole oil well-monitoring application. Designed and built a process tracking application to manage sign-offs and procedures for teams in the field.</p>
        </Marker>
        <Marker {register} yearStart="2008" yearEnd="2010">
            <hgroup>
                <h3>Software Engineer</h3>
                <p><a href="https://www.high-voltage.com/">High Voltage Software</a></p>
            </hgroup>
            <p class="description">Engineered cross-platform video games for Nintendo Wii, Sony Playstation Portable, and Microsoft XBox360. Worked closely with artists, animators, audio engineers, designers, and testers to implement the vision for each product. Oversaw three titles through each platform certification process.</p>
        </Marker>
        <Marker {register} yearStart="2006" yearEnd="2008">
            <hgroup>
                <h3>Masters Interactive Technology</h3>
                <p><a href="https://www.smu.edu/guildhall">SMU Guildhall</a></p>
            </hgroup>
            <p class="description">Courses: Game Studies, Linear Algebra, Simulation Physics, Interactive Software, Production.</p>       
        </Marker>
        <Marker {register} yearStart="2001" yearEnd="2005">
            <hgroup>
                <h3>Bachelors Computer Science</h3>
                <p><a href="https://www.siue.edu/engineering/computer-science/">Southern Illinois University Edwardsville</a></p>
            </hgroup>
            <p class="description">Relevant Courses: Software Engineering, Microcontrollers, Robotics, Networking.</p>
        </Marker>
    </Timeline>
</section>

<style>
    :global(.work-timeline) {
        --timeline-size: var(--size-8);        
    }

    .current {
        /* font-weight: var(--font-weight-8); */
        color: var(--clr-primary);
    }

    section {
        padding-block-start: var(--spacing-block-2);
        scroll-margin-top: var(--spacing-block-3);
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
        line-height: var(--line-height-1);
        font-weight: var(--font-weight-6);  
        padding-bottom: var(--size-2);      
    }

    hgroup p {
        font-style: italic;

        & a:visited, & a:link, & a:active {
            color: var(--clr-text);            
        }

        & a:hover {
            color: var(--clr-accent);
        }
    }

    p.description {
        max-inline-size: var(--size-content-2);             
        text-wrap: normal;
    }
</style>