import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import WriteReview from "./pages/WriteReview";
import MyReviews from "./pages/MyReviews";
import NotFound from "./pages/NotFound";
import AuthPage from "./pages/auth/AuthPage";
export default function App() {
  return (
    <Routes>
      {/* Every page inside here gets the Layout header */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/reviews/new" element={<WriteReview />} />
        <Route path="/me/reviews" element={<MyReviews />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/signin" element={<AuthPage mode="signin" />} />
        <Route path="register" element={<AuthPage mode="register"/>} />
       
      </Route>

    </Routes>
  );
}