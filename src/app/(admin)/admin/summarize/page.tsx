import {Box} from "@mui/material"
import Typography from "@mui/material/Typography";
export const metadata = {
    title: 'Summarize - CorteStudios',
    description: 'Summarize',
}

export default function SummarizePage(){
    return(
        <Box sx={{ width: '100%', maxWidth: 500 }}>
            <Typography variant="h1" gutterBottom>
                Summarize Page
            </Typography>
        </Box>
    )
}