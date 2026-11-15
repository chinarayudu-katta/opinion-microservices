import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(
        Boolean(localStorage.getItem("user_token"))
    )
    const navigate = useNavigate();

    useEffect(() => {

        const authHandler = () => {
            setIsLoggedIn(
                Boolean(localStorage.getItem("user_token"))
            );
        };

        window.addEventListener("authChange", authHandler);

        return () => {
            window.removeEventListener("authChange", authHandler);
        };

    }, []);

    const logoutHandler = () => {
        localStorage.removeItem("user_token")
        localStorage.removeItem("userId")
        localStorage.removeItem("userName")

        window.dispatchEvent(new Event("authChange"));

        navigate("/");
    }
  return (
    <div className="navSection">
      <div className="title">
        <h1>Opinion Hub</h1>
      </div>
      <div className="auth">
        {isLoggedIn ? ( <button onClick={logoutHandler}>Logout</button> ) : (
            <>
        <Link to="/user/register">    
        <div>Register</div>
        </Link>
        <Link to="/user/login">
        <div>Login</div>
        </Link>
        </>
        )}
      </div>

    </div>
  )
}

export default Navbar
