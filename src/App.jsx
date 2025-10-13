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
          <Route path="/ggirick_wireframe/" element={<CommonLayout />}></Route>
          <Route path="/ggirick_wireframe/board" element={<CommonLayout />}></Route>
          <Route path="/ggirick_wireframe/approval" element={<CommonLayout />}></Route>
          <Route path="/ggirick_wireframe/calendar" element={<CommonLayout />}></Route>
          <Route path="/ggirick_wireframe/workmanagement" element={<CommonLayout />}></Route>
          <Route path="/ggirick_wireframe/reservation" element={<CommonLayout />}></Route>
          <Route path="/ggirick_wireframe/task" element={<CommonLayout />}></Route>
          <Route path="/ggirick_wireframe/mail" element={<CommonLayout />}></Route>
          <Route path="/ggirick_wireframe/address" element={<CommonLayout />}></Route>
          <Route path="/ggirick_wireframe/chat" element={<CommonLayout />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
