import React from 'react';
import photo from '.././photo.svg';
import { NavLink } from 'react-router-dom';
import './Content.css'

const Content = ({ loginUserData }) => {
    return (
        <div className='Content_Container'>
            <div className="Content_left">
                <h1>Welcome To My Arena!!!</h1>
                {loginUserData.username}
                <p>
                    Welcome to the My website , My Name is <strong >Mohit Lenka</strong >. Known languages are JavaScript, C, C++, Python, Node.js, Express, React.js, as well as tools such as npm and pip. I been Learning & improving my skills for past 2years to build these projects. Explore My portfolio and discover My projects.</p>
                <NavLink >Let's Started!</NavLink>
            </div>
            <div className="Content_right">
                <img src={photo} alt="Error" />
            </div>
        </div>
    )
}

export default Content