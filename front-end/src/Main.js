import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import { Box, TextField, Typography, Button } from "@mui/material";

export default function Main() {
    
    useEffect(() => {
        var TK = JSON.parse(localStorage.getItem("Token"));
        if (!TK || !TK.TK) {
            navigator("/");
            return;
        };
        async function fecthData() {
            await (await fetch('http://localhost:8080/Main/List', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${TK.TK}`
                }
            })).json();
        }
        /*fecthData();
        if (List == null)
            setList([]);*/

    }, []);

    return (
        <Box>
            <Typography>
                Hallo World!
            </Typography>
        </Box>
    )
}
