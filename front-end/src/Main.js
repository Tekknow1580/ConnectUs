import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import { Box, TextField, Typography, Button, List } from "@mui/material";

export default function Main() {
    const [Token, setToken] = useState({});
    const [User, SetUser] = useState({});

    const navigator = useNavigate();
    useEffect(() => {
        var TK = JSON.parse(localStorage.getItem("Token"));
        if (!TK || !TK.TK || !TK.User) {
            navigator("/");
            return;
        };
        async function FecthUser() {
            return await (await fetch('http://localhost:8080/User/Delaits/&' + TK.User, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${TK.TK}`
                }
            })).json();
        }
        setToken(TK);
        SetUser(FecthUser());
        if (User === null || User === {}) {
            localStorage.setItem("Token", null);
            navigator("/");
            return;
        }

    }, []);

    return (
        <Box>
            <Box>
                <Typography>{ }</Typography>
            </Box>
        </Box>
    )
}
