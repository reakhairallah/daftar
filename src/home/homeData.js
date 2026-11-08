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
  body: "The weekly exercises and project helped me understand the material.",
  anonymous: false,
  createdAt: "2026-10-14",
  updatedAt: null,
}));