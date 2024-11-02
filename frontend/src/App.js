import './App.css';

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
import AdminUserDetail from './page/AdminUserDetail';
import AdminAuth from './hook/AdminAuth';
import HostEditCate from './page/HostEditCate';
import HostDashboard from './page/HostDashboard';
import HostCateList from './page/HostCateList';
import HostCommitList from './page/HostCommitList';
import EditPub from './components/HostEdit/EditPub';
import ReviewResult from './page/ReviewResult';
import Host from './page/Host'
import HostDashLayout from './components/HostDashLayout';
import ConfrPub from './page/ConfrPub';
import ConfrPartner from './page/ConfrPartner';
import AdminEditConfr from './page/AdminEditConfr';

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>} />
      </Routes>
    </>
  );
}

export default App;
