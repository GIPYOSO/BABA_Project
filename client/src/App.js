import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import MainPage from "./pages/MainPage";
import Mypage from "./pages/Mypage";
import RecordPage from "./pages/RecordPage";
import Register from "./pages/Register";
import MeetingMinutes from './components/Common/MeetingMinutes/MeetingMinutes'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/register" element={<Register />} />
        <Route path="/record" element={<RecordPage />}>
          <Route path="list" />
          <Route path="create" />
          <Route path="detail" />
          <Route path="fileUpload" />
        </Route>
        <Route path="/mypage" element={<Mypage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
