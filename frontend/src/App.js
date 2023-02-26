import './App.css';
import Header from './components/Header';
import { inputsData, columns } from './components/uiData/data'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import axios from 'axios';
import { useEffect, useState } from 'react';
import Search from './components/Search';
import NewForm from './components/NewForm';
import NewSeeMore from './components/NewSeeMore';
import NewEdit from './components/NewEdit';
import FullSearch from './components/FullSearch'
import Login from './components/Login';
import Register from './components/Register';
import useHttp from './components/hooks/useHttp';


function App() {
  const [data, setData] = useState([])
  const [token, setToken] = useState(localStorage.getItem('tkn'))
  const [user, setUser] = useState(localStorage.getItem('user'));
  console.log(user);

  const httpSetup = {
    method: "GET",
    url: `http://${process.env.REACT_APP_URL}/getallrecords`,
    headers: {
      "Authorization": `Bearer ${token}`,
      "username": user
    },
  }
  console.log(httpSetup);
  console.log(data)
  const { request } = useHttp()

  const contract_issuer = [
    { id: 1, title: 'مكتب' },
    { id: 2, title: 'مندوب' }
  ]

  const contract_type = [
    { id: 1, title: 'زواج' },
    { id: 2, title: 'طلاق' },
    { id: 3, title: 'تصادق' }
  ]

  const status = [
    { id: 1, title: 'تحت المتابعة' },
    { id: 2, title: 'في انتظار الأوراق' },
    { id: 3, title: 'تم الحجز' },
    { id: 4, title: 'تحت التنفيذ' },
    { id: 5, title: 'تم العقد' },
    { id: 6, title: 'استلم الوثيقة' },
    { id: 7, title: 'إلغاء' }
  ]
  const additions = [
    { id: 1, title: 'وثيقة مؤقتة' },
    { id: 2, title: 'منديل كتب الكتاب' },
    { id: 3, title: 'شهادة صحية' }
  ]

  const handleAuth = (data) => {

    request(data).then(data => {

        localStorage.setItem('tkn', data.data.token)
        localStorage.setItem('user', data.data.username)
        setToken(data.data.token)
        setUser(data.data.username)
    }).catch(err => {
        console.log(err);
    })

}


const logoutHandler = (e) => {
  setToken('')
  setUser('')
  localStorage.removeItem("tkn");
  localStorage.removeItem("user")

}

  



  const handleSubmitEdit = (e, editData, setOpen, setMsg, setSeverity, id) => {
    e.preventDefault()
    setOpen(true);
    const filteredNullData = editData
    Object.keys(filteredNullData).forEach(x => {
      if (filteredNullData[x]?.length === 0 || filteredNullData[x] === null || filteredNullData[x] === 'لا توجد بيانات') {
        filteredNullData[x] = ""
      }
    })
    if (editData.status?.length > 0) {
      axios({
        method: "POST",
        data: { filteredNullData },
        url: `http://${process.env.REACT_APP_URL}/editrecord`,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
          "username": user
        },
      }).then(data => {
        if (data.data.msg === 'تم إدخال البيانات بنجاح') {
          setMsg('تم إدخال البيانات بنجاح')
          setSeverity('success')
          console.log(data);
          const interval = setInterval(() => {
            window.location.href = `http://methaq-family.com/nseemore/${id}`;
          }, 3000);
        }
        else {
          console.log(data)
          setMsg('تم إدخال البيانات من قبل')
          setSeverity('error')
        }

      })
    } else {
      setMsg('لم يتم إدخال الحالة')
      setSeverity('error')
    }

  }

  useEffect(() => {
    let isApiSubscribed = true;
    if (token) {
      request(httpSetup).then(data => {
        const inf = data.data.data.slice()
        inf.map((x, i) => {
          x.s = i + 1
          return x
        })
        inf.forEach(x => x.data_register_date = x.data_register_date.slice(0, 10))
        setData(inf)
      })
    }
    return () => {
      isApiSubscribed = false;
    }
  }, [token])







  return (
    <BrowserRouter >
      <div className="App" style={{ background: 'transparent' }}>

        <Header user={user} logoutHandler={logoutHandler} />

        <Routes>
          {token ?
            <>

              <Route base path='/' element={<Search columns={columns} data={data} status={status} contract_issuer={contract_issuer} contract_type={contract_type} />} />
              <Route path='/form' element={<NewForm user={user} token={token} inputs={inputsData} status={status} additions={additions} contract_issuer={contract_issuer} contract_type={contract_type} />} />
              <Route path='/fullsearch' element={<FullSearch data={data} columns={columns} inputs={inputsData} status={status} additions={additions} contract_issuer={contract_issuer} contract_type={contract_type} />} />
              {data.length > 0 &&
                <>
                  <Route path='/nseemore/:id' element={<NewSeeMore inputs={inputsData} data={data} token={token} />} />
                  <Route path='/nedit/:id' element={<NewEdit user={user} handleSubmit={handleSubmitEdit} inputs={inputsData} data={data} status={status} additions={additions} contract_issuer={contract_issuer} contract_type={contract_type} />} />

                </>
              }
              <Route path='/register' element={<Register useHttp={useHttp} />} />

            </>

            :
            <>
              <Route  path='*' element={<Login handleLogin={handleAuth} />} />


            </>

          }
        </Routes>
      </div>

    </BrowserRouter>
  );
}

export default App;
