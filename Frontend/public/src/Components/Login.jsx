import axios from './axios.js';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Signup.css';
// import Cookies from 'js-cookie';



const Login = () => {

    const navigate = useNavigate();
    // const [token, setToken] = useState('');
    const [userLogin, setUserLogin] = useState(() => {
        return {
            email: '', password: ''
        }
    });

    let name, value;
    const HandleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;

        // setUserLogin({ ...userLogin, [name]: value });
        setUserLogin((prevState) => {
            return { ...prevState, [name]: value }
        });
    }

    const Submit = async (e) => {
        e.preventDefault();
        const res = await axios.post("/login", userLogin, { withCredentials: true });
        if (res.status === 200) {
            alert(res.data.msg);
            navigate("/");
        }
        else {
            alert(res.data.error);
        }
    }
    return (
        <div className='signup'>
            <form >
                <div>
                    <center><h4 style={{ fontSize: "500" }}>Login</h4></center>
                </div>
                <div>
                    <EmailIcon id='Icon' />
                    <input type="email" placeholder='email' name='email' onChange={HandleInputs} value={userLogin.email} required autoComplete='false' />
                </div>
                <div>
                    <LockIcon id='Icon' />
                    <input type="password" placeholder='Password' name='password' onChange={HandleInputs} value={userLogin.password} required autoComplete='false' />
                </div>
                <div>
                    <center>
                        <input type="submit" value="Submit" onClick={Submit} />
                    </center>
                </div>
                <div>
                    <NavLink to="/ForgotPassword" >Forgot Password</NavLink>
                </div>
            </form>
        </div>
    )
}

export default Login