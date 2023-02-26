import { useState, useRef } from 'react';
import classes from './AuthForm.module.css';

const Register = ({ useHttp }) => {
    const usernameRef = useRef();
    const passwordRef = useRef();
    const { request } = useHttp()
    const [msg, setMsg] = useState("")
    const handleAuth = (data) => {

        request(data).then(data => {
            console.log(data);
            if (data?.data?.msg === "user created successfuly") {
                setMsg("user created successfuly")
                usernameRef.current.value = ""
                passwordRef.current.value = ""
                setTimeout(() => {
                    setMsg("")
                  }, 4000);

            }
        }).catch(err => {
            console.log(err.response.data.msg);
            setMsg(err.response.data.msg)
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

            handleAuth({
                method: "POST",
                data: JSON.stringify({
                    username: usernameRef.current.value,
                    password: passwordRef.current.value
                }),
                url: `http://${process.env.REACT_APP_URL}/register`,
                headers: {
                    'Content-Type': 'application/json'
                },
            })
    }

    return (
        <section className={classes.auth}>
            <h1>تسجيل مستخدم جديد</h1>
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
                    {console.log(msg)}
                    {msg !== "user created successfuly" ? <button>تسجيل</button> : <p style={{ color: "white" }}>تم تسجيل مستخدم جديد بنجاح</p>}
                    {msg === "user already exists" && <p style={{ color: "white" }}>المستخدم مسجل بالفعل</p>}


                </div>
            </form>
        </section>
    );
};

export default Register;
