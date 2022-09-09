import './App.css';
import Header from './components/Header';

import SeeMore from './components/SeeMore';
import Table from './components/Table'
import { inputsData, columns } from './components/uiData/data'
import Form from './components/Form';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from 'axios';
import { useEffect, useState } from 'react';
import Edit from '@mui/icons-material/Edit';








function App() {
  const [data, setData] = useState([])
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
        {data.length > 0 && <Routes>
          <Route base path='/' element={<Table columns={columns} data={data} />} />
          <Route path='/form' element={<Form inputs={inputsData} />} />
          <Route path='/seemore/:id' element={<SeeMore inputs={inputsData} data={data} />} />
          <Route path='/edit/:id' element={<Edit />} />
        </Routes>}
      </div>

    </BrowserRouter>
  );
}

export default App;
