# Cursor Prompt: Rebuild Beatbox MIDI Studio with shadcn/ui

## Context
I have a working React app for beatboxing-to-MIDI conversion (see attached files). I want to rebuild the frontend using shadcn/ui components for a more polished, professional look.

**Current Stack:**
- React + Vite
- Custom CSS styling
- Web Audio API (10s recording)
- Node/Express backend (already working)
- NeuralNote Drums CLI wrapper

**Target Stack:**
- React + Vite + TypeScript (optional)
- shadcn/ui components
- Tailwind CSS
- Same backend (no changes needed)

## Requirements

### 1. Setup shadcn/ui
```bash
# Initialize shadcn/ui in existing project
npx shadcn-ui@latest init

# Add components we'll need
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add slider
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add alert
npx shadcn-ui@latest add progress
npx shadcn-ui@latest add separator
npx shadcn-ui@latest add toast
```

### 2. Rebuild Components with shadcn/ui

#### Recorder Section
**Current:** Custom button + CSS animations
**New:** Use shadcn `Button`, `Card`, `Badge` components

Features to preserve:
- Microphone access button
- Recording timer (0-10 seconds)
- Pulsing red indicator while recording
- Audio preview with HTML5 `<audio>` element
- Stop/Discard buttons

shadcn components to use:
- `Button` with variants (default, destructive, outline)
- `Card` for containing the recorder
- `Badge` for recording timer display
- `Progress` for visual timer (0-10s)

#### Parameters Section
**Current:** Custom range inputs with labels
**New:** Use shadcn `Slider`, `Label` components

Parameters to keep:
- Sensitivity slider (0.05-0.5)
- Threshold slider (0.01-0.2)
- BPM slider (60-180)

shadcn components:
- `Slider` for range inputs
- `Label` for parameter labels
- `Card` to group parameters

#### Processing Status
**Current:** Text messages
**New:** Use shadcn `Alert`, `Progress` components

States to show:
- Processing... (with spinner)
- Success! X drum hits detected
- Error messages

shadcn components:
- `Alert` for status messages
- `Progress` for loading indicator
- `Badge` for drum count

#### Strudel Player Section
**Current:** Custom gradient card + textarea
**New:** Use shadcn `Card`, `Textarea`, `Button`

Features:
- Code editor for Strudel pattern
- Play button
- Links to Strudel docs
- Drum count display

shadcn components:
- `Card` with gradient background (custom)
- `Button` for play
- `Badge` for drum count
- `Separator` between sections

#### Recordings List
**Current:** Grid of custom cards
**New:** Use shadcn `Card`, `Button` components

Features:
- Grid layout (responsive)
- Timestamp display
- Drum count badge
- Download MIDI link
- Delete button

shadcn components:
- `Card` for each recording
- `Button` (ghost variant) for delete
- `Badge` for metadata
- Empty state with icon

### 3. Color Scheme & Theming

**Keep the current vibe:**
- Purple/pink gradient background
- Dark mode friendly
- High contrast for accessibility

**shadcn theme customization:**
```css
/* app/globals.css or index.css */
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --primary: 262 83% 58%; /* Purple */
    --primary-foreground: 210 40% 98%;
    --secondary: 340 82% 67%; /* Pink */
    /* ... other theme variables */
  }
}
```

### 4. Layout Structure

```tsx
<div className="min-h-screen bg-gradient-to-br from-purple-600 to-pink-600 p-8">
  <div className="max-w-6xl mx-auto space-y-8">
    
    {/* Header */}
    <header className="text-center text-white">
      <h1 className="text-5xl font-bold">🥁 Beatbox MIDI Studio</h1>
      <p className="text-lg opacity-90">Voice percussion to MIDI</p>
    </header>

    {/* Recorder Card */}
    <Card className="p-6">
      <CardHeader>
        <CardTitle>Record Beatbox</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Recorder UI */}
      </CardContent>
    </Card>

    {/* Parameters Card */}
    <Card className="p-6">
      <CardHeader>
        <CardTitle>Detection Parameters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Sliders */}
      </CardContent>
    </Card>

    {/* Strudel Player (if MIDI generated) */}
    {midiData && (
      <Card className="p-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
        {/* Player UI */}
      </Card>
    )}

    {/* Recordings List */}
    <Card className="p-6">
      <CardHeader>
        <CardTitle>Your Recordings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Recording cards */}
        </div>
      </CardContent>
    </Card>

  </div>
</div>
```

### 5. Component Examples

#### Recording Button
```tsx
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

{!isRecording ? (
  <Button size="lg" onClick={startRecording}>
    🎤 Start Recording
  </Button>
) : (
  <div className="flex items-center gap-4">
    <Badge variant="destructive" className="animate-pulse">
      Recording: {recordingTime}s / 10s
    </Badge>
    <Button variant="destructive" onClick={stopRecording}>
      ⏹ Stop
    </Button>
  </div>
)}
```

#### Parameter Slider
```tsx
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

<div className="space-y-2">
  <Label>
    Sensitivity: {sensitivity.toFixed(2)}
  </Label>
  <Slider
    value={[sensitivity]}
    min={0.05}
    max={0.5}
    step={0.01}
    onValueChange={(val) => setSensitivity(val[0])}
  />
</div>
```

#### Recording Card
```tsx
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

<Card>
  <CardContent className="p-4">
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <p className="text-sm font-medium">
          {new Date(recording.created_at).toLocaleString()}
        </p>
        <Badge variant="secondary">
          {recording.drum_count} hits
        </Badge>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" asChild>
          <a href={`/api/midi/${recording.id}`} download>
            ⬇️ MIDI
          </a>
        </Button>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => deleteRecording(recording.id)}
        >
          🗑
        </Button>
      </div>
    </div>
  </CardContent>
</Card>
```

## Implementation Steps

1. **Initialize shadcn/ui** in the existing project
2. **Update package.json** with shadcn dependencies
3. **Create new App.jsx** using shadcn components
4. **Keep existing logic** (hooks, state, API calls)
5. **Replace custom CSS** with Tailwind utilities
6. **Test all features** work identically
7. **Improve responsive design** with Tailwind breakpoints

## What NOT to Change

- ❌ Backend API (`server.js`) - keep as-is
- ❌ Node wrapper (`drums-cli-wrapper.js`) - keep as-is
- ❌ Core functionality - recording, processing, playback
- ❌ Web Audio API implementation
- ❌ Strudel integration logic

## What TO Change

- ✅ Replace custom components with shadcn/ui
- ✅ Replace custom CSS with Tailwind
- ✅ Improve visual design and polish
- ✅ Add loading states, animations
- ✅ Better error handling UI
- ✅ Responsive layout improvements

## Expected Output

Please provide:
1. Updated `package.json` with shadcn dependencies
2. New `App.jsx` with shadcn components
3. Updated `globals.css` or `index.css` with theme
4. Any new component files if needed
5. Brief migration notes

## Constraints

- Keep bundle size reasonable (shadcn is tree-shakeable)
- Maintain 10-second recording limit
- Preserve all existing functionality
- Keep dev/prod environment handling
- Must work on mobile (responsive)

---

**Start by initializing shadcn/ui, then rebuild the Recorder section first as a proof of concept.**
