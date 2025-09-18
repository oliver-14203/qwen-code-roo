/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Text } from 'ink';
import { customColors } from '../theme/colors.js';

interface ScanningTextProps {
  text: string;
  scanWidth?: number; // Number of characters to highlight at once
  speed?: number; // Milliseconds between position updates
  scanColor?: string; // Color for the scanning effect
  baseColor?: string; // Base color for unhighlighted text
}

export const ScanningText: React.FC<ScanningTextProps> = ({
  text,
  scanWidth = 3,
  speed = 100,
  scanColor = customColors.light_blue,
  baseColor = customColors.light_blue,
}) => {
  const [scanPosition, setScanPosition] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setScanPosition((prev) => (prev + 1) % (text.length + scanWidth));
    }, speed);

    return () => clearInterval(interval);
  }, [text.length, scanWidth, speed]);

  // Create character elements with scanning effect
  const characters = text.split('').map((char, index) => {
    const isHighlighted = index >= scanPosition && index < scanPosition + scanWidth;

    // Calculate color for gradient effect at edges
    let color = isHighlighted ? scanColor : baseColor;
    if (isHighlighted) {
      const positionInScan = index - scanPosition;
      const fadeEdges = 0.3;

      if (positionInScan < fadeEdges) {
        // Fade in at leading edge - use base color for smooth transition
        const fadeProgress = positionInScan / fadeEdges;
        color = fadeProgress > 0.5 ? scanColor : baseColor;
      } else if (positionInScan > scanWidth - fadeEdges) {
        // Fade out at trailing edge
        const fadeProgress = (scanWidth - positionInScan) / fadeEdges;
        color = fadeProgress > 0.5 ? scanColor : baseColor;
      }
    }

    return (
      <Text
        key={index}
        color={color}
      >
        {char}
      </Text>
    );
  });

  return <Text>{characters}</Text>;
};