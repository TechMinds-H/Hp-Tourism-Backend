require('dotenv').config();
const mongoose = require('mongoose');
const Destination = require('./models/Destination');
const Package = require('./models/Package');
const Gallery = require('./models/Gallery');
const Blog = require('./models/Blog');

const destinations = [
  {
    name: 'Shimla',
    region: 'Southern Himachal',
    altitude: '7,238 ft',
    rating: '4.0/5',
    description: 'The "Queen of Hills", Shimla is Himachal Pradesh\'s capital and a colonial-era hill station perched at 2,200m. Its mall road, Viceregal Lodge, and pine forests make it iconic. The town blends British heritage with Himalayan charm — toy trains, wooden chalets, and panoramic snow peaks define the experience.',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80',
    isPopular: true,
  },
  {
    name: 'Manali',
    region: 'Kullu Valley',
    altitude: '6,726 ft',
    rating: '4.5/5',
    description: 'Nestled in the Beas River Valley at 2,050m, Manali is the adventure capital of Himachal. From the ancient Hadimba Temple to the roaring Solang Valley slopes and the gateway to Rohtang Pass, Manali offers paragliding, skiing, trekking, and river rafting against a dramatic backdrop of snow-capped peaks.',
    image: 'https://images.unsplash.com/photo-1597167231350-d057a45dc868?q=80&w=1082&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    isPopular: true,
  },
  {
    name: 'Dharamshala',
    region: 'Kangra Valley',
    altitude: '4,780 ft',
    rating: '4.4/5',
    description: 'Home to the Dalai Lama and the Tibetan government-in-exile, Dharamshala sits at the foothills of the Dhauladhar range. McLeod Ganj (upper Dharamshala) is a vibrant mix of Buddhist monasteries, backpacker cafés, and mountain trails. The Triund trek offers views that will stay with you forever.',
    image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=800&q=80',
    isPopular: true,
  },
  {
    name: 'Spiti Valley',
    region: 'Cold Desert',
    altitude: '12,000 ft to 15,000  ft',
    rating: '4.8/5',
    description: 'Spiti is a cold desert mountain valley at 3,800m — raw, remote, and utterly otherworldly. The ancient Key Monastery perches on a cliff, the villages of Kibber and Langza sit above the clouds, and the fossil beds reveal prehistoric seas. This is Himachal at its most untouched and magnificent.',
    image: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=800&q=80',
    isPopular: true,
  },
  {
    name: 'Kasol',
    region: 'Parvati Valley',
    altitude: '5,184 ft',
    rating: '4.2/5',
    description: 'A tiny hamlet along the Parvati River, Kasol has become the trekker\'s paradise and "Mini Israel" of India. Dense deodar forests, the pilgrim town of Manikaran with its hot springs, and the challenging Kheerganga trek make Kasol a beloved escape for those seeking peace, trails, and mountain magic.',
    image: 'https://images.unsplash.com/photo-1591017403286-fd8493524e1e?w=800&q=80',
    isPopular: false,
  },
  {
    name: 'Kullu',
    region: 'Kullu Valley',
    altitude: '4,035  ft',
    rating: '3.9/5',
    description: 'Known as the "Valley of Gods," Kullu offers apple orchards, river rafting on the Beas, and easy access to the Great Himalayan National Park. Its traditional wooden temples and weekly bazaars are a cultural highlight.',
    image: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=800&q=80',
    isPopular: false,
  },
  {
    name: 'Rohtang Pass',
    region: 'Kullu District',
    altitude: '13,054 ft',
    rating: '4.3/5',
    description: 'At nearly 4,000m, Rohtang Pass connects the Kullu Valley with the Lahaul–Spiti region. The high‑altitude road is snow‑bound for much of the year and offers stunning vistas, snow activities, and a sense of remote Himalayan wilderness.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    isPopular: true,
  },
  {
    name: 'Chamba',
    region: 'Pangi Valley',
    altitude: '3,268 ft to 3,301 ft',
    rating: '4.1/5',
    description: 'Chamba is a lesser-known jewel with medieval temples, the Bhuri Singh Museum, and the sacred Ravi River. Surrounded by high ridges, it is a great base for trekking and experiencing Himachali folk festivals.',
    image: 'https://images.unsplash.com/photo-1593331569370-aef6b1a70b00?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    isPopular: false,
  },
];

const packages = [
  {
    name: 'Himalayan Grand Circuit',
    duration: '10 Nights / 11 Days',
    price: 45000,
    highlights: [
      'Shimla colonial walk & heritage train ride',
      'Manali Rohtang Pass snow experience',
      'Spiti Valley monastery circuit',
      'Dharamshala Triund sunrise trek',
      'River rafting in Kullu',
    ],
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80',
    type: 'scenic',
  },
  {
    name: 'Spiti Adventure Expedition',
    duration: '7 Nights / 8 Days',
    price: 32000,
    highlights: [
      'Key Monastery & Kibber village exploration',
      'Chandratal Lake camping',
      'Pin Valley National Park wildlife spotting',
      'Fossil hunting at Langza',
      'High altitude camping at 4,500m',
    ],
    image: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=800&q=80',
    type: 'adventure',
  },
  {
    name: 'Parvati Valley Serenity',
    duration: '5 Nights / 6 Days',
    price: 18500,
    highlights: [
      'Kasol riverside camping',
      'Kheerganga hot spring trek',
      'Manikaran Gurudwara spiritual visit',
      'Chalal village nature walk',
      'Local Himachali cuisine experience',
    ],
    image: 'https://images.unsplash.com/photo-1591017403286-fd8493524e1e?w=800&q=80',
    type: 'cultural',
  },
  {
    name: 'Shimla Heritage Walk',
    duration: '4 Nights / 5 Days',
    price: 22000,
    highlights: [
      'Mall Road evening stroll',
      'Viceregal Lodge tour',
      'Toy train ride to Kalka',
      'Jakhu Temple visit',
      'Local Himachali cuisine tasting',
    ],
    image: 'https://plus.unsplash.com/premium_photo-1697730487072-c7c29e113007?w=800&q=80',
    type: 'cultural',
  },
  {
    name: 'Kullu River Rafting Challenge',
    duration: '3 Nights / 4 Days',
    price: 15000,
    highlights: [
      'White water rafting on Beas',
      'Campfire under the stars',
      'Visit Naggar Castle',
      'Local village walk',
      'Adventure sports in Solang Valley',
    ],
    image: 'https://plus.unsplash.com/premium_photo-1661889971049-6f0a39a3476f?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    type: 'adventure',
  },
  {
    name: 'Dharamshala Yoga & Wellness',
    duration: '6 Nights / 7 Days',
    price: 26000,
    highlights: [
      'Daily yoga sessions in McLeod Ganj',
      'Meditation at Bhagsu waterfalls',
      'Visit to Dalai Lama temple',
      'Bhuti Kothi heritage walk',
      'Organic Himachali meals',
    ],
    image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=800&q=80?w=800&q=80',
    type: 'spiritual',
  },
  {
    name: 'Spiti Photography Expedition',
    duration: '8 Nights / 9 Days',
    price: 38000,
    highlights: [
      'Sunrise at Chandratal lake',
      'Key Monastery golden hour',
      'Village homestays in Kibber',
      'Fossil hunting & landscape photography',
      'Night sky astrophotography',
    ],
    image: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=800&q=80?w=800&q=80',
    type: 'scenic',
  },
  {
    name: 'Chamba Heritage & Festivals',
    duration: '5 Nights / 6 Days',
    price: 20000,
    highlights: [
      'Bhuri Singh Museum tour',
      'Visit Laxmi Narayan Temple',
      'Ravi River bank picnic',
      'Attend local folk festival',
      'Trekking to Khajjiar meadow',
    ],
    image: 'https://images.unsplash.com/photo-1727076091415-1edbf6387525?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Q2hhbWJhJTIwSGVyaXRhZ2UlMjAlMjYlMjBGZXN0aXZhbHN8ZW58MHx8MHx8fDA%3D',
    type: 'cultural',
  },
  {
    name: 'Rohtang Snow Adventure',
    duration: '2 Nights / 3 Days',
    price: 18000,
    highlights: [
      'Snow sledding at Rohtang',
      'Visit Solang Valley',
      'Snowman building workshop',
      'Jeep ride to Rahala Falls',
      'Snowshoe trekking',
    ],
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80?w=800&q=80',
    type: 'adventure',
  },
  {
    name: 'Parvati Valley Yoga Retreat',
    duration: '7 Nights / 8 Days',
    price: 30000,
    highlights: [
      'Daily yoga by the Parvati River',
      'Kheerganga hot springs soak',
      'Holistic Ayurvedic treatments',
      'Riverside camping',
      'Visit Manikaran Gurudwara',
    ],
    image: 'https://images.unsplash.com/photo-1591017403286-fd8493524e1e?w=800&q=80?w=800&q=80',
    type: 'spiritual',
  },
  {
    name: 'Kangra Fort Explorer',
    duration: '3 Nights / 4 Days',
    price: 17000,
    highlights: [
      'Guided tour of Kangra Fort',
      'Tea garden walk in Palampur',
      'Local pottery workshop',
      'Ancient temples visit',
      'Sunset at Bajreshwari Devi Temple',
    ],
    image: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=800&q=80?w=800&q=80',
    type: 'cultural',
  },
  {
    name: 'Great Himalayan Trek',
    duration: '12 Nights / 13 Days',
    price: 60000,
    highlights: [
      'Hike through Great Himalayan National Park',
      'Camping at waterfalls',
      'Wildlife spotting (snow leopards, ibex)',
      'Visit Raison village',
      'Magical sunset at Sainj valley',
    ],
    image: 'https://plus.unsplash.com/premium_photo-1692386759833-3acf660742ad?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8R3JlYXQlMjBIaW1hbGF5YW4lMjBUcmVrfGVufDB8fDB8fHww',
    type: 'adventure',
  },
  {
    name: 'Apple Orchard Experience',
    duration: '4 Nights / 5 Days',
    price: 19000,
    highlights: [
      'Apple picking in Kullu',
      'Visit to local orchards',
      'Homemade apple cider tasting',
      'Mehndipur Balaji Temple visit',
      'Traditional Himachali cooking class',
    ],
    image: 'https://images.unsplash.com/photo-1737947292261-7593a83ede82?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fEFwcGxlJTIwT3JjaGFyZCUyMEV4cGVyaWVuY2V8ZW58MHx8MHx8fDA%3D',
    type: 'scenic',
  },
];

const gallery = [
  { imageUrl: 'https://images.unsplash.com/photo-1697116158425-c1c7b34f57d7?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c2hpbWxhJTIwbmF0dXJlfGVufDB8fDB8fHww', location: 'Shimla', category: 'nature' },
  { imageUrl: 'https://images.unsplash.com/photo-1619282401041-56e69dcc5335?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', location: 'Spiti Valley', category: 'snow' },
  { imageUrl: 'https://res.cloudinary.com/kmadmin/image/upload/v1621782620/kiomoi/Dharamshala_Dalai_Lama_Temple_1621782620072.jpg', location: 'Dharamshala', category: 'temples' },
  { imageUrl: 'https://images.unsplash.com/photo-1546180801-a9b3dd6ad440?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2Fzb2wlMjBuYXR1cmV8ZW58MHx8MHx8fDA%3D', location: 'Kasol', category: 'nature' },
  { imageUrl: 'https://images.unsplash.com/photo-1579689189009-874f5cac2db5?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWFuYWxpJTIwYWR2ZW50dXJlfGVufDB8fDB8fHww', location: 'Manali', category: 'adventure' },
  { imageUrl: 'https://images.unsplash.com/photo-1727076091694-0829e18ac2b0?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGt1bGx1JTIwY3VsdHVyZXxlbnwwfHwwfHx8MA%3D%3D', location: 'Kullu', category: 'culture' },
];

const blogs = [
  {
    title: 'Crossing Rohtang Pass: A Journey Above the Clouds',
    excerpt: 'At 3,978 metres, Rohtang Pass is not just a mountain crossing — it is a threshold between worlds. On one side, the lush Kullu Valley; on the other, the stark moonscape of Lahaul.',
    content: `At 3,978 metres, Rohtang Pass is not just a mountain crossing — it is a threshold between worlds. On one side, the lush Kullu Valley; on the other, the stark moonscape of Lahaul. The journey from Manali begins before dawn, headlights cutting through mist as our jeep climbs hairpin bends. Snow patches appear at 2,500 metres, then thicken into roadside walls of white. By 8 AM, we are parked at the summit, surrounded by tourists in rented snow suits, yaks draped in bells, and the kind of thin, brilliant light only found at altitude. The view stretches forever — Beas Kund glacier to the northeast, the brown folds of Lahaul spilling westward. In summer, the pass sees hundreds of vehicles daily. Yet somehow, standing there above the clouds, watching eagles drift on thermals, you feel the ancient silence underneath all the noise. Rohtang means "pile of corpses" in Tibetan — a grim reminder of how deadly the crossing was for merchants and pilgrims in centuries past. Today it is a tourist spectacle. But if you go in October, just before it closes for winter, you may find it nearly empty. Just you, the snow, and the mountains receding in every direction.`,
    thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    author: 'Arjun Sharma',
    publishedAt: new Date('2024-09-15'),
  },
  {
    title: 'Living Like a Monk: A Week in Spiti Valley',
    excerpt: 'Spiti does not ease you in. The road from Shimla climbs relentlessly for two days, through Kinnaur\'s apple orchards and into a landscape that looks like another planet.',
    content: `Spiti does not ease you in. The road from Shimla climbs relentlessly for two days, through Kinnaur's apple orchards and into a landscape that looks like another planet. By the time you reach Kaza, the district headquarters, the air is thin, the sky impossibly blue, and the mountains are bare and ancient. I stayed in a homestay in Kibber, a village at 4,200 metres that claims to be one of the world's highest inhabited settlements. My host, Tenzin, served butter tea at 5 AM before morning prayers at the local monastery. I spent a week following his rhythms — rising at dawn, spending afternoons walking between villages, watching the light change on the eroded hillsides. Key Monastery, perched on a rocky outcrop above the Pin River, was built in the 11th century and houses ancient thangka paintings and manuscripts. The monks here study astronomy, medicine, and philosophy. In the evenings, their chanting fills the monastery courtyard as stars appear in the unpolluted sky with startling clarity. Spiti teaches patience. Phone signals vanish. The internet barely works. ATMs are hours away. But these deprivations are gifts — they return you to a slower, more essential way of being. I left lighter than I arrived, carrying only memories and a small brass Buddha that Tenzin pressed into my hands at the gate.`,
    thumbnail: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=800&q=80',
    author: 'Priya Nair',
    publishedAt: new Date('2024-10-02'),
  },
];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB');

  await Destination.deleteMany({});
  await Package.deleteMany({});
  await Gallery.deleteMany({});
  await Blog.deleteMany({});

  await Destination.insertMany(destinations);
  await Package.insertMany(packages);
  await Gallery.insertMany(gallery);
  await Blog.insertMany(blogs);

  console.log('✅ Seed data inserted successfully!');
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
