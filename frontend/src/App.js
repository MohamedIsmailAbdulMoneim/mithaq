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
import useHttp from './components/hooks/useHttp';

function App() {
  const [data, setData] = useState([])
  console.log(data);
  const httpSetup = {
    method: "GET",
    data: null,
    url: `http://${process.env.REACT_APP_URL}/getallrecords`,
    headers: null,
  }
  const { request } = useHttp()

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



  const handleSubmitEdit = (e, editData, setOpen, phoneNums, newPhones, setMsg, setSeverity, id) => {
    e.preventDefault()
    setOpen(true);
    const filteredNullData = editData
    Object.keys(filteredNullData).forEach(x => {
      if (filteredNullData[x]?.length === 0 || filteredNullData[x] === null || filteredNullData[x] === 'لا توجد بيانات') {
        filteredNullData[x] = null
      }
    })
    if (editData.status?.length > 0) {
      axios({
        method: "POST",
        data: { filteredNullData, phoneNums, newPhones },
        url: `http://${process.env.REACT_APP_URL}/editrecord`,
        headers: { "Content-Type": "application/json" },
      }).then(data => {
        if (data.data.msg === 'تم إدخال البيانات بنجاح') {
          setMsg('تم إدخال البيانات بنجاح')
          setSeverity('success')
          console.log(data);
          // const interval = setInterval(() => {
          //   // window.location.href = `http://miatech.tk/nseemore/${id}`;
          // }, 3000);
        }
        else {
          setMsg('تم إدخال البيانات من قبل')
          setSeverity('error')
        }

      })
    }else{
      setMsg('لم يتم إدخال الحالة')
      setSeverity('error')
    }

  }

  useEffect(() => {
    let isApiSubscribed = true;

    request(httpSetup).then(data => {
      const inf = data.data.data.slice()
      inf.map((x, i) => {
        x.s = i + 1
        return x
      })
      setData(inf)
    })
    return () => {
      isApiSubscribed = false;
    }
  }, [])







  return (
    <BrowserRouter >
      <div className="App" style={{ background: 'transparent' }}>
        <Header />
        <Routes>
          <Route base path='/' element={<Search columns={columns} data={data} status={status} />} />
          {/* <Route path='/form' element={<Form handleSubmit={handleSubmitInsert} inputs={inputsData} status={status} additions={additions} />} /> */}
          <Route path='/form' element={<NewForm inputs={inputsData} status={status} additions={additions} />} />
          <Route path='/fullsearch' element={<FullSearch data={data} columns={columns} inputs={inputsData} status={status} additions={additions} />} />

          {data.length > 0 &&
            <>
              <Route path='/nseemore/:id' element={<NewSeeMore inputs={inputsData} data={data} />} />
              <Route path='/nedit/:id' element={<NewEdit handleSubmit={handleSubmitEdit} inputs={inputsData} data={data} status={status} additions={additions} />} />

            </>
          }
        </Routes>
      </div>

    </BrowserRouter>
  );
}

export default App;
