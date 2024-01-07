import {Box} from "@mui/material"
import Typography from "@mui/material/Typography";
export const metadata = {
    title: 'Settings - CorteStudios',
    description: 'Settings',
}

export default function SettingsPage(){
    return(
        <Box sx={{ width: '100%', maxWidth: 500 }}>
            <Typography variant="h1" gutterBottom>
                Settings Page
            </Typography>
        </Box>
    )
}