import React from 'react'
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBCol,
    MDBIcon,
    MDBInput
}
    from 'mdb-react-ui-kit';
import './App.css'
import { Routes, Route, useNavigate } from 'react-router-dom';

import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import { useAuth0 } from '@auth0/auth0-react';

function Login() {
    const { loginWithRedirect, isAuthenticated, logout, user } = useAuth0();
    const navigate = useNavigate();

    function handleLogin() {
        var email = document.getElementById('formControlLgEmail').value;
        var password = document.getElementById('formControlLgPass').value;

        console.log(email, password);

        if (email != "" && password != "") {
            navigate('/admin');
        }
    }

    return (
        <div style={{ backgroundColor: "#9A616D", overflow: "hidden" }}>
            < MDBContainer className='my-4'>

                <MDBCard>
                    <MDBRow className='g-0'>

                        <MDBCol md='7'>
                            <MDBCardImage src='https://www.shutterstock.com/shutterstock/photos/1445048480/display_1500/stock-vector-book-your-flight-online-booking-concept-happy-young-woman-book-one-plane-tickets-trendy-flat-1445048480.jpg' alt="login form" className='rounded-start' style={{ width: "95%" }} />
                        </MDBCol>

                        <MDBCol md='5'>
                            <MDBCardBody className='d-flex flex-column'>
                                <div className='d-flex flex-row mt-2'>
                                    <AirplaneTicketIcon style={{ height: "40px", width: "40px", color: "rgb(154,97,109)" }} />
                                    <span className="h1 fw-700 mb-0 fs-2">Where dreams take flight</span>
                                </div>

                                <h5 className="fw-normal my-4 pb-3" style={{ letterSpacing: '1px' }}>Sign into your account</h5>
                                <div className='user-choice'>
                                    <h3 className='admin-login'>Admin</h3>
                                    <span className='separate-roles'>|</span>
                                    <div className='user-auth' onClick={() => loginWithRedirect()}>
                                        <h3 className='user-login'>User</h3>
                                    </div>
                                </div>
                                <div style={{ display: "flex", flex: 1, flexDirection: 'column' }}>

                                    <MDBInput wrapperClass='mb-4' label='Email address' id='formControlLgEmail' type='email' size="lg" />
                                    <MDBInput wrapperClass='mb-4' label='Password' id='formControlLgPass' type='password' size="lg" />

                                    <MDBBtn className="mb-4 px-5" color='dark' size='lg' onClick={() => handleLogin()}>Login</MDBBtn>
                                    {/* <a className="small text-muted" href="#!">Forgot password?</a>
                                <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>Don't have an account? <a href="#!" style={{ color: '#393f81' }}>Register here</a></p> */}

                                    <div className='d-flex flex-row justify-content-start'>
                                        <a href="#!" className="small text-muted me-1">Terms of use.</a>
                                        <a href="#!" className="small text-muted">Privacy policy</a>
                                    </div>
                                </div>
                            </MDBCardBody>
                        </MDBCol>
                    </MDBRow>
                </MDBCard>
            </MDBContainer >
        </div >
    )
}

export default Login