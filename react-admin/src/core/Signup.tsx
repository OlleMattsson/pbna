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
} from 'react-admin';

import Box from '@mui/material/Box';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import {getBackground} from './Login'


const Signup = () =>  {
    const [loading, setLoading] = useState(false);
    const translate = useTranslate();

    const notify = useNotify();
    const login = useLogin();
    const location = useLocation();

    const handleSubmit = (auth: FormValues) => {
        
        notify("Check your email")

        fetch('http://localhost:8181/verifyemail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                emailAddress: auth.email
            }),
        })
        .then(response => response.json()) // Parsing the JSON response
        .then(data => console.log(data))   // Handling the data from the response
        .catch(error => console.error('Error:', error)); // Handling errors
    };

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
                            <EmojiPeopleIcon />
                        </Avatar>
                    </Box>
                    <Box
                        sx={{
                            marginTop: '1em',
                            display: 'flex',
                            justifyContent: 'center',
                            color: theme => theme.palette.grey[500],
                        }}
                    >
                       Request an invitation link.
                    </Box>
                    <Box sx={{ padding: '0 1em 1em 1em' }}>
                        <Box sx={{ marginTop: '1em' }}>
                            <TextInput
                                autoFocus
                                source="email"
                                label={"Email"}
                                disabled={loading}
                                validate={required()}
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
                            {"Send invite"}
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

export default Signup