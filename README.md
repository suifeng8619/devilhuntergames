# Devil Hunter Games

**Your Ultimate Decision Support System for Roblox Devil Hunter**

A Next.js-based game guide website that helps players make informed decisions and avoid regrettable mistakes in Roblox's Devil Hunter game.

## 🎯 Core Value Proposition

Unlike traditional game wikis that just list data, Devil Hunter Games focuses on **decision support**:

- 🚨 **Prevents Regret**: Warns about permanent choices before it's too late
- 🎮 **Build Planner**: Interactive tool to optimize contract/talent combinations
- 📊 **Smart Data**: Tier lists, usage rates, and community ratings
- ⚡ **Quick Start**: Day 1 checklist to avoid common mistakes

## ✨ Features

### MVP (Completed)

- ✅ **Quick Start Guide**: Critical Day 1 decisions that can't be undone
- ✅ **Build Planner**: Interactive tool for path/playstyle selection
- ✅ **Contract Database**: 8 contracts with detailed stats, acquisition methods, and meta analysis
- ✅ **Talent Database**: 4 Fiend talents with slot costs and sources
- ✅ **SEO Optimized**: Sitemap, robots.txt, enhanced metadata
- ✅ **Responsive Design**: Mobile-first approach with Tailwind CSS
- ✅ **Performance**: Static site generation (SSG) for instant loads

### Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript 5.9
- **Styling**: Tailwind CSS 3.4.0
- **Icons**: Lucide React (no emoji)
- **Deployment**: Vercel (optimized for zero-config)
- **Data**: JSON-based (no database required for MVP)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd devilhuntergames

# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

### Build for Production

```bash
# Create optimized production build
npm run build

# Test production build locally
npm start
```

### Generate Data

The site uses pre-generated JSON data from the `scripts/generate-data.ts` script:

```bash
# Generate JSON files in content/database/
npx ts-node scripts/generate-data.ts

# Regenerate if data changes
npm run generate-data
```

## 📁 Project Structure

```
devilhuntergames/
├── app/                          # Next.js App Router pages
│   ├── page.tsx                  # Homepage
│   ├── quick-start/              # Day 1 guide
│   ├── builds/planner/           # Build planner tool
│   ├── database/                 # Data pages
│   │   ├── contracts/            # Contract list & details
│   │   └── talents/              # Talent list
│   ├── sitemap.ts                # Dynamic sitemap generation
│   └── robots.ts                 # SEO crawling rules
│
├── components/                   # React components
│   ├── layout/                   # Header, Footer
│   └── database/                 # ContractCard, TalentCard
│
├── content/                      # Content source
│   └── database/                 # Generated JSON files
│       ├── contracts.json        # 8 contracts
│       ├── talents.json          # 4 talents
│       ├── hybrids.json          # 2 hybrids
│       ├── raids.json            # 3 raids
│       └── codes.json            # 7 promo codes
│
├── lib/                          # Utility functions
│   └── content.ts                # Data fetching functions
│
├── types/                        # TypeScript definitions
│   ├── contract.ts               # Contract types
│   ├── talent.ts                 # Talent types
│   ├── hybrid.ts                 # Hybrid types
│   └── raid.ts                   # Raid types
│
└── scripts/                      # Build scripts
    └── generate-data.ts          # JSON generation (900+ lines)
```

## 🎨 Design System

### Color Theme (Chainsaw Man Inspired)

```typescript
// Brand Colors (Blood Red)
brand-primary: #DC2626     // Main CTA buttons
brand-secondary: #B91C1C   // Hover states

// Background (Dark Theme)
background-primary: #0A0A0B      // Page background
background-secondary: #141417    // Card background
background-tertiary: #1C1C20     // Hover background

// Tier Colors
tier-s: #FFD700   // S-Tier gold
tier-a: #C084FC   // A-Tier purple
tier-b: #60A5FA   // B-Tier blue
tier-c: #9CA3AF   // C-Tier gray
```

### Responsive Breakpoints

```
mobile:    0-640px    (phone portrait)
sm:        640-768px  (phone landscape)
md:        768-1024px (tablet)
lg:        1024-1280px (laptop)
xl:        1280-1536px (desktop)
2xl:       1536px+    (large desktop)
```

## 📊 SEO Configuration

### Generated Files

- **sitemap.xml**: Auto-generated from all routes (contracts, talents)
- **robots.txt**: Configured for optimal crawling
- **Metadata**: Each page has unique title and description
- **Open Graph**: Social media preview images
- **Keywords**: Comprehensive keyword targeting

### SEO Best Practices

✅ Unique titles for all pages
✅ Meta descriptions under 160 characters
✅ Semantic HTML structure
✅ Image alt text (when images added)
✅ Mobile-friendly design
✅ Fast load times (SSG)

## 🚀 Deployment to Vercel

### Method 1: GitHub Integration (Recommended)

1. Push code to GitHub repository
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project" → Select your GitHub repo
4. Vercel auto-detects Next.js configuration
5. Click "Deploy" (zero configuration needed)
6. Custom domain: Settings → Domains → Add `devilhuntergames.com`

### Method 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
vercel

# Deploy to production
vercel --prod
```

### Environment Variables (Optional)

No environment variables required for MVP. Future analytics/tracking:

```env
NEXT_PUBLIC_GA_ID=your-google-analytics-id
```

## 📈 Performance Metrics

### Target Scores

- **Lighthouse Performance**: > 90
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **SEO Score**: > 95

### Optimization Techniques

- ✅ Static Site Generation (SSG)
- ✅ Image optimization (Next.js Image component)
- ✅ Code splitting (automatic with App Router)
- ✅ Font optimization (next/font/google)
- ✅ Minification (production build)

## 🧪 Testing Checklist

### Before Deployment

- [ ] All pages load without errors
- [ ] Build completes successfully (`npm run build`)
- [ ] Sitemap accessible at `/sitemap.xml`
- [ ] Robots.txt accessible at `/robots.txt`
- [ ] Mobile responsive on iPhone/Android
- [ ] All links work correctly
- [ ] Build Planner generates results
- [ ] Contract detail pages render (8 pages)
- [ ] Talent list displays correctly

### Post-Deployment

- [ ] Google Search Console verification
- [ ] Submit sitemap to Google
- [ ] Test site on multiple browsers (Chrome, Safari, Firefox)
- [ ] Verify Open Graph previews (Facebook, Twitter)
- [ ] Check page load speed (PageSpeed Insights)

## 📝 Content Management

### Adding New Contracts

1. Edit `scripts/generate-data.ts`
2. Add contract data to `contracts` array
3. Run `npm run generate-data`
4. Rebuild site: `npm run build`
5. Deploy updated build

### Updating Existing Data

- All data lives in `scripts/generate-data.ts`
- Modify data → Regenerate JSON → Rebuild → Deploy
- No database migrations needed

## 🛣️ Roadmap

### Phase 2 (Future)

- [ ] Full Build Planner with contract/talent selection
- [ ] Build comparison tool
- [ ] User accounts (save builds)
- [ ] Community build voting
- [ ] Search functionality (Fuse.js)
- [ ] Hybrid database page
- [ ] Raid database page
- [ ] Weapon database page

### Phase 3 (Long-term)

- [ ] User-submitted builds
- [ ] Comments system
- [ ] Discord integration
- [ ] Video guides
- [ ] Mobile app (PWA)

## 🤝 Contributing

This is a solo project currently. Future contributions welcome:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is for educational purposes. Not affiliated with Roblox or Devil Hunter game developers.

## 🙏 Credits

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Lucide](https://lucide.dev/)
- Deployed on [Vercel](https://vercel.com/)

---

**Made with ❤️ by Devil Hunter Games Team**

*Last Updated: 2026-01-09*
