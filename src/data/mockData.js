// Provisional Phase 1 fixtures. No summaries or passwords are stored.
const reviewNotes = [
  "the weekly examples made the difficult concepts easier to follow.",
  "the workload was manageable when I kept up with the reading.",
  "the assessments rewarded understanding more than memorization.",
  "I needed extra practice, but the feedback helped me improve.",
  "the material built steadily and attendance made a difference.",
  "the pace picked up after the midterm, so planning ahead helped.",
  "I found the explanations clear and the exercises useful.",
  "some topics took a second pass before they made sense."
];
const studyNotes = [
  "Office hours were helpful when I had a specific question.",
  "Starting assignments early kept the last week under control.",
  "I reviewed my notes after each class rather than before exams only.",
  "Studying with classmates helped me find gaps in my understanding.",
  "The time commitment was steady rather than concentrated in one week.",
  "I would recommend checking the prerequisites before registering.",
  "Keeping a list of questions made revision much more productive."
];

function reviewBody(courseCode, index) {
  return `In ${courseCode}, ${reviewNotes[index % reviewNotes.length]} ${studyNotes[Math.floor(index / reviewNotes.length) % studyNotes.length]}`;
}

const ratings = [
  ...Array(18).fill(5),
  ...Array(13).fill(4),
  ...Array(4).fill(3),
  ...Array(2).fill(2),
  ...Array(1).fill(1),
];

export const initialReviews = ratings.map((rating, index) => ({
  id: `r${index + 1}`,
  authorId: `u${index + 1}`,
  courseCode: "CSC443",
  instructorId: "abdelnour",
  termId: "fall-2026",
  rating,
  difficulty: 3,
  hoursPerWeek: 7,
  wouldTakeAgain: index < 34,
  body: reviewBody("CSC443", index),
  anonymous: false,
  createdAt: "2026-10-14",
  updatedAt: null,
}));
export const courses = [
  {
    code: "CSC443",
    title: "Web Programming",
    department: "Computer Science & Mathematics",
    credits: 3,
    coRequisite: null,
  },
  {
    code: "CSC310",
    title: "Algorithms",
    department: "Computer Science & Mathematics",
    credits: 3,
    coRequisite: null,
  },
  {
    code: "CSC375",
    title: "Database Management",
    department: "Computer Science & Mathematics",
    credits: 3,
    coRequisite: null,
  },
];
function makeReviews(
  courseCode,
  distribution,
  difficulty,
  hoursPerWeek,
  takeAgainCount
) {
  const ratings = distribution.flatMap((count, index) =>
    Array(count).fill(5 - index)
  );

  return ratings.map((rating, index) => ({
    ...initialReviews[0],
    id: `${courseCode}-r${index + 1}`,
    authorId: `u${index + 1}`,
    courseCode,
    body: reviewBody(courseCode, index),
    rating,
    difficulty,
    hoursPerWeek,
    wouldTakeAgain: index < takeAgainCount,
  }));
}

export const homeReviews = [
  ...initialReviews,
  ...makeReviews("CSC310", [9, 14, 17, 8, 4], 5, 11, 32),
  ...makeReviews("CSC375", [17, 18, 6, 2, 1], 4, 8, 36),
];

const firstNames = ["Rea", "Maya", "Karim", "Nour", "Jad", "Lara", "Rami", "Lea"];
const lastNames = ["Khairallah", "Haddad", "Saad", "Khoury", "Nassar", "Mansour", "Fares"];

export const seedUsers = Array.from({ length: 52 }, (_, index) => {
  const firstName = firstNames[index % firstNames.length];
  const lastName = lastNames[Math.floor(index / firstNames.length)];
  return {
    id: `u${index + 1}`,
    fullName: `${firstName} ${lastName}`,
    email: `${firstName}.${lastName}@lau.edu`.toLowerCase(),
    major: "Computer Science",
  };
});

export const seedInstructors = [
  { id: "abdelnour", name: "Nagib Abdelnour", department: "Computer Science & Mathematics" },
];

export const seedTerms = [
  { id: "fall-2026", season: "Fall", year: 2026 },
  { id: "summer-2026", season: "Summer", year: 2026 },
  { id: "spring-2026", season: "Spring", year: 2026 },
];
