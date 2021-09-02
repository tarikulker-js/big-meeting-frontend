import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';

import './HamburgerMenu.css';
import { IconContext } from 'react-icons';

function HamburgerMenu() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => { 
    setSidebar(!sidebar);

  }
  
  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='HamburgerMenu'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars className="menu-bars" style={{color: "black", float: "left", cursor: "pointer"}} onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='HamburgerMenu-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            
						<li key="" className="">
							<Link to="">
								<span></span>
							</Link>
						</li>

            <li key="" className="">
							<Link to="">
								<span></span>
							</Link>
						</li>

            <li key="" className="">
							<Link to="">
								<span></span>
							</Link>
						</li>

            <li key="" className="goToHome">
							<Link to="/">
								<span>Ana Sayfa</span>
							</Link>
						</li>
            
						<li key="" className="">
							<Link to="">
								<span></span>
							</Link>
						</li>
						
						<li key="" className="">
							<Link to="">
								<span></span>
							</Link>
						</li>
						
						<li key="" className="">
							<Link to="">
								<span></span>
							</Link>
						</li>

						<li key="" className="goToCreateMeeting">
							<Link to="/create-meeting">
								<span>Meeting Oluştur</span>
							</Link>
						</li>       

            						
						<li key="" className="">
							<Link to="">
								<span></span>
							</Link>
						</li>
						
						<li key="" className="">
							<Link to="">
								<span></span>
							</Link>
						</li>

            						
						<li key="" className="">
							<Link to="/logout">
								<span>Çıkış Yap</span>
							</Link>
						</li>
						
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default HamburgerMenu;