import { Card, Grid } from '@mui/material'
import React, { useState } from 'react'
import styled from 'styled-components'
import Alert from './Alert'
import Button from "@mui/material/Button";
import { styled as style } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import MultipleSelect from './Select';
import useHttp from './hooks/useHttp';

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
    border-radius: 10px;
    background: #ddc1b9e3;
    margin-bottom: 8px

    
`

const Select = styled.select`
width: 80%;
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

const NewForm = ({ inputs, status, additions }) => {
    const [newData, setNewData] = useState({ Additions: [] })
    const [phoneNums, setPhoneNums] = useState({})
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('')
    const [severity, setSeverity] = useState('')
    const [phoneInputs, setPhoneInputs] = useState([])
    const { request } = useHttp()

    const httpSetup = {
        method: "POST",
        data: { newData, phoneNums },
        url: `http://${process.env.REACT_APP_URL}/addrecord`,
        headers: { "Content-Type": "application/json" },
    }

    const submitHandler = () => {
        setOpen(true);
        request(httpSetup).then(data => {
                if (data?.data?.msg === 'تم إدخال البيانات بنجاح') {
                setMsg('تم إدخال البيانات بنجاح')
                setSeverity('success')
                setNewData({ Additions: [] })
                setPhoneNums({})
                setPhoneInputs([])
                // window.location.href = 'http://localhost:3001/';
                const interval = setInterval(() => {
                  window.location.href = 'http://miatech.tk/';
                }, 3000);
              } else {
                setMsg('تم إدخال البيانات من قبل')
                setSeverity('error')
              }
        })
    }








    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

    const handlePhoneInput = () => {

        const input = <Input type='number' onChange={handleChange} name={`phoneNumber_${++idNum}`} label={'رقم التليفون'} />


        setPhoneInputs(old => [...old, input])
    }

    const handleChange = (e) => {

        if (e.target.name.includes('phoneNumber')) {
            setPhoneNums(old => ({
                ...old,
                [e.target.name]: e.target.value
            }))
        } else if (e.target.name === 'Additions') {
            setNewData(old => ({
                ...old,
                // On autofill we get a stringified value.
                Additions: typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value,
            }));
        } else {
            setNewData(old => ({
                ...old,
                [e.target.name]: e.target.value
            }))
        }
    }

    return (
        <>
            {inputs.map(x => (
                <div dir='rtl' style={{ display: 'flex', background: 'transparent', justifyContent: 'space-evenly' }}>
                    {x.map(y => (
                        <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
                            <Card style={{ display: 'flex', flexDirection: 'column', width: '70%', alignItems: 'start', background: 'rgba(171, 120, 106, 0.89)', margin: 10, borderRadius: 20 }}>
                                {y.map(z => (
                                    <Div>

                                        {z.field === 'contract_date' || z.field === 'data_register_date' ?
                                            <>
                                                <Label>{z.headerName} :</Label>
                                                <Input value={newData[z.field] || ''} type='date' onChange={handleChange} name={z.field} label={z.headerName} />
                                            </>
                                            :
                                            z.field === 'status' ?
                                                <>
                                                    <Label>{z.headerName} :</Label>
                                                    <Select value={newData[z.field] || ''} name={z.field} onChange={handleChange} >
                                                        {status.map(x => (
                                                            <option id={x.id}>{x.title}</option>
                                                        ))}
                                                        <option id="0" selected></option>
                                                    </Select>
                                                </>
                                                :
                                                z.field === 'Additions' ?
                                                    <MultipleSelect inputVal={newData['Additions']} onChange={handleChange} label={z.headerName} names={additions} />
                                                    :
                                                    z.field === 'contract_time' ?
                                                        <>
                                                            <Label>{z.headerName} :</Label>
                                                            <Input value={newData[z.field] || ''} type='time' onChange={handleChange} name={z.field} label={z.headerName} />
                                                        </>
                                                        :
                                                        z.field === 'moakhar' || z.field === 'cost' ?
                                                            <>
                                                                <Label>{z.headerName} :</Label>
                                                                <Input value={newData[z.field] || ''} type='number' onChange={handleChange} name={z.field} label={z.headerName} />
                                                            </>
                                                            :
                                                            z.field === 'phoneNumber' ?
                                                                <>
                                                                    <Label>{z.headerName} :</Label>
                                                                    <Input value={phoneNums[z.field] || ''} type='number' onChange={handleChange} name={z.field} label={z.headerName} />
                                                                    {phoneInputs}
                                                                </>
                                                                :
                                                                z.field === 'notes' ?
                                                                    ''
                                                                    :
                                                                    <>
                                                                        <Label>{z.headerName} :</Label>
                                                                        <Input value={newData[z.field] || ''} type='text' onChange={handleChange} name={z.field} label={z.headerName} />
                                                                    </>
                                        }
                                        {
                                            z.field === 'phoneNumber'
                                            &&
                                            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                                                <AddIcon onClick={handlePhoneInput} />
                                                <RemoveIcon onClick={handlePhoneInput} />
                                            </div>
                                        }
                                    </Div>


                                ))}
                            </Card>

                        </div>
                    ))}

                </div>
            )
            )}
            <Card dir="rtl" style={{ display: 'flex', flexDirection: 'column', width: '90%', alignItems: 'start', background: 'rgba(171, 120, 106, 0.89)', margin: '10px auto', borderRadius: 20 }}>
                <label style={{ marginRight: 80 }}>ملاحظات :</label>
                <textarea onChange={handleChange} name='notes' style={{ width: '95%', height: 150, margin: '10px auto', borderRadius: 15, padding: 5 }}></textarea>
            </Card>
            {/* <button onClick={(e) => handleSubmit(e, setOpen, newData, phoneNums, setMsg, setSeverity, setNewData, setPhoneNums, setPhoneInputs)} style={{margin: '0 auto', width: '90%', height: 30}}>إدخال</button> */}
            <Alert text={'إدخال البيانات'} style={{ width: '90%' }} open={open} handleSubmit={submitHandler} severity={severity} msg={msg} handleClose={handleClose} />
        </>
        // </Card>
    )
}

export default NewForm