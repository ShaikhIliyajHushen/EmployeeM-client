import * as React from 'react';
import { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function FirstComponent() {
    const [value, setValue] = useState([]);

    console.log(value)
    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker value={value} onChange={(newValue) => setValue(newValue)} />
            </LocalizationProvider>
            <div>
                <div>{String(value)}</div>
            </div>
        </>
    );
}

// import React from 'react'

// const Index = () => {
//   return (
//     <div>
//       <h1>Details</h1>
//     </div>
//   )
// }

// export default Index
