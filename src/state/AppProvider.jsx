import { useState } from "react";
import { AppContext } from "./AppContext";
import {
  courses,
  homeReviews,
  seedUsers,
  seedInstructors,
  seedTerms,
} from "../data/mockData";

export default function AppProvider({
  children,
  initialReviews = homeReviews,
  initialUser = seedUsers[0],
}) {
  // This provider stays mounted while routes change. Reloading restores the fixtures.
  const [reviews, setReviews] = useState(() =>
    initialReviews.map((review) => ({ ...review }))
  );
  const [users, setUsers] = useState(() => seedUsers.map((user) => ({ ...user })));
  const [currentUser, setCurrentUser] = useState(initialUser);

  return (
    <AppContext.Provider
      value={{
        courses,
        reviews,
        setReviews,
        users,
        setUsers,
        currentUser,
        setCurrentUser,
        instructors: seedInstructors,
        terms: seedTerms,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
