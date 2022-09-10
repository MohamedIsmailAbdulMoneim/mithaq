import { Grid, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { Link, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import { styled } from '@mui/material/styles';
import { purple } from '@mui/material/colors';

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[800]),
  backgroundColor: purple[500],
  '&:hover': {
    backgroundColor: purple[700],
  },
}));

const SeeMore = ({ inputs, data }) => {

  const { id } = useParams()

  const [memberDetails] = data.filter(x => x.id === parseInt(id))

  const obj = inputs.reduce((p, c) => {

    if (memberDetails[c.field]) {
      p.push({ ...c, value: memberDetails[c.field] })
      return p
    } else {
      p.push(c)
      return p
    }
  }, [])

  console.log(obj);


  return (
    <Box sx={{ width: 950, height: 720, margin: '0 auto', backgroundColor: '#efe4e6', boxShadow: 'rgba(255, 255, 255, 0.2) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0.9) 0px 0px 0px 1px;' }}>

      <Grid container sx={{ padding: '0 90px' }} spacing={2}>
        {obj.map(x => (
          x.field === 'phoneNumber' ?
            x.value.map(a => (
              <Grid item lg="12">
                <TextField
                  aria-readonly
                  value={a}
                  fullWidth
                  label={x.headerName}
                  id="fullWidth"
                />
              </Grid>
            ))
            :
            <Grid item lg="6">
              <TextField
                aria-readonly
                value={x.value || ''}
                fullWidth
                label={x.headerName}
                id="fullWidth"
              />
            </Grid>
        ))}
        <Grid item lg="12">
          <ColorButton fullWidth variant="contained"><Link style={{ color: 'white' }} to={`/edit/${id}`}>تعديل البيانات</Link></ColorButton>
        </Grid>
      </Grid>
    </Box>
  )
}

export default SeeMore