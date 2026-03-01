# The News - Multi-Source Global Events Analysis

A sophisticated news aggregator and analysis platform that provides deep, cross-referenced analysis of the top 5 global events from multiple sources.

## Features

### 🔍 Deep Analysis
- **Top 5 Events** ranked by importance
- **Multi-source verification** across news outlets, social media, and video platforms
- **Cross-referencing** between sources to identify consensus and contradictions
- **Expert insights** and analysis for each entry

### 📰 Three-Section Coverage
Each event includes:
1. **News Sources** (5 top entries) - Reuters, BBC, Al Jazeera, AP, Bloomberg, FT, WSJ, Guardian, etc.
2. **Social Media** (5 top entries) - Twitter/X posts from journalists, officials, analysts
3. **YouTube** (5 top entries) - Analysis videos, live coverage, expert commentary

### 🎯 Interactive Features
- **Drag & Drop** events to reorder by your interest
- **Search** for specific events or topics
- **Real-time updates** (simulated with mock data, ready for API integration)
- **Responsive design** works on all devices

### 📊 Current Focus
- Pre-loaded with in-depth analysis of **US/Iran tensions**
- Covers military, economic, and diplomatic dimensions
- Multiple perspectives from US, Iranian, regional, and international sources

## Technical Stack

- **Frontend:** Pure HTML, CSS, JavaScript (no frameworks)
- **Styling:** Modern CSS with dark theme, glassmorphism effects
- **Data:** Mock data structure ready for API integration
- **Deployment:** Vercel (static hosting)

## Live Demo

**URL:** https://the-news-[your-deployment].vercel.app

## API Integration (For Production)

Currently uses mock data. To integrate real APIs:

### News API
```javascript
// Get your free key from https://newsapi.org
const newsApiKey = 'YOUR_KEY_HERE';

async function fetchRealNews(query) {
    const response = await fetch(
        `https://newsapi.org/v2/everything?q=${query}&apiKey=${newsApiKey}`
    );
    return await response.json();
}
```

### YouTube API
```javascript
// Get key from https://console.cloud.google.com
const youtubeApiKey = 'YOUR_KEY_HERE';

async function fetchYouTubeVideos(query) {
    const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?q=${query}&key=${youtubeApiKey}`
    );
    return await response.json();
}
```

### Twitter/X API
```javascript
// Requires Twitter API v2 access
// Use official SDK or REST API
```

## Mock Data Structure

The app uses realistic mock data demonstrating the analysis depth:

```javascript
{
    id: 1,
    title: "Event title",
    summary: "Brief summary",
    timestamp: Date,
    category: "Breaking|Developing|Analysis",
    verified: boolean,
    analysis: "Deep cross-source analysis...",
    insights: ["Key insight 1", "Key insight 2"],
    news: [
        {
            source: "Reuters",
            title: "Article title",
            url: "https://...",
            time: "2 hours ago",
            insight: "What this source says...",
            analysis: "Cross-reference with other sources..."
        }
    ],
    social: [...],
    youtube: [...]
}
```

## Features Breakdown

### Deep Analysis Section
- Synthesizes information across all sources
- Identifies consensus views and contradictions
- Provides historical context
- Highlights key insights and implications

### News Sources
- Major global outlets (Reuters, BBC, CNN, Al Jazeera, etc.)
- Each entry includes:
  - Source credibility assessment
  - Key claims and evidence
  - Cross-reference with other reporting
  - Direct link to original article

### Social Media
- Verified accounts (government officials, journalists, analysts)
- Real-time reactions and updates
- Assessment of sentiment and narratives
- Link to original posts

### YouTube Analysis
- Expert commentary and explainers
- Live coverage feeds
- Documentary-style analysis
- View counts and engagement metrics

## Customization

### Change Default Search Query
```javascript
// In script.js
const CONFIG = {
    defaultQuery: 'US Iran war', // Change this
    topEventsCount: 5,
    sourcesPerSection: 5
};
```

### Add More Sources
```javascript
// Add to mock data or API integration
const additionalSources = [
    'New York Times',
    'Washington Post',
    'The Economist',
    'Financial Times'
];
```

### Modify Ranking Algorithm
```javascript
// Implement custom ranking based on:
// - Source credibility
// - Recency
// - Social engagement
// - Multiple source verification
```

## Future Enhancements

### Planned Features:
- [ ] Real-time WebSocket updates
- [ ] Sentiment analysis across sources
- [ ] Fact-checking integration
- [ ] Historical event tracking
- [ ] Bookmark/save events
- [ ] Export analysis reports
- [ ] Email/push notifications for breaking news
- [ ] Multi-language support
- [ ] Source bias indicators
- [ ] AI-powered summary generation

### Advanced Analysis:
- [ ] Detect contradictory reporting
- [ ] Track narrative evolution over time
- [ ] Identify information gaps
- [ ] Compare official vs independent sources
- [ ] Geographic perspective analysis

## Development

### Local Development
```bash
# Clone repository
git clone https://github.com/redteam-razor/the-news.git
cd the-news

# Open in browser
open index.html

# Or use local server
python -m http.server 8000
# Visit http://localhost:8000
```

### Deploy to Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd the-news
vercel --yes --prod
```

## Use Cases

### Personal Use:
- Stay informed on evolving global events
- See multiple perspectives on same story
- Identify media bias and gaps
- Deep research on specific topics

### Professional Use:
- Journalism: Multi-source research tool
- Intelligence Analysis: Event monitoring
- Financial Markets: Geopolitical risk assessment
- Academic Research: Primary source aggregation

### Crisis Monitoring:
- Real-time updates during breaking events
- Cross-verification of claims
- Identify authoritative sources
- Track narrative development

## Architecture

```
the-news/
├── index.html          # Main HTML structure
├── styles.css          # Complete styling (dark theme)
├── script.js           # Application logic + mock data
└── README.md          # This file
```

### Key Design Decisions:
- **No frameworks:** Fast loading, no build process
- **Static hosting:** Low cost, high performance
- **Mock data:** Demonstrates full capability without API costs
- **Drag & drop:** Vanilla JS, no dependencies
- **Responsive:** Mobile-first design

## Credits

**Built by:** Norman (OpenClaw AI Agent)  
**For:** Rezah Reid  
**Date:** March 2026  
**Framework:** Pure HTML/CSS/JS  
**Inspiration:** Bloomberg Terminal, Reuters Eikon, Financial Times

## License

MIT License - Feel free to modify and use for any purpose.

## Support

For issues or feature requests, contact via Mission Control or GitHub issues.

---

**Note:** This is a demonstration version using mock data. For production use with real APIs, you'll need:
- News API key (free tier available)
- YouTube Data API key
- Twitter API access (paid)
- Consider rate limits and caching strategies
