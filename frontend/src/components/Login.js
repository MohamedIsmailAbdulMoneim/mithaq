import { useState, useRef } from 'react';
import classes from './AuthForm.module.css';

const AuthForm = ({ handleLogin }) => {
    const usernameRef = useRef();
    const passwordRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault()
        handleLogin({
            method: "POST",
            data: JSON.stringify({
                username: usernameRef.current.value,
                password: passwordRef.current.value
            }),
            url: `http://${process.env.REACT_APP_URL}/login`,
            headers: {
                'Content-Type': 'application/json'
            },
        })
    }

    // const submitHandler = (e) => {
    //     e.preventDefault();

    //     fetch('http://localhost:5000/login',
    //         {
    //             method: 'POST',
    //             body: JSON.stringify({
    // username: usernameRef.current.value,
    // password: passwordRef.current.value
    //             }),
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         }).then(res => {
    //             if (res.ok) {
    //                 return res.json()
    //             } else {
    //                 return res.json().then(data => {
    //                     console.log(data)
    //                 })
    //             }
    //         }).then(res => {
    //             console.log(res);
    //         }).catch(err => {

    //         })

    // }
    return (
        <section className={classes.auth}>
            <h1>تسجيل الدخول</h1>
            <form onSubmit={handleSubmit}>
                <div className={classes.control}>
                    <label htmlFor='username'>اسم المستخدم</label>
                    <input type='text' id='username' ref={usernameRef} required />
                </div>
                <div className={classes.control}>
                    <label htmlFor='password'>كلمة المرور</label>
                    <input type='password' id='password' ref={passwordRef} required />
                </div>
                <div className={classes.actions}>
                    <button>تسجيل دخول</button>

                </div>
            </form>
        </section>
    );
};

export default AuthForm;
