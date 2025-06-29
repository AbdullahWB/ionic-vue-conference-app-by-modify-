export interface ConferenceInfo {
  mainSpeaker: {
    name: string;
    avatar: string; // URL to an image
  };
  topic: string;
  duration: string;
  description: string;
  location: {
    name: string;
    address: string;
    mapEmbedUrl: string; // URL for the map iframe
    directionsUrl: string; // URL for the "Get Directions" button
  };
  virtualLink: string; // URL for Zoom, Teams, etc.
}

const conferenceInfo: ConferenceInfo = {
  mainSpeaker: {
    name: "Dr. Evelyn Reed",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop",
  },
  topic: "The Future of Cross-Platform Development",
  duration: "90 Minutes",
  description:
    "A deep-dive session exploring the future of mobile and web development. We will cover the latest trends in unified codebases, native performance from web technologies, and the role of AI in streamlining the development process.",
  location: {
    name: "Grand Convention Center",
    address: "123 Innovation Drive, Tech City, USA",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2685.3400000000003!2d-122.33207000000001!3d47.60621!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54906ab3c12f5e3f%3A0x8a9c336de96f9a01!2sSeattle%2C%20WA!5e0!3m2!1sen!2sus!4v1624997864381!5m2!1sen!2sus",
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=Seattle,WA",
  },
  virtualLink: "https://zoom.us/j/1234567890",
};

export default conferenceInfo;
