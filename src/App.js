import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";

import NavBar from "./components/nav-bar/NavBar";
import Error from "./components/UI/Error";
import MainPage from "./pages/MainPage";
import QuizzesPage from "./pages/QuizzesPage";

function App() {
  const showError = useSelector((state) => state.ui.error.displayError);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/Quizzes" element={<QuizzesPage />}></Route>
      </Routes>
      {showError && <Error />}
    </>
  );
}

export default App;
