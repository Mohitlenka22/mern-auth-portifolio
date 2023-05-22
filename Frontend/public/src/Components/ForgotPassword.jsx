import React, { useState } from 'react';
import EmailIcon from '@mui/icons-material/Email';
import axios from './axios';


const ForgotPassword = () => {

    const [email, setEmail] = useState("");

    const forgotPassword = async (e) => {
        e.preventDefault();
        const res = await axios.post("/forgot", { email });
        alert(res.data);
    }
    return (
        <div className='signup'> 
            <div>
                <EmailIcon id='Icon' />
                <input type="email" placeholder='email' name='email' value={email} onChange={(e) => { setEmail(e.target.value) }} required autoComplete='false' />
            </div>
            <div>
                <center>
                    <input type="submit" value="Submit" onClick={forgotPassword} />
                </center>
            </div>

        </div>
    )
}

export default ForgotPassword