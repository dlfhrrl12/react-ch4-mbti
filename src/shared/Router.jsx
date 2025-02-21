import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './../pages/Home';
import Login from './../pages/Login';
import Signup from './../pages/Signup';
import Layout from '../components/Layout';
import TestPage from '../pages/TestPage';
import TestResultPage from '../pages/TestResultPage';
import Profile from '../pages/Profile';
import ProtectedRoute from '../api/ProtectedRouter';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/testpage" element={<TestPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/testresult" element={<TestResultPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
