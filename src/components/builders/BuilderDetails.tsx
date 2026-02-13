'use client';

import BuilderAccolades from '@/components/builders/BuilderAccolades';
import BuilderHero from '@/components/builders/BuilderHero';
import BuilderNews from '@/components/builders/BuilderNews';
import BuilderProfile from '@/components/builders/BuilderProfile';
import BuilderProjects from '@/components/builders/BuilderProjects';
import { BuilderService } from '@/services/builder.service';
import { Builder, BuilderNews as BuilderNewsType } from '@/types/builder.types';
import { Business } from '@mui/icons-material';
import { Box, CircularProgress, Container, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

interface BuilderPageProps {
  params: { id: string };
}

export default function BuilderPage({ params }: BuilderPageProps) {
  const [builder, setBuilder] = useState<Builder | null>(null);
  const [news, setNews] = useState<BuilderNewsType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const builderData = await BuilderService.getBuilderById(params.id);
        setBuilder(builderData);

        // Fetch news
        if (builderData?.name) {
          try {
            // First check DB
            let newsData = await BuilderService.getBuilderNews(
              builderData.name
            );
            // If empty, sync from external API
            if (!newsData || newsData.length === 0) {
              console.log('No news found in DB, syncing...');
              newsData = await BuilderService.syncNews(builderData.name);
            }

            setNews(newsData);
          } catch (error) {
            console.error('Error fetching news:', error);
          }
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [params.id]);

  /* ── loading ── */
  if (loading)
    return (
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: '#f8fafc',
          gap: 2,
        }}
      >
        <CircularProgress size={48} sx={{ color: '#0f172a' }} />
        <Typography sx={{ color: '#64748b', fontWeight: 500 }}>
          Loading Builder Details…
        </Typography>
      </Box>
    );

  /* ── not found ── */
  if (!builder)
    return (
      <Container maxWidth="md" sx={{ py: 14, textAlign: 'center' }}>
        <Business sx={{ fontSize: 80, color: '#cbd5e1', mb: 2 }} />
        <Typography variant="h5" fontWeight={700} sx={{ color: '#0f172a' }}>
          Builder not found
        </Typography>
        <Typography sx={{ color: '#64748b', mt: 1 }}>
          The builder you&rsquo;re looking for doesn&rsquo;t exist.
        </Typography>
      </Container>
    );

  return (
    <Box sx={{ bgcolor: '#F8FAFC', minHeight: '100vh', pb: 8 }}>
      <BuilderHero />
      <BuilderProfile builder={builder} />
      <BuilderAccolades
        awards={builder.awards || []}
        certificates={builder.certificates || []}
      />
      {builder.projects?.length > 0 && (
        <BuilderProjects projects={builder.projects || []} />
      )}
      <BuilderNews news={news} />
    </Box>
  );
}
