import React from 'react';
import { useState} from 'react'
import './index.css'
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

const Index = () => {
    const navigate = useNavigate();
    const { loginWithRedirect, user, isAuthenticated } = useAuth0();
    if (isAuthenticated) {
        console.log(user)
        navigate("/Layout");
    }
    const [showPassword, setShowPassword] = React.useState(false);
    const [username, setUserName] = useState();
    const [userpassword, setUserPassword] = useState();
    const [error, setError] = useState(false)
    const [errorpassword, setErrorPassword] = useState(false)

    const ergx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    const prgx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleUserName = (e) => {
        let username = e.target.value;
        if (!username) {
            setError(false);
        }
        else if (!username.match(ergx)) {
            setError(true);
        }
        else {
            setError(false);
        }
        setUserName(username)
    }

    const handleUserPassword = (e) => {
        let userpassword = e.target.value;
        console.log(userpassword)
        if (!userpassword) {
            setErrorPassword(false);
        }
        else if (!userpassword.match(prgx)) {
            setErrorPassword(true);
        }
        else {
            setErrorPassword(false);
        }
        setUserPassword(userpassword)
    }


    const submitData = (e) => {
        e.preventDefault();

        if (!username || error || !userpassword || errorpassword) {
            setError(!username);
            setErrorPassword(!userpassword);
            return;
        }
        setError(false);
        setErrorPassword(false)
        console.log("Succesfully")
            navigate("/Layout");
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
                                <h1 style={{color:'#F1F1F1',fontSize: '64px'}}>Welc<span style={{ color: 'black' }}>ome</span></h1>
                                <p className='content text-center'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus officia eius sint aspernatur excepturi nemo voluptatem, quidem repellendus vel. Enim nostrum aut aliquam excepturi. Iusto alias facilis perferendis impedit quisquam?</p>
                            </div>
                        </div>

                        <div className='formDetails'>
                            <h1 style={{ textAlign: 'center', color: '#877E73' }}>Login</h1>
                            <Box
                                component="form"
                                sx={{ width: '70%', margin: 'auto',marginTop:'25px' }}
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
                                    <h6 style={{marginTop:'10px'}}>Forget Password?</h6>
                                </Box>

                                <Button type='submit' sx={{ width: '100%', marginTop: 3, borderRadius: 100, backgroundColor: 'black !important' }} variant="contained">
                                    Login
                                </Button>
                                <h6 className='text-center' style={{marginTop:'15px',fontSize:'small'}}>By clicking Agree & Join, you agree to the LinkedIn <span className='text-primary fw-bold'> User Agreement, Privacy Policy,</span> and <span className='text-primary fw-bold'>Cookie Policy.</span> </h6>
                                <Button onClick={() => loginWithRedirect()} sx={{ width: '100%', borderRadius: 100,mt:3 }} variant="outlined"><img className='googleImg' src={google} alt="" />Continue with Google</Button>
                            </Box>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Index
