# Setting Up Gemini AI Chatbot

## Get Your Free Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy your API key

## Configure the App

1. Open `constants/gemini.ts`
2. Replace `YOUR_GEMINI_API_KEY_HERE` with your actual API key:

```typescript
export const GEMINI_API_KEY = 'AIzaSy...your-actual-key-here';
```

3. Save the file and restart the app

## Features

- **Real-time AI responses** powered by Google's Gemini Pro model
- **Context-aware** conversations about Vietnamese Republic history (1955-1975)
- **Fallback mode** - Works with local pattern matching if API key not configured
- **Smart prompting** - AI is instructed to focus on VNCH historical topics

## API Limits

The free tier includes:
- 60 requests per minute
- Perfect for personal and educational use

## Privacy

- Your API key is stored locally in your app
- Messages are sent directly to Google's Gemini API
- No conversation data is stored on external servers by this app

## Troubleshooting

**"Chưa cấu hình API Key" alert appears:**
- Make sure you've added your API key to `constants/gemini.ts`
- Check that the key doesn't have extra quotes or spaces

**Responses are slow:**
- This is normal for AI processing
- Gemini Pro typically responds in 2-5 seconds

**Error messages:**
- Verify your API key is valid
- Check your internet connection
- Ensure you haven't exceeded API rate limits
