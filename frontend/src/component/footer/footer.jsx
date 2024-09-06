import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import "./footer.css";
const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src="" alt="" />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
            mollitia ut asperiores debitis accusamus natus architecto alias
            impedit recusandae esse. Eos odit libero velit repudiandae nostrum
            error magni repellat maiores?
          </p>
          <div className="footer-social-icon">
            <FacebookIcon />
            <TwitterIcon />
            <LinkedInIcon />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>0000-1234567</li>
            <li>abc@gmail.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyRight">
        Copyright 2024 &copy; abc.com - All Rights Reserved
      </p>
    </div>
  );
};
export default Footer;
