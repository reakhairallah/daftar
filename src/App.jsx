
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import WriteReview from "./pages/WriteReview";
import MyReviews from "./pages/MyReviews";
import NotFound from "./pages/NotFound";
import Instructor from "./pages/Instructor";
import CourseDetail from "./pages/CourseDetail";
import AppProvider from "./state/AppProvider";

export default function App() {
  return (
    <AppProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:courseId" element={<CourseDetail />} />
          <Route path="/instructors/:instructorId" element={<Instructor />} />
          <Route path="/reviews/new" element={<WriteReview />} />
          <Route path="/me/reviews" element={<MyReviews />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AppProvider>
  );
}
