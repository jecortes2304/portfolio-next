"use client"

import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import EyeOutline from "mdi-material-ui/EyeOutline";
import EyeOffOutline from "mdi-material-ui/EyeOffOutline";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Link from "next/link";
import Button from "@mui/material/Button";
import { ChangeEvent, FormEvent, MouseEvent, useState } from "react";
import { styled } from "@mui/material/styles";
import MuiFormControlLabel, { FormControlLabelProps } from "@mui/material/FormControlLabel";
import { useRouter } from "next/navigation";
import Typography from "@mui/material/Typography";
import CircularProgress from '@mui/material/CircularProgress';
import { signIn } from "next-auth/react";


interface State {
    password: string
    showPassword: boolean
}

interface LoginFormState {
    email: string;
    password: string;
}

const LinkStyled = styled(Link)(({theme}) => ({
    fontSize: '0.875rem',
    textDecoration: 'none',
    color: theme.palette.primary.main
}))

const FormControlLabel = styled(MuiFormControlLabel)<FormControlLabelProps>(({theme}) => ({
    '& .MuiFormControlLabel-label': {
        fontSize: '0.875rem',
        color: theme.palette.text.secondary
    }
}))


export default function FormLogin() {

    const [values, setValues] = useState<State>({
        password: '',
        showPassword: false
    })

    const router = useRouter();

    const handleChangePassword = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
        setValues({...values, [prop]: event.target.value})
    }

    const handleClickShowPassword = () => {
        setValues({...values, showPassword: !values.showPassword})
    }

    const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
    }

    const [loginState, setLoginState] = useState<LoginFormState>({
        email: "",
        password: ""
    });

    const [userError, setUserError] = useState(false)
    const [passWordError, setPassWordError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [remittanceError, setRemittanceError] = useState(false)
    const [remittanceErrorText, setRemittanceErrorText] = useState("")

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {

        // e.preventDefault();

        setLoading(true)
        setRemittanceError(false)

        let uError = userError
        let passError = passWordError

        if (loginState.email === "") {
            uError = true
            setUserError(uError)
        } else {
            uError = false
            setUserError(uError)
        }

        if (loginState.password === "") {
            passError = true
            setPassWordError(passError)
        } else {
            passError = false
            setPassWordError(passError)
        }

        if (!uError && !passError) {
            try {
                const result = await signIn("credentials", {
                    username: loginState.email,
                    password: loginState.password,
                    redirect: false,
                });
                const loginError = result?.error
                if (loginError?.includes("false")) {
                    const error = JSON.parse(loginError)
                    setRemittanceError(true)
                    setRemittanceErrorText(error.error + " 😔")
                } else {
                    router.push("/admin/dashboard")
                }
            } catch (e) {
                setRemittanceError(true)
                console.log(e)
                setRemittanceErrorText("Unknown Server Error, 😔")
            }
        }
        setLoading(false)
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const {name, value} = e.target;
        setLoginState({...loginState, [name]: value});
    }


    return (
        <>
            <form noValidate autoComplete='off' onSubmit={handleSubmit}>
                <TextField autoFocus fullWidth id='email' label='Correo' sx={{marginBottom: 4}}/>
                <FormControl fullWidth >
                    <InputLabel htmlFor='auth-login-password'>Contraseña</InputLabel>
                    <OutlinedInput
                        label='Contraseña'
                        value={values.password}
                        id='auth-login-password'
                        onChange={handleChangePassword('password')}
                        type={values.showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position='end'>
                                <IconButton
                                    edge='end'
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    aria-label='toggle password visibility'
                                >
                                    {values.showPassword ? <EyeOutline/> : <EyeOffOutline/>}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <Box
                    sx={{
                        display: 'flex',
                        mb: '50px',
                        mt: '10px',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between'
                    }}
                >
                    <FormControlLabel control={<Checkbox/>} label='Recordarme'/>
                    <LinkStyled
                        onClick={e => e.preventDefault()} href={"/"} passHref
                    >
                        <Typography variant='body2'>
                            ¿Olvidó su contraseña?
                        </Typography>
                    </LinkStyled>
                </Box>
                {loading ?
                    <Box sx={{ display: 'flex', marginLeft: '45%' }}>
                        <CircularProgress size={35} />
                    </Box>
                     : <Button
                         fullWidth
                         size='large'
                         variant='contained'
                         sx={{marginBottom: 7}}
                     >
                     Aceptar
                 </Button>
                }
            </form>
        </>
    )
}