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
  const arrOfNums = memberDetails.phoneNumbers?.split(',,') || []
  arrOfNums[arrOfNums?.length - 1] = arrOfNums[arrOfNums.length - 1]?.substr(0, arrOfNums[arrOfNums.length - 1].length - 1)
  

  return (
    <Box sx={{ width: 950, margin: '0 auto', backgroundColor: '#efe4e6', boxShadow: 'rgba(255, 255, 255, 0.2) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0.9) 0px 0px 0px 1px;' }}>
      <Grid container sx={{ padding: '0 90px' }} spacing={2}>
        {inputs.map(x => (
          x.field === 'phoneNumber' ?
            arrOfNums.map(x => JSON.parse(x))?.map(a => (
              <Grid item lg="12">
                <TextField
                  aria-readonly
                  value={a.phoneNumber}
                  fullWidth
                  label={x.headerName}
                  id={a.id}
                />
              </Grid>
            ))
            :
            x.field === 'notes' ?
              <Grid item lg="12">
                <TextField
                  aria-readonly
                  value={memberDetails[x.field]}
                  fullWidth
                  label={x.headerName}
                  id="fullWidth"
                />
              </Grid>
              :
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
        <Grid item lg="12" style={{ marginBottom: 10 }}>
          <ColorButton fullWidth variant="contained"><Link style={{ color: 'white' }} to={`/edit/${id}`}>تعديل البيانات</Link></ColorButton>
        </Grid>
      </Grid>
    </Box>
  )
}

export default SeeMore