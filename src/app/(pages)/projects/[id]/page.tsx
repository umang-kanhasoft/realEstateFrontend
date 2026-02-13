'use client';

import Loader from '@/components/common/Loader';
import PropertyDetailsTemplate from '@/components/templates/PropertyDetailsTemplate';
import { ProjectsService } from '@/services/projects.service';
import { ApiProjectDetail, ApiProjectObject } from '@/types';
import { Box, Button, Typography } from '@mui/material';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

export default function ProjectPage() {
  const { id } = useParams();
  const router = useRouter();

  const [projectData, setProjectData] = useState<ApiProjectDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [similarProjectData, setSimilarProjectData] = useState<
    ApiProjectObject[]
  >([]);
  const [otherProjectData, setOtherProjectData] = useState<ApiProjectObject[]>(
    []
  );

  // Fetch primary project data
  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const project = await ProjectsService.getProjectById(id as string);
        // Cast or transform if necessary, assuming ProjectData is compatible with ApiProjectDetail
        setProjectData(project.project as unknown as ApiProjectDetail);
      } catch (error) {
        console.error('Failed to fetch project:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProject();
    }
  }, [id]);

  // Fetch similar/related projects — uses separate loading state
  const fetchRelatedProjects = useCallback(async (data: ApiProjectDetail) => {
    try {
      const [similarProjectsRes, otherProjectsRes] = await Promise.all([
        ProjectsService.getProjects({
          priceMin: Number(data.pricingAndInventory?.priceRange?.minPrice) || 0,
          priceMax: Number(data.pricingAndInventory?.priceRange?.maxPrice) || 0,
          area: data.location?.locality || undefined,
        }),
        ProjectsService.getProjects({
          builder: data.projectInfo?.developer?.[0]?.id || undefined,
        }),
      ]);

      setSimilarProjectData(similarProjectsRes.projects);
      setOtherProjectData(otherProjectsRes.projects);
    } catch (error) {
      console.error('Failed to fetch related projects:', error);
    }
  }, []);

  useEffect(() => {
    if (projectData) {
      fetchRelatedProjects(projectData);
    }
  }, [projectData, fetchRelatedProjects]);

  if (loading) return <Loader text="Fetching property details..." />;
  if (!projectData)
    return (
      <Box p={4} textAlign="center">
        <Typography variant="h5">Project not found</Typography>
        <Button onClick={() => router.back()} sx={{ mt: 2 }}>
          Go Back
        </Button>
      </Box>
    );

  return (
    <PropertyDetailsTemplate
      propertyData={projectData}
      similarProjects={similarProjectData}
      otherProjects={otherProjectData}
    />
  );
}
