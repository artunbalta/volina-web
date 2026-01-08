# Volina AI - Voice Agent SaaS Platform

<div align="center">
  <h3>🤖 Production-Grade AI Voice Agent Platform</h3>
  <p>Intelligent appointment scheduling, call management, and CRM powered by voice AI</p>
</div>

---

## 🎯 Overview

Volina is a modern SaaS platform that enables businesses across all industries to automate customer interactions through an AI-powered voice agent. The platform handles appointment scheduling, inquiries, and call logging with real-time updates and beautiful analytics.

### Key Features

- **🗣️ Voice AI Integration** - Powered by Vapi.ai for natural conversations
- **📅 Real-time Calendar CRM** - Live appointment updates with Supabase subscriptions
- **📊 Analytics Dashboard** - KPIs, charts, and call insights
- **🔊 Call Transcripts** - Full transcription and audio playback
- **🤖 3D Interactive Robot** - Engaging landing page with Spline 3D

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 14+ (App Router, TypeScript) |
| Styling | Tailwind CSS, Shadcn/UI, Lucide Icons |
| Database | Supabase (PostgreSQL, Auth, Realtime) |
| Voice AI | Vapi.ai (Web SDK + API) |
| 3D Graphics | Spline (@splinetool/react-spline) |
| Charts | Recharts |
| Hosting | Vercel (Serverless/Edge) |
| Automation | n8n (Webhook processing) |

---

## 📁 Project Structure

```
volina-web/
├── app/
│   ├── (auth)/
│   │   └── login/
│   │       └── page.tsx
│   ├── (dashboard)/
│   │   └── dashboard/
│   │       ├── layout.tsx
│   │       ├── page.tsx              # Overview
│   │       ├── calls/
│   │       │   └── page.tsx          # Call Logs
│   │       └── calendar/
│   │           └── page.tsx          # Calendar CRM
│   ├── api/
│   │   ├── vapi/
│   │   │   └── route.ts              # Vapi webhook handler
│   │   └── calls/
│   │       └── route.ts              # Calls API
│   ├── layout.tsx
│   ├── page.tsx                      # Landing Page
│   └── globals.css
├── components/
│   ├── landing/
│   │   ├── Hero.tsx
│   │   ├── Header.tsx
│   │   ├── TeamSection.tsx
│   │   └── Footer.tsx
│   ├── dashboard/
│   │   ├── Sidebar.tsx
│   │   ├── Calendar.tsx
│   │   ├── CallsTable.tsx
│   │   ├── KPICards.tsx
│   │   └── Charts.tsx
│   ├── ui/                           # Shadcn/UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   └── ...
│   └── providers/
│       └── SupabaseProvider.tsx
├── lib/
│   ├── supabase.ts                   # Supabase client
│   ├── vapi.ts                       # Vapi client
│   ├── types.ts                      # TypeScript definitions
│   └── utils.ts                      # Utility functions
├── hooks/
│   ├── useSupabase.ts
│   ├── useVapi.ts
│   └── useRealtime.ts
├── schema.sql                        # Database schema
├── package.json
├── tailwind.config.ts
├── next.config.mjs
├── vercel.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm
- Supabase account
- Vapi.ai account

### 1. Clone and Install

```bash
# Clone the repository
git clone https://github.com/your-org/volina-web.git
cd volina-web

# Install dependencies
npm install
```

### 2. Environment Variables

Create a `.env.local` file in the root directory:

```env
# ===========================================
# VOLINA AI - Environment Variables
# ===========================================

# Supabase Configuration
# Get these from: Supabase Dashboard > Project Settings > API
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Vapi.ai Configuration
# Get these from: Vapi Dashboard > Settings > API Keys
NEXT_PUBLIC_VAPI_PUBLIC_KEY=your-vapi-public-key
VAPI_PRIVATE_KEY=your-vapi-private-key
VAPI_ASSISTANT_ID=your-vapi-assistant-id

# n8n Webhook (Optional - for automation)
N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/volina

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Database Setup

1. Go to your Supabase Dashboard
2. Navigate to SQL Editor
3. Copy and run the contents of `schema.sql`
4. This will create:
   - `profiles` - User authentication
   - `doctors` - Healthcare providers (seeded with 3 mock doctors)
   - `appointments` - Patient appointments
   - `calls` - Voice call logs

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Test Login

Use these mock credentials:
- **Email:** `admin@volina.org`
- **Password:** any password

---

## 📡 API Endpoints

### Vapi Webhook Handler

```
POST /api/vapi
```

Receives `end-of-call-report` webhooks from Vapi.ai.

### Calls API

```
GET /api/calls        # List all calls
POST /api/calls       # Create new call record
GET /api/calls/:id    # Get call details
```

---

## 🔄 n8n Integration

The platform integrates with n8n for processing Vapi webhooks:

1. **Webhook Trigger**: n8n receives `end-of-call-report` from Vapi
2. **Data Processing**: Extract transcript, summary, sentiment
3. **Database Insert**: Add records to Supabase `calls` and `appointments`
4. **Real-time Update**: Dashboard updates automatically via subscriptions

### Sample n8n Workflow

```json
{
  "nodes": [
    {
      "name": "Vapi Webhook",
      "type": "n8n-nodes-base.webhook",
      "parameters": {
        "path": "volina-vapi"
      }
    },
    {
      "name": "Process Call Data",
      "type": "n8n-nodes-base.code",
      "parameters": {
        "jsCode": "// Extract call data from Vapi payload"
      }
    },
    {
      "name": "Supabase Insert",
      "type": "n8n-nodes-base.supabase",
      "parameters": {
        "operation": "insert",
        "table": "calls"
      }
    }
  ]
}
```

---

## 🎨 Theme & Design

### Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Primary Blue | `#0055FF` | Main accent, CTAs |
| White | `#FFFFFF` | Backgrounds, text |
| Gray 50 | `#F9FAFB` | Subtle backgrounds |
| Gray 900 | `#111827` | Dark text |

### Design Principles

- **Minimalist**: Clean layouts with purposeful whitespace
- **Clinical**: Professional, trustworthy aesthetic
- **Accessible**: WCAG 2.1 AA compliant

---

## 📦 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel Dashboard
3. Add environment variables
4. Deploy!

```bash
# Or use Vercel CLI
vercel --prod
```

### Environment Variables in Vercel

Add all variables from `.env.local` to your Vercel project:
- Settings > Environment Variables
- Add each variable for Production, Preview, and Development

---

## 🧪 Development Commands

```bash
# Development server
npm run dev

# Type checking
npm run type-check

# Linting
npm run lint

# Production build
npm run build

# Start production server
npm run start
```

---

## 📄 License

MIT License - See [LICENSE](LICENSE) for details.

---

## 🤝 Support

- **Documentation**: [docs.volina.ai](https://docs.volina.ai)
- **Issues**: [GitHub Issues](https://github.com/your-org/volina-web/issues)
- **Email**: support@volina.ai

---

<div align="center">
  <p>Built with ❤️ by the Volina Team</p>
</div>

