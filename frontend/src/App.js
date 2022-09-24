import './App.css';
import Header from './components/Header';

import SeeMore from './components/SeeMore';
import Table from './components/Table'
import { inputsData, columns } from './components/uiData/data'
import Form from './components/Form';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from 'axios';
import { useEffect, useState } from 'react';
import Edit from './components/Edit';

const getAllRecords = async (setData, isApiSubscribed=true) => {
  axios.get(`http://${process.env.REACT_APP_URL}/getallrecords`).then((data) => {
    console.log(data);
    if (isApiSubscribed) {
      const inf = data.data.data.slice()
      inf.map((x, i) => {
        x.s = i + 1
        return x
      })
      console.log(inf);
      setData(inf)
      return inf
    }
  })
}

function App() {
  const [data, setData] = useState([])
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
    getAllRecords(setData);

    axios({
      method: "POST",
      data: { newData, phoneNums },
      url: `http://${process.env.REACT_APP_URL}/addrecord`,
      headers: { "Content-Type": "application/json" },
    }).then(data => {
      console.log(data);
      if (data.data.msg === 'تم إدخال البيانات بنجاح') {
        setMsg('تم إدخال البيانات بنجاح')
        setSeverity('success')
        setNewData({})
        setPhoneNums({})
        setPhoneInputs([])

      } else {
        console.log('hit');
        setMsg('تم إدخال البيانات من قبل')
        setSeverity('error')
      }

    })

  }

  const handleSubmitEdit = (e, editData, setOpen, phoneNums,newPhones, setMsg, setSeverity) => {
    const filteredNullData = editData
    Object.keys(filteredNullData).forEach(x => {
      if (filteredNullData[x]?.length === 0 || filteredNullData[x] === null || filteredNullData[x] === 'لا توجد بيانات') {
        delete filteredNullData[x]
      }
    })
    console.log(filteredNullData);
    e.preventDefault()
    setOpen(true);
    getAllRecords(setData)

    axios({
      method: "POST",
      data: { filteredNullData, phoneNums, newPhones },
      url: `http://${process.env.REACT_APP_URL}/editrecord`,
      headers: { "Content-Type": "application/json" },
    }).then(data => {
      console.log(data);
      if (data.data.msg === 'تم إدخال البيانات من قبل') {
        setMsg('تم إدخال البيانات من قبل')
        setSeverity('error')
      } else if (data.data.msg === 'تم إدخال البيانات بنجاح') {
        setMsg('تم إدخال البيانات بنجاح')
        setSeverity('success')

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

      <div className="App">
        <Header />
        <Routes>
          <Route base path='/' element={<Table columns={columns} data={data} />} />
          <Route path='/form' element={<Form handleSubmit={handleSubmitInsert} inputs={inputsData} status={status} additions={additions} />} />
          {data.length > 0 &&
            <>
              <Route path='/seemore/:id' element={<SeeMore  inputs={inputsData} data={data} />} />
              <Route path='/edit/:id' element={<Edit handleSubmit={handleSubmitEdit} inputs={inputsData} data={data} status={status} additions={additions} />} />
            </>
          }
        </Routes>
      </div>

    </BrowserRouter>
  );
}

export default App;
