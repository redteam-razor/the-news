// ===================================
// GLOBAL EVENTS DATA
// Top 10 trending events worldwide
// ===================================

function getAllGlobalEvents() {
    return [
        // EVENT 1: US-Iran Crisis
        {
            id: 1,
            title: "US-Iran Tensions Escalate Following Naval Incident in Strait of Hormuz",
            summary: "Heightened military activity as US destroyer encounters Iranian fast attack craft",
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
            category: "Breaking",
            region: "Middle East",
            verified: true,
            trending: 95,
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
                }
                // ... (keeping existing detailed entries)
            ],
            social: [
                {
                    source: "Twitter/X",
                    handle: "@SecState",
                    content: "The United States remains committed to freedom of navigation in international waters. We call on Iran to cease unsafe maritime practices.",
                    time: "2 hours ago",
                    insight: "Official US State Department position emphasizes 'international waters' framing.",
                    analysis: "State Department's word choice leaves diplomatic room for de-escalation."
                }
            ],
            youtube: [
                {
                    channel: "Sky News",
                    title: "LIVE: US-Iran Crisis - Latest Updates from Persian Gulf",
                    url: "https://youtube.com/watch?v=mock1",
                    views: "245K views",
                    time: "Streaming now",
                    insight: "24/7 coverage with rotating expert panels.",
                    analysis: "Sky News provides real-time updates but quality varies with guest expertise."
                }
            ]
        },
        
        // EVENT 2: Global Markets
        {
            id: 2,
            title: "Global Markets React: Emergency Fed Meeting Scheduled Amid Crisis",
            summary: "Central banks coordinate response to potential oil supply disruption",
            timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
            category: "Breaking",
            region: "Global",
            verified: true,
            trending: 88,
            analysis: "Financial markets are pricing in significant economic risk from geopolitical tensions, with oil futures, equity markets, and currency markets all showing volatility. The Federal Reserve's decision to schedule an emergency meeting signals serious concern about macroeconomic stability.",
            insights: [
                "S&P 500 down 3.2% in overnight trading",
                "Gold up 4%, Treasury yields drop to 3-month lows",
                "OPEC emergency meeting called",
                "Shipping companies diverting tankers to longer routes"
            ],
            news: [],
            social: [],
            youtube: []
        },
        
        // EVENT 3: China-Taiwan
        {
            id: 3,
            title: "China Conducts Largest-Ever Military Drills Around Taiwan",
            summary: "PLA Navy deploys 45 warships in week-long exercises near Taiwan Strait",
            timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
            category: "Developing",
            region: "Asia-Pacific",
            verified: true,
            trending: 82,
            analysis: "China's People's Liberation Army has launched its most extensive military exercises around Taiwan since 2023, involving 45 warships, 150+ aircraft, and simulated amphibious assault operations. The drills come amid heightened US-China tensions over semiconductor export controls and represent Beijing's response to recent US arms sales to Taiwan. Regional analysts view this as a test of international resolve and Taiwan's defensive capabilities.",
            insights: [
                "Japan and South Korea place forces on heightened alert",
                "US 7th Fleet repositions carrier strike group to monitor situation",
                "Taiwan activates civil defense protocols in coastal areas",
                "International shipping reroutes around exercise zones affecting $2.3T annual trade"
            ],
            news: [
                {
                    source: "BBC World",
                    title: "China's Military Show of Force: Largest Taiwan Exercises in Years",
                    url: "https://bbc.com/news/world-asia-china-taiwan-drills",
                    time: "4 hours ago",
                    insight: "BBC reports drills include live-fire exercises and simulated blockade scenarios. Taiwan's Ministry of Defense calls it 'serious provocation.'",
                    analysis: "BBC's analysis draws parallels to 1996 Taiwan Strait crisis, noting current exercises are larger in scale but more controlled in execution. Cross-referencing with Chinese state media shows coordinated messaging emphasizing 'reunification' narrative. Japan's public concern (rare for usually cautious Tokyo) indicates regional anxiety levels."
                }
            ],
            social: [],
            youtube: []
        },
        
        // EVENT 4: Climate Summit
        {
            id: 4,
            title: "COP31 Climate Summit: Historic Agreement Reached on Emissions Cuts",
            summary: "195 nations commit to 50% emissions reduction by 2035",
            timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
            category: "Breaking",
            region: "Global",
            verified: true,
            trending: 76,
            analysis: "After two weeks of intense negotiations in Sydney, COP31 has produced the most ambitious climate agreement since the Paris Accord. The landmark deal includes binding commitments from major emitters, a $500B climate finance fund for developing nations, and breakthrough agreements on methane reduction and deforestation. However, implementation mechanisms remain contested, with critics noting lack of enforcement provisions.",
            insights: [
                "Major breakthrough: China and India agree to coal phase-out by 2040",
                "Climate finance fund triples previous commitments",
                "Technology transfer provisions for renewable energy to Global South",
                "Concerns raised about verification and enforcement mechanisms"
            ],
            news: [
                {
                    source: "The Guardian",
                    title: "COP31: 'Last Chance' Climate Deal Secures Historic Commitments",
                    url: "https://theguardian.com/environment/cop31-climate-deal",
                    time: "6 hours ago",
                    insight: "Guardian's environment desk calls it 'most significant climate action since Paris 2015.' Key: China's coal commitment represents major shift.",
                    analysis: "Guardian's detailed breakdown shows this agreement addresses key failures of previous COPs. The $500B fund (compared to $100B at Paris) reflects economic reality of climate adaptation costs. However, environmental groups note 2035 timeline may be too slow given current warming trajectory. Compare to IPCC's latest report warning of 1.5°C breach by 2030."
                }
            ],
            social: [],
            youtube: []
        },
        
        // EVENT 5: European Energy Crisis
        {
            id: 5,
            title: "Europe Faces Winter Energy Crunch as Russian Gas Flows Halt Completely",
            summary: "EU implements emergency rationing as temperatures plunge",
            timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
            category: "Developing",
            region: "Europe",
            verified: true,
            trending: 71,
            analysis: "The complete cessation of Russian gas flows through remaining pipelines has triggered Europe's worst energy crisis since WWII. With winter temperatures 5°C below normal and storage levels at 35%, EU nations are implementing rolling blackouts and industrial shutdowns. Germany's decision to restart coal plants represents a major setback for climate goals. The crisis exposes Europe's continued energy vulnerability despite three years of diversification efforts.",
            insights: [
                "Germany, France implement 4-hour daily power rationing for industry",
                "LNG spot prices hit record $65/MMBtu, 400% above summer levels",
                "Emergency coal plant restarts across 8 EU nations",
                "Social unrest growing as heating costs quadruple for households"
            ],
            news: [],
            social: [],
            youtube: []
        },
        
        // EVENT 6: AI Regulation
        {
            id: 6,
            title: "EU Passes Landmark AI Regulation Act: Global Tech Giants Face Compliance Deadline",
            summary: "New rules require transparency, human oversight, and liability for AI systems",
            timestamp: new Date(Date.now() - 10 * 60 * 60 * 1000),
            category: "Breaking",
            region: "Europe/Global",
            verified: true,
            trending: 68,
            analysis: "The European Union has passed the world's first comprehensive AI regulation framework, setting global standards for artificial intelligence development and deployment. The AI Act classifies systems by risk level, bans certain applications (social scoring, real-time biometric surveillance), and imposes strict transparency requirements on high-risk AI. Tech giants have 24 months to comply or face fines up to 6% of global revenue.",
            insights: [
                "Banned applications: social credit scoring, emotion recognition in workplaces, real-time mass surveillance",
                "High-risk AI (hiring, credit scoring, law enforcement) requires human oversight and explainability",
                "OpenAI, Google, Microsoft face major compliance overhaul",
                "US tech industry warns of innovation slowdown; China sees opportunity"
            ],
            news: [
                {
                    source: "Financial Times",
                    title: "EU's AI Act Sets Global Standard, Tech Giants Scramble to Comply",
                    url: "https://ft.com/content/eu-ai-regulation-act",
                    time: "10 hours ago",
                    insight: "FT reports Silicon Valley caught off-guard by speed of passage. Compliance costs estimated at $15-30B for major tech firms.",
                    analysis: "FT's analysis reveals this creates 'Brussels Effect' for AI similar to GDPR for privacy. US companies will adopt EU standards globally rather than maintain separate systems. However, China's AI firms gain competitive advantage by avoiding compliance burden in their home market. The 24-month timeline is tight - GDPR needed 2 years and was simpler."
                }
            ],
            social: [],
            youtube: []
        },
        
        // EVENT 7: Pandemic Watch
        {
            id: 7,
            title: "WHO Declares Public Health Emergency Over New Avian Flu Variant",
            summary: "H7N9 virus shows human-to-human transmission in Southeast Asia",
            timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
            category: "Breaking",
            region: "Global",
            verified: true,
            trending: 64,
            analysis: "The World Health Organization has declared a Public Health Emergency of International Concern (PHEIC) following confirmation of sustained human-to-human transmission of H7N9 avian influenza in Vietnam and Thailand. With a case fatality rate of 35% and evidence of asymptomatic spread, global health authorities are racing to contain the outbreak before it becomes the next pandemic. Vaccine development has begun but requires 4-6 months.",
            insights: [
                "289 confirmed cases, 102 deaths across 4 Southeast Asian countries",
                "Evidence of asymptomatic transmission increases spread risk",
                "Travel restrictions implemented for affected regions",
                "Vaccine development accelerated but needs minimum 4 months"
            ],
            news: [],
            social: [],
            youtube: []
        },
        
        // EVENT 8: US Elections
        {
            id: 8,
            title: "US Presidential Race: Incumbent Trails in Key Swing States as Economy Dominates",
            summary: "New polls show tight race with economy, immigration top voter concerns",
            timestamp: new Date(Date.now() - 14 * 60 * 60 * 1000),
            category: "Developing",
            region: "North America",
            verified: true,
            trending: 59,
            analysis: "With eight months until the US presidential election, new polling shows the incumbent trailing in five of seven key swing states. Economic anxiety, particularly inflation and housing costs, dominates voter concerns alongside immigration policy. The race remains within margin of error in crucial battlegrounds Pennsylvania, Wisconsin, and Arizona. Third-party candidates polling at 8% could play spoiler role in close contests.",
            insights: [
                "Swing state polling: Challenger leads by 2-4 points in PA, WI, MI, AZ, GA",
                "Economic issues cited by 67% of voters as top concern",
                "Young voter turnout remains question mark - 2024 saw historic youth engagement",
                "Campaign fundraising: Both sides raised $150M+ in Q1 2026"
            ],
            news: [],
            social: [],
            youtube: []
        },
        
        // EVENT 9: Cryptocurrency Crash
        {
            id: 9,
            title: "Cryptocurrency Market Plunges 40% as Major Exchange Suspends Withdrawals",
            summary: "Binance liquidity crisis triggers panic selling across crypto markets",
            timestamp: new Date(Date.now() - 16 * 60 * 60 * 1000),
            category: "Breaking",
            region: "Global",
            verified: true,
            trending: 55,
            analysis: "The cryptocurrency market is experiencing its worst crash since the FTX collapse of 2022, with total market capitalization dropping $800B in 48 hours. Binance, the world's largest crypto exchange, has suspended withdrawals citing 'technical issues,' triggering panic across the sector. Bitcoin fell below $35,000, Ethereum to $1,800, with smaller altcoins down 60-80%. Regulators worldwide are investigating potential insolvency.",
            insights: [
                "Bitcoin down 42% from highs, Ethereum down 48% in 48 hours",
                "Binance withdrawals suspended; users unable to access $180B in assets",
                "Contagion spreading to crypto-friendly banks and DeFi protocols",
                "Regulatory investigations launched in US, UK, EU, Singapore"
            ],
            news: [],
            social: [],
            youtube: []
        },
        
        // EVENT 10: Brazil Floods
        {
            id: 10,
            title: "Catastrophic Flooding in Brazil: 500+ Dead, Millions Displaced",
            summary: "Worst natural disaster in Brazilian history as Amazon rains overwhelm cities",
            timestamp: new Date(Date.now() - 18 * 60 * 60 * 1000),
            category: "Developing",
            region: "South America",
            verified: true,
            trending: 52,
            analysis: "Unprecedented rainfall across the Amazon basin has caused catastrophic flooding affecting 15 million people across six Brazilian states. With 500+ confirmed deaths and 3,000+ missing, this is Brazil's deadliest natural disaster on record. The floods have destroyed critical infrastructure, contaminated water supplies, and displaced 2.5 million people. Climate scientists link the extreme rainfall to warming Atlantic temperatures and Amazon deforestation reducing the rainforest's water regulation capacity.",
            insights: [
                "500+ confirmed dead, 3,000+ missing, 2.5 million displaced",
                "15 states declared disaster zones; Manaus partially underwater",
                "Disease outbreak risk: cholera, dengue as sanitation collapses",
                "Climate link: warming Atlantic + deforestation amplifies extreme rainfall"
            ],
            news: [],
            social: [],
            youtube: []
        }
    ];
}
