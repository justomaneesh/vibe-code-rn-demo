# Evangel OTT — PLAN.md

## 1. App Overview

| App Name    | Platform                                        | Purpose                                              | Audience                  | Auth Method               | Data Source        | MVP Scope                                |
| ----------- | ----------------------------------------------- | ---------------------------------------------------- | ------------------------- | ------------------------- | ------------------ | ---------------------------------------- |
| Evangel OTT | Mobile (Android per document; React Native CLI) | Christian OTT platform for faith-based video content | Global Christian audience | Email + OTP (no password) | Mock data in MVP 1 | Mobile app rebuild; web implied post-MVP |

// ASSUMED: MVP 1 is mobile-only; web is ⚠️ POST-MVP. Document mentions "mobile applications and a web interface" but rebuild focus is app + website—MVP 1 scope limited to mobile per typical phased delivery.

---

## 2. Design Decisions

Design intent derived from the business document and the ZETTA reference screenshot (dark OTT vibe, blue accent, horizontal rows, bottom nav). All concrete values (hex, font sizes, spacing) live in `src/constants/` per .cursorrules.

- Dark theme throughout all screens (black or very dark grey background).
- Blue accent for primary actions, active states, CTAs, active tab, and play button overlay.
- Primary text: white or light grey; secondary/metadata: lighter grey.
- Rounded card tiles in portrait/poster orientation for content; rounded corners on buttons and chips.
- Horizontal scroll rows for category browsing (Featured, Recently Added, Movies, Sermons, Songs).
- Category tabs at top (e.g. Movies, Sermons, Songs) with active tab in accent color.
- Bottom tab bar for main navigation (see Section 4); icons white/default, active in blue.
- Featured banner at top with thumbnail, title, short description, Watch Now button; auto-scroll and swipe.
- Content type badges and metadata (duration, language, rating where applicable) on tiles.
- Filter and sort surfaced as modal routes (no inline bottom sheet state).
- Faith-oriented tone in copy and notifications; no specific font or size in PLAN.md.

---

## 3. Screen List

| #   | Screen Name         | Purpose                                                              | Key Actions                                                                     | Navigates To                                                      | Route Params                               |
| --- | ------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ----------------------------------------------------------------- | ------------------------------------------ |
| 1   | WelcomeScreen       | App launch; show Log In / Sign Up                                    | Tap Log In, Tap Sign Up                                                         | LoginScreen, SignUpScreen                                         | —                                          |
| 2   | LoginScreen         | Returning user auth                                                  | Enter email, Send OTP → OTP field appears, Verify & Log In, Resend OTP          | HomeScreen (success)                                              | —                                          |
| 3   | SignUpScreen        | New user registration                                                | Enter name + email, Send OTP → OTP field appears, Verify & Continue, Resend OTP | HomeScreen (success)                                              | —                                          |
| 4   | HomeScreen          | Primary entry; featured, recently added, category rows               | Tap category tab, tap tile, Watch Now on banner, View All                       | ContentDetailScreen, MoviesScreen, SermonsScreen, SongsScreen     | —                                          |
| 5   | MoviesScreen        | Category view for Movies                                             | Scroll rows, tap tile, Filter, Sort, View All sub-rows                          | ContentDetailScreen, FilterScreen, SortScreen                     | sortBy?, filterParams? (from modal return) |
| 6   | SermonsScreen       | Category view for Sermons                                            | Same as Movies                                                                  | ContentDetailScreen, FilterScreen, SortScreen                     | sortBy?, filterParams?                     |
| 7   | SongsScreen         | Category view for Songs                                              | Same as Movies                                                                  | ContentDetailScreen, FilterScreen, SortScreen                     | sortBy?, filterParams?                     |
| 8   | ContentDetailScreen | Detail for any content type                                          | Watch Now, Add to Favourites, tap related                                       | VideoPlayerScreen, (Favourites state)                             | contentId, type (movie \| sermon \| song) |
| 9   | SearchScreen        | Search by title, topic, filters                                      | Type query, filter chips, Filter, Sort, tap result                              | ContentDetailScreen, FilterScreen, SortScreen                     | —                                          |
| 10  | FilterScreen        | Apply filters (type, sub-category, language, Popular/Recently Added) | Apply, clear                                                                    | Caller (e.g. SearchScreen, MoviesScreen) via navigate with params | opener (screen name), currentFilters?      |
| 11  | SortScreen          | Choose sort (Newest, Oldest, A–Z)                                    | Select option                                                                   | Caller via navigate with params                                   | opener, currentSort?                       |
| 12  | QualityPickerScreen | Video quality (Auto, 480p, 720p, 1080p)                              | Select quality                                                                  | VideoPlayerScreen or back                                         | contentId?, type? (to return to player)    |
| 13  | VideoPlayerScreen   | Full-screen playback                                                 | Play/Pause, seek, Back, Settings (quality/speed)                                | ContentDetailScreen, QualityPickerScreen                          | contentId, type, resumePosition?           |
| 14  | FavouritesScreen    | Saved content list                                                   | Tap tile, remove/options                                                        | ContentDetailScreen                                               | —                                          |
| 15  | ProfileScreen       | Profile details, watch history, favourites access, logout            | Edit profile, view Watch History, access Favourites, Logout                     | WelcomeScreen (logout), Edit Profile flow if added                | —                                          |
| 16  | NotificationScreen  | List of notifications                                                | Tap notification                                                                | ContentDetailScreen                                               | —                                          |

// ASSUMED: FavouritesScreen as a bottom tab (document places Favourites under Profile; tab improves access and matches reference layout).  
// ASSUMED: WelcomeScreen shows two buttons only; branded welcome animation is non-blocking and can be implemented on same screen or as a short splash.  
// DECISION: Following document specification — OTP field appears on same screen (LoginScreen/SignUpScreen) after "Send OTP" button is clicked, rather than navigating to a separate screen. This uses conditional rendering for form field visibility (allowed per .cursorrules for local UI state, not modals/overlays).

---

## 4. Navigation Structure

```
Auth Stack (logged out)
  WelcomeScreen
  LoginScreen  [OTP field appears on same screen after Send OTP]
  SignUpScreen  [OTP field appears on same screen after Send OTP]

Main (logged in)
  Bottom Tabs (4 tabs)
    Tab: Home    → Stack: HomeScreen, MoviesScreen, SermonsScreen, SongsScreen, ContentDetailScreen
    Tab: Search  → Stack: SearchScreen, ContentDetailScreen
    Tab: Favourites → FavouritesScreen, ContentDetailScreen
    Tab: Profile → ProfileScreen, NotificationScreen?, ContentDetailScreen?

Modal Stack Group (presentation: 'modal')
  FilterScreen      [params: opener, currentFilters?]
  SortScreen        [params: opener, currentSort?]
  QualityPickerScreen [params: from VideoPlayer]
  VideoPlayerScreen [params: contentId, type, resumePosition?]
```

- Auth Stack: Welcome → Login or SignUp. On LoginScreen/SignUpScreen: user enters email (and name for signup) → taps "Send OTP" → OTP field appears on same screen → user enters OTP → taps "Verify & Log In" / "Verify & Continue" → on success → switch to Main.
- Main: Bottom tab navigator with 4 tabs (Home, Search, Favourites, Profile). Each tab can have its own stack for ContentDetail and category screens.
- Filter and Sort open as modal routes; they navigate back with params to the opener (Search or category screen).
- Video Player and Quality Picker are modal routes. Profile entry for "Watch History" and "Favourites section" may link to FavouritesScreen or in-tab stacks.

// ASSUMED: NotificationScreen is reachable from Profile or header (e.g. stack screen under Profile tab or modal). Document: "Notification bell icon in the navigation bar" → NotificationScreen as a route from main header/tab area.

---

## 5. Component List

| Component Name    | Responsibility                                                                                    | Used In Screens                                                                                        |
| ----------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| FeaturedBanner    | Featured/spotlight section: thumbnail, title, short description, Watch Now; auto-scroll and swipe | HomeScreen                                                                                             |
| ContentTile       | Poster tile with thumbnail, optional badge/duration; single tap to detail                         | HomeScreen, MoviesScreen, SermonsScreen, SongsScreen, SearchScreen, FavouritesScreen, "More Like This" |
| CategoryRow       | Horizontal row with section title and "View All"; renders ContentTiles                            | HomeScreen, ContentDetailScreen (More Like This)                                                       |
| ContentTypeChip   | Badge for Movie / Sermon / Song                                                                   | ContentTile, ContentDetailScreen, SearchScreen                                                         |
| SearchBar         | Search input and placeholder                                                                      | SearchScreen                                                                                           |
| FilterChip        | Removable filter/sort chip below search or category                                               | SearchScreen, MoviesScreen, SermonsScreen, SongsScreen                                                 |
| PrimaryButton     | Full-width primary CTA (e.g. Send OTP, Verify & Continue, Verify & Log In, Watch Now)             | LoginScreen, SignUpScreen, ContentDetailScreen, FeaturedBanner                                         |
| FormField         | Label + text input (email, OTP, name)                                                             | LoginScreen, SignUpScreen, ProfileScreen                                                               |
| ContentDetailHero | Large poster/banner, title, description, badges, action buttons (Watch Now, Add to Favourites)    | ContentDetailScreen                                                                                    |
| ContentDetailMeta | Duration, language, sub-category, SEO tags                                                        | ContentDetailScreen                                                                                    |
| NotificationItem  | Title, short description, timestamp; tappable                                                     | NotificationScreen                                                                                     |
| ProfileSection    | Section block (Profile details, Watch History, Favourites)                                        | ProfileScreen                                                                                          |
| BottomTabBar      | Custom bottom tab bar if needed; else use React Navigation bottom tabs                            | AppNavigator                                                                                           |

// SINGLE USE: ContentDetailHero and ContentDetailMeta only on ContentDetailScreen—confirm if extraction still needed or keep as screen-local layout.

---

## 6. Content Architecture

- **Content types:** Movies, Sermons, Songs. Each item has one primary type and one or more sub-categories.
- **Movies:** Sub-categories: Feature Films, Short Films, Documentaries, Biographical Films, Faith-Based Dramas. Display: poster tiles, duration; horizontal rows.
- **Sermons:** Sub-categories: Sunday Services, Revival Messages, Thematic Sermons, Conference Sessions. Display: speaker name, theme tags (e.g. Faith, Prayer, Healing).
- **Songs:** Sub-categories: Worship, Gospel, Devotional, Choir & Live Worship. Display: cover art, duration, quick play.
- **Fields per item (plain English):** title, short description, content type, sub-category, SEO/theme tags (e.g. Faith, Healing, Youth, Prayer, Revival), duration, language, thumbnail (tile/grid), banner (featured), speaker name (sermons), optional rating. Asset types: thumbnail, banner, video/audio.
- **Grouping:** Home = Featured (banner) + Recently Added (all types, by date) + one row per category (Movies, Sermons, Songs). Category screens = featured banner + horizontal rows by sub-category. Content Detail = "More Like This" row by category/tags. Search = results grouped by content type.
- TypeScript interfaces live in `src/types/index.ts`; PLAN.md describes shape only.

---

## 7. Auth Flow

- **Entry:** App launch → WelcomeScreen (optional short branded animation, then) Log In / Sign Up.
- **Login:** WelcomeScreen → LoginScreen. User enters email → taps "Send OTP" → OTP input field appears on same screen → user enters OTP → taps "Verify & Log In". Success → HomeScreen. Resend OTP button available.
- **Sign-up:** WelcomeScreen → SignUpScreen. User enters full name + email → taps "Send OTP" → OTP input field appears on same screen → user enters OTP → taps "Verify & Continue". Success → HomeScreen. Resend OTP button available.
- **Errors:** Invalid input, wrong OTP, network: clear toast messages; no restart required.
- **Session:** User stays logged in across sessions until explicit logout. Logout from Profile → WelcomeScreen.
- **Account recovery:** Document mentions OTP-based recovery; no extra screens specified for MVP 1. // ASSUMED: same OTP flow reused; no separate recovery screen in MVP 1.
- // MOCK: In MVP 1, any 6-digit OTP is accepted for verification (no real email sending).

```
WelcomeScreen
  ├─ Log In  → LoginScreen → [Enter email] → [Send OTP] → [OTP field appears] → [Enter OTP] → [Verify & Log In] → Home
  └─ Sign Up → SignUpScreen → [Enter name + email] → [Send OTP] → [OTP field appears] → [Enter OTP] → [Verify & Continue] → Home
```

---

## 8. Mock Data Guidelines

- **Minimum items:** Enough Movies, Sermons, Songs to fill Featured, Recently Added, and at least one row per sub-category per type (per .cursorrules mock data minimums). E.g. 2–3 featured, 5+ recently added, 3+ per category row.
- **Image placeholder:** Use a single placeholder service (e.g. placeholder URL or local asset) for thumbnail and banner; no invented image URLs.
- **Tone:** Titles and descriptions suitable for Christian audience; faith-based, family-friendly.
- **Notifications:** Faith-oriented copy examples from document: e.g. "A new message of hope is available", "Today's worship song is ready".
- **Shape:** All mock data must match the ContentItem (and any content-type-specific) shape described in Section 6. Files: e.g. mockMovies.ts, mockSermons.ts, mockSongs.ts in `src/data/`.

---

## 9. Build Order

As per .cursorrules, applied to this project:

1. **src/types/index.ts** — Interfaces from Section 6 (ContentItem, content types, filters, nav params).
2. **src/constants/** — colors.ts, typography.ts, spacing.ts, theme.ts from Section 2 design intent (no values in PLAN.md).
3. **src/data/** — Mock files following Section 8 (mockMovies, mockSermons, mockSongs, mockNotifications if needed).
4. **src/components/** — All components from Section 5, in dependency order (e.g. ContentTile before CategoryRow).
5. **src/navigation/AppNavigator.tsx** — Auth stack, main bottom tabs (4), modal stack group from Section 4.
6. **src/screens/** — Screens from Section 3 in listed order (WelcomeScreen, LoginScreen, SignUpScreen, HomeScreen through NotificationScreen).

---

## 10. Approved Packages

- **Navigation:** @react-navigation/native, @react-navigation/native-stack, @react-navigation/bottom-tabs (React Navigation v6 per .cursorrules).
- **Core:** react, react-native (React Native CLI; no Expo).
- No external UI libraries. No packages outside this list without asking (per .cursorrules global DO NOTs).

---

## 11. Known MVP 1 Limitations

| Feature                  | Status                                  | Planned Phase        |
| ------------------------ | --------------------------------------- | -------------------- |
| Real OTP / email sending | Mock only (any 6 digits)                | Backend integration  |
| Real API / backend       | Mock data only                          | Backend phase        |
| Downloads                | Optional; not in MVP if not implemented | Post-MVP or later    |
| Web platform             | Document mentions web                   | POST-MVP             |
| Hover preview on tile    | Document "optional UI"                  | POST-MVP or web      |
| Account recovery flow    | Mentioned; no screen specified          | POST-MVP or MVP 2    |
| Adaptive bitrate (ABR)   | Document mentions ABR                   | Backend/player phase |

---

## .cursorrules Compliance Checklist

- [x] No hex color values in PLAN.md (belong in colors.ts)
- [x] No font size numbers in PLAN.md (belong in typography.ts)
- [x] No spacing pixel values in PLAN.md (belong in spacing.ts)
- [x] No TypeScript interfaces in PLAN.md (belong in types/index.ts)
- [x] No component prop definitions in PLAN.md (belong in component files)
- [x] All screen names PascalCase + Screen suffix
- [x] All component names PascalCase
- [x] Filter/Sort/Quality/Player as modal routes (not useState)
- [x] Navigation structure follows navigation-first rule (modals as routes; OTP field uses conditional rendering per document spec)
- [x] Build order matches .cursorrules
- [x] No features added beyond document (assumptions marked)
- [x] Assumptions marked with // ASSUMED:
- [x] Post-MVP items marked with ⚠️ POST-MVP
- [x] Document decision override (OTP same-screen) marked with // DECISION:

---

### Review Summary

**(.cursorrules compliance)**  
Plan follows document specification for OTP flow: OTP field appears on same screen (LoginScreen/SignUpScreen) after "Send OTP" using conditional rendering for form field visibility. This is acceptable per .cursorrules as it's local UI state (form field), not a modal/overlay that would require a route.

**Assumptions made**  

- MVP 1 mobile-only; web POST-MVP.  
- Favourites as fourth bottom tab (document has Favourites under Profile).  
- WelcomeScreen handles both welcome and Log In/Sign Up; animation non-blocking.  
- NotificationScreen reachable from Profile/header as a route.  
- Category screens receive sort/filter via route.params from modal return.  
- No separate account-recovery screen in MVP 1; OTP flow reused if needed.  
- QualityPickerScreen and VideoPlayerScreen receive contentId/type/resumePosition where needed.

**Post-MVP flagged**  

- Web platform.  
- Hover preview on thumbnail.  
- Real OTP/email and backend/API.  
- Downloads (optional).  
- Account recovery dedicated flow.

**Gaps for developer**  

- Exact placement of notification bell (which tab/stack).  
- Whether "Continue Watching" is a dedicated row on Home only or also a separate screen (document implies row on Home).  
- Edit Profile: document lists view/edit profile fields but no explicit Edit Profile screen—implement as same screen or separate route.  
- Resolve single-use components (ContentDetailHero, ContentDetailMeta) vs inline layout before coding.
