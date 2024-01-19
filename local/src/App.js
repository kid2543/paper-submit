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

//Page สำหรับ ผู้จัดงาน
import TitleUpdate from "./components/Host/TitleUpdate";
import LogoUpdate from "./components/Host/LogoUpdate";
import CategoryUpdate from "./components/Host/CategoryUpdate";
import DateUpdate from "./components/Host/DateUpdate";
import PresentUpdate from "./components/Host/PresentUpdate";
import RegisUpdate from "./components/Host/RegisUpdate";
import InvSpeakerUpdate from "./components/Host/InvSpeakerUpdate";
import PublicUpdate from "./components/Host/PublicUpdate";
import PartnerUpdate from "./components/Host/PartnerUpdate";
import VenueUpdate from "./components/Host/VenueUpdate";
import VenueUpload from "./components/Host/VenueUpload";
import ScheduleUpload from "./components/Host/ScheduleUpload";
import BrochureUpload from "./components/Host/BrochureUpload";
import DescUpdate from "./components/Host/DescUpdate";

//งานประชุมวิชาการ
import AnnHome from "./page/AnnPage/AnnHome";
import CallForPaper from "./page/AnnPage/CallForPaper";
import Committees from "./page/AnnPage/Committees";
import GuideLine from "./page/AnnPage/GuideLine";
import Program from "./page/AnnPage/Program";
import Registation from "./page/AnnPage/Registation";
import Tutorials from "./page/AnnPage/Tutorials";
import Venue from "./page/AnnPage/Venue";
import AuthorLogin from "./page/AuthorLogin";
import AuthorPrivate from "./components/AuthorPrivate";
import HostAssign from "./page/HostAssign";
import AddReviewer from "./page/AddReviewer";
import NewCategory from "./components/Host/NewCategory";
import Reviewer from "./components/Host/Reviewer";
import NewReviwer from "./components/Host/NewReviwer";

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
        <Route path="/ann/:id" element={<AnnLayout />}>
          <Route index element={<AnnHome />} />
          <Route path="call-for-paper" element={<CallForPaper />} />
          <Route path="comiittees" element={<Committees />} />
          <Route path="author-guideline" element={<GuideLine />} />
          <Route path="program" element={<Program />} />
          <Route path="registration" element={<Registation />} />
          <Route path="tutorials" element={<Tutorials />} />
          <Route path="venue" element={<Venue />} />
          <Route path="article" element={<Article />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/registor" element={<SignUp />} />
        {/* End Public Page */}

        


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
          <Route
            path="reviewer"
            element={
              <PrivateRoute>
                <Reviewer />
              </PrivateRoute>
            }
          />
          <Route
            path="reviewer/create"
            element={
              <PrivateRoute>
                <NewReviwer />
              </PrivateRoute>
            }
          />
          <Route
            path=":id"
            element={
              <PrivateRoute>
                <HostUpdate />
              </PrivateRoute>
            }
          />
          <Route
            path=":id/title"
            element={
              <PrivateRoute>
                <TitleUpdate />
              </PrivateRoute>
            }
          />
          <Route
            path=":id/desc"
            element={
              <PrivateRoute>
                <DescUpdate />
              </PrivateRoute>
            }
          />
          <Route
            path=":id/logo"
            element={
              <PrivateRoute>
                <LogoUpdate />
              </PrivateRoute>
            }
          />
          <Route
            path=":id/category"
            element={
              <PrivateRoute>
                <CategoryUpdate />
              </PrivateRoute>
            }
          />
          <Route
            path=":id/category/new"
            element={
              <PrivateRoute>
                <NewCategory />
              </PrivateRoute>
            }
          />
          <Route
            path=":id/important-date"
            element={
              <PrivateRoute>
                <DateUpdate />
              </PrivateRoute>
            }
          />
          <Route
            path=":id/present"
            element={
              <PrivateRoute>
                <PresentUpdate />
              </PrivateRoute>
            }
          />
          <Route
            path=":id/regis"
            element={
              <PrivateRoute>
                <RegisUpdate />
              </PrivateRoute>
            }
          />
          <Route
            path=":id/inv-speaker"
            element={
              <PrivateRoute>
                <InvSpeakerUpdate />
              </PrivateRoute>
            }
          />
          <Route
            path=":id/public"
            element={
              <PrivateRoute>
                <PublicUpdate />
              </PrivateRoute>
            }
          />
          <Route
            path=":id/partner"
            element={
              <PrivateRoute>
                <PartnerUpdate />
              </PrivateRoute>
            }
          />
          <Route
            path=":id/venue"
            element={
              <PrivateRoute>
                <VenueUpdate />
              </PrivateRoute>
            }
          />
          <Route
            path=":id/venue-upload"
            element={
              <PrivateRoute>
                <VenueUpload />
              </PrivateRoute>
            }
          />
          <Route
            path=":id/schedule"
            element={
              <PrivateRoute>
                <ScheduleUpload />
              </PrivateRoute>
            }
          />
          <Route
            path=":id/brochure"
            element={
              <PrivateRoute>
                <BrochureUpload />
              </PrivateRoute>
            }
          />
          <Route
            path=":id/view"
            element={
              <PrivateRoute>
                <HostAssign />
              </PrivateRoute>
            }
          />
          <Route
            path=":id/view/:paper"
            element={
              <PrivateRoute>
                <AddReviewer />
              </PrivateRoute>
            }
          />
        </Route>
        {/* End Host path */}





        <Route
          path="/author/dashboard/:id"
          element={
            <AuthorPrivate>
              <AuthorDashboard />
            </AuthorPrivate>
          }
        >
          <Route
            index
            element={
              <AuthorPrivate>
                <AuthorDashboardPage1 />
              </AuthorPrivate>
            }
          />
          <Route
            path="send"
            element={
              <AuthorPrivate>
                <AuthorDashboardPage2 />
              </AuthorPrivate>
            }
          />
        </Route>
        <Route path="author-login" element={<AuthorLogin />} />
        {/* End Author */}





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

function AnnLayout() {
  return (
    <Container>
      <AnnMockPage />
      <Outlet />
    </Container>
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
