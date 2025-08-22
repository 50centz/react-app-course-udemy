import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainLayout } from "./components/MainLayout";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";
import { QuestionPage } from "./pages/QuestionPage/QuestionPage";
import { AddQuestionPageLazy } from "./pages/AddQuestionPage";
import { EditQuestionPage } from "./pages/EditQuestionPage/EditQuestionPage";

function App() {
  // return <MainLayout />;

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/forbidden" element={<div>Forbidden !!!</div>} />
          <Route path="/addquestion" element={<AddQuestionPageLazy />} />
          <Route path="/question/:id" element={<QuestionPage />} />
          <Route path="/editquestion/:id" element={<EditQuestionPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
