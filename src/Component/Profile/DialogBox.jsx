import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const DialogBox = ({ open, handleClose, handleSaveDetails, data, setData }) => {
    const handleChange = (event) => {
        const { name, value } = event.target;
        setData({ ...data, [name]: value });
    };

    const handleDateChange = (newValue) => {
        setData({ ...data, dob: newValue });
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth>
            <DialogTitle>Edit Personal Details</DialogTitle>
            <DialogContent>
                <TextField
                    margin="normal"
                    fullWidth
                    name="firstName"
                    label="First Name"
                    value={data.firstName}
                    onChange={handleChange}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    name="lastName"
                    label="Last Name"
                    value={data.lastName}
                    onChange={handleChange}
                />
                <FormControl margin="normal" fullWidth>
                    <InputLabel id="gender-label">Gender</InputLabel>
                    <Select
                        labelId="gender-label"
                        name="gender"
                        value={data.gender}
                        onChange={handleChange}
                    >
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                    </Select>
                </FormControl>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                        label="Date of Birth"
                        inputFormat="MM/dd/yyyy"
                        value={data.dob}
                        onChange={handleDateChange}
                        renderInput={(params) => <TextField margin="normal" fullWidth {...params} />}
                    />
                </LocalizationProvider>
                <FormControl margin="normal" fullWidth>
                    <InputLabel id="marital-status-label">Marital Status</InputLabel>
                    <Select
                        labelId="marital-status-label"
                        name="maritalStatus"
                        value={data.maritalStatus}
                        onChange={handleChange}
                    >
                        <MenuItem value="Single">Single</MenuItem>
                        <MenuItem value="Married">Married</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    margin="normal"
                    fullWidth
                    name="address"
                    label="Address"
                    value={data.address}
                    onChange={handleChange}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    name="nationality"
                    label="Nationality"
                    value={data.nationality}
                    onChange={handleChange}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    name="religion"
                    label="Religion"
                    value={data.religion}
                    onChange={handleChange}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    name="email"
                    label="Personal Email ID"
                    value={data.email}
                    onChange={handleChange}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    name="contactNo"
                    label="Contact No."
                    value={data.Mobile}
                    onChange={handleChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSaveDetails} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DialogBox;

