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
import { Link, useParams } from 'react-router-dom';

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
    margin-bottom: 8px;

    
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

const NewSeeMore = ({ data, inputs }) => {
    const { id } = useParams()
    const [memberDetails] = data.filter(x => x.id === parseInt(id))
    console.log(memberDetails)
    const arrOfNums = memberDetails.phoneNumber?.split(',,') || []
    return (
        <>
            {inputs.map(x => (
                <div dir='rtl' style={{ display: 'flex', background: 'transparent', justifyContent: 'space-evenly' }}>
                    {x.map(y => (
                        <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
                            <Card style={{ display: 'flex', flexDirection: 'column', width: '90%', alignItems: 'start', background: 'rgba(171, 120, 106, 0.89)', margin: 10, borderRadius: 20 }}>
                                {y.map(z => (
                                    <Div>

                                        {z.field === 'contract_date' || z.field === 'data_register_date' ?
                                            <>
                                                <Label>{z.headerName} :</Label>
                                                <Input type='date' value={memberDetails[z.field] || ''} name={z.field} label={z.headerName} />
                                            </>
                                            :
                                            z.field === 'status' ?
                                                <>
                                                    <Label>{z.headerName} :</Label>
                                                    <Input type='text' value={memberDetails[z.field] || ''} name={z.field} label={z.headerName} />
                                                </>
                                                :
                                                z.field === 'Additions' ?

                                                    <>
                                                        {console.log(memberDetails[z.field])}
                                                        <Label>{z.headerName} :</Label>
                                                        <Input type='text' value={memberDetails[z.field]?.replaceAll(",", " - ").replaceAll("\"", "") || ''} name={z.field} label={z.headerName} />
                                                    </>
                                                    :
                                                    z.field === 'contract_time' ?
                                                        <>
                                                            <Label>{z.headerName} :</Label>
                                                            <Input value={memberDetails[z.field] || ''} type='time' name={z.field} label={z.headerName} />
                                                        </>
                                                        :
                                                        z.field === 'moakhar' || z.field === 'cost' ?
                                                            <>
                                                                <Label>{z.headerName} :</Label>
                                                                <Input value={memberDetails[z.field] || ''} type='number' name={z.field} label={z.headerName} />
                                                            </>
                                                            :
                                                            z.field === 'phoneNumber' ?

                                                                <>

                                                                    <Label>{z.headerName} :</Label>
                                                                    <Input value={memberDetails[z.field] || ''} type='number' name={z.field} />

                                                                </>
                                                                :
                                                                z.field === 'notes' ?
                                                                    ''
                                                                    :
                                                                    <>
                                                                        <Label>{z.headerName} :</Label>
                                                                        <Input value={memberDetails[z.field] || ''} type='text' name={z.field} label={z.headerName} />
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

            {/* <button onClick={(e) => handleSubmit(e, setOpen, newData, phoneNums, setMsg, setSeverity, setNewData, setPhoneNums, setPhoneInputs)} style={{margin: '0 auto', width: '90%', height: 30}}>إدخال</button> */}
            < Card dir="rtl" style={{ display: 'flex', flexDirection: 'column', width: '97%', alignItems: 'start', background: 'rgba(171, 120, 106, 0.89)', margin: '10px auto', borderRadius: 20 }
            }>
                <label style={{ marginRight: 80 }}>ملاحظات :</label>
                <textarea style={{ width: '95%', height: 150, margin: '10px auto', borderRadius: 15, padding: 5 }}>{memberDetails.notes}</textarea>
            </Card >
            <button style={{ width: '30%', height: 30 }}><Link to={`/nedit/${id}`}>تعديل</Link></button>
        </>
        // </Card>
    )
}

export default NewSeeMore