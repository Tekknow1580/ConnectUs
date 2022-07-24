import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import { MoreVert } from '@mui/icons-material';
import { Box, TextField, Typography, Button, IconButton, List, ListItem, Menu, MenuItem } from "@mui/material";

export default function Main() {
    const [Token, setToken] = useState({});
    const [User, SetUser] = useState({});
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const navigator = useNavigate();
    useEffect(() => {
        var TK = JSON.parse(localStorage.getItem("Token"));
        ValUser();
        if (!TK || !TK.TK || !TK.User) {
            localStorage.setItem("Token", null);
            navigator("/");
            return;
        };
        async function ValUser() {
            var ANS = await (await (await fetch('http://localhost:8080/Auth/' + TK.TK, {
                method: 'Get',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${TK.TK}`
                }
            })).json()).res;
            if (ANS === false) {
                localStorage.setItem("Token", null);
                navigator("/");
                return;
            }
        }
        async function FecthUser() {
            SetUser(await (await fetch('http://localhost:8080/User/Delaits/' + TK.User, {
                method: 'Get',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${TK.TK}`
                }
            })).json());
        }
        setToken(TK);
        FecthUser();
        if (User === null || User === {}) {
            localStorage.setItem("Token", null);
            navigator("/");
            return;
        }

    }, []);

    return (
        <Box display={"flex"} flexDirection="row" height={"98vh"}>
            <Box sx={{ border: 2, borderColor: 'lightblue', borderRadius: 5, boxShadow: 2, marginRight: 2.5 }}
                width={"30%"}>
                <Box sx={{ borderBottom: 2, borderColor: 'lightblue', padding: 3, marginBottom: 2 }}
                    display={"flex"} flexDirection="row" justifyContent={'center'} alignItems={'center'}>
                    <Typography sx={{ fontSize: 25 }} width={'100%'}>{User.UserName}</Typography>
                    <IconButton
                        aria-label="more"
                        id="btnMenu"
                        aria-controls={open ? 'UserMenu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={handleClick}>
                        <MoreVert fontSize='large' />
                    </IconButton>
                    <Menu
                        id="UserMenu"
                        MenuListProps={{
                            'aria-labelledby': 'btnMenu',
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}>
                        <MenuItem onClick={() => {
                            localStorage.setItem("Token", null);
                            navigator("/");
                        }}>Logout</MenuItem>
                    </Menu>
                </Box>
                <List>
                    Helo World!
                </List>
            </Box>
            <Box sx={{ border: 2, borderColor: 'lightblue', borderRadius: 5, boxShadow: 2 }}
                width={"70%"}>
                <Box sx={{ borderBottom: 2, borderColor: 'lightblue', padding: 3.85, marginBottom: 2 }}
                    display={"flex"} flexDirection="row">
                    <Typography sx={{ fontSize: 25 }} width={'100%'}>Helo World!</Typography>
                </Box>
            </Box>
        </Box>
    )
}
