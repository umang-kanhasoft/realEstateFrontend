'use client';

import { useUI } from '@/hooks/useUI';
import { areaService, AreaStats } from '@/services/area.service';
import { ProjectsService } from '@/services/projects.service';
import { Box, Container, Grid, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Footer = (): JSX.Element | null => {
  const { state } = useUI();

  const router = useRouter();

  const [areas, setAreas] = useState<AreaStats[]>([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);

  const { data } = useQuery({
    queryKey: ['footer-projects'],
    queryFn: () =>
      ProjectsService.getProjects({
        isFeatured: true,
        limit: 10,
        sortBy: 'price',
        sortOrder: 'desc',
      }),
  });

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        // setIsLoading(true);
        const response = await areaService.getAreas({
          limit: 5,
          offset: 0,
          sortBy: 'property_count',
          sortOrder: 'desc',
        });

        if (response.status === 'success' && response.data?.areas) {
          setAreas(response.data.areas);
        }
      } catch (err) {
        console.error('Failed to fetch areas:', err);
        // setError('Failed to load neighborhoods');
      }
    };

    fetchAreas();
  }, []);

  if (!state.isFooterVisible) return null;

  return (
    <Box
      component="footer"
      className="border-t border-gray-200 bg-white pb-8 pt-16"
    >
      <Container maxWidth="xl">
        <Grid container spacing={8}>
          <Grid item xs={12} md={4}>
            <Typography
              variant="h5"
              className="mb-4 font-black text-primary-600"
            >
              Real Estate
            </Typography>
            <Typography
              variant="body2"
              className="max-w-[300px] leading-relaxed text-gray-500"
            >
              A trustworthy one stop solution for all your property needs. We
              ensure you buy / rent property that meets all your requirements.
            </Typography>
          </Grid>

          {/* <Grid item xs={6} md={2}>
            <Typography className="mb-4 font-bold text-gray-900">
              Quick Links
            </Typography>
            {['Home', 'About Us', 'Career', 'Blogs', 'FAQs'].map(l => (
              <Typography
                key={l}
                variant="body2"
                className="mb-2 cursor-pointer text-gray-600 transition-colors hover:text-primary-600"
                onClick={() => router.push('/')}
              >
                {l}
              </Typography>
            ))}
          </Grid> */}

          <Grid item xs={6} md={2}>
            <Typography className="mb-4 font-bold text-gray-900">
              Trending Projects
            </Typography>
            {data?.projects?.slice(0, 5).map(l => (
              <Typography
                key={l.id}
                variant="body2"
                className="mb-2 cursor-pointer text-gray-600 transition-colors hover:text-primary-600"
                onClick={() => router.push('/projects/' + l.id)}
              >
                {l.name}
              </Typography>
            ))}
          </Grid>

          <Grid item xs={6} md={2}>
            <Typography className="mb-4 font-bold text-gray-900">
              Popular Searches
            </Typography>
            {areas?.slice(0, 5).map(l => (
              <Typography
                key={l.id}
                variant="body2"
                className="mb-2 cursor-pointer text-gray-600 transition-colors hover:text-primary-600"
                onClick={() => router.push(`/projects?area=${l.name}`)}
              >
                Property in {l.name}
              </Typography>
            ))}
          </Grid>

          <Grid item xs={6} md={2}>
            <Typography className="mb-4 font-bold text-gray-900">
              Popular BHK Searches
            </Typography>
            {[1, 2, 3, 4].map(l => (
              <Typography
                key={l}
                variant="body2"
                className="mb-2 cursor-pointer text-gray-600 transition-colors hover:text-primary-600"
                onClick={() => router.push(`/projects?bhk=${l}`)}
              >
                {l} BHK Flats in Ahmedabad
              </Typography>
            ))}
          </Grid>

          <Grid item xs={6} md={2}>
            <Typography className="mb-4 font-bold text-gray-900">
              Property Types
            </Typography>
            {['Apartment', 'Villa', 'Plot', 'Commercial'].map(l => (
              <Typography
                key={l}
                variant="body2"
                className="mb-2 cursor-pointer text-gray-600 transition-colors hover:text-primary-600"
                onClick={() =>
                  router.push(`/projects?propertyType=${l.toLowerCase()}`)
                }
              >
                {l} in Ahmedabad
              </Typography>
            ))}
          </Grid>

          {/* <Grid item xs={12} md={4}>
            <Typography className="mb-4 font-bold text-gray-900">
              Connect with Us
            </Typography>
            <Typography variant="body2" className="mb-1 text-gray-600">
              +91 99984 70000
            </Typography>
            <Typography variant="body2" className="mb-4 text-gray-600">
              info@realestate.in
            </Typography>
            <Stack direction="row" spacing={1}>
              {[Facebook, Instagram, LinkedIn, X, YouTube].map(
                (Icon, index) => (
                  <IconButton
                    key={index}
                    size="small"
                    className="text-gray-500 transition-all duration-300 hover:-translate-y-1 hover:bg-transparent hover:text-primary-600"
                  >
                    <Icon />
                  </IconButton>
                )
              )}
            </Stack>
          </Grid> */}
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
