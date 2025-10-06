# CyberQuest Research - SMAN 1 Katapang

A lightweight, polished web app to collect pre-test & post-test data from SMAN 1 Katapang students about digital security awareness. Built with Next.js 13, React, TypeScript, Tailwind CSS, hosted on Vercel with Supabase (Postgres) for storage and real-time dashboard.

## 🎯 Purpose

This research app helps collect data for a thesis study on digital security awareness among high school students. It provides:

- Pre-test and post-test forms for students
- Real-time teacher dashboard with analytics
- CSV export functionality for data analysis
- Anonymous data collection with privacy protection

## ✨ Features

### For Students:

- 📝 **Pre-test/Post-test Forms** - Responsive forms accessible via QR codes
- 🔒 **Anonymous Participation** - No login required, privacy-focused
- ⏱️ **Quick Survey** - 5-7 minutes completion time
- 📱 **Mobile-Friendly** - Works on all devices

### For Teachers:

- 📊 **Real-time Dashboard** - Live submission tracking
- 📈 **Analytics** - Class breakdown, response rates, question statistics
- 🔗 **QR Code Generation** - Shareable links for students
- 📥 **CSV Export** - Download data for analysis
- 🔐 **Secure Access** - Password-protected admin area

## 🚀 Quick Start

### 1. Setup Supabase Database

1. Create a project at [Supabase](https://supabase.com)
2. In SQL Editor, run `supabase-research-schema.sql`
3. Run `supabase-sample-data.sql` for test data
4. Copy your URL and API keys from Settings > API

### 2. Setup Local Development

```bash
# Clone and install dependencies
git clone <your-repo>
cd cyberquest
npm install

# Configure environment
cp .env.local.example .env.local
# Edit .env.local with your Supabase credentials

# Run development server
npm run dev
```

### 3. Deploy to Vercel

```bash
# Push to GitHub, then:
# 1. Import project to Vercel
# 2. Add environment variables
# 3. Deploy
```

## 📋 Form Structure

### Pre-test & Post-test includes:

**📝 Identity (Optional):**

- Student name (initials encouraged)
- Class (X IPA 1, XI IPS 2, etc.)
- Gender (optional)

**💻 Digital Habits:**

- Daily internet/phone usage hours
- Most used social media platform
- Experience with suspicious messages/links

**🧠 Knowledge Questions (MCQ):**

- Phishing definition and identification
- OTP request handling
- Password security best practices
- App permission management
- Social engineering awareness
- Ransomware knowledge

**🎭 Attitudes & Behavior:**

- Privacy concerns about personal data
- Response to lottery/prize links

## 🗄️ Database Schema

```sql
-- Main table: submissions
CREATE TABLE submissions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  type TEXT CHECK (type IN ('pre', 'post')),

  -- Identity (optional)
  student_name TEXT,
  class TEXT NOT NULL,
  gender TEXT,

  -- Digital habits
  internet_hours TEXT,
  favorite_platform TEXT,
  received_suspicious BOOLEAN,

  -- Knowledge questions
  q_phishing TEXT,
  q_otp_request TEXT,
  q_password_strong TEXT,
  q_app_permissions TEXT,
  q_social_engineering TEXT,
  q_ransomware TEXT,

  -- Attitudes
  q_attitude_worry BOOLEAN,
  q_action_lottery TEXT,

  -- Meta
  teacher_notes TEXT,
  ip_hash TEXT,
  consent BOOLEAN DEFAULT FALSE NOT NULL
);
```

## 🔐 Security & Privacy

- **Row Level Security (RLS)** enabled
- **Anonymous submissions** - no personal login required
- **IP rate limiting** - max 3 submissions per IP per 5 minutes
- **Data anonymization** - hashed IPs, optional names
- **Consent required** - explicit checkbox before submission
- **Teacher-only dashboard** - password protected admin area

## 🌐 API Endpoints

- `POST /api/submit` - Submit form data (rate-limited)
- `GET /api/admin/stats` - Dashboard statistics (admin-only)
- `GET /api/admin/export` - CSV export (admin-only)

## 👨‍🏫 Teacher Guide

### Accessing Dashboard:

1. Go to `/admin`
2. Use password: `sman1katapang2024`
3. View real-time submissions and analytics

### Generating Student Links:

1. In dashboard, click "Copy Link Pre-Test" or "Copy Link Post-Test"
2. Share link or generate QR code using any QR generator
3. Students can access forms directly

### Exporting Data:

1. Click "Download CSV" in dashboard
2. Opens Excel-compatible file with all submissions
3. Use for statistical analysis in SPSS, R, or Excel

## 📊 Sample Analytics

The dashboard shows:

- **Submission counts** by type (pre/post)
- **Class breakdown** with response rates
- **Question statistics** showing correct answer percentages
- **Recent submissions** with timestamps
- **Response rate calculation** (post-test / pre-test ratio)

## 🔧 Environment Variables

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
IP_SALT=your-unique-salt-for-ip-hashing
```

## 📱 Usage Flow

### Students:

1. Scan QR code or open shared link
2. Read research information and consent
3. Fill form sections (5-7 minutes)
4. Submit and receive confirmation

### Teachers:

1. Log into dashboard with password
2. Generate and share student links
3. Monitor submissions in real-time
4. Export data when ready for analysis

## 🎓 Research Compliance

- **Ethical approval** - designed for academic research
- **Data minimization** - only collect necessary data
- **Consent mechanism** - explicit checkbox required
- **Anonymization** - student names optional, IPs hashed
- **Retention policy** - note data usage in privacy footer

## 📞 Support

For questions or issues:

- **Technical:** Check console logs for errors
- **Research:** Contact thesis supervisor
- **Data:** Export CSV from admin dashboard

## 📄 License

MIT License - free for educational and research use.

---

**Built with ❤️ for SMAN 1 Katapang digital security research**
