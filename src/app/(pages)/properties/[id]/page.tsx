'use client';

import Loader from '@/components/common/Loader';
import PropertyDetailsTemplate from '@/components/templates/PropertyDetailsTemplate';
import { propertyService } from '@/services/property.service';
import { ApiProjectDetail } from '@/types';
import { Box, Button, Typography } from '@mui/material';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PropertyDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [propertyData, setPropertyData] = useState<ApiProjectDetail | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        if (id) {
          const response = await propertyService.getPropertyById(id as string);
          if (response.data && response.data.project) {
            setPropertyData(response.data.project);
          }
        }
      } catch (error) {
        console.error('Failed to fetch property:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) return <Loader text="Fetching property details..." />;
  if (!propertyData)
    return (
      <Box p={4} textAlign="center">
        <Typography variant="h5">Property not found</Typography>
        <Button onClick={() => router.back()} sx={{ mt: 2 }}>
          Go Back
        </Button>
      </Box>
    );

  return <PropertyDetailsTemplate propertyData={propertyData} />;
}
