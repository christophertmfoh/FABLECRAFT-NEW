# Step 1: Landing + Auth Migration - Senior Developer Checklist

## Pre-Migration Setup (30 min)

### Dependencies Installation
- [ ] Install production dependencies
  ```bash
  npm install framer-motion next-themes
  npm install class-variance-authority
  npm install @radix-ui/react-slot
  ```
- [ ] Verify all dependencies installed correctly
- [ ] Run type check to ensure no conflicts

### Environment Setup
- [ ] Create `.env.local` file
- [ ] Add API endpoint configuration
  ```
  VITE_API_URL=http://localhost:5000/api
  ```
- [ ] Create `.env.example` for documentation
- [ ] Add `.env.local` to `.gitignore`

### Project Structure
- [ ] Verify folder structure is created:
  ```
  src/
  ├── components/
  │   ├── ui/
  │   ├── theme/
  │   └── effects/
  ├── pages/
  │   ├── landing/
  │   └── auth/
  ├── hooks/
  └── styles/
  ```

## UI Components Migration (45 min)

### Copy Required Shadcn Components
- [ ] Create `src/lib/utils.ts` (already exists ✓)
- [ ] Copy `alert.tsx` with proper TypeScript types
- [ ] Copy `badge.tsx` with proper TypeScript types
- [ ] Copy `button.tsx` with proper TypeScript types
- [ ] Copy `card.tsx` with all sub-components
- [ ] Copy `dropdown-menu.tsx` with all sub-components
- [ ] Copy `input.tsx` with proper TypeScript types
- [ ] Copy `label.tsx` with proper TypeScript types
- [ ] Copy `tabs.tsx` with all sub-components
- [ ] Verify each component has no TypeScript errors
- [ ] Create index.ts barrel export for ui components

### Component Dependencies
- [ ] Ensure all Radix UI dependencies are compatible
- [ ] Update import paths to use `@/components/ui`
- [ ] Test each component in isolation

## Theme System Setup (30 min)

### CSS Variables & Global Styles
- [ ] Copy `index.css` content to `src/styles/globals.css`
- [ ] Extract CSS variables for theming
- [ ] Set up Tailwind CSS variables integration
- [ ] Import globals.css in main.tsx

### Theme Provider Setup
- [ ] Copy `theme-provider.tsx` to `src/components/theme/`
- [ ] Copy `theme-toggle.tsx` to `src/components/theme/`
- [ ] Update imports for next-themes
- [ ] Wrap App with ThemeProvider
- [ ] Test theme switching works
- [ ] Verify theme persists on refresh

## Authentication Setup (30 min)

### Auth Store (Zustand)
- [ ] Copy `useAuth.ts` to `src/hooks/`
- [ ] Update TypeScript interfaces for User
- [ ] Configure persist middleware
- [ ] Add proper error handling
- [ ] Test store initialization

### API Client Configuration
- [ ] Update `src/api/client.ts` for auth endpoints
- [ ] Add auth interceptors
- [ ] Configure CORS headers
- [ ] Add request/response logging (dev only)
- [ ] Create auth service functions:
  - [ ] `login(credentials)`
  - [ ] `signup(userData)`
  - [ ] `logout()`
  - [ ] `getCurrentUser()`

## Landing Page Migration (45 min)

### Component Migration
- [ ] Create `src/pages/landing/` directory
- [ ] Copy `LandingPage.tsx`
- [ ] Copy `HeroSection.tsx`
- [ ] Copy `CTASection.tsx`
- [ ] Copy `FeatureCards.tsx`
- [ ] Copy `index.ts` barrel export
- [ ] Copy `FloatingOrbs.tsx` to `src/components/effects/`

### Update Imports & Props
- [ ] Update all import paths
- [ ] Fix TypeScript prop interfaces
- [ ] Update navigation callbacks
- [ ] Ensure all icons from lucide-react work
- [ ] Test all animations (framer-motion)

### Landing Page Integration
- [ ] Connect to App.tsx
- [ ] Wire up navigation to auth
- [ ] Test all buttons/links
- [ ] Verify responsive design
- [ ] Check dark/light theme

## Auth Page Migration (45 min)

### Component Migration
- [ ] Create `src/pages/auth/` directory
- [ ] Copy `AuthPageRedesign.tsx`
- [ ] Update all imports
- [ ] Fix TypeScript types

### Form Validation
- [ ] Verify Zod schemas work
- [ ] Test password validation rules
- [ ] Check email validation
- [ ] Test form error states
- [ ] Verify loading states

### API Integration
- [ ] Connect login to API endpoint
- [ ] Connect signup to API endpoint
- [ ] Handle success responses
- [ ] Handle error responses
- [ ] Show appropriate error messages
- [ ] Redirect after successful auth

## Integration & Testing (30 min)

### Navigation Flow
- [ ] Landing → Auth navigation works
- [ ] Auth → Dashboard navigation works
- [ ] Protected route handling
- [ ] Logout functionality
- [ ] Back button handling

### State Management
- [ ] Auth state persists on refresh
- [ ] Token stored securely
- [ ] User data available globally
- [ ] Logout clears all data
- [ ] Error states handled

### Cross-Browser Testing
- [ ] Test in Chrome
- [ ] Test in Firefox
- [ ] Test in Safari
- [ ] Test mobile responsive
- [ ] Test theme in all browsers

### Accessibility
- [ ] Keyboard navigation works
- [ ] Screen reader friendly
- [ ] Proper ARIA labels
- [ ] Focus management
- [ ] Color contrast passes WCAG

## Code Quality Checks (15 min)

### TypeScript
- [ ] Run `npm run type-check` - ZERO errors
- [ ] All components properly typed
- [ ] No `any` types without justification
- [ ] Interfaces documented

### Linting
- [ ] Run `npm run lint` - ZERO errors
- [ ] Fix any warnings
- [ ] Consistent code style

### Testing
- [ ] Write tests for auth hooks
- [ ] Write tests for theme toggle
- [ ] Integration test for login flow
- [ ] All tests pass

### Performance
- [ ] Bundle size reasonable
- [ ] No unnecessary re-renders
- [ ] Images optimized
- [ ] Code split where appropriate

## Documentation (15 min)

### Code Documentation
- [ ] Add JSDoc to complex functions
- [ ] Document API endpoints
- [ ] Document environment variables
- [ ] Update README with setup instructions

### User Documentation
- [ ] Document login process
- [ ] Document theme switching
- [ ] Note any limitations
- [ ] Create troubleshooting guide

## Final Verification

### Functionality Checklist
- [ ] User can view landing page
- [ ] Theme toggle works and persists
- [ ] User can navigate to auth
- [ ] User can sign up
- [ ] User can log in
- [ ] User sees appropriate errors
- [ ] User can log out
- [ ] Auth state persists on refresh

### Quality Checklist
- [ ] Zero TypeScript errors
- [ ] Zero console errors
- [ ] Zero console warnings
- [ ] All tests pass
- [ ] Lighthouse score > 90
- [ ] No security vulnerabilities

### Deployment Ready
- [ ] Environment variables documented
- [ ] Build succeeds
- [ ] No hardcoded values
- [ ] Error boundaries in place
- [ ] Loading states for all async operations

---

## Time Summary
- Pre-Migration Setup: 30 min
- UI Components: 45 min
- Theme System: 30 min
- Authentication: 30 min
- Landing Page: 45 min
- Auth Page: 45 min
- Integration & Testing: 30 min
- Code Quality: 15 min
- Documentation: 15 min

**Total: ~3 hours**

## Definition of Done
✅ Landing page identical to original
✅ Auth flow works end-to-end
✅ Zero TypeScript errors
✅ All tests pass
✅ Theme persists
✅ Code is production-ready
✅ Senior developer would approve this PR