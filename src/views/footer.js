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

const {Footer} = Layout

const FooterView = () => {

    const IconFont = createFromIconfontCN({
        scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
      });

    return (
        <Layout>
        <Footer>
            <div>
            <label> created by comoy</label>
            </div>
            <div>
               <ul>
                    <li>
                        <a href=""><IconFont type="icon-facebook" /></a>    
                    </li>   
                    <li>
                        <a href=""><IconFont type="icon-twitter" /></a>    
                    </li>  
                </ul> 
            </div>
        </Footer>
    </Layout>
    )
}

export default FooterView