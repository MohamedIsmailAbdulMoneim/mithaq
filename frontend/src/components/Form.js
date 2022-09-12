import React, { useState } from 'react'
import { Autocomplete, Grid, TextField } from '@mui/material'
import Button from "@mui/material/Button";
import { Box } from '@mui/system'
import axios from 'axios'
import Alert from './Alert'
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


const Form = ({ inputs, additions, status }) => {

  const [newData, setNewData] = useState({})
  const [phoneNums, setPhoneNums] = useState({})
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState('')
  const [severity, setSeverity] = useState('')
  const [phoneInputs, setPhoneInputs] = useState([])

  console.log(phoneNums);

  const defaultPropsForStatus = {
    options: status,
    getOptionLabel: (option) => option.title,
  };

  const defaultPropsForAddition = {
    options: additions,
    getOptionLabel: (option) => option.title,
  };

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
      setNewData(old => ({
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
      data: { newData, phoneNums },
      url: `http://${process.env.REACT_APP_URL}/addrecord`,
      headers: { "Content-Type": "application/json" },
    }).then(data => {
      console.log(data);
      if (data.data.msg === 'تم إدخال البيانات بنجاح') {
        setMsg('تم إدخال البيانات بنجاح')
        setSeverity('success')
        setNewData({})
        setPhoneNums({})
        setPhoneInputs([])

      } else {
        console.log('hit');
        setMsg('تم إدخال البيانات من قبل')
        setSeverity('error')
      }

    })

  }
  return (
    <Box sx={{ margin: '80px auto 0 auto', backgroundColor: '#ede0e0', width: '50%', minWidth: '450px', padding: '10px', boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;' }}>
      <Grid container sx={{ padding: '0 90px' }} spacing={2}>
        {inputs.map(x => (
          x.field === "phoneNumber" ? <Grid item lg="12" xs="12">
            <TextField value={phoneNums[x.field] || ''} onChange={handleChange} name={`${x.field}`} id="standard-basic" label={x.headerName} variant="standard" margin="normal" fullWidth />
          </Grid> :
            <Grid item lg="6" xs="12">
              {x.field === 'contract_date' || x.field === 'data_register_date' ?
                <TextField value={newData[x.field] || ''} type='date' InputLabelProps={{ shrink: true, required: true }} onChange={handleChange} name={x.field} id="standard-basic" label={x.headerName} variant="standard" margin="normal" fullWidth />
                :
                x.field === 'moakhar' || x.field === 'cost' ?
                  <TextField value={newData[x.field] || ''} type="number" onChange={handleChange} name={x.field} id="standard-basic" label={x.headerName} variant="standard" margin="normal" fullWidth />
                  :
                  x.field === 'status' ?
                    <Autocomplete
                      {...defaultPropsForStatus}
                      id="clear-on-escape"
                      clearOnEscape
                      renderInput={(params) => (
                        <TextField {...params} name={x.field} label={x.headerName} id="standard-basic" variant="standard" margin="normal" style={{ marginTop: 16 }} fullWidth />
                      )}
                    /> : x.field === 'Additions' ? <Autocomplete
                      {...defaultPropsForAddition}
                      id="clear-on-escape"
                      clearOnEscape
                      renderInput={(params) => (
                        <TextField {...params} name={x.field} label={x.headerName} id="standard-basic" variant="standard" margin="normal" style={{ marginTop: 16 }} fullWidth />
                      )}
                    /> :

                      <TextField value={newData[x.field] || ''} onChange={handleChange} name={x.field} id="standard-basic" label={x.headerName} variant="standard" margin="normal" fullWidth />
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

export default Form