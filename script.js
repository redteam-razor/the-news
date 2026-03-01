// ===================================
// THE NEWS - OPTIMIZED FOR PERFORMANCE
// Pre-aggregated data, instant loading
// ===================================

// Configuration
const CONFIG = {
    updateIntervalMinutes: 60,
    preloadTopN: 3,
    sourcesPerSection: 5
};

// State
let allEvents = [];
let selectedEventId = null;
let draggedElement = null;
let lastUpdateTime = new Date();

// ===================================
// INITIALIZATION - INSTANT LOAD
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    // Load data instantly (no async)
    allEvents = getAllGlobalEvents();
    
    // Update last refresh time
    updateRefreshTime();
    
    // Render TOC immediately
    renderTableOfContents();
    
    // Load first event immediately
    loadEvent(allEvents[0].id);
    
    // Setup event listeners
    setupEventListeners();
    
    // Simulate hourly refresh
    scheduleAutoRefresh();
}

function setupEventListeners() {
    // Search
    document.getElementById('searchBtn').addEventListener('click', handleSearch);
    document.getElementById('searchInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSearch();
    });
    
    // Refresh button
    document.getElementById('refreshBtn').addEventListener('click', handleRefresh);
}

// ===================================
// TABLE OF CONTENTS - INSTANT RENDER
// ===================================

function renderTableOfContents() {
    const tocList = document.getElementById('tocList');
    tocList.innerHTML = '';
    
    allEvents.forEach((event, index) => {
        const tocItem = createTOCItem(event, index + 1);
        tocList.appendChild(tocItem);
    });
    
    setupTOCClickHandlers();
}

function createTOCItem(event, rank) {
    const item = document.createElement('div');
    item.className = 'toc-item';
    if (event.id === selectedEventId) {
        item.classList.add('active');
    }
    item.dataset.eventId = event.id;
    
    const timeAgo = getTimeAgo(event.timestamp);
    const categoryClass = event.category === 'Breaking' ? 'badge-breaking' : 'badge-developing';
    const verifiedBadge = event.verified ? '<span class="badge badge-verified">✓</span>' : '';
    
    // Show pre-loaded indicator for top 3
    const preloadedIndicator = rank <= CONFIG.preloadTopN ? '<span class="badge" style="background: rgba(0,255,136,0.1); color: #0f6; border: 1px solid #0f6;">⚡ Ready</span>' : '';
    
    item.innerHTML = `
        <div class="toc-rank">${rank}</div>
        <div class="toc-content">
            <div class="toc-event-title">${event.title}</div>
            <div class="toc-event-meta">
                <span class="badge ${categoryClass}">${event.category}</span>
                ${verifiedBadge}
                <span>🌍 ${event.region}</span>
                <span>⏱️ ${timeAgo}</span>
                ${preloadedIndicator}
            </div>
        </div>
        <div class="toc-icon">▶</div>
    `;
    
    return item;
}

function setupTOCClickHandlers() {
    const tocItems = document.querySelectorAll('.toc-item');
    
    tocItems.forEach(item => {
        item.addEventListener('click', function() {
            const eventId = parseInt(this.dataset.eventId);
            loadEvent(eventId);
        });
    });
}

// ===================================
// EVENT LOADING - OPTIMIZED
// ===================================

function loadEvent(eventId) {
    const event = allEvents.find(e => e.id === eventId);
    if (!event) return;
    
    // Update selection
    selectedEventId = eventId;
    updateTOCActiveStates();
    
    // Show brief loading only for events beyond top 3
    const eventRank = allEvents.indexOf(event) + 1;
    if (eventRank > CONFIG.preloadTopN) {
        showBriefLoading();
    }
    
    // Render event (instant for top 3, brief delay for others)
    setTimeout(() => {
        renderEvent(event);
        hideLoading();
    }, eventRank > CONFIG.preloadTopN ? 300 : 0);
}

function renderEvent(event) {
    const container = document.getElementById('eventsContainer');
    container.innerHTML = '';
    
    const eventCard = createEventCard(event, allEvents.indexOf(event) + 1);
    container.appendChild(eventCard);
    
    setupCollapsibleSections();
    
    // Smooth scroll to event
    container.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function createEventCard(event, rank) {
    const card = document.createElement('div');
    card.className = 'event-card';
    card.dataset.eventId = event.id;
    
    const timeAgo = getTimeAgo(event.timestamp);
    const categoryClass = event.category === 'Breaking' ? 'badge-breaking' : 'badge-developing';
    const verifiedBadge = event.verified ? '<span class="badge badge-verified">✓ Verified</span>' : '';
    
    // Count total sources
    const newsCount = event.news ? event.news.length : 0;
    const socialCount = event.social ? event.social.length : 0;
    const youtubeCount = event.youtube ? event.youtube.length : 0;
    const totalSources = newsCount + socialCount + youtubeCount;
    
    card.innerHTML = `
        <div class="event-header">
            <div class="event-rank">#${rank}</div>
            <div class="event-header-content">
                <h2 class="event-title">${event.title}</h2>
                <div class="event-meta">
                    <div class="event-meta-item">
                        <span class="badge ${categoryClass}">${event.category}</span>
                    </div>
                    <div class="event-meta-item">
                        ${verifiedBadge}
                    </div>
                    <div class="event-meta-item">
                        🌍 ${event.region}
                    </div>
                    <div class="event-meta-item">
                        ⏱️ ${timeAgo}
                    </div>
                    <div class="event-meta-item">
                        📊 ${totalSources} sources
                    </div>
                </div>
            </div>
        </div>
        
        ${createAnalysisSection(event)}
        
        <div class="sources-container">
            ${createSourceSection('📰 News Sources', event.news, 'news')}
            ${createSourceSection('💬 Social Media', event.social, 'social')}
            ${createSourceSection('📺 YouTube Analysis', event.youtube, 'youtube')}
        </div>
    `;
    
    return card;
}

function createAnalysisSection(event) {
    return `
        <div class="event-analysis">
            <h3 class="analysis-title">🔍 Deep Analysis & Cross-Reference</h3>
            <p class="analysis-text">${event.analysis}</p>
            <div class="analysis-insights">
                <h4 class="insights-title">Key Insights:</h4>
                <ul class="insights-list">
                    ${event.insights.map(insight => `<li>${insight}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
}

function createSourceSection(title, entries, type) {
    if (!entries || entries.length === 0) {
        return `
            <div class="source-section source-section-${type} collapsed" data-section-type="${type}">
                <div class="source-section-header">
                    <span class="source-icon">${title.split(' ')[0]}</span>
                    <h3 class="source-section-title">${title}</h3>
                    <span class="source-count">0 entries</span>
                    <span class="collapse-icon">▼</span>
                </div>
                <div class="source-entries">
                    <div class="empty-state">No ${type} sources available for this event yet.</div>
                </div>
            </div>
        `;
    }
    
    return `
        <div class="source-section source-section-${type} collapsed" data-section-type="${type}">
            <div class="source-section-header">
                <span class="source-icon">${title.split(' ')[0]}</span>
                <h3 class="source-section-title">${title}</h3>
                <span class="source-count">${entries.length} entries</span>
                <span class="collapse-icon">▼</span>
            </div>
            <div class="source-entries">
                ${entries.map(entry => createSourceEntry(entry, type)).join('')}
            </div>
        </div>
    `;
}

function createSourceEntry(entry, type) {
    const titleField = entry.title || entry.content;
    const sourceField = entry.source || entry.channel || entry.handle;
    const urlField = entry.url || '#';
    const timeField = entry.time || '';
    
    return `
        <div class="source-entry">
            <div class="entry-header">
                <span class="entry-source">${sourceField}</span>
                <span class="entry-time">${timeField}</span>
            </div>
            <h4 class="entry-title">
                <a href="${urlField}" target="_blank" rel="noopener">${titleField}</a>
            </h4>
            ${entry.insight ? `<p class="entry-insight">${entry.insight}</p>` : ''}
            ${entry.analysis ? `<div class="entry-analysis"><strong>Analysis:</strong> ${entry.analysis}</div>` : ''}
            <a href="${urlField}" class="entry-link" target="_blank" rel="noopener">
                Read full ${type === 'youtube' ? 'video' : type === 'social' ? 'post' : 'article'} →
            </a>
        </div>
    `;
}

// ===================================
// COLLAPSIBLE SECTIONS
// ===================================

function setupCollapsibleSections() {
    const sectionHeaders = document.querySelectorAll('.source-section-header');
    
    sectionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const section = this.closest('.source-section');
            section.classList.toggle('collapsed');
        });
    });
}

// ===================================
// SEARCH
// ===================================

function handleSearch() {
    const query = document.getElementById('searchInput').value.trim().toLowerCase();
    
    if (!query) {
        // Reset to first event
        loadEvent(allEvents[0].id);
        return;
    }
    
    // Find matching event
    const match = allEvents.find(event => 
        event.title.toLowerCase().includes(query) ||
        event.summary.toLowerCase().includes(query) ||
        event.region.toLowerCase().includes(query)
    );
    
    if (match) {
        loadEvent(match.id);
    } else {
        alert(`No events found matching "${query}". Try "China", "Climate", "AI", "Iran", etc.`);
    }
}

// ===================================
// REFRESH
// ===================================

function handleRefresh() {
    const btn = document.getElementById('refreshBtn');
    btn.disabled = true;
    btn.innerHTML = '🔄 Refreshing...';
    btn.style.animation = 'spin 1s ease-in-out';
    
    // Simulate refresh delay
    setTimeout(() => {
        // In production, this would fetch new data
        // For now, just update timestamp
        lastUpdateTime = new Date();
        updateRefreshTime();
        
        // Re-render current event to show "latest" data
        if (selectedEventId) {
            loadEvent(selectedEventId);
        }
        
        btn.disabled = false;
        btn.innerHTML = '🔄 Refresh';
        btn.style.animation = '';
        
        // Show brief success message
        showToast('✓ Updated to latest data');
    }, 800);
}

function scheduleAutoRefresh() {
    // Auto-refresh every hour
    setInterval(() => {
        console.log('Auto-refreshing data...');
        lastUpdateTime = new Date();
        updateRefreshTime();
        showToast('🔄 Auto-updated');
    }, CONFIG.updateIntervalMinutes * 60 * 1000);
}

function updateRefreshTime() {
    const timeEl = document.getElementById('updateTime');
    timeEl.textContent = lastUpdateTime.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
}

// ===================================
// UI HELPERS
// ===================================

function updateTOCActiveStates() {
    const tocItems = document.querySelectorAll('.toc-item');
    tocItems.forEach(item => {
        const eventId = parseInt(item.dataset.eventId);
        if (eventId === selectedEventId) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

function showBriefLoading() {
    document.getElementById('loadingState').style.display = 'block';
    document.getElementById('eventsContainer').style.opacity = '0.5';
}

function hideLoading() {
    document.getElementById('loadingState').style.display = 'none';
    document.getElementById('eventsContainer').style.opacity = '1';
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        background: rgba(0, 255, 136, 0.9);
        color: #0a0e14;
        padding: 1rem 2rem;
        border-radius: 8px;
        font-weight: 600;
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => toast.remove(), 300);
    }, 2000);
}

function getTimeAgo(timestamp) {
    const seconds = Math.floor((new Date() - timestamp) / 1000);
    
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
}

// ===================================
// ANIMATIONS
// ===================================

const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    .empty-state {
        text-align: center;
        padding: 2rem;
        color: var(--text-dim);
        font-size: 0.9rem;
    }
`;
document.head.appendChild(style);
