import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import { Box, TextField, Typography, Button } from "@mui/material";

export default function Login() {
    const InputSize = 400;

    const [UName, SetName] = useState("");
    const [Pass, SetPass] = useState("");
    const [Error, SetError] = useState("");

    const navigator = useNavigate();
    useEffect(() => {
        var TK = JSON.parse(localStorage.getItem("Token"));
        if (TK != null && TK.TK)
            navigator("/Main")
    })

    async function LoginCall(Name, Pass) {
        var ANS = await (await fetch("http://localhost:8080/Auth/Login", {
            method: "POST",
            body: JSON.stringify({ UserName: Name, Password: Pass }),
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
        })).json();

        if (ANS.res !== true && ANS.res !== false) {
            SetError('Error: ' + ANS.res);
            return;
        }

        if (ANS.res === false) {
            SetError("* Invalid User Name Or Password");
            return;
        }

        localStorage.setItem("Token", JSON.stringify(ANS.TK));
        navigator("/main")
    }

    async function SignUpCall(Name, Pass) {
        var ANS = await (await fetch("http://localhost:8080/User/New", {
            method: "POST",
            body: JSON.stringify({ UserName: Name, Password: Pass }),
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
        })).json();

        if (ANS.res !== true && ANS.res !== false) {
            SetError('Error: ' + ANS.res);
            return;
        }

        if (ANS.res === false) {
            SetError("* Invalid User Name Or Password");
            return;
        }

        localStorage.setItem("Token", JSON.stringify(ANS.TK));
        navigator("/main")
    }

    return (
        <Box width={"100%"} height={"100vh"} display='flex' justifyContent={'center'} alignItems={'center'}>
            <Box sx={{ border: 1, borderColor: 'black', borderRadius: 2, padding: 1 }}
                m={'10px'}
                maxHeight={'250px'}
                maxWidth={InputSize + 'px'}
                display={"flex"}
                flexDirection="column" >

                <Typography fontSize={20}>User Name</Typography>
                <TextField sx={{ marginBottom: '10px' }}
                    size='small' value={UName} variant='outlined'
                    onChange={(e) => { SetName(e.target.value) }} />
                <Typography fontSize={20}>Password</Typography>
                <TextField sx={{ marginBottom: '10px' }}
                    size='small' value={Pass} variant='outlined' type={'password'}
                    onChange={(e) => { SetPass(e.target.value) }} />
                <Typography color={"red"}>{Error}</Typography>
                <Box sx={{ padding: 0}}
                    m={'10px'}
                    display='flex'
                    alignItems={'center'}
                    justifyContent='center'
                    flexDirection="row">
                    <Button sx={{ margin: '1px', width: 100 , padding:1 }}
                        variant='contained'
                        onClick={() => { LoginCall(UName, Pass) }}>
                        Login
                    </Button>
                    <Button sx={{ margin: '1px', width: 100, padding:1 }}
                        variant='contained'
                        onClick={() => { SignUpCall(UName, Pass) }}>
                        Sign Up
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}
