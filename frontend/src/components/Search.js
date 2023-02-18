// import { TextField } from '@mui/material'
import React, { useState } from 'react'
import styled from 'styled-components'
import SearchIcon from '@mui/icons-material/Search';
import { Link } from "react-router-dom";
import Table from './Table';


const Div = styled.div`
margin: 0 auto;
width: 70%;
background: rgba(235, 220, 216, 0.89);
box-sizing: border-box;
padding-bottom: 10px
`

const DivHeading = styled.div`
width: 100%;
height: 30px;
background: rgb(132 83 91);
margin-bottom: 15px;
padding: 5px;
box-sizing: border-box;
`

const FlexDisplay = styled.div`
box-sizing: border-box;
width: 100%;
display: flex;
justify-content: space-evenly;
padding: 10px

`

const Input = styled.input`
width: 80%;
height: 30px;
`
const Select = styled.select`
width: 80%;
height: 30px;
`

const Circle = styled.div`
box-sizing: border-box;
width: 40%;
height: 100px;
background: rgb(132 83 91);
border-radius: 80%;
display: flex;
flex-direction: column;
justify-content: center;
box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
font-size: 17pt;
cursor: pointer;
`

const Search = ({ status, data, columns, contract_issuer, contract_type }) => {

  const [dataFilters, setDataFilters] = useState({})
  const [filtered, setFiltered] = useState(false)
  const [filteredData, setFilteredData] = useState([])


  const filterDataHandler = (e) => {
    setDataFilters(old => ({
      ...old,
      [e.target.name]: e.target.value
    }))
  }

  const handleSearch = (e) => {
    const filterNull = dataFilters
    for (const key in filterNull) {
      if (filterNull[key].length === 0 || filterNull[key] === 'اختر') delete filterNull[key]
    }
    const copiedData = data.slice()

    setFilteredData(old => {
      return copiedData.filter(x => {
        return Object.entries(filterNull).every(([key, value]) => {
          if (x[key]) return x[key].includes(value)
          else return false
        })
      })
    })

    if (Object.keys(filterNull).length === 0) {
      setFiltered(false)
    } else {
      setFiltered(true)
    }

  }

  return (
    <>

      <Div>
        <DivHeading>
          بحث
        </DivHeading>

        <FlexDisplay>
          <div style={{width: '50%'}}>
            <label style={{ display: 'block'}}>تاريخ التسجيل</label>
            <Input placeholder='الشهر - السنة' onChange={filterDataHandler} name="data_register_date" />
          </div>
          <div style={{width: '50%'}}>
            <label style={{ display: 'block'}}>تاريخ العقد</label>
            <Input placeholder='الشهر - السنة' onChange={filterDataHandler} name="contract_date" />
          </div>
        </FlexDisplay>
        <FlexDisplay>
          <div style={{width: '50%'}}>
            <label style={{ display: 'block' }}>نوع العقد</label>
            <Select name={'contract_type'} onChange={filterDataHandler} >
              {contract_type.map(x => (
                <option>{x.title}</option>
              ))}
              <option id="0" selected></option>
            </Select>
          </div>
          <div style={{width: '50%'}}>
            <label style={{ display: 'block' }}>جهة العقد</label>
            <Select name={'contract_issuer'} onChange={filterDataHandler} >
              {contract_issuer.map(x => (
                <option>{x.title}</option>
              ))}
              <option id="0" selected></option>
            </Select>
          </div>
        </FlexDisplay>
        <FlexDisplay>
          <div style={{width: '100%'}}>
            <label style={{ display: 'block' }}>الحالة</label>
            <select onChange={filterDataHandler} name="status" style={{ width: "70%", height: 35 }}>
              {status.map(s => (
                <option key={s.id} id={s.id}>{s.title}</option>
              ))}
              <option selected>اختر</option>
            </select>
          </div>
        </FlexDisplay>
        <button style={{ width: 70, borderRadius: "100px", marginTop: 5 }} onClick={handleSearch}>
          <SearchIcon />
        </button>
      </Div>
      <div style={{ width: "50%", display: 'flex', justifyContent: 'space-between', margin: '15px auto' }}>
        <Circle>
          <Link style={{ textDecoration: 'none' }} to='/fullsearch'>
            بحث شامل
          </Link>
        </Circle>
        <Circle>
          <Link style={{ textDecoration: 'none' }} to='/form'>
            إضافة
          </Link>
        </Circle>
      </div>
      {filtered && <Table columns={columns} data={filteredData} />}

    </>
  )
}

export default Search