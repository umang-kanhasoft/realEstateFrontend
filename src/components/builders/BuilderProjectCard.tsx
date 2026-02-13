'use client';

import { BuilderProject } from '@/types/builder.types';
import {
  Apartment,
  Business,
  CalendarToday,
  LocationOn,
  Map,
  Villa,
} from '@mui/icons-material';
import { Box, Card, Chip, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

interface BuilderProjectCardProps {
  project: BuilderProject;
}

export default function BuilderProjectCard({
  project,
}: BuilderProjectCardProps) {
  const statusLabel = (s: string) => {
    const map: Record<string, string> = {
      ready_to_move: 'Ready to Move',
      new_launch: 'New Launch',
      under_construction: 'Under Construction',
    };
    return map[s] ?? s;
  };

  const statusColor = (s: string): 'success' | 'warning' | 'info' => {
    const map: Record<string, 'success' | 'warning' | 'info'> = {
      ready_to_move: 'success',
      new_launch: 'warning',
      under_construction: 'info',
    };
    return map[s] ?? 'info';
  };

  const propIcon = (t: string) => {
    const p = { fontSize: 'small' as const };
    return (
      {
        villa: <Villa {...p} />,
        plot: <Map {...p} />,
        commercial: <Business {...p} />,
      }[t] ?? <Apartment {...p} />
    );
  };

  const fmtDate = (d: string) =>
    new Date(d).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

  return (
    <Link href={`/projects/${project.id}`}>
      <Card
        elevation={0}
        className="group"
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 1,
          cursor: 'pointer',
          border: '1px solid #e2e8f0',
          overflow: 'hidden',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 12px 24px -12px rgba(0,0,0,0.1)',
            borderColor: '#cbd5e1',
          },
        }}
      >
        {/* Image Area - Reduced height */}
        <Box
          sx={{
            position: 'relative',
            height: 180,
            overflow: 'hidden',
          }}
        >
          <Image
            src={project.mainImageUrl || '/api/placeholder/600/400'}
            alt={project.name}
            fill
            className="transition-transform duration-700 group-hover:scale-105"
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)',
            }}
          />

          {/* Badges - Smaller */}
          <Box sx={{ position: 'absolute', top: 12, right: 12 }}>
            <Chip
              label={statusLabel(project.status)}
              color={statusColor(project.status)}
              size="small"
              sx={{
                fontWeight: 700,
                textTransform: 'uppercase',
                fontSize: '0.65rem',
                height: 20,
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
              }}
            />
          </Box>

          <Stack
            direction="row"
            alignItems="center"
            spacing={0.5}
            sx={{
              position: 'absolute',
              bottom: 12,
              left: 12,
              color: '#fff',
            }}
          >
            {propIcon(project.propertyType)}
            <Typography
              variant="caption"
              fontWeight={600}
              sx={{
                textTransform: 'capitalize',
                fontSize: '0.75rem',
                textShadow: '0 1px 2px rgba(0,0,0,0.5)',
              }}
            >
              {project.propertyType?.replace('_', ' ')}
            </Typography>
          </Stack>
        </Box>

        {/* Content Area - Reduced Padding */}
        <Box
          sx={{
            p: 2,
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography
            variant="subtitle1"
            fontWeight={700}
            noWrap
            sx={{ color: '#0f172a', mb: 1, fontSize: '0.95rem' }}
          >
            {project.name}
          </Typography>

          <Stack spacing={1} sx={{ mb: 2 }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <LocationOn sx={{ fontSize: 16, color: '#94a3b8' }} />
              <Typography variant="caption" sx={{ color: '#64748b' }} noWrap>
                {project.area}, {project.city}
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <CalendarToday sx={{ fontSize: 16, color: '#94a3b8' }} />
              <Typography variant="caption" sx={{ color: '#64748b' }}>
                Possession: {fmtDate(project.possessionDate)}
              </Typography>
            </Stack>
          </Stack>
        </Box>
      </Card>
    </Link>
  );
}
