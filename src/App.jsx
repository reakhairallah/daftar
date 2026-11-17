import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./home/Home";
import Courses from "./courses/Courses";
import WriteReview from "./pages/WriteReview";
import MyReviews from "./pages/MyReviews";
import NotFound from "./pages/NotFound";
import AppProvider from "./state/AppProvider";

export default function App() {
  return (
    <AppProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/reviews/new" element={<WriteReview />} />
          <Route path="/me/reviews" element={<MyReviews />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AppProvider>
  );
}
