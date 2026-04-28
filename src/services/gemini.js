/* AI Service Layer — Google Gemini + Mock Fallback */

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

const isApiConfigured = () => GEMINI_API_KEY && GEMINI_API_KEY !== 'your_gemini_api_key_here';

async function callGemini(prompt) {
  if (!isApiConfigured()) {
    return generateMockResponse(prompt);
  }

  try {
    const response = await fetch(`${API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.85,
          topP: 0.95,
          maxOutputTokens: 2048,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated.';
  } catch (error) {
    console.error('Gemini API error:', error);
    return generateMockResponse(prompt);
  }
}

// ============================================================
// PROMPT TEMPLATES
// ============================================================

export async function generateItinerary({ location, duration, budget, interests }) {
  const prompt = `You are a world-class travel content creator and itinerary expert. Create a detailed, engaging ${duration}-day travel itinerary for "${location}" with a budget of ₹${budget}.

Interests: ${interests.join(', ')}

Format the itinerary as follows:
## 🗺️ ${duration}-Day ${location} Itinerary

For each day, include:
### Day X: [Catchy Title]
- **Morning**: Activity with specific location, timing, and estimated cost
- **Afternoon**: Activity with details
- **Evening**: Activity with details
- **Stay**: Accommodation suggestion with price range
- **Food Tip**: Local food recommendation
- **Creator Tip**: A content creation angle for this spot (photo/reel idea)

End with:
## 💰 Budget Breakdown
## 📸 Best Photo Spots
## 💡 Pro Tips

Make it feel like advice from a friend who's been there — warm, specific, and actionable. Use emojis sparingly but effectively.`;

  return callGemini(prompt);
}

export async function generateStoryGuide({ destination, facts, mood }) {
  const prompt = `You are a master storyteller and travel content writer. Transform the following destination into a deeply engaging story-based travel guide.

Destination: ${destination}
Known facts: ${facts}
Mood/Tone: ${mood}

Write a guide that:
1. Opens with a cinematic, emotionally compelling hook (2-3 sentences that make the reader FEEL something)
2. Weaves the facts into a narrative — don't list them, TELL them as a story
3. Includes sensory details (sounds, smells, textures, colors)
4. Has a "What Makes This Place Special" section
5. Includes a "Best Time to Visit" tip
6. Ends with a powerful closing line that makes the reader want to go NOW

Format with markdown headers and use **bold** for emphasis.
Length: 400-600 words. Make every sentence count.
Style: Think National Geographic meets Instagram storytelling.`;

  return callGemini(prompt);
}

export async function generateReelsIdeas({ destination, audience, vibe }) {
  const prompt = `You are a viral content strategist who has created Reels with millions of views. Generate 8 Instagram Reels / YouTube Shorts ideas for promoting "${destination}" to a ${audience} audience.

Content vibe: ${vibe}

For each idea, provide:
## Reel #[number]: [Catchy Title]
**Hook (first 2 seconds):** [What the viewer sees/hears first]
**Concept:** [Full reel concept in 2-3 sentences]
**Script/Voiceover:** [Exact words for the voiceover or text overlay]
**Music Suggestion:** [Trending audio that fits]
**Hashtags:** [5-7 relevant hashtags]
**Estimated Virality:** [⭐ to ⭐⭐⭐⭐⭐ with reasoning]

Make each idea COMPLETELY different in format — use POVs, transitions, storytelling, before/after reveals, challenges, etc.

End with:
## 🎯 Posting Strategy
- Best time to post
- Optimal posting frequency
- Caption formula`;

  return callGemini(prompt);
}

export async function generateCaptions({ theme, platform, tone, count }) {
  const prompt = `You are an elite social media copywriter who writes captions that get saves, shares, and comments. Generate ${count || 5} captions for the following:

Theme: ${theme}
Platform: ${platform}
Tone: ${tone}

For each caption, provide:
## Caption #[number]

**Hook Line:** [The first line people see — must STOP the scroll]
**Body:** [The main caption content — storytelling, value, or emotion]
**CTA:** [Clear call-to-action — save, share, comment, follow]
**Hashtags:** [8-12 strategic hashtags mixing popular and niche]

---

Rules:
- Each caption MUST start with a different hook style (question, bold statement, "most people don't know...", hot take, etc.)
- Use line breaks for readability
- Include 2-3 emojis maximum — placed strategically, not randomly
- Make at least one caption use the "storytelling" format
- Make at least one caption use the "value bomb" format
- Every caption should feel like it was written by someone who LIVES this content`;

  return callGemini(prompt);
}

export async function generateContentCalendar({ niche, duration }) {
  const prompt = `You are a content strategy director for a top tourism brand. Create a ${duration || '7'}-day content calendar for a creator in the "${niche}" niche.

For each day, provide:
### [Day Name] — [Content Type]
**Post Type:** [Reel / Carousel / Story / Static Post]
**Topic:** [Specific topic for the day]
**Caption Angle:** [1-line caption direction]
**Content Category:** [Education / Entertainment / Inspiration / Promotion]
**Estimated Engagement:** [Low / Medium / High / Viral Potential]

Also include:
## 📊 Weekly Content Mix
- Percentage breakdown of content categories
- Balance analysis

## ⏰ Best Posting Times
- Platform-specific optimal posting windows

## 💡 Growth Hacks for the Week
- 3 actionable growth tips specific to this niche

## 📈 KPIs to Track
- Key metrics to watch

Make this feel like a real strategy document from a professional content agency.`;

  return callGemini(prompt);
}

export function getApiStatus() {
  return isApiConfigured() ? 'connected' : 'demo';
}

// ============================================================
// MOCK DATA (when API key is not configured)
// ============================================================

function generateMockResponse(prompt) {
  const lower = prompt.toLowerCase();

  if (lower.includes('itinerary')) {
    return MOCK_ITINERARY;
  } else if (lower.includes('story') || lower.includes('guide')) {
    return MOCK_STORY;
  } else if (lower.includes('reel')) {
    return MOCK_REELS;
  } else if (lower.includes('caption')) {
    return MOCK_CAPTIONS;
  } else if (lower.includes('calendar') || lower.includes('content')) {
    return MOCK_CALENDAR;
  }

  return MOCK_ITINERARY;
}

const MOCK_ITINERARY = `## 🗺️ 3-Day Hidden Bihar Adventure Itinerary

### Day 1: The Journey Begins — Rajgir Calling
- **Morning**: Arrive at Rajgir by 8 AM. Start with the **Vishwa Shanti Stupa** — take the iconic ropeway up. The sunrise view from here is absolutely unreal. ₹100 for the ropeway ride.
- **Afternoon**: Explore the **Venu Vana (Bamboo Grove)** where Buddha himself meditated. Pack a light lunch — there's a peaceful picnic spot near the hot springs.
- **Evening**: Soak in the **Brahma Kund Hot Springs**. The warm water after a day of exploring hits different. End the day at a local dhaba — try the *litti chokha*. ₹150 for a feast.
- **Stay**: Tathagat International Hotel — ₹800/night (clean, reliable, walking distance from sites)
- **Food Tip**: Don't skip the *sattu paratha* at the roadside stalls near the bus stand. Life-changing.
- **Creator Tip**: Film a time-lapse from the Stupa at golden hour. This angle goes viral on Reels.

### Day 2: Into the Wild — Kakolat Falls
- **Morning**: Drive 2 hours to **Kakolat Falls** — Bihar's most underrated waterfall. Arrive early before the crowds.
- **Afternoon**: Spend 3 hours at the falls. The multi-tiered cascade is a photographer's dream. Swim in the natural pool at the base.
- **Evening**: Head to **Pawapuri** — the Jal Mandir (Water Temple) at sunset is one of the most serene sights in India.
- **Stay**: Return to Rajgir or stay at a local guesthouse near Pawapuri — ₹500/night
- **Food Tip**: Try the fresh *makuni* (a local sweet) from Pawapuri market. ₹30 for 4 pieces.
- **Creator Tip**: Use the "hidden paradise" trend audio for the waterfall content. POV format works best here.

### Day 3: Offbeat & Unexplored — Barabar Caves
- **Morning**: Visit the **Barabar Caves** — 3rd century BCE rock-cut caves that look like they're from another planet. Hardly any tourists. Pure Indiana Jones vibes.
- **Afternoon**: Stop at **Nalanda University Ruins** — the world's first residential university. Walk through the 1,600-year-old corridors and let that sink in.
- **Evening**: Final stop at **Griddhakuta Hill** — where Buddha delivered some of his most famous sermons. A short trek with a massive payoff.
- **Stay**: N/A — depart from Rajgir
- **Food Tip**: The thali at Nalanda Tourism Complex is surprisingly excellent — ₹200 for a full spread.
- **Creator Tip**: The Barabar Caves echo effect is PERFECT for a voice-reveal reel. Trust me on this one.

## 💰 Budget Breakdown
| Category | Estimated Cost |
|:---|:---|
| Travel (within Bihar) | ₹600 |
| Accommodation (2 nights) | ₹1,300 |
| Food (3 days) | ₹800 |
| Entry fees + ropeway | ₹300 |
| **Total** | **₹3,000** |

## 📸 Best Photo Spots
1. Vishwa Shanti Stupa — golden hour ropeway shot
2. Kakolat Falls — drone shot of the cascades (if you have one)
3. Barabar Caves — wide-angle of the cave entrance with light streaming in
4. Jal Mandir — reflection shot at sunset

## 💡 Pro Tips
- Bihar roads are improving but carry a power bank and downloaded maps
- Best season: October to March (avoid monsoon for falls safety)
- Locals are incredibly warm — ask them for hidden food spots
- Carry cash — most places don't accept digital payments`;

const MOCK_STORY = `## ✨ The Forgotten Temple Where Time Stands Still

There's a place in Bihar that Google Maps doesn't show properly. No fancy signboards guide you there. No Instagram influencer has filmed a Reel here — yet.

But if you drive 40 kilometers southeast of Bhagalpur, past fields of golden mustard and villages where the morning chai still costs ₹5, you'll find something extraordinary.

**A temple. Standing alone. Silent. Beautiful. Forgotten.**

### What You'll Feel Before You See It

Before the temple comes into view, you'll hear it. Or rather, you'll hear the *absence* of everything modern — no traffic, no notifications, no noise. Just birds. Wind through old banyan trees. And the distant sound of someone ringing a brass bell.

The locals call it the *"Soyee Hui Mandir"* — the sleeping temple. Not because it was abandoned, but because the world went to sleep on it. For 200 years, it has stood here, its red stone slowly being embraced by moss and time, while tourists flock to places that already have a thousand photos on TripAdvisor.

### What Makes This Place Special

It's not the architecture (though the carved arches would make any heritage enthusiast weep). It's not the history (though legends say a raja built it as a promise to his dying queen).

**It's the atmosphere.**

You walk in, and something shifts. The air feels different. Heavier, maybe. Older. The kind of heavy that forces you to put your phone away and just *be there*. Local families still visit every morning before sunrise, lighting small clay lamps at the entrance — a ritual they've performed for generations, without an audience, without recognition.

### The Details You Won't Find Online

- The moss on the northern wall turns a deep emerald after the monsoon — photographers, take note
- There's a natural spring 50 meters behind the temple where the water is bizarrely cold, even in May
- The oldest banyan tree on the premises has a hollow trunk big enough to sit inside
- Sunrise from the temple steps hits at a specific angle in October that turns the entire stone surface golden

### Best Time to Visit

**October to February** — when the mustard fields are in bloom and the air is crisp. Arrive by 5:30 AM if you want to see the lamp lighting. It only lasts 20 minutes, and it will be the most peaceful 20 minutes of your year.

### The Bottom Line

This temple doesn't need saving. It doesn't need renovation. It doesn't need a tourism board campaign.

**It needs to be seen. By people who still believe that the best places are the ones nobody's talking about.**

*Pack light. Drive slow. And let Bihar surprise you.*`;

const MOCK_REELS = `## Reel #1: The Reveal
**Hook (first 2 seconds):** Close-up of your shocked face with text: "I found THIS in Bihar?!"
**Concept:** Start with a boring highway shot, then cut to a breathtaking hidden waterfall with a dramatic beat drop. The contrast creates instant engagement.
**Script/Voiceover:** "Everyone told me Bihar has nothing to see. So I drove 3 hours from the city... and found literal paradise."
**Music Suggestion:** "Die For You" (Remix) — The Weeknd
**Hashtags:** #HiddenBihar #TravelIndia #OffbeatTravel #SecretPlaces #BiharTourism #IndianWanderer #UnexploredIndia
**Estimated Virality:** ⭐⭐⭐⭐⭐ — Contrast + discovery = maximum shares

---

## Reel #2: POV Storytelling
**Hook (first 2 seconds):** Text on screen: "POV: You took the road nobody recommended"
**Concept:** Walk-and-talk style through village paths leading to a hidden temple. Use slow zooms and natural sounds. End with the destination reveal.
**Script/Voiceover:** "No one puts this on travel lists. No blogger has covered this. But locals have been coming here for 200 years. And now you know why."
**Music Suggestion:** "Pieces" (Danilo Stankovic) — cinematic and emotional
**Hashtags:** #POVTravel #IndiaTravel #HiddenGems #TemplesOfIndia #SoulfulTravel #BiharExplore #OffTheMap
**Estimated Virality:** ⭐⭐⭐⭐ — POV + mystery = high watch time

---

## Reel #3: List Format
**Hook (first 2 seconds):** Bold text: "3 Bihar places that look UNREAL 🤯"
**Concept:** Quick 3-second clips of three different hidden locations with location name text overlay. Fast transitions synced to beat drops.
**Script/Voiceover:** "Number 1 will blow your mind. Number 3 doesn't even feel like India."
**Music Suggestion:** "Doja" — Central Cee (trending audio for lists)
**Hashtags:** #BiharTravel #TopPlaces #TravelList #IndiaHiddenGems #MustVisit #NextTrip #TravelReels
**Estimated Virality:** ⭐⭐⭐⭐⭐ — List format + FOMO = save magnet

---

## Reel #4: Before vs After
**Hook (first 2 seconds):** Split screen: Google Maps screenshot vs actual stunning view
**Concept:** Show how unimpressive these places look on Google Maps vs how jaw-dropping they are in real life. Multiple locations, quick cuts.
**Script/Voiceover:** "Google Maps said 'meh.' Reality said 'WOW.' Stop trusting your phone. Start trusting your instinct."
**Music Suggestion:** "Beggin'" — Måneskin (transition-friendly)
**Hashtags:** #ExpectationVsReality #TravelTransition #GoogleMapsVsReal #TravelIndia #Bihar #HiddenBeauty #TravelTok
**Estimated Virality:** ⭐⭐⭐⭐ — Comparison content always performs

---

## Reel #5: Budget Challenge
**Hook (first 2 seconds):** Holding ₹2000 note: "Full trip under THIS"
**Concept:** Document an entire weekend trip on ₹2000 — transport, food, stay, experiences. Show actual receipts and prices. End with a total tally.
**Script/Voiceover:** "₹300 for the bus. ₹80 for the best litti chokha of my life. ₹500 for a room with a mountain view. Total: ₹1,850. You're welcome."
**Music Suggestion:** "Rich Flex" — Drake & 21 Savage (ironic budget flex)
**Hashtags:** #BudgetTravel #CheapTrips #TravelUnder2000 #BiharOnBudget #BackpackIndia #BudgetExplorer #IndiaTravel
**Estimated Virality:** ⭐⭐⭐⭐⭐ — Budget content = massive saves + shares

---

## Reel #6: Emotional Storytelling
**Hook (first 2 seconds):** Black screen with text: "This place changed something in me."
**Concept:** Slow, cinematic shots of an empty temple at sunrise. Soft music. Minimal text. Let the visuals speak. End with: "Not every trip needs a plan. Some just need courage."
**Script/Voiceover:** Soft narration: "I came here to create content. But this place didn't want to be content. It wanted to be experienced. So I put my phone away... and stayed."
**Music Suggestion:** "Experience" — Ludovico Einaudi
**Hashtags:** #SoulfulTravel #MindfulTravel #SlowTravel #TempleVibes #IndiaMagic #TravelFeels #Wanderlust
**Estimated Virality:** ⭐⭐⭐ — Niche but high save rate and deep engagement

---

## Reel #7: Myth Busting
**Hook (first 2 seconds):** Text: "STOP saying Bihar has nothing to see 🛑"
**Concept:** Aggressive, fast-paced montage of 10+ Bihar locations with text overlays of their names. Each shot lasts 1.5 seconds. End with: "Still think Bihar has nothing?"
**Script/Voiceover:** "Waterfalls. Ancient caves. World heritage sites. Hot springs. Jain temples. Wildlife sanctuaries. And you said Bihar has nothing? Sit down."
**Music Suggestion:** "HUMBLE." — Kendrick Lamar
**Hashtags:** #BiharPride #NotBoring #IndianStates #TravelDebate #ProveThemWrong #BiharBeauty #TravelIndia
**Estimated Virality:** ⭐⭐⭐⭐⭐ — Controversy + state pride = insane shares and comments

---

## Reel #8: Creator Collab Invite
**Hook (first 2 seconds):** "Looking for a creator who's brave enough to come here 👀"
**Concept:** Show a stunning but empty location. Challenge other creators to visit and create content there. Use the duet/stitch format to encourage responses.
**Script/Voiceover:** "This is THE most underrated spot in all of India. And I'm challenging every travel creator to prove me wrong. Tag someone who needs to see this."
**Music Suggestion:** "Industry Baby" — Lil Nas X
**Hashtags:** #CreatorChallenge #TravelCollab #IndiaCreators #TravelChallenge #ContentCreator #ExploreIndia #ChallengeAccepted
**Estimated Virality:** ⭐⭐⭐⭐ — Challenges drive UGC and collab requests

---

## 🎯 Posting Strategy
- **Best time to post**: Tuesday/Thursday 7-9 PM, Saturday 11 AM-1 PM
- **Optimal posting frequency**: 4-5 Reels/week for growth phase
- **Caption formula**: Hook question → 2 lines of value → CTA (save/share/follow) → 8-10 hashtags`;

const MOCK_CAPTIONS = `## Caption #1

**Hook Line:** You won't believe this place exists in India.

**Body:**
I've traveled to 15 countries.
Spent thousands on "bucket list" destinations.

But THIS place — 3 hours from a city nobody talks about — left me speechless.

No crowds. No entry fee. No Instagram posts about it.
Just raw, untouched beauty that made me question why we chase the same overhyped spots.

**CTA:** Save this for your next trip. Share it with someone who needs this. 📍

**Hashtags:** #HiddenIndia #OffbeatTravel #SecretDestination #IndiaTravel #UnexploredPlaces #TravelContent #BiharTravel #WanderlustIndia #IndianGems #TravelBlogger #ContentCreator #NatureIndia

---

## Caption #2

**Hook Line:** Most people will scroll past this. The smart ones will save it.

**Body:**
Here's what no travel blog tells you about Bihar:

→ It has waterfalls that rival Meghalaya
→ It has caves older than the Colosseum
→ It has temples where monks have meditated for centuries
→ It has food that will ruin every restaurant for you

The only thing it doesn't have? Your attention. Yet.

**CTA:** Follow for more hidden gems that deserve to go viral 🔥

**Hashtags:** #BiharTravel #IndianTravel #HiddenGems #TravelFacts #IncredibleIndia #OffTheBeatenPath #TravelTips #ExploreIndia #UndiscoveredPlaces #TravelContent #ViralTravel #SaveForLater

---

## Caption #3

**Hook Line:** The best trip I ever took cost me ₹2,000.

**Body:**
Not Goa. Not Manali. Not Rajasthan.

A random weekend trip to a place my cab driver recommended.

He said: "Sahab, tourist spot mat jaiye. Mai ek jagah dikhata hoon."

What he showed me that day is something 5-star resorts can't replicate:

A waterfall with zero people.
A village where they invited me for lunch.
A sunset that made me sit in complete silence for 20 minutes.

Sometimes the best travel advisor isn't Google.
It's a local who's proud of where they're from.

**CTA:** Comment "HIDDEN" and I'll DM you the exact location 📍

**Hashtags:** #BudgetTravel #LocalTravel #TravelStory #AuthenticTravel #CheapTrips #IndiaTravel #TravelInspiration #BackpackIndia #SlowTravel #TravelNarrative #VillageLife #RealIndia

---

## Caption #4

**Hook Line:** I'm about to make you rethink your entire travel bucket list.

**Body:**
🗺️ 3 places. 3 days. Under ₹3,000.

DAY 1: Ancient caves that predate Rome (free entry)
DAY 2: A waterfall hidden behind a forest trail (₹0 to access)
DAY 3: A sunrise at a peace stupa that changes your perspective on everything (₹100 ropeway)

The itinerary is free. The memories are priceless.
The only cost? Getting off your couch.

**CTA:** Tag your travel buddy who needs to see this NOW ✈️

**Hashtags:** #TravelItinerary #3DayTrip #BudgetTravel #IndiaOnBudget #TravelPlan #WeekendGetaway #ShortTrip #AffordableTravel #TravelIndia #Wanderlust #TripPlanning #AdventureAwaits

---

## Caption #5

**Hook Line:** Stop. Scrolling. And read this.

**Body:**
I spent 6 months studying why some tourist places go viral and others don't.

Here's what I found:

It's NOT about the place.
It's about WHO tells the story.

The same waterfall can be "a nice spot" or "the most underrated paradise in India" — depending on the words you wrap around it.

That's why I built a content engine that helps creators tell better travel stories.

Because India's hidden gems don't have a discovery problem.
They have a storytelling problem.

**CTA:** Follow if you believe the best places haven't been found yet. Save this as a reminder 🔖

**Hashtags:** #ContentStrategy #TravelMarketing #StorytellingMatters #ContentCreation #TravelContent #DigitalMarketing #CreatorEconomy #TourismMarketing #ContentWriting #BrandStorytelling #ViralContent #GrowthStrategy`;

const MOCK_CALENDAR = `## 📅 7-Day Tourism Content Calendar

### Monday — Educational Post
**Post Type:** Carousel (5-7 slides)
**Topic:** "5 Bihar destinations that UNESCO should recognize"
**Caption Angle:** Start with a bold claim, back it with facts, end with "Do you agree?"
**Content Category:** 📚 Education
**Estimated Engagement:** High — educational carousels get saved frequently

---

### Tuesday — Reels Day
**Post Type:** Reel (15-30 seconds)
**Topic:** POV: Discovering a hidden waterfall near Bhagalpur
**Caption Angle:** "Nobody told me about this place. Now I'm telling everyone."
**Content Category:** 🎬 Entertainment
**Estimated Engagement:** Viral Potential — discovery content with cinematic quality performs exceptionally

---

### Wednesday — Story-Driven Post
**Post Type:** Single image with long caption
**Topic:** The story behind a 200-year-old temple and the family that still takes care of it
**Caption Angle:** Emotional storytelling — "They've been lighting lamps here since before India was independent"
**Content Category:** 💫 Inspiration
**Estimated Engagement:** High — emotional stories drive comments and shares

---

### Thursday — Value Bomb
**Post Type:** Carousel (8-10 slides)
**Topic:** Complete ₹3000 Bihar trip guide — transport, stay, food, experiences
**Caption Angle:** "Your most affordable weekend ever. Save this."
**Content Category:** 📚 Education
**Estimated Engagement:** Viral Potential — budget guides are the #1 saved content type in travel

---

### Friday — Reels Day
**Post Type:** Reel (30-45 seconds)
**Topic:** "3 places near you that look like they belong in a movie 🎬"
**Caption Angle:** List + FOMO — "You drive past #2 every day and don't even know it"
**Content Category:** 🎬 Entertainment
**Estimated Engagement:** High — list reels with trending audio get maximum reach

---

### Saturday — Community Post
**Post Type:** Stories + Interactive Poll
**Topic:** "Which hidden destination should I visit next week?" (with 4 options)
**Caption Angle:** Audience participation — let followers vote and feel ownership
**Content Category:** 🤝 Promotion
**Estimated Engagement:** Medium — but builds loyalty and algorithm favor

---

### Sunday — Inspiration Post
**Post Type:** Single portrait image with quote overlay
**Topic:** A stunning sunset photo from a hidden spot + reflective travel quote
**Caption Angle:** "Sometimes the best destinations are the ones that aren't on any list."
**Content Category:** 💫 Inspiration
**Estimated Engagement:** Medium — but sets the emotional tone for the week

---

## 📊 Weekly Content Mix
| Category | Posts | Percentage |
|:---|:---|:---|
| 📚 Education | 2 | 29% |
| 🎬 Entertainment | 2 | 29% |
| 💫 Inspiration | 2 | 28% |
| 🤝 Promotion/Community | 1 | 14% |

**Analysis:** This is a healthy content mix. The 2:2:2:1 ratio ensures consistent value delivery while building emotional connection and community. The promotional content is disguised as community engagement (poll), which reduces audience fatigue.

## ⏰ Best Posting Times
| Platform | Best Time | Second Best |
|:---|:---|:---|
| Instagram | 7:00 - 9:00 PM | 12:00 - 1:00 PM |
| YouTube Shorts | 5:00 - 7:00 PM | 10:00 - 11:00 AM |
| Twitter/X | 8:00 - 10:00 AM | 6:00 - 8:00 PM |
| Facebook | 1:00 - 3:00 PM | 7:00 - 9:00 PM |

## 💡 Growth Hacks for the Week
1. **Comment Strategy**: Spend 15 minutes daily commenting on 20 travel accounts with genuine, valuable responses. This drives profile visits more than any hashtag strategy.
2. **Collab Chain**: DM 3 local creators for a "Hidden Gems Exchange" — you feature their city, they feature yours. Mutual audience growth.
3. **SEO Captions**: Start using searchable phrases in your captions — "best places near Bihar," "budget trip India," "hidden waterfalls." Instagram search is the new Google for Gen Z.

## 📈 KPIs to Track
| Metric | Target | Why It Matters |
|:---|:---|:---|
| Saves per post | 50+ | Saves = value perception = algorithm boost |
| Shares per Reel | 30+ | Shares = new audience reach |
| Story poll votes | 100+ | Engagement signals community health |
| Profile visits | 500+/week | Tracks discovery and curiosity |
| Follower growth | 200+/week | Overall growth trajectory |`;
