import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";

import NavBar from "./components/nav-bar/NavBar";
import Error from "./components/UI/Error";
import MainPage from "./pages/MainPage";
import QuizzesPage from "./pages/QuizzesPage";
import AboutPage from "./pages/AboutPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  const showError = useSelector((state) => state.ui.error.displayError);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/Quizzes" element={<QuizzesPage />}></Route>
        <Route path="/About" element={<AboutPage />}></Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
      {showError && <Error />}
    </>
  );
}

export default App;
