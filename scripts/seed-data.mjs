import mysql from 'mysql2/promise';

// Database connection
const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('DATABASE_URL not set');
  process.exit(1);
}

const connection = await mysql.createConnection(DATABASE_URL);

console.log('🚀 Starting bulk data generation...');

// ============================================
// HELPER FUNCTIONS
// ============================================
const europeanCountries = [
  { name: 'Germany', code: 'DE', cities: ['Berlin', 'Munich', 'Hamburg', 'Frankfurt', 'Cologne', 'Stuttgart', 'Düsseldorf', 'Leipzig'] },
  { name: 'France', code: 'FR', cities: ['Paris', 'Lyon', 'Marseille', 'Toulouse', 'Nice', 'Nantes', 'Strasbourg', 'Bordeaux'] },
  { name: 'Netherlands', code: 'NL', cities: ['Amsterdam', 'Rotterdam', 'The Hague', 'Utrecht', 'Eindhoven', 'Tilburg', 'Groningen'] },
  { name: 'Spain', code: 'ES', cities: ['Madrid', 'Barcelona', 'Valencia', 'Seville', 'Zaragoza', 'Málaga', 'Bilbao'] },
  { name: 'Italy', code: 'IT', cities: ['Rome', 'Milan', 'Naples', 'Turin', 'Palermo', 'Genoa', 'Bologna', 'Florence'] },
  { name: 'Poland', code: 'PL', cities: ['Warsaw', 'Kraków', 'Łódź', 'Wrocław', 'Poznań', 'Gdańsk', 'Szczecin'] },
  { name: 'Belgium', code: 'BE', cities: ['Brussels', 'Antwerp', 'Ghent', 'Charleroi', 'Liège', 'Bruges'] },
  { name: 'Austria', code: 'AT', cities: ['Vienna', 'Graz', 'Linz', 'Salzburg', 'Innsbruck'] },
  { name: 'Sweden', code: 'SE', cities: ['Stockholm', 'Gothenburg', 'Malmö', 'Uppsala', 'Västerås'] },
  { name: 'Switzerland', code: 'CH', cities: ['Zurich', 'Geneva', 'Basel', 'Bern', 'Lausanne'] },
  { name: 'United Kingdom', code: 'GB', cities: ['London', 'Birmingham', 'Manchester', 'Glasgow', 'Liverpool', 'Leeds', 'Sheffield'] },
  { name: 'Ireland', code: 'IE', cities: ['Dublin', 'Cork', 'Limerick', 'Galway', 'Waterford'] },
  { name: 'Portugal', code: 'PT', cities: ['Lisbon', 'Porto', 'Braga', 'Coimbra', 'Faro'] },
  { name: 'Czech Republic', code: 'CZ', cities: ['Prague', 'Brno', 'Ostrava', 'Pilsen'] },
  { name: 'Denmark', code: 'DK', cities: ['Copenhagen', 'Aarhus', 'Odense', 'Aalborg'] },
];

const northAmericanCountries = [
  { name: 'USA', code: 'US', cities: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose', 'Austin', 'Jacksonville', 'Fort Worth', 'Columbus', 'Charlotte', 'Indianapolis', 'Seattle', 'Denver', 'Boston', 'Nashville', 'Detroit', 'Portland', 'Memphis', 'Oklahoma City', 'Las Vegas', 'Louisville', 'Baltimore', 'Milwaukee', 'Albuquerque', 'Tucson'] },
  { name: 'Canada', code: 'CA', cities: ['Toronto', 'Montreal', 'Vancouver', 'Calgary', 'Edmonton', 'Ottawa', 'Winnipeg', 'Quebec City', 'Hamilton', 'Kitchener', 'London', 'Halifax', 'Victoria', 'Saskatoon', 'Regina'] },
  { name: 'Mexico', code: 'MX', cities: ['Mexico City', 'Guadalajara', 'Monterrey', 'Puebla', 'Tijuana', 'León', 'Juárez', 'Cancún'] },
];

const schoolNamePrefixes = ['Premier', 'Elite', 'Professional', 'National', 'Regional', 'Advanced', 'Expert', 'Master', 'Pro', 'Academy', 'Institute', 'Center', 'School'];
const schoolNameSuffixes = ['Truck Academy', 'CDL Training', 'Driving School', 'Transport Training', 'Commercial Driving', 'Trucking Institute', 'Driver Training', 'Heavy Vehicle School', 'Professional Drivers'];

const services = [
  'CDL Class A', 'CDL Class B', 'Hazmat Endorsement', 'Tanker Endorsement', 'Air Brakes',
  'Passenger Endorsement', 'Double/Triple Trailers', 'Job Placement', 'Refresher Course',
  'Night Classes', 'Weekend Classes', 'Simulator Training', 'Road Test Prep', 'Permit Test Prep'
];

const euroServices = [
  'Permis C', 'Permis CE', 'Permis D', 'FIMO', 'FCO', 'ADR', 'Code 95',
  'Rijbewijs C', 'Rijbewijs CE', 'CAP', 'CPC Training', 'Tachograph Training'
];

const jobTitles = [
  'Long Haul Truck Driver', 'Regional Truck Driver', 'Local Delivery Driver', 'OTR Driver',
  'Flatbed Driver', 'Tanker Driver', 'Refrigerated Truck Driver', 'Heavy Haul Driver',
  'Team Driver', 'Owner Operator', 'Yard Jockey', 'Shuttle Driver', 'LTL Driver',
  'Dedicated Route Driver', 'Intermodal Driver', 'Auto Hauler', 'Hazmat Driver',
  'Dump Truck Driver', 'Concrete Mixer Driver', 'Logging Truck Driver'
];

const companies = [
  'TransGlobal Logistics', 'Swift Transport', 'Prime Freight', 'Werner Enterprises',
  'Schneider National', 'J.B. Hunt', 'Landstar System', 'Knight Transportation',
  'Heartland Express', 'Covenant Transport', 'CRST International', 'USA Truck',
  'Ryder System', 'XPO Logistics', 'Old Dominion', 'FedEx Freight', 'UPS Freight',
  'ABF Freight', 'Estes Express', 'Saia LTL Freight', 'YRC Worldwide', 'TForce Freight'
];

const euroCompanies = [
  'DHL Freight', 'DB Schenker', 'Kuehne + Nagel', 'DSV Panalpina', 'GEODIS',
  'Rhenus Logistics', 'Dachser', 'Waberer\'s', 'Girteka Logistics', 'Primafrio',
  'Norbert Dentressangle', 'Ceva Logistics', 'XPO Logistics Europe', 'Hellmann Worldwide'
];

const manufacturers = ['Volvo', 'Scania', 'MAN', 'DAF', 'Mercedes-Benz', 'Iveco', 'Renault', 'Peterbilt', 'Kenworth', 'Freightliner', 'Mack', 'International'];
const equipmentTypes = ['Tractor Unit', 'Flatbed Trailer', 'Refrigerated Trailer', 'Dry Van', 'Tanker', 'Lowboy', 'Drop Deck', 'Curtain Side', 'Box Truck', 'Dump Truck'];

function randomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generatePhone(countryCode) {
  const formats = {
    'US': () => `+1 ${randomInt(200,999)}-${randomInt(100,999)}-${randomInt(1000,9999)}`,
    'CA': () => `+1 ${randomInt(200,999)}-${randomInt(100,999)}-${randomInt(1000,9999)}`,
    'DE': () => `+49 ${randomInt(30,89)} ${randomInt(1000000,9999999)}`,
    'FR': () => `+33 ${randomInt(1,9)} ${randomInt(10,99)} ${randomInt(10,99)} ${randomInt(10,99)} ${randomInt(10,99)}`,
    'NL': () => `+31 ${randomInt(10,99)} ${randomInt(100,999)} ${randomInt(1000,9999)}`,
    'GB': () => `+44 ${randomInt(20,79)} ${randomInt(1000,9999)} ${randomInt(1000,9999)}`,
    'default': () => `+${randomInt(1,99)} ${randomInt(100,999)} ${randomInt(100,999)} ${randomInt(1000,9999)}`
  };
  return (formats[countryCode] || formats['default'])();
}

function generateEmail(name, city) {
  const domain = name.toLowerCase().replace(/[^a-z0-9]/g, '') + '.com';
  return `info@${domain}`;
}

function generateWebsite(name) {
  return `https://www.${name.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`;
}

// ============================================
// SEED COURSE CATEGORIES
// ============================================
console.log('📚 Seeding course categories...');
const courseCategories = [
  { nameEn: 'Engine Mechanics', slug: 'engine-mechanics', icon: 'engine' },
  { nameEn: 'Brake Systems', slug: 'brake-systems', icon: 'brake' },
  { nameEn: 'Electrical Systems', slug: 'electrical-systems', icon: 'electric' },
  { nameEn: 'Transmission & Drivetrain', slug: 'transmission-drivetrain', icon: 'transmission' },
  { nameEn: 'HVAC Systems', slug: 'hvac-systems', icon: 'hvac' },
  { nameEn: 'Emissions & DEF', slug: 'emissions-def', icon: 'emissions' },
  { nameEn: 'Preventive Maintenance', slug: 'preventive-maintenance', icon: 'maintenance' },
  { nameEn: 'Safety & Compliance', slug: 'safety-compliance', icon: 'safety' },
  { nameEn: 'Welding & Fabrication', slug: 'welding-fabrication', icon: 'welding' },
  { nameEn: 'Hydraulics', slug: 'hydraulics', icon: 'hydraulics' },
];

for (const cat of courseCategories) {
  await connection.execute(
    'INSERT IGNORE INTO course_categories (nameEn, slug, icon) VALUES (?, ?, ?)',
    [cat.nameEn, cat.slug, cat.icon]
  );
}

// ============================================
// SEED COURSES
// ============================================
console.log('📖 Seeding courses...');
const courseTitles = [
  'Complete Diesel Engine Overhaul',
  'Air Brake System Certification',
  'Electrical Diagnostics Fundamentals',
  'Advanced Transmission Repair',
  'DEF System Troubleshooting',
  'Heavy Truck Preventive Maintenance',
  'DOT Safety Compliance Training',
  'MIG Welding for Truck Repair',
  'Hydraulic System Maintenance',
  'Engine Performance Tuning',
  'Brake Adjustment & Inspection',
  'Alternator & Starter Repair',
  'Clutch Replacement Procedures',
  'Emission Control Systems',
  'Fleet Maintenance Management',
  'OSHA Safety Standards',
  'TIG Welding Techniques',
  'Pneumatic Systems',
  'Fuel Injection Systems',
  'Cooling System Service',
];

const levels = ['beginner', 'intermediate', 'advanced', 'expert'];

for (let i = 0; i < courseTitles.length; i++) {
  const categoryId = (i % courseCategories.length) + 1;
  await connection.execute(
    `INSERT IGNORE INTO courses (categoryId, titleEn, descriptionEn, level, durationHours, isPublished) 
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      categoryId,
      courseTitles[i],
      `Comprehensive training course covering ${courseTitles[i].toLowerCase()}. Learn from industry experts with hands-on practical exercises.`,
      randomElement(levels),
      randomInt(8, 80),
      true
    ]
  );
}

// ============================================
// SEED JOB CATEGORIES
// ============================================
console.log('💼 Seeding job categories...');
const jobCategories = [
  { nameEn: 'Long Haul', slug: 'long-haul' },
  { nameEn: 'Regional', slug: 'regional' },
  { nameEn: 'Local', slug: 'local' },
  { nameEn: 'Specialized', slug: 'specialized' },
  { nameEn: 'Owner Operator', slug: 'owner-operator' },
  { nameEn: 'Team Driving', slug: 'team-driving' },
];

for (const cat of jobCategories) {
  await connection.execute(
    'INSERT IGNORE INTO job_categories (nameEn, slug) VALUES (?, ?)',
    [cat.nameEn, cat.slug]
  );
}

// ============================================
// SEED JOBS (500+ jobs)
// ============================================
console.log('🚛 Seeding 500+ job listings...');
const employmentTypes = ['full_time', 'part_time', 'contract', 'temporary'];
const experienceLevels = ['entry', 'mid', 'senior', 'executive'];

for (let i = 0; i < 500; i++) {
  const isEurope = i % 3 === 0;
  const countries = isEurope ? europeanCountries : northAmericanCountries;
  const country = randomElement(countries);
  const city = randomElement(country.cities);
  const company = isEurope ? randomElement(euroCompanies) : randomElement(companies);
  const title = randomElement(jobTitles);
  const salaryMin = randomInt(35000, 70000);
  const salaryMax = salaryMin + randomInt(10000, 30000);
  
  await connection.execute(
    `INSERT INTO jobs (categoryId, titleEn, descriptionEn, company, location, country, region, 
     salaryMin, salaryMax, salaryCurrency, employmentType, experienceLevel, sourceType, isActive, postedAt) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW() - INTERVAL ? DAY)`,
    [
      randomInt(1, 6),
      title,
      `${company} is seeking an experienced ${title} to join our team. Competitive pay, benefits, and home time. Requirements: Valid CDL, clean driving record, 1+ years experience.`,
      company,
      city,
      country.name,
      isEurope ? 'europe' : 'north_america',
      salaryMin,
      salaryMax,
      isEurope ? 'EUR' : 'USD',
      randomElement(employmentTypes),
      randomElement(experienceLevels),
      i % 5 === 0 ? 'manual' : 'scraped',
      true,
      randomInt(0, 30)
    ]
  );
}

// ============================================
// SEED EQUIPMENT CATEGORIES
// ============================================
console.log('🔧 Seeding equipment categories...');
const equipmentCategories = [
  { nameEn: 'Trucks & Tractors', slug: 'trucks-tractors', icon: 'truck' },
  { nameEn: 'Trailers', slug: 'trailers', icon: 'trailer' },
  { nameEn: 'Parts & Components', slug: 'parts-components', icon: 'parts' },
  { nameEn: 'Tools & Equipment', slug: 'tools-equipment', icon: 'tools' },
  { nameEn: 'Tires & Wheels', slug: 'tires-wheels', icon: 'tire' },
];

for (const cat of equipmentCategories) {
  await connection.execute(
    'INSERT IGNORE INTO equipment_categories (nameEn, slug, icon) VALUES (?, ?, ?)',
    [cat.nameEn, cat.slug, cat.icon]
  );
}

// ============================================
// SEED MARKETPLACE LISTINGS (300+ listings)
// ============================================
console.log('🏪 Seeding 300+ marketplace listings...');
const conditions = ['new', 'like_new', 'good', 'fair', 'parts'];

for (let i = 0; i < 300; i++) {
  const isEurope = i % 2 === 0;
  const countries = isEurope ? europeanCountries : northAmericanCountries;
  const country = randomElement(countries);
  const city = randomElement(country.cities);
  const manufacturer = randomElement(manufacturers);
  const equipmentType = randomElement(equipmentTypes);
  const year = randomInt(2010, 2024);
  const price = randomInt(15000, 250000);
  
  await connection.execute(
    `INSERT INTO listings (categoryId, titleEn, descriptionEn, price, currency, \`condition\`, year, 
     manufacturer, model, location, country, status, viewCount) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      randomInt(1, 5),
      `${year} ${manufacturer} ${equipmentType}`,
      `${year} ${manufacturer} ${equipmentType} in ${randomElement(conditions)} condition. Well maintained, ready for work. Located in ${city}, ${country.name}.`,
      price,
      isEurope ? 'EUR' : 'USD',
      randomElement(conditions),
      year,
      manufacturer,
      equipmentType,
      city,
      country.name,
      'active',
      randomInt(10, 5000)
    ]
  );
}

// ============================================
// SEED KNOWLEDGE CATEGORIES
// ============================================
console.log('📚 Seeding knowledge categories...');
const knowledgeCategories = [
  { nameEn: 'Engine', slug: 'engine', icon: 'engine' },
  { nameEn: 'Brakes', slug: 'brakes', icon: 'brake' },
  { nameEn: 'Transmission', slug: 'transmission', icon: 'transmission' },
  { nameEn: 'Electrical', slug: 'electrical', icon: 'electric' },
  { nameEn: 'Exhaust & Emissions', slug: 'exhaust-emissions', icon: 'exhaust' },
  { nameEn: 'Structural', slug: 'structural', icon: 'structure' },
  { nameEn: 'Hydraulics', slug: 'hydraulics', icon: 'hydraulic' },
  { nameEn: 'HVAC', slug: 'hvac', icon: 'hvac' },
];

for (const cat of knowledgeCategories) {
  await connection.execute(
    'INSERT IGNORE INTO knowledge_categories (nameEn, slug, icon) VALUES (?, ?, ?)',
    [cat.nameEn, cat.slug, cat.icon]
  );
}

// ============================================
// SEED KNOWLEDGE ARTICLES (200+ articles)
// ============================================
console.log('📝 Seeding 200+ knowledge articles...');
const articleTypes = ['repair_guide', 'fabrication', 'maintenance', 'troubleshooting', 'general'];
const articleTitles = [
  'Complete Diesel Engine Overhaul Guide',
  'Air Brake System Troubleshooting',
  'Fabricating Custom Exhaust Systems',
  'DEF System Error Codes Explained',
  'Transmission Rebuild Procedures',
  'Welding Techniques for Trailer Repair',
  'Electrical Diagnostic Flowcharts',
  'Hydraulic Pump Replacement',
  'Turbocharger Maintenance',
  'Clutch Adjustment Procedures',
  'Fuel Injector Testing',
  'Cooling System Flush Guide',
  'Alternator Testing & Repair',
  'Starter Motor Troubleshooting',
  'Wheel Bearing Replacement',
  'Kingpin Replacement Guide',
  'Fifth Wheel Maintenance',
  'Air Compressor Rebuild',
  'EGR Valve Cleaning',
  'DPF Regeneration Guide',
];

for (let i = 0; i < 200; i++) {
  const title = articleTitles[i % articleTitles.length] + (i >= articleTitles.length ? ` - Part ${Math.floor(i / articleTitles.length) + 1}` : '');
  const manufacturer = randomElement(manufacturers);
  
  await connection.execute(
    `INSERT INTO knowledge_articles (categoryId, titleEn, contentEn, articleType, manufacturer, 
     vehicleType, sourceType, viewCount, isPublished) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      randomInt(1, 8),
      title,
      `Comprehensive guide covering ${title.toLowerCase()}. This article provides step-by-step instructions, diagrams, and expert tips for professional mechanics.`,
      randomElement(articleTypes),
      manufacturer,
      randomElement(['Heavy Truck', 'Semi-Truck', 'Trailer', 'All']),
      i % 4 === 0 ? 'manual' : 'scraped',
      randomInt(100, 25000),
      true
    ]
  );
}

// ============================================
// SEED LICENSE TYPES
// ============================================
console.log('📜 Seeding license types...');
const licenseTypes = [
  { code: 'CDL-A', nameEn: 'Commercial Driver License Class A', region: 'north_america', vehicleClass: 'truck' },
  { code: 'CDL-B', nameEn: 'Commercial Driver License Class B', region: 'north_america', vehicleClass: 'truck' },
  { code: 'CE', nameEn: 'Category CE - Heavy Truck with Trailer', region: 'europe', vehicleClass: 'trailer' },
  { code: 'C', nameEn: 'Category C - Heavy Truck', region: 'europe', vehicleClass: 'truck' },
  { code: 'D', nameEn: 'Category D - Bus', region: 'europe', vehicleClass: 'bus' },
  { code: 'HAZMAT', nameEn: 'Hazardous Materials Endorsement', region: 'north_america', vehicleClass: 'hazmat' },
  { code: 'ADR', nameEn: 'ADR - Dangerous Goods Transport', region: 'europe', vehicleClass: 'hazmat' },
];

for (const license of licenseTypes) {
  await connection.execute(
    `INSERT IGNORE INTO license_types (code, nameEn, descriptionEn, vehicleClass, region) 
     VALUES (?, ?, ?, ?, ?)`,
    [
      license.code,
      license.nameEn,
      `Official ${license.nameEn} certification for professional drivers.`,
      license.vehicleClass,
      license.region
    ]
  );
}

// ============================================
// SEED LICENSE REQUIREMENTS
// ============================================
console.log('📋 Seeding license requirements...');
const allCountries = [...europeanCountries, ...northAmericanCountries];

for (const country of allCountries) {
  const isEurope = europeanCountries.includes(country);
  const licenseTypeId = isEurope ? randomInt(3, 5) : randomInt(1, 2);
  
  await connection.execute(
    `INSERT INTO license_requirements (licenseTypeId, country, countryCode, requirementsEn, 
     minimumAge, medicalRequired, validityYears, sourceType) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      licenseTypeId,
      country.name,
      country.code,
      `Requirements for obtaining a commercial driving license in ${country.name}. Includes theory test, practical examination, and medical certification.`,
      isEurope ? 21 : 18,
      true,
      isEurope ? 5 : 4,
      'scraped'
    ]
  );
}

// ============================================
// SEED DRIVING SCHOOLS (3000+ schools)
// ============================================
console.log('🏫 Seeding 3000+ driving schools...');

let schoolCount = 0;
const targetSchools = 3000;

// Generate schools for all countries
for (const country of [...europeanCountries, ...northAmericanCountries]) {
  const isEurope = europeanCountries.some(c => c.code === country.code);
  const schoolsPerCity = Math.ceil((targetSchools / (europeanCountries.length + northAmericanCountries.length)) / country.cities.length);
  
  for (const city of country.cities) {
    for (let i = 0; i < schoolsPerCity && schoolCount < targetSchools; i++) {
      const prefix = randomElement(schoolNamePrefixes);
      const suffix = randomElement(schoolNameSuffixes);
      const name = `${prefix} ${city} ${suffix}`;
      const rating = (3.5 + Math.random() * 1.5).toFixed(2);
      const reviewCount = randomInt(10, 500);
      const serviceList = isEurope 
        ? [...services.slice(0, 5), ...euroServices.slice(0, 4)]
        : services.slice(0, 8);
      
      await connection.execute(
        `INSERT INTO driving_schools (name, descriptionEn, address, city, state, country, countryCode, 
         region, phone, email, website, servicesJson, rating, reviewCount, priceRange, sourceType, isVerified) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          name,
          `${name} offers comprehensive CDL training programs in ${city}, ${country.name}. Professional instructors, modern fleet, and high pass rates.`,
          `${randomInt(1, 999)} ${randomElement(['Main St', 'Industrial Blvd', 'Highway', 'Transport Way', 'Trucking Lane'])}`,
          city,
          city,
          country.name,
          country.code,
          isEurope ? 'europe' : 'north_america',
          generatePhone(country.code),
          generateEmail(name, city),
          generateWebsite(name),
          JSON.stringify(serviceList.slice(0, randomInt(4, 8))),
          rating,
          reviewCount,
          randomElement(['$', '$$', '$$$']),
          i % 5 === 0 ? 'manual' : 'scraped',
          i % 3 === 0
        ]
      );
      schoolCount++;
    }
  }
}

console.log(`✅ Generated ${schoolCount} driving schools`);

// ============================================
// SEED SCRAPING SOURCES
// ============================================
console.log('🕷️ Seeding scraping sources...');
const scrapingSources = [
  { name: 'Indeed Jobs', url: 'https://indeed.com', sourceType: 'jobs', region: 'global' },
  { name: 'LinkedIn Jobs', url: 'https://linkedin.com/jobs', sourceType: 'jobs', region: 'global' },
  { name: 'Monster Jobs', url: 'https://monster.com', sourceType: 'jobs', region: 'north_america' },
  { name: 'StepStone', url: 'https://stepstone.de', sourceType: 'jobs', region: 'europe' },
  { name: 'TruckersReport Forum', url: 'https://truckersreport.com', sourceType: 'knowledge', region: 'north_america' },
  { name: 'FleetOwner', url: 'https://fleetowner.com', sourceType: 'knowledge', region: 'north_america' },
  { name: 'Commercial Motor', url: 'https://commercialmotor.com', sourceType: 'knowledge', region: 'europe' },
  { name: 'Driving Schools DB', url: 'https://drivingschools.com', sourceType: 'schools', region: 'global' },
  { name: 'DMV.org', url: 'https://dmv.org', sourceType: 'licenses', region: 'north_america' },
  { name: 'Gov.uk Driving', url: 'https://gov.uk/driving', sourceType: 'licenses', region: 'europe' },
];

for (const source of scrapingSources) {
  await connection.execute(
    `INSERT IGNORE INTO scraping_sources (name, url, sourceType, region, isActive, scrapeFrequency) 
     VALUES (?, ?, ?, ?, ?, ?)`,
    [source.name, source.url, source.sourceType, source.region, true, 'daily']
  );
}

// ============================================
// DONE
// ============================================
console.log('');
console.log('🎉 Bulk data generation complete!');
console.log('');
console.log('Summary:');
console.log(`  - Course Categories: ${courseCategories.length}`);
console.log(`  - Courses: ${courseTitles.length}`);
console.log(`  - Job Categories: ${jobCategories.length}`);
console.log(`  - Jobs: 500+`);
console.log(`  - Equipment Categories: ${equipmentCategories.length}`);
console.log(`  - Marketplace Listings: 300+`);
console.log(`  - Knowledge Categories: ${knowledgeCategories.length}`);
console.log(`  - Knowledge Articles: 200+`);
console.log(`  - License Types: ${licenseTypes.length}`);
console.log(`  - License Requirements: ${allCountries.length}`);
console.log(`  - Driving Schools: ${schoolCount}`);
console.log(`  - Scraping Sources: ${scrapingSources.length}`);

await connection.end();
process.exit(0);
