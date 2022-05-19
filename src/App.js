import { Route, Routes } from "react-router";
import "./style/banner.css";
import "./App.css";
import 'react-toastify/dist/ReactToastify.min.css';
import { Loader, Toast } from "./component/Components";
import { useNote } from "./context/NoteContext.js";
import { enableInterceptor } from "./axios/LoaderService.js";
import { Archive, Home, Labels, Login, Register, Logout, Trash, Notes } from "./page/page";
import { RequireAuth } from "./RequireAuth";
import { useAuth } from "./context/AuthContext";
import { FilterForm } from "./component/FilterForm";
import { useForm } from "./context/FormContext";

function App() {
  const { loading } = useNote();
  const { auth } = useAuth();
  const { filterFlag } = useForm();
  
  enableInterceptor();
  
  return (
    <div className="app bg-white">
      <Routes>
        <Route path="/" element={auth && auth.isAuth ? <Notes/> : <Home />}></Route>
        <Route path="/notes" element={<RequireAuth><Notes /></RequireAuth>}></Route>
        <Route path="/logout" element={<Logout />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/trash" element={<RequireAuth><Trash /></RequireAuth>}></Route>
        <Route path="/labels" element={<RequireAuth><Labels /></RequireAuth>}></Route>
        <Route path="/archive" element={<RequireAuth><Archive /></RequireAuth>}></Route>
      </Routes>
      { loading && <Loader/> }
      { filterFlag && <FilterForm/> }
      <Toast/>
    </div>
  );
}

export default App;
