# FableCraft Enterprise Migration Plan

## Phase 1: Landing Page & Auth Migration

### 1. UI Components Needed (from shadcn/ui)
These are already in the original codebase - we'll copy them over:

**Core Components:**
- accordion.tsx
- alert-dialog.tsx
- alert.tsx
- aspect-ratio.tsx
- avatar.tsx
- badge.tsx
- breadcrumb.tsx
- button.tsx
- calendar.tsx
- card.tsx
- carousel.tsx
- chart.tsx
- checkbox.tsx
- collapsible.tsx
- command.tsx
- context-menu.tsx
- dialog.tsx
- dropdown-menu.tsx
- form.tsx
- hover-card.tsx
- input-otp.tsx
- input.tsx
- label.tsx
- menubar.tsx
- navigation-menu.tsx
- pagination.tsx
- popover.tsx
- progress.tsx
- radio-group.tsx
- resizable.tsx
- scroll-area.tsx
- select.tsx
- separator.tsx
- sheet.tsx
- sidebar.tsx
- skeleton.tsx
- slider.tsx
- sonner.tsx
- switch.tsx
- table.tsx
- tabs.tsx
- textarea.tsx
- toast.tsx
- toaster.tsx
- toggle-group.tsx
- toggle.tsx
- tooltip.tsx

### 2. Theme System Files
- client/src/components/theme-toggle.tsx
- client/src/components/theme-provider.tsx
- client/src/index.css (contains Tailwind setup and theme variables)

### 3. Landing Page Components
- client/src/pages/landing/LandingPage.tsx (682 lines)
- client/src/pages/landing/HeroSection.tsx
- client/src/pages/landing/CTASection.tsx
- client/src/pages/landing/FeatureCards.tsx
- client/src/pages/landing/index.ts
- client/src/components/FloatingOrbs.tsx (visual effect)

### 4. Auth Page Components
- client/src/pages/AuthPageRedesign.tsx (755 lines)
- client/src/hooks/useAuth.ts
- client/src/features/auth/index.ts

### 5. Dependencies to Add
From the imports, we need:
- framer-motion (for animations)
- All the shadcn/ui dependencies (already have Radix UI)

### 6. API Integration
- Auth endpoints from server/auth.ts
- Need to set up API client to match existing endpoints

## Migration Steps:

1. **Set up folder structure**
   ```
   src/
   ├── components/
   │   ├── ui/          # All shadcn components
   │   ├── theme/       # Theme provider & toggle
   │   └── effects/     # FloatingOrbs, etc.
   ├── pages/
   │   ├── landing/
   │   └── auth/
   ├── hooks/
   │   └── useAuth.ts
   └── styles/
       └── globals.css  # From index.css
   ```

2. **Copy UI components** (maintaining exact functionality)

3. **Copy theme system** (dark/light mode)

4. **Migrate Landing Page** (exact UI/UX)

5. **Migrate Auth Page** (with validation)

6. **Connect to existing API** (server/auth.ts endpoints)

## Notes:
- Keep EXACT UI/UX - no improvements yet
- Maintain all animations and interactions
- Use existing validation logic
- Connect to existing backend as-is