// TEMP: stand-in for Cloey's useAppData() until her code is in this branch.
// Swap: change the import to "../state/AppContext" in each page, then delete this file.
const courses = [
  { code: "CSC443", title: "Web Programming" },
  { code: "CSC310", title: "Algorithms" },
  { code: "CSC375", title: "Database Management" },
];
const instructors = [
  { id: "abdelnour", name: "Nagib Abdelnour" },
  { id: "farhat", name: "Mohammad Farhat" },
];
const terms = [
  { id: "fall-2026", season: "Fall", year: 2026 },
  { id: "summer-2026", season: "Summer", year: 2026 },
  { id: "spring-2026", season: "Spring", year: 2026 },
];
const reviews = [
  {
    id: "r1", authorId: "u1", courseCode: "CSC443", instructorId: "abdelnour", termId: "fall-2026",
    rating: 5, difficulty: 3, hoursPerWeek: 7, wouldTakeAgain: true, anonymous: false,
    body: "In CSC443, the weekly examples made the difficult concepts easier to follow.",
    createdAt: "2026-10-14", updatedAt: null,
  },
  {
    id: "CSC310-r1", authorId: "u1", courseCode: "CSC310", instructorId: "abdelnour", termId: "fall-2026",
    rating: 3, difficulty: 5, hoursPerWeek: 11, wouldTakeAgain: false, anonymous: true,
    body: "In CSC310, the pace picked up after the midterm, so planning ahead helped.",
    createdAt: "2026-10-14", updatedAt: "2026-10-20",
  },
  {
    id: "r2", authorId: "u2", courseCode: "CSC443", instructorId: "farhat", termId: "spring-2026",
    rating: 4, difficulty: 3, hoursPerWeek: 6, wouldTakeAgain: true, anonymous: false,
    body: "In CSC443, the assessments rewarded understanding more than memorization.",
    createdAt: "2026-05-02", updatedAt: null,
  },
];
const currentUser = { id: "u1", fullName: "Rea Khairallah" };

function setReviews(newList) {
  console.log("TEMP saved:", newList);
}

export function useAppData() {
  return { courses, instructors, terms, reviews, setReviews, currentUser };
}
