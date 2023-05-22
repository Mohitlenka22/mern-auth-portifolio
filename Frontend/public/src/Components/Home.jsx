import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from './Footer'
import Navbar from './Navbar'
import axios from './axios'
import Content from './Content'
import './Home.css';

const Home = () => {
    const navigate = useNavigate();
    const [show, setShow] = useState(true);
    const [loginUserData, setLoginUserData] = useState(() => {
        return ({
            username: '', email: ''
        })
    });

    const fetchdata = async () => {
        const res = await axios.get("/getdata", { withCredentials: true });
        if (res.status === 200) {
            setShow(false);
            setLoginUserData(res.data);
        }
    }
    const Logout = async () => {
        const res = await axios.get("/logout", { withCredentials: true });
        if (res.status === 200) {
            setShow(true);
            setLoginUserData({
                username: '', email: ''
            });
            navigate("/");
        }
    }


    useEffect(() => {
        fetchdata();
    }, []);

    

    return (
        <div className='home'>
            <Navbar show={show} Logout={Logout} />
            <Content loginUserData={loginUserData} />
            <Footer />
        </div>
    )
}

export default Home