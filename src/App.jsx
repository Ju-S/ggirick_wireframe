import Nav from "./commons/components/Nav.jsx";
import SideBar from "./commons/components/SideBar.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CommonLayout from "./commons/CommonLayout.jsx";
import BoardPage from "./pages/BoardPage.jsx";
import ApprovalPage from "./pages/ApprovalPage.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <div className="bg-gray-50 antialiased dark:bg-gray-900">
        <Nav />
        <SideBar />

        <Routes>
          <Route path="/" element={<CommonLayout />}></Route>
          <Route path="/board" element={<BoardPage />}></Route>
          <Route path="/approval" element={<ApprovalPage />}></Route>
          <Route path="/calendar" element={<CommonLayout />}></Route>
          <Route path="/workmanagement" element={<CommonLayout />}></Route>
          <Route path="/reservation" element={<CommonLayout />}></Route>
          <Route path="/task" element={<CommonLayout />}></Route>
          <Route path="/mail" element={<CommonLayout />}></Route>
          <Route path="/address" element={<CommonLayout />}></Route>
          <Route path="/chat" element={<CommonLayout />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
