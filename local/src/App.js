import { Routes, Route, Outlet } from "react-router-dom";
import Home from "./page/Home";
import Navbar from "./components/Navbar";
import Article from "./page/Article";
import Announcement from "./page/Announcement";
import Howto from "./page/Howto";
import Login from "./page/Login";
import Host from "./page/HostLayout";
import AuthorDashboard from "./page/AuthorDashboardLayout";
import AuthorDashboardPage1 from "./page/AuthorDashboardPage1";
import AuthorDashboardPage2 from "./page/AuthorDashboardPage2";
import { Container, Typography, Link, Box } from "@mui/material";
import HostDashBoard from "./page/HostDashBoard";
import HostCreateDash from "./page/HostCreateDash";
import SignUp from "./page/SignUp";
import ArticleMock from "./page/ArticleMock";
import Footer from "./components/Footer";
import AnnMockPage from "./page/AnnMockPage";
import PrivateRoute from "./components/Private";
import TestPrivate from "./page/TestPrivate";
import HostUpdate from "./page/HostUpdate";
import TitleUpdate from "./components/Host/TitleUpdate";
import LogoUpdate from "./components/Host/LogoUpdate";
import CategoryUpdate from "./components/Host/CategoryUpdate";
import DateUpdate from "./components/Host/DateUpdate";
import PresentUpdate from "./components/Host/PresentUpdate";
import RegisUpdate from "./components/Host/RegisUpdate";
import InvSpeakerUpdate from "./components/Host/InvSpeakerUpdate";

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
        <Route
          path="/host"
          element={
            <PrivateRoute>
              <Host />
            </PrivateRoute>
          }
        >
          <Route
            index
            element={
              <PrivateRoute>
                <HostDashBoard />
              </PrivateRoute>
            }
          />
          <Route
            path="create"
            element={
              <PrivateRoute>
                <HostCreateDash />
              </PrivateRoute>
            }
          />
          <Route path=":id" element={<PrivateRoute><HostUpdate/></PrivateRoute>}/>
          <Route path=":id/title" element={<PrivateRoute><TitleUpdate/></PrivateRoute>}/>
          <Route path=":id/logo" element={<PrivateRoute><LogoUpdate/></PrivateRoute>}/>
          <Route path=":id/category" element={<PrivateRoute><CategoryUpdate/></PrivateRoute>}/>
          <Route path=":id/important-date" element={<PrivateRoute><DateUpdate/></PrivateRoute>}/>
          <Route path=":id/present" element={<PrivateRoute><PresentUpdate/></PrivateRoute>}/>
          <Route path=":id/regis" element={<PrivateRoute><RegisUpdate/></PrivateRoute>}/>
          <Route path=":id/inv-speaker" element={<PrivateRoute><InvSpeakerUpdate/></PrivateRoute>}/>
        </Route>
        <Route
          path="/author/dashboard/"
          element={
            <PrivateRoute>
              <AuthorDashboard />
            </PrivateRoute>
          }
        >
          <Route
            index
            element={
              <PrivateRoute>
                <AuthorDashboardPage1 />
              </PrivateRoute>
            }
          />
          <Route
            path="send"
            element={
              <PrivateRoute>
                <AuthorDashboardPage2 />
              </PrivateRoute>
            }
          />
        </Route>
        <Route path="*" element={<NoMatch />} />
        <Route
          path="/private"
          element={
            <PrivateRoute>
              <TestPrivate />
            </PrivateRoute>
          }
        />
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
      <div style={{ marginTop: "60px" }}>
        <Footer />
      </div>
    </div>
  );
}

function NoMatch() {
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box textAlign="center">
        <Typography>Page not Found: 404</Typography>
        <Typography>
          <Link href="/">Back to home</Link>
        </Typography>
      </Box>
    </Container>
  );
}
