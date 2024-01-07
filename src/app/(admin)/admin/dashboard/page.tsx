import { Box } from "@mui/material"
import Typography from "@mui/material/Typography";
import * as React from "react";
import connect from "@/utils/mongo";

export const metadata = {
    title: 'Dashboard - CorteStudios',
    description: 'Dashboard',
}
connect().then(r => console.log("asd"))

export default function DashboardPage() {
    return (
        <Box sx={{width: '100%', maxWidth: 500}}>
            <Typography variant="h1" gutterBottom>
                Dashboard Page
            </Typography>
        </Box>
    )
}