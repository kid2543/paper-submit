import { Routes, Route, Outlet, Link } from "react-router-dom";
import Home from './page/Home'
import Navbar from './components/Navbar'
import Article from "./page/Article";
import Announcement from "./page/Announcement";
import Howto from "./page/Howto";
import Login from "./page/Login";
import Admin from "./page/Admin";


export default function App() {
  return (
      <div>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="article" element={<Article />} />
            <Route path="ann" element={<Announcement />} />
            <Route path="howto" element={<Howto />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>

  );
}

function Layout() {
  return (
    <div>
      <nav>
        <Navbar />
      </nav>
      <Outlet />
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}