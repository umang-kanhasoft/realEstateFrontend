import { Box, Typography, Button, Grid, Chip } from "@mui/material";

const data = {
    2: [
        { price: "65 Lac", area: "271 Sq-yrd" },
        { price: "75 Lac", area: "287 Sq-yrd" },
        { price: "80 Lac", area: "292 Sq-yrd" },
    ],
    3: [
        { price: "95 Lac", area: "271 Sq-yrd" },
        { price: "1.10 Cr", area: "287 Sq-yrd" },
        { price: "1.15 Cr", area: "292 Sq-yrd" },
    ],
    4: [
        { price: "1.22 Cr", area: "271 Sq-yrd" },
        { price: "₹1.29 Cr", area: "287 Sq-yrd" },
        { price: "₹1.31 Cr", area: "292 Sq-yrd" },
    ],
};

function FloorPlans({ bhk }: { bhk: string }) {
    // @ts-ignore
    const plans = data[bhk] || [];

    return (
        <Grid container spacing={3}>
            {plans.map((item: { price: string; area: string }, index: number) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                    <Box
                        sx={{
                            backgroundColor: "#fff",
                            borderRadius: "16px",
                            border: "1px solid #e0e0e0",
                            p: 3,
                            transition: "all 0.3s ease",
                            "&:hover": {
                                boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
                                transform: "translateY(-5px)",
                                borderColor: "primary.main",
                            }
                        }}
                    >
                        {/* Floor Plan Placeholder */}
                        <Box
                            sx={{
                                height: 180,
                                backgroundColor: "#f5f7fa",
                                borderRadius: "12px",
                                mb: 3,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                border: "1px dashed #d0d0d0"
                            }}
                        >
                            <Typography color="text.secondary" variant="body2">
                                Floor Plan Image
                            </Typography>
                        </Box>

                        <Box display="flex" justifyContent="space-between" alignItems="flex-end" mb={1}>
                            <Box>
                                <Typography variant="caption" color="text.secondary" display="block">
                                    Price
                                </Typography>
                                <Typography variant="h5" fontWeight={700} color="primary.main">
                                    {item.price}
                                </Typography>
                            </Box>
                            <Chip size="small" label={`${bhk} BHK`} color="default" sx={{ fontWeight: 600 }} />
                        </Box>

                        <Typography variant="body2" color="text.secondary" mb={3}>
                            {item.area} <Box component="span" fontWeight={500} color="text.primary">Super Built-up Area</Box>
                        </Typography>

                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            size="large"
                            sx={{
                                borderRadius: "10px",
                                textTransform: "none",
                                fontWeight: 600,
                                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                            }}
                        >
                            Enquire Now
                        </Button>
                    </Box>
                </Grid>
            ))}
        </Grid>
    );
}
export default FloorPlans;