"use client"
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Image from "next/image";
import Link from "next/link";
import Profile from "@mui/icons-material/AccountCircleOutlined";
import { styled } from "@mui/material/styles";

interface DisplayProp {
    xs: string
    md: string
}

interface PageSection {
    page: string
    section: string
}


const pagesSections: PageSection [] = [
    {page: 'Inicio', section: 'home'},
    {page: 'Resumen', section: 'work'},
    {page: 'Acerca de', section: 'about'},
    {page: 'Portafolio', section: 'portfolio'},
    {page: 'Contacto', section: 'contact'}
]

const StyledMenu = styled((props: MenuProps) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(() => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        minWidth: 180,
        color: 'rgb(55, 65, 81)',
        backgroundColor: '#292929',
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        }
    },
}));

function ImageLogo() {
    return (
        <Link href={"/"} passHref>
            <Image
                style={{
                    alignContent: "center",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "15px",
                    marginBottom: "15px",
                }}
                priority
                width={30}
                height={30}
                src="/logo.png"
                alt={"CorteStudios logo"}>
            </Image>
        </Link>
    )
}

function ButtonLogin({displayProp}: { displayProp: DisplayProp }) {

    const mxValue = displayProp.xs === 'none' ? 1 : 0

    return (
        <Link href={"/auth/login"} passHref target={"_blank"}>
            <Button
                sx={{
                    justifyContent: "end",
                    my: 2,
                    color: '#1B70BE',
                    fontSize: 14,
                    display: {xs: displayProp.xs, md: displayProp.md}
                }}
            >
                <Profile sx={{
                    width: 25,
                    height: 25,
                    mx: mxValue,
                    color: '#1B70BE'
                }}>
                </Profile>
                {displayProp.xs === 'none' ? "Login" : ""}
            </Button>
        </Link>
    )
}

function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleCloseNavMenu = () => {

        setAnchorElNav(null);
    };


    return (
        <AppBar color="transparent" position="fixed" sx={{
            backdropFilter: "blur(10px)",
            background: "rgba(67,143,203,0.16)",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.68)",
            border: "1px solid rgba(5, 5, 5, 0.16)",
        }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{
                        display: {xs: 'none', md: 'flex'},
                        mr: 1,
                    }}>
                        <ImageLogo/>
                    </Box>
                    <Box sx={{flexGrow: 1.2, display: {xs: 'flex', md: 'none'}}}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon/>
                        </IconButton>
                        <StyledMenu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: {xs: 'block', md: 'none'},
                                color: '#212121'
                            }}
                        >
                            {pagesSections.map((pageSection) => (
                                <Link key={pageSection.section}
                                      href={`/#${pageSection.section}`}
                                      passHref scroll={false}>
                                <MenuItem
                                    sx={{
                                        color: 'white'
                                    }}
                                    key={pageSection.page}
                                    onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{pageSection.page}</Typography>

                                </MenuItem>
                                </Link>
                            ))}
                        </StyledMenu>
                    </Box>
                    <Box sx={{
                        display: {xs: 'flex', md: 'none'},
                        mr: 1,
                        flexGrow: 1,
                    }}>
                        <ImageLogo/>
                    </Box>
                    <Box sx={{flexGrow: 1.2, display: {xs: 'none', md: 'flex'}}}>
                        {pagesSections.map((pageSection) => (
                            <Button
                                key={pageSection.page}
                                href={`/#${pageSection.section}`}
                                onClick={handleCloseNavMenu}
                                sx={{my: 2, mx: 2, color: 'white', display: 'block', fontSize: 12}}
                            >
                                {pageSection.page}
                            </Button>
                        ))}
                    </Box>

                    <Box>
                        <ButtonLogin displayProp={{xs: 'none', md: 'flex'}}/>
                        <ButtonLogin displayProp={{xs: 'flex', md: 'none'}}/>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default ResponsiveAppBar;
