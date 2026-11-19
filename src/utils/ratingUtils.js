export function calculateRatingSummary(reviews) {
  const count = reviews.length;

  if (count === 0) {
    return {
      count: 0,
      averageRating: 0,
      averageDifficulty: 0,
      averageHours: 0,
      takeAgainPercent: 0,
      distribution: [0, 0, 0, 0, 0],
    };
  }

  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);

  const totalDifficulty = reviews.reduce(
    (sum, review) => sum + review.difficulty,
    0,
  );

  const totalHours = reviews.reduce(
    (sum, review) => sum + review.hoursPerWeek,
    0,
  );

  const takeAgainCount = reviews.filter(
    (review) => review.wouldTakeAgain,
  ).length;

  const distribution = [1, 2, 3, 4, 5].map(
    (stars) => reviews.filter((review) => review.rating === stars).length,
  );

  return {
    count,
    averageRating: totalRating / count,
    averageDifficulty: totalDifficulty / count,
    averageHours: totalHours / count,
    takeAgainPercent: (takeAgainCount / count) * 100,
    distribution,
  };
}
