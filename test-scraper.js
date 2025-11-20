const { getSubtitles } = require('youtube-captions-scraper');

async function test() {
    try {
        // Example video ID (Rick Roll)
        const videoId = 'M7lc1UVf-VE';
        const captions = await getSubtitles({
            videoID: videoId,
            lang: 'en' // default
        });
        console.log('Captions found:', captions.length);
        console.log('First caption:', captions[0]);
    } catch (error) {
        console.error('Error fetching captions:', error);
    }
}

test();
