import { Route, Routes } from "react-router";
import "./style/banner.css";
import "./App.css";
import 'react-toastify/dist/ReactToastify.min.css';
import { Loader, Toast } from "./component/Components";
import { enableInterceptor } from "./axios/LoaderService.js";
import { Home, Login, Register, Logout } from "./page/page";

function App() {  
  enableInterceptor();
  
  return (
    <div className="app bg-white">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/logout" element={<Logout />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
      { loading && <Loader/> }
      <Toast/>
    </div>
  );
}

export default App;
