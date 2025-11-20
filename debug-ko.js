const { YoutubeTranscript } = require('youtube-transcript');

async function test() {
    const videoId = 'xDv6rwuY0_0';
    console.log(`Testing video: ${videoId}`);

    try {
        console.log("Fetching with lang: 'ko'...");
        const transcript = await YoutubeTranscript.fetchTranscript(videoId, { lang: 'ko' });
        console.log('Result type:', typeof transcript);
        console.log('Is Array:', Array.isArray(transcript));
        console.log('Length:', transcript.length);
        if (transcript.length > 0) {
            console.log('First item:', transcript[0]);
        } else {
            console.log('Full result:', transcript);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

test();
