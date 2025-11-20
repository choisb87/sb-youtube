# n8n-nodes-youtube-transcript

n8n community node to fetch YouTube video transcripts/captions in SRT format.

## Installation

```bash
npm install n8n-nodes-youtube-transcript
```

Or install directly in n8n:
1. Go to Settings > Community Nodes
2. Enter `n8n-nodes-youtube-transcript`
3. Click Install

## Usage

1. Add the **YouTube Transcript** node to your workflow
2. Enter the YouTube **Video URL or ID**
3. (Optional) Specify the **Language** code (default: `ko`)
4. The node outputs the transcript in SRT format as a string

### Output

The node returns:
```json
{
  "videoId": "xDv6rwuY0_0",
  "srt": "1\n00:00:00,160 --> 00:00:04,080\n지금 여러분 발밑에서 펼쳐지는\n\n2\n..."
}
```

## Features

- Fetches auto-generated and user-submitted captions
- Supports multiple languages (specify language code like `en`, `ko`, `ja`, etc.)
- Returns transcript in SRT (SubRip) format
- Handles both YouTube URLs and video IDs

## License

MIT
