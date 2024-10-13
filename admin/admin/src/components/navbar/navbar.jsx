import "./navbar.css";
import logo from "../../assets/Logo.png"
import PeopleIcon from '@mui/icons-material/People';
export default function Navbar() {
  return(
      <div className="navbar">
        <img className="logo" src={logo} alt="" />
        <PeopleIcon/>
        {/* <img className="profile" src="" alt="" /> */}

      </div>

  ) 
}
