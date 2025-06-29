export interface Session {
  id: number;
  title: string;
  speaker: string;
  startTime: string; // "HH:MM" format
  endTime: string;   // "HH:MM" format
  location: string;
  description: string;
}

const sessions: Session[] = [
  {
    id: 101,
    title: 'Introduction to Vue 3',
    speaker: 'Evan You',
    startTime: '09:00',
    endTime: '10:00',
    location: 'Main Hall',
    description: 'A deep dive into the new features of Vue 3, including the Composition API.'
  },
  {
    id: 102,
    title: 'State Management with Pinia',
    speaker: 'Jane Doe',
    startTime: '10:00',
    endTime: '11:00',
    location: 'Room A',
    description: 'Learn how to manage your application state with the official state management library for Vue.'
  },
  {
    id: 103,
    title: 'Advanced Ionic Components',
    speaker: 'John Smith',
    startTime: '10:00',
    endTime: '11:00',
    location: 'Room B',
    description: 'Explore advanced use cases for Ionic components, including animations and gestures.'
  },
  {
    id: 104,
    title: 'Building Performant Apps',
    speaker: 'Sarah Connor',
    startTime: '11:00',
    endTime: '12:00',
    location: 'Main Hall',
    description: 'Tips and tricks for optimizing the performance of your Vue and Ionic applications.'
  },
  {
    id: 105,
    title: 'Lunch Break',
    speaker: '',
    startTime: '12:00',
    endTime: '13:00',
    location: 'Cafeteria',
    description: 'Time to recharge and network with other developers.'
  },
  {
    id: 106,
    title: 'Live Coding: Build a PWA',
    speaker: 'Chris Coyle',
    startTime: '13:00',
    endTime: '15:00',
    location: 'Main Hall',
    description: 'Follow along as we build a Progressive Web App from scratch in two hours.'
  },
];

export default sessions;

