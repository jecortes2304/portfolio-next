import {Box} from "@mui/material"
import Typography from "@mui/material/Typography";
export const metadata = {
    title: 'Profile - CorteStudios',
    description: 'Profile',
}

export default function ProfilePage(){
    return(
        <Box sx={{ width: '100%', maxWidth: 500 }}>
            <Typography variant="h1" gutterBottom>
                Profile Page
            </Typography>
        </Box>
    )
}