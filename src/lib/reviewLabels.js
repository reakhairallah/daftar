export function termLabel(terms, termId) {
  const term = terms.find((t) => t.id === termId);
  return term ? `${term.season} ${term.year}` : "";
}

export function instructorLastName(instructors, instructorId) {
  const instructor = instructors.find((i) => i.id === instructorId);
  return instructor ? instructor.name.split(" ").at(-1) : "";
}

export function initials(fullName) {
  return fullName
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");
}
