export interface Experience {
  company: string;
  title: string;    
  start: string;
  end?: string;
  achievements: string[];
}

export const experience: Experience[] = [
  {
    company: 'Tyler Technologies',
    title: 'Software Development Manager',      
    start: 'Nov 2019',
    achievements: [
      `Manage a team of 5 web application engineers`,
      `Responsible for the development and maintenance of 20 different web-applications and services`,
      `Lead a committee dedicated to promoting front-end practices across the organization`,
      `Train engineers across the organization on web-application technologies; primarily angular, dotnet core, and docker`,
      `Work with other managers and the CTO to set vision and direction for Tyler's transition to the cloud`,
    ]
  },
  {
    company: 'Tyler Technologies',
    title: 'Lead Developer',
    start: 'Mar 2015',
    end: 'Nov 2019',
    achievements: [
      `Build and maintained a project starter used by developers across Tyler to kickstart their web applications`,
      `Served as an R&D developer prototyping application ideas and 3rd party tools`,
      `Developed and promoted the use of docker within Tyler`,
      `Helped to administer TeamCity, ProGet, and Bitbucket`,
      `Developed and co-led a training program for introducing how to build web applications`
    ]
  },
  {
    company: 'Tyler Technologies',
    title: 'Senior Developer / Scrum Master',
    start: 'Jun 2013',
    end: 'Mar 2015',
    achievements: [
      `Lead a cross functional team of 11 people in agile practices as a scrum master`,
      `Developed an automated pipeline for acceptance testing from Gherkins to C#`,
      `Coached and gave presentations to external teams on how to execute proper agile practices`,
      `Developed a Jury application utilizing WPF with extensibility through MEF`,
    ]
  },
  {
    company: 'Halliburton',
    title: 'Software Engineer Consultant',
    start: 'Jun 2010',
    end: 'Jun 2013',
    achievements: [
      `Lead developer on a large WPF application design to manage and track down-hole drilling tools`,
      `Developed a near-realtime 3d application, with Unity3D, that reflected down-hole tool data`,
      `Oversaw and reviewed code developed by an outsourced team located in Vietnam`,
      `Received extensive training in agile development`
    ]
  },
  {
    company: 'High Voltage Software',
    title: 'Gameplay Software Engineer',
    start: 'Mar 2008',
    end: 'Jun 2010',
    achievements: [
      `Core gameplay engineer for Iron Man 2 (Wii, PSP) and High Voltage Hot Rod Show (WiiWare)`,
      `Worked closely with artists and designers to define gameplay elements`,
      `Communicated directly with publishers to resolve certification issues`,
      `Implemented motion control systems`,
    ]
  },
  {
    company: 'Oh My Heart and Home LLC.',
    title: 'Co-owner and developer',
    start: 'Sept 2020',
    achievements: [
      `Food blog and recipe site with an emphasis on automating nutritional calculation.`,
      `Caters to people that have a medical need for accurate nutrition`,
      `Under active development with a plan to release in 2022.`,
      `Built with typescript, node, svelte, sveltekit, groq, and sanity.io`,
    ]
  },
  {
    company: 'Timeless Wedding Impressions',
    title: 'Co-owner and developer',
    start: 'Sept 2009',
    end: 'Oct 2014',
    achievements: [
      `Online artificial wedding bouquets, boutonnieres, and hair-flowers`,
      `Developed the store front with Magento`,
      `Helped process orders, general accounting, managed part-time staff`,
    ]
  }
];