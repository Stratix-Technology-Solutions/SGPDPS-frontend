import type { UserProfileResponse } from '../interfaces/user'

export const user: UserProfileResponse = {
  id: "4db3f5a8-1fd2-4e49-b9dc-2ddbd6ef82c1",
  username: "johndoe",
  profile: {
    first_name: "John",
    last_name: "Doe",
    date_of_birth: "1999-05-10",
    gender: "male",
    biography: "Backend developer focused on Laravel, distributed systems and developer experience.",
    country: "Bolivia",
    phone: "+59170000000",
    professions: [
      { id: "1", name: "Backend Developer" },
      { id: "2", name: "DevOps Engineer" },
    ],
  },
  social_links: [
    { id: 1, url: "https://github.com/johndoe" },
    { id: 2, url: "https://linkedin.com/in/johndoe" },
    { id: 3, url: "https://x.com/johndoe" },
    { id: 4, url: "http://random.com/johndoe" },
  ],
  skills: [
    { id: 1, name: "Laravel", domain_level: 'Básico' },
    { id: 2, name: "Docker", domain_level: 'Básico' },
    { id: 3, name: "PostgreSQL", domain_level: 'Intermedio' },
    { id: 4, name: "Redis", domain_level: 'Avanzado' },
  ],
  soft_skills: [
    { id: 1, name: "Leadership" },
    { id: 2, name: "Communication" },
    { id: 3, name: "Problem Solving" },
  ],
  work_experiences: [
    {
      id: "1",
      company: "Acme Inc",
      position: "Senior Backend Engineer",
      description: "Worked on scalable APIs, queues and distributed services.",
      start_date: "2022-01-01",
      end_date: null,
    },
    {
      id: "2",
      company: "Globex",
      position: "Backend Developer",
      description: "Maintained monolith applications and internal APIs.",
      start_date: "2020-01-01",
      end_date: "2021-12-01",
    },
  ],
  academic_experiences: [
    {
      id: "1",
      institution: "Universidad Mayor de San Simón",
      title: "Computer Science",
      description: "Focused on software engineering and distributed systems.",
      start_date: "2017-01-01",
      end_date: "2021-12-01",
    },
  ],
  projects: [
    {
      id: "1",
      title: "Dev Portfolio",
      description: "A portfolio platform for developers.",
      start_date: "2024-01-01",
      end_date: null,
      roles: [{ id: 1, name: "Backend Developer" }],
      categories: [
        { id: 1, name: "Web App" },
        { id: 2, name: "Portfolio" },
      ],
      skills: [
        { id: 1, name: "Laravel" },
        { id: 2, name: "React" },
        { id: 3, name: "PostgreSQL" },
      ],
      assets: [
        {
          id: "1",
          type: "imagen",
          url: "/storage/projects/dev-portfolio/preview.png",
          original_name: "preview.png",
        },
        {
          id: "2",
          type: "pdf",
          url: "/storage/projects/dev-portfolio/demo.mp4",
          original_name: "demo.mp4",
        },
      ],
      links: [
        { id: 1, url: "https://github.com/johndoe/dev-portfolio" },
        { id: 2, url: "https://devportfolio.com" },
      ],
    },
    {
      id: "2",
      title: "Realtime Chat",
      description: "Realtime messaging platform using websockets.",
      start_date: "2023-01-01",
      end_date: "2023-08-01",
      roles: [{ id: 2, name: "Fullstack Developer" }],
      categories: [{ id: 3, name: "Realtime" }],
      skills: [
        { id: 2, name: "React" },
        { id: 4, name: "Redis" },
      ],
      assets: [],
      links: [{ id: 3, url: "https://github.com/johndoe/realtime-chat" }],
    },
  ],
};
