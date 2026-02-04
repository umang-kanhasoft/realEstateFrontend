'use client';
import { Add, Remove } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import { useState } from 'react';

const Faq = (): JSX.Element => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const questions = [
    {
      q: 'Why choose Real Estate as your real estate consultant?',
      a: 'Real Estate offers a verified database of premium properties, ensuring transparency and trust. Our expert consultants guide you through every step, from selection to documentation, providing a seamless home-buying experience.',
    },
    {
      q: 'What services does a property consultant provide?',
      a: 'We provide end-to-end services including property identification, site visits, price negotiation, legal verification, and assistance with home loans and registration processes.',
    },
    {
      q: 'How do real estate advisors differ from property specialists?',
      a: 'Real estate advisors provide strategic investment advice and long-term portfolio management, while property specialists focus on the transactional aspects of buying, selling, or leasing specific properties.',
    },
    {
      q: 'Are the property listings on Real Estate verified?',
      a: 'Yes, 100% of our listings go through a rigorous verification process. We physically inspect properties and verify ownership documents to ensure you only see genuine and legal listings.',
    },
  ];

  return (
    <Container maxWidth="xl" className="my-32">
      <Grid container spacing={8} alignItems="center">
        <Grid item xs={12} md={5}>
          <Typography
            variant="overline"
            className="font-extrabold tracking-[1.5px] text-primary-600"
          >
            FAQ
          </Typography>
          <Typography
            variant="h3"
            className="mb-6 mt-2 font-extrabold text-gray-900"
          >
            Frequently Asked Questions<span className="text-sky-500">.</span>
          </Typography>
          <Typography
            variant="h6"
            className="mb-8 max-w-[400px] font-normal text-gray-500"
          >
            Can&apos;t find what you&apos;re looking for? Chat with our AI
            assistant or contact our support team.
          </Typography>
        </Grid>

        <Grid item xs={12} md={7}>
          {questions.map((item, i) => (
            <Accordion
              key={i}
              expanded={expanded === `panel${i}`}
              onChange={handleChange(`panel${i}`)}
              elevation={0}
              disableGutters
              className="mb-4 border-b border-gray-200 bg-transparent before:hidden"
            >
              <AccordionSummary
                expandIcon={
                  expanded === `panel${i}` ? (
                    <Remove className="text-primary-600" />
                  ) : (
                    <Add />
                  )
                }
                className="px-0 py-0 hover:text-primary-600 [&_.MuiAccordionSummary-content]:my-4"
              >
                <Typography
                  variant="h6"
                  className="text-base font-bold md:text-xl"
                >
                  {item.q}
                </Typography>
              </AccordionSummary>
              <AccordionDetails className="px-0 pb-4 pt-0">
                <Typography
                  variant="body1"
                  className="leading-relaxed text-gray-600"
                >
                  {item.a}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Faq;
