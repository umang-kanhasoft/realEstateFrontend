'use client';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Chip,
    Container,
    Grid,
    Stack,
    Typography,
} from '@mui/material';

export default function NewProjects() {
    return (
        <>
            <Container maxWidth="xl" sx={{ my: 8 }}>
                <Typography variant="h6" fontWeight={700} mb={3}>
                    {" "}
                    Explore New Project by Localities{" "}
                </Typography>
                <Stack direction="row" spacing={1} mb={4}>
                    {["Ambli", "Science City", "Shela", "Vaishnodevi", "Zundal"].map(
                        (l, i) => (
                            <Chip
                                key={l}
                                label={l}
                                sx={{
                                    bgcolor: i === 0 ? "black" : "#f5f5f5",
                                    color: i === 0 ? "white" : "black",
                                }}
                            />
                        )
                    )}
                </Stack>
                <Grid container spacing={2}>
                    {[
                        "Ayaan",
                        "Palak Elina",
                        "Shaligram Luxuria",
                        "The Bellagio",
                        "Westlands",
                        "Binori Belmont",
                        "Ratnaakar Artesia",
                        "Sheetal Gharana",
                        "The Kimana Tower",
                    ].map((item) => (
                        <Grid item xs={6} md={2.4} key={item}>
                            <Typography variant="body2" color="#555">
                                {" "}
                                {item}{" "}
                            </Typography>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* PROPERTY OPTIONS TABLE (Image 3 bottom) */}
            <Container maxWidth="xl" sx={{ my: 8 }}>
                <Typography variant="h6" fontWeight={700} mb={4}>
                    {" "}
                    Property Options in Ahmedabad{" "}
                </Typography>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={2.4}>
                        <Typography variant="subtitle2" fontWeight={700} gutterBottom>
                            {" "}
                            Popular BHK Searches{" "}
                        </Typography>
                        {["2 BHK Flats", "2.5 BHK Flats", "3 BHK Flats", "4 BHK Flats"].map(
                            (t) => (
                                <Typography
                                    key={t}
                                    variant="caption"
                                    display="block"
                                    color="#666"
                                    sx={{ mb: 1 }}
                                >
                                    {" "}
                                    {t} in Ahmedabad{" "}
                                </Typography>
                            )
                        )}
                    </Grid>
                    <Grid item xs={12} md={2.4}>
                        <Typography variant="subtitle2" fontWeight={700} gutterBottom>
                            {" "}
                            Popular Flat Searches{" "}
                        </Typography>
                        {["Flats in Iscon Ambli", "Flats in Science City"].map((t) => (
                            <Typography
                                key={t}
                                variant="caption"
                                display="block"
                                color="#666"
                                sx={{ mb: 1 }}
                            >
                                {" "}
                                {t}{" "}
                            </Typography>
                        ))}
                    </Grid>
                    <Grid item xs={12} md={2.4}>
                        <Typography variant="subtitle2" fontWeight={700} gutterBottom>
                            {" "}
                            Budget wise Searches{" "}
                        </Typography>
                        {["Flats under 50 lakhs", "Flats under 75 lakhs"].map((t) => (
                            <Typography
                                key={t}
                                variant="caption"
                                display="block"
                                color="#666"
                                sx={{ mb: 1 }}
                            >
                                {" "}
                                {t} in Ahmedabad{" "}
                            </Typography>
                        ))}
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}