const { getSubtitles } = require('youtube-caption-extractor');

async function test() {
    const videoId = 'xDv6rwuY0_0';
    console.log(`Testing youtube-caption-extractor with video: ${videoId}`);
    try {
        const captions = await getSubtitles({ videoID: videoId, lang: 'ko' });
        console.log('Captions found:', captions.length);
        if (captions.length > 0) {
            console.log('First caption:', captions[0]);
            console.log('Second caption:', captions[1]);
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}

test();
