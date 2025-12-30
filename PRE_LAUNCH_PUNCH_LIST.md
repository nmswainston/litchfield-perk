# Pre-Launch UI/UX & Content Audit Punch List
**Litchfield Perk Coffee Shop Website**  
**Date:** 2024  
**Auditor:** Senior Frontend Engineer

---

## 🔴 MUST-FIX BEFORE LAUNCH

*All critical issues have been resolved! ✅*

---

## 🟡 SHOULD-FIX

### 1. **Typography Hierarchy Inconsistency**
- **Files:** Multiple components
- **Issue:** 
  - `HoursSection.jsx` uses `section-title` manually
  - `VisitSection.jsx` uses `section-title` manually
  - `AboutUs.jsx` uses `SectionShell` with `section-title` - consistent
  - `MenuSection.jsx` uses `SectionShell` - consistent
  - But some sections have manual heading structure instead of using `SectionShell`
- **Locations:**
  - `HoursSection.jsx`: Manual heading
  - `VisitSection.jsx`: Manual heading
  - `ReviewsSection.jsx`: Manual heading
  - `InstagramSection.jsx`: Manual heading
- **Impact:** Medium - Typography inconsistency
- **Recommendation:** Use `SectionShell` component consistently across all sections OR create standardized heading pattern

### 2. **Button Size Inconsistencies**
- **Files:** Multiple components
- **Issue:** Mixed use of button sizes:
  - Hero: `size="lg"`
  - Menu filters: `size="default"`
  - Visit section: `size="default"`
  - Footer: `variant="ghost"` (no size specified)
- **Impact:** Low-Medium - Visual inconsistency
- **Recommendation:** Document button size usage pattern and apply consistently

### 3. **Missing Aria-Labels on Icon-Only Buttons**
- **File:** `src/components/sections/ReviewsSection.jsx`
- **Component:** ReviewsSection - Navigation arrows
- **Issue:** Navigation buttons have `aria-label` (good!) but could be more descriptive
- **Location:** Lines 197-210
- **Impact:** Low - Minor accessibility improvement
- **Recommendation:** Enhance to: `aria-label="Previous review: [Reviewer name]"` (dynamic based on current review)

### 4. **Responsive Image Srcset Path Issue**
- **File:** `src/components/ui/ResponsiveImage.jsx`
- **Component:** ResponsiveImage (BackgroundImage)
- **Issue:** Constructs paths as `/images/optimized${basePath}-mobile.webp` but if `src="/logo-512.png"`, this becomes `/images/optimized/logo-512-mobile.webp` which may not match actual file structure
- **Location:** Lines 21-23
- **Impact:** Medium - Potential broken images
- **Recommendation:** Verify image paths match actual file structure, or update path construction logic

### 4. **Footer Social Links Missing Descriptive Text**
- **File:** `src/components/sections/Footer.jsx`
- **Component:** Footer
- **Issue:** Social buttons have `aria-label` but text content is just "Instagram" / "Facebook" - could be more descriptive
- **Location:** Lines 28-45
- **Impact:** Low - Minor accessibility improvement
- **Recommendation:** Keep aria-label as is (already descriptive), but consider adding icon + text pattern for better visual clarity

### 5. **Skip Links Positioning**
- **File:** `src/app/LitchfieldPerkApp.jsx`
- **Component:** LitchfieldPerkApp
- **Issue:** Skip links are present but may not be visible enough when focused
- **Location:** Lines 45-58
- **Impact:** Low - Accessibility enhancement
- **Recommendation:** Verify skip links are properly styled in `src/styles/accessibility.css` (lines 49-61) - appears correct, but test in browser

### 6. **Menu Section Filter Button Text Wrapping**
- **File:** `src/components/sections/MenuSection.jsx`
- **Component:** MenuSection
- **Issue:** Filter buttons use `clamp-2-mobile` but on desktop use `lg:whitespace-nowrap lg:truncate` which may cut off text
- **Location:** Line 67
- **Impact:** Low - UX issue on very long category names
- **Recommendation:** Test with longest category name, consider abbreviated labels on mobile

---

## 🟢 NICE-TO-HAVE

### 1. **Review Carousel Auto-Advance Pause on Interaction**
- **File:** `src/components/sections/ReviewsSection.jsx`
- **Component:** ReviewsSection
- **Issue:** Auto-advance pauses on hover (good!) but doesn't pause on keyboard focus
- **Location:** Lines 178-179
- **Impact:** Very Low - Enhancement
- **Recommendation:** Add `onFocus` handler to pause auto-advance when carousel receives focus

### 3. **Instagram Section Skeleton Loading**
- **File:** `src/components/sections/InstagramSection.jsx`
- **Component:** InstagramSection
- **Issue:** Skeleton loading (lines 70-97) is well-implemented but could match actual widget dimensions more closely
- **Location:** Lines 70-97
- **Impact:** Very Low - Polish
- **Recommendation:** Measure actual widget dimensions and adjust skeleton

### 4. **Button Hover States Consistency**
- **Files:** Multiple components
- **Issue:** All buttons use consistent hover states from Button component (good!), but some custom buttons (review nav) have custom styles
- **Location:** `src/index.css` lines 667-702
- **Impact:** Very Low - Already consistent
- **Recommendation:** Document button patterns

### 5. **Section Background Alternation**
- **Files:** All section components
- **Issue:** Background alternation (white/light) is consistent and well-implemented
- **Impact:** None - Already good
- **Recommendation:** Document pattern for future sections

### 6. **Typography Scale Documentation**
- **Files:** `src/index.css`
- **Issue:** Typography scale is well-defined but not documented in component comments
- **Location:** Lines 177-244
- **Impact:** Very Low - Documentation
- **Recommendation:** Add JSDoc comments explaining typography scale usage

### 7. **Container Max-Width Consistency**
- **Files:** Multiple components
- **Issue:** Some sections use `Container` with default max-width, others specify `maxWidth="xl"` or `maxWidth="2xl"`
- **Locations:**
  - `WholesalePage.jsx`: Uses `maxWidth="2xl"` and `maxWidth="xl"` appropriately
- **Impact:** Very Low - Already appropriate
- **Recommendation:** Document when to use different max-widths

### 8. **Loading States for Async Content**
- **File:** `src/components/sections/ReviewsSection.jsx`
- **Component:** ReviewsSection
- **Issue:** Has excellent skeleton loading
- **Impact:** None - Already excellent
- **Recommendation:** Use as pattern for other async content

### 9. **Accessibility Color Contrast Verification**
- **Files:** All components
- **Issue:** Need to verify all text meets WCAG AA contrast ratios (4.5:1 for normal text, 3:1 for large text)
- **Locations:** Throughout
- **Impact:** Low - Should verify with tool
- **Recommendation:** Run automated contrast checker (e.g., axe DevTools, WAVE) and document results

### 10. **Mobile Menu Animation**
- **File:** `src/components/layout/ScrollHeader.jsx`
- **Component:** ScrollHeader - Mobile menu
- **Issue:** Mobile menu appears instantly - could benefit from slide-down animation
- **Location:** Mobile menu section
- **Impact:** Very Low - Enhancement
- **Recommendation:** Add smooth slide-down animation with `prefers-reduced-motion` support

---

## 📊 Summary Statistics

- **Total Issues Remaining:** 16
- **Must-Fix (Critical):** 0 ✅ (All resolved!)
- **Should-Fix (Important):** 6
- **Nice-to-Have (Polish):** 10

### By Category:
- **Accessibility:** 3 issues
- **Responsive Design:** 1 issue
- **Typography/Spacing:** 2 issues
- **Design System Consistency:** 2 issues
- **UX Enhancements:** 4 issues
- **Documentation:** 4 issues

### By File:
- `ReviewsSection.jsx`: 2 issues
- `MenuSection.jsx`: 1 issue
- Others: 13 issues across multiple files

---

## 🎯 Recommended Fix Order

*All critical issues have been resolved! ✅*

**Next Steps:**
1. **Address remaining should-fix items** (optional improvements)
2. **Run contrast checker** for accessibility verification
3. **Test all responsive breakpoints**
4. **Final accessibility audit**

---

## ✅ Pre-Launch Checklist

- [x] All must-fix items resolved ✅
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

