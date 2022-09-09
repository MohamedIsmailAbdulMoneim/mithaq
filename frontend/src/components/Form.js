import React, { useState } from 'react'
import { Grid, TextField } from '@mui/material'

import { Box } from '@mui/system'
import axios from 'axios'
import Alert from './Alert'




const Form = ({ inputs }) => {

  const [newData, setNewData] = useState({})
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState('')
  const [severity, setSeverity] = useState('') 

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  console.log(newData);

  const handleChange = (e) => {
    setNewData(old => ({
      ...old,
      [e.target.name]: `"${e.target.value}"`
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setOpen(true);
    axios({
      method: "POST",
      data: newData,
      url: `http://${process.env.REACT_APP_URL}/addrecord`,
      headers: { "Content-Type": "application/json" },
    }).then(data => {
      console.log(data);
      if(data.data.msg === 'تم إدخال البيانات من قبل'){
        setMsg('تم إدخال البيانات من قبل')
        setSeverity('error')
      }else if(data.data.msg === 'تم إدخال البيانات بنجاح'){
        setMsg('تم إدخال البيانات بنجاح')
        setSeverity('success')

      }
      setNewData({})
    })

  }
  return (
    <Box sx={{ margin: '80px auto 0 auto', backgroundColor: '#ede0e0', width: '50%', minWidth: '450px', padding: '10px', boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;' }}>
      <Grid container sx={{ padding: '0 90px' }} spacing={2}>
        {inputs.map(x => (
          <Grid item lg="6">
            {x.field === 'contract_date' || x.field === 'data_register_date' ? 
            <TextField type='date' InputLabelProps={{ shrink: true, required: true }} onChange={handleChange} name={x.field} id="standard-basic" label={x.headerName} variant="standard" margin="normal" fullWidth />
            :
            x.field === 'moakhar' || x.field === 'cost' ?
            <TextField type="number" onChange={handleChange} name={x.field} id="standard-basic" label={x.headerName} variant="standard" margin="normal" fullWidth /> 
            :
            <TextField onChange={handleChange} name={x.field} id="standard-basic" label={x.headerName} variant="standard" margin="normal" fullWidth /> 

          }
            
          </Grid>
        ))}
      </Grid>
      <Alert open={open} handleSubmit={handleSubmit} severity={severity} msg={msg} handleClose={handleClose} />
    </Box>
  )
}

export default Form