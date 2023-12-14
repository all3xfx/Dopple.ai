export const categories = [
  {
    key: "characters",
    index: 0,
    name: "Character",
    namePlural: "Characters",
    image: "/images/explore/categories/Characters.svg",
    imageOnProfile: "/images/profile/icons/character.svg",
  },
  {
    key: "companions",
    index: 1,
    name: "Companion",
    namePlural: "Companions",
    image: "/images/explore/categories/Companions.svg",
    imageOnProfile: "/images/profile/icons/companion.svg",
  },
  {
    key: "mentors",
    index: 2,
    name: "Mentor",
    namePlural: "Mentors",
    image: "/images/explore/categories/Mentors.svg",
    imageOnProfile: "/images/profile/icons/mentor.svg",
  },
  {
    key: "assistants",
    index: 3,
    name: "Assistant",
    namePlural: "Assistants",
    image: "/images/explore/categories/Assistants.svg",
    imageOnProfile: "/images/profile/icons/assistant.svg",
  },
] as const;

export const subcategories = [
  ["Anime", "Movies", "TV Shows", "Games", "Kids Show", "Comic"],
  ["Boyfriend", "Girlfriend", "Friend", "Silly"],
  ["Religion", "Philosopher"],
  ["Helpers"],
] as const;

export const languages = [
  {
    name: "English",
    flag: "/images/messages/flags/english.svg",
  },
  {
    name: "French",
    flag: "/images/messages/flags/french.svg",
  },
  {
    name: "German",
    flag: "/images/messages/flags/german.svg",
  },
  {
    name: "Hindi",
    flag: "/images/messages/flags/hindi.svg",
  },
  {
    name: "Italian",
    flag: "/images/messages/flags/italian.svg",
  },
  {
    name: "Polish",
    flag: "/images/messages/flags/polish.svg",
  },
  {
    name: "Portuguese",
    flag: "/images/messages/flags/portuguese.svg",
  },
  {
    name: "Spanish",
    flag: "/images/messages/flags/spanish.svg",
  },
] as const;

export const monthNames = [
  "Janunary",
  "Feburary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
