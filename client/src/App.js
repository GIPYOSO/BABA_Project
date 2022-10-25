import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import MainPage from "./pages/MainPage";
import Mypage from "./pages/Mypage";
import RecordPage from "./pages/RecordPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/record" element={<RecordPage />}>
          <Route path="list" element={<RecordPage />} />
          <Route path="create" element={<RecordPage />} />
          <Route path="detail" element={<RecordPage />} />
          <Route path="fileUpload" element={<RecordPage />} />
          <Route path="favorite" element={<RecordPage />} />
          <Route path="trashCan" element={<RecordPage />} />
        </Route>
        <Route path="/mypage" element={<Mypage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
