import Nav from "./components/Nav";
import "./App.css";

import Footer from "./components/Footer";
import { Outlet, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import DetailPage from "./pages/DetailPage";
import SearchPage from "./pages/SearchPage";

const Layout = () => {
  return (
    <div>
      <Nav />

      <Outlet />

      <Footer />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          {/* 해당 컴포넌트가 가장 먼저 랜더링됨. index 속성 추가해줘서. */}

          <Route path=":id" element={<DetailPage />} />
          <Route path="search" element={<SearchPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
