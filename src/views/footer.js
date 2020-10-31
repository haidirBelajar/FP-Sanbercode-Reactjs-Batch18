import React from 'react'
import { Layout } from 'antd'
import { createFromIconfontCN } from '@ant-design/icons';
import {
    BrowserRouter as Router ,
    Switch,
    Route,
    Redirect,
    Link
  } from "react-router-dom";
import fb from '../icon/facebook-logo.svg'
import igicon from '../icon/instagram.svg'
import linkedin from '../icon/linkedin.svg'
import telegramicon from '../icon/telegram.svg'


const {Footer} = Layout

const FooterView = () => {

    const IconFont = createFromIconfontCN({
        scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
      });

    return (
        <Layout>
        <Footer>
            <div>
            <label className="comoy"> created by comoy</label>
            </div>
            <div>
               <ul>
                    <li>
                        <a href="https://web.facebook.com/haidir.chaniago" target="_blank">
                        <img src={fb} alt="fb" className="icon-footer" />
                        </a>    
                    </li>   
                    <li>
                         <a href="https://www.instagram.com/haidirchaniago " target="_blank">
                        <img src={igicon} alt="fb" className="icon-footer" />
                        </a>   
                    </li>  
                    <li>
                        <a href="https://t.me/comoy" target="_blank">
                        <img src={telegramicon} alt="fb" className="icon-footer" />
                        </a>  
                    </li>
                    <li>
                         <a href="https://www.linkedin.com/in/muhammad-haidir/" target="_blank">
                        <img src={linkedin} alt="fb" className="icon-footer" />
                        </a>  
                    </li>
                </ul> 
            </div>
        </Footer>
    </Layout>
    )
}

export default FooterView