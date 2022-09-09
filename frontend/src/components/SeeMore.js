import { Alert, Grid, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import { useParams } from "react-router-dom";

const SeeMore = ({ inputs, data }) => {

  const { id } = useParams()
  const [msg, setMsg] = useState('')
  const [severity, setSeverity] = useState('')
  const [open, setOpen] = useState(false);
  const [memberDetails] = data.filter(x => x.id === parseInt(id))
  const handleSubmit = (e) => {
    e.preventDefault()
  }
  const handleClose = (e) => {
    
  }

  return (
    <Box sx={{ height: '250px', margin: '0 auto', backgroundColor: '#efe4e6' }}>
      <Grid container sx={{ padding: '0 90px' }} spacing={2}>
        {inputs.map(x => (
          <Grid item lg="6">
            <TextField
              aria-readonly
              value={memberDetails[x.field]}
              fullWidth
              label={x.headerName}
              id="fullWidth"
            />
          </Grid>
        ))}
        <Alert open={open} handleSubmit={handleSubmit} severity={severity} msg={msg} handleClose={handleClose} />

      </Grid>
    </Box>
  )
}

export default SeeMore