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
  useEffect(() => {
    let isApiSubscribed = true;
    const getAllRecords = async () => {
      axios.get(`http://${process.env.REACT_APP_URL}/getallrecords`).then((data) => {
        if (isApiSubscribed) {
          setData(data.data.data)
        }
      })
    }

    getAllRecords()


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
          <Route path='/form' element={<Form inputs={inputsData} status={status} additions={additions} />} />
          {data.length > 0 &&
            <>
              <Route path='/seemore/:id' element={<SeeMore inputs={inputsData} data={data} />} />
              <Route path='/edit/:id' element={<Edit inputs={inputsData} data={data} status={status} additions={additions} />} />
            </>
          }
        </Routes>
      </div>

    </BrowserRouter>
  );
}

export default App;
