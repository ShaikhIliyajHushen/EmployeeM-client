import { useState, useEffect } from 'react'
import './index.css'
// import office from '../Assets/office.jpg'
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import google from '../Assets/google.png'
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router';
import axios from 'axios';
import { Button, Box } from '@mui/material';
// import crowd from './crowd.png';
import Logo from '../Assets/logo.png';
import Fb from '../Assets/facebook.png';
import Insta from '../Assets/instagram.png';
import Linkd from '../Assets/linkedin.png'
import leader from './leader.png'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';

const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL

function Index() {


    const navigate = useNavigate();
    const { loginWithRedirect, user, isAuthenticated } = useAuth0();
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    const [getStart, setGetStart] = useState(true)
    const [newPassword, setNewPassword] = useState('');
    const [triggerPostDetails, setTriggerPostDetails] = useState(false);
    const [showPasswordInput, setShowPasswordInput] = useState(false);
    const [emailDisplay, setEmailDisplay] = useState(true);
    const [resetPassword, setResetPassword] = useState(false);

    const ergx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const prgx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    if (isAuthenticated) {
        console.log(user)
        navigate("/Landing/Dashboard");
    }
    const handleGoogleLogin = async () => {
        try {
            await loginWithRedirect();
            // if (isAuthenticated) {
            //     console.log(user)
            //     navigate("/Landing/Dashboard");
            // }

            if (!isAuthenticated || !user) {
                throw new Error("User is not authenticated.");
            }
            const userData = {
                email: user.email,
                name: user.name,
                picture: user.picture,
            };
            if (!userData.email || !userData.name || !userData.picture) {
                throw new Error("User data is incomplete.");
            }
            const response = await axios.post(`${REACT_APP_BASE_URL}/AuthLogin/googleAuth`, userData);
            // console.log(response.data)
            navigate("/Landing/Dashboard");
        } catch (error) {
            console.error('Error during login', error.response ? error.response.data : error.message);
        }
    };



    // const handleUserName = (e) => setUserName(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);
    const handleEmail = (e) => setEmail(e.target.value);
    const handleFirstName = (e) => setFirstName(e.target.value);
    const handleLastName = (e) => setLastName(e.target.value);
    const handleNewPassword = (event) => setNewPassword(event.target.value);

    const handleSignUpToggle = () => {
        setIsSignUp(!isSignUp);
        setError('');
        setErrorPassword('');
        setUserName('');
        setPassword('');
        setEmail('');
        setFirstName('');
        setLastName('');
        setShowPasswordInput(false); // Reset password input visibility
        setEmailDisplay(true);
        setResetPassword(false) // 
    };

    const submitData = async (e) => {
        e.preventDefault();
        setError('');
        setErrorPassword('');

        if (!email.match(ergx)) {
            setError('Please enter a valid email address');
            return;
        }
        if (!password.match(prgx)) {
            setErrorPassword('Password must have one uppercase letter, one digit, and one special character');
            return;
        }

        try {
            if (isSignUp) {
                console.log(firstName, lastName, email, password,)
                const response = await axios.post(`${REACT_APP_BASE_URL}/singUp/createAccount`, {
                    firstName,
                    lastName,
                    email,
                    password,
                });
                handleSignUpToggle();
                console.log('Sign Up Success:', response.data);
            } else {
                const response = await axios.post(`${REACT_APP_BASE_URL}/singIn/login`, {
                    email,
                    password,
                });
                console.log('Login Success:', response.data);
                // localStorage.setItem("Token", response.data.token)
                // navigate('/Landing/Dashboard');
                if (response.data.message === 'Please set your password and try again') {
                    console.log("setResetPassword triggered")
                    setResetPassword(true);
                } else if (response.data.message === 'Incorrect password') {
                    setErrorPassword('Give password');
                } else {
                    localStorage.setItem("Token", response.data.token);
                    navigate('/Landing/Dashboard');
                }
            }
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
            if (error.response && error.response.status === 400) {
                setError('Invalid credentials. Please check your email and password.');
            } else {
                setError('An error occurred. Please try again later.');
            }
        }
    };


    const handleToggle = () => {
        setGetStart(!getStart)
    }



    const updatePassword = async () => {
        if (!email.match(ergx)) {
            setError('Please enter a valid email address');
            return;
        }

        try {
            const response = await axios.post(`${REACT_APP_BASE_URL}/AuthEmail/googleAuthEmail`, {
                email,
            });

            if (response.data.message === 'Please set your password and try again') {
                setResetPassword(true)
                setEmailDisplay(false)
                setShowPasswordInput(false);
                return;
            }
            setEmailDisplay(false);
            setShowPasswordInput(true);
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
            if (error.response && error.response.status === 400) {
                setError('Invalid credentials. Please check your email and password.');
            } else {
                setError('An error occurred. Please try again later.');
            }
        }

    };
    console.log("process.env.REACT_APP_BASE_URL",process.env.REACT_APP_BASE_URL)

    const setPasswordAuth = async () => {
        if (!newPassword.match(prgx)) {
            setErrorPassword('Password must have one uppercase letter, one digit, and one special character');
            return;
        }
        try {
            const response = await axios.post(`${REACT_APP_BASE_URL}/setAuthPassword/setPassword`, {
                email,
                newPassword,
            });
            console.log('Password Set Success:', response.data);
            setEmailDisplay(true);
            setResetPassword(false)
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
            if (error.response && error.response.status === 400) {
                setError('Invalid credentials. Please check your email and password.');
            } else {
                setError('An error occurred. Please try again later.');
            }
        }
    }


    return (
        <Box sx={{
            position: 'relative',
            backgroundColor: 'white',
        }}>
            <Box sx={{
                position: 'absolute',
                width: '100%',
                top: 5,
                p: 2,
                color: 'white',
                display: 'flex',
                justifyContent: 'space-between',

            }}>
                {/* <Box sx={{ marginLeft: '30px', display: 'flex', alignItems: 'center' }}>
                    <img src={Logo} style={{ width: '40px', height: '40px' }} alt="" />
                    <span style={{ fontSize: '20px', marginLeft: '5px' }}>arwin Box</span>
                </Box> */}
                <Box sx={{ marginLeft: '30px', display: 'flex', alignItems: 'center' }}>
                    <Link to="/" onClick={handleToggle} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
                        <img src={Logo} style={{ width: '40px', height: '40px' }} alt="" />
                        <span style={{ fontSize: '20px', marginLeft: '5px' }}>arwin Box</span>
                    </Link>
                </Box>

                <Box>
                    <Button
                        // variant="contained"
                        color="primary"
                        sx={{
                            right: 35,
                            color: 'white'
                        }}
                        onClick={handleToggle}
                    >
                        Login
                    </Button>
                </Box>

            </Box>

            {/* <Box sx={{
                background: 'linear-gradient(to right, #114357, #f29492)', // Gradient background
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                p: 3
            }}>



                {getStart ? <>
                <Box sx={{marginTop:'10px',display:'flex'}}>

               
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', p: 5, width: '50%', marginLeft: '20px' }}>
                        <Box>
                            <h1 style={{ color: 'white', fontSize: '60px', fontWeight: 'bold' }}>Human Resource</h1>
                            <span style={{ color: 'gray' }}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus officia eius sint aspernatur excepturi nemo voluptatem, quidem repellendus vel. Enim nostrum aut aliquam excepturi. Iusto alias facilis perferendis impedit quisquam? </span>
                        </Box>
                        <Box sx={{ marginTop: '30px' }}>
                            <img src={Fb} alt="Facebook" style={{ width: '30px', height: '30px' }} />
                            <img src={Insta} alt="Instagram" style={{ width: '30px', height: '30px', marginLeft: '10px' }} />
                            <img src={Linkd} alt="Linkedin" style={{ width: '30px', height: '30px', marginLeft: '10px' }} />
                        </Box>
                        <Box>
                            <Button
                                variant="contained"
                                color="success"
                                sx={{
                                    marginTop: '100px',
                                    color: 'white',
                                }}
                            >
                                <span>Get Started</span>
                            </Button>
                        </Box>
                    </Box>

                    <Box>
                        <img src={leader} alt="" style={{
                            width: '90%',
                            height: '90%',
                            // marginTop: '60px',
                        }} />
                    </Box>
                    </Box>
                </> :
                    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', alignItems: 'center',marginTop:'70px' }}>
                        <div className="formDetails">
                            <h1 style={{ textAlign: 'center', color: '#877E73', marginTop: '20px' }}>{isSignUp ? 'Sign Up' : 'Login'}</h1>
                            <Box
                                component="form"
                                sx={{ width: '70%', margin: 'auto', marginTop: '10px' }}
                                noValidate
                                onSubmit={submitData}
                                autoComplete="off"
                            >
                                {isSignUp && (
                                    <>
                                        <Box>
                                            <TextField
                                                sx={{ width: '100%', }}
                                                id="first-name"
                                                label="First Name"
                                                variant="standard"
                                                onChange={handleFirstName}
                                            />
                                        </Box>
                                        <Box>
                                            <TextField
                                                sx={{ width: '100%', mt: 2 }}
                                                id="last-name"
                                                label="Last Name"
                                                variant="standard"
                                                onChange={handleLastName}
                                            />
                                        </Box>
                                    </>
                                )}
                                <Box>
                                    <TextField
                                        sx={{ width: '100%', mt: 2 }}
                                        id="email"
                                        label="Email"
                                        variant="standard"
                                        onChange={handleEmail}
                                    />
                                    {error && <span style={{ color: 'red' }}>{error}</span>}
                                </Box>
                                <Box>
                                    <FormControl variant="standard" sx={{ width: '100%', mt: 2 }}>
                                        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                                        <Input
                                            id="standard-adornment-password"
                                            type={showPassword ? 'text' : 'password'}
                                            onChange={handlePassword}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                    >
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                    </FormControl>
                                    {errorPassword && (
                                        <span style={{ color: 'red' }}>{errorPassword}</span>
                                    )}
                                    {!isSignUp && <h6 style={{ marginTop: '10px' }}>Forget Password?</h6>}
                                </Box>

                                <Button
                                    type="submit"
                                    sx={{ width: '100%', marginTop: 3, borderRadius: 100, backgroundColor: 'black !important' }}
                                    variant="contained"
                                >
                                    {isSignUp ? 'Sign Up' : 'Login'}
                                </Button>
                                <h6 className="text-center" style={{ marginTop: '15px', fontSize: 'small' }}>
                                    By clicking {isSignUp ? 'Sign Up' : 'Agree & Join'}, you agree to the LinkedIn{' '}
                                    <span className="text-primary fw-bold"> User Agreement, Privacy Policy,</span> and{' '}
                                    <span className="text-primary fw-bold">Cookie Policy.</span>{' '}
                                </h6>
                                {isSignUp ? '' :
                                    <Button
                                        onClick={() => loginWithRedirect()}
                                        sx={{ width: '100%', borderRadius: 100, mt: 3 }}
                                        variant="outlined"
                                    >
                                        <img className="googleImg" src={google} alt="" />
                                        Continue with Google
                                    </Button>
                                }
                                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                                    <Button onClick={handleSignUpToggle}>
                                        {isSignUp ? 'Already have an account? Login' : 'Create new account?'}
                                    </Button>
                                </Box>
                            </Box>
                        </div>
                    </Box>
                }
               
            </Box> */}


            <Box sx={{
                background: 'linear-gradient(to right, #114357, #f29492)', // Gradient background
                width: '100%',
                height: '700px',
                display: 'flex',
                justifyContent: 'space-between',
                p: 3
            }}>
                <>
                    {getStart ? (
                        <Box sx={{ marginTop: '10px', display: 'flex',justifyContent:'space-between' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', p: 2, width: '60%', marginLeft: '20px' }}>
                                <Box>
                                    <h1 style={{ color: 'white', fontSize: '95px', fontWeight: 'bold' }}>Human Resource</h1>
                                    <span style={{ color: 'gray' }}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus officia eius sint aspernatur excepturi nemo voluptatem, quidem repellendus vel. Enim nostrum aut aliquam excepturi. Iusto alias facilis perferendis impedit quisquam? </span>
                                </Box>
                                <Box sx={{ marginTop: '30px' }}>
                                    <img src={Fb} alt="Facebook" style={{ width: '30px', height: '30px' }} />
                                    <img src={Insta} alt="Instagram" style={{ width: '30px', height: '30px', marginLeft: '10px' }} />
                                    <img src={Linkd} alt="Linkedin" style={{ width: '30px', height: '30px', marginLeft: '10px' }} />
                                </Box>
                                <Box>
                                    <Button
                                        variant="contained"
                                        color="success"
                                        sx={{
                                            marginTop: '100px',
                                            color: 'white',
                                        }}
                                    >
                                        <span>Get Started</span>
                                    </Button>
                                </Box>
                            </Box>
                            <Box sx={{width:'50%',display:'flex',alignItems:'center'}}>
                                <img src={leader} alt="" style={{
                                    width: '100%',
                                    height: 'auto',
                                    // marginTop: '60px',
                                }} />
                            </Box>
                        </Box>
                    ) : (
                        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', alignItems: 'center', marginTop: '70px' }}>
                            <div className="formDetails">

                                {(showPasswordInput || resetPassword) ? (
                                    <IconButton onClick={() => {
                                        setShowPasswordInput(false);
                                        setResetPassword(false);
                                        setEmailDisplay(true);
                                    }} sx={{ position: 'absolute', left: '550px', top: '110px', zIndex: 1000 }}>
                                        <ArrowBackIcon />
                                    </IconButton>
                                ) : null}

                                <h1 style={{ textAlign: 'center', color: '#877E73', marginTop: '30px' }}>
                                    {isSignUp ? 'Sign Up' : 'Login'}</h1>
                                <Box
                                    component="form"
                                    sx={{ width: '70%', margin: 'auto', marginTop: '10px' }}
                                    noValidate
                                    onSubmit={submitData}
                                    autoComplete="off"
                                >
                                    {isSignUp && (
                                        <>
                                            <Box>
                                                <TextField
                                                    sx={{ width: '100%', }}
                                                    id="first-name"
                                                    label="First Name"
                                                    variant="standard"
                                                    onChange={handleFirstName}
                                                />
                                            </Box>
                                            <Box>
                                                <TextField
                                                    sx={{ width: '100%', mt: 2 }}
                                                    id="last-name"
                                                    label="Last Name"
                                                    variant="standard"
                                                    onChange={handleLastName}
                                                />
                                            </Box>
                                        </>
                                    )}
                                    {emailDisplay && !showPasswordInput && (
                                        <Box>
                                            <TextField
                                                sx={{ width: '100%', mt: 2 }}
                                                id="email"
                                                label="Email"
                                                variant="standard"
                                                value={email}
                                                onChange={handleEmail}
                                            />
                                            {error && <span style={{ color: 'red' }}>{error}</span>}
                                            {isSignUp ? '' :
                                                <Button
                                                    onClick={updatePassword}
                                                    type="button"
                                                    sx={{ width: '100%', marginTop: 3, borderRadius: 100, backgroundColor: 'black !important' }}
                                                    variant="contained"
                                                >
                                                    Next
                                                </Button>
                                            }
                                        </Box>
                                    )}


                                    {resetPassword ?

                                        <Box>
                                            <TextField
                                                sx={{ width: '100%', mt: 2 }}
                                                id="Set Password"
                                                label="Set Password"
                                                variant="standard"
                                                value={newPassword}
                                                onChange={handleNewPassword}
                                            />
                                            {errorPassword && (
                                                <span style={{ color: 'red' }}>{errorPassword}</span>
                                            )}

                                            <Button
                                                onClick={setPasswordAuth}
                                                type="button"
                                                sx={{ width: '100%', marginTop: 3, borderRadius: 100, backgroundColor: 'black !important' }}
                                                variant="contained"
                                            >
                                                Set Password
                                            </Button>

                                        </Box> : ''}


                                    {showPasswordInput && !isSignUp && !emailDisplay && (
                                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                            <FormControl variant="standard" sx={{ width: '100%', mt: 2 }}>
                                                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                                                <Input
                                                    id="standard-adornment-password"
                                                    type={showPassword ? 'text' : 'password'}
                                                    value={password}
                                                    onChange={handlePassword}
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                aria-label="toggle password visibility"
                                                                onClick={handleClickShowPassword}
                                                                onMouseDown={handleMouseDownPassword}
                                                            >
                                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    }
                                                />
                                            </FormControl>
                                            {errorPassword && (
                                                <span style={{ color: 'red' }}>{errorPassword}</span>
                                            )}
                                            {!isSignUp && <h6 style={{ marginTop: '10px' }}>Forget Password?</h6>}
                                            <Button
                                                type="submit"
                                                sx={{ width: '100%', marginTop: 3, borderRadius: 100, backgroundColor: 'black !important' }}
                                                variant="contained"
                                            >
                                                Login
                                            </Button>
                                        </Box>
                                    )}

                                    {isSignUp && !showPasswordInput && (
                                        <Box>
                                            <FormControl variant="standard" sx={{ width: '100%', mt: 2 }}>
                                                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                                                <Input
                                                    id="standard-adornment-password"
                                                    type={showPassword ? 'text' : 'password'}
                                                    value={password}
                                                    onChange={handlePassword}
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                aria-label="toggle password visibility"
                                                                onClick={handleClickShowPassword}
                                                                onMouseDown={handleMouseDownPassword}
                                                            >
                                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    }
                                                />
                                            </FormControl>
                                            {errorPassword && (
                                                <span style={{ color: 'red' }}>{errorPassword}</span>
                                            )}
                                            {!isSignUp && <h6 style={{ marginTop: '10px' }}>Forget Password?</h6>}
                                            <Button
                                                type="submit"
                                                sx={{ width: '100%', marginTop: 3, borderRadius: 100, backgroundColor: 'black !important' }}
                                                variant="contained"
                                            >
                                                Sign Up
                                            </Button>
                                        </Box>
                                    )}

                                    <h6 className="text-center" style={{ marginTop: '15px', fontSize: 'small' }}>
                                        By clicking {isSignUp ? 'Sign Up' : 'Agree & Join'}, you agree to the LinkedIn{' '}
                                        <span className="text-primary fw-bold"> User Agreement, Privacy Policy,</span> and{' '}
                                        <span className="text-primary fw-bold">Cookie Policy.</span>{' '}
                                    </h6>
                                    {isSignUp ? '' :
                                        <Button
                                            // onClick={() => loginWithRedirect()}
                                            onClick={handleGoogleLogin}
                                            sx={{ width: '100%', borderRadius: 100, mt: 3 }}
                                            variant="outlined"
                                        >
                                            <img className="googleImg" src={google} alt="" />
                                            Continue with Google
                                        </Button>
                                    }
                                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                                        <Button onClick={handleSignUpToggle}>
                                            {isSignUp ? 'Already have an account? Login' : 'Create new account?'}
                                        </Button>
                                    </Box>
                                </Box>
                            </div>
                        </Box>
                    )}
                </>
            </Box>


            <Box sx={{
                backgroundColor: 'gray',
                width: '100%',
                height: '30%',
                display: 'flex',
                p: 5,
                justifyContent: 'space-around',

            }}>
                <Box sx={{ color: 'white' }}>
                    <ul className='custom-list' >
                        <li>Employee Records</li>
                        <li>Add Employee</li>
                        <li>View Employee</li>
                        <li>Manage Employee</li>
                        <li>Attendance</li>
                        <li>Payroll</li>
                    </ul>
                </Box>
                <Box sx={{ color: 'white' }}>
                    <ul className='custom-list'>
                        <li>Performance Reviews</li>
                        <li>Departments</li>
                        <li>Employee Benefits</li>
                        <li>Training Programs</li>
                        <li>HR Policies</li>
                        <li>Reports</li>
                    </ul>
                </Box>
                <Box sx={{ color: 'white' }}>
                    <ul className='custom-list'>
                        <li>Employee Directory</li>
                        <li>Job Openings</li>
                        <li>Onboarding</li>
                        <li>Offboarding</li>
                        <li>Time Tracking</li>
                        <li>Work Schedules</li>
                    </ul>
                </Box>
                <Box sx={{ color: 'white' }}>
                    <ul className='custom-list'>
                        <li>Leave Management</li>
                        <li>Compliance</li>
                        <li>Employee Self-Service</li>
                        <li>Document Management</li>
                        <li>Analytics</li>
                        <li>Support</li>
                    </ul>
                </Box>
            </Box>
        </Box >

    );
}

export default Index;
