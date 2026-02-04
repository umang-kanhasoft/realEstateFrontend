export enum UserRole {
  ADMIN = 'admin',
  BUILDER = 'builder',
  BUYER = 'buyer',
  AUTHOR = 'author',
  CUSTOMER = 'customer',
}

export enum SubscriptionType {
  MARKET_INSIGHTS = 'market_insights',
  PRICE_ALERTS = 'price_alerts',
  NEWS_UPDATES = 'news_updates',
}

export enum SubscriptionStatus {
  ACTIVE = 'active',
  PAUSED = 'paused',
  EXPIRED = 'expired',
  CANCELED = 'canceled',
}

export enum AreaDemandLevel {
  HIGH = 'High',
  MEDIUM = 'Medium',
  LOW = 'Low',
}

export enum PropertyType {
  APARTMENT = 'apartment',
  BUNGALOW = 'bungalow',
  VILLA = 'villa',
  PLOT = 'plot',
  COMMERCIAL = 'commercial',
  MIXED_USE = 'mixed_use',
  PENTHOUSE = 'penthouse',
}

export enum ConstructionStatus {
  NEW_LAUNCH = 'new_launch',
  UNDER_CONSTRUCTION = 'under_construction',
  NEARING_COMPLETION = 'nearing_completion',
  READY_TO_MOVE = 'ready_to_move',
  SOLD_OUT = 'sold_out',
}

export enum ConstructionQuality {
  PREMIUM = 'premium',
  STANDARD = 'standard',
  BUDGET = 'budget',
  LUXURY = 'luxury',
}

export enum ArchitecturalStyle {
  MODERN = 'modern',
  CONTEMPORARY = 'contemporary',
  TRADITIONAL = 'traditional',
  COLONIAL = 'colonial',
  MINIMALIST = 'minimalist',
  MEDITERRANEAN = 'mediterranean',
}

export enum FurnishingStatus {
  FULLY_FURNISHED = 'fully_furnished',
  SEMI_FURNISHED = 'semi_furnished',
  UNFURNISHED = 'unfurnished',
}

export enum InteriorCondition {
  BRAND_NEW = 'brand_new',
  EXCELLENT = 'excellent',
  GOOD = 'good',
  NEEDS_RENOVATION = 'needs_renovation',
}

export enum ViewType {
  PARK_VIEW = 'park_view',
  ROAD_VIEW = 'road_view',
  CITY_VIEW = 'city_view',
  GARDEN_VIEW = 'garden_view',
  POOL_VIEW = 'pool_view',
  OPEN_VIEW = 'open_view',
}

export enum SmartHomeFeature {
  SMART_LOCK = 'smart_lock',
  VOICE_CONTROL = 'voice_control',
  SMART_LIGHTING = 'smart_lighting',
  CLIMATE_CONTROL = 'climate_control',
  SECURITY_CAMERAS = 'security_cameras',
  SMART_APPLIANCES = 'smart_appliances',
}

export enum ParkingType {
  COVERED = 'covered',
  OPEN = 'open',
  GROUND = 'ground',
  UNDERGROUND = 'underground',
  MULTI_LEVEL = 'multi_level',
}

export enum WaterSupply {
  MUNICIPAL = 'municipal',
  BOREWELL = 'borewell',
  BOTH = 'both',
  '24_7_SUPPLY' = '24_7_supply',
}

export enum PowerBackup {
  FULL_BACKUP = 'full_backup',
  PARTIAL_BACKUP = 'partial_backup',
  DG_BACKUP = 'dg_backup',
  SOLAR = 'solar',
  NO_BACKUP = 'no_backup',
}

export enum InternetConnectivity {
  FIBER_INTERNET_READY = 'fiber_internet_ready',
  CABLE_TV_READY = 'cable_tv_ready',
}

export enum LegalStatus {
  CLEAR_TITLE = 'clear_title',
  RERA_APPROVED = 'rera_approved',
  BANK_APPROVED = 'bank_approved',
  ALL_CLEAR = 'all_clear',
}

export enum AdditionalFacilities {
  CORNER_PROPERTY = 'corner_property',
  EV_CHARGING_AVAILABLE = 'ev_charging_available',
  PET_FRIENDLY = 'pet_friendly',
  VAASTU_COMPLIANT = 'vaastu_compliant',
}

export enum FacingDirection {
  NORTH = 'north',
  SOUTH = 'south',
  EAST = 'east',
  WEST = 'west',
  NORTH_EAST = 'north_east',
  NORTH_WEST = 'north_west',
  SOUTH_EAST = 'south_east',
  SOUTH_WEST = 'south_west',
}

export enum LandmarkType {
  TRANSPORT = 'transport',
  SCHOOL = 'school',
  HOSPITAL = 'hospital',
  PARK = 'park',
  RETAIL = 'retail',
  RESTAURANT = 'restaurant',
  RELIGIOUS = 'religious',
  METRO = 'metro',
  AIRPORT = 'airport',
  MALL = 'mall',
  OFFICE_HUB = 'office_hub',
}

export enum AmenityCategory {
  LEISURE = 'leisure',
  ENVIRONMENT = 'environment',
  SAFETY = 'safety',
  HEALTH = 'health',
  CONVENIENCE = 'convenience',
  SPORTS = 'sports',
  KIDS = 'kids',
}

export enum ProjectMediaType {
  IMAGE = 'image',
  VIDEO = 'video',
  DOCUMENT = 'document',
}

export enum ContentType {
  BLOG = 'blog',
  NEWS = 'news',
  MARKET_UPDATE = 'market_update',
  PROJECT_UPDATE = 'project_update',
  LEGAL_GUIDE = 'legal_guide',
}

export enum ReviewTargetType {
  PROJECT = 'project',
  BUILDER = 'builder',
}

export enum TokenTypes {
  ACCESS = 'access',
  REFRESH = 'refresh',
}

export enum UserTokenType {
  EMAIL_VERIFICATION = 'email_verification',
  PASSWORD_RESET = 'password_reset',
}
