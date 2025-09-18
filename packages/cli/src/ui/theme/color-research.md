# Roo CLI UI Color Research

This document provides a comprehensive overview of all color variables currently used in the Roo CLI UI components, their values, and how they're applied throughout the application.

## Color System Overview

The Roo CLI uses a theme-based color system with two main approaches:
1. **Direct Color Access**: Using the `Colors` object which proxies to the active theme
2. **Semantic Colors**: Using the `theme` object which provides semantic color mappings

### Theme-Based Colors (from `colors.ts`)

The `Colors` object proxies to the active theme, which can be one of several predefined themes:
- `lightTheme`
- `darkTheme` 
- `ansiTheme`
- `qwenDarkColors` (default)
- Custom themes

### Semantic Colors (from `semantic-colors.ts`)

The `theme` object provides semantic color mappings that are more descriptive of their purpose:
- `theme.text` - Text colors
- `theme.background` - Background colors
- `theme.border` - Border colors
- `theme.ui` - UI element colors
- `theme.status` - Status indicator colors

## Current Color Values

### Qwen Dark Theme (Default)
This is the default theme used by the application.

| Color Variable | Value | Usage |
|----------------|-------|-------|
| Background | `#0b0e14` | Main background color |
| Foreground | `#bfbdb6` | Primary text color |
| LightBlue | `#59C2FF` | Light blue accents |
| AccentBlue | `#39BAE6` | Blue accents, links |
| AccentPurple | `#D2A6FF` | Purple accents |
| AccentCyan | `#95E6CB` | Cyan accents |
| AccentGreen | `#AAD94C` | Green accents, success states |
| AccentYellow | `#FFD700` | Yellow accents, warnings |
| AccentRed | `#F26D78` | Red accents, errors |
| DiffAdded | `#AAD94C` | Added diff lines |
| DiffRemoved | `#F26D78` | Removed diff lines |
| Comment | `#646A71` | Comments, secondary text |
| Gray | `#3D4149` | Gray tones for borders, secondary elements |
| GradientColors | `['#FFD700', '#da7959']` | Gradient colors for special UI elements |

### Semantic Color Mappings

| Semantic Variable | Mapped To | Usage |
|-------------------|-----------|-------|
| theme.text.primary | Colors.Foreground | Primary text |
| theme.text.secondary | Colors.Gray | Secondary text |
| theme.text.link | Colors.AccentBlue | Links |
| theme.text.accent | Colors.AccentPurple | Accent text |
| theme.background.primary | Colors.Background | Main background |
| theme.background.diff.added | Colors.DiffAdded | Added diff background |
| theme.background.diff.removed | Colors.DiffRemoved | Removed diff background |
| theme.border.default | Colors.Gray | Default borders |
| theme.border.focused | Colors.AccentBlue | Focused element borders |
| theme.ui.comment | Colors.Comment | Comments |
| theme.ui.symbol | Colors.Gray | Symbols and icons |
| theme.ui.gradient | Colors.GradientColors | Gradient effects |
| theme.status.error | Colors.AccentRed | Error states |
| theme.status.success | Colors.AccentGreen | Success states |
| theme.status.warning | Colors.AccentYellow | Warning states |

## Component-Specific Color Usage

### Footer Component (`Footer.tsx`)
- `theme.text.secondary` - Secondary text color for branch names
- `theme.text.link` - Path display color
- `theme.status.error` - Debug mode text
- `theme.status.warning` - Untrusted folder indicator
- `theme.text.accent` - Model name color
- `theme.ui.symbol` - Separator symbols
- `theme.text.primary` - Corgi mode text

### Custom Roo Spinner (`CustomRooSpinner.tsx`)
- `#4CAF50` - Green color for spinner frames (hardcoded, not from theme)

### Gemini Message (`GeminiMessage.tsx`)
- `Colors.AccentPurple` - Message prefix symbol

### Tool Message (`ToolMessage.tsx`)
- `Colors.AccentGreen` - Pending tool status
- `Colors.AccentGreen` - Successful tool status
- `Colors.AccentYellow` - Confirming tool status
- `Colors.AccentYellow` - Canceled tool status
- `Colors.AccentRed` - Error tool status
- `Colors.Foreground` - Tool name (high/medium emphasis)
- `Colors.Gray` - Tool name (low emphasis)
- `Colors.Gray` - Tool description

### Agent Execution Display (`AgentExecutionDisplay.tsx`)
- `theme.status.warning` - Executing/awaiting approval status
- `theme.status.success` - Success status
- `theme.status.error` - Failed status
- `Colors.Gray` - Default status
- Agent-specific colors from `COLOR_OPTIONS` array
- `theme.text.primary` - Section headers
- `Colors.Gray` - Truncation notices

### Loading Indicator (`LoadingIndicator.tsx`)
- `Colors.AccentPurple` - Loading phrase text
- `Colors.Gray` - Timer and cancel instruction text

### Compression Message (`CompressionMessage.tsx`)
- `Colors.AccentPurple` - Pending compression spinner
- `Colors.AccentPurple` - Pending text color
- `Colors.AccentGreen` - Completed text color

## Color Usage Patterns

1. **Status Indicators**:
   - Success: `AccentGreen` or `theme.status.success`
   - Warning: `AccentYellow` or `theme.status.warning`
   - Error: `AccentRed` or `theme.status.error`

2. **Text Hierarchy**:
   - Primary: `Foreground` or `theme.text.primary`
   - Secondary: `Gray` or `theme.text.secondary`
   - Accents: `AccentPurple` or `theme.text.accent`

3. **UI Elements**:
   - Links: `AccentBlue` or `theme.text.link`
   - Comments: `Comment` or `theme.ui.comment`
   - Symbols: `Gray` or `theme.ui.symbol`

## Recommendations for Customization

To customize the UI colors, you can:
1. Create a custom theme by extending the existing theme system
2. Modify the existing theme color values
3. Update individual component color usages

The theme system allows for easy customization while maintaining consistency across the application.