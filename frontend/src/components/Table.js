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
    const [page, setPage] = React.useState(0);
    const handleChangePage = (event) => {
        setPage(event)
    };
    console.log(data);


    return (
        <>


            <Grid dir="rtl" container >

                <Grid item lg={6.5} xs={12} sm={12} style={{ margin: '0 auto' }}>
                    <Box sx={{ backgroundColor: 'transparent', height: '350px', width: '100%', color: '#0000', boxShadow: "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;" }}>
                        <DataGrid

                            rows={data}
                            columns={columns}
                            pageSize={5}
                            style={{color: 'white'}}
                            rowsPerPageOptions={[50]}
                            disableSelectionOnClick
                            onPageChange={handleChangePage}

                        />
                    </Box>
                    <Link to="/form">
                        {/* <Icon style={{ position: 'relative', left: '47.8%', bottom: '7%', width: 50, height: 50 }} color="primary">
                        <AddCircleIcon style={{ fontSize: 30 }} />
                    </Icon> */}

                        <Fab style={{ position: 'relative', left: '47%', bottom: '9%', width: 39, height: 39 }} color="primary" aria-label="add">
                            <AddIcon />
                        </Fab>
                    </Link>
                </Grid>
            </Grid>
        </>
    );
}
