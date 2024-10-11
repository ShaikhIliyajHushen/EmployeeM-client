// import React, { useState } from 'react';
// import {
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   TextField
// } from '@mui/material';

// import {
//   Avatar, Box, IconButton
// } from '@mui/material';
// import PhotoCamera from '@mui/icons-material/PhotoCamera';

// // const UserDialog = ({ open, onClose, formData, handleChange, handleSubmit, mode }) => {
// const UserDialog = ({ open, onClose, mode, formData, handleChange, handleSubmit }) => {
//   const [profilePic, setProfilePic] = useState(formData.profilePic || '');
//   const [profilePicPreview, setProfilePicPreview] = useState(formData.profilePic || '');

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setProfilePic(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setProfilePicPreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleFormSubmit = () => {
//     handleSubmit({ ...formData, profilePic });
//   };
//   return (
//     <Dialog open={open} onClose={onClose}>
//       <DialogTitle>{mode === 'edit' ? 'Update Employee Details' : 'Add New Employee'}</DialogTitle>
//       <DialogContent>
//         {/* <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
//           <Avatar
//             alt="User Profile"
//             src={profilePicPreview}
//             sx={{ width: 120, height: 120 }}
//           />
//           <input
//             accept="image/*"
//             style={{ display: 'none' }}
//             id="upload-profile-pic"
//             type="file"
//             onChange={handleFileChange}
//           />
//           <label htmlFor="upload-profile-pic" style={{
//             position: 'absolute',
//             top: '150px',
//             left: '315px'
//           }}>
//             <IconButton color="primary" aria-label="upload picture" component="span">
//               <PhotoCamera />
//             </IconButton>
//           </label>
//         </Box> */}
//         <TextField
//           margin="dense"
//           name="firstName"
//           label="First Name"
//           type="text"
//           fullWidth
//           value={formData.firstName}
//           onChange={handleChange}
//         />
//         <TextField
//           margin="dense"
//           name="lastName"
//           label="Last Name"
//           type="text"
//           fullWidth
//           value={formData.lastName}
//           onChange={handleChange}
//         />
//         <TextField
//           margin="dense"
//           name="email"
//           label="Email"
//           type="email"
//           fullWidth
//           value={formData.email}
//           onChange={handleChange}
//         />
//         <TextField
//           margin="dense"
//           name="address"
//           label="Address"
//           type="text"
//           fullWidth
//           value={formData.address}
//           onChange={handleChange}
//         />
//         <TextField
//           margin="dense"
//           name="mobile"
//           label="Mobile"
//           type="text"
//           fullWidth
//           value={formData.mobile}
//           onChange={handleChange}
//         />
//       </DialogContent>
//       <DialogActions>
//         <Button
//           variant="outlined" color="error"
//           onClick={onClose}>Cancel</Button>
//         <Button
//           sx={{
//             height: '37px', // Ensure the button height matches the input height
//             backgroundColor: '#03B7E1',
//             borderColor: '#03B7E1',
//             color: 'white',
//             '&:hover': {
//               backgroundColor: '#0299b4',
//               borderColor: '#0299b4',
//             },
//           }}
//           onClick={handleSubmit}>{mode === 'edit' ? 'Save' : 'Add'}</Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default UserDialog;



import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { Avatar, Box, IconButton } from '@mui/material';

const UserDialog = ({ open, onClose, formData, handleChange, handleSubmit, mode }) => {
  const [profilePic, setProfilePic] = useState(formData.profilePic || '');
  const [profilePicPreview, setProfilePicPreview] = useState(formData.profilePic || '');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePic(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = () => {
    handleSubmit({ ...formData, profilePic });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{mode === 'edit' ? 'Update Employee Details' : 'Add New Employee'}</DialogTitle>
      <DialogContent>
        {/* <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <Avatar
            alt="User Profile"
            src={profilePicPreview}
            sx={{ width: 120, height: 120 }}
          />
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="upload-profile-pic"
            type="file"
            onChange={handleFileChange}
          />
          <label htmlFor="upload-profile-pic" style={{
            position: 'absolute',
            top: '150px',
            left: '315px'
          }}>
            <IconButton color="primary" aria-label="upload picture" component="span">
              <PhotoCamera />
            </IconButton>
          </label>
        </Box> */}
        <TextField
          margin="dense"
          name="firstName"
          label="First Name"
          type="text"
          fullWidth
          value={formData.firstName}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="lastName"
          label="Last Name"
          type="text"
          fullWidth
          value={formData.lastName}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="email"
          label="Email"
          type="email"
          fullWidth
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="address"
          label="Address"
          type="text"
          fullWidth
          value={formData.address}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="mobile"
          label="Mobile"
          type="text"
          fullWidth
          value={formData.mobile}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="gender"
          label="Gender"
          type="text"
          fullWidth
          value={formData.gender}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="dob"
          label="Date of Birth"
          type="date"
          fullWidth
          value={formData.dob}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="maritalStatus"
          label="Marital Status"
          type="text"
          fullWidth
          value={formData.maritalStatus}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="nationality"
          label="Nationality"
          type="text"
          fullWidth
          value={formData.nationality}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="religion"
          label="Religion"
          type="text"
          fullWidth
          value={formData.religion}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined" color="error"
          onClick={onClose}>Cancel</Button>
        <Button
          sx={{
            height: '37px',
            backgroundColor: '#03B7E1',
            borderColor: '#03B7E1',
            color: 'white',
            '&:hover': {
              backgroundColor: '#0299b4',
              borderColor: '#0299b4',
            },
          }}
          onClick={handleFormSubmit}>{mode === 'edit' ? 'Save' : 'Add'}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserDialog;
