'use client';
import { ArrowOutward } from '@mui/icons-material';
import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material';

const localities = [
  {
    name: 'Science City',
    image:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    count: '45+ Projects',
    size: 6, // Grid xs size
  },
  {
    name: 'Ambli',
    image:
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    count: '28+ Projects',
    size: 3,
  },
  {
    name: 'Shela',
    image:
      'https://images.unsplash.com/photo-1574958269340-fa927503f3dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    count: '32+ Projects',
    size: 3,
  },
  {
    name: 'Zundal',
    image:
      'https://images.unsplash.com/photo-1448630360428-65456885c650?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    count: '15+ Projects',
    size: 4,
  },
  {
    name: 'Vaishnodevi',
    image:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    count: '30+ Projects',
    size: 8,
  },
];

export default function NewProjects() {
  return (
    <Container maxWidth="xl" className="my-32">
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'start', md: 'end' }}
        className="mb-12"
      >
        <Box>
          <Typography
            variant="overline"
            className="font-extrabold tracking-[1.5px] text-primary-600"
          >
            CURATED LOCATIONS
          </Typography>
          <Typography
            variant="h3"
            className="mt-2 font-extrabold text-gray-900"
          >
            Explore Prime Neighborhoods<span className="text-sky-500">.</span>
          </Typography>
        </Box>
        <Button
          endIcon={
            <ArrowOutward className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
          }
          className="group text-base font-semibold normal-case text-gray-900 hover:bg-transparent hover:text-primary-600"
        >
          View map
        </Button>
      </Stack>

      <Grid container spacing={3}>
        {localities.map((item, index) => (
          <Grid item xs={12} md={item.size} key={index}>
            <Box className="duration-400 group relative h-[320px] cursor-pointer overflow-hidden rounded-[20px] transition-transform ease-in-out hover:-translate-y-2 md:rounded-[32px]">
              <Box
                className="bg-image absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-in-out group-hover:scale-110"
                sx={{ backgroundImage: `url(${item.image})` }}
              />
              <Box className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-90 transition-opacity duration-300" />

              <Box className="absolute bottom-0 left-0 z-10 w-full p-8">
                <Typography
                  variant="h5"
                  className="mb-2 font-bold text-white drop-shadow-md"
                >
                  {item.name}
                </Typography>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Box className="h-2 w-2 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8]" />
                  <Typography
                    variant="subtitle2"
                    className="font-medium text-white/90 drop-shadow-sm"
                  >
                    {item.count}
                  </Typography>
                </Stack>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
