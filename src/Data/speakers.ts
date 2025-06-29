export interface Speaker {
  id: number;
  name: string;
  title: string;
  avatar: string;
  availability: { time: string; booked: boolean }[];
}

const speakers: Speaker[] = [
  {
    id: 201,
    name: 'Dr. Evelyn Reed',
    title: 'Keynote Speaker, AI Ethics',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop',
    availability: [
      { time: '14:00 - 14:15', booked: false },
      { time: '14:20 - 14:35', booked: true }, // Already booked
      { time: '14:40 - 14:55', booked: false },
    ],
  },
  {
    id: 202,
    name: 'John Smith',
    title: 'Lead Frontend Developer',
    avatar: 'https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2071&auto=format&fit=crop',
    availability: [
      { time: '15:00 - 15:15', booked: false },
      { time: '15:20 - 15:35', booked: false },
      { time: '15:40 - 15:55', booked: false },
    ],
  },
  {
    id: 203,
    name: 'Sarah Connor',
    title: 'DevOps & Cloud Specialist',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop',
    availability: [
      { time: '16:00 - 16:15', booked: false },
      { time: '16:20 - 16:35', booked: false },
    ],
  },
];

export default speakers;

