import {
  Accessible,
  AcUnit,
  Bathtub,
  BeachAccess,
  Bed,
  Chair,
  Deck,
  Dining,
  DirectionsCar,
  DirectionsRun,
  Elevator,
  Event,
  FitnessCenter,
  Forest,
  Games,
  HotTub,
  Kitchen,
  Landscape,
  LibraryBooks,
  LocalActivity,
  LocalAtm,
  LocalCafe,
  LocalFireDepartment,
  LocalGasStation,
  LocalGroceryStore,
  LocalHospital,
  LocalMovies,
  LocalParking,
  LocalPharmacy,
  MedicalServices,
  MeetingRoom,
  MusicNote,
  Nature,
  OutdoorGrill,
  Park,
  Pets,
  Pool,
  Power,
  School,
  Security,
  Spa,
  Sports,
  SportsBasketball,
  SportsCricket,
  SportsGolf,
  SportsSoccer,
  SportsTennis,
  Star,
  Store,
  Thermostat,
  WaterDrop,
  Wifi,
} from '@mui/icons-material';

// Amenity icon mapping function
export const getAmenityIcon = (amenityName: string) => {
  const name = amenityName.toLowerCase().trim();

  // Pool and water-related amenities
  if (name.includes('pool') || name.includes('swimming')) return Pool;
  if (name.includes('jacuzzi') || name.includes('hot tub')) return HotTub;
  if (name.includes('spa') || name.includes('sauna')) return Spa;
  if (name.includes('water') || name.includes('tank')) return WaterDrop;

  // Fitness and sports
  if (name.includes('gym') || name.includes('fitness')) return FitnessCenter;
  if (name.includes('sports') || name.includes('game')) return Sports;
  if (name.includes('basketball')) return SportsBasketball;
  if (name.includes('tennis')) return SportsTennis;
  if (name.includes('cricket')) return SportsCricket;
  if (name.includes('football') || name.includes('soccer')) return SportsSoccer;
  if (name.includes('golf')) return SportsGolf;
  if (name.includes('badminton')) return SportsTennis;
  if (name.includes('table tennis')) return SportsTennis;
  if (name.includes('chess')) return Games;
  if (name.includes('yoga') || name.includes('meditation')) return Spa;
  if (name.includes('jogging') || name.includes('running'))
    return DirectionsRun;

  // Outdoor and garden
  if (name.includes('garden') || name.includes('landscaped')) return Park;
  if (name.includes('park') || name.includes('green')) return Nature;
  if (name.includes('play area') || name.includes('playground'))
    return LocalActivity;
  if (name.includes('children') || name.includes('kids')) return LocalActivity;
  if (name.includes('barbecue') || name.includes('bbq')) return OutdoorGrill;
  if (name.includes('terrace') || name.includes('deck')) return Deck;
  if (name.includes('balcony')) return Deck;
  if (name.includes('landscape')) return Landscape;
  if (name.includes('forest') || name.includes('trees')) return Forest;
  if (name.includes('beach')) return BeachAccess;

  // Security and safety
  if (name.includes('security') || name.includes('guard')) return Security;
  if (name.includes('cctv') || name.includes('surveillance')) return Security;
  if (name.includes('fire') || name.includes('safety'))
    return LocalFireDepartment;
  if (name.includes('intercom')) return Security;

  // Parking and transport
  if (name.includes('parking')) return LocalParking;
  if (name.includes('lift') || name.includes('elevator')) return Elevator;
  if (name.includes('car') || name.includes('vehicle')) return DirectionsCar;

  // Utilities and services
  if (
    name.includes('power') ||
    name.includes('backup') ||
    name.includes('electricity')
  )
    return Power;
  if (name.includes('wifi') || name.includes('internet')) return Wifi;
  if (name.includes('gas') || name.includes('pipeline')) return LocalGasStation;
  if (name.includes('water')) return WaterDrop;

  // Club and community
  if (name.includes('club') || name.includes('community')) return MeetingRoom;
  if (name.includes('party') || name.includes('function')) return Event;
  if (name.includes('library') || name.includes('reading')) return LibraryBooks;
  if (name.includes('cafe') || name.includes('restaurant')) return LocalCafe;

  // Indoor amenities
  if (name.includes('indoor games')) return Games;
  if (name.includes('theater') || name.includes('cinema')) return LocalMovies;
  if (name.includes('music') || name.includes('dance')) return MusicNote;

  // Health and medical
  if (name.includes('medical') || name.includes('health'))
    return MedicalServices;
  if (name.includes('hospital')) return LocalHospital;
  if (name.includes('pharmacy')) return LocalPharmacy;

  // Shopping and daily needs
  if (
    name.includes('shop') ||
    name.includes('store') ||
    name.includes('market')
  )
    return Store;
  if (name.includes('grocery')) return LocalGroceryStore;
  if (name.includes('atm') || name.includes('bank')) return LocalAtm;

  // Education
  if (name.includes('school') || name.includes('college')) return School;

  // Pet and accessibility
  if (name.includes('pet')) return Pets;
  if (name.includes('wheelchair') || name.includes('disabled'))
    return Accessible;

  // Home and living
  if (name.includes('kitchen')) return Kitchen;
  if (name.includes('dining')) return Dining;
  if (name.includes('living')) return Chair;
  if (name.includes('bedroom') || name.includes('bed')) return Bed;
  if (name.includes('bathroom') || name.includes('bath')) return Bathtub;
  if (name.includes('ac') || name.includes('air conditioning')) return AcUnit;
  if (name.includes('heating') || name.includes('heater')) return Thermostat;

  // Default icon for any other amenity
  return Star;
};
