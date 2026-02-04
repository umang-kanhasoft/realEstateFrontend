import { Box, Typography } from "@mui/material";

interface AmenityCardProps {
    title: string;
    image: string;
}

export default function AmenityCard({ title, image }: AmenityCardProps) {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                border: "1px solid #e0e0e0",
                borderRadius: "16px",
                overflow: "hidden",
                backgroundColor: "#fff",
                transition: "all 0.3s ease",
                height: "100%",
                cursor: "pointer",
                "&:hover": {
                    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                    transform: "translateY(-5px)",
                    borderColor: "primary.main",
                },
            }}
        >
            {/* Image */}
            <Box
                sx={{
                    width: "100%",
                    height: 140,
                    overflow: "hidden",
                }}
            >
                <Box
                    component="img"
                    src={image}
                    alt={title}
                    sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.5s ease",
                        "&:hover": {
                            transform: "scale(1.05)",
                        },
                    }}
                />
            </Box>

            {/* Title */}
            <Box p={2} textAlign="center" flexGrow={1} display="flex" alignItems="center" justifyContent="center">
                <Typography variant="subtitle2" fontWeight={600} color="text.primary">
                    {title}
                </Typography>
            </Box>
        </Box>
    );
}
