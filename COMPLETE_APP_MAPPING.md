# Complete FableCraft Application Mapping

## 1. Page Flow Architecture

```
Landing Page
    ├── Hero Section
    ├── Pricing Section  
    ├── Branding/Text Sections
    ├── Sign In/Up Buttons → Auth Page
    └── Theme Toggle

Auth Page (Sign In/Sign Up)
    ↓
Dashboard (After Login)
    ├── User Dropdown
    │   ├── Your Projects → Projects Page
    │   ├── Community
    │   ├── Settings
    │   └── Sign Out
    │
    └── Projects Page (Master Page)
        ├── Overview Tab ✅ (built)
        ├── Projects Tab ✅ (built)
        ├── Studio Tab ✅ (built)
        ├── World Tab 🚧 (partial - characters only)
        │   └── Characters Component (where refactoring broke)
        ├── Outline Tab ❌ (not built)
        ├── Story Tab ❌ (not built)
        ├── Storyboard Tab ❌ (not built)
        ├── Pre-vis Tab ❌ (not built)
        └── Score Tab ❌ (not built)
```

## 2. Component Inventory

### Working Components (Pre-Refactor):
- Landing Page (all sections)
- Auth System
- Project Dashboard
- Overview Tab
- Projects Tab (CRUD operations)
- Studio Tab
- Characters Component (in World tab)

### Broken During Refactor:
- Character system (attempting "universal entity system")
- Type definitions
- Component relationships

## 3. Key Features to Preserve

### Authentication Flow:
1. User signs up/in
2. JWT token stored
3. Protected routes
4. User dropdown menu
5. Logout functionality

### Project Management:
1. Create new project
2. List all projects
3. Edit project details
4. Delete projects
5. Project workspace navigation

### Studio Features:
- [Need to investigate what was in Studio tab]

### World Bible:
- Characters (partially built)
- [Other planned features]

## 4. Technical Debt & Issues

### Known Problems:
1. Duplicate code/components
2. Inconsistent naming
3. Mixed architectural patterns
4. TypeScript errors hidden by loose config

### Refactoring Attempt Issues:
1. Universal entity system too complex
2. Lost working character functionality
3. Broke type safety
4. 17+ TypeScript errors introduced

## 5. Migration Strategy

### Immediate (Phase 1):
- Landing + Auth only
- Exact copy, no improvements
- Get login flow working

### Next (Phase 2):
- Map all components systematically
- Identify duplicates
- Plan careful migration
- One feature at a time

### Future (Phase 3):
- Refactor characters properly
- Add missing tabs
- Improve architecture

## 6. Questions to Answer

1. What exactly was in the Studio tab?
2. What character fields/features were working?
3. Any other features not mentioned?
4. Priority order for migration?

---

**Note**: This is a living document. We'll update it as we discover more during migration.