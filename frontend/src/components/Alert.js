import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { styled } from '@mui/material/styles';
import { purple } from '@mui/material/colors';

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[800]),
  backgroundColor: purple[500],
  '&:hover': {
    backgroundColor: purple[700],
  },
}));

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;


});

export default function CustomizedSnackbars({ open, msg, severity, handleSubmit, handleClose }) {


  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <ColorButton style={{width: '80%', margin: '0 auto'}} onClick={handleSubmit} variant="contained">إدخال البيانات</ColorButton>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          <span style={{ margin: '0 12px' }}>{msg}</span>
        </Alert>
      </Snackbar>
    </Stack>
  );
}
