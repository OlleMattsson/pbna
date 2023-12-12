import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

import {
    Avatar,
    Button,
    Card,
    CardActions,
    CircularProgress,
    Link
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import {
    Form,
    required,
    TextInput,
    useTranslate,
    useLogin,
    useNotify,
    PasswordInput,
    useRedirect
} from 'react-admin';

import Box from '@mui/material/Box';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import {getBackground} from './Login'


const CreateProfile = () =>  {
    const [loading, setLoading] = useState(false);
    const translate = useTranslate();
    const redirect = useRedirect();



    const queryParams = new URLSearchParams(useLocation().search)
    const email = queryParams.get("email")
    const invitationToken = queryParams.get("invitationToken")


    const handleSubmit = (form: FormValues) => {

        const {password} = form
        
        fetch('http://localhost:8181/createprofile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
                invitationToken
            }),
        })
        .then(response => response.json()) // Parsing the JSON response
        .then(data => {
            console.log(data)
            if (data.message === "password set") {
                redirect(`/signin`);
            }

        })   // Handling the data from the response
        .catch(error => console.error('Error:', error)); // Handling errors
    };

    const equalToPassword = (value, allValues) => {
        if (value !== allValues.password) {
            return 'The two passwords must match';
        }
    }

    if (!invitationToken || !email) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    background: getBackground(new Date()),
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center'
                }}
            >
                <Card sx={{ minWidth: 300, marginTop: '6em' }}>
                    <Box
                        sx={{
                            margin: '1em',
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <Avatar sx={{ bgcolor: 'secondary.main' }}>
                            <PersonAddIcon />
                        </Avatar>
                    </Box>
                    <Box
                        sx={{
                            marginTop: '1em',
                            display: 'flex',
                            justifyContent: 'center',
                            color: theme => theme.palette.grey[500],
                            padding: '0 1em 1em 1em' 
                        }}
                    >
                        <p>
                           Something went wrong. Please note that invitations expire after 24 hours.
                        <br />
                            <a href="#/signup">Request a new invitation link.</a>
                        </p>
                    </Box>                    
                </Card >
            </Box>            
        )
    }

    return (
        <Form onSubmit={handleSubmit} noValidate>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    background: getBackground(new Date()),
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center'
                }}
            >
                <Card sx={{ minWidth: 300, marginTop: '6em' }}>
                    <Box
                        sx={{
                            margin: '1em',
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <Avatar sx={{ bgcolor: 'secondary.main' }}>
                            <PersonAddIcon />
                        </Avatar>
                    </Box>
                    <Box
                        sx={{
                            marginTop: '1em',
                            display: 'flex',
                            justifyContent: 'center',
                            color: theme => theme.palette.grey[500],
                            padding: '0 1em 1em 1em' 
                        }}
                    >
                       Welcome! Please choose a password to get started.<br />
                       <br />
                       Passwords must follow these rules <br />
                       - At least 8 characters long<br />
                       - only letters and numericals allowed<br />
                       - at least one numerical is required<br />
                       <br />
                       Hint: longer passwords are more secure
                       
                    </Box>
                    <Box sx={{ padding: '0 1em 1em 1em' }}>
                        <Box >
                            <p>
                            <span>Username: </span>    {email}
                            </p>
                        </Box>        
                        <Box>
                    
                            <PasswordInput
                                autoFocus
                                source="password"
                                label={"Password"}
                                disabled={loading}
                                validate={required()}
                                fullWidth
                            />
                        </Box>
                        <Box>
                            
                            <PasswordInput
                                autoFocus
                                source="verifyPassword"
                                label={"Verify Password"}
                                disabled={loading}
                                validate={equalToPassword}
                                fullWidth
                            />
                        </Box>
                    </Box>
                    <CardActions sx={{ padding: '0 1em 1em 1em' }}>
                        <Button
                            variant="contained"
                            type="submit"
                            color="primary"
                            disabled={loading}
                            fullWidth
                        >
                            {loading && (
                                <CircularProgress size={25} thickness={2} />
                            )}
                            {"Create Profile"}
                        </Button>
                    </CardActions>   
                    <Box sx={{ padding: '0 1em 1em 1em' }}>
                    <Link href="#/login">Sign in</Link>
                    </Box>                                   
                </Card>
            </Box>
        </Form>
    );
}

export default CreateProfile