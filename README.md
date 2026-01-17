# Hyundai Reach Stacker Digital Checklist

A premium digital checklist system for Hyundai Reach Stacker operators and administrators.

## Features

### 🏗️ Sattva Portal (Operator)
- **Daily Validation**: Ensures checklists are created only for the current date.
- **Status Checks**: Prevents multiple submissions for the same day.
- **Digital Signature**: Integrated e-signature pad for operator verification.
- **Smart Form**: Dynamic checklist items based on standard maintenance schemas.
- **Validation**: Prevents submission of incomplete forms.

### 🛡️ Admin Portal (Manager)
- **Live Dashboard**: View submitted checklists in real-time.
- **Status Indicators**: Quickly see submission times and statuses.
- **Export Power**:
  - 📄 **PDF**: Generate official printable reports with signatures.
  - 📊 **Excel**: Bulk export data for analysis.
- **Filtering**: Search submissions by date.

## Tech Stack
- **Frontend**: React, Vite
- **Styling**: Vanilla CSS (Industrial Design System)
- **Database**: Firebase Realtime Database
- **Utilities**: `jspdf` (PDF), `xlsx` (Excel), `react-signature-canvas`

## Usage
1. Run `npm install`
2. Run `npm run dev`
3. Open the local URL (e.g., `http://localhost:5173`)

## Credentials
- **Admin Password**: `admin` or `1234`
