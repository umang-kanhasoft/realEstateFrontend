import { Box, Typography, Button } from "@mui/material";

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
    return (
        <Box display="flex" gap={3} flexWrap="wrap">
            {data[bhk]?.map((item: { price: string; area: string }, index: number) => (
                <Box
                    key={index}
                    sx={{
                        width: 280,
                        backgroundColor: "#f3f7ff",
                        borderRadius: 3,
                        p: 2,
                    }}
                >
                    <Box
                        sx={{
                            height: 160,
                            backgroundColor: "#e0e0e0",
                            borderRadius: 2,
                            mb: 2,
                        }}
                    />

                    <Typography fontWeight={700}>{item.price}</Typography>
                    <Typography variant="body2" color="text.secondary">
                        {item.area} Super Builtup Area
                    </Typography>

                    <Button
                        fullWidth
                        variant="outlined"
                        sx={{ mt: 2, borderRadius: 2 }}
                    >
                        Enquire Now
                    </Button>
                </Box>
            ))}
        </Box>
    );
}
export default FloorPlans;