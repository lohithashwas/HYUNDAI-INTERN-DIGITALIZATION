# Hyundai Digitalization Project - Digital Checklist System

A comprehensive, multilingual digital inspection platform designed for Hyundai's industrial equipment operations. This system digitizes the daily maintenance checklists for Reach Stackers and Diesel Forklifts, enhancing compliance, accessibility, and reporting efficiency.

## 🌟 Core Features

### 🌍 Multilingual Accessibility
- **Three-Language Support**: Fully localized interface in **English**, **Tamil (தமிழ்)**, and **Hindi (हिन्दी)**.
- **Dynamic Translation**: One-click language toggling instantly translates all menus, checklist items, and feedback messages.
- **Localized Voice**: Text-to-Speech features adapt to the selected language to read checklist items aloud for operators.

### 🏭 Dual Equipment Portals
The application supports distinct workflows for different equipment types:
- **Sattva Portal (Reach Stacker)**: Custom checklist for Reach Stackers (HMI Shop Code, C1Y Contract) with specific safety checks.
- **Forklift Portal**: Specialized checklist for Diesel Forklifts (TVS) including brake systems, fluids, and safety equipment validation.
- **Dedicated Login Flows**: Visual branding and specific entry points for each machine type.

### 🗣️ Voice-Enabled Inspection (Smart Features)
- **Text-to-Speech (Read Aloud)**: Operators can tap a speaker icon to hear checklist instructions in their native language (Tamil/Hindi/English).
- **Speech-to-Text Remarks**: Integrated microphone support allows operators to dictate remarks instead of typing.
- **Audio Voice Notes**:
  - Operators can **record voice messages** to explain "NOT OK" conditions or provided detailed observation.
  - Audio allows for faster and more detailed reporting than text alone.

### 🛡️ Advanced Admin Dashboard
- **Unified View**: Manage submissions for both Reach Stackers and Forklifts in a single table.
- **Multimedia Review**: **Listen to recorded audio notes** directly within the admin view modal.
- **Professional Reporting**:
  - **formatted PDF Exports**: Generates official-looking reports with "Company" headers, grid layouts, and side-by-side digital signatures, mirroring physical paper forms.
  - **Excel Export**: Bulk data download for analysis.
- **Security**: Password-protected access (`admin`/`1234`) and deletion confirmation (`123`).

## 📲 Tech Stack
- **Frontend**: React.js, Vite
- **Styling**: Vanilla CSS (Custom Industrial Glassmorphism Design)
- **Database**: Firebase Realtime Database
- **Audio/Voice**: Web Speech API (Native STT/TTS), MediaRecorder API
- **Utilities**: `jspdf` & `jspdf-autotable` (PDF Generation), `xlsx` (Excel), `react-signature-canvas`

## 🚀 Getting Started

### Installation
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```

### Running Locally
Start the development server:
```bash
npm run dev
```
Access the app at `http://localhost:5173`.

### Usage Guide
1. **Operator Login**:
   - Choose language on the top right.
   - Select **Sattva Portal** (Reach Stacker) or **Forklift Portal**.
   - Complete the checklist. Use the **Mic** for remarks or **Record Audio** for notes.
   - Sign and Submit.
2. **Admin Login**:
   - Select **Admin Portal**.
   - Login with password `admin`.
   - View, Filter, Listen to Audio Notes, or Download PDF Reports.

## CREDENTIALS (DEMO)
- **Admin Password**: `admin` or `1234`
- **Delete Confirmation Code**: `123`
