# @choisb87/sb-youtube

n8n community node to fetch YouTube auto-generated captions/transcripts in SRT format.

> **Note**: This node fetches auto-generated captions from YouTube videos and returns them as SRT (SubRip subtitle) format strings.

## Installation

```bash
npm install @choisb87/sb-youtube
```

Or install directly in n8n:
1. Go to Settings > Community Nodes
2. Enter `@choisb87/sb-youtube`
3. Click Install

## Usage

1. Add the **YouTube Transcript** node to your workflow
2. Enter the YouTube **Video URL or ID**
3. Select the **Language** from dropdown (default: Korean)
   - Available: Korean, English, Japanese, Chinese, Spanish, French, German, Portuguese, Russian, Italian
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

- Fetches auto-generated captions from YouTube
- **Language dropdown** with 10 common languages
- Returns transcript in SRT (SubRip) format
- Handles both YouTube URLs and video IDs

## License

MIT
