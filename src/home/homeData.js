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