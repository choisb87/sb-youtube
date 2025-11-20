const { YoutubeTranscript } = require('youtube-transcript');

async function test() {
    try {
        // "Me at the zoo" - usually has captions
        const videoId = 'jNQXAC9IVRw';
        console.log(`Fetching transcript for ${videoId}...`);
        const transcript = await YoutubeTranscript.fetchTranscript(videoId);
        console.log('Transcript result length:', transcript.length);
        if (transcript.length > 0) {
            console.log('First line:', transcript[0]);
        }
    } catch (error) {
        console.error('Error fetching transcript:', error);
    }
}

test();
