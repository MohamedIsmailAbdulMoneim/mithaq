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


const Edit = ({ inputs, data }) => {
  const { id } = useParams()

  const [memberDetails] = data.filter(x => x.id === parseInt(id))

  const [editData, setEditData] = useState(memberDetails)
  const [phoneNums, setPhoneNums] = useState({})
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState('')
  const [severity, setSeverity] = useState('')
  const [phoneInputs, setPhoneInputs] = useState([])


  const obj = inputs.reduce((p, c) => {
    if (memberDetails[c.field]) {
      p.push({ ...c, value: memberDetails[c.field] })
      return p
    } else {
      p.push(c)
      return p
    }
  }, [])

  console.log(editData);


  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handlePhoneInput = () => {

    const input = <Grid item lg="12" xs="12"><TextField onChange={handleChange} name={`phoneNumber_${++idNum}`} label={'رقم التليفون'} variant="standard" fullWidth /></Grid>

    setPhoneInputs(old => [...old, input])
  }

  const handleChange = (e) => {
    if (e.target.name.includes('phoneNumber')) {
      setPhoneNums(old => ({
        ...old,
        [e.target.name]: e.target.value
      }))
    } else {
      setEditData(old => ({
        ...old,
        [e.target.name]: e.target.value
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setOpen(true);
    axios({
      method: "POST",
      data: editData,
      url: `http://localhost:5000/addrecord`,
      headers: { "Content-Type": "application/json" },
    }).then(data => {
      if (data.data.msg === 'تم إدخال البيانات من قبل') {
        setMsg('تم إدخال البيانات من قبل')
        setSeverity('error')
      } else if (data.data.msg === 'تم إدخال البيانات بنجاح') {
        setMsg('تم إدخال البيانات بنجاح')
        setSeverity('success')

      }
      setEditData({})
    })

  }
  return (
    <Box sx={{ margin: '80px auto 0 auto', backgroundColor: '#ede0e0', width: '50%', minWidth: '450px', padding: '10px', boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;' }}>
      <Grid container sx={{ padding: '0 90px' }} spacing={2}>
        {obj.map(x => (
          x.field === 'phoneNumber' ?
            x.value.map(a => (
              <Grid item lg='12'>
              <TextField value={a || ''} type="number" onChange={handleChange} name={x.field} id="standard-basic" label={x.headerName} variant="standard" margin="normal" fullWidth />
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