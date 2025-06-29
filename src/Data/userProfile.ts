export interface UserProfile {
  name: string;
  title: string;
  company: string;
  email: string;
  phone: string;
  website: string;
}

// This represents the current app user's profile info
const userProfile: UserProfile = {
  name: 'Alex Doe',
  title: 'Mobile App Developer',
  company: 'Innovatech Solutions',
  email: 'alex.doe@example.com',
  phone: '+1-202-555-0104',
  website: 'www.alexdoe.dev',
};

export default userProfile;

