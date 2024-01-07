"use client"

import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import CardAuthHead from "@/components/auth_pages/CardAuthHead";
import FormLogin from "@/components/auth_pages/login/FormLogin";
import { styled } from '@mui/material/styles'
import MuiCard, { CardProps } from '@mui/material/Card'

const Card = styled(MuiCard)<CardProps>(({theme}) => ({
    [theme.breakpoints.up('sm')]: {width: '28rem'}
}))

export default function LoginPageContent() {
    return (
        <Box className='content-center'>
            <Card sx={{zIndex: 1}}>
                <CardContent>
                    <CardAuthHead title={"Por favor, autentíquese para continuar"}/>
                    <FormLogin/>
                </CardContent>
            </Card>
        </Box>
    )
}