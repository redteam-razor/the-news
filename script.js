// ===================================
// THE NEWS - MAIN APPLICATION
// ===================================

// Configuration
const CONFIG = {
    newsApiKey: 'YOUR_NEWS_API_KEY_HERE', // Get free key from newsapi.org
    defaultQuery: 'US Iran war', // Initial focus
    topEventsCount: 10,
    sourcesPerSection: 5
};

// State
let allEvents = [];
let selectedEventIds = [];
let draggedElement = null;

// ===================================
// INITIALIZATION
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    setupEventListeners();
});

function initializeApp() {
    // Load all global events
    loadAllEvents();
}

function setupEventListeners() {
    // Search functionality
    document.getElementById('searchBtn').addEventListener('click', handleSearch);
    document.getElementById('searchInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSearch();
    });
}

function handleSearch() {
    const query = document.getElementById('searchInput').value.trim();
    if (query) {
        loadEventsByQuery(query);
    } else {
        // Reset to first event if search cleared
        selectedEventIds = [allEvents[0].id];
        updateTOCActiveStates();
        renderSelectedEvents();
    }
}

// ===================================
// DATA FETCHING
// ===================================

async function loadAllEvents() {
    showLoading(true);
    
    try {
        // Load all global events from events-data.js
        allEvents = getAllGlobalEvents();
        
        // Render TOC with all events
        renderTableOfContents(allEvents);
        
        // Load first event by default
        selectedEventIds = [allEvents[0].id];
        renderSelectedEvents();
        
        showLoading(false);
    } catch (error) {
        console.error('Error loading events:', error);
        showNoResults();
        showLoading(false);
    }
}

async function loadEventsByQuery(query) {
    showLoading(true);
    
    try {
        // Filter events by search query
        const filtered = allEvents.filter(event => 
            event.title.toLowerCase().includes(query.toLowerCase()) ||
            event.summary.toLowerCase().includes(query.toLowerCase()) ||
            event.region.toLowerCase().includes(query.toLowerCase())
        );
        
        if (filtered.length === 0) {
            showNoResults();
            return;
        }
        
        selectedEventIds = filtered.slice(0, 5).map(e => e.id);
        renderSelectedEvents();
        showLoading(false);
    } catch (error) {
        console.error('Error filtering events:', error);
        showNoResults();
        showLoading(false);
    }
}

function showNoResults() {
    document.getElementById('noResults').style.display = 'block';
    document.getElementById('eventsContainer').style.display = 'none';
}

function getTimeAgo(timestamp) {
    const seconds = Math.floor((new Date() - timestamp) / 1000);
    
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    return `${Math.floor(seconds / 86400)} days ago`;
}

function getCategoryBadge(category) {
    const badges = {
        'Breaking': '<span class="badge badge-breaking">🔴 Breaking</span>',
        'Developing': '<span class="badge badge-developing">🟡 Developing</span>',
        'Analysis': '<span class="badge">📊 Analysis</span>'
    };
    return badges[category] || `<span class="badge">${category}</span>`;
}
