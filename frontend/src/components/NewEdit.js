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
import { useParams } from 'react-router-dom';

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
    border-radius: 10px;
    margin-bottom: 8px
    
`

const Select = styled.select`
width: 82%;
margin-right: 10px;
height: 25px;

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

const NewEdit = ({ data, inputs, status, additions, handleSubmit, contract_issuer, contract_type }) => {
    const { id } = useParams()
    const [memberDetails] = data.map(x => {
        return { ...x, Additions: x.Additions?.split(',') }
    }).filter(x => x.id === parseInt(id))

    const [editData, setEditData] = useState(memberDetails)
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('')
    const [severity, setSeverity] = useState('')


    console.log(editData);



    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

    const handleChange = (e) => {
        if (e.target.name === 'Additions') {
            setEditData(old => ({
                ...old,
                // On autofill we get a stringified value.
                Additions: typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value,
            }));
        }
        else {
            setEditData(old => ({
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
                            <Card style={{ display: 'flex', flexDirection: 'column', width: '90%', alignItems: 'start', background: '#ebdcd8e3', margin: 10, borderRadius: 20 }}>
                                {y.map(z => (
                                    <Div>

                                        {z.field === 'contract_date' || z.field === 'data_register_date' ?
                                            <>
                                                <Label>{z.headerName} :</Label>
                                                <Input value={editData[z.field] || ''} type='date' onChange={handleChange} name={z.field} label={z.headerName} />
                                            </>
                                            :
                                            z.field === 'status' ?
                                                <>
                                                    <Label>{z.headerName} :</Label>
                                                    <Select onChange={handleChange} name={z.field}>
                                                        {status.map(x => (
                                                            <option selected={editData[z.field] === x.title ? true : false}>{x.title}</option>
                                                        ))}
                                                        <option id="0"></option>
                                                    </Select>
                                                </>
                                                :
                                                z.field === 'contract_type' ?
                                                    <>
                                                        <Label>{z.headerName} :</Label>
                                                        <Select onChange={handleChange} name={z.field}>
                                                            <option selected={true} id="0"></option>
                                                            {contract_type.map(x => (
                                                                <>
                                                                {console.log(editData[z.field], x.title)}
                                                                <option selected={editData[z.field] === x.title ? true : false}>{x.title}</option>
                                                                </>
                                                            ))}
                                                            
                                                        </Select>
                                                    </>
                                                    :
                                                    z.field === 'contract_issuer' ?
                                                        <>
                                                            <Label>{z.headerName} :</Label>
                                                            <Select onChange={handleChange} name={z.field}>
                                                            <option selected={true} id="0"></option>
                                                                {contract_issuer.map(x => (
                                                                    <option selected={editData[z.field] === x.title ? true : false}>{x.title}</option>
                                                                ))}
                                                                
                                                            </Select>
                                                        </>
                                                        :
                                                        z.field === 'Additions' ?
                                                            <>
                                                                <MultipleSelect inputVal={editData['Additions']} onChange={handleChange} label={z.headerName} names={additions} />
                                                            </>
                                                            :
                                                            z.field === 'contract_time' ?
                                                                <>
                                                                    <Label>{z.headerName} :</Label>
                                                                    <Input value={editData[z.field] || ''} type='time' onChange={handleChange} name={z.field} label={z.headerName} />
                                                                </>
                                                                :
                                                                z.field === 'moakhar' || z.field === 'cost' ?
                                                                    <>
                                                                        <Label>{z.headerName} :</Label>
                                                                        <Input value={editData[z.field] || ''} type='number' onChange={handleChange} name={z.field} label={z.headerName} />
                                                                    </>
                                                                    :
                                                                    z.field === 'phoneNumber' ?
                                                                        <>
                                                                            <Label>{z.headerName} :</Label>
                                                                            <Input placeholder={editData[z.field] || ''} type='number' onChange={handleChange} name={z.field} label={z.headerName} />
                                                                        </>
                                                                        :
                                                                        // z.field === 'notes' ?
                                                                        //     ''
                                                                        //     :
                                                                        <>
                                                                            <Label>{z.headerName} :</Label>
                                                                            <Input value={editData[z.field] || ''} type='text' onChange={handleChange} name={z.field} label={z.headerName} />
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
                <textarea onChange={handleChange} name='notes' style={{ width: '95%', height: 150, margin: '10px auto', borderRadius: 15, padding: 5 }}>{editData['notes'] || ''}</textarea>
            </Card>
            <Alert text={'تعديل البيانات'} style={{ width: '90%' }} open={open} handleSubmit={(e) => handleSubmit(e, editData, setOpen, setMsg, setSeverity, id)} severity={severity} msg={msg} handleClose={handleClose} />
        </>
        // </Card>
    )
}

export default NewEdit