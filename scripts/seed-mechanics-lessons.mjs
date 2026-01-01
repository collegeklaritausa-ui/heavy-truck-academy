import mysql from 'mysql2/promise';

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('DATABASE_URL not set');
  process.exit(1);
}

const connection = await mysql.createConnection(DATABASE_URL);

console.log('🚀 Starting mechanics lessons bulk generation...');

// ============================================
// MECHANICS LESSON CATEGORIES
// ============================================
const lessonCategories = [
  { nameEn: 'Engine Fundamentals', slug: 'engine-fundamentals', icon: 'engine' },
  { nameEn: 'Diesel Engine Repair', slug: 'diesel-engine-repair', icon: 'diesel' },
  { nameEn: 'Gasoline Engine Repair', slug: 'gasoline-engine-repair', icon: 'gas' },
  { nameEn: 'Brake Systems', slug: 'brake-systems', icon: 'brake' },
  { nameEn: 'Air Brake Service', slug: 'air-brake-service', icon: 'air-brake' },
  { nameEn: 'Hydraulic Brakes', slug: 'hydraulic-brakes', icon: 'hydraulic' },
  { nameEn: 'Transmission & Drivetrain', slug: 'transmission-drivetrain', icon: 'transmission' },
  { nameEn: 'Manual Transmission', slug: 'manual-transmission', icon: 'manual' },
  { nameEn: 'Automatic Transmission', slug: 'automatic-transmission', icon: 'automatic' },
  { nameEn: 'Electrical Systems', slug: 'electrical-systems', icon: 'electric' },
  { nameEn: 'Battery & Charging', slug: 'battery-charging', icon: 'battery' },
  { nameEn: 'Alternator & Starter', slug: 'alternator-starter', icon: 'alternator' },
  { nameEn: 'Lighting Systems', slug: 'lighting-systems', icon: 'light' },
  { nameEn: 'Suspension & Steering', slug: 'suspension-steering', icon: 'suspension' },
  { nameEn: 'Wheel Alignment', slug: 'wheel-alignment', icon: 'alignment' },
  { nameEn: 'Tire Service', slug: 'tire-service', icon: 'tire' },
  { nameEn: 'Cooling Systems', slug: 'cooling-systems', icon: 'cooling' },
  { nameEn: 'Radiator Service', slug: 'radiator-service', icon: 'radiator' },
  { nameEn: 'Fuel Systems', slug: 'fuel-systems', icon: 'fuel' },
  { nameEn: 'Fuel Injection', slug: 'fuel-injection', icon: 'injection' },
  { nameEn: 'Emissions Control', slug: 'emissions-control', icon: 'emissions' },
  { nameEn: 'DEF Systems', slug: 'def-systems', icon: 'def' },
  { nameEn: 'EGR & DPF', slug: 'egr-dpf', icon: 'egr' },
  { nameEn: 'HVAC Systems', slug: 'hvac-systems', icon: 'hvac' },
  { nameEn: 'Air Conditioning', slug: 'air-conditioning', icon: 'ac' },
  { nameEn: 'Heating Systems', slug: 'heating-systems', icon: 'heat' },
  { nameEn: 'Welding & Fabrication', slug: 'welding-fabrication', icon: 'welding' },
  { nameEn: 'MIG Welding', slug: 'mig-welding', icon: 'mig' },
  { nameEn: 'TIG Welding', slug: 'tig-welding', icon: 'tig' },
  { nameEn: 'Preventive Maintenance', slug: 'preventive-maintenance', icon: 'maintenance' },
  { nameEn: 'Fluid Management', slug: 'fluid-management', icon: 'fluid' },
  { nameEn: 'Safety & Compliance', slug: 'safety-compliance', icon: 'safety' },
  { nameEn: 'DOT Regulations', slug: 'dot-regulations', icon: 'dot' },
  { nameEn: 'Diagnostic Procedures', slug: 'diagnostic-procedures', icon: 'diagnostic' },
];

console.log('📚 Seeding mechanics lesson categories...');
for (const cat of lessonCategories) {
  await connection.execute(
    'INSERT IGNORE INTO mechanics_lesson_categories (nameEn, slug, icon, descriptionEn) VALUES (?, ?, ?, ?)',
    [cat.nameEn, cat.slug, cat.icon, `Professional training in ${cat.nameEn.toLowerCase()}`]
  );
}

// ============================================
// LESSON CONTENT TEMPLATES
// ============================================
const lessonTitles = {
  'engine-fundamentals': [
    'Understanding Diesel Engine Components',
    'Four-Stroke Engine Cycle Explained',
    'Engine Block Structure and Function',
    'Cylinder Head Basics',
    'Piston and Rod Assembly',
    'Crankshaft Mechanics',
    'Camshaft Operation',
    'Valve Train Systems',
    'Engine Timing Fundamentals',
    'Compression Ratio Explained',
  ],
  'diesel-engine-repair': [
    'Complete Diesel Engine Overhaul',
    'Cylinder Head Removal and Inspection',
    'Piston Ring Replacement',
    'Connecting Rod Service',
    'Crankshaft Grinding and Polishing',
    'Engine Block Honing',
    'Valve Seat Cutting',
    'Valve Guide Installation',
    'Diesel Fuel Injector Service',
    'Turbocharger Removal and Repair',
  ],
  'brake-systems': [
    'Brake System Overview',
    'Brake Fluid Types and Properties',
    'Brake Pad Replacement Procedure',
    'Rotor Inspection and Replacement',
    'Brake Caliper Service',
    'Brake Line Inspection',
    'Brake Hose Replacement',
    'Brake Bleeding Procedures',
    'ABS System Diagnostics',
    'Brake Balance Adjustment',
  ],
  'air-brake-service': [
    'Air Brake System Components',
    'Air Compressor Operation',
    'Air Dryer Service',
    'Air Tank Maintenance',
    'Brake Chamber Replacement',
    'Slack Adjuster Service',
    'Spring Brake Function',
    'Brake Valve Operation',
    'Air Brake Bleeding',
    'DOT Air Brake Inspection',
  ],
  'transmission-drivetrain': [
    'Manual Transmission Basics',
    'Transmission Fluid Selection',
    'Clutch Assembly Function',
    'Gear Synchronizer Operation',
    'Differential Basics',
    'Driveshaft Inspection',
    'Universal Joint Service',
    'Transmission Mount Replacement',
    'Transmission Seal Replacement',
    'Transmission Overhaul Process',
  ],
  'electrical-systems': [
    'Electrical System Overview',
    'Battery Function and Maintenance',
    'Alternator Operation',
    'Starter Motor Service',
    'Wiring Harness Inspection',
    'Electrical Connector Care',
    'Ground Connection Importance',
    'Relay and Switch Operation',
    'Fuse and Circuit Breaker Function',
    'Electrical Troubleshooting Guide',
  ],
  'suspension-steering': [
    'Suspension System Types',
    'Spring Function and Types',
    'Shock Absorber Service',
    'Control Arm Inspection',
    'Ball Joint Replacement',
    'Tie Rod Service',
    'Steering Gearbox Operation',
    'Power Steering Fluid Service',
    'Suspension Alignment Basics',
    'Sway Bar Function',
  ],
  'cooling-systems': [
    'Cooling System Overview',
    'Radiator Function and Service',
    'Water Pump Operation',
    'Thermostat Function',
    'Coolant Types and Properties',
    'Heater Core Service',
    'Cooling Fan Operation',
    'Hose Inspection and Replacement',
    'Coolant Flush Procedure',
    'Pressure Cap Function',
  ],
  'fuel-systems': [
    'Fuel Tank Inspection',
    'Fuel Pump Operation',
    'Fuel Filter Service',
    'Fuel Line Inspection',
    'Fuel Pressure Regulator',
    'Fuel Gauge Sender',
    'Diesel Fuel Contamination',
    'Fuel System Priming',
    'Fuel Additives and Treatment',
    'Fuel System Pressure Testing',
  ],
  'emissions-control': [
    'Emissions Regulations Overview',
    'Catalytic Converter Function',
    'EGR System Operation',
    'DPF Regeneration Process',
    'SCR System Basics',
    'DEF Fluid Management',
    'Emissions Testing Procedures',
    'OBD-II Diagnostics',
    'Emissions Fault Codes',
    'Emissions System Repair',
  ],
  'hvac-systems': [
    'HVAC System Overview',
    'AC Compressor Operation',
    'Refrigerant Types and Properties',
    'AC Condenser Function',
    'Evaporator Core Service',
    'Expansion Valve Operation',
    'Heating Element Function',
    'Blower Motor Service',
    'Climate Control Diagnostics',
    'HVAC Refrigerant Recovery',
  ],
  'welding-fabrication': [
    'Welding Safety Fundamentals',
    'Metal Properties and Selection',
    'Welding Equipment Setup',
    'Joint Preparation Techniques',
    'Welding Positions and Techniques',
    'Heat Control and Management',
    'Weld Quality Inspection',
    'Cutting and Grinding Techniques',
    'Fabrication Layout and Measurement',
    'Custom Fabrication Projects',
  ],
  'preventive-maintenance': [
    'Maintenance Schedule Overview',
    'Oil and Filter Change Procedure',
    'Fluid Level Checks',
    'Belt and Hose Inspection',
    'Battery Maintenance',
    'Tire Rotation and Balance',
    'Brake Inspection Routine',
    'Light and Wiper Maintenance',
    'Corrosion Prevention',
    'Seasonal Maintenance Tasks',
  ],
};

const difficulties = ['beginner', 'intermediate', 'advanced', 'expert'];
const manufacturers = ['Volvo', 'Scania', 'MAN', 'DAF', 'Mercedes-Benz', 'Iveco', 'Renault', 'Peterbilt', 'Kenworth', 'Freightliner', 'Mack', 'International'];
const vehicleTypes = ['Heavy Truck', 'Semi-Truck', 'Trailer', 'Dump Truck', 'Tanker', 'Flatbed'];

function randomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ============================================
// GENERATE 5000+ MECHANICS LESSONS
// ============================================
console.log('📝 Generating 5000+ mechanics lessons...');

let lessonCount = 0;
const targetLessons = 5000;

for (const [categorySlug, titles] of Object.entries(lessonTitles)) {
  // Get category ID
  const [categoryResult] = await connection.execute(
    'SELECT id FROM mechanics_lesson_categories WHERE slug = ?',
    [categorySlug]
  );
  
  if (!categoryResult || categoryResult.length === 0) continue;
  
  const categoryId = categoryResult[0].id;
  
  // Generate multiple lessons per category
  const lessonsPerCategory = Math.ceil(targetLessons / Object.keys(lessonTitles).length);
  
  for (let i = 0; i < lessonsPerCategory && lessonCount < targetLessons; i++) {
    const baseTitle = titles[i % titles.length];
    const title = i >= titles.length ? `${baseTitle} - Part ${Math.floor(i / titles.length) + 1}` : baseTitle;
    const difficulty = randomElement(difficulties);
    const duration = randomInt(8, 120);
    const manufacturer = randomElement(manufacturers);
    const vehicleType = randomElement(vehicleTypes);
    const rating = (3.0 + Math.random() * 2.0).toFixed(2);
    
    const tools = JSON.stringify([
      'Socket Set',
      'Wrench Set',
      'Screwdriver Set',
      'Torque Wrench',
      'Diagnostic Scanner',
      'Multimeter',
      'Jack and Stands',
      'Safety Glasses',
    ]);
    
    const materials = JSON.stringify([
      'Replacement Parts',
      'Gasket Material',
      'Sealant',
      'Lubricant',
      'Cleaning Solution',
      'Rags and Towels',
    ]);
    
    await connection.execute(
      `INSERT INTO mechanics_lessons 
       (categoryId, titleEn, descriptionEn, contentEn, difficulty, durationMinutes, 
        manufacturer, vehicleType, tools, materials, rating, ratingCount, isPublished) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        categoryId,
        title,
        `Professional mechanics lesson on ${title.toLowerCase()}. Learn step-by-step procedures from industry experts.`,
        `This comprehensive lesson covers all aspects of ${title.toLowerCase()}. You will learn proper techniques, safety procedures, and best practices. Includes hands-on demonstrations and troubleshooting tips.`,
        difficulty,
        duration,
        manufacturer,
        vehicleType,
        tools,
        materials,
        rating,
        randomInt(10, 500),
        true
      ]
    );
    
    lessonCount++;
    
    if (lessonCount % 500 === 0) {
      console.log(`  ✓ Generated ${lessonCount} lessons...`);
    }
  }
}

console.log('');
console.log('🎉 Mechanics lessons generation complete!');
console.log('');
console.log('Summary:');
console.log(`  - Lesson Categories: ${lessonCategories.length}`);
console.log(`  - Total Mechanics Lessons: ${lessonCount}`);
console.log(`  - Lessons per Category: ~${Math.ceil(lessonCount / lessonCategories.length)}`);

await connection.end();
process.exit(0);
