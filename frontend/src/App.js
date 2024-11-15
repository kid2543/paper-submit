import './App.css';

import { Route, Routes, Navigate } from 'react-router-dom'
import { useAuthContext } from './hook/useAuthContext';

//hook

//page
import Home from './page/Home';
import SignUp from './page/SignUp';
import Login from './page/Login';
import Navbar from './components/Navbar';

function App() {
  const { user } = useAuthContext()

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={user ? <Home /> : <Navigate to='/login' />} />
        <Route path='/login' element={!user ? <Login /> : <Navigate to='/' />} />
        <Route path='/signup' element={!user ? <SignUp /> : <Navigate to='/' />} />
      </Routes>
    </>
  );
}

export default App;
