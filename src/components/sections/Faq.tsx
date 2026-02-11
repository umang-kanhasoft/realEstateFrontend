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

export interface Specifications {
  constructionQuality?: string;
  architecturalStyle?: string;
  interiorCondition?: string;
  furnishingStatus?: string[];
  smartHomeFeature?: string[];
  parkingType?: string[];
  waterSupply?: string[];
  powerBackup?: string[];
  internetConnectivity?: string[];
  legalStatus?: string[];
  additionalFacilities?: string[];
  structure?: string;
  flooring?: {
    living?: string;
    bedroom?: string;
    kitchen?: string;
    bathroom?: string;
  };
  kitchen?: {
    counter?: string;
    cabinets?: string;
    sink?: string;
    fittings?: string;
  };
  toilets?: {
    sanitary?: string;
    fittings?: string;
    shower?: string;
    bathtub?: string;
  };
  electrical?: string;
  doors_windows?: string;
}

export interface FaqProps {
  specifications?: Specifications | null;
}

const Faq = ({ specifications }: FaqProps): JSX.Element => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const generateDynamicFaqs = () => {
    if (!specifications) return [];

    const dynamicFaqs = [];

    // Construction Quality FAQ
    if (specifications.constructionQuality) {
      dynamicFaqs.push({
        q: 'What is the construction quality of this project?',
        a: `This project features ${specifications.constructionQuality} construction quality with ${specifications.structure?.toLowerCase() || 'high-quality materials and modern construction techniques'}.`,
      });
    }

    // Smart Home Features FAQ
    if (
      specifications.smartHomeFeature &&
      specifications.smartHomeFeature.length > 0
    ) {
      const features = specifications.smartHomeFeature
        .join(', ')
        .replace(/_/g, ' ');
      dynamicFaqs.push({
        q: 'What smart home features are available?',
        a: `The project is equipped with modern smart home features including ${features}, providing you with convenience, security, and energy efficiency at your fingertips.`,
      });
    }

    // Power Backup FAQ
    if (specifications.powerBackup && specifications.powerBackup.length > 0) {
      const backupTypes = specifications.powerBackup
        .join(', ')
        .replace(/_/g, ' ');
      dynamicFaqs.push({
        q: 'What kind of power backup is provided?',
        a: `The project offers ${backupTypes} power backup solutions to ensure uninterrupted electricity supply for your daily needs and emergencies.`,
      });
    }

    // Parking FAQ
    if (specifications.parkingType && specifications.parkingType.length > 0) {
      const parkingTypes = specifications.parkingType
        .join(', ')
        .replace(/_/g, ' ');
      dynamicFaqs.push({
        q: 'What parking facilities are available?',
        a: `The project provides ${parkingTypes} parking facilities designed to accommodate multiple vehicles safely and conveniently for all residents.`,
      });
    }

    // Legal Status FAQ
    if (specifications.legalStatus && specifications.legalStatus.length > 0) {
      const legalStatuses = specifications.legalStatus
        .join(', ')
        .replace(/_/g, ' ');
      dynamicFaqs.push({
        q: 'What are the legal clearances and approvals?',
        a: `This project has all necessary legal approvals including ${legalStatuses}, ensuring complete transparency and peace of mind for your investment.`,
      });
    }

    // Flooring FAQ
    if (specifications.flooring) {
      const flooringDetails = Object.entries(specifications.flooring)
        .filter(([_, value]) => value)
        .map(([room, type]) => `${room}: ${type}`)
        .join(', ');

      if (flooringDetails) {
        dynamicFaqs.push({
          q: 'What type of flooring is used in the apartments?',
          a: `The project features premium flooring throughout: ${flooringDetails}. All flooring materials are carefully selected for durability, aesthetics, and easy maintenance.`,
        });
      }
    }

    return dynamicFaqs;
  };

  const dynamicQuestions = generateDynamicFaqs();
  const questions = [...dynamicQuestions];

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
