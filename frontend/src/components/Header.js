import * as React from 'react';
import styled from 'styled-components'
import logo from '../logo.jpg'
import { Link } from 'react-router-dom';
import style from './Header.module.css'

const Button = styled.button`
background: inherit;
color: #f0e4b6;
padding: 1% 4%;
font-size: 0.8em;
font-family: 'Droid Arabic Kufi', serif;
border: 0.1px solid #4e4e4e;
border-radius: 5px;
margin-right: 5px;
cursor: pointer
`



export default function PrimarySearchAppBar({ user, logoutHandler }) {


  return (
    <div style={{ background: "#310109", color: 'white', width: "100%", marginBottom: 20, padding: 5, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div style={{ flexGrow: 1, display: "flex", justifyContent: "start", alignItems: "center" }}>
        {/* {user === "methaqfamily" && <Link to={'/register'}><Button>مستخدم جديد</Button></Link>} */}
        {/* { <Link style={{}} to={'/register'}><Button>مستخدم جديد</Button></Link>} */}
        {user === "methaqfamily" && <Button><Link className={style.link} to={'/register'}>مستخدم جديد</Link></Button>}
        {user && <Button onClick={logoutHandler}>تسجيل خروج</Button>}
      </div>
      <Link className='' style={{ flexGrow: 1 }} to='/'><img src={logo} alt="logo" style={{ maxWidth: 50, maxHeight: 50 }} /></Link>
      <div style={{ lineHeight: 3, textTransform: "uppercase", color: "#f0e4b6", flexGrow: 1, display: "flex", justifyContent: "end" }}>
        <span style={{ marginRight: 4 }}>
          {user}
        </span>
        مرحبا
      </div>
    </div>

  );
}
