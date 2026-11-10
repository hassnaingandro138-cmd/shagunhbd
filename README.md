# 🎂 Ultra-Beautiful Birthday Surprise Website for Shagun 💖

An extraordinary, fully functional, mobile-first birthday surprise website created for **Shagun** (Birthday: **26 November**).

---

## 🌟 Key Features & 9 Special Rooms

1. **Page 1: Grand Birthday Welcome & Celebration**
   - Realistic multi-tiered Birthday Cake with cream drip, rosettes, strawberries, and custom cake topper: *"Happy Birthday Shagun"*.
   - Realistic interactive candles with flickering flames, individual click controls, and a **"Blow Out Candles 💨"** interaction with wind physics, smoke extinguish, and celebratory cheering.
   - Interactive balloons with 3D specular sheen, strings, pop sound physics, and a **"Release More Balloons 🎈"** button.
   - Live Countdown timer dynamically calculating days, hours, minutes, and seconds until 26 November.
   - Grand **"Open Your Birthday Surprise 🎁"** and **"Tap For A Bear Hug 🤗"** actions.

2. **Page 2: Birthday Wishes & Seven Special Paragraphs**
   - 7 distinct emotional chapters covering Birthday Wishes, Her Beautiful Qualities, How Deeply I Miss Her, Unbreakable Friendship, Sacred Prayers, Chaotic Moments, and Eternal Bestie Promise.
   - Interactive heart likes counter and "Copy Paragraph" button with toast confirmations.

3. **Page 3: Our Beautiful Memories — Photos & Videos**
   - Full photo and video uploading directly from phone or PC.
   - **Persistent IndexedDB storage**: Large images and videos are saved reliably on the client without hitting browser `localStorage` quotas.
   - Fullscreen Lightbox for photos and responsive video player.
   - Add, Edit, Delete (with confirmation dialog), and Favorite filters.

4. **Page 4: Friendship Scrapbook & Our Story**
   - Visual Friendship Journey Timeline (Our first hello, 2 AM confessions, surviving challenges, today's celebration).
   - Scrapbook card grid with tape stickers, handwritten notes, and pushpin aesthetics.
   - Full CRUD: Add custom memories, reasons she's special, and milestones.

5. **Page 5: Funny Moments, Jokes, & Partner-in-Crime Zone**
   - Random Bestie Joke generator with hilarious punchlines.
   - WhatsApp-style chat simulation showing unhinged late-night conversations.
   - Interactive Mini-Game: *"Who Is More Dramatic?"* (voting poll with roast verdict).
   - Interactive Mini-Game: *"Who Misses Whom More?"* (gauge slider that breaks the scale).
   - Bestie Birthday Dare Cards deck.

6. **Page 6: Poetry, Shayari, Compliments & Friendship Quotes**
   - Original English poetry and heartfelt Roman Urdu Shayari (*"Tere jaisi bestie naseeb walon ko milti hai..."*).
   - Daily Compliment generator.
   - Save to Favorites (stored in localStorage) & instant copy.

7. **Page 7: Prayers, Dreams & Wishes for Her Future**
   - Blessings for Inner Peace, Radiant Health, Career Triumph, Evil Eye Protection, and Dreams.
   - Interactive **Virtual Sanctuary Candle 🕯️** with glowing flame & live prayer counter.
   - **Wishing Lantern 🏮**: Write a custom prayer and watch it release into the stars.

8. **Page 8: The Special Birthday Letter**
   - Elegant handwritten stationery with wax-seal opening/folding animation.
   - Deep, emotional letter expressing love, missing her, inside jokes, and gratitude.
   - Rich editor to personalize the letter, auto-saved to localStorage, with Copy and Print / PDF export.

9. **Page 9: The Grand Finale — Heart Fireworks & Ultimate Celebration**
   - **Heart Fireworks Component**: Exploding color-shifting SVG hearts, golden stars, canvas confetti, and deep booming firework sound effects (*"bahut saare phatake"*).
   - Interactive Mystery Gift Box revealing the Lifetime Bestie Subscription token.
   - Official "Forever Besties" Friendship Certificate.
   - **Friendship Playlist**: Persistent player with track controls, custom song addition, and ambient audio synthesis.

---

## 💻 Running Locally on PC

### Requirements
- Node.js (v18 or higher recommended)
- npm or yarn

### Setup Instructions
1. Open terminal in the project directory:
   ```bash
   npm install
   ```
2. Start the local development server:
   ```bash
   npm run dev
   ```
3. Open your browser at:
   ```
   http://localhost:3000
   ```

---

## 🚀 Deployment Instructions

### Deploy to Vercel / Netlify / Cloudflare Pages
1. Build the production bundle:
   ```bash
   npm run build
   ```
2. Deploy the `dist/` folder or push this Git repository directly to Vercel/Netlify.
3. Once live, click the **Share** button in the navigation bar to send the website link to Shagun!

---

## 🎨 Theme & Audio
- **Pink & Obsidian Black**: Default signature theme.
- **Rose & Silk White**: Toggle via the Sun/Moon icon in the navbar.
- **Audio Synthesizer**: Uses Web Audio API for background music box tunes, balloon pops, firework booms, and candle blow whooshes without relying on external network MP3 links.
