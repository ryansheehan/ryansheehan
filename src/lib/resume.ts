export interface Education {
  school: string;
  study: string;
  degree: string;
  year: string;
}
export interface Experience {
  company: string;
  periods: {
    title: string;
    start: string;
    end?: string;
    achievements: string[];
  }[];
}

export enum SkillType {
  Language="language",
  Framework="framework",
  Other="other",
  Tool="tool",
}

export interface ISkill {
  name: string;
  type: SkillType;
  rank: number;
  link?: string;
}

export interface Contact {
  email: string;
  phone: string;
  linkedIn: string;
  github: string;
}

export interface Resume {
  contact: Contact;
  summary: string;
  skills: ISkill[];  
  experience: Experience[];
  education: Education[];
}

export const resume: Resume = {
  contact: {
    phone: '+1-630-248-8741',
    email: 'rsheehan@gmail.com',
    linkedIn: 'sheehanr',
    github: 'ryansheehan',
  },

  summary: `Software engineering leader with ${(new Date()).getFullYear() - 2008} years of experience building complex
  applications on a wide variety of platforms. Experienced in leading large
  organizations in their transition to being a cloud-based company. Passionate
  about delivering an intuitive and high quality end-user experience.`,

  skills: [
    { name: 'agile', type: SkillType.Other, rank: 4, link: 'https://en.wikipedia.org/wiki/Agile_Otherware_development' },
    { name: 'angular', type: SkillType.Framework, rank: 5, link: 'https://angular.io/' },    
    { name: 'aws', type: SkillType.Tool, rank: 2, link: 'https://aws.amazon.com/'},
    { name: 'c#', type: SkillType.Language, rank: 5, link: 'https://docs.microOther.com/en-us/dotnet/csharp/'},
    { name: 'c++', type: SkillType.Language, rank: 3, link: 'https://www.cplusplus.com/'},
    { name: 'css', type: SkillType.Language, rank: 4, link: 'https://developer.mozilla.org/en-US/docs/Web/CSS'},
    { name: 'deno', type: SkillType.Framework, rank: 1, link: 'https://deno.land/'},
    { name: 'docker-compose', type: SkillType.Tool, rank: 5, link: 'https://docs.docker.com/compose/'},
    { name: 'docker', type: SkillType.Tool, rank: 5, link: 'https://www.docker.com/'},
    { name: 'git', type: SkillType.Tool, rank: 3, link: 'https://git-scm.com/'},
    { name: 'github', type: SkillType.Tool, rank: 3, link: 'https://github.com/'},
    { name: 'html', type: SkillType.Language, rank: 4, link: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
    { name: 'javascript', type: SkillType.Language, rank: 4, link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
    { name: 'jira', type: SkillType.Tool, rank: 3, link: 'https://www.atlassian.com/software/jira'},
    { name: 'kubernetes', type: SkillType.Tool, rank: 1, link: 'https://kubernetes.io/'},
    { name: 'ngrx', type: SkillType.Framework, rank: 4, link: 'https://ngrx.io/' },
    { name: 'node', type: SkillType.Framework, rank: 3, link: 'https://nodejs.org/en/' },
    { name: 'python', type: SkillType.Language, rank: 1, link: 'https://www.python.org/' },
    { name: 'react', type: SkillType.Framework, rank: 3, link: 'https://reactjs.org/' },
    { name: 'real-time', type: SkillType.Other, rank: 2, link: 'https://www.smu.edu/guildhall'},
    { name: 'redux', type: SkillType.Framework, rank: 4, link: 'https://redux.js.org/'},
    { name: 'shape up', type: SkillType.Other, rank: 2, link: 'https://basecamp.com/shapeup'},
    { name: 'svelte', type: SkillType.Language, rank: 4, link: 'https://svelte.dev/'},
    { name: 'sveltekit', type: SkillType.Framework, rank: 3, link: 'https://kit.svelte.dev/'},
    { name: 'typescript', type: SkillType.Language, rank: 5, link: 'https://www.typescriptlang.org/' },
    { name: 'vscode', type: SkillType.Tool, rank: 4, link: 'https://code.visualstudio.com/'},
  ].sort((a:ISkill, b:ISkill) => b.rank - a.rank),

  experience: [
    {
      company: 'Tyler Technologies',
      periods: [
        {
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
          title: 'Lead Developer',
          start: 'Mar 2015',
          end: 'Nov 2019',
          achievements: [
            `Built and maintained a project starter used by developers across Tyler to kickstart their web applications`,
            `Served as an R&D developer prototyping application ideas and 3rd party tools`,
            `Developed and promoted the use of docker within Tyler`,
            `Helped to administer TeamCity, ProGet, and Bitbucket`,
            `Developed and co-led a training program for introducing how to build web applications`
          ]
        },
        {
          title: 'Senior Developer / Scrum Master',
          start: 'Jun 2013',
          end: 'Mar 2015',
          achievements: [
            `Led a cross functional team of 11 people in agile practices as a scrum master`,
            `Developed an automated pipeline for acceptance testing from Gherkins to C#`,
            `Coached and gave presentations to external teams on how to execute proper agile practices`,
            `Developed a Jury application utilizing WPF with extensibility through MEF`,
          ]
        }
      ]
    },
    {
      company: 'Halliburton',
      periods: [
        {
          title: 'Software Engineer Consultant',
          start: 'Jun 2010',
          end: 'Jun 2013',
          achievements: [
            `Lead developer on a large WPF application design to manage and track down-hole drilling tools`,
            `Developed a near real-time 3D application, with Unity3D, that reflected down-hole tool data`,
            `Oversaw and reviewed code developed by an outsourced team located in Vietnam`,
            `Received extensive training in agile development`
          ]
        }
      ]
    },
    {
      company: 'High Voltage Software',
      periods: [
        {
          title: 'Gameplay Software Engineer',
          start: 'Mar 2008',
          end: 'Jun 2010',
          achievements: [
            `Core gameplay engineer for Iron Man 2 (Wii, PSP) and High Voltage Hot Rod Show (WiiWare)`,
            `Worked closely with artists and designers to define gameplay elements`,
            `Communicated directly with publishers to resolve certification issues`,
            `Implemented motion control systems`,
          ]
        }
      ]
    },
    {
      company: 'Oh My Heart and Home',
      periods: [
        {
          title: 'Co-owner and developer',
          start: 'Sept 2020',
          achievements: [
            `Sole developer building a food and recipe blog with an emphasis on dynamically calculating nutritional data.`,        
            `Building with typescript, node, svelte, sveltekit, groq, and sanity.io as a low-code headless cms`,
            `Manage business needs, affiliate relationships, and marketing tools`,
          ]
        }
      ]
    },
    {
      company: 'Timeless Wedding Impressions',
      periods: [
        {
          title: 'Co-owner and developer',
          start: 'Sept 2009',
          end: 'Oct 2014',
          achievements: [
            `Built online store front for artificial wedding bouquets, boutonnieres, and hair-flowers`,
            `Developed the store front with Magento`,
            `Managed part-time staff, general accounting, and help process orders`,
          ]
        }
      ]
    }
  ],

  education: [
    {
      school: 'Southern Methodist University',
      study: 'Digital Game Development',
      degree: 'Professional Certification',
      year: '2008',
    },
    {
      school: 'Southern Illinois University Edwardsville',
      study: 'Computer Science',
      degree: 'Bachelor of Science',
      year: '2005',
    }
  ],
}
