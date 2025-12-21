# Pre-Launch UI/UX & Content Audit Punch List
**Litchfield Perk Coffee Shop Website**  
**Date:** 2024  
**Auditor:** Senior Frontend Engineer

---

## 🔴 MUST-FIX BEFORE LAUNCH

### 1. **Instagram Widget Placeholder Content (Unfinished UI)**
- **File:** `src/components/widgets/InstagramWidget.jsx`
- **Component:** InstagramWidget
- **Issue:** Widget displays placeholder "Photo 1, Photo 2..." instead of actual Instagram feed
- **Location:** Lines 66-80
- **Impact:** High - Unfinished feature visible to users
- **Recommendation:** 
  - Integrate SnapWidget embed code OR
  - Replace with actual Instagram API integration OR
  - Remove section entirely if not ready for launch
- **Priority:** CRITICAL

### 2. **Missing Alt Text on Decorative Images**
- **File:** `src/components/widgets/InstagramWidget.jsx`
- **Component:** InstagramWidget placeholder images
- **Issue:** Placeholder divs (lines 70-78) have no alt text or aria-label
- **Location:** Lines 70-78
- **Impact:** Medium - Accessibility violation
- **Recommendation:** Add `aria-label="Instagram photo placeholder"` or `role="presentation"` to decorative placeholders

### 3. **Contact Modal Form Accessibility**
- **File:** `src/components/ui/ContactModal.jsx`
- **Component:** ContactModal
- **Issue:** 
  - Phone field has `aria-describedby="phone-optional"` but the description is `sr-only` (line 212), which is good, but the label text "(optional)" is not in a `<span>` with proper styling
  - Form submission uses `alert()` which is not accessible
- **Location:** Lines 199-213, 77
- **Impact:** Medium - Accessibility and UX issues
- **Recommendation:**
  - Keep `sr-only` for phone optional text (already correct)
  - Replace `alert()` with accessible success message component
  - Add `aria-live="polite"` region for form submission feedback

### 4. **Hero Section Duplicate Main Tag**
- **File:** `src/components/sections/HeroSection.jsx`
- **Component:** HeroSection
- **Issue:** Uses `<main>` tag (line 32) but parent `LitchfieldPerkApp.jsx` already has `<main id="main-content">` (line 74)
- **Location:** Line 32
- **Impact:** High - Semantic HTML violation, accessibility issue
- **Recommendation:** Change `<main>` to `<section>` or `<div>` in HeroSection

### 5. **Wholesale Page Table Responsive Layout**
- **File:** `src/components/sections/WholesalePage.jsx`
- **Component:** WholesalePage - Profit Scenarios table
- **Issue:** Table has `overflow-x-auto` (line 211) but may be difficult to scroll on mobile without visual indicators
- **Location:** Lines 211-264
- **Impact:** Medium - Mobile UX issue
- **Recommendation:**
  - Add visual scroll indicators (fade edges)
  - Consider card-based layout for mobile breakpoint
  - Add `aria-label` to table wrapper explaining scrollable nature

### 6. **Missing Focus Trap in Modal**
- **File:** `src/components/ui/ContactModal.jsx`
- **Component:** ContactModal
- **Issue:** Modal doesn't trap focus - users can tab outside modal when open
- **Location:** Entire component
- **Impact:** High - Accessibility violation (WCAG 2.1)
- **Recommendation:** Implement focus trap using `useEffect` to manage focusable elements

### 7. **Review Carousel Empty State**
- **File:** `src/components/sections/ReviewsSection.jsx`
- **Component:** ReviewsSection
- **Issue:** If `reviews.length === 0`, carousel shows empty state but navigation buttons are still visible (though disabled)
- **Location:** Lines 188-204
- **Impact:** Medium - UX confusion
- **Recommendation:** Hide navigation buttons when `reviews.length === 0` or show friendly empty state message

---

## 🟡 SHOULD-FIX

### 8. **Inconsistent Section Spacing**
- **Files:** Multiple section components
- **Issue:** Mixed use of `mb-8 sm:mb-10` vs `mb-6 sm:mb-8` vs `mt-6 sm:mt-8` creates visual inconsistency
- **Locations:**
  - `HoursSection.jsx` line 36: `mb-8 sm:mb-10`
  - `VisitSection.jsx` line 21: `mb-8 sm:mb-10`
  - `ReviewsSection.jsx` line 125: `mb-8 sm:mb-10`
  - `AboutUs.jsx` line 65: `mt-8 sm:mt-10 lg:mt-0`
- **Impact:** Medium - Visual inconsistency
- **Recommendation:** Standardize to `mb-8 sm:mb-10` for section headers across all sections

### 9. **Typography Hierarchy Inconsistency**
- **Files:** Multiple components
- **Issue:** 
  - `HoursSection.jsx` uses `section-title` (line 37) but `VisitSection.jsx` also uses `section-title` (line 22)
  - `AboutUs.jsx` uses `SectionShell` with `section-title` (line 44) - consistent
  - `MenuSection.jsx` uses `SectionShell` - consistent
  - But some sections have manual heading structure
- **Locations:**
  - `HoursSection.jsx` line 37: Manual heading
  - `VisitSection.jsx` line 22: Manual heading
  - `ReviewsSection.jsx` line 126: Manual heading
  - `InstagramSection.jsx` line 61: Manual heading
- **Impact:** Medium - Typography inconsistency
- **Recommendation:** Use `SectionShell` component consistently across all sections OR create standardized heading pattern

### 10. **Button Size Inconsistencies**
- **Files:** Multiple components
- **Issue:** Mixed use of button sizes:
  - Hero: `size="lg"` (lines 110, 122, 134)
  - Menu filters: `size="default"` (line 60)
  - Visit section: `size="default"` (lines 48, 69)
  - Footer: `variant="ghost"` (no size specified)
- **Impact:** Low-Medium - Visual inconsistency
- **Recommendation:** Document button size usage pattern and apply consistently

### 11. **Missing Aria-Labels on Icon-Only Buttons**
- **File:** `src/components/sections/ReviewsSection.jsx`
- **Component:** ReviewsSection - Navigation arrows
- **Issue:** Navigation buttons have `aria-label` (good!) but could be more descriptive
- **Location:** Lines 188-204
- **Impact:** Low - Minor accessibility improvement
- **Recommendation:** Enhance to: `aria-label="Previous review: [Reviewer name]"` (dynamic based on current review)

### 12. **Hours Section Color Inconsistency**
- **File:** `src/components/sections/HoursSection.jsx`
- **Component:** HoursSection
- **Issue:** 
  - Line 94: Uses `bg-brand-50` and `border-brand-200` (hardcoded Tailwind classes)
  - Should use semantic brand classes: `bg-brand-background-light` and `border-brand-border`
- **Location:** Line 94
- **Impact:** Low - Design system inconsistency
- **Recommendation:** Replace with semantic brand color classes

### 13. **Menu Card Price Styling Inconsistency**
- **File:** `src/components/ui/MenuCard.jsx`
- **Component:** MenuCard
- **Issue:** Price uses `bg-brand-50 text-brand-700` (line 58) but should use semantic classes
- **Location:** Line 58
- **Impact:** Low - Design system consistency
- **Recommendation:** Use `bg-brand-background-light text-brand-primary` for consistency

### 14. **Responsive Image Srcset Path Issue**
- **File:** `src/components/ui/ResponsiveImage.jsx`
- **Component:** ResponsiveImage
- **Issue:** Line 49-50 constructs paths as `/images/optimized${basePath}-mobile.webp` but if `src="/logo-512.png"`, this becomes `/images/optimized/logo-512-mobile.webp` which may not match actual file structure
- **Location:** Lines 49-50
- **Impact:** Medium - Potential broken images
- **Recommendation:** Verify image paths match actual file structure, or update path construction logic

### 15. **Wholesale Page Heading Hierarchy**
- **File:** `src/components/sections/WholesalePage.jsx`
- **Component:** WholesalePage
- **Issue:** 
  - Line 80: Uses `display-hero` for h1 (correct)
  - Line 118: Uses `section-title` for h2 (correct)
  - Line 131: Uses `SectionShell` with title (correct)
  - Line 178: Uses `section-title` for h3 inside card (should be `subheading`)
- **Location:** Line 178, 191
- **Impact:** Low - Semantic HTML hierarchy
- **Recommendation:** Change card headings from `section-title` to `subheading` class

### 16. **Footer Social Links Missing Descriptive Text**
- **File:** `src/components/sections/Footer.jsx`
- **Component:** Footer
- **Issue:** Social buttons have `aria-label` but text content is just "Instagram" / "Facebook" - could be more descriptive
- **Location:** Lines 28-45
- **Impact:** Low - Minor accessibility improvement
- **Recommendation:** Keep aria-label as is (already descriptive), but consider adding icon + text pattern for better visual clarity

### 17. **Skip Links Positioning**
- **File:** `src/app/LitchfieldPerkApp.jsx`
- **Component:** LitchfieldPerkApp
- **Issue:** Skip links (lines 53-66) are present but may not be visible enough when focused
- **Location:** Lines 53-66
- **Impact:** Low - Accessibility enhancement
- **Recommendation:** Verify skip links are properly styled in `src/index.css` (lines 235-259) - appears correct, but test in browser

### 18. **Menu Section Filter Button Text Wrapping**
- **File:** `src/components/sections/MenuSection.jsx`
- **Component:** MenuSection
- **Issue:** Filter buttons use `clamp-2-mobile` (line 66) but on desktop use `lg:whitespace-nowrap lg:truncate` which may cut off text
- **Location:** Line 61
- **Impact:** Low - UX issue on very long category names
- **Recommendation:** Test with longest category name, consider abbreviated labels on mobile

### 19. **Contact Modal Form Validation Error Colors**
- **File:** `src/components/ui/ContactModal.jsx`
- **Component:** ContactModal
- **Issue:** Error states use `border-red-500` and `text-red-600` (hardcoded) instead of semantic error color from design system
- **Location:** Lines 138, 144, 162, 168, 186, 192, 227, 233
- **Impact:** Low - Design system consistency
- **Recommendation:** Use `--color-accent-tomato` or create semantic error color classes

### 20. **Wholesale Page Table Mobile Experience**
- **File:** `src/components/sections/WholesalePage.jsx`
- **Component:** WholesalePage
- **Issue:** Table has 7 columns which will be cramped on mobile even with horizontal scroll
- **Location:** Lines 213-263
- **Impact:** Medium - Mobile UX
- **Recommendation:** 
  - Add card-based layout for mobile breakpoint (< 768px)
  - Or add visual scroll indicators
  - Consider stacking some columns on mobile

---

## 🟢 NICE-TO-HAVE

### 21. **Hero Section Info Card Spacing**
- **File:** `src/components/sections/HeroSection.jsx`
- **Component:** HeroSection
- **Issue:** Info card (line 145) uses `mt-6 sm:mt-8 md:mt-10` which is good, but could align with section spacing system
- **Location:** Line 145
- **Impact:** Very Low - Already good, minor polish
- **Recommendation:** No change needed, but document spacing system

### 22. **Review Carousel Auto-Advance Pause on Interaction**
- **File:** `src/components/sections/ReviewsSection.jsx`
- **Component:** ReviewsSection
- **Issue:** Auto-advance pauses on hover (good!) but doesn't pause on keyboard focus
- **Location:** Lines 178-179
- **Impact:** Very Low - Enhancement
- **Recommendation:** Add `onFocus` handler to pause auto-advance when carousel receives focus

### 23. **Instagram Section Skeleton Loading**
- **File:** `src/components/sections/InstagramSection.jsx`
- **Component:** InstagramSection
- **Issue:** Skeleton loading (lines 70-97) is well-implemented but could match actual widget dimensions more closely
- **Location:** Lines 70-97
- **Impact:** Very Low - Polish
- **Recommendation:** Measure actual widget dimensions and adjust skeleton

### 24. **Button Hover States Consistency**
- **Files:** Multiple components
- **Issue:** All buttons use consistent hover states from Button component (good!), but some custom buttons (review nav) have custom styles
- **Location:** `src/index.css` lines 667-702
- **Impact:** Very Low - Already consistent
- **Recommendation:** Document button patterns

### 25. **Section Background Alternation**
- **Files:** All section components
- **Issue:** Background alternation (white/light) is consistent and well-implemented
- **Impact:** None - Already good
- **Recommendation:** Document pattern for future sections

### 26. **Typography Scale Documentation**
- **Files:** `src/index.css`
- **Issue:** Typography scale is well-defined but not documented in component comments
- **Location:** Lines 590-664
- **Impact:** Very Low - Documentation
- **Recommendation:** Add JSDoc comments explaining typography scale usage

### 27. **Container Max-Width Consistency**
- **Files:** Multiple components
- **Issue:** Some sections use `Container` with default max-width, others specify `maxWidth="xl"` or `maxWidth="2xl"`
- **Locations:**
  - `WholesalePage.jsx` line 78: `maxWidth="2xl"`
  - `WholesalePage.jsx` line 112: `maxWidth="xl"`
- **Impact:** Very Low - Already appropriate
- **Recommendation:** Document when to use different max-widths

### 28. **Loading States for Async Content**
- **File:** `src/components/sections/ReviewsSection.jsx`
- **Component:** ReviewsSection
- **Issue:** Has excellent skeleton loading (lines 136-174)
- **Impact:** None - Already excellent
- **Recommendation:** Use as pattern for other async content

### 29. **Accessibility Color Contrast Verification**
- **Files:** All components
- **Issue:** Need to verify all text meets WCAG AA contrast ratios (4.5:1 for normal text, 3:1 for large text)
- **Locations:** Throughout
- **Impact:** Low - Should verify with tool
- **Recommendation:** Run automated contrast checker (e.g., axe DevTools, WAVE) and document results

### 30. **Mobile Menu Animation**
- **File:** `src/components/layout/ScrollHeader.jsx`
- **Component:** ScrollHeader - Mobile menu
- **Issue:** Mobile menu (lines 416-541) appears instantly - could benefit from slide-down animation
- **Location:** Lines 416-541
- **Impact:** Very Low - Enhancement
- **Recommendation:** Add smooth slide-down animation with `prefers-reduced-motion` support

---

## 📊 Summary Statistics

- **Total Issues Found:** 30
- **Must-Fix (Critical):** 7
- **Should-Fix (Important):** 13
- **Nice-to-Have (Polish):** 10

### By Category:
- **Accessibility:** 8 issues
- **Responsive Design:** 5 issues
- **Typography/Spacing:** 6 issues
- **Unfinished UI:** 2 issues
- **Design System Consistency:** 5 issues
- **UX Enhancements:** 4 issues

### By File:
- `WholesalePage.jsx`: 4 issues
- `ContactModal.jsx`: 4 issues
- `ReviewsSection.jsx`: 3 issues
- `HeroSection.jsx`: 2 issues
- `InstagramWidget.jsx`: 2 issues
- `HoursSection.jsx`: 2 issues
- `MenuSection.jsx`: 2 issues
- Others: 11 issues across multiple files

---

## 🎯 Recommended Fix Order

1. **Day 1 (Critical):**
   - Fix Instagram widget placeholder (#1)
   - Fix duplicate main tag (#4)
   - Implement modal focus trap (#6)
   - Fix review carousel empty state (#7)

2. **Day 2 (Important):**
   - Standardize section spacing (#8)
   - Fix typography hierarchy (#9)
   - Fix hours section colors (#12)
   - Verify responsive image paths (#14)

3. **Day 3 (Polish):**
   - Address remaining should-fix items
   - Run contrast checker (#29)
   - Test all responsive breakpoints
   - Final accessibility audit

---

## ✅ Pre-Launch Checklist

- [ ] All must-fix items resolved
- [ ] All should-fix items addressed (or documented as post-launch)
- [ ] Accessibility audit passed (WCAG 2.1 AA)
- [ ] Responsive testing completed (mobile, tablet, desktop)
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Performance audit (Lighthouse score > 90)
- [ ] All images have alt text
- [ ] All forms have labels
- [ ] All interactive elements have focus states
- [ ] Skip links functional
- [ ] Modal accessibility verified
- [ ] Color contrast verified
- [ ] No console errors
- [ ] No broken links
- [ ] SEO meta tags complete

---

**End of Punch List**

