# UI Integration and Control Expansion

## 1. UI expansion goals

- add more controls without clutter
- group controls by workflow and intent
- keep advanced options collapsed until needed
- surface presets and actions via search-first workflow
- keep the editor canvas clean and minimal

## 2. Specific control additions

### Timeline controls
- trim start / trim end
- snap toggle
- ripple delete
- duplicate clip
- split clip
- lock/unlock layer

### Style controls
- animation duration slider
- transition duration slider
- LUT strength
- blur strength
- grain intensity
- bloom amount

### Audio controls
- EQ band controls
- volume meters
- ducking toggle
- noise gate toggle
- waveform view toggle

### AI / Smart controls
- smart reframe toggle
- subtitle generation
- background cleanup
- auto beat sync

## 3. UI integration plan

- add preset browser as a panel drawer
- add search input at top of command palette
- add quick action toolbar at the bottom of timeline
- add grouping for animation, transition, LUT, template, effect
- surface local preset library under a saved tab

## 4. Why this matters

Users need the power of a full editing suite without drowning in visible controls. The correct path is progressive disclosure: search first, advanced controls second.
