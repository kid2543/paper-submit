import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Route, Routes } from 'react-router-dom'

//component
import Layout from './components/Layout';
import HostLayout from './components/HostLayout';

//hook
import HostAuth from './hook/HostAuth';

//page
import Home from './page/Home';
import ConfrList from './page/ConfrList';
import Paper from './page/Paper';
import Confr from './page/Confr';
import CommitteesList from './page/CommitteesList';
import Submit from './page/Submit';
import HostCreate from './page/HostCreate';
import Author from './page/Author';
import HostEdit from './page/HostEdit';
import Committee from './page/Committee';
import Review from './page/Review';
import HostPaper from './page/HostPaper';
import HostAssign from './page/HostAssign'
import HostReview from './page/HostReview';
import HostOverAll from './page/HostOverAll';
import HostCreateCommit from './page/HostCreateCommit';
import AuthorPaper from './page/AuthorPaper';
import AuthorResult from './page/AuthorResult';
import SignUp from './page/SignUp';
import SignIn from './page/SignIn';
import PaperDetail from './page/PaperDetail';
import TestComponent from './components/TestComponent';
import AuthorAuth from './hook/AuthorAuth';
import CommitAuth from './hook/CommitAuth';
import TutorialHost from './page/TutorialHost';
import TutorialAuthor from './page/TutorialAuthor';
import TutorialCommittee from './page/TutorialCommittee';
import UserProfile from './page/UserProfile';
import AuthorLayout from './components/AuthorLayout';
import CommitteeLayout from './components/CommitteeLayout';
import ConfrTemplate from './page/ConfrTemplate';
import ConfrGuideline from './page/ConfrGuideline';
import ConfrPresentGuideline from './page/ConfrPresentGuideline';
import ConfrLayout from './components/ConfrLayout';
import ErrorPage from './page/ErrorPage';
import ConfrInvSpeaker from './page/ConfrInvSpeaker';
import ConfrRegistration from './page/ConfrRegistration';
import ConfrVenue from './page/ConfrVenue';
import HostUpdateCommittee from './page/HostUpdateCommittee';
import RegisConfr from './page/RegisConfr';
import Admin from './page/Admin';
import AdminLayout from './components/AdminLayout';
import AdminCreateHost from './page/AdminCreateHost';
import AdminUserDetail from './page/AdminUserDetail';
import AdminPub from './page/AdminPub';
import AdminAuth from './hook/AdminAuth';
import HostEditCate from './page/HostEditCate';
import HostDashboard from './page/HostDashboard';
import HostCateList from './page/HostCateList';
import HostCommitList from './page/HostCommitList';
import EditPub from './components/HostEdit/EditPub';
import ReviewResult from './page/ReviewResult';

function App() {

  return (
    <>
      <Routes>
        <Route path='/test' element={
          <TestComponent />
        } />
        <Route path='/' element={
          <Layout>
            <Home />
          </Layout>
        } />
        <Route path='/tutorial/host' element={
          <Layout>
            <TutorialHost />
          </Layout>
        } />
        <Route path='/tutorial/author' element={
          <Layout>
            <TutorialAuthor />
          </Layout>
        } />
        <Route path='/tutorial/committee' element={
          <Layout>
            <TutorialCommittee />
          </Layout>
        } />
        <Route path='/user-profile' element={
          <Layout>
            <UserProfile />
          </Layout>
        } />
        <Route path='/sign-up' element={
          <SignUp />
        } />
        <Route path='/sign-in' element={
          <SignIn />
        } />
        <Route path='/confr' element={
          <Layout>
            <ConfrList />
          </Layout>
        } />
        <Route path='/confr/:id' element={
          <ConfrLayout>
            <Confr />
          </ConfrLayout>
        }
        />
        <Route path='/confr/:id/committees' element={
          <ConfrLayout>
            <CommitteesList />
          </ConfrLayout>
        }
        />
        <Route path='/confr/:id/template' element={
          <ConfrLayout>
            <ConfrTemplate />
          </ConfrLayout>
        }
        />
        <Route path='/confr/:id/guideline' element={
          <ConfrLayout>
            <ConfrGuideline />
          </ConfrLayout>
        }
        />
        <Route path='/confr/:id/present-guideline' element={
          <ConfrLayout>
            <ConfrPresentGuideline />
          </ConfrLayout>
        }
        />
        <Route path='/confr/:id/inv-speaker' element={
          <ConfrLayout>
            <ConfrInvSpeaker />
          </ConfrLayout>
        }
        />
        <Route path='/confr/:id/registration' element={
          <ConfrLayout>
            <ConfrRegistration />
          </ConfrLayout>
        }
        />
        <Route path='/confr/:id/venue' element={
          <ConfrLayout>
            <ConfrVenue />
          </ConfrLayout>
        }
        />
        <Route path='/paper' element={
          <Layout>
            <Paper />
          </Layout>
        } />
        <Route path='/paper/:id' element={
          <Layout>
            <PaperDetail />
          </Layout>
        } />
        <Route path='/submit/:id' element={
          <AuthorAuth>
            <AuthorLayout>
              <Submit />
            </AuthorLayout>
          </AuthorAuth>
        } />
        <Route path='/regis/:id' element={
          <AuthorAuth>
            <AuthorLayout>
              <RegisConfr />
            </AuthorLayout>
          </AuthorAuth>
        } />

        {/* host */}
        <Route path='/host' element={
          <HostAuth>
            <HostLayout>
              <HostDashboard />
            </HostLayout>
          </HostAuth>
        } />
        <Route path='/host/cate' element={
          <HostAuth>
            <HostLayout>
              <HostCateList />
            </HostLayout>
          </HostAuth>
        } />
        <Route path='/host/committee' element={
          <HostAuth>
            <HostLayout>
              <HostCommitList />
            </HostLayout>
          </HostAuth>
        } />
        <Route path='/host/pub' element={
          <HostAuth>
            <HostLayout>
              <EditPub />
            </HostLayout>
          </HostAuth>
        } />
        <Route path='/host/create' element={
          <HostAuth>
            <HostLayout>
              <HostCreate />
            </HostLayout>
          </HostAuth>
        } />
        <Route path='/host/cate/:id' element={
          <HostAuth>
            <HostLayout>
              <HostEditCate />
            </HostLayout>
          </HostAuth>
        } />
        <Route path='/host/edit' element={
          <HostAuth>
            <HostLayout>
              <HostEdit />
            </HostLayout>
          </HostAuth>
        } />
        <Route path='/host/paper/:id' element={
          <HostAuth>
            <HostLayout>
              <HostPaper />
            </HostLayout>
          </HostAuth>
        } />
        <Route path='/host/assign/:paper' element={
          <HostAuth>
            <HostLayout>
              <HostAssign />
            </HostLayout>
          </HostAuth>
        } />
        <Route path='/host/review/:id' element={
          <HostAuth>
            <HostReview />
          </HostAuth>
        } />
        <Route path='/host/over-all/:id' element={
          <HostAuth>
            <HostLayout>
              <HostOverAll />
            </HostLayout>
          </HostAuth>
        } />
        <Route path='/host/committees/create' element={
          <HostAuth>
            <HostLayout>
              <HostCreateCommit />
            </HostLayout>
          </HostAuth>
        } />
        <Route path='/host/committees/update/:id' element={
          <HostAuth>
            <HostLayout>
              <HostUpdateCommittee />
            </HostLayout>
          </HostAuth>
        } />
        {/* end host */}


        {/* author */}
        <Route path='/author' element={
          <AuthorAuth>
            <AuthorLayout>
              <Author />
            </AuthorLayout>
          </AuthorAuth>
        } />
        <Route path='/author/paper/:id' element={
          <AuthorAuth>
            <AuthorLayout>
              <AuthorPaper />
            </AuthorLayout>
          </AuthorAuth>
        } />
        <Route path='/author/result/:id' element={
          <AuthorAuth>
            <AuthorLayout>
              <AuthorResult />
            </AuthorLayout>
          </AuthorAuth>
        } />
        {/* end author */}

        {/* for Committees */}
        <Route path='/committee' element={
          <CommitAuth>
            <CommitteeLayout>
              <Committee />
            </CommitteeLayout>
          </CommitAuth>
        } />
        <Route path='/committee/review/:id' element={
          <CommitAuth>
            <CommitteeLayout>
              <Review />
            </CommitteeLayout>
          </CommitAuth>
        } />
        <Route path='/committee/review/result/:id' element={
          <CommitAuth>
            <CommitteeLayout>
              <ReviewResult />
            </CommitteeLayout>
          </CommitAuth>
        } />

        {/* for admin */}
        <Route path='/admin' element={
          <AdminAuth>
            <AdminLayout>
              <Admin />
            </AdminLayout>
          </AdminAuth>
        } />
        <Route path='/admin/create' element={
          <AdminAuth>
            <AdminLayout>
              <AdminCreateHost />
            </AdminLayout>
          </AdminAuth>
        } />
        <Route path='/user/:id' element={
          <AdminAuth>
            <AdminLayout>
              <AdminUserDetail />
            </AdminLayout>
          </AdminAuth>
        } />
        <Route path='/admin/publication' element={
          <AdminAuth>
            <AdminLayout>
              <AdminPub />
            </AdminLayout>
          </AdminAuth>
        } />
        <Route path='*' element={
          <Layout>
            <ErrorPage />
          </Layout>
        } />
      </Routes>
    </>
  );
}

export default App;
