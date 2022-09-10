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
  useEffect(() => {
    let isApiSubscribed = true;
    const getAllRecords = async () => {
      axios.get(`http://${process.env.REACT_APP_URL}/getallrecords`).then((data) => {
        if (isApiSubscribed) {
          let finalData = []
          const details = data.data.data
          const arrOfPhoneNumber = []
          const phoneNumberPerPerson = details[1].reduce((p,c) => {
            if(p.main_id === c.main_id){
              arrOfPhoneNumber.push({id: p.main_id, phoneNumber: [p.phone_number, c.phone_number]})
              return arrOfPhoneNumber;
            }else{
              arrOfPhoneNumber.push(p)
              return arrOfPhoneNumber
            }
          })

          for(let i = 0; i < details[0].length; i++){
            for(let x = 0; x < phoneNumberPerPerson.length; x ++){
              if(details[0][i].id === phoneNumberPerPerson[x].id) finalData.push({...details[0][i], phoneNumber: phoneNumberPerPerson[x].phoneNumber, main_id: details[1][x].main_id})
              else finalData.push({...details[0][i]})
            }
          }
          setData(finalData)
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
          <Route path='/edit/:id' element={<Edit inputs={inputsData} data={data} />} />
        </Routes>}
      </div>

    </BrowserRouter>
  );
}

export default App;
