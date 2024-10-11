import { useEffect, useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Button from '@mui/material/Button';
import TablePagination from '@mui/material/TablePagination';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import UserDialog from './DialogBox'; // Import your reusable dialog component
import { BrowseGallery } from '@mui/icons-material';
import EmpCardetails from './EmpCardetails';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import { Outlet, useLocation } from 'react-router-dom';

const MyTable = () => {
  const [userData, setUserData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [mode, setMode] = useState('add');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    mobile: '',
    Profile: ''
  });

  const [cardEmp, setCardEmp] = useState(false)
  const [value, setValue] = useState([]);


  useEffect(() => {
    getAllEmpDetails();
  }, []);

  const getAllEmpDetails = async () => {
    await axios.get('http://localhost:3005/getRecords/getAllEmp')
      .then(response => {
        setUserData(response.data.data);
        setValue(response.data.data)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleMenuOpen = (e, user) => {
    setAnchorEl(e.currentTarget);
    setSelectedUser(user);
    localStorage.setItem("editId", user._id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedUser(null);
  };

  const handleDelete = async () => {
    const id = localStorage.getItem("editId");
    await axios.delete(`http://localhost:3005/deleteRecords/${id}/deleteEmpDetails`)
      .then(res => {
        setUserData(prevData => prevData.filter(user => user._id !== id));
        handleMenuClose();
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const handleOpenAddDialog = () => {
    setMode('add');
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      mobile: ''
    });
    setOpenDialog(true);
  };

  const handleOpenEditDialog = () => {
    setMode('edit');
    setFormData({
      firstName: selectedUser.firstName,
      lastName: selectedUser.lastName,
      email: selectedUser.email,
      address: selectedUser.personalDetails?.address || '',  // Ensure to handle undefined personalDetails
      mobile: selectedUser.personalDetails?.mobile || ''
    });
    setOpenDialog(true);
    handleMenuClose();
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  //   const uploadProfile = async () => {
  //     const data = new FormData();
  //     data.append('file', image);
  //     data.append('upload_preset', 'LinkedinDataStore');
  //     data.append('cloud_name', 'dxfr1guyh');

  //     try {
  //         // Upload to Cloudinary
  //         const cloudinaryData = await axiox.post('CLOUDINARY_UPLOAD',data, {
  //             headers: { 'Content-Type': 'multipart/form-data' }
  //         });
  //         const imageUrl = cloudinaryData.url;
  //         console.log('Cloudinary URL:', imageUrl);
  //         // setUrl(imageUrl);

  //         // Perform the backend request
  //         const id = localStorage.getItem('id');

  //         const ImageData = [...gettingBackendData, {
  //             image: imageUrl, // Cloudinary URL 
  //             comments: [],
  //             time: getCurrentTime()
  //         }];

  //         await apiFetch('GET_ONE_SIGNUP', { id }, 'PUT', ImageData, {
  //             headers: { 'Content-Type': 'application/json' }
  //         });

  //         console.log('PostModel Successful');
  //         window.location.reload();
  //     } catch (error) {
  //         console.error('Error uploading image:', error);
  //     }
  // };

  const handleSubmit = async () => {
    if (mode === 'edit') {
      const editId = localStorage.getItem("editId");
      const updateBody = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        personalDetails: {
          address: formData.address,
          mobile: formData.mobile,
        }
      };
      try {
        const response = await fetch(`http://localhost:3005/updateRecords/${editId}/updateEmpDetails`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updateBody),
        });

        if (!response.ok) {
          throw new Error(`Failed to update user details: ${response.status} ${response.statusText}`);
        }
        setOpenDialog(false);
        getAllEmpDetails();
      } catch (error) {
        console.error('Error updating user details:', error);
      }
    } else {
      const addDetails = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        personalDetails: {
          address: formData.address,
          mobile: formData.mobile,
        }
      };
      try {
        const response = await fetch('http://localhost:3005/newRecord/newEmpAccount', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(addDetails),
        });

        if (!response.ok) {
          throw new Error(`Failed to add new record: ${response.status} ${response.statusText}`);
        }
        const newUser = await response.json();
        setUserData(prevData => [...prevData, newUser]);
        setOpenDialog(false);
        getAllEmpDetails();
      } catch (error) {
        console.error('Error adding new user:', error);
      }
    }
  };


  function onSearch(event) {
    let text = event.target.value;
    if (!text) {
      setUserData(value); // Assuming `value` is the initial unfiltered data
    } else {
      let filtered = userData.filter((user) => {
        const fullName = `${user.firstName || ''} ${user.lastName || ''}`.toLowerCase();
        return fullName.includes(text.toLowerCase());
      });
      setUserData(filtered);
    }
    console.log(text);
  }


  const handleSwitchTable = () => {
    setCardEmp(!cardEmp)
  }

  const location = useLocation();

  const isProfileRoute = location.pathname.includes('Profile');


  const sendEmail = async (to, subject, htmlContent,name) => {
    try {
      await axios.post('http://localhost:3005/sendEmail/email', {
        to: to,
        subject: subject,
        html: htmlContent,
        name: name
      });
      console.log('Email sent');
    } catch (error) {
      console.error('Error sending email', error);
    }
  };
  
  // Example usage
  const emailContent = `
    Welcom to the  CRM group
    This is an HTML formatted email
  `;

  const handleBtn =()=>{
    console.log("Button trigered")
    sendEmail('iliyajhushen84@gmail.com', 'Congratulation', emailContent, );
  }

  return (<>
    {!isProfileRoute &&
      <Box sx={{ mt: 3, mx: 5 }}>
        {/* <Box className='card' sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1,backgroundColor:'white',height:'60px',borderRadius:'5px' }}>
       
        <Button variant="outlined" startIcon={<BrowseGallery />} onClick={handleOpenAddDialog}>
          Menu
        </Button>
        <Button variant="outlined" startIcon={<AddIcon />} onClick={handleOpenAddDialog}>
          Add New
        </Button>
      </Box> */}
        {/* <Box
        className='card'
        sx={{
          display: 'flex',
          justifyContent:'space-between',
          alignItems: 'center',
          mb: 1,
          backgroundColor: 'white',
          height: '60px',
          borderRadius: '5px',
          px: 2,
          position: 'sticky',
          top: 66,
          zIndex: 1,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <TextField

            variant="outlined"
            placeholder="Search Employee Name, Designation"
            InputProps={{
              endAdornment: (
                <IconButton>
                  <SearchIcon />
                </IconButton>
              ),
            }}
          />
        </Box>
        <Box sx={{ ml: 'auto', display: 'flex', gap: 2 }}>
          <Button variant="outlined"
            sx={{
              backgroundColor: '#03B7E1',
              borderColor: '#03B7E1',
              color: 'white',
              '&:hover': {
                backgroundColor: '#0299b4',
                borderColor: '#0299b4',
              },
            }}
            onClick={handleSwitchTable}>
            {cardEmp ? "Table" : "EmpCard"}
          </Button>
          <Button variant="outlined"
            sx={{
              backgroundColor: '#03B7E1',
              borderColor: '#03B7E1',
              color: 'white',
              '&:hover': {
                backgroundColor: '#0299b4',
                borderColor: '#0299b4',
              },
            }}
            startIcon={<AddIcon />} onClick={handleOpenAddDialog}>
            Add
          </Button>
        </Box>
      </Box> */}
        {/* <Box
        className='card'
        sx={{
          // display: 'flex',
          // justifyContent: 'space-between !important',
          // alignItems: 'center',
          mb: 1,
          backgroundColor: 'white',
          height: '60px',
          borderRadius: '5px',
          px: 2,
          position: 'sticky',
          top: 66,
          zIndex: 1,
        }}
      > */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mb: 1 }}>
          <TextField
            variant="outlined"
            placeholder="Search Employee Name"
            sx={{ height: '40px', width: '40%' }}
            onChange={onSearch}
            InputProps={{
              style: { height: '40px' }, // Ensure the input height matches the button height
              endAdornment: (
                <IconButton>
                  <SearchIcon />
                </IconButton>
              ),
            }}
          />
          {/* <Button
          variant="outlined"
          sx={{
            height: '40px', // Ensure the button height matches the input height
            backgroundColor: '#03B7E1',
            borderColor: '#03B7E1',
            color: 'white',
            '&:hover': {
              backgroundColor: '#0299b4',
              borderColor: '#0299b4',
            },
          }}
          onClick={handleSwitchTable}
        >
          {cardEmp ? "Table" : "EmpCard"}
        </Button> */}
          <Button
            variant="outlined"
            sx={{
              height: '40px', // Ensure the button height matches the input height
              backgroundColor: '#03B7E1',
              borderColor: '#03B7E1',
              color: 'white',
              '&:hover': {
                backgroundColor: '#0299b4',
                borderColor: '#0299b4',
              },
            }}
            startIcon={<AddIcon />}
            onClick={handleOpenAddDialog}
          >
            Add
          </Button>
        </Box>
        {/* </Box> */}

       <Button onClick={handleBtn}>EMail send</Button>
        {cardEmp ? <EmpCardetails /> :
          <>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>First Name</TableCell>
                    <TableCell>Last Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Address</TableCell>
                    <TableCell>Mobile</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {userData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(user => (
                    <TableRow key={user._id}>
                      <TableCell>{user.firstName}</TableCell>
                      <TableCell>{user.lastName}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.personalDetails?.address}</TableCell>
                      <TableCell>{user.personalDetails?.mobile}</TableCell>
                      <TableCell>
                        <IconButton onClick={(e) => handleMenuOpen(e, user)}>
                          <MoreVertIcon />
                        </IconButton>
                        <Menu
                          anchorEl={anchorEl}
                          open={Boolean(anchorEl)}
                          onClose={handleMenuClose}
                        >
                          <MenuItem onClick={handleOpenEditDialog}>
                            <EditIcon sx={{ mr: 1 }} />
                            Edit
                          </MenuItem>
                          <MenuItem onClick={() => handleDelete(user._id)}>
                            <DeleteIcon sx={{ mr: 1 }} />
                            Delete
                          </MenuItem>
                        </Menu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={userData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />

            <UserDialog
              open={openDialog}
              onClose={handleCloseDialog}
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              mode={mode}
            />
          </>}
      </Box>
    }
    <Outlet />
  </>
  );
};

export default MyTable;

