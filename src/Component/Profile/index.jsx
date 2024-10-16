// import { useState, useEffect } from 'react';
// import { Box, Avatar, Card, CardContent, Typography } from '@mui/material';
// import avatr from '../../Assets/pic.jpg';
// import { Button } from '@mui/material';
// import DialogBox from './DialogBox';
// import { IconButton } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import { LocalizationProvider } from '@mui/x-date-pickers';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { jwtDecode } from 'jwt-decode';
// import { useAuth0 } from '@auth0/auth0-react';
// import UserDialog from '../Dashboard/DialogBox'
// import axios from 'axios';

// const Profile = () => {
//   const [openDialog, setDialogOpen] = useState(false);
//   const [selectedUser, setSelectedUser] = useState(null);

//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     gender: '',
//     dob: new Date(''),
//     address: '',
//     maritalStatus: '',
//     nationality: '',
//     religion: '',
//     email: '',
//     contactNo: ''
//   });


//   const { user, isAuthenticated, getAccessTokenSilently, logout } = useAuth0();


//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');

//   useEffect(() => {
//     const initializeUserData = async () => {
//       const TokenData = localStorage.getItem("Token");

//       if (TokenData) {
//         try {
//           const decodedToken = jwtDecode(TokenData);
//           setFirstName(decodedToken.firstName);
//           setLastName(decodedToken.lastName);
//         } catch (error) {
//           console.error('Invalid token:', error);
//         }
//       } else if (isAuthenticated && user) {
//         setFirstName(user.given_name || '');
//         setLastName(user.family_name || '');
//       }
//     };

//     const getEmployeeDetails = async () => {
//       try {
//         const TokenData = localStorage.getItem("Token");
//         if (typeof TokenData === 'string' && TokenData.length > 0) {
//           const decodedToken = jwtDecode(TokenData);
//           const { id } = decodedToken;
//           const response = await axios.get(`http://localhost:3005/getSingleEmpRecord/getSingleEmp/${id}`);
//           setFormData(response.data.data);
//           setSelectedUser(response.data.data)
//           console.log(response.data.data);
//         } else {
//           console.error('TokenData is not a valid string:', TokenData);
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     initializeUserData();
//     getEmployeeDetails();
//   }, [isAuthenticated, user]);



//   const handleEdit = () => {
//     setFormData({
//       firstName: selectedUser.firstName,
//       lastName: selectedUser.lastName,
//       email: selectedUser.email,
//       address: selectedUser.personalDetails?.address || '',  
//       mobile: selectedUser.personalDetails?.mobile || ''
//     });
//     setDialogOpen(true);
//   };

//   const handleDialogClose = () => {
//     setDialogOpen(false);
//   };

//   const handleSubmit = async () => {
//     const editId = localStorage.getItem("editId");
//     const updateBody = {
//       firstName: formData.firstName,
//       lastName: formData.lastName,
//       email: formData.email,
//       personalDetails: {
//         address: formData.address,
//         mobile: formData.mobile,
//       }
//     };
//     try {
//       const response = await fetch(`http://localhost:3005/updateRecords/${editId}/updateEmpDetails`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(updateBody),
//       });

//       if (!response.ok) {
//         throw new Error(`Failed to update user details: ${response.status} ${response.statusText}`);
//       }
//       // setOpenDialog(false);
//       // getEmployeeDetails();
//     } catch (error) {
//       console.error('Error updating user details:', error);
//     }
//     handleDialogClose();
//   };



// const handleChange = (e) => {
//   const { name, value } = e.target;
//   setFormData({ ...formData, [name]: value });
// };

// return (<>
//   <Box
//     sx={{
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center',
//       position: 'sticky',
//       top: 10,
//       zIndex: 1000,
//     }}
//   >
//     <Box sx={{
//       width: { xs: 80, md: 153 },
//       height: { xs: 80, md: 155 },
//       position: 'absolute',
//       top: '65px',
//       zIndex: 1,
//       left: '110px',
//       border: '3px solid white',
//       borderRadius: '14px'
//     }}>
//       <img src={avatr} alt="" style={{ width: '100%', height: '150px', borderRadius: '10px', objectFit: 'cover' }} />
//     </Box>
//     <Box
//       sx={{
//         width: '100%',
//         height: '190px',
//         background: 'linear-gradient(to right, #114357, #f29492)',
//         position: 'relative',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center'
//       }}
//     >
//       <Box sx={{
//         width: '90%', height: '130px', backgroundColor: 'white',
//         boxShadow: 2,
//         position: 'absolute', top: '125px', borderRadius: '10px',
//         display: 'flex',
//       }}>
//         <Box sx={{
//           width: '60%', height: 'auto',
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContent: 'center',
//           paddingLeft: '220px',
//           textOverflow: 'clip'

//         }}>
//           <Typography variant="h5" component="div">
//             Shaikh Iliyajhushen Shaikh Bashir
//           </Typography>
//           <Typography variant="body2" color="text.secondary">
//             Associate Software Engineer
//           </Typography>
//         </Box>
//         <Box sx={{ width: '40%', height: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
//           <Typography variant="h5" color="text.secondary">
//             Motivity Labs
//           </Typography>
//           <Typography variant="h6" color="text.secondary">
//             Motivity Labs
//           </Typography>
//           <Typography variant="h6" color="text.secondary">
//             Motivity Labs
//           </Typography>
//         </Box>
//       </Box>
//     </Box>
//   </Box>
//   <div class="container" style={{ marginTop: '80px' }}>
//     <div class="row">
//       <LocalizationProvider dateAdapter={AdapterDateFns}>
//         <div class="col-12 mb-3">
//           <div class="card h-auto">
//             <div class="card-body">
//               <div className="d-flex justify-content-between align-items-center">
//                 <h5 className="card-title fs-4 fw-bold">Personal Details</h5>
//                 <IconButton color="primary" onClick={handleEdit}>
//                   <EditIcon />
//                 </IconButton>
//               </div>

//               <div className="row">
//                 <div className="col-12 col-md-3">
//                   <p className="mt-3">FirstName: {formData.firstName}</p>
//                 </div>
//                 <div className="col-12 col-md-3">
//                   <p className="mt-3">LastName: {formData.lastName}</p>
//                 </div>
//                 <div className="col-12 col-md-3">
//                   <p className="mt-3">Gender: {formData.gender}</p>
//                 </div>
//                 <div className="col-12 col-md-3">
//                   <p className="mt-3">Date of Birth: {formData.dob.toLocaleDateString()}</p>
//                 </div>
//               </div>
//               <div className="row">
//                 <div className="col-12 col-md-3">
//                   <p className="mt-3">Address: {formData.personalDetails.address}</p>
//                 </div>
//                 <div className="col-12 col-md-3">
//                   <p className="mt-3">Marital Status: {formData.maritalStatus}</p>
//                 </div>
//                 <div className="col-12 col-md-3">
//                   <p className="mt-3">Nationality: {formData.nationality}</p>
//                 </div>
//                 <div className="col-12 col-md-3">
//                   <p className="mt-3">Religion: {formData.religion}</p>
//                 </div>
//               </div>
//               <div className="row">
//                 <div className="col-12 col-md-6">
//                   <p className="mt-3">Personal Email ID: {formData.email}</p>
//                 </div>
//                 <div className="col-12 col-md-6">
//                   <p className="mt-3">Contact No.: {formData.personalDetails.mobile}</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </LocalizationProvider>

//     </div>
//     <UserDialog
//       open={openDialog}
//       onClose={handleDialogClose}
//       formData={formData}
//       handleSave={handleSubmit}
//       handleChange={handleChange}
//     />
//   </div>
// </>);
// };

// export default Profile;


import { useState, useEffect } from 'react';
import { Box, Avatar, Typography, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { jwtDecode } from 'jwt-decode';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import UserDialog from '../Dashboard/DialogBox';
import avatr from '../../Assets/pic.jpg';

const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL

const Profile = () => {
  const [openDialog, setDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [mode, setMode] = useState('edit'); // 'edit' or 'add'
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    mobile: '',
    gender: '',
    dob: '',
    maritalStatus: '',
    nationality: '',
    religion: ''
  });

  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
    const initializeUserData = async () => {
      const TokenData = localStorage.getItem("Token");

      if (TokenData) {
        try {
          const decodedToken = jwtDecode(TokenData);
          setFormData({ ...formData, firstName: decodedToken.firstName, lastName: decodedToken.lastName });
        } catch (error) {
          console.error('Invalid token:', error);
        }
      } else if (isAuthenticated && user) {
        setFormData({ ...formData, firstName: user.given_name || '', lastName: user.family_name || '' });
      }
    };

    const getEmployeeDetails = async () => {
      try {
        const TokenData = localStorage.getItem("Token");
        if (TokenData) {
          const decodedToken = jwtDecode(TokenData);
          const { id } = decodedToken;
          const response = await axios.get(`${REACT_APP_BASE_URL}/getSingleEmpRecord/getSingleEmp/${id}`);
          setFormData(response.data.data);
          setSelectedUser(response.data.data);
          console.log(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    initializeUserData();
    getEmployeeDetails();
  }, [isAuthenticated, user]);

  const handleEdit = () => {
    setMode('edit');
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    const TokenData = localStorage.getItem("Token");
    const decodedToken = jwtDecode(TokenData);
    const { id } = decodedToken;
    const updateBody = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      personalDetails: {
        address: formData.address,
        mobile: formData.mobile,
        gender: formData.gender,
        dob: formData.dob,
        maritalStatus: formData.maritalStatus,
        nationality: formData.nationality,
        religion: formData.religion
      }
    };
    try {
      const response = await fetch(`${REACT_APP_BASE_URL}/updateRecords/${id}/updateEmpDetails`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateBody),
      });

      if (!response.ok) {
        throw new Error(`Failed to update user details: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error updating user details:', error);
    }
    handleDialogClose();
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'sticky',
          top: 10,
          zIndex: 1000,
        }}
      >
        <Box sx={{
          width: { xs: 80, md: 153 },
          height: { xs: 80, md: 155 },
          position: 'absolute',
          top: '65px',
          zIndex: 1,
          left: '110px',
          border: '3px solid white',
          borderRadius: '14px'
        }}>
          <img src={avatr} alt="" style={{ width: '100%', height: '150px', borderRadius: '10px', objectFit: 'cover' }} />
        </Box>
        <Box
          sx={{
            width: '100%',
            height: '190px',
            background: 'linear-gradient(to right, #114357, #f29492)',
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Box sx={{
            width: '90%', height: '130px', backgroundColor: 'white',
            boxShadow: 2,
            position: 'absolute', top: '125px', borderRadius: '10px',
            display: 'flex',
          }}>
            <Box sx={{
              width: '60%', height: 'auto',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              paddingLeft: '220px',
              textOverflow: 'clip'
            }}>
              <Typography variant="h5" component="div">
                {formData.firstName+" "+formData.lastName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Associate Software Engineer
              </Typography>
            </Box>
            <Box sx={{ width: '40%', height: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Typography variant="h5" color="text.secondary">
                Motivity Labs
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Motivity Labs
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Motivity Labs
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <div class="container" style={{ marginTop: '80px' }}>
        <div class="row">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <div class="col-12 mb-3">
              <div class="card h-auto">
                <div class="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="card-title fs-4 fw-bold">Personal Details</h5>
                    <IconButton color="primary" onClick={handleEdit}>
                      <EditIcon />
                    </IconButton>
                  </div>
                  <div className="row">
                    <div className="col-12 col-md-3">
                      <p className="mt-3">FirstName: {formData?.firstName ?? 'N/A'}</p>
                    </div>
                    <div className="col-12 col-md-3">
                      <p className="mt-3">LastName: {formData?.lastName ?? 'N/A'}</p>
                    </div>
                    <div className="col-12 col-md-3">
                      <p className="mt-3">Gender: {formData?.personalDetails?.gender ?? 'N/A'}</p>
                    </div>
                    <div className="col-12 col-md-3">
                      <p className="mt-3">Date of Birth: {formData?.personalDetails?.dob ? new Date(formData.personalDetails.dob).toLocaleDateString() : 'N/A'}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-md-3">
                      <p className="mt-3">Address: {formData?.personalDetails?.address ?? 'N/A'}</p>
                    </div>
                    <div className="col-12 col-md-3">
                      <p className="mt-3">Marital Status: {formData?.personalDetails?.maritalStatus ?? 'N/A'}</p>
                    </div>
                    <div className="col-12 col-md-3">
                      <p className="mt-3">Nationality: {formData?.personalDetails?.nationality ?? 'N/A'}</p>
                    </div>
                    <div className="col-12 col-md-3">
                      <p className="mt-3">Religion: {formData?.personalDetails?.religion ?? 'N/A'}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-md-6">
                      <p className="mt-3">Contact No.: {formData?.personalDetails?.mobile ?? 'N/A'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </LocalizationProvider>
        </div>
        <UserDialog
          open={openDialog}
          onClose={handleDialogClose}
          formData={formData}
          mode={mode}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
        />
      </div>
    </>
  );
};

export default Profile;









// const [formData, setFormData] = useState({
//   firstName: '',
//   lastName: '',
//   email: '',
//   address: '',
//   mobile: '',
//   Profile: ''
// });

// const [firstName, setFirstName] = useState('');
// const [lastName, setLastName] = useState('');
// const [id, setId] = useState('');


{/* <div class="col-12 mb-4">
        <div class="card h-auto">
          <div class="card-body">
            <h5 class="card-title">Job Details</h5>
            <div class="row">
              <div class="col-12 col-md-3">
                <p class="mt-3">FirstName:</p>
              </div>
              <div class="col-12 col-md-3">
                <p class="mt-3">LastName:</p>
              </div>
              <div class="col-12 col-md-3">
                <p class="mt-3">Gender:</p>
              </div>
              <div class="col-12 col-md-3">
                <p class="mt-3">Date of Birth:</p>
              </div>
            </div>
            <div class="row">
              <div class="col-12 col-md-3">
                <p class="mt-3">Address:</p>
              </div>
              <div class="col-12 col-md-3">
                <p class="mt-3">Marital Status:</p>
              </div>
              <div class="col-12 col-md-3">
                <p class="mt-3">Nationality:</p>
              </div>
              <div class="col-12 col-md-3">
                <p class="mt-3">Religion:</p>
              </div>
            </div>
            <div class="row">
              <div class="col-12 col-md-6">
                <p class="mt-3">Personal Email ID:</p>
              </div>
              <div class="col-12 col-md-6">
                <p class="mt-3">Contact No.:</p>
              </div>
            </div>
          </div>
        </div>
      </div> */}
{/* <div class="col-12  mb-4">
          <div class="card h-100">
            <div class="card-body">
              <h5 class="card-title">Jane Doe</h5>
              <h6 class="card-subtitle mb-2 text-muted">Product Manager</h6>
              <p class="card-text">
                Jane has a wealth of experience in managing product lifecycles and leading cross-functional teams.
              </p>
              <p class="card-text">
                Jane has a wealth of experience in managing product lifecycles and leading cross-functional teams.
              </p>
              <p class="card-text">
                Jane has a wealth of experience in managing product lifecycles and leading cross-functional teams.
              </p>
              <p class="card-text">
                Jane has a wealth of experience in managing product lifecycles and leading cross-functional teams.
              </p>
            </div>
          </div>
        </div>
        <div class="col-12  mb-4">
          <div class="card h-100">
            <div class="card-body">
              <h5 class="card-title">Jane Doe</h5>
              <h6 class="card-subtitle mb-2 text-muted">Product Manager</h6>
              <p class="card-text">
                Jane has a wealth of experience in managing product lifecycles and leading cross-functional teams.
              </p>
              <p class="card-text">
                Jane has a wealth of experience in managing product lifecycles and leading cross-functional teams.
              </p>
              <p class="card-text">
                Jane has a wealth of experience in managing product lifecycles and leading cross-functional teams.
              </p>
              <p class="card-text">
                Jane has a wealth of experience in managing product lifecycles and leading cross-functional teams.
              </p>
            </div>
          </div>
        </div> */}