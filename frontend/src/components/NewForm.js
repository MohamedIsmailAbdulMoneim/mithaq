import { Card, Grid } from '@mui/material'
import React, { useState } from 'react'
import styled from 'styled-components'
import Alert from './Alert'
import Button from "@mui/material/Button";
import { styled as style } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import MultipleSelect from './Select';
import useHttp from './hooks/useHttp';

const Input = styled.input`
    width: 80%;
    margin-right: 10px;
    height: 20px;
    border-radius: 5px;
    margin-bottom: 8px

    
`

const Select = styled.select`
width: 82%;
margin-right: 10px;
height: 25px;
border-radius: 5px;
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

const NewForm = ({ user, inputs, status, additions, token, contract_type, contract_issuer }) => {
    const [newData, setNewData] = useState({ Additions: [], created_by: user })
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('')
    const [severity, setSeverity] = useState('')
    const { request } = useHttp()
    console.log(newData);

    const httpSetup = {
        method: "POST",
        data: { newData },
        url: `http://${process.env.REACT_APP_URL}/addrecord`,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
            "username": user
        },
    }

    const submitHandler = () => {
        setOpen(true);
        if (newData.status?.length > 0) {
            request(httpSetup).then(data => {
                if (data?.data?.msg === 'تم إدخال البيانات بنجاح') {
                    setMsg('تم إدخال البيانات بنجاح')
                    setSeverity('success')
                    setNewData({ Additions: [] })
                    // window.location.href = 'http://localhost:3001/';
                    setInterval(() => {
                        window.location.href = 'http://methaq-family.com/';
                    }, 3000);
                } else {
                    setMsg('تم إدخال البيانات من قبل')
                    setSeverity('error')
                }
            })
        } else {
            setMsg('لم يتم إدخال الحالة')
            setSeverity('error')
        }

    }








    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };



    const handleChange = (e) => {

        if (e.target.name === 'Additions') {
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
                            <Card style={{ display: 'flex', flexDirection: 'column', width: '90%', alignItems: 'start', background: '#ebdcd8e3', margin: 10, borderRadius: 10 }}>
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
                                                    <MultipleSelect inputVal={newData[z.field]} onChange={handleChange} label={z.headerName} names={additions} />
                                                    :
                                                    z.field === 'contract_type' ?
                                                        <>
                                                            <Label>{z.headerName} :</Label>
                                                            <Select value={newData[z.field] || ''} name={z.field} onChange={handleChange} >
                                                                {contract_type.map(x => (
                                                                    <option id={x.id}>{x.title}</option>
                                                                ))}
                                                                <option id="0" selected></option>
                                                            </Select>
                                                        </>
                                                        :
                                                        z.field === 'contract_issuer' ?
                                                            <>
                                                                <Label>{z.headerName} :</Label>
                                                                <Select value={newData[z.field] || ''} name={z.field} onChange={handleChange} >
                                                                    {contract_issuer.map(x => (
                                                                        <option id={x.id}>{x.title}</option>
                                                                    ))}
                                                                    <option id="0" selected></option>
                                                                </Select>
                                                            </>
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
                                                                            <Input value={newData[z.field] || ''} type='number' onChange={handleChange} name={z.field} label={z.headerName} />
                                                                        </>
                                                                        :
                                                                        z.field === 'notes' ?
                                                                            ''
                                                                            :
                                                                            <>
                                                                                <Label>{z.headerName} :</Label>
                                                                                <Input value={newData[z.field] || ''} type='text' onChange={handleChange} name={z.field} label={z.headerName} autoComplete="on" />
                                                                            </>
                                        }
                                    </Div>


                                ))}
                            </Card>

                        </div>
                    ))}

                </div>
            )
            )}
            <Card dir="rtl" style={{ display: 'flex', flexDirection: 'column', width: '97%', alignItems: 'start', background: '#ebdcd8e3', margin: '10px auto', borderRadius: 20 }}>
                <label style={{ marginRight: 80 }}>ملاحظات :</label>
                <textarea onChange={handleChange} name='notes' style={{ width: '95%', height: 150, margin: '10px auto', borderRadius: 15, padding: 5 }}></textarea>
            </Card>
            <Alert text={'إدخال البيانات'} style={{ width: '90%' }} open={open} handleSubmit={submitHandler} severity={severity} msg={msg} handleClose={handleClose} />
        </>
        // </Card>
    )
}

export default NewForm