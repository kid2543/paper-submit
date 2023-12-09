import { Routes, Route, Outlet } from "react-router-dom";
import Home from './page/Home'
import Navbar from './components/Navbar'
import Article from "./page/Article";
import Announcement from "./page/Announcement";
import Howto from "./page/Howto";
import Login from "./page/Login";
import Host from "./page/HostLayout";
import AuthorDashboard from "./page/AuthorDashboardLayout";
import AuthorDashboardPage1 from "./page/AuthorDashboardPage1";
import AuthorDashboardPage2 from "./page/AuthorDashboardPage2";
import { Container, Typography, Link,Box } from "@mui/material";
import HostDashBoard from "./page/HostDashBoard";
import HostCreateDash from "./page/HostCreateDash";
import SignUp from "./page/SignUp";
import ArticleMock from "./page/ArticleMock";
import Footer from "./components/Footer";
import AnnMockPage from "./page/AnnMockPage";


export default function App() {
  return (
      <div>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="article" element={<Article />} />
            <Route path="article/:id" element={<ArticleMock />} />
            <Route path="ann" element={<Announcement />} />
            <Route path="howto" element={<Howto />} />
          </Route>
          <Route path="/ann/:id" element={<AnnMockPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registor" element={<SignUp />} />
          <Route path="/host" element={<Host />} >
            <Route index element={<HostDashBoard />} />
            <Route path="create" element={<HostCreateDash />} />
          </Route>
          <Route path="/author/dashboard/" element={<AuthorDashboard />} >
            <Route index element={<AuthorDashboardPage1 />} />
            <Route path="send" element={<AuthorDashboardPage2 />} />
          </Route>
          <Route path="*" element={<NoMatch />} />
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
      <div style={{marginTop:'60px'}}>
        <Footer />
      </div>

    </div>
  );
}

function NoMatch() {
  return (
    <Container sx={{display:'flex',justifyContent:'center', alignItems:'center',height:'100vh'}}>
      <Box textAlign='center'>
      <Typography>
          Page not Found: 404
      </Typography>
      <Typography>
          <Link href="/" >Back to home</Link> 
      </Typography>
      </Box>
      
    </Container>
  );
}