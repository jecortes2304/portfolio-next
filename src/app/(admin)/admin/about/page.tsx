import {Box} from "@mui/material"
import Typography from "@mui/material/Typography";
export const metadata = {
    title: 'About - CorteStudios',
    description: 'About',
}

export default function AboutPage(){
    return(
        <Box sx={{ width: '100%', maxWidth: 500 }}>
            <Typography variant="h1" gutterBottom>
                About Page
            </Typography>
        </Box>
    )
}