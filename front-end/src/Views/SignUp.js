import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Box, TextField, Typography, Button, Link } from "@mui/material";
import { Errors } from '../Models/Errors';

export default function SignUp() {
    const InputSize = 400;
    const [bSwitch, SetSwitch] = useState(true);

    const [Heading, SetHead] = useState("Sign Up");
    const [Email, SetEmail] = useState("");
    const [UName, SetName] = useState("");
    const [Pass, SetPass] = useState("");
    const [PassVal, SetPassVal] = useState("");
    const [Disc, SetDisc] = useState("");
    const [Age, SetAge] = useState(0);
    const [Error, SetError] = useState([
        new Errors("Email", "This Acount Already Exists"),
        new Errors("Name", "Invalid User Name"),
        new Errors("Pass", "Invalid Password"),
        new Errors("PassVal", "Password Does Not Mach"),
        new Errors("Age", "Invalid Age"),
        new Errors("Disc", "Invalid Discription"),
        new Errors("Error", "Unabel To Sing You Up. Try Again Later"),
        new Errors("Empty", "One Or More Fields Are Empty."),
    ]);

    const navigator = useNavigate();
    async function SignUpCall(Email, Name, Pass, ConfirmPass, Disc, Age) {
        if (Email === "" || Name === "" || Pass === "") { Error.find(E => E.ID === "Empty").ShowMsg(); return; }
        else Error.find(E => E.ID === "Empty").HideMsg();
        if (!ValPass(Pass, ConfirmPass)) { Error.find(E => E.ID === "PassVal").ShowMsg(); return; }
        else
            Error.find(E => E.ID === "PassVal").HideMsg();

        var Val = await (await fetch("http://localhost:8080/Auth/Val/" + Email, {
            method: "Get",
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
        })).json();
        if (Val.res === false) { Error.find(E => E.ID === "Email").ShowMsg(); return; }
        else
            Error.find(E => E.ID === "Email").HideMsg();

        var ANS = await (await fetch("http://localhost:8080/Auth/SignUp", {
            method: "POST",
            body: JSON.stringify({ Email: Email, UserName: Name, Password: Pass, Discription: Disc, Age: Age }),
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
        })).json();

        if (ANS.res !== true && ANS.res !== false) {
            console.log(ANS.res);
            Error.find(E => E.ID === "Error").Message("Error : " + ANS.res, true);
            return;
        }
        else
            Error.find(E => E.ID === "Error").HideMsg();

        if (ANS.res === false) {
            Error.find(E => E.ID === "Error").Message("Error : " + ANS.Val, true);
            return;
        }
        else
            Error.find(E => E.ID === "Error").HideMsg();

        localStorage.setItem("Token", JSON.stringify(ANS.Val));
        navigator('/Main');
    }

    function ValPass(Pass, ConfirmPass) {
        if (Pass === ConfirmPass)
            return true;
        return false;
    }

    function UpdateUI() {
        if (bSwitch === true) { SetHead("Sign Up  "); SetSwitch(false) }
        else { SetHead("Sign Up "); SetSwitch(true) }
    }

    return (<Box width={"100%"} height={"100vh"} display='flex' justifyContent={'center'} alignItems={'center'}>
        <Box sx={{ border: 5, borderColor: 'black', borderRadius: 5, padding: 7.5, paddingTop: 2.5 }}
            m={'10px'}
            maxHeight={'550px'}
            maxWidth={InputSize + 'px'}
            display={"flex"}
            flexDirection="column" >

            <Typography sx={{ marginBottom: '30px', fontSize: 30, fontStyle: 'oblique' }}>
                {Heading}
            </Typography>
            <TextField sx={{ marginBottom: '15px' }}
                size='small' value={Email} variant='outlined'
                onChange={(e) => { SetEmail(e.target.value) }}
                label="Email"
                inputMode='email'
                helperText={Error.find(E => E.ID === "Email").Message()}
                error={Error.find(E => E.ID === "Email").Show}
                required />
            <TextField sx={{ marginBottom: '15px' }}
                size='small' value={UName} variant='outlined'
                onChange={(e) => { SetName(e.target.value) }}
                label="User Name"
                helperText={Error.find(E => E.ID === "Name").Message()}
                error={Error.find(E => E.ID === "Name").Show}
                required />
            <TextField sx={{ marginBottom: '15px' }}
                size='small' value={Pass} variant='outlined'
                onChange={(e) => { SetPass(e.target.value) }}
                label="Password"
                helperText={Error.find(E => E.ID === "Pass").Message()}
                error={Error.find(E => E.ID === "Pass").Show}
                type="password"
                required />
            <TextField sx={{ marginBottom: '15px' }}
                size='small' value={PassVal} variant='outlined'
                onChange={(e) => {
                    Error.find(E => E.ID === "PassVal").Show = !ValPass(Pass, e.target.value);
                    SetPassVal(e.target.value);
                }}
                label="Confirm Password"
                helperText={Error.find(E => E.ID === "PassVal").Message()}
                error={Error.find(E => E.ID === "PassVal").Show}
                type="password"
                required />
            <TextField sx={{ marginBottom: '15px' }}
                size='small' value={Age} variant='outlined'
                onChange={(e) => { if (e.target.value < 0 || e.target.value > 100) SetAge(0); else SetAge(e.target.value) }}
                label="Age"
                helperText={Error.find(E => E.ID === "Age").Message()}
                error={Error.find(E => E.ID === "Age").Show}
                type="number"
                required />
            <TextField sx={{ marginBottom: '15px', maxHeight: 100 }}
                size='small' value={Disc} variant='outlined'
                onChange={(e) => { SetDisc(e.target.value) }}
                label="Discription"
                helperText={Error.find(E => E.ID === "Disc").Message()}
                error={Error.find(E => E.ID === "Disc").Show}
                rows={4}
                multiline />
            <Typography color={"red"}>{Error.find(E => E.ID === "Error").Message()}</Typography>
            <Typography color={"red"}>{Error.find(E => E.ID === "Empty").Message()}</Typography>
            <Button sx={{ marginTop: '10px', borderRadius: 2 }}
                variant='contained' fullWidth
                onClick={async () => { await SignUpCall(Email, UName, Pass, PassVal, Disc, Age); UpdateUI(); }}>
                Sign Up
            </Button>
            <Box display={"flex"} flexDirection="row" justifyContent={'center'} alignItems={'center'} m="10px">
                <Typography>Already a user? </Typography>
                <Link sx={{ color: 'black' }}>
                    <Button color='inherit' onClick={() => { navigator("/") }}>
                        Login
                    </Button>
                </Link>
            </Box>
        </Box>
    </Box>
    )
}