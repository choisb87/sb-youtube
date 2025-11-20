const { getSubtitles } = require('youtube-captions-scraper');

async function test() {
    const videoId = 'xDv6rwuY0_0';
    console.log(`Testing scraper with video: ${videoId}`);
    try {
        const captions = await getSubtitles({
            videoID: videoId,
            lang: 'ko'
        });
        console.log('Captions found:', captions.length);
        if (captions.length > 0) {
            console.log('First caption:', captions[0]);
        }
    } catch (error) {
        console.error('Error fetching captions:', error);
    }
}

test();
