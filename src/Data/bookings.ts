// src/data/bookings.ts

const bookings = [
  {
    id: 1,
    name: 'Vue.js Global Summit 2025',
    date: '2025-07-15',
    time: '09:00 AM',
    venue: 'Online',
    status: 'upcoming',
    bannerImage: 'https://images.unsplash.com/photo-1549692520-acc6669e2f0c?q=80&w=1887&auto=format&fit=crop',
    about: 'The largest online conference for Vue.js developers. Join us for a day of deep-dive talks from the creators and contributors of the Vue ecosystem. Learn about the latest features, best practices, and the future of Vue.',
    location: 'Remote',
    internet: {
      network: 'VueGlobalWiFi',
      password: 'vue-is-awesome'
    }
  },
  {
    id: 2,
    name: 'Ionic World Conference',
    date: '2025-06-28',
    time: '10:30 AM',
    venue: 'Convention Center, Hall A',
    status: 'ongoing',
    bannerImage: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012&auto=format&fit=crop',
    about: 'The official conference from the Ionic team. This event focuses on building cross-platform applications with Ionic Framework, including topics such as app migration, Vue/React/Angular best practices, Webpack, Sass, and other technologies commonly used in the ecosystem.',
    location: 'Madison, WI',
    internet: {
      network: 'ica2025',
      password: 'makegoodthings'
    }
  },
  {
    id: 3,
    name: 'State of Frontend Development',
    date: '2025-05-20',
    time: '02:00 PM',
    venue: 'Tech Park Auditorium',
    status: 'completed',
    bannerImage: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop',
    about: 'A comprehensive overview of the current frontend landscape. We\'ll discuss the latest trends in frameworks, state management, build tools, and CSS. This is a must-attend for any developer looking to stay on the cutting edge.',
    location: 'Silicon Valley, CA',
    internet: {
      network: 'FrontendDevWiFi',
      password: 'javascript-rules'
    }
  },
  {
    id: 4,
    name: 'Web Performance Meetup',
    date: '2025-04-10',
    time: '07:00 PM',
    venue: 'Community Hub',
    status: 'cancelled',
    bannerImage: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1932&auto=format&fit=crop',
    about: 'Join local developers to discuss tips and tricks for making websites faster. Topics include image optimization, code splitting, caching strategies, and core web vitals. A great opportunity for networking and learning.',
    location: 'Austin, TX',
    internet: {
      network: 'PerfMeetup',
      password: 'gotta-go-fast'
    }
  }
];

export default bookings;