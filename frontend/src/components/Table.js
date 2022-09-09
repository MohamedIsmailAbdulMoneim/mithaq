import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Grid } from '@mui/material';


// const rows = [
//     { id: 1, Husband_name: 'محمد عادل محمد احمد', wife_name: 'هبة محمود السيد كامل', contract_date: "11/2/2020", contract_place: 'شبرا', register_date: '11/2/2020' },

// ];

export default function Table({columns, data}) {
    return (
        <Grid dir="rtl" container >
            <Grid item lg={8}  style={{margin: '100px auto'}}>
                <Box sx={{ height: '500px',   backgroundColor: '#efe4e6' }}>
                    <DataGrid
                        rows={data}   
                        columns={columns}
                        pageSize={20}
                        rowsPerPageOptions={[20]}
                        checkboxSelection
                        disableSelectionOnClick
                        experimentalFeatures={{ newEditingApi: true }}
                    />
                </Box>
            </Grid>
        </Grid>
    );
}
