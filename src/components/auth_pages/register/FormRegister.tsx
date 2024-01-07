import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

// ** Icons Imports
import Google from 'mdi-material-ui/Google'
import Github from 'mdi-material-ui/Github'
import Twitter from 'mdi-material-ui/Twitter'
import Facebook from 'mdi-material-ui/Facebook'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
// ** React Imports
import { useState, Fragment, ChangeEvent, MouseEvent, ReactNode } from 'react'
// ** Next Imports
import Link from 'next/link'
import { styled } from "@mui/material/styles";
import MuiFormControlLabel, { FormControlLabelProps } from "@mui/material/FormControlLabel";

interface State {
    password: string
    showPassword: boolean
}


const LinkStyled = styled(Link)(({theme}) => ({
    fontSize: '0.875rem',
    textDecoration: 'none',
    color: theme.palette.primary.main
}))

const FormControlLabel = styled(MuiFormControlLabel)<FormControlLabelProps>(({theme}) => ({
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(4),
    '& .MuiFormControlLabel-label': {
        fontSize: '0.875rem',
        color: theme.palette.text.secondary
    }
}))

export default function FormRegister() {

    // ** States
    const [values, setValues] = useState<State>({
        password: '',
        showPassword: false
    })

    const handleClickShowPassword = () => {
        setValues({...values, showPassword: !values.showPassword})
    }

    const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
    }


    const handleChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
        setValues({...values, [prop]: event.target.value})
    }


    return (
        <>
            <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
                <TextField autoFocus fullWidth id='username' label='Usuario' sx={{marginBottom: 4}}/>

                <TextField fullWidth type='email' label='Correo' sx={{marginBottom: 4}}/>

                <FormControl fullWidth>
                    <InputLabel htmlFor='auth-register-password'>Contraseña</InputLabel>

                    <OutlinedInput
                        label='Contraseña'
                        value={values.password}
                        id='auth-register-password'
                        onChange={handleChange('password')}
                        type={values.showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position='end'>
                                <IconButton
                                    edge='end'
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    aria-label='toggle password visibility'
                                >
                                    {values.showPassword ? <EyeOutline fontSize='small'/> :
                                        <EyeOffOutline fontSize='small'/>}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>

                <FormControlLabel
                    control={<Checkbox/>}
                    label={
                        <Fragment>
                            <span>Estoy de acuerdo con los </span>

                            <LinkStyled href='/' passHref onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}>
                                Términos y políticas de privacidad
                            </LinkStyled>
                        </Fragment>
                    }
                />

                <Button fullWidth size='large' type='submit' variant='contained' sx={{marginBottom: 7}}>
                    Registrar
                </Button>

                <Box sx={{display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center'}}>
                    <Typography variant='body2' sx={{marginRight: 2}}>
                        ¿Ya tienes cuenta?
                    </Typography>

                    <Typography variant='body2'>
                        <LinkStyled passHref href='/auth/login'>
                            Autentícate
                        </LinkStyled>
                    </Typography>
                </Box>

                <Divider sx={{my: 5}}>o</Divider>

                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <IconButton
                        component={LinkStyled}
                        href='/'
                        passHref
                        onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
                    >
                        <Facebook sx={{color: '#497ce2'}}/>
                    </IconButton>

                    <IconButton
                        component={LinkStyled}
                        href='/'
                        passHref
                        onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
                    >
                        <Twitter sx={{color: '#1da1f2'}}/>
                    </IconButton>

                    <IconButton
                        component={LinkStyled}
                        href='/'
                        passHref
                        onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
                    >
                        <Github
                            sx={{color: theme => (theme.palette.mode === 'light' ? '#272727' : theme.palette.grey[300])}}
                        />
                    </IconButton>

                    <IconButton
                        component={LinkStyled}
                        href='/'
                        passHref
                        onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
                    >
                        <Google sx={{color: '#db4437'}}/>
                    </IconButton>
                </Box>
            </form>
        </>
    )
}