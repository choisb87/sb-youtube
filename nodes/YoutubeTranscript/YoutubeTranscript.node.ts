

import {
    IExecuteFunctions,
    IDataObject,
    INodeExecutionData,
    INodeType,
    INodeTypeDescription,
} from 'n8n-workflow';

import { YoutubeTranscript as YoutubeTranscriptApi } from 'youtube-transcript';

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
                default: 'en',
                description: 'The language code for the transcript (e.g., en, ko). Note: This library attempts to fetch the requested language but may fallback or fail if not available.',
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

                const transcript = await YoutubeTranscriptApi.fetchTranscript(videoId, {
                    lang: language,
                });

                returnData.push({
                    json: {
                        videoId,
                        transcript,
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
