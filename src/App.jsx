import Nav from "./commons/components/Nav.jsx";
import SideBar from "./commons/components/SideBar.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CommonLayout from "./commons/CommonLayout.jsx";
import BoardPage from "./pages/BoardPage.jsx";
import ApprovalPage from "./pages/ApprovalPage.jsx";
import MainPage from "./pages/MainPage.jsx";
import Error404Page from "./pages/Error404Page.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="bg-gray-50 antialiased dark:bg-gray-900">
          <Nav />
          <SideBar />

          <Routes>
            <Route path="/ggirick_wireframe" element={<MainPage />}></Route>
            <Route
              path="/ggirick_wireframe/board"
              element={<CommonLayout />}
            ></Route>
            <Route
              path="/ggirick_wireframe/approval"
              element={<CommonLayout />}
            ></Route>
            <Route
              path="/ggirick_wireframe/calendar"
              element={<CommonLayout />}
            ></Route>
            <Route
              path="/ggirick_wireframe/workmanagement"
              element={<CommonLayout />}
            ></Route>
            <Route
              path="/ggirick_wireframe/reservation"
              element={<CommonLayout />}
            ></Route>
            <Route
              path="/ggirick_wireframe/task"
              element={<CommonLayout />}
            ></Route>
            <Route
              path="/ggirick_wireframe/mail"
              element={<CommonLayout />}
            ></Route>
            <Route
              path="/ggirick_wireframe/address"
              element={<CommonLayout />}
            ></Route>
            <Route
              path="/ggirick_wireframe/chat"
              element={<CommonLayout />}
            ></Route>
            <Route
              path="/ggirick_wireframe/drive"
              element={<CommonLayout />}
            ></Route>
            <Route
              path="/ggirick_wireframe/organization"
              element={<CommonLayout />}
            ></Route>
            <Route path="*" element={<Error404Page />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}
