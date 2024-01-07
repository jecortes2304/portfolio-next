"use client"
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Image from "next/image";
import Link from "next/link";

export default function CardAuthHead({title}: { title: string }) {

    return (
        <>
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Image
                    style={{
                        alignContent: "center",
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: "10px",
                        marginBottom: "10px",
                    }}
                    priority
                    width={100}
                    height={90}
                    src="/logo_black.png"
                    alt={"CorteStudios logo"}>
                </Image>

            </Box>
            <Box sx={{my: 4}}>
                <Typography variant='body2' sx={{
                    fontWeight: 500, marginBottom: 1.5,
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                    {title}
                </Typography>
            </Box>
        </>
    )
}