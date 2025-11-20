const { getSubtitles } = require('youtube-caption-extractor');

function convertToSRT(captions) {
    return captions.map((caption, index) => {
        const startTime = parseFloat(caption.start);
        const duration = parseFloat(caption.dur);
        const endTime = startTime + duration;

        const formatTime = (seconds) => {
            const hours = Math.floor(seconds / 3600);
            const minutes = Math.floor((seconds % 3600) / 60);
            const secs = Math.floor(seconds % 60);
            const millis = Math.floor((seconds % 1) * 1000);
            return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')},${String(millis).padStart(3, '0')}`;
        };

        return `${index + 1}\n${formatTime(startTime)} --> ${formatTime(endTime)}\n${caption.text}\n`;
    }).join('\n');
}

async function test() {
    const videoId = 'xDv6rwuY0_0';
    console.log(`Testing SRT conversion with video: ${videoId}`);
    try {
        const captions = await getSubtitles({ videoID: videoId, lang: 'ko' });
        const srt = convertToSRT(captions);
        console.log('First 500 characters of SRT:');
        console.log(srt.substring(0, 500));
        console.log(`\nTotal SRT length: ${srt.length} characters`);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

test();
