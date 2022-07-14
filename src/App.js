import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";

import NavBar from "./components/nav-bar/NavBar";
import Error from "./components/UI/Error";
import MainPage from "./pages/MainPage";
import QuizzesPage from "./pages/QuizzesPage";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

function App() {
  const showError = useSelector((state) => state.ui.error.displayError);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/Quizzes" element={<QuizzesPage />}></Route>
        <Route path="/About" element={<About />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
      {showError && <Error />}
    </>
  );
}

export default App;
