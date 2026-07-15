# Node.js CLI Wrapper - Quick Start

## Installation

```bash
# Extract the archive
tar -xzf beatbox-midi-studio.tar.gz
cd beatbox-midi-studio

# Install dependencies
npm install
```

## Using the Node Wrapper Standalone

### As Command Line Tool
```bash
# Basic usage
node drums-cli-wrapper.js -i beatbox.wav -o drums.mid

# With parameters
node drums-cli-wrapper.js -i beatbox.wav -o drums.mid -s 0.2 -v

# All options
node drums-cli-wrapper.js \
  -i beatbox.wav \
  -o drums.mid \
  --sensitivity 0.2 \
  --threshold 0.05 \
  --bpm 120 \
  --verbose \
  --cli-path ./build/CLI/neuralnote_drums
```

### As JavaScript Module
```javascript
const DrumsCLI = require('./drums-cli-wrapper');

// Initialize wrapper
const cli = new DrumsCLI('./build/CLI/neuralnote_drums');

// Convert single file
async function convertBeatbox() {
  try {
    const result = await cli.convert('beatbox.wav', 'drums.mid', {
      sensitivity: 0.2,
      threshold: 0.05,
      bpm: 120,
      verbose: true
    });

    console.log(`Success! ${result.drumCount} drum hits detected`);
    console.log(`MIDI file: ${result.outputPath}`);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Batch convert multiple files
async function convertMultiple() {
  const files = [
    { input: 'beat1.wav', output: 'beat1.mid', options: { sensitivity: 0.15 } },
    { input: 'beat2.wav', output: 'beat2.mid', options: { sensitivity: 0.2 } },
    { input: 'beat3.wav', output: 'beat3.mid', options: { bpm: 140 } }
  ];

  const results = await cli.convertBatch(files);
  
  results.forEach(result => {
    if (result.success) {
      console.log(`✅ ${result.inputPath}: ${result.drumCount} hits`);
    } else {
      console.log(`❌ ${result.inputPath}: ${result.error}`);
    }
  });
}

convertBeatbox();
```

## API Reference

### Class: DrumsCLI

#### constructor(cliPath)
- `cliPath` (string): Path to neuralnote_drums executable

#### convert(inputPath, outputPath, options)
Returns: `Promise<Object>`

Options:
- `sensitivity` (number, 0.0-1.0): Detection sensitivity (default: 0.15)
- `threshold` (number, 0.0-1.0): Amplitude threshold (default: 0.05)
- `bpm` (number): Tempo (default: 120)
- `verbose` (boolean): Enable verbose logging (default: false)

Result:
```javascript
{
  success: true,
  drumCount: 42,
  outputPath: '/path/to/drums.mid',
  output: 'CLI stdout',
  fileSize: 1234
}
```

#### convertBatch(files)
Returns: `Promise<Array>`

- `files` (Array): Array of `{input, output, options}` objects

#### getInfo()
Returns: `Promise<Object>`

Get CLI availability and help text.

## Integration with Express Server

The wrapper is already integrated into `server.js`:

```javascript
const DrumsCLI = require('./drums-cli-wrapper');
const drumsCLI = new DrumsCLI(process.env.CLI_PATH);

// Use in route handler
app.post('/api/upload', async (req, res) => {
  const result = await drumsCLI.convert(inputPath, outputPath, {
    sensitivity: req.body.sensitivity,
    threshold: req.body.threshold,
    bpm: req.body.bpm
  });
  
  res.json({ drumCount: result.drumCount });
});
```

## Examples

### Stream Processing
```javascript
const fs = require('fs');
const DrumsCLI = require('./drums-cli-wrapper');

const cli = new DrumsCLI();

// Process files as they arrive
fs.watch('./incoming', async (event, filename) => {
  if (filename.endsWith('.wav')) {
    const input = `./incoming/${filename}`;
    const output = `./processed/${filename.replace('.wav', '.mid')}`;
    
    try {
      await cli.convert(input, output, { verbose: true });
      console.log(`Processed: ${filename}`);
    } catch (err) {
      console.error(`Failed: ${filename}`, err);
    }
  }
});
```

### Web API Endpoint
```javascript
const express = require('express');
const DrumsCLI = require('./drums-cli-wrapper');

const app = express();
const cli = new DrumsCLI();

app.post('/convert', async (req, res) => {
  try {
    const result = await cli.convert(
      req.body.inputPath,
      req.body.outputPath,
      { bpm: req.body.bpm || 120 }
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

## Troubleshooting

### CLI not found
```bash
# Check CLI path
ls -la ./build/CLI/neuralnote_drums

# Build CLI if missing
./build_drums.sh

# Verify permissions
chmod +x ./build/CLI/neuralnote_drums
```

### Permission denied
```bash
chmod +x drums-cli-wrapper.js
chmod +x ./build/CLI/neuralnote_drums
```

### Module not found
```bash
# Ensure you're in the right directory
pwd
# Should show: /path/to/beatbox-midi-studio

# Check wrapper exists
ls -la drums-cli-wrapper.js
```
