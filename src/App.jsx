import './App.css';
import Router from './shared/Router';
import { ToastContainer } from 'react-toastify'; // ToastContainer 임포트
import 'react-toastify/dist/ReactToastify.css'; // Toastify 스타일 불러오기
function App() {
  return (
    <>
      <Router />
      <ToastContainer />
    </>
  );
}

export default App;
