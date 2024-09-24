import { BrowserRouter ,Routes,Route } from "react-router-dom";
import LoginPage from './Components/LoginPage/LoginPage'
import Create from './Components/Creation/Create';
import EmployeeList from './Components/EmployeeList/EmployeesList';
import Layout from "./Components/Layout";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<LoginPage/>}/>
      <Route path='/create' element={<Create/>}/>
      <Route path='/dash' element={<Layout/>}/>
      <Route path='/list' element={<EmployeeList/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
