# Simple Text Storage

A minimalist single-page application that captures and persistently stores user text input with elegant simplicity.

**Experience Qualities**:
1. **Immediate** - Text is saved instantly without explicit save actions
2. **Clean** - Uncluttered interface focuses entirely on content creation  
3. **Reliable** - Data persists between sessions without fail

**Complexity Level**: Micro Tool (single-purpose)
- Focused solely on text capture and storage with no additional features to distract from core functionality

## Essential Features

### Text Input & Storage
- **Functionality**: Large text area for user input with automatic persistence
- **Purpose**: Provides a digital notepad for capturing thoughts, notes, or any text content
- **Trigger**: User begins typing in the text area
- **Progression**: User focuses text area → types content → text auto-saves → user returns later → content restored
- **Success criteria**: Text persists across browser sessions and page refreshes

### Visual Feedback
- **Functionality**: Subtle indicators show save status
- **Purpose**: Builds user confidence that their content is secure
- **Trigger**: Text changes or successful save
- **Progression**: User types → saving indicator appears → success state confirms storage
- **Success criteria**: Clear visual confirmation of save states without being intrusive

## Edge Case Handling

- **Empty State**: Placeholder text guides new users toward first interaction
- **Large Text**: Textarea expands gracefully for long content without breaking layout
- **Network Issues**: Graceful handling of save failures with retry mechanism
- **Concurrent Sessions**: Last write wins approach for simplicity

## Design Direction

The design should feel calm and focused, like a premium digital notebook - minimal distractions with subtle elegance that encourages extended writing sessions.

## Color Selection

Analogous warm neutrals creating a comfortable writing environment.

- **Primary Color**: Warm Gray `oklch(0.3 0.02 85)` - communicates reliability and professionalism
- **Secondary Colors**: Light warm gray `oklch(0.95 0.01 85)` for backgrounds, medium gray `oklch(0.6 0.01 85)` for borders
- **Accent Color**: Soft blue `oklch(0.55 0.15 240)` for focus states and save indicators
- **Foreground/Background Pairings**: 
  - Background (Light Warm Gray): Dark gray text `oklch(0.2 0.02 85)` - Ratio 12.8:1 ✓
  - Primary (Warm Gray): White text `oklch(1 0 0)` - Ratio 4.9:1 ✓
  - Accent (Soft Blue): White text `oklch(1 0 0)` - Ratio 4.8:1 ✓

## Font Selection

Inter font family conveys modern clarity and excellent readability for extended writing sessions.

- **Typographic Hierarchy**: 
  - H1 (Page Title): Inter Medium/24px/normal spacing
  - Textarea Content: Inter Regular/16px/1.6 line height for comfortable reading
  - Status Text: Inter Regular/14px/subtle and unobtrusive

## Animations

Subtle and functional - gentle transitions that feel natural without calling attention to themselves.

- **Purposeful Meaning**: Micro-animations reinforce the feeling of a responsive, living interface
- **Hierarchy of Movement**: Focus states and save indicators deserve gentle motion; everything else remains static

## Component Selection

- **Components**: Card for main container, Textarea for input, Badge for status indicators
- **Customizations**: Enlarged textarea with custom styling for writing focus
- **States**: Textarea focus with subtle border highlight, save status with gentle opacity transitions  
- **Icon Selection**: CheckCircle for saved state, Clock for saving state
- **Spacing**: Generous padding (p-8) around main content, consistent gap-4 for related elements
- **Mobile**: Single column layout with full-width textarea, maintains generous spacing on smaller screens