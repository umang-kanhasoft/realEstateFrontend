import { ApiProjectDetail, ApiProjectListItem, Property } from '@/types';
import { ConstructionStatus, LandmarkType } from '@/types/enums';

const mapBackendStatusToUiStatus = (status: string): Property['status'] => {
  switch (status) {
    case ConstructionStatus.UNDER_CONSTRUCTION:
    case ConstructionStatus.NEARING_COMPLETION:
      return 'Under Construction'; // Keep UI string as is for now, or use mapped value
    case ConstructionStatus.READY_TO_MOVE:
      return 'Ready to Move';
    case ConstructionStatus.NEW_LAUNCH:
      return 'New Launch';
    default:
      return 'New Launch';
  }
};

export const mapProjectToProperty = (project: ApiProjectListItem): Property => {
  const unitTypeLabel = project.unitTypes?.[0]?.label;
  const image = project.mainImageUrl || 'property-luxury';

  return {
    id: project.id,
    title: project.name,
    builder: project.builder?.name || 'Unknown Builder',
    builderId: project.builder?.id || '',
    location: project.locality || project.area || project.city,
    area: project.locality || project.city,
    price: project.priceStartingFrom || 0,
    pricePerSqFt: project.pricePerSqFt || 0,
    type: (unitTypeLabel as Property['type']) || '3BHK',
    size: project.size || project.unitTypes?.[0]?.carpetAreaSqft || 0,
    status: mapBackendStatusToUiStatus(project.status),
    possessionDate: project.possessionDate || '',
    images: [image],
    amenities: project.amenities || [],
    ecoFriendly: !!project.ecoFriendly,
    nearbyTransport: [],
    schools: [],
    hospitals: [],
    parks: [],
    reraId: project.reraNumber || '',
    rating: project.avgRating || 0,
    reviews: project.totalReviews || 0,
    completionTime: project.completionTime || 0,
    description: '',
    floorPlans: [],
  };
};

export const mapProjectDetailToProperty = (
  project: ApiProjectDetail
): Property => {
  const allAmenities = [
    ...(project.amenities.leisure || []),
    ...(project.amenities.safety || []),
    ...(project.amenities.health || []),
    ...(project.amenities.environment || []),
    ...(project.amenities.convenience || []),
    ...(project.amenities.sports || []),
    ...(project.amenities.kids || []),
  ];

  const images = [
    ...(project.media.thumbnail ? [project.media.thumbnail] : []),
    ...(project.media.images || []).map(i => i.url),
  ];

  const price = project.pricingAndInventory.priceRange.minPrice ?? 0;

  const transport = project.location.landmarks
    .filter(l =>
      [
        LandmarkType.TRANSPORT,
        LandmarkType.METRO,
        LandmarkType.AIRPORT,
      ].includes(String(l.type).toLowerCase() as LandmarkType)
    )
    .map(l => l.name);

  const schools = project.location.landmarks
    .filter(l => String(l.type).toLowerCase() === LandmarkType.SCHOOL)
    .map(l => l.name);

  const hospitals = project.location.landmarks
    .filter(l => String(l.type).toLowerCase() === LandmarkType.HOSPITAL)
    .map(l => l.name);

  const parks = project.location.landmarks
    .filter(l => String(l.type).toLowerCase() === LandmarkType.PARK)
    .map(l => l.name);

  const firstConfig = project.pricingAndInventory.configurations?.[0];
  const typeLabel = firstConfig?.label;

  return {
    id: project.id,
    title: project.projectInfo.name,
    builder: project.projectInfo.developer?.name || '',
    builderId: project.projectInfo.developer?.id || '',
    location:
      project.location.sector ||
      project.location.addressLine2 ||
      project.location.city,
    area: project.location.sector || project.location.city,
    price,
    pricePerSqFt: project.pricingAndInventory.avgPricePerSqft ?? 0,
    type: (typeLabel as Property['type']) || '3BHK',
    size:
      firstConfig?.carpetAreaSqft ?? project.projectInfo.totalArea.value ?? 0,
    status: mapBackendStatusToUiStatus(project.projectInfo.status),
    possessionDate: project.projectInfo.possessionDate ?? '',
    images: images.length > 0 ? images : ['property-luxury'],
    amenities: Array.from(new Set(allAmenities)).filter((a): a is string =>
      Boolean(a)
    ),
    ecoFriendly: false,
    nearbyTransport: transport,
    schools,
    hospitals,
    parks,
    reraId: project.projectInfo.reraId ?? '',
    rating: project.projectInfo.avgRating || 0,
    reviews: project.projectInfo.totalReviews || 0,
    completionTime: 0,
    description: project.projectInfo.description ?? '',
    floorPlans: (project.pricingAndInventory.configurations || [])
      .map(c => c.floorPlanUrl)
      .filter((v): v is string => Boolean(v)),
  };
};
