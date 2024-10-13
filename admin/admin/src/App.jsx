import { Sidebar, Navbar } from "./components";
import { Routes, Route } from "react-router-dom";
import { AddItems, AllUser, ListItems, Order } from "./pages";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  // const url = "http://localhost:5001/api"
  const url =   "https://food-delivery-b-mearnapp.vercel.app/api"
  return (
    <div>
      <ToastContainer autoClose={300} hideProgressBar={true}/>
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path="/add" element={<AddItems url={url}/>}/>
          <Route path="/list" element={<ListItems url={url}/>}/>
          <Route path="/order" element={<Order url={url}/>}/>
          <Route path="/users" element={<AllUser url={url}/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
