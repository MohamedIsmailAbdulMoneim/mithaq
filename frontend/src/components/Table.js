import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Fab, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';



// const rows = [
//     { id: 1, Husband_name: 'محمد عادل محمد احمد', wife_name: 'هبة محمود السيد كامل', contract_date: "11/2/2020", contract_place: 'شبرا', register_date: '11/2/2020' },

// ];

export default function Table({ columns, data }) {
    console.log(data);
    return (
        <>
            <Grid dir="rtl" container >

                <Grid item lg={8} xs={12} sm={12} style={{ margin: '100px auto' }}>
                    <Box sx={{ height: '500px', backgroundColor: '#efe4e6', boxShadow: "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;" }}>
                        <DataGrid
                            style={{fontSize: 10}}
                            rows={data}
                            columns={columns}
                            pageSize={20}
                            rowsPerPageOptions={[20]}
                            checkboxSelection
                            disableSelectionOnClick
                        />
                    </Box>
                    <Link to="/form">
                        {/* <Icon style={{ position: 'relative', left: '47.8%', bottom: '7%', width: 50, height: 50 }} color="primary">
                        <AddCircleIcon style={{ fontSize: 30 }} />
                    </Icon> */}

                        <Fab style={{ position: 'relative', left: '47%', bottom: '9%', width: 45, height: 45 }} color="primary" aria-label="add">
                            <AddIcon />
                        </Fab>
                    </Link>
                </Grid>
            </Grid>
        </>
    );
}
