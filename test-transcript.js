const { YoutubeTranscript } = require('youtube-transcript');



async function test() {
    try {
        // Example video ID (Rick Roll)
        const videoId = 'xDv6rwuY0_0';
        console.log('Attempting to fetch with lang: ko');
        try {
            const transcriptKo = await YoutubeTranscript.fetchTranscript(videoId, { lang: 'ko' });
            console.log('Success (ko):', transcriptKo.length);
        } catch (e) { console.log('Failed (ko):', e.message); }

        console.log('Attempting to fetch with lang: en');
        try {
            const transcriptEn = await YoutubeTranscript.fetchTranscript(videoId, { lang: 'en' });
            console.log('Success (en):', transcriptEn.length);
        } catch (e) { console.log('Failed (en):', e.message); }

        // Fallback to default for logging if above fail, or just end
        return;
    }
    catch (error) {
        console.error('Error fetching transcript:', error);
    }
}

test();
