# 🔗 AI Organ Matching System - Implementation Guide

## Overview

This is an advanced AI-powered organ matching system that automatically matches donors with patients who need organs based on compatibility scoring.

## Features

### 1. **Automatic Matching Algorithm**

- When a request is created, the system automatically searches for compatible donors
- Calculates match scores (0-100) based on:
  - Blood type compatibility (40%)
  - Organ type match (30%)
  - Location proximity (20%)
  - Urgency factor (10%)

### 2. **Auto-Accept High Score Matches**

- If match score >= 80%, the match is automatically accepted
- Both donor and request statuses update automatically
- System sends notifications to both parties

### 3. **Blood Type Compatibility**

```
O+ → Can receive from: O+, O-, A+, A-, B+, B-, AB+, AB-
O- → Can receive from: O-, A-, B-, AB- (Universal Donor)
A+ → Can receive from: A+, A-, O+, O-
A- → Can receive from: A-, O-
B+ → Can receive from: B+, B-, O+, O-
B- → Can receive from: B-, O-
AB+ → Can receive from: O+, O-, A+, A-, B+, B-, AB+, AB-
AB- → Can receive from: O-, A-, B-, AB-
```

## API Endpoints

### Match Management

```
POST   /api/match/find/:requestId       - Find matches for a request
POST   /api/match/auto-match            - Trigger auto-matching
GET    /api/match/pending               - Get all pending matches
PUT    /api/match/accept/:matchId       - Accept a match
POST   /api/match/reject/:matchId       - Reject a match
PUT    /api/match/complete/:matchId     - Complete a match
GET    /api/match/user/:userId          - Get matches for a user
```

## Database Models

### Match Model

```javascript
{
  donorId: ObjectId,           // Reference to Donor
  requestId: ObjectId,         // Reference to Request
  donorUserId: ObjectId,       // Reference to Donor's User
  requestUserId: ObjectId,     // Reference to Patient's User
  matchScore: Number (0-100),  // Overall compatibility score
  compatibilityDetails: {
    bloodTypeMatch: Boolean,
    organMatch: Boolean,
    locationProximity: Number (0-100),
    urgencyFit: Boolean
  },
  status: String,              // pending, accepted, rejected, completed
  createdBySystem: Boolean,    // true if auto-created
  rejectionReason: String      // optional
}
```

### Enhanced Donor Model

```javascript
{
  userId: ObjectId,            // Reference to User
  bloodGroup: String,          // O+, O-, A+, A-, B+, B-, AB+, AB-
  organ: String,               // Heart, Lung, Liver, Kidney, Pancreas, Cornea
  location: {
    city: String,
    state: String,
    country: String
  },
  age: Number,
  medicalHistory: String,
  status: String,              // available, matched, completed, rejected
  matchedWith: ObjectId        // Request ID if matched
}
```

### Enhanced Request Model

```javascript
{
  userId: ObjectId,            // Reference to User
  bloodGroup: String,          // O+, O-, A+, A-, B+, B-, AB+, AB-
  organ: String,               // Heart, Lung, Liver, Kidney, Pancreas, Cornea
  urgency: String,             // critical, high, medium, low
  location: {
    city: String,
    state: String,
    country: String
  },
  medicalHistory: String,
  status: String,              // pending, matched, completed, expired
  matchedWith: ObjectId        // Donor ID if matched
}
```

## Workflow

### 1. Donor Registration

1. User registers with role "Donor"
2. User fills donor profile
3. Donor status: "available"

### 2. Patient Request

1. User registers with role "Patient"
2. User creates organ request
3. **System automatically triggers matching algorithm**

### 3. Matching Process

1. Find all available donors with matching organ
2. Calculate compatibility score for each donor
3. Create Match records sorted by score
4. If top match >= 80%, auto-accept

### 4. Match Management

1. Admin/User reviews pending matches
2. Can accept, reject, or complete matches
3. Statuses update automatically

## Frontend Features

### Matches Dashboard

- View all pending matches
- Filter by status (pending, accepted, completed, rejected)
- See detailed donor/patient info
- See compatibility indicators
- Accept/Reject/Complete matches

### Match Notifications

- Auto-notify when high-score match found
- Notify both donor and patient
- Show match details

## Score Calculation Example

```
Donor: O+, Kidney, Delhi
Request: O+, Kidney, Delhi, Urgency: High

Blood Type: O+ → O+ ✅ = 40 points
Organ: Kidney → Kidney ✅ = 30 points
Location: Delhi → Delhi = 100% = 20 points
Urgency: High = 7 points

Total: 40 + 30 + 20 + 7 = 97% ✅ AUTO-ACCEPT
```

## Security Features

- Only verified users can register as donors
- Sensitive medical information encrypted
- Admin approval for certain operations
- Audit logs for all match operations

## Future Enhancements

- Integration with government medical registries
- SMS/Email notifications
- Payment gateway for processing fees
- Advanced ML-based compatibility scoring
- Video consultation feature
- Insurance verification
- Transplant center coordination
