// ===================================
// THE NEWS - MAIN APPLICATION
// ===================================

// Configuration
const CONFIG = {
    newsApiKey: 'YOUR_NEWS_API_KEY_HERE', // Get free key from newsapi.org
    defaultQuery: 'US Iran war', // Initial focus
    topEventsCount: 5,
    sourcesPerSection: 5
};

// State
let currentEvents = [];
let draggedElement = null;

// ===================================
// INITIALIZATION
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    setupEventListeners();
});

function initializeApp() {
    // Load initial news about US/Iran
    loadEvents(CONFIG.defaultQuery);
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
        loadEvents(query);
    }
}

// ===================================
// DATA FETCHING
// ===================================

async function loadEvents(query) {
    showLoading(true);
    
    try {
        // In production, this would call News API
        // For now, using mock data with realistic structure
        const events = await fetchNewsEvents(query);
        currentEvents = events.slice(0, CONFIG.topEventsCount);
        
        renderEvents(currentEvents);
        showLoading(false);
    } catch (error) {
        console.error('Error loading events:', error);
        showNoResults();
        showLoading(false);
    }
}

async function fetchNewsEvents(query) {
    // Mock data for demonstration
    // In production, replace with real API calls
    
    if (query.toLowerCase().includes('iran') || query.toLowerCase().includes('us')) {
        return getMockUSIranEvents();
    }
    
    return getMockGlobalEvents();
}

function getMockUSIranEvents() {
    return [
        {
            id: 1,
            title: "US-Iran Tensions Escalate Following Naval Incident in Strait of Hormuz",
            summary: "Heightened military activity as US destroyer encounters Iranian fast attack craft",
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
            category: "Breaking",
            verified: true,
            analysis: "The latest confrontation in the Strait of Hormuz marks a significant escalation in US-Iran relations, with both nations deploying additional military assets to the region. This incident follows a pattern of increasing tensions since the collapse of nuclear negotiations in 2025. Multiple intelligence sources suggest both sides are positioning for potential conflict while maintaining diplomatic channels remain open.",
            insights: [
                "Oil prices surge 8% on shipping concerns through critical transit route",
                "NATO allies express concern; emergency UN Security Council meeting scheduled",
                "Regional powers Saudi Arabia and UAE increase military readiness",
                "Diplomatic backchannel communications reportedly ongoing despite public rhetoric"
            ],
            news: [
                {
                    source: "Reuters",
                    title: "US Warship Confronts Iranian Vessels in Strait of Hormuz",
                    url: "https://reuters.com/world/middle-east/us-iran-strait-hormuz",
                    time: "2 hours ago",
                    insight: "Reuters reports increased military posturing with USS John McCain shadowed by 11 Iranian fast attack craft. Pentagon confirms defensive measures taken but no shots fired.",
                    analysis: "Reuters' exclusive access to Pentagon sources provides detailed timeline of the 4-hour standoff. Cross-referencing with Iranian state media (IRNA) shows conflicting narratives: US claims Iranian vessels approached within 150 yards (dangerous proximity), while Iran states they were conducting routine patrols in sovereign waters."
                },
                {
                    source: "BBC World",
                    title: "Iran Warns of 'Decisive Response' to US Military Presence",
                    url: "https://bbc.com/news/world-middle-east-iran-us",
                    time: "3 hours ago",
                    insight: "BBC quotes Iranian Foreign Ministry stating US naval operations violate international maritime law. Threatens 'appropriate and decisive response' if provocations continue.",
                    analysis: "BBC's Middle East bureau confirms Iranian Revolutionary Guard has mobilized coastal defense systems. This aligns with satellite imagery from independent analysts showing missile batteries repositioned along the coast. The language ('decisive response') mirrors rhetoric used before the 2020 Soleimani aftermath."
                },
                {
                    source: "Al Jazeera",
                    title: "Regional Powers React to US-Iran Standoff",
                    url: "https://aljazeera.com/news/iran-us-regional-reaction",
                    time: "1 hour ago",
                    insight: "Al Jazeera interviews reveal Saudi Arabia and UAE privately urging de-escalation while publicly supporting US security presence. Iraq caught between competing pressures.",
                    analysis: "Al Jazeera's regional network provides crucial context: Gulf states fear economic disruption (40% of global oil passes through Hormuz) but also worry about Iranian regional ambitions. The dual messaging - public support for US, private pleas for restraint - indicates deep regional anxiety about potential conflict."
                },
                {
                    source: "Associated Press",
                    title: "Pentagon Confirms Increased Middle East Force Readiness",
                    url: "https://apnews.com/article/us-iran-military-pentagon",
                    time: "4 hours ago",
                    insight: "AP sources confirm B-52 bombers deployed to regional bases, carrier strike group USS Theodore Roosevelt diverted to Persian Gulf. Force readiness elevated to DEFCON 3 equivalent.",
                    analysis: "AP's Pentagon sources reveal military preparations exceed public statements. The deployment pattern (air assets + naval + special operations pre-positioning) matches historical preparations for major operations. However, State Department sources tell AP diplomatic channels remain active, suggesting military moves may be signaling rather than preparation for imminent strikes."
                },
                {
                    source: "The Guardian",
                    title: "Oil Markets Volatile Amid Strait of Hormuz Tensions",
                    url: "https://theguardian.com/business/oil-iran-us-tensions",
                    time: "1 hour ago",
                    insight: "Brent crude jumps $7/barrel in 24 hours. Shipping insurers increase premiums 300% for Hormuz transit. Asian importers seek alternative routes.",
                    analysis: "The Guardian's business desk connects military tensions to economic reality: 21% of global petroleum passes through this 21-mile-wide chokepoint. South Korea and Japan (major oil importers) are already negotiating emergency supplies from US strategic reserve. This economic pressure may force diplomatic resolution faster than military considerations."
                }
            ],
            social: [
                {
                    source: "Twitter/X",
                    handle: "@SecState",
                    content: "The United States remains committed to freedom of navigation in international waters. We call on Iran to cease unsafe maritime practices.",
                    time: "2 hours ago",
                    insight: "Official US State Department position emphasizes 'international waters' framing, key legal argument in the dispute.",
                    analysis: "State Department's word choice ('unsafe practices' not 'aggression') leaves diplomatic room for de-escalation. Compare to 2020 language ('acts of war') - this is notably more restrained. However, 47K retweets suggest high public attention and pressure for strong response."
                },
                {
                    source: "Twitter/X",
                    handle: "@khamenei_ir",
                    content: "Persian Gulf security is Iran's responsibility. Foreign military presence is the source of instability, not the solution.",
                    time: "3 hours ago",
                    insight: "Iranian Supreme Leader frames issue as sovereignty vs. foreign intervention, rallying domestic and regional support.",
                    analysis: "Khamenei's reference to 'Persian Gulf' (not 'Arabian Gulf' used by Arab states) is itself a political statement. Tweet's 89K likes show strong domestic support base. Cross-reference with Iranian state TV shows coordinated messaging campaign - government preparing public for potential conflict or using external threat for internal unity."
                },
                {
                    source: "Twitter/X",
                    handle: "@ElizSly (Washington Post)",
                    content: "Sources: Backchannel talks ongoing via Oman. Both sides seeking off-ramp but domestic politics complicate. Neither wants war but both worry about appearing weak.",
                    time: "1 hour ago",
                    insight: "Veteran ME correspondent reveals active diplomacy despite public tensions - classic pattern before crisis resolution or escalation.",
                    analysis: "Liz Sly's 25 years covering Middle East conflicts lends credibility. Her 'neither wants war' assessment aligns with what we're seeing: both sides escalating military posture while maintaining diplomatic contact. Oman's role as mediator (successfully facilitated 2015 nuclear deal backchannel) is significant - suggests serious talks, not just messaging."
                },
                {
                    source: "Twitter/X",
                    handle: "@Conflicts",
                    content: "BREAKING: Satellite imagery shows Iranian coastal defense systems repositioned. At least 12 anti-ship missile batteries moved to Hormuz-facing positions in past 48 hours.",
                    time: "4 hours ago",
                    insight: "Independent OSINT confirms Iranian military movements, providing verification beyond government claims.",
                    analysis: "Open source intelligence from Conflicts (1.2M followers, established credibility) provides crucial independent verification. Cross-checking with commercial satellite providers (Planet Labs, Maxar) would confirm. The 48-hour timeframe suggests this was planned response to earlier US carrier diversion, not reactive to today's incident."
                },
                {
                    source: "Twitter/X",
                    handle: "@Oil_Marketwatch",
                    content: "Hormuz risk premium now priced at $8-10/barrel. If sustained, global recession risk increases significantly. Markets betting on diplomatic resolution within 2 weeks or major economic impact.",
                    time: "30 minutes ago",
                    insight: "Financial markets provide independent assessment: serious situation but expectation of resolution, not prolonged closure.",
                    analysis: "Oil traders' 2-week timeline for resolution aligns with historical patterns - Hormuz crises typically resolve quickly due to economic pressure. However, if tensions persist past this window, we'd see panic buying and strategic reserve releases. The $8-10 premium is significant but not yet crisis-level ($20+ in 2019 Saudi attack)."
                }
            ],
            youtube: [
                {
                    channel: "Sky News",
                    title: "LIVE: US-Iran Crisis - Latest Updates from Persian Gulf",
                    url: "https://youtube.com/watch?v=mock1",
                    views: "245K views",
                    time: "Streaming now",
                    insight: "24/7 coverage with rotating expert panels and field correspondents. Currently showing satellite imagery analysis.",
                    analysis: "Sky News' live feed provides real-time updates but quality varies with guest expertise. Notable: Their defense analyst (ex-NATO) emphasized both sides' interest in avoiding miscalculation, while political commentator pushed more alarmist narrative. Viewer comments split along ideological lines - reminder that even 'neutral' coverage gets filtered through audience priors."
                },
                {
                    channel: "Al Jazeera English",
                    title: "The Strait of Hormuz: Why This Waterway Matters to the World",
                    url: "https://youtube.com/watch?v=mock2",
                    views: "89K views",
                    time: "2 hours ago",
                    insight: "Explainer video detailing strategic importance, history of conflicts, economic implications. Strong regional perspective.",
                    analysis: "AJE's explainer provides crucial context missing from breaking news coverage. Key points: 1) Iran can't actually close Hormuz without massive economic self-harm (they export through it too), 2) Historical precedent: every Hormuz crisis since 1980s resolved diplomatically within weeks, 3) Current situation less severe than 1988 or 2019 incidents. This context suggests current crisis may be more posturing than precursor to war."
                },
                {
                    channel: "CSIS (Think Tank)",
                    title: "Expert Analysis: US-Iran Escalation Scenarios and Off-Ramps",
                    url: "https://youtube.com/watch?v=mock3",
                    views: "34K views",
                    time: "5 hours ago",
                    insight: "High-quality policy analysis from Center for Strategic & International Studies. Three scenarios: de-escalation (60% probability), limited strikes (30%), broader conflict (10%).",
                    analysis: "CSIS analysis is most sober assessment available. Their probabilistic approach (de-escalation most likely) based on: 1) Neither side's political leadership wants war, 2) Military-to-military communication channels functioning, 3) Economic incentives favor resolution, 4) Regional allies pressuring both sides. The 10% broader conflict scenario hinges on miscalculation or accident, not intentional escalation."
                },
                {
                    channel: "DW News",
                    title: "EU Attempts to Mediate US-Iran Tensions as Germany Calls Emergency Meeting",
                    url: "https://youtube.com/watch?v=mock4",
                    views: "67K views",
                    time: "3 hours ago",
                    insight: "European perspective: EU sees opportunity to play mediator role, rebuild credibility after failed nuclear deal salvage attempts.",
                    analysis: "DW's coverage highlights often-overlooked European angle: Germany, France, UK desperately want to prevent conflict (oil price shock would hit recovering EU economy hard). EU's offer to mediate is both altruistic and self-interested. However, past failures to save nuclear deal make both US and Iran skeptical of European effectiveness. The real action is US-Iran direct talks via Oman, per Elizabeth Sly's reporting."
                },
                {
                    channel: "CaspianReport",
                    title: "Geopolitics of the Persian Gulf: Understanding Iran's Strategic Calculus",
                    url: "https://youtube.com/watch?v=mock5",
                    views: "156K views",
                    time: "6 hours ago",
                    insight: "Deep-dive geopolitical analysis. Explains why Iran uses asymmetric naval tactics (fast attack craft, not blue-water navy) and how Hormuz leverage is Tehran's primary deterrent.",
                    analysis: "CaspianReport's geopolitical framework is essential for understanding Iranian behavior: Tehran sees Hormuz control as its 'escalation dominance' - ability to inflict economic pain globally if attacked. Today's incident fits this pattern: demonstrating capability without triggering full response. This is rational deterrence, not irrational aggression. Implies crisis is manageable if both sides maintain rational calculus."
                }
            ]
        },
        {
            id: 2,
            title: "Global Markets React: Emergency Fed Meeting Scheduled Amid Crisis",
            summary: "Central banks coordinate response to potential oil supply disruption",
            timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
            category: "Developing",
            verified: true,
            analysis: "Financial markets are pricing in significant economic risk from the US-Iran standoff, with oil futures, equity markets, and currency markets all showing volatility. The Federal Reserve's decision to schedule an emergency meeting signals serious concern about macroeconomic stability. Coordinated central bank action historically precedes either major interventions or signals of confidence that crisis will resolve.",
            insights: [
                "S&P 500 down 3.2% in overnight trading; Asian markets closed lower",
                "Flight to safety assets: Gold up 4%, Treasury yields drop to 3-month lows",
                "OPEC emergency meeting called; strategic petroleum reserve release under consideration",
                "Shipping companies diverting tankers to longer routes around Africa"
            ],
            news: [
                {
                    source: "Bloomberg",
                    title: "Fed Calls Emergency Meeting as Oil Shock Threatens Inflation Progress",
                    url: "https://bloomberg.com/news/fed-emergency-oil-iran",
                    time: "30 minutes ago",
                    insight: "Federal Reserve governors to convene emergency session Monday. Market interprets as preparation for potential crisis response, though Fed hasn't confirmed agenda.",
                    analysis: "Bloomberg's Fed sources suggest split within the central bank: some see this as temporary supply shock requiring no action, others worry sustained higher oil prices could reignite inflation and unravel years of tight monetary policy. Emergency meetings are rare - last one was COVID 2020. This signals genuine concern, not just precautionary planning."
                },
                {
                    source: "Financial Times",
                    title: "Oil Traders Price In 20% Probability of Hormuz Closure",
                    url: "https://ft.com/content/oil-hormuz-crisis",
                    time: "1 hour ago",
                    insight: "FT's proprietary market sentiment analysis shows derivatives traders pricing significant but not overwhelming risk of supply disruption.",
                    analysis: "The 20% probability is crucial context: markets are worried, not panicked. For comparison, during 2019 Saudi Aramco attack, traders priced 40% probability. During 1990 Iraq-Kuwait crisis, over 60%. Current pricing suggests sophisticated market participants (who have better information than most) see this as serious but likely resolvable."
                },
                {
                    source: "Wall Street Journal",
                    title: "Energy Sector Surges as Defense Stocks Rally on Middle East Tensions",
                    url: "https://wsj.com/articles/markets-iran-us",
                    time: "2 hours ago",
                    insight: "WSJ notes divergent market moves: energy and defense up sharply, while broad market down. This is classic 'crisis rotation' pattern.",
                    analysis: "Market mechanics reveal investor psychology: not expecting total war (which would crash everything), but rather localized conflict that benefits specific sectors. Energy stocks (Exxon, Chevron) up 8-12% - betting on sustained higher prices. Defense (Lockheed, Raytheon) up 5-7% - expecting increased procurement. But airlines, retailers down - consumer spending threatened by higher fuel costs."
                },
                {
                    source: "Reuters",
                    title: "China Signals Readiness to Release Strategic Oil Reserves",
                    url: "https://reuters.com/markets/commodities/china-oil-reserves",
                    time: "3 hours ago",
                    insight: "China's National Energy Administration hints at coordinated strategic reserve release with US, Japan, South Korea if crisis persists.",
                    analysis: "China's willingness to coordinate with US on reserves (happened only once before, in 2021) signals Beijing sees genuine economic threat. More significantly: implies China is communicating with US at high levels despite broader geopolitical tensions. Crisis creating strange bedfellows - both superpowers have interest in stable oil markets even as they compete elsewhere."
                },
                {
                    source: "CNBC",
                    title: "Hedge Funds Slash Risk Exposure as Volatility Spikes",
                    url: "https://cnbc.com/hedge-funds-risk-reduction",
                    time: "1 hour ago",
                    insight: "CNBC sources report major hedge funds reducing leverage and moving to cash amid uncertainty. VIX (fear index) jumps to 6-month high.",
                    analysis: "Professional money managers' behavior tells us more than headlines: they're not betting on war, but they're not willing to hold risky positions while outcomes uncertain. This de-risking itself becomes market-moving - creates downward pressure on stocks even if fundamentals haven't changed. Classic reflexivity: fear of volatility creates volatility."
                }
            ],
            social: [
                {
                    source: "Twitter/X",
                    handle: "@TheStalwart (Bloomberg columnist)",
                    content: "Markets are saying: this is serious but not existential. If traders really thought Hormuz was closing, oil would be $150 not $88. Still think diplomatic resolution likely within days.",
                    time: "45 minutes ago",
                    insight: "Veteran markets journalist provides reality check: current pricing doesn't support worst-case scenarios.",
                    analysis: "Joe Weisenthal's market read is important: he's separating headline drama from actual risk. $88 oil (up from $81 pre-crisis) is significant but not panic level. 2008 saw $147, 2022 Ukraine invasion hit $120. Current levels suggest market consensus aligns with diplomatic resolution scenario. However, rapid price increase (8% in 24hrs) shows market is watching closely and could reprice quickly."
                },
                {
                    source: "Twitter/X",
                    handle: "@lisaabramowicz1 (Bloomberg TV)",
                    content: "Overnight: -3.2% S&P, +8% oil, +4% gold, -15bps 10yr. Classic flight-to-safety pattern. Bond market is saying: Fed, don't you dare hike rates into this. Recession risk rising.",
                    time: "1 hour ago",
                    insight: "Bloomberg anchor succinctly captures full market reaction in single tweet - bond market signaling Fed should stay cautious.",
                    analysis: "Lisa Abramowicz's observation about bond yields (-15 basis points) is crucial: Treasury market is pricing in economic slowdown risk. When oil prices spike, it acts as tax on consumers (higher gas prices) and businesses (higher input costs). Bond traders betting Fed recognizes this and won't tighten into potential slowdown. This dynamic creates political pressure for diplomatic resolution - recession before election year would be disaster."
                },
                {
                    source: "Twitter/X",
                    handle: "@zerohedge",
                    content: "BREAKING: Historic correlation between oil spikes and recessions suggests 70% probability of economic downturn if prices stay above $90 for 6 months. Fed trapped between inflation and growth.",
                    time: "2 hours ago",
                    insight: "Financial blog highlights Fed's policy dilemma: can't ignore inflation from oil shock, but can't tighten into potential recession.",
                    analysis: "ZeroHedge is often alarmist, but the underlying point is valid: past oil shocks (1973, 1979, 2008) preceded recessions. However, context matters: US now net energy exporter (wasn't in 1973/1979), economy less oil-dependent than past. Modern correlation weaker. Still, political pressure on administration to resolve crisis grows with every dollar added to gas prices."
                },
                {
                    source: "Twitter/X",
                    handle: "@RealVisionTV",
                    content: "Raoul Pal: This crisis is gift to commodities bulls. But also forces diplomatic resolution faster than any other single factor. Nobody wants $100 oil 8 months before election. Watch for swift de-escalation.",
                    time: "3 hours ago",
                    insight: "Macro investor sees political economy angle: electoral calendar creates urgency for resolution.",
                    analysis: "Pal's political economy read is sharp: US administration faces huge political pressure to solve this before November 2026 elections. $4+ gasoline destroys approval ratings. This creates asymmetric pressure: Iran knows US is motivated to negotiate, US knows Iran's economy also suffering from its own oil disruptions. Mutual pain creates incentive for mutual de-escalation."
                },
                {
                    source: "Twitter/X",
                    handle: "@Convertbond (hedge fund manager)",
                    content: "Bought more energy stocks. Thesis: even if this crisis resolves (likely), it exposes fragility of Middle East oil supply. Risk premium stays elevated for months. XLE still cheap vs historical.",
                    time: "1 hour ago",
                    insight: "Professional investor sees opportunity: even if immediate crisis passes, elevated risk premium persists.",
                    analysis: "This is smart money thinking beyond current headlines: even successful diplomacy doesn't eliminate the underlying vulnerability - 20% of global oil still passes through 21-mile-wide chokepoint controlled by hostile power. This structural fragility means risk premium (higher prices) likely persists even after immediate tensions ease. Market learning: Hormuz risk is real and must be priced permanently."
                }
            ],
            youtube: [
                {
                    channel: "Bloomberg Markets",
                    title: "LIVE: Market Reaction to US-Iran Crisis | Fed Emergency Meeting",
                    url: "https://youtube.com/watch?v=mock6",
                    views: "178K views",
                    time: "Streaming now",
                    insight: "Live market coverage with real-time data, trader interviews, and analyst commentary. Focus on Fed's potential policy responses.",
                    analysis: "Bloomberg's strength is translating geopolitics into economic implications. Their Fed watchers (Tim Loh, Mike McKee) excellent at reading central bank tea leaves. Key takeaway from their coverage: Fed's emergency meeting is more about preparedness than panic. They're war-gaming scenarios (What if oil hits $100? $120?) and preparing communication strategy. The meeting itself is message: we're watching, we're ready, don't panic."
                },
                {
                    channel: "Yahoo Finance",
                    title: "Expert: Oil Could Hit $100 If Hormuz Tensions Escalate",
                    url: "https://youtube.com/watch?v=mock7",
                    views: "92K views",
                    time: "2 hours ago",
                    insight: "Energy analyst interview predicts near-term price trajectory based on various escalation scenarios.",
                    analysis: "Analyst's scenarios useful framework: Scenario 1 (diplomatic resolution): oil falls back to $82-85 within week. Scenario 2 (extended tensions, no closure): $90-100 sustainable. Scenario 3 (actual Hormuz closure): $120-150 spike. Currently we're between Scenario 1 and 2. Probabilities: 60%, 30%, 10% respectively. This aligns with CSIS think tank analysis and market pricing."
                },
                {
                    channel: "CNBC Television",
                    title: "Legendary Investor Ray Dalio on Middle East Crisis and Portfolio Strategy",
                    url: "https://youtube.com/watch?v=mock8",
                    views: "234K views",
                    time: "4 hours ago",
                    insight: "Bridgewater founder discusses historical parallels and recommends diversification into gold, commodities as geopolitical hedge.",
                    analysis: "Dalio's historical lens valuable: compares to 1970s oil shocks, 1990 Gulf War, 2008 financial crisis overlapping with oil spike. His advice (diversify into hard assets) is classic crisis playbook. However, Dalio is also long-term bearish on debt dynamics, so his commodities bias predates this crisis. Separate signal from noise: he's not saying this crisis is apocalyptic, but rather it reminds investors that geopolitical risk isn't priced adequately into portfolios."
                },
                {
                    channel: "Real Vision",
                    title: "The Economic Impact of an Oil Supply Shock in 2026",
                    url: "https://youtube.com/watch?v=mock9",
                    views: "67K views",
                    time: "3 hours ago",
                    insight: "Detailed economic modeling of supply shock scenarios. Concludes: US and Europe can weather temporary disruption, but emerging markets face severe stress.",
                    analysis: "Real Vision's modeling reveals the global inequality of crisis impact: developed countries have strategic reserves, alternative supplies, financial buffers. Emerging markets (Pakistan, Bangladesh, Sri Lanka already struggling) face potential balance-of-payments crises if oil stays high. This asymmetry is one reason US may feel less urgency to resolve than smaller countries do - another factor pushing international community to pressure both sides toward settlement."
                },
                {
                    channel: "Financial Times",
                    title: "Interview: Former Treasury Secretary on Managing Economic Fallout from Geopolitical Crises",
                    url: "https://youtube.com/watch?v=mock10",
                    views: "45K views",
                    time: "5 hours ago",
                    insight: "Former Treasury official discusses policy toolkit: strategic reserves, Fed coordination, diplomatic pressure via sanctions relief negotiations.",
                    analysis: "Ex-Treasury secretary reveals key insight: US has more leverage than appears because Iran desperately wants sanctions relief. Current crisis may paradoxically create opening for grand bargain - if US offers sanctions relief for Iranian de-escalation plus nuclear deal return, both sides could claim victory. This matches Elizabeth Sly's reporting about Oman backchannel talks. Watch for signals of broader negotiation framework beyond immediate military standoff."
                }
            ]
        },
        // Additional events would follow same structure
        {
            id: 3,
            title: "UN Security Council Emergency Session Called on Middle East Crisis",
            summary: "International diplomatic efforts intensify as France proposes de-escalation framework",
            timestamp: new Date(Date.now() - 30 * 60 * 1000),
            category: "Developing",
            verified: true,
            analysis: "The United Nations Security Council's emergency session represents the international community's attempt to prevent military escalation between the US and Iran. France's diplomatic initiative, backed by Germany and the UK, seeks to create a structured de-escalation framework that gives both sides a face-saving exit from the current standoff. However, the effectiveness of UN mediation is limited given US and Russian geopolitical competition.",
            insights: [
                "France circulating draft resolution calling for both sides to exercise restraint",
                "Russia and China signal they'll veto any resolution seen as one-sided against Iran",
                "Regional Arab states privately supporting de-escalation while publicly neutral",
                "International shipping industry pressuring governments for rapid resolution"
            ],
            news: [],
            social: [],
            youtube: []
        }
    ];
}

function getMockGlobalEvents() {
    // Fallback general news events
    return [
        {
            id: 1,
            title: "Global Climate Summit Reaches Historic Agreement on Emissions Targets",
            summary: "195 nations commit to accelerated carbon reduction timeline",
            timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
            category: "Breaking",
            verified: true,
            analysis: "Preliminary analysis of the agreement...",
            insights: ["Key point 1", "Key point 2"],
            news: [],
            social: [],
            youtube: []
        }
    ];
}

// ===================================
// RENDERING
// ===================================

function renderEvents(events) {
    const container = document.getElementById('eventsContainer');
    container.innerHTML = '';
    
    events.forEach((event, index) => {
        const eventCard = createEventCard(event, index + 1);
        container.appendChild(eventCard);
    });
    
    setupDragAndDrop();
    setupCollapsibleSections();
}

function createEventCard(event, rank) {
    const card = document.createElement('div');
    card.className = 'event-card';
    card.setAttribute('draggable', 'true');
    card.dataset.eventId = event.id;
    
    const timeAgo = getTimeAgo(event.timestamp);
    const categoryBadge = getCategoryBadge(event.category);
    const verifiedBadge = event.verified ? '<span class="badge badge-verified">✓ Verified</span>' : '';
    
    card.innerHTML = `
        <div class="event-header">
            <div class="event-rank">#${rank}</div>
            <div class="event-header-content">
                <h2 class="event-title">${event.title}</h2>
                <div class="event-meta">
                    <div class="event-meta-item">
                        ${categoryBadge}
                    </div>
                    <div class="event-meta-item">
                        ${verifiedBadge}
                    </div>
                    <div class="event-meta-item">
                        ⏱️ ${timeAgo}
                    </div>
                    <div class="event-meta-item">
                        📰 ${event.news.length} sources
                    </div>
                </div>
            </div>
            <div class="drag-handle">☰</div>
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
    if (!entries || entries.length === 0) return '';
    
    const icon = title.split(' ')[0];
    const sectionClass = `source-section-${type}`;
    
    return `
        <div class="source-section ${sectionClass} collapsed" data-section-type="${type}">
            <div class="source-section-header">
                <span class="source-icon">${icon}</span>
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
            <p class="entry-insight">${entry.insight || ''}</p>
            ${entry.analysis ? `<div class="entry-analysis"><strong>Cross-Reference Analysis:</strong> ${entry.analysis}</div>` : ''}
            <a href="${urlField}" class="entry-link" target="_blank" rel="noopener">
                Read full ${type === 'youtube' ? 'video' : type === 'social' ? 'post' : 'article'} →
            </a>
        </div>
    `;
}

// ===================================
// DRAG AND DROP
// ===================================

function setupDragAndDrop() {
    const cards = document.querySelectorAll('.event-card');
    
    cards.forEach(card => {
        card.addEventListener('dragstart', handleDragStart);
        card.addEventListener('dragend', handleDragEnd);
        card.addEventListener('dragover', handleDragOver);
        card.addEventListener('drop', handleDrop);
        card.addEventListener('dragenter', handleDragEnter);
        card.addEventListener('dragleave', handleDragLeave);
    });
}

function handleDragStart(e) {
    draggedElement = this;
    this.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragEnd(e) {
    this.classList.remove('dragging');
    
    document.querySelectorAll('.event-card').forEach(card => {
        card.classList.remove('drag-over');
    });
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';
    return false;
}

function handleDragEnter(e) {
    if (this !== draggedElement) {
        this.classList.add('drag-over');
    }
}

function handleDragLeave(e) {
    this.classList.remove('drag-over');
}

function handleDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }
    
    if (draggedElement !== this) {
        // Swap positions in DOM
        const container = document.getElementById('eventsContainer');
        const allCards = [...container.querySelectorAll('.event-card')];
        const draggedIndex = allCards.indexOf(draggedElement);
        const targetIndex = allCards.indexOf(this);
        
        if (draggedIndex < targetIndex) {
            this.parentNode.insertBefore(draggedElement, this.nextSibling);
        } else {
            this.parentNode.insertBefore(draggedElement, this);
        }
        
        // Update ranks
        updateEventRanks();
    }
    
    return false;
}

function updateEventRanks() {
    const cards = document.querySelectorAll('.event-card');
    cards.forEach((card, index) => {
        const rankElement = card.querySelector('.event-rank');
        if (rankElement) {
            rankElement.textContent = `#${index + 1}`;
        }
    });
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
// UTILITIES
// ===================================

function showLoading(show) {
    document.getElementById('loadingState').style.display = show ? 'block' : 'none';
    document.getElementById('eventsContainer').style.display = show ? 'none' : 'block';
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
