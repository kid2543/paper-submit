import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Route, Routes } from 'react-router-dom'

//component
import Layout from './components/Layout';
import HostLayout from './components/HostLayout';

//hook
import UseAuth from './hook/useAuth';

//page
import Home from './page/Home';
import ConfrList from './page/ConfrList';
import Paper from './page/Paper';
import Confr from './page/Confr';
import CommitteesList from './page/CommitteesList';
import Submit from './page/Submit';
import Host from './page/Host';
import HostCreate from './page/HostCreate';
import Author from './page/Author';
import AuthorEdit from './page/AuthorEdit';
import HostEdit from './page/HostEdit';
import Committee from './page/Committee';
import Review from './page/Review';
import HostPaper from './page/HostPaper';
import HostAssign from './page/HostAssign'
import HostReview from './page/HostReview';
import HostOverAll from './page/HostOverAll';
import HostCommittees from './page/HostCommittees';
import HostCreateCommit from './page/HostCreateCommit';
import AuthorPaper from './page/AuthorPaper';
import AuthorResult from './page/AuthorResult';
import SignUp from './page/SignUp';
import SignIn from './page/SignIn';
import PaperDetail from './page/PaperDetail';
import TestComponent from './components/TestComponent';


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
        <Route path='/sign-up' element={
          <SignUp />
        } />
        <Route path='/sign-in' element={
          <SignIn state={1} />
        } />
        <Route path='/confr' element={
          <Layout>
            <ConfrList />
          </Layout>
        } />
        <Route path='/confr/:id' element={
          <Confr />
        }
        />
        <Route path='/committees-list/:id' element={
          <CommitteesList />
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
        <Route path='/submit' element={
          <Submit />
        } />

        {/* host */}
        <Route path='/host' element={
          <UseAuth>
            <HostLayout>
              <Host />
            </HostLayout>
          </UseAuth>
        } />
        <Route path='/host/create' element={
          <UseAuth>
            <HostLayout>
              <HostCreate />
            </HostLayout>
          </UseAuth>
        } />
        <Route path='/host/edit/:id' element={
          <UseAuth>
            <HostLayout>
              <HostEdit />
            </HostLayout>
          </UseAuth>
        } />
        <Route path='/host/paper/:id' element={
          <UseAuth>
            <HostPaper />
          </UseAuth>
        } />
        <Route path='/host/assign/:id' element={
          <UseAuth>
            <HostAssign />
          </UseAuth>
        } />
        <Route path='/host/review/:id' element={
          <UseAuth>
            <HostReview />
          </UseAuth>
        } />
        <Route path='/host/over-all/:id' element={
          <UseAuth>
            <HostOverAll />
          </UseAuth>
        } />
        <Route path='/host/committees' element={
          <UseAuth>
            <HostCommittees />
          </UseAuth>
        } />
        <Route path='/host/committees/create' element={
          <UseAuth>
            <HostCreateCommit />
          </UseAuth>
        } />
        {/* end host */}


        {/* author */}
        <Route path='/author' element={
          <Author />
        } />
        <Route path='/author/edit/:id' element={
          <AuthorEdit />
        } />
        <Route path='/author/paper/:id' element={
          <AuthorPaper />
        } />
        <Route path='/author/result/:id' element={
          <AuthorResult />
        } />
        {/* end author */}

        {/* for Committees */}
        <Route path='/committee' element={
          <Committee />
        } />
        <Route path='/committee/review/:id' element={
          <Review />
        } />
      </Routes>
    </>
  );
}

export default App;
