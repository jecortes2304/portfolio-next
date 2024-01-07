import {Box} from "@mui/material"
import Typography from "@mui/material/Typography";
export const metadata = {
    title: 'Portfolio - CorteStudios',
    description: 'Portfolio',
}

export default function PortfolioPage(){
    return(
        <Box sx={{ width: '100%', maxWidth: 500 }}>
            <Typography variant="h1" gutterBottom>
                Portfolio Page
            </Typography>
        </Box>
    )
}