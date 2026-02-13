'use client';

import { BuilderNews as BuilderNewsType } from '@/types/builder.types';
import { Launch, Newspaper } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

interface BuilderNewsProps {
  news: BuilderNewsType[];
}

export default function BuilderNews({ news }: BuilderNewsProps) {
  if (!news || news.length === 0) {
    return null;
  }

  return (
    <Container maxWidth="xl" sx={{ py: 2 }}>
      <Stack spacing={4}>
        <Box sx={{ textAlign: 'left', mb: 2 }}>
          <Typography
            variant="h3"
            className="mb-2 text-3xl font-extrabold text-slate-900 md:text-4xl"
          >
            Latest News & Updates
          </Typography>
          <Typography variant="h6" className="font-normal text-slate-500">
            Recent media coverage and announcements
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {news.slice(0, 6).map((item, index) => (
            <Grid item xs={12} md={6} lg={4} key={item.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card
                  className="flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:border-slate-300 hover:shadow-lg"
                  variant="outlined"
                >
                  <Box sx={{ p: 1.5 }}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      mb={2}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          color: 'primary.main',
                        }}
                      >
                        <Newspaper fontSize="small" />
                        <Typography
                          variant="caption"
                          fontWeight={700}
                          className="uppercase tracking-wider"
                        >
                          {item.source}
                        </Typography>
                      </Box>
                      <Typography variant="caption" color="text.secondary">
                        {format(new Date(item.publishedAt), 'MMM d, yyyy')}
                      </Typography>
                    </Stack>

                    <Typography
                      variant="h6"
                      fontWeight={700}
                      className="mb-3 line-clamp-3 text-slate-800"
                      sx={{ minHeight: '4.5rem' }}
                    >
                      {item.title}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      p: 1,
                      px: 2.5,
                      borderTop: '1px solid',
                      borderColor: 'divider',
                      bgcolor: 'grey.50',
                    }}
                  >
                    <Button
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      endIcon={<Launch fontSize="small" />}
                      className="text-sm font-bold text-slate-600 hover:bg-transparent hover:text-primary-600 hover:shadow-none"
                      fullWidth
                      sx={{ justifyContent: 'space-between', px: 0 }}
                    >
                      Read Full Article
                    </Button>
                  </Box>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Container>
  );
}
