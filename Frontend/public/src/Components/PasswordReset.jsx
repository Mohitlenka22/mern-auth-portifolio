import React, { useState } from 'react';
import LockIcon from '@mui/icons-material/Lock';
import axios from './axios.js';
import { useParams } from 'react-router-dom';

const PasswordReset = () => {
    const [password, setPassword] = useState("");
    let { userToken } = useParams();
    const Handle = (e) => {
        let value = e.target.value;
        setPassword(value);
        console.log(password)
    }
    const Changepassword = async (e) => {
        e.preventDefault();
        const res = await axios.put(`/passwordreset/${userToken}`, {password});
        alert(res.data);
    }
    return (
        <div>
            <form className='signup' >
                <div>
                    <center><h4 style={{ fontSize: "500" }}>PasswordReset Password</h4></center>
                </div>
                <div>
                    <LockIcon id='Icon' />
                    <input type="password" placeholder='password' name='password' value={password} onChange={Handle} required autoComplete='false' />
                </div>
                <div>
                    <center>
                        <input type="submit" value="Submit" onClick={Changepassword} />
                    </center>
                </div>
            </form>
        </div>
    )
}

export default PasswordReset