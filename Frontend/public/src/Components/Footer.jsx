import React from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { NavLink } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    const foots = [
        {
            name: "Github",
            icon: <GitHubIcon />,
            url: "https://github.com/Mohitlenka22"
        },
        {
            name: "Facebook",
            icon: <FacebookIcon />
        },
        {
            name: "LinkedIn",
            icon: <LinkedInIcon />,
            url: "https://www.linkedin.com/in/mohit-lenka-5495b2229"
        }
    ]
    const getYear = ()=>{
        let date = new Date(Date.now());
        let year = date.getFullYear();
        return year;
    }
    return (
        <div className='footer'>
            <h3>&copy; Copyrights all Reserved-{getYear()}</h3>
            {foots.map((foot)=>{
                return <NavLink key= {foot.name} to={foot.url} id='foot'>{foot.icon}{foot.name}</NavLink>
            })}
        </div>
    )
}

export default Footer