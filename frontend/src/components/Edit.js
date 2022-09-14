import React, { useState } from 'react'
import { Button, Grid, TextField } from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios'
import Alert from './Alert'
import { Link, useParams } from "react-router-dom";
import { styled } from '@mui/material/styles';
import { purple } from '@mui/material/colors';

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[800]),
  backgroundColor: purple[500],
  '&:hover': {
    backgroundColor: purple[700],
  },
}));

let idNum = 1


const Edit = ({ inputs, data, additions, status }) => {
  const { id } = useParams()
  const [memberDetails] = data.filter(x => x.id === parseInt(id))
  const arrOfNums = memberDetails?.phoneNumbers?.split(',,') || []
  arrOfNums[arrOfNums.length - 1] = arrOfNums[arrOfNums.length - 1]?.substr(0, arrOfNums[arrOfNums.length - 1].length - 1)

  const [editData, setEditData] = useState(memberDetails)
  const [phoneNums, setPhoneNums] = useState(arrOfNums.map(x => JSON.parse(x)))
  const [newPhones, setNewPhones] = useState({})
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState('')
  const [severity, setSeverity] = useState('')
  const [phoneInputs, setPhoneInputs] = useState([])


  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handlePhoneInput = () => {
    const input = <Grid item lg="12" xs="12"><TextField onChange={handleNewPhones} name={`phoneNumber_${++idNum}`} label={'رقم التليفون'} variant="standard" fullWidth /></Grid>
    setPhoneInputs(old => [...old, input])
  }

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
    } else {
      setEditData(old => ({
        ...old,
        [e.target.name]: e.target.value
      }))
    }
  }
  console.log(editData, phoneNums, newPhones);

  const handleSubmit = (e) => {
    const filteredNullData = editData
    Object.keys(filteredNullData).forEach(x => {
      if (filteredNullData[x]?.length === 0 || filteredNullData[x] === null || filteredNullData[x] === 'لا توجد بيانات') {
        delete filteredNullData[x]
      }
    })
    console.log(filteredNullData);
    e.preventDefault()
    setOpen(true);

    axios({
      method: "POST",
      data: { filteredNullData, phoneNums, newPhones },
      url: `http://${process.env.REACT_APP_URL}/editrecord`,
      headers: { "Content-Type": "application/json" },
    }).then(data => {
      if (data.data.msg === 'تم إدخال البيانات من قبل') {
        setMsg('تم إدخال البيانات من قبل')
        setSeverity('error')
      } else if (data.data.msg === 'تم إدخال البيانات بنجاح') {
        setMsg('تم إدخال البيانات بنجاح')
        setSeverity('success')

      }

    })

  }
  return (
    <Box sx={{ margin: '80px auto 0 auto', backgroundColor: '#ede0e0', width: '50%', minWidth: '450px', padding: '10px', boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;' }}>
      <Grid container sx={{ padding: '0 90px' }} spacing={1}>
        {inputs.map(x => (
          x.field === 'notes' ?
            <Grid item lg='12'>
              <TextField value={editData[x.field] || ''} type="number" onChange={handleChange} name={x.field} id="standard-basic" label={x.headerName} variant="standard" margin="normal" fullWidth />
            </Grid>
            :
            x.field === 'phoneNumber' ?
              phoneNums?.map(a => (
                <Grid item lg='12'>
                  <TextField value={a.phoneNumber || ''} id={a.id} type="number" onChange={handleChange} name={x.field} x label={x.headerName} variant="standard" margin="normal" fullWidth />
                </Grid>
              ))

              :
              <Grid item lg="6">
                {x.field === 'contract_date' || x.field === 'data_register_date' ?
                  <TextField value={editData[x.field] || ''} type='date' InputLabelProps={{ shrink: true, required: true }} onChange={handleChange} name={x.field} id="standard-basic" label={x.headerName} variant="standard" margin="normal" fullWidth />
                  :
                  x.field === 'moakhar' || x.field === 'cost' ?
                    <TextField value={editData[x.field] || ''} type="number" onChange={handleChange} name={x.field} id="standard-basic" label={x.headerName} variant="standard" margin="normal" fullWidth />
                    :
                    <TextField value={editData[x.field] || ''} onChange={handleChange} name={x.field} id="standard-basic" label={x.headerName} variant="standard" margin="normal" fullWidth />
                }
              </Grid>
        ))}
        {phoneInputs}
      </Grid>
      <ColorButton onClick={handlePhoneInput} style={{ width: '20%', marginTop: '15px', marginBottom: 15, marginLeft: 515 }} variant="contained">إضافة رقم تليفون آخر</ColorButton>
      <Alert open={open} handleSubmit={handleSubmit} severity={severity} msg={msg} handleClose={handleClose} />
    </Box>
  )
}

export default Edit