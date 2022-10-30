import './App.css';
import Header from './components/Header';
import SeeMore from './components/SeeMore';
import Table from './components/Table'
import { inputsData, columns } from './components/uiData/data'
import Form from './components/Form';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import axios from 'axios';
import { useEffect, useState } from 'react';
import Edit from './components/Edit';
import Search from './components/Search';
import NewForm from './components/NewForm';
import NewSeeMore from './components/NewSeeMore';
import NewEdit from './components/NewEdit';
import FullSearch from './components/FullSearch'


const getAllRecords = async (setData, isApiSubscribed = true) => {
  axios.get(`http://${process.env.REACT_APP_URL}/getallrecords`).then((data) => {

    if (isApiSubscribed) {
      const inf = data.data.data.slice()
      inf.map((x, i) => {
        x.s = i + 1
        return x
      })
      setData(inf)
      return inf
    }
  })
}

function App() {
  const [data, setData] = useState([])

  console.log(data);
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

  const handleSubmitInsert = (e, setOpen, newData, phoneNums, setMsg, setSeverity, setNewData, setPhoneNums, setPhoneInputs) => {
    e.preventDefault()
    setOpen(true);

    console.log('hit');
    axios({
      method: "POST",
      data: { newData, phoneNums },
      url: `http://${process.env.REACT_APP_URL}/addrecord`,
      headers: { "Content-Type": "application/json" },
    }).then(data => {
      console.log('hit');
      getAllRecords(setData);
      if (data.data.msg === 'تم إدخال البيانات بنجاح') {
        setMsg('تم إدخال البيانات بنجاح')
        setSeverity('success')
        setNewData({ Additions: [] })
        setPhoneNums({})
        setPhoneInputs([])
        console.log(data.data);
        // window.location.href = 'http://localhost:3001/';
        const interval = setInterval(() => {
          window.location.href = 'http://miatech.tk/';
        }, 3000);

      } else {
        console.log('hit');
        setMsg('تم إدخال البيانات من قبل')
        setSeverity('error')
      }

    })

  }

  const handleSubmitEdit = (e, editData, setOpen, phoneNums, newPhones, setMsg, setSeverity) => {
    e.preventDefault()
    setOpen(true);

    const filteredNullData = editData
    Object.keys(filteredNullData).forEach(x => {
      if (filteredNullData[x]?.length === 0 || filteredNullData[x] === null || filteredNullData[x] === 'لا توجد بيانات') {
        delete filteredNullData[x]
      }
    })
    
    


    axios({
      method: "POST",
      data: { filteredNullData, phoneNums, newPhones },
      url: `http://${process.env.REACT_APP_URL}/editrecord`,
      headers: { "Content-Type": "application/json" },
    }).then(data => {
      getAllRecords(setData)
      if (data.data.msg === 'تم إدخال البيانات بنجاح') {
        setMsg('تم إدخال البيانات بنجاح')
        setSeverity('success')
        const interval = setInterval(() => {
          window.location.href = 'http://miatech.tk/';
        }, 3000);
      }
      else {
        setMsg('تم إدخال البيانات من قبل')
        setSeverity('error')
      }  

    })

  }

  useEffect(() => {
    let isApiSubscribed = true;

    getAllRecords(setData, isApiSubscribed)
    return () => {
      isApiSubscribed = false;
    }
  }, [])







  return (
    <BrowserRouter >
      <div className="App" style={{ background: 'transparent' }}>
        <Header />
        <Routes>
          <Route base path='/' element={<Search  columns={columns} data={data}  status={status} />} />
          {/* <Route path='/form' element={<Form handleSubmit={handleSubmitInsert} inputs={inputsData} status={status} additions={additions} />} /> */}
          <Route path='/form' element={<NewForm handleSubmit={handleSubmitInsert} inputs={inputsData} status={status} additions={additions} />} />
          <Route path='/fullsearch' element={<FullSearch  data={data} columns={columns}   inputs={inputsData} status={status} additions={additions} />} />

          {data.length > 0 &&
            <>
              <Route path='/nseemore/:id' element={<NewSeeMore inputs={inputsData} data={data} />} />
              <Route path='/seemore/:id' element={<SeeMore inputs={inputsData} data={data} />} />
              <Route path='/edit/:id' element={<Edit handleSubmit={handleSubmitEdit} inputs={inputsData} data={data} status={status} additions={additions} />} />
              <Route path='/nedit/:id' element={<NewEdit handleSubmit={handleSubmitEdit} inputs={inputsData} data={data} status={status} additions={additions} />} />

            </>
          }
        </Routes>
      </div>

    </BrowserRouter>
  );
}

export default App;
