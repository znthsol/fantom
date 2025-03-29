#! /usr/bin/env ts-node
import { promises as fs } from 'fs';
import path from 'path';

const mountains = [
    {
        name: 'Mount Rainier',
        state: 'Washington',
        elevation: '14,411 feet',
        weather: 'temperate rainforest climate with heavy snowfall',
        description: 'Mount Rainier, an active stratovolcano, stands as the highest peak in Washington state at 14,411 feet. Located in Mount Rainier National Park, it features temperate rainforest climate with heavy snowfall, especially during winter months. The mountain is known for its extensive glaciation, with 26 major glaciers covering its slopes. Its summit is often shrouded in clouds, creating a mystical appearance that has earned it the nickname "The Mountain." The surrounding area experiences significant precipitation, with the Paradise Ranger Station receiving an average of 53 feet of snow annually.'
    },
    {
        name: 'Mount Whitney',
        state: 'California',
        elevation: '14,505 feet',
        weather: 'alpine climate with extreme temperature variations',
        description: 'Mount Whitney, the highest peak in the contiguous United States at 14,505 feet, is located in California\'s Sierra Nevada range. The mountain experiences an alpine climate with extreme temperature variations between day and night. Summers are typically dry and mild, while winters bring heavy snowfall and freezing temperatures. The mountain is a popular destination for hikers, particularly through the Mount Whitney Trail, which offers stunning views of the surrounding Inyo National Forest. Despite its impressive height, it\'s relatively accessible compared to other major peaks.'
    },
    {
        name: 'Denali',
        state: 'Alaska',
        elevation: '20,310 feet',
        weather: 'subarctic climate with severe winter conditions',
        description: 'Denali, formerly known as Mount McKinley, is the highest peak in North America at 20,310 feet. Located in Alaska\'s Denali National Park and Preserve, it experiences a subarctic climate with severe winter conditions. The mountain is known for its extreme weather, with temperatures often dropping below -40°F in winter. Its massive bulk creates its own weather patterns, and the summit is frequently shrouded in clouds. The mountain\'s base-to-summit rise of about 18,000 feet is greater than that of Mount Everest, making it one of the most prominent peaks in the world.'
    },
    {
        name: 'Mount Elbert',
        state: 'Colorado',
        elevation: '14,440 feet',
        weather: 'high-altitude climate with frequent afternoon thunderstorms',
        description: 'Mount Elbert, the highest peak in Colorado at 14,440 feet, is located in the Sawatch Range of the Rocky Mountains. The mountain experiences a high-altitude climate characterized by frequent afternoon thunderstorms during the summer months. Winters bring heavy snowfall and extreme cold, while summers are relatively mild with clear mornings often giving way to afternoon storms. The mountain\'s gentle slopes make it a popular destination for hikers attempting to summit Colorado\'s highest peak. Despite its impressive height, it\'s considered one of the easier 14ers to climb in Colorado.'
    },
    {
        name: 'Mount Hood',
        state: 'Oregon',
        elevation: '11,249 feet',
        weather: 'temperate climate with year-round snow',
        description: 'Mount Hood, Oregon\'s highest peak at 11,249 feet, is a potentially active stratovolcano located in the Cascade Range. The mountain experiences a temperate climate with year-round snow on its upper slopes. It\'s known for its distinctive symmetrical cone shape and is one of the most climbed mountains in the world. The mountain features 12 named glaciers and snowfields, with Timberline Lodge on its southern flank offering year-round skiing. The surrounding area receives significant precipitation, particularly during the winter months, making it a popular destination for winter sports enthusiasts.'
    }
];

async function generateMountainFiles() {
    const tmpDir = path.join(process.cwd(), 'tmp');
    
    for (const mountain of mountains) {
        const fileName = mountain.name.toLowerCase().replace(/\s+/g, '_') + '.json';
        const filePath = path.join(tmpDir, fileName);
        
        await fs.writeFile(filePath, JSON.stringify(mountain, null, 2));
        console.log(`Created file: ${fileName}`);
    }
}

generateMountainFiles().catch(console.error); 