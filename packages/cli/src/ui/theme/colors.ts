// Color palette for Roo CLI UI
// This file provides a centralized location for UI color customization
// The application uses a theme system, but this file can be used to define
// custom color variables that can be used throughout the UI components.

// For theme-based customization, modify the themes in ./themes/ directory
// For component-specific color customization, use the variables below

export const customColors = {
  // New Blue color as requested
  blue: '#b0b9f9', // Blue color matching the Qwen AccentBlue
  // Light Blue color for model name and loading indicators
  light_blue: '#D8DCFC', // Light blue color for model name and loading indicators
  // Blue grey color - a greyed version of blue
  blue_grey: '#636683', // Greyed out version of blue
  // Grey color for unselected elements
  grey: '#808080', // Standard grey
  // White color for unselected text
  white: '#FFFFFF', // White color
};

// Example usage:
// import { customColors } from './colors';
//
// const StyledComponent = styled.div`
//   color: ${customColors.blue};
// `;