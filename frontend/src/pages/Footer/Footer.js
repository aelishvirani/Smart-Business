import React from 'react'
import { AiOutlineHeart, AiOutlineInstagram } from 'react-icons/ai';
import { FiFacebook } from 'react-icons/fi';
import { IoLogoYoutube } from 'react-icons/io';
import { Input, Stack } from '@chakra-ui/react'
import './footercss.css'
import { Link } from 'react-router-dom';
const Footer = () => {
    return (
        <div className="footerCmp">
            <footer>
                <div className="footerCategorie">
                    <h1>Categories</h1>
                    <ul>
                        <li><Link to='/shop/?cg=Women'>Women</Link></li>
                        <li><Link to='/shop/?cg=Men'>Men</Link></li>
                        <li><Link to='/shop/?cg=Shoes'>Shoes</Link></li>
                        <li><Link to='/shop/?cg=Watches'>Watches</Link></li>
                    </ul>
                </div>

                <div className="fooHelp">
                    <h1>Help</h1>
                    <ul>
                        <li>Tracke Order</li>
                        <li>Returns</li>
                        <li>Shipping</li>
                        <li>FAQs</li>
                    </ul>
                </div>

                <div className="footerGetInTouch">
                    <h1>Get in touch</h1>
                    <ul>
                        <p>Any questions? Let us know on email
                            or call us on (+91) 7894561236</p>
                        <li className="footerIcons">
                            <FiFacebook size="25" />
                        </li>
                        <li className="footerIcons">
                            <AiOutlineInstagram size="25" />
                        </li>
                        <li className="footerIcons">
                            <IoLogoYoutube size="25" />
                        </li>
                    </ul>
                </div>


                <div className="creditsIcons">
                    <ul>
                        <li><img src="https://i.imgur.com/AHCoUZO.png" className="img1" /></li>
                        <li><img src="https://i.imgur.com/JZRipBg.png" className="img2" /></li>
                        <li><img src="https://i.imgur.com/l8OAGyo.png" className="img3" /></li>
                        <li><img src="https://i.imgur.com/IDHC2iv.png" className="img4" /></li>
                    </ul>

                </div>

                <div className="paragraphFooter"><p>Copyright ©2021 All rights reserved |</p>
                    <Link to='' >Aelish Virani</Link>
                    <Link to=''  >Jenil Kheni</Link>
                </div>



            </footer>

        </div>
    )
}

export default Footer;
