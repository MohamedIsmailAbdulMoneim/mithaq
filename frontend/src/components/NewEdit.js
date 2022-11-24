import { Card, Grid } from '@mui/material'
import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import Alert from './Alert'
import Button from "@mui/material/Button";
import { styled as style } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
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
let devNum = 1

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

const NewEdit = ({ data, inputs, status, additions, handleSubmit }) => {
    const { id } = useParams()
    const [memberDetails] = data.map(x => {
        return { ...x, Additions: x.Additions?.split(',') }

    }).filter(x => x.id === parseInt(id))
    const inputRef = useRef()
    const arrOfNums = memberDetails?.phoneNumber?.split(',,') || []
    arrOfNums[arrOfNums.length - 1] = arrOfNums[arrOfNums.length - 1]?.substr(0, arrOfNums[arrOfNums.length - 1].length - 1)

    const [editData, setEditData] = useState(memberDetails)
    const [phoneNums, setPhoneNums] = useState(arrOfNums.map(x => JSON.parse(x)))
    const [newPhones, setNewPhones] = useState({})
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('')
    const [severity, setSeverity] = useState('')
    const [phoneInputs, setPhoneInputs] = useState([])


    console.log(phoneInputs);



    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

    const handlePhoneInput = () => {
        const input =
            <div ref={inputRef} name={`phoneNumber_${++devNum}`} style={{ width: '100%' }}>
                <Label>رقم التليفون :</Label>
                <div style={{ display: 'flex', width: '100%' }}>
                    {/* <phoneInputs style={{color: 'black'}}/>  */}

                    <Input type='number' onChange={handleNewPhones} name={`phoneNumber_${++idNum}`} label={'رقم التليفون'} />
                    <HighlightOffIcon onClick={handleDeleteNewPhone} style={{ marginRight: 5 }} />
                </div>
            </div>

        setPhoneInputs(old => [...old, input])
    }

    const handleDeleteNewPhone = (e) => {
        // setNewPhones(old => {
        //     return delete old[e.target.name]
        // })

        const inputIndex = Array.prototype.indexOf.call(inputRef.current.parentNode.children, e.target.parentNode)

        // phoneInputs.splice(inputIndex, 1)
        // setPhoneInputs(phoneInputs)
        console.log(e.target.parentNode.parentNode);

    }
    // Array.prototype.indexOf.call(parent.children, child)

    const handleNewPhones = (e) => {
        setNewPhones(old => ({
            ...old,
            [e.target.name]: e.target.value
        }))
    }

    const handleChange = (e) => {
        if (e.target.name.includes('phoneNumber')) {

            setPhoneNums(old => {
                return old.map(x => {
                    if (x.id === e.target.id) {
                        x.phoneNumber = e.target.value
                        return x
                    }
                    else return x
                })
            })
        } else if (e.target.name === 'Additions') {
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
                            <Card style={{ display: 'flex', flexDirection: 'column', width: '90%', alignItems: 'start', background: 'rgba(171, 120, 106, 0.89)', margin: 10, borderRadius: 20 }}>
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

                                                                    {phoneNums?.map((a, i) => (

                                                                        <>

                                                                            <Label>{z.headerName} :</Label>
                                                                            <Input placeholder={phoneNums[i].phoneNumber || ''} id={a.id} type='number' onChange={handleChange} name={z.field} label={z.headerName} />

                                                                        </>
                                                                    ))}
                                                                    {phoneInputs}
                                                                </>
                                                                :
                                                                z.field === 'notes' ?
                                                                    ''
                                                                    :
                                                                    <>
                                                                        <Label>{z.headerName} :</Label>
                                                                        <Input value={editData[z.field] || ''} type='text' onChange={handleChange} name={z.field} label={z.headerName} />
                                                                    </>
                                        }
                                        {
                                            z.field === 'phoneNumber'
                                            &&
                                            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                                                {/* <AddIcon onClick={handlePhoneInput} />
                                                <RemoveIcon onClick={handlePhoneInput} /> */}
                                                <button onClick={handlePhoneInput} style={{ width: '65%', height: 30, borderRadius: 15, cursor: 'pointer', marginTop: 5 }}>إضافة تليفون آخر</button>
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
            <Card dir="rtl" style={{ display: 'flex', flexDirection: 'column', width: '97%', alignItems: 'start', background: 'rgba(171, 120, 106, 0.89)', margin: '10px auto', borderRadius: 20 }}>
                <label style={{ marginRight: 80 }}>ملاحظات :</label>
                <textarea style={{ width: '95%', height: 150, margin: '10px auto', borderRadius: 15, padding: 5 }}></textarea>
            </Card>
            {/* <button onClick={(e) => handleSubmit(e, setOpen, editData, phoneNums, setMsg, setSeverity, seteditData, setPhoneNums, setPhoneInputs)} style={{margin: '0 auto', width: '90%', height: 30}}>إدخال</button> */}
            <Alert text={'تعديل البيانات'} style={{ width: '90%' }} open={open} handleSubmit={(e) => handleSubmit(e, editData, setOpen, phoneNums, newPhones, setMsg, setSeverity, id)} severity={severity} msg={msg} handleClose={handleClose} />
        </>
        // </Card>
    )
}

export default NewEdit