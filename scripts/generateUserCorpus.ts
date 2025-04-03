#! /usr/bin/env ts-node
import { promises as fs } from 'fs';
import path from 'path';

const mountains = [
    {
        name: 'Mount Rainier',
        state: 'Washington',
        elevation: '14,411 feet',
        weather: 'temperate rainforest climate with heavy snowfall',
        description: 'Mount Rainier, an active stratovolcano, stands as the highest peak in Washington state at 14,411 feet. Located in Mount Rainier National Park, it features temperate rainforest climate with heavy snowfall, especially during winter months. The mountain is known for its extensive glaciation, with 26 major glaciers covering its slopes. Its summit is often shrouded in clouds, creating a mystical appearance that has earned it the nickname "The Mountain." The surrounding area experiences significant precipitation, with the Paradise Ranger Station receiving an average of 53 feet of snow annually.',
        tags: ['Mount Rainier', 'Washington', 'Mountains', 'Mountains of Washington', 'Mountains of the United States', 'Mountains of the World', 'Mountains of the Pacific Northwest', 'Mountains of the United States', 'Mountains of the World', 'Mountains of the Pacific Northwest']
    },
    {
        name: 'Mount Whitney',
        state: 'California',
        elevation: '14,505 feet',
        weather: 'alpine climate with extreme temperature variations',
        description: 'Mount Whitney, the highest peak in the contiguous United States at 14,505 feet, is located in California\'s Sierra Nevada range. The mountain experiences an alpine climate with extreme temperature variations between day and night. Summers are typically dry and mild, while winters bring heavy snowfall and freezing temperatures. The mountain is a popular destination for hikers, particularly through the Mount Whitney Trail, which offers stunning views of the surrounding Inyo National Forest. Despite its impressive height, it\'s relatively accessible compared to other major peaks.',
        tags: ['Mount Whitney', 'California', 'Mountains', 'Mountains of California', 'Mountains of the United States', 'Mountains of the World', 'Mountains of the Pacific Northwest', 'Mountains of the United States', 'Mountains of the World', 'Mountains of the Pacific Northwest']
    },
    {
        name: 'Denali',
        state: 'Alaska',
        elevation: '20,310 feet',
        weather: 'subarctic climate with severe winter conditions',
        description: 'Denali, formerly known as Mount McKinley, is the highest peak in North America at 20,310 feet. Located in Alaska\'s Denali National Park and Preserve, it experiences a subarctic climate with severe winter conditions. The mountain is known for its extreme weather, with temperatures often dropping below -40°F in winter. Its massive bulk creates its own weather patterns, and the summit is frequently shrouded in clouds. The mountain\'s base-to-summit rise of about 18,000 feet is greater than that of Mount Everest, making it one of the most prominent peaks in the world.',
        tags: ['Denali', 'Alaska', 'Mountains', 'Mountains of Alaska', 'Mountains of the United States', 'Mountains of the World', 'Mountains of the Pacific Northwest', 'Mountains of the United States', 'Mountains of the World', 'Mountains of the Pacific Northwest']
    },
    {
        name: 'Mount Elbert',
        state: 'Colorado',
        elevation: '14,440 feet',
        weather: 'high-altitude climate with frequent afternoon thunderstorms',
        description: 'Mount Elbert, the highest peak in Colorado at 14,440 feet, is located in the Sawatch Range of the Rocky Mountains. The mountain experiences a high-altitude climate characterized by frequent afternoon thunderstorms during the summer months. Winters bring heavy snowfall and extreme cold, while summers are relatively mild with clear mornings often giving way to afternoon storms. The mountain\'s gentle slopes make it a popular destination for hikers attempting to summit Colorado\'s highest peak. Despite its impressive height, it\'s considered one of the easier 14ers to climb in Colorado.',
        tags: ['Mount Elbert', 'Colorado', 'Mountains', 'Mountains of Colorado', 'Mountains of the United States', 'Mountains of the World', 'Mountains of the Pacific Northwest', 'Mountains of the United States', 'Mountains of the World', 'Mountains of the Pacific Northwest']
    },
    {
        name: 'Mount Hood',
        state: 'Oregon',
        elevation: '11,249 feet',
        weather: 'temperate climate with year-round snow',
        description: 'Mount Hood, Oregon\'s highest peak at 11,249 feet, is a potentially active stratovolcano located in the Cascade Range. The mountain experiences a temperate climate with year-round snow on its upper slopes. It\'s known for its distinctive symmetrical cone shape and is one of the most climbed mountains in the world. The mountain features 12 named glaciers and snowfields, with Timberline Lodge on its southern flank offering year-round skiing. The surrounding area receives significant precipitation, particularly during the winter months, making it a popular destination for winter sports enthusiasts.',
        tags: ['Mount Hood', 'Oregon', 'Mountains', 'Mountains of Oregon', 'Mountains of the United States', 'Mountains of the World', 'Mountains of the Pacific Northwest', 'Mountains of the United States', 'Mountains of the World', 'Mountains of the Pacific Northwest']
    },
    {
        name: 'Mount Logan',
        country: 'Canada',
        elevation: '19,551 feet',
        weather: 'arctic climate with extreme cold and heavy snowfall',
        description: 'Mount Logan is the highest peak in Canada at 19,551 feet and the second-highest in North America. Located in Kluane National Park and Reserve in Yukon, it experiences an arctic climate with extreme cold and heavy snowfall throughout the year. The mountain is known for its massive size, with a base circumference of nearly 100 miles. Its remote location and severe weather conditions make it one of the most challenging climbs in North America. The mountain is part of the Saint Elias Mountains and continues to grow in height due to tectonic uplifting.',
        tags: ['Mount Logan', 'Canada', 'Mountains', 'Mountains of Canada', 'Mountains of North America', 'Mountains of the World', 'Saint Elias Mountains', 'Yukon Mountains']
    },
    {
        name: 'Mount Robson',
        country: 'Canada',
        elevation: '12,972 feet',
        weather: 'alpine climate with heavy precipitation',
        description: 'Mount Robson is the highest peak in the Canadian Rockies at 12,972 feet. Located in Mount Robson Provincial Park in British Columbia, it features an alpine climate with heavy precipitation throughout the year. The mountain is known for its impressive north face, which rises over 10,000 feet from the valley floor. Its summit is often shrouded in clouds, making successful ascents rare. The mountain is part of the Rainbow Range and is a UNESCO World Heritage Site as part of the Canadian Rocky Mountain Parks.',
        tags: ['Mount Robson', 'Canada', 'Mountains', 'Mountains of Canada', 'Mountains of North America', 'Mountains of the World', 'Canadian Rockies', 'British Columbia Mountains']
    },
    {
        name: 'Pico de Orizaba',
        country: 'Mexico',
        elevation: '18,491 feet',
        weather: 'tropical highland climate with distinct wet and dry seasons',
        description: 'Pico de Orizaba, also known as Citlaltépetl, is the highest peak in Mexico and the third highest in North America at 18,491 feet. This stratovolcano is located on the border of Veracruz and Puebla states and features a tropical highland climate with distinct wet and dry seasons. The mountain is home to Mexico\'s largest glacier and is considered dormant, with its last eruption occurring in the 19th century. Its name comes from the Nahuatl language, meaning "Star Mountain," and it holds significant cultural importance to indigenous communities in the region.',
        tags: ['Pico de Orizaba', 'Citlaltépetl', 'Mexico', 'Mountains', 'Mountains of Mexico', 'Mountains of North America', 'Mountains of the World', 'Volcanoes of Mexico', 'Trans-Mexican Volcanic Belt']
    },
    {
        name: 'Popocatépetl',
        country: 'Mexico',
        elevation: '17,802 feet',
        weather: 'high-altitude tropical climate with frequent volcanic activity',
        description: 'Popocatépetl is an active stratovolcano and the second-highest peak in Mexico at 17,802 feet. Located in the states of Puebla, Morelos, and Mexico, it features a high-altitude tropical climate with frequent volcanic activity. The mountain\'s name comes from the Nahuatl language, meaning "Smoking Mountain," which is fitting given its regular emissions of gas and ash. The volcano is closely monitored due to its proximity to Mexico City, just 45 miles away. Despite its active status, the mountain holds cultural significance and is paired in Mexican folklore with the nearby Iztaccíhuatl volcano.',
        tags: ['Popocatépetl', 'Mexico', 'Mountains', 'Mountains of Mexico', 'Mountains of North America', 'Mountains of the World', 'Volcanoes of Mexico', 'Active Volcanoes', 'Trans-Mexican Volcanic Belt']
    }
];


export async function generateMountainFiles() {
    const tmpDir = path.join(process.cwd(), 'tmp');
    
    // Create tmp directory if it doesn't exist
    try {
        await fs.mkdir(tmpDir, { recursive: true });
    } catch (error) {
        console.log('tmp directory already exists or could not be created');
    }
    
    for (const mountain of mountains) {
        const fileName = mountain.name.toLowerCase().replace(/\s+/g, '_') + '.json';
        const filePath = path.join(tmpDir, fileName);
        
        await fs.writeFile(filePath, JSON.stringify(mountain, null, 2));
        console.log(`Created file: ${fileName}`);
    }
}

generateMountainFiles().catch(console.error); 
