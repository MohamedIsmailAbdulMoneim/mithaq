import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 370,
    },
  },
};



function getStyles(name, personName, theme) {

  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelect({ names, label, onChange, inputVal }) {
  const theme = useTheme();
  return (
      <>
        <label style={{ marginRight: '10px' }}>{label} :</label>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={inputVal || []}
          onChange={onChange}
          name={'Additions'}
          input={<OutlinedInput />}
          MenuProps={MenuProps}
          style={{
            width: '82%',
            height: 25,
            marginRight: 10,
            borderRadius: '10px',
            background: '#ddc1b9e3',
            marginBottom: '8px'
            
          }}
        >
          {names.map((name) => (
            <MenuItem
              key={name.id}
              value={name.title}
              style={getStyles(name.title, inputVal || [], theme)}

            >
              {name.title}
            </MenuItem>
          ))}
        </Select>
      </>
  );
}