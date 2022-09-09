import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import { Link } from "react-router-dom";


export const inputsData = [
    {
        field: 'Husband_name',
        headerName: 'اسم الزوج',
    },
    {
        field: 'wife_name',
        headerName: 'اسم الزوجة',
    },
    {
        field: 'contract_date',
        headerName: 'تاريخ العقد',
    },
    {
        field: 'contract_place',
        headerName: 'مكان العقد',
    },
    {
        field: 'contract_time',
        headerName: 'وقت العقد',
    },
    {
        field: 'data_register_date',
        headerName: 'تاريخ تسجيل البيانات',

    },
    {
        field: 'wife_custodian',
        headerName: 'ولي العروسة',
    },
    {
        field: 'moakhar',
        headerName: 'المؤخر',
    },
    {
        field: 'cost',
        headerName: 'التكلفة',
    },
    {
        field: 'serial_number',
        headerName: 'رقم الوثيقة',
    },
    {
        field: 'maazon_name',
        headerName: 'اسم المأذون',
    },
    {
        field: 'envoy_name',
        headerName: 'اسم المندوب',
    },
    {
        field: 'status',
        headerName: 'الحالة',
    },
    {
        field: 'Additions',
        headerName: 'الإضافات',
    }
];

export const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'Husband_name',
        headerName: 'اسم الزوج',
        width: 150,
        editable: true,
    },
    {
        field: 'wife_name',
        headerName: 'اسم الزوجة',
        width: 150,
        editable: true,
    },
    {
        field: 'contract_date',
        headerName: 'تاريخ العقد',
        width: 150,
        editable: true,
    },
    {
        field: 'contract_place',
        headerName: 'مكان العقد',
        sortable: false,
        width: 110,
    },
    {
        field: 'register_date',
        headerName: 'تسجيل البيانات',
        sortable: false,
        width: 160,
    },
    {
        field: 'show',
        headerName: 'عرض',
        type: 'icon',
        width: 110,
        renderCell: (params) => (<Link to={`/seemore/${params.id || ''}`}>
            <PlayCircleFilledWhiteIcon />
        </Link>),

    },
    {
        field: 'delete',
        headerName: 'حذف',
        type: 'icon',
        width: 110,
        renderCell: () => <DeleteOutlineIcon />,

    }
];