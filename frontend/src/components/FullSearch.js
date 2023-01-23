import { Card, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Alert from './Alert'
import Button from "@mui/material/Button";
import { styled as style } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import MultipleSelect from './Select';
import Table from './Table';

const ColorButton = style(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[800]),
    backgroundColor: purple[500],
    '&:hover': {
        backgroundColor: purple[700],
    },
}));

let idNum = 1

const Input = styled.input`
    width: 80%;
    margin-right: 10px;
    height: 20px;
    border-radius: 5px;
    background: #ddc1b9e3;
    border-radius: 10px;
    margin-bottom: 8px

    
`

const Select = styled.select`
width: 82%;
margin-right: 10px;
height: 25px;
background: #ddc1b9e3;
border-radius: 10px;
margin-bottom: 8px
`

const Div = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    width: 100%;
    
    
`
const Label = styled.label`
margin-right: 10px
`

const FullSearch = ({ inputs, status, additions, data, columns, contract_issuer, contract_type }) => {

    const [dataFilters, setDataFilters] = useState({})
    const [filtered, setFiltered] = useState(false)
    const [filteredData, setFilteredData] = useState([])



    useEffect(() => {
        window.addEventListener("keydown", (e) => {
            if (e.keyCode === 27) {
                console.log('hit esc');
                setFiltered(false)
            }
        });
        // return () => { 
        //     window.removeEventListener("keydown", handleUserKeyPress);
        // };
    }, [filtered])

    const filterFullDataHandler = (e) => {
        setDataFilters(old => ({
            ...old,
            [e.target.name]: e.target.value
        }))
    }

    const handleFullSearch = (e) => {
        const filterNull = dataFilters
        for (const key in filterNull) {
            if (filterNull[key].length === 0 || filterNull[key] === 'اختر') delete filterNull[key]
        }
        const copiedData = data.slice()


        setFilteredData(old => {
            return copiedData.filter(x => {
                return Object.entries(filterNull).every(([key, value]) => {
                    console.log(key);
                    if (x[key]) return String(x[key]).includes(value)
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
            {
                !filtered ?
                    <>
                        {
                            inputs.map(x => (
                                <div dir='rtl' style={{ display: 'flex', background: 'transparent', justifyContent: 'space-evenly', }}>
                                    {x.map(y => (
                                        <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
                                            <Card style={{ display: 'flex', flexDirection: 'column', width: '90%', alignItems: 'start', background: 'rgba(171, 120, 106, 0.89)', margin: 10, borderRadius: 20 }}>
                                                {y.map(z => (
                                                    <Div>

                                                        {z.field === 'contract_date' || z.field === 'data_register_date' ?
                                                            <>
                                                                <Label>{z.headerName} :</Label>
                                                                <Input type='date' onChange={filterFullDataHandler} name={z.field} label={z.headerName} />
                                                            </>
                                                            :
                                                            z.field === 'status' ?
                                                                <>
                                                                    <Label>{z.headerName} :</Label>
                                                                    <Select name={z.field} onChange={filterFullDataHandler} >
                                                                        {status.map(x => (
                                                                            <option>{x.title}</option>
                                                                        ))}
                                                                        <option id="0" selected></option>
                                                                    </Select>
                                                                </>
                                                                :
                                                                z.field === 'contract_type' ?
                                                                <>
                                                                    <Label>{z.headerName} :</Label>
                                                                    <Select name={z.field} onChange={filterFullDataHandler} >
                                                                        {contract_type.map(x => (
                                                                            <option>{x.title}</option>
                                                                        ))}
                                                                        <option id="0" selected></option>
                                                                    </Select>
                                                                </>
                                                                :
                                                                z.field === 'contract_issuer' ?
                                                                <>
                                                                    <Label>{z.headerName} :</Label>
                                                                    <Select name={z.field} onChange={filterFullDataHandler} >
                                                                        {contract_issuer.map(x => (
                                                                            <option>{x.title}</option>
                                                                        ))}
                                                                        <option id="0" selected></option>
                                                                    </Select>
                                                                </>
                                                                :
                                                                z.field === 'Additions' ?
                                                                    <MultipleSelect onChange={filterFullDataHandler} inputVal={dataFilters['Additions']} label={z.headerName} names={additions} />
                                                                    :
                                                                    z.field === 'contract_time' ?
                                                                        <>
                                                                            <Label>{z.headerName} :</Label>
                                                                            <Input onChange={filterFullDataHandler} type='time' name={z.field} label={z.headerName} />
                                                                        </>
                                                                        :
                                                                        z.field === 'moakhar' || z.field === 'cost' ?
                                                                            <>
                                                                                <Label>{z.headerName} :</Label>
                                                                                <Input onChange={filterFullDataHandler} type='number' name={z.field} label={z.headerName} />
                                                                            </>
                                                                            :
                                                                            z.field === 'phoneNumber' ?
                                                                                <>
                                                                                    <Label>{z.headerName} :</Label>
                                                                                    <Input onChange={filterFullDataHandler} type='number' name={z.field} label={z.headerName} />

                                                                                </>
                                                                                :
                                                                                z.field === 'notes' ?
                                                                                    ''
                                                                                    :
                                                                                    <>
                                                                                        <Label>{z.headerName} :</Label>
                                                                                        <Input onChange={filterFullDataHandler} type='text' name={z.field} label={z.headerName} />
                                                                                    </>
                                                        }
                                                    </Div>


                                                ))}
                                            </Card>

                                        </div>
                                    ))}

                                </div>
                            )
                            )
                        }
                        < Card dir="rtl" style={{ display: 'flex', flexDirection: 'column', width: '97%', alignItems: 'start', background: 'rgba(171, 120, 106, 0.89)', margin: '10px auto', borderRadius: 20 }
                        }>
                            <label style={{ marginRight: 80 }}>ملاحظات :</label>
                            <textarea style={{ width: '95%', height: 150, margin: '10px auto', borderRadius: 15, padding: 5 }}></textarea>
                        </Card >
                        {/* <button onClick={(e) => handleSubmit(e, se setSeveri style={{margin: '0 auto', width: '90%', height: 30}}>إدخال</button> */}
                        <button onClick={handleFullSearch} style={{ width: '30%', height: 30 }}>بحث</button>
                    </>
                    :
                    <Table columns={columns} data={filteredData} />
                // </Card>
            }
        </>
    )
}

export default FullSearch