// Filename - components/Sidebar.js

import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./SidebarData";
import SubMenu from "./SubMenu";
import { IconContext } from "react-icons/lib";
import "./Sidebar.css"
import { logout } from '../actions/userActions'
import { CgProfile } from "react-icons/cg"
import { IoLogOutOutline } from "react-icons/io5"
import { BsArrowRightShort } from "react-icons/bs"
import { MdSearch, MdKeyboardArrowRight } from "react-icons/md"
const Nav = styled.div`
	${'' /* background: #15171c; */}
	height: 80px;
	display: flex;
	justify-content: flex-start;
	align-items: center;
`;

const NavIcon = styled(Link)`
	margin-left: 2rem;
	font-size: 2rem;
	height: 80px;
	display: flex;
	justify-content: flex-start;
	align-items: center;
`;

const SidebarNav = styled.nav`
	${'' /* background: grey; */}
    background: #fac864;
	width: 250px;
	height: 100%;
	display: flex;
	justify-content: center;
    align-items: center;
	position: fixed;
	top: -76px;
	left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
	transition: 350ms;
	z-index: 10;
`;

const SidebarWrap = styled.div`
	width: 100%;
`;

const Sidebar = () => {
    const [sidebar, setSidebar] = useState(false);
    const [signin, setSignin] = useState(null)

    const showSidebar = () => setSidebar(!sidebar);



    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <>
            <IconContext.Provider value={{ color: "black" }}>
                <Nav>
                    <NavIcon to="#">
                        <FaIcons.FaBars
                            onClick={showSidebar}
                        />
                    </NavIcon>
                    <h1 className="logo">
                        Smart Business
                    </h1>

                    {userInfo ? (<div className="ic_sett_dis" style={{ position: "relative", right: "-38%  " }}><Link to="/profile"><CgProfile size="25" className="settingIcon" /></Link>
                        <IoLogOutOutline size='28' className="displayIcon" onClick={logoutHandler} />
                    </div>

                    ) : <Link to='/login' > <div className='signin' onMouseOver={() => setSignin(!signin)} onMouseOut={() => setSignin(!signin)}  > Sign in
                        {!signin ? <BsArrowRightShort size='25' /> : <MdKeyboardArrowRight size='25' />}
                    </div>
                    </Link>}


                </Nav>
                <SidebarNav sidebar={sidebar}>
                    <SidebarWrap>
                        <NavIcon to="#">
                            <AiIcons.AiOutlineClose
                                onClick={showSidebar}
                            />
                        </NavIcon>
                        {SidebarData.map((item, index) => {
                            return (
                                <SubMenu
                                    item={item}
                                    key={index}
                                />
                            );
                        })}
                    </SidebarWrap>

                </SidebarNav>

            </IconContext.Provider>
        </>
    );
};

export default Sidebar;

