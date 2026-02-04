'use client';

import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import GroupIcon from '@mui/icons-material/Group';
import HomeIcon from '@mui/icons-material/Home';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import { Box, Container, Grid, Typography } from '@mui/material';
import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const stats = [
  {
    icon: <HomeIcon className="text-5xl" />,
    value: 500,
    suffix: '+',
    label: 'Properties Sold',
    color: '#3b82f6',
  },
  {
    icon: <GroupIcon className="text-5xl" />,
    value: 1000,
    suffix: '+',
    label: 'Happy Clients',
    color: '#10b981',
  },
  {
    icon: <EmojiEventsIcon className="text-5xl" />,
    value: 15,
    suffix: '+',
    label: 'Years Experience',
    color: '#f59e0b',
  },
  {
    icon: <LocationCityIcon className="text-5xl" />,
    value: 25,
    suffix: '+',
    label: 'Cities Covered',
    color: '#8b5cf6',
  },
];

interface CounterProps {
  end: number;
  suffix?: string;
  duration?: number;
}

const Counter = ({
  end,
  suffix = '',
  duration = 2,
}: CounterProps): JSX.Element => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const animate = (currentTime: number): void => {
      if (startTime === null) startTime = currentTime;
      const progress = Math.min(
        (currentTime - startTime) / (duration * 1000),
        1
      );
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration, isInView]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};

const Stats = (): JSX.Element => {
  return (
    <Box
      component="section"
      className="relative overflow-hidden py-20"
      // Keep complex gradient in style or move to a custom class in globals.css if preferred
      // Using arbitrary Tailwind values for now to respect user preference for "classname"
      style={{
        background:
          'linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #1e40af 100%)',
      }}
    >
      {/* Animated Background */}
      <Box className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -left-40 -top-40 h-80 w-80 rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </Box>

      <Container maxWidth="lg" className="relative z-10">
        <Grid container spacing={4}>
          {stats.map((stat, index) => (
            <Grid item xs={6} md={3} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Box className="text-center">
                  <motion.div
                    className="mb-6 inline-flex h-24 w-24 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Box className="text-white">{stat.icon}</Box>
                  </motion.div>
                  <Typography
                    variant="h2"
                    className="mb-2 text-4xl font-bold text-white md:text-[3.5rem]"
                  >
                    <Counter end={stat.value} suffix={stat.suffix} />
                  </Typography>
                  <Typography
                    variant="h6"
                    className="font-medium text-white/80"
                  >
                    {stat.label}
                  </Typography>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Stats;
