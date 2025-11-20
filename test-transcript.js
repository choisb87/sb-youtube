const { YoutubeTranscript } = require('youtube-transcript');


async function test() {
    try {
        // Example video ID (Rick Roll)
        const videoId = 'xDv6rwuY0_0';
        const transcript = await YoutubeTranscript.fetchTranscript(videoId);
        console.log('Transcript result:', transcript);
        if (transcript) {
            console.log('Transcript length:', transcript.length);
            console.log('First line:', transcript[0]);
        }
    } catch (error) {
        console.error('Error fetching transcript:', error);
    }
}

test();
