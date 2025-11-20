

import {
    IExecuteFunctions,
    IDataObject,
    INodeExecutionData,
    INodeType,
    INodeTypeDescription,
} from 'n8n-workflow';

const { getSubtitles } = require('youtube-caption-extractor');

function convertToSRT(captions: any[]): string {
    return captions.map((caption, index) => {
        const startTime = parseFloat(caption.start);
        const duration = parseFloat(caption.dur);
        const endTime = startTime + duration;

        const formatTime = (seconds: number): string => {
            const hours = Math.floor(seconds / 3600);
            const minutes = Math.floor((seconds % 3600) / 60);
            const secs = Math.floor(seconds % 60);
            const millis = Math.floor((seconds % 1) * 1000);
            return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')},${String(millis).padStart(3, '0')}`;
        };

        return `${index + 1}\n${formatTime(startTime)} --> ${formatTime(endTime)}\n${caption.text}\n`;
    }).join('\n');
}

export class YoutubeTranscript implements INodeType {
    description: INodeTypeDescription = {
        displayName: 'YouTube Transcript',
        name: 'youtubeTranscript',
        icon: 'fa:youtube',
        group: ['transform'],
        version: 1,
        description: 'Get transcript from YouTube video',
        defaults: {
            name: 'YouTube Transcript',
        },
        inputs: ['main'],
        outputs: ['main'],
        properties: [
            {
                displayName: 'Video URL or ID',
                name: 'videoId',
                type: 'string',
                default: '',
                placeholder: 'https://www.youtube.com/watch?v=...',
                description: 'The URL or ID of the YouTube video',
                required: true,
            },
            {
                displayName: 'Language',
                name: 'language',
                type: 'string',
                default: 'ko',
                description: 'The language code for the transcript (e.g., en, ko)',
            },
        ],
    };

    async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
        const items = this.getInputData();
        const returnData: INodeExecutionData[] = [];

        for (let i = 0; i < items.length; i++) {
            try {
                let videoId = this.getNodeParameter('videoId', i) as string;
                const language = this.getNodeParameter('language', i) as string;

                // Extract Video ID if URL is provided
                const urlMatch = videoId.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
                if (urlMatch) {
                    videoId = urlMatch[1];
                }

                const captions = await getSubtitles({
                    videoID: videoId,
                    lang: language,
                });

                const srtContent = convertToSRT(captions);

                returnData.push({
                    json: {
                        videoId,
                        srt: srtContent,
                    },
                });
            } catch (error) {
                if (this.continueOnFail()) {
                    returnData.push({
                        json: {
                            error: (error as Error).message,
                        },
                    });
                    continue;
                }
                throw error;
            }
        }

        return [returnData];
    }
}
