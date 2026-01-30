import { ApiProjectListItem, Property } from '@/types';

export const mapBackendStatusToUiStatus = (status: string): Property['status'] => {
  switch (status) {
    case 'under_construction':
    case 'nearing_completion':
      return 'Under Construction';
    case 'ready_to_move':
      return 'Ready to Move';
    case 'new_launch':
      return 'New Launch';
    default:
      return 'New Launch';
  }
};

export const mapProjectListItemToProperty = (project: ApiProjectListItem): Property => {
  const unitTypeLabel = project.unitTypes?.[0]?.label;
  const image = project.mainImageUrl || 'property-luxury';

  return {
    id: project.id,
    title: project.name,
    builder: project.builder?.name || '',
    builderId: project.builder?.id || '',
    location: project.locality || project.area || project.city,
    area: project.area,
    price: project.priceStartingFrom ?? 0,
    pricePerSqFt: project.pricePerSqFt ?? 0,
    type: (unitTypeLabel as Property['type']) || '3BHK',
    size: project.size ?? project.unitTypes?.[0]?.carpetAreaSqft ?? 0,
    status: mapBackendStatusToUiStatus(project.status),
    possessionDate: project.possessionDate ?? '',
    images: [image],
    amenities: project.amenities ?? [],
    ecoFriendly: project.ecoFriendly,
    nearbyTransport: [],
    schools: [],
    hospitals: [],
    parks: [],
    reraId: project.reraNumber ?? '',
    rating: project.avgRating ?? 0,
    reviews: project.totalReviews ?? 0,
    completionTime: project.completionTime ?? 0,
    description: '',
    floorPlans: [],
    unitType: project.unitTypes,
  };
};
