import React from 'react';
import { useState } from 'react'
// import './index.css'
import office from '../Assets/office.jpg'
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import google from '../Assets/google.png'
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router';
import axios from 'axios';

const Index = () => {
    // const navigate = useNavigate();
    // const { loginWithRedirect, user, isAuthenticated } = useAuth0();
    // if (isAuthenticated) {
    //     console.log(user)
    //     navigate("/Landing");
    // }
    // const [showPassword, setShowPassword] = React.useState(false);
    // const [username, setUserName] = useState();
    // const [userpassword, setUserPassword] = useState();
    // // const [error, setError] = useState(false)
    // // const [errorpassword, setErrorPassword] = useState(false)
    // const [email, setEmail] = useState('');
    // const [firstName, setFirstName] = useState('');
    // const [lastName, setLastName] = useState('');
    // const [error, setError] = useState('');
    // const [errorPassword, setErrorPassword] = useState('');
    // const [isSignUp, setIsSignUp] = useState(false);

    // const ergx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    // const prgx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

    // const handleClickShowPassword = () => setShowPassword((show) => !show);
    // const handleMouseDownPassword = (event) => {
    //     event.preventDefault();
    // };

    // const handleUserName = (e) => {
    //     let username = e.target.value;
    //     if (!username) {
    //         setError(false);
    //     }
    //     else if (!username.match(ergx)) {
    //         setError(true);
    //     }
    //     else {
    //         setError(false);
    //     }
    //     setUserName(username)
    // }

    // const handleUserPassword = (e) => {
    //     let userpassword = e.target.value;
    //     console.log(userpassword)
    //     if (!userpassword) {
    //         setErrorPassword(false);
    //     }
    //     else if (!userpassword.match(prgx)) {
    //         setErrorPassword(true);
    //     }
    //     else {
    //         setErrorPassword(false);
    //     }
    //     setUserPassword(userpassword)
    // }


    // const submitData = (e) => {
    //     e.preventDefault();

    //     if (!username || error || !userpassword || errorpassword) {
    //         setError(!username);
    //         setErrorPassword(!userpassword);
    //         return;
    //     }
    //     setError(false);
    //     setErrorPassword(false)
    //     console.log("Succesfully")
    //     navigate("/Landing");
    // };

    // const handleSignUpToggle = () => {
    //     setIsSignUp(!isSignUp);
    // };


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

    const ergx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const prgx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    // const handleUserName = (e) => setUserName(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);
    const handleEmail = (e) => setEmail(e.target.value);
    const handleFirstName = (e) => setFirstName(e.target.value);
    const handleLastName = (e) => setLastName(e.target.value);

    const handleSignUpToggle = () => {
        setError('');
        setErrorPassword('');
        setUserName('');
        setPassword('');
        setEmail('');
        setFirstName('');
        setLastName('');
        setIsSignUp(!isSignUp);
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
                const response = await axios.post('http://localhost:3005/singUp/createAccount', {
                    firstName,
                    lastName,
                    email,
                    password,
                });
                handleSignUpToggle();
                console.log('Sign Up Success:', response.data);
            } else {
                const response = await axios.post('http://localhost:3005/singIn/login', {
                    email,
                    password,
                });
                console.log('Login Success:', response.data);
                localStorage.setItem("Token", response.data.token)
                navigate('/Landing/Dashboard');
            }
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
        }
    };





    return (
        <>
            <div>
                <div className='Conatiner'>
                    <div className="box">
                        <div className='image'>
                            <div className='image2'>
                                <img style={{
                                    width: "100%",
                                    height: "100%",
                                    borderTopLeftRadius: "60px",
                                    borderBottomLeftRadius: "60px",
                                }} src={office} alt="Office" />
                            </div>
                            <div className='title'>
                                <h1 style={{ color: '#F1F1F1', fontSize: '64px' }}>Welc<span style={{ color: 'black' }}>ome</span></h1>
                                <p className='content text-center'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus officia eius sint aspernatur excepturi nemo voluptatem, quidem repellendus vel. Enim nostrum aut aliquam excepturi. Iusto alias facilis perferendis impedit quisquam?</p>
                            </div>
                        </div>

                        {/* <div className='formDetails'>
                            <h1 style={{ textAlign: 'center', color: '#877E73' }}>Login</h1>
                            <Box
                                component="form"
                                sx={{ width: '70%', margin: 'auto', marginTop: '25px' }}
                                noValidate
                                onSubmit={submitData}
                                autoComplete="off"
                            >
                                <Box>
                                    <TextField
                                        sx={{ width: '100%' }}
                                        id="standard-basic" label="UserName" variant="standard"
                                        onChange={handleUserName}
                                    />
                                    {error ? <span style={{ color: 'red' }}>Please enter an email address</span> : ""}
                                </Box>
                                <Box>
                                    <FormControl variant="standard" sx={{ width: '100%', mt: 4 }}>
                                        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                                        <Input
                                            id="standard-adornment-password"
                                            type={showPassword ? 'text' : 'password'}
                                            onChange={handleUserPassword}
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
                                    {errorpassword ? <span style={{ color: 'red' }}>One uppercase letter, one digit and one special character</span> : ""}
                                    <h6 style={{ marginTop: '10px' }}>Forget Password?</h6>
                                </Box>

                                <Button type='submit' sx={{ width: '100%', marginTop: 3, borderRadius: 100, backgroundColor: 'black !important' }} variant="contained">
                                    Login
                                </Button>
                                <h6 className='text-center' style={{ marginTop: '15px', fontSize: 'small' }}>By clicking Agree & Join, you agree to the LinkedIn <span className='text-primary fw-bold'> User Agreement, Privacy Policy,</span> and <span className='text-primary fw-bold'>Cookie Policy.</span> </h6>
                                <Button onClick={() => loginWithRedirect()} sx={{ width: '100%', borderRadius: 100, mt: 3 }} variant="outlined"><img className='googleImg' src={google} alt="" />Continue with Google</Button>
                                <Box>
                                    <Button>create new account?</Button>
                                </Box>
                            </Box>
                        </div> */}
                        {/* <div className="formDetails">
                            <h1 style={{ textAlign: 'center', color: '#877E73' }}>{isSignUp ? 'Sign Up' : 'Login'}</h1>
                            <Box
                                component="form"
                                sx={{ width: '70%', margin: 'auto', marginTop: '25px' }}
                                noValidate
                                onSubmit={submitData}
                                autoComplete="off"
                            >
                                <Box>
                                    <TextField
                                        sx={{ width: '100%' }}
                                        id="standard-basic"
                                        label="UserName"
                                        variant="standard"
                                        onChange={handleUserName}
                                    />
                                    {error ? <span style={{ color: 'red' }}>Please enter an email address</span> : ''}
                                </Box>
                                <Box>
                                    <FormControl variant="standard" sx={{ width: '100%', mt: 4 }}>
                                        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                                        <Input
                                            id="standard-adornment-password"
                                            type={showPassword ? 'text' : 'password'}
                                            onChange={handleUserPassword}
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
                                    {errorpassword ? (
                                        <span style={{ color: 'red' }}>One uppercase letter, one digit and one special character</span>
                                    ) : (
                                        ''
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
                                <Button
                                    onClick={() => loginWithRedirect()}
                                    sx={{ width: '100%', borderRadius: 100, mt: 3 }}
                                    variant="outlined"
                                >
                                    <img className="googleImg" src={google} alt="" />
                                    Continue with Google
                                </Button>
                                <Box>
                                    <Button onClick={handleSignUpToggle}>
                                        {isSignUp ? 'Already have an account? Login' : 'Create new account?'}
                                    </Button>
                                </Box>
                            </Box>
                        </div> */}
                        <div className="formDetails">
                            <h1 style={{ textAlign: 'center', color: '#877E73' }}>{isSignUp ? 'Sign Up' : 'Login'}</h1>
                            <Box
                                component="form"
                                sx={{ width: '70%', margin: 'auto', marginTop: '25px' }}
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
                                        // onClick={() => loginWithRedirect()}
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
                    </div>
                </div>
            </div>
        </>
    )
}

export default Index
