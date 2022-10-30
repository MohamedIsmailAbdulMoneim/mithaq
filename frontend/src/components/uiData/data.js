import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import { Link } from "react-router-dom";

export const inputsData = [
    [

        [
            {
                field: 'Husband_name',
                headerName: 'اسم الزوج',
            },
            {
                field: 'wife_name',
                headerName: 'اسم الزوجة',
            },
            {
                field: 'wife_custodian',
                headerName: 'ولي العروسة',
            }
        ]
        ,
        [
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
        ]
        ,
        [
            {
                field: 'moakhar',
                headerName: 'المؤخر',
            },
            {
                field: 'cost',
                headerName: 'التكلفة',
            },

        ]
    ],
    [
        [
            {
                field: 'maazon_name',
                headerName: 'اسم المأذون',
            },
            {
                field: 'envoy_name',
                headerName: 'اسم المندوب',
            },
            {
                field: 'serial_number',
                headerName: 'رقم الوثيقة',
            }

        ],
        [

            {
                field: 'data_register_date',
                headerName: 'تاريخ تسجيل البيانات',
            },
            {
                field: 'Additions',
                headerName: 'الإضافات',
            },
            {
                field: 'status',
                headerName: 'الحالة',
            }
        ],
        [
            {
                field: 'phoneNumber',
                headerName: 'رقم التليفون',
            }
        ]
    ]
]



export const columns = [
    { field: 's', headerName: 'م', width: 30, editable: false },
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
        renderCell: (params) => (<Link to={`/nseemore/${params.id || ''}`}>
            <PlayCircleFilledWhiteIcon />
        </Link>),

    }
];

