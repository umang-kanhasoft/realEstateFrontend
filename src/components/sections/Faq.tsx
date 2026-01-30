import { Accordion, AccordionDetails, AccordionSummary, Container, Typography } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

const Faq = (): JSX.Element => {
    return (
        <Container maxWidth="xl" sx={{ my: 8 }}>
            <Typography variant="h5" fontWeight={700} mb={4}>
                {" "}
                Frequently asked question{" "}
            </Typography>
            {[
                "Why choose Vitalspace as your real estate consultant in Ahmedabad & Gandhinagar?",
                "What services does a property consultant in Ahmedabad & Gandhinagar provide?",
                "How do real estate advisors differ from property specialists in Gandhinagar?",
            ].map((q, i) => (
                <Accordion
                    key={i}
                    elevation={0}
                    sx={{
                        border: "1px solid #eee",
                        mb: 2,
                        borderRadius: "12px !important",
                    }}
                >
                    <AccordionSummary expandIcon={<ExpandMore />}>
                        <Typography fontWeight={600}>{q}</Typography>{" "}
                    </AccordionSummary>
                    <AccordionDetails>
                        {" "}
                        <Typography variant="body2" color="text.secondary">
                            {" "}
                            Detailed answer for the question...
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            ))}
        </Container>
    );
};

export default Faq;