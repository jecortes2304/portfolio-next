"use client"
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import CardAuthHead from "@/components/auth_pages/CardAuthHead";
import { styled, useTheme } from '@mui/material/styles'
import MuiCard, { CardProps } from '@mui/material/Card'
import FormRegister from "@/components/auth_pages/register/FormRegister";

const Card = styled(MuiCard)<CardProps>(({theme}) => ({
    [theme.breakpoints.up('sm')]: {width: '28rem'}
}))

export default function RegisterPageContent() {

    return (
        <Box className='content-center'>
            <Card sx={{ zIndex: 1 }}>
                <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
                    <CardAuthHead title={"¡Regístrate ahora!"}/>
                    <FormRegister/>
                </CardContent>
            </Card>
        </Box>
    )
}