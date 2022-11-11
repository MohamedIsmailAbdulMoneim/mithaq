import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { styled } from '@mui/material/styles';
import { purple } from '@mui/material/colors';

const ColorButton = styled(Button)(({ theme }) => ({
  color: 'black',
  backgroundColor: '#f4eeee',
  '&:hover': {
    backgroundColor: 'gray',
  },
}));

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;


});

export default function CustomizedSnackbars({ open, msg, severity, handleSubmit, handleClose, text }) {
  return (
    <Stack spacing={2} sx={{ width: "100%", marginBottom: 5 }}>
      <ColorButton style={{width: '30%', margin: '0 auto'}} onClick={handleSubmit} variant="contained">{text}</ColorButton>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          <span style={{ margin: '0 12px' }}>{msg}</span>
        </Alert>
      </Snackbar>
    </Stack>
  );
}
