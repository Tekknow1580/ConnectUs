import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import { Box, TextField, Typography, Button, Link } from "@mui/material";

export default function Login() {
    const InputSize = 400;

    const [UName, SetName] = useState("");
    const [Pass, SetPass] = useState("");
    const [Error, SetError] = useState("");

    const navigator = useNavigate();
    useEffect(() => {
        var TK = JSON.parse(localStorage.getItem("Token"));
        if (TK != null && TK.TK != null)
            navigator("/Main")
    }, [])

    async function LoginCall(Name, Pass) {
        var ANS = await (await fetch("http://localhost:8080/Auth/Login", {
            method: "POST",
            body: JSON.stringify({ Email: Name, Password: Pass }),
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
        })).json();

        if (ANS.res !== true && ANS.res !== false) {
            SetError('Error: ' + ANS.res);
            return;
        }

        if (ANS.res === false) {
            SetError("* Invalid Email Or Password");
            return;
        }

        localStorage.setItem("Token", JSON.stringify(ANS.TK));
        navigator("/main")
    }

    return (
        <Box width={"100%"} height={"100vh"} display='flex' justifyContent={'center'} alignItems={'center'}>
            <Box sx={{ border: 5, borderColor: 'black', borderRadius: 2, padding: 7.5, paddingTop: 2.5 }}
                m={'10px'}
                maxHeight={'550px'}
                maxWidth={InputSize + 'px'}
                display={"flex"}
                flexDirection="column" >

                <Typography sx={{ marginBottom: '30px', fontSize: 30, fontStyle: 'oblique' }}>
                    Login
                </Typography>
                <Typography fontSize={20}>Email</Typography>
                <TextField sx={{ marginBottom: '10px' }}
                    size='small' value={UName} variant='outlined'
                    onChange={(e) => { SetName(e.target.value) }} />
                <Typography fontSize={20}>Password</Typography>
                <TextField sx={{ marginBottom: '10px' }}
                    size='small' value={Pass} variant='outlined' type={'password'}
                    onChange={(e) => { SetPass(e.target.value) }} />
                <Typography color={"red"}>{Error}</Typography>
                <Button sx={{ marginTop: '10px', borderRadius: 2 }}
                    variant='contained' fullWidth
                    onClick={() => { LoginCall(UName, Pass) }}>
                    Login
                </Button>
                <Box display={"flex"} flexDirection="row" justifyContent={'center'} alignItems={'center'} m="10px">
                    <Typography>Need a account? </Typography>
                    <Link sx={{ color: 'black' }}>
                        <Button color='inherit' onClick={() => { navigator("/SignUp") }}>
                            Sign Up
                        </Button>
                    </Link>
                </Box>
            </Box>
        </Box>
    )
}
