import './App.css';

import { Route, Routes, Navigate } from 'react-router-dom'
import { useAuthContext } from './hook/useAuthContext';
import { ToastContainer } from 'react-toastify';


// component
import PrivateRoute from './components/PrivateRoute';

// layout
import ConfrLayout from './layout/ConfrLayout';
import HomeLayout from './layout/HomeLayout';

//page
import Home from './page/Home';
import SignUp from './page/SignUp';
import Login from './page/Login';
import ConfrList from './page/ConfrList';
import Confr from './page/Confr';
import Submit from './page/Submit';
import Author from './page/Author';
import AuthorPaper from './page/AuthorPaper';
import HostDashboard from './page/HostDashboard';
import Host from './page/Host'
import HostEdit from './page/HostEdit';
import HostCateList from './page/HostCateList';
import HostEditCate from './page/HostEditCate';
import HostEditPub from './page/HostEditPub';
import HostCreateCommit from './page/HostCreateCommit';
import HostReview from './page/HostReview';
import ConfrRegistration from './page/ConfrRegistration';
import ConfrVenue from './page/ConfrVenue';
import HostAssign from './page/HostAssign';
import HostEditSubmission from './page/HostEditSubmission';
import HostEditInv from './page/HostEditInv';
import Committee from './page/Committee';
import Review from './page/Review';
import ReviewResult from './page/ReviewResult';
import Admin from './page/Admin';
import ViewPaper from './page/ViewPaper';
import Setting from './page/Setting';
import UserProfile from './page/UserProfile';
import Registration from './components/HostEdit/Registration';
import HostEditLayout from './layout/HostEditLayout';
import Venue from './components/HostEdit/Venue';
import EditQuestion from './components/HostEdit/EditQuestion';
import HostEditPresentation from './page/HostEditPresentation';
import HostEditGuideline from './page/HostEditGuideline';
import HostPartner from './page/HostPartner';
import AdminLayout from './layout/AdminLayout';
import Conference from './components/Admin/Conference';
import AdminPaper from './components/Admin/Paper';
import Publication from './components/Admin/Publication';
import ConfrSubmission from './page/ConfrSubmission';
import ConfrGuideline from './page/ConfrGuideline';
import LoadingPage from './components/LoadingPage';
import PageNotFound from './page/PageNotFound';
import AdminUserDetail from './page/AdminUserDetail';
import Award from './components/HostEdit/Award';
import AwardCateList from './components/HostEdit/AwardCateList';
import AdminSignUp from './page/AdminSignUp';
import AuthorLayout from './layout/AuthorLayout';
import ConfrPaperAward from './page/ConfrPaperAward';
import HostViewRegis from './page/HostViewRegis';


function App() {

  const { user, loading } = useAuthContext()

  if (loading) {
    return (
      <div className='text-center py-5'>
        <LoadingPage />
      </div>
    )
  }

  const hostApi = '/api/user/protected/host'
  const authorApi = '/api/user/protected/author'
  const committeeApi = '/api/user/protected/committee'
  const adminApi = '/api/user/protected'

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path='/login' element={!user ? <Login /> : <Navigate to='/' />} />
        <Route path='/signup' element={!user ? <SignUp /> : <Navigate to='/' />} />
        <Route path='/' element={<HomeLayout><Home /></HomeLayout>} />
        <Route path='/confr' element={<HomeLayout><ConfrList /></HomeLayout>} />
        <Route path='/confr/:id' element={<ConfrLayout><Confr /></ConfrLayout>} />
        <Route
          path='/setting'
          element={<Setting />}
        />
        <Route
          path='/profile'
          element={
            user ?
              <HomeLayout>
                <UserProfile />
              </HomeLayout>
              :
              <Login />
          }
        />
        <Route
          path='/confr/:id/submission'
          element={
            <ConfrLayout>
              <ConfrSubmission />
            </ConfrLayout>
          }
        />
        <Route
          path='/confr/:id/guideline'
          element={
            <ConfrLayout>
              <ConfrGuideline />
            </ConfrLayout>
          }
        />
        <Route
          path='/confr/:id/registration'
          element={
            <ConfrLayout>
              <ConfrRegistration />
            </ConfrLayout>
          }
        />
        <Route
          path='/confr/:id/venue'
          element={
            <ConfrLayout>
              <ConfrVenue />
            </ConfrLayout>
          }
        />
        <Route
          path='/confr/:id/award'
          element={
            <ConfrLayout>
              <ConfrPaperAward />
            </ConfrLayout>
          }
        />
        <Route path='/submit'
          element={
            <PrivateRoute api={authorApi}>
              <HomeLayout>
                <Submit />
              </HomeLayout>
            </PrivateRoute>
          }
        />
        <Route path='/author'
          element={
            <PrivateRoute api={authorApi} >
              <AuthorLayout >
                <Author />
              </AuthorLayout>
            </PrivateRoute>
          }
        />
        <Route
          path='/author/paper/:id'
          element={
            <PrivateRoute api={authorApi}>
              <AuthorLayout>
                <AuthorPaper />
              </AuthorLayout>
            </PrivateRoute>
          }
        />


        {/* host route */}


        <Route
          path='/host'
          element={
            <PrivateRoute api={hostApi}>
              <HostDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path='/host/confr'
          element={
            <PrivateRoute api={hostApi}>
              <HostEditLayout>
                <Host />
              </HostEditLayout>
            </PrivateRoute>
          }
        />
        <Route
          path='/host/confr/registrant'
          element={
            <PrivateRoute api={hostApi}>
              <HostEditLayout>
                <HostViewRegis />
              </HostEditLayout>
            </PrivateRoute>
          }
        />
        <Route
          path='/host/edit'
          element={
            <PrivateRoute api={hostApi}>
              <HostEditLayout>
                <HostEdit />
              </HostEditLayout>
            </PrivateRoute>
          }
        />
        <Route
          path='/host/edit/award'
          element={
            <PrivateRoute api={hostApi}>
              <HostEditLayout>
                <AwardCateList />
              </HostEditLayout>
            </PrivateRoute>
          }
        />
        <Route
          path='/host/edit/award/:id'
          element={
            <PrivateRoute api={hostApi}>
              <HostEditLayout>
                <Award />
              </HostEditLayout>
            </PrivateRoute>
          }
        />
        <Route
          path='/host/edit/regis'
          element={
            <PrivateRoute api={hostApi}>
              <HostEditLayout>
                <Registration />
              </HostEditLayout>
            </PrivateRoute>
          }
        />
        <Route
          path='/host/edit/venue'
          element={
            <PrivateRoute api={hostApi}>
              <HostEditLayout>
                <Venue />
              </HostEditLayout>
            </PrivateRoute>
          }
        />
        <Route
          path='/host/edit/question'
          element={
            <PrivateRoute api={hostApi}>
              <HostEditLayout>
                <EditQuestion />
              </HostEditLayout>
            </PrivateRoute>
          }
        />
        <Route
          path='/host/edit/present'
          element={
            <PrivateRoute api={hostApi}>
              <HostEditLayout>
                <HostEditPresentation />
              </HostEditLayout>
            </PrivateRoute>
          }
        />
        <Route
          path='/host/edit/guideline'
          element={
            <PrivateRoute api={hostApi}>
              <HostEditLayout>
                <HostEditGuideline />
              </HostEditLayout>
            </PrivateRoute>
          }
        />
        <Route
          path='/host/edit/partner'
          element={
            <PrivateRoute api={hostApi}>
              <HostEditLayout>
                <HostPartner />
              </HostEditLayout>
            </PrivateRoute>
          }
        />
        <Route
          path='/host/edit/category'
          element={
            <PrivateRoute api={hostApi}>
              <HostEditLayout>
                <HostCateList />
              </HostEditLayout>
            </PrivateRoute>
          }
        />
        <Route
          path='/host/edit/category/:id'
          element={
            <PrivateRoute api={hostApi} >
              <HostEditLayout>
                <HostEditCate />
              </HostEditLayout>
            </PrivateRoute>
          }
        />
        <Route
          path='/host/edit/publication'
          element={
            <PrivateRoute api={hostApi}>
              <HostEditLayout>
                <HostEditPub />
              </HostEditLayout>
            </PrivateRoute>
          }
        />
        <Route
          path='/host/committee'
          element={
            <PrivateRoute api={hostApi}>
              <HostEditLayout>
                <HostCreateCommit />
              </HostEditLayout>
            </PrivateRoute>
          }
        />
        <Route
          path='/host/paper/:id'
          element={
            <PrivateRoute api={hostApi}>
              <HostEditLayout>
                <HostReview />
              </HostEditLayout>
            </PrivateRoute>
          }
        />
        <Route
          path='/host/assign/:id/:cate'
          element={
            <PrivateRoute api={hostApi}>
              <HostEditLayout>
                <HostAssign />
              </HostEditLayout>
            </PrivateRoute>
          }
        />
        <Route
          path='/host/edit/submission'
          element={
            <PrivateRoute api={hostApi} >
              <HostEditLayout>
                <HostEditSubmission />
              </HostEditLayout>
            </PrivateRoute>
          }
        />
        <Route
          path='/host/edit/invite-speaker'
          element={
            <PrivateRoute api={hostApi}>
              <HostEditLayout>
                <HostEditInv />
              </HostEditLayout>
            </PrivateRoute>
          }
        />



        {/* committee route */}



        <Route
          path='/committee'
          element={
            <PrivateRoute api={committeeApi}>
              <Committee />
            </PrivateRoute>
          }
        />

        <Route
          path='/committee/review/:id'
          element={
            <PrivateRoute api={committeeApi}>
              <Review />
            </PrivateRoute>
          }
        />

        <Route
          path='/committee/review/result/:id'
          element={
            <PrivateRoute api={committeeApi} >
              <ReviewResult />
            </PrivateRoute>
          }
        />


        {/* admin route */}

        <Route
          path='/admin/signup'
          element={<AdminSignUp />}
        />

        <Route
          path='/admin'
          element={
            <PrivateRoute api={adminApi}>
              <AdminLayout>
                <Admin />
              </AdminLayout>
            </PrivateRoute>
          }
        />
        <Route
          path='/admin/user/:id'
          element={
            <PrivateRoute api={adminApi}>
              <AdminLayout>
                <AdminUserDetail />
              </AdminLayout>
            </PrivateRoute>
          }
        />

        <Route
          path='/admin/paper/:id'
          element={
            <PrivateRoute api={adminApi} >
              <ViewPaper />
            </PrivateRoute>
          }
        />

        <Route
          path='/admin/conference'
          element={
            <PrivateRoute api={adminApi}>
              <AdminLayout>
                <Conference />
              </AdminLayout>
            </PrivateRoute>
          }
        />

        <Route
          path='/admin/paper'
          element={
            <PrivateRoute api={adminApi}>
              <AdminLayout>
                <AdminPaper />
              </AdminLayout>
            </PrivateRoute>
          }
        />

        <Route
          path='/admin/publication'
          element={
            <PrivateRoute api={adminApi}>
              <AdminLayout>
                <Publication />
              </AdminLayout>
            </PrivateRoute>
          }
        />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;