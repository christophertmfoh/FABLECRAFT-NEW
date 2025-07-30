# Senior Developer Migration Audit - FableCraft Enterprise

## Executive Summary
**Goal**: Migrate Landing Page + Auth Page from broken app to clean enterprise setup
**Approach**: Lift-and-shift with minimal changes, maintain exact functionality

---

## 1. Critical Path Analysis

### What We're Actually Migrating:
1. **Landing Page** - Marketing/entry point
2. **Auth Page** - Login/Register functionality
3. **Required Dependencies** - Only what these two pages need

### What We're NOT Migrating (Yet):
- Character system (will be refactored)
- Project management
- World bible
- AI features
- Any other features

---

## 2. Dependency Audit

### A. UI Component Library (Shadcn/ui)
**Status**: Original app uses shadcn/ui components
**Action**: Copy only the components used by Landing/Auth

**EXACT Components Used** (from import scan):
```
- alert.tsx (Alert, AlertDescription)
- badge.tsx
- button.tsx
- card.tsx (Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle)
- dropdown-menu.tsx (full component)
- input.tsx
- label.tsx
- tabs.tsx (Tabs, TabsContent, TabsList, TabsTrigger)
```

### B. State Management
**Auth State**: Uses Zustand with persist middleware
**Action**: Already have Zustand installed ✅

### C. Routing
**Current**: No router - uses conditional rendering
**Action**: Keep same pattern initially (no router needed yet)

### D. Styling & Theme
**Current**: 
- Tailwind CSS + CSS variables for theming
- `next-themes` for theme management
**Action**: 
- Copy theme CSS variables from index.css
- Install `next-themes` package

### E. Animation
**Current**: Framer Motion for animations
**Action**: Need to install framer-motion

### F. Validation
**Current**: React Hook Form + Zod
**Action**: Already installed ✅

### G. API Communication
**Current**: Direct fetch calls to /api/auth/*
**Action**: Use our axios client, configure for auth endpoints

### H. Icons
**Current**: Lucide React icons
**Action**: Already installed ✅

---

## 3. File Inventory

### Landing Page Files:
```
client/src/pages/landing/
├── LandingPage.tsx      # Main component (682 lines)
├── HeroSection.tsx      # Hero section component
├── CTASection.tsx       # Call-to-action section
├── FeatureCards.tsx     # Feature cards display
└── index.ts            # Barrel export

client/src/components/
├── FloatingOrbs.tsx     # Background animation effect
├── theme-toggle.tsx     # Dark/light mode toggle
└── theme-provider.tsx   # Theme context provider
```

### Auth Page Files:
```
client/src/pages/
└── AuthPageRedesign.tsx # Complete auth page (755 lines)

client/src/hooks/
└── useAuth.ts          # Zustand auth store (134 lines)
```

### Theme/Styling Files:
```
client/src/
└── index.css           # Global styles + theme variables
```

---

## 4. API Endpoints Required

From server/auth.ts:
- POST /api/auth/signup
- POST /api/auth/login
- POST /api/auth/logout
- GET /api/auth/me

---

## 5. Dependencies to Install

```bash
npm install framer-motion next-themes
```

---

## 6. Migration Strategy

### Phase 1: Infrastructure (30 min)
1. Install missing dependencies (framer-motion, next-themes)
2. Copy theme system (CSS variables, provider, toggle)
3. Copy only required UI components (9 components)
4. Set up auth store (useAuth hook)

### Phase 2: Landing Page (1 hour)
1. Copy all landing page components
2. Copy FloatingOrbs effect
3. Wire up navigation callbacks
4. Test dark/light theme

### Phase 3: Auth Page (1 hour)
1. Copy AuthPageRedesign component
2. Connect to auth endpoints
3. Test login/register flow
4. Verify validation works

### Phase 4: Integration (30 min)
1. Connect landing → auth navigation
2. Test auth state persistence
3. Verify protected routes work
4. Clean up any issues

---

## 7. Risk Assessment

### Low Risk:
- UI components (well isolated)
- Theme system (self-contained)
- Validation (using same libraries)

### Medium Risk:
- API integration (need to match endpoints)
- Auth state management (cookie/token handling)

### Mitigated:
- Not touching character system (future refactor)
- No complex features yet
- Keeping exact same UX

---

## 8. Success Criteria

✅ Landing page looks/works exactly the same
✅ Auth page validates and submits correctly
✅ Theme toggle works
✅ Auth state persists on refresh
✅ Can navigate between landing/auth
✅ Zero TypeScript errors
✅ All tests pass

---

## 9. Time Estimate

**Total: 3-4 hours**
- Setup: 30 minutes
- Landing: 1 hour
- Auth: 1 hour
- Integration: 30 minutes
- Testing/fixes: 30-60 minutes

---

## Next Steps

1. Install framer-motion and next-themes
2. Create migration script to copy files
3. Start with theme system
4. Proceed systematically through phases

**Note**: This is a LIFT-AND-SHIFT migration. We're not improving anything yet, just moving it to work exactly as before in the new clean environment.