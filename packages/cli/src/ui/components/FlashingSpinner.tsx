/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Text } from 'ink';
import { useStreamingContext } from '../contexts/StreamingContext.js';
import { StreamingState } from '../types.js';
import { customColors } from '../theme/colors.js';

interface FlashingSpinnerProps {
  /**
   * Optional string to display when not in Responding state.
   * If not provided and not Responding, renders null.
   */
  nonRespondingDisplay?: string;
  /**
   * Interval between flashes in milliseconds
   * @default 500
   */
  interval?: number;
}

export const FlashingSpinner: React.FC<FlashingSpinnerProps> = ({
  nonRespondingDisplay,
  interval = 500,
}) => {
  const streamingState = useStreamingContext();
  
  // Define the spinner frames - alternating between ● and space character
  // Using a space instead of empty string to maintain consistent spacing
  const frames = ['●', ' '];
  
  const [frameIndex, setFrameIndex] = React.useState(0);

  React.useEffect(() => {
    if (streamingState !== StreamingState.Responding) return;

    const intervalId = setInterval(() => {
      setFrameIndex((prevIndex) => (prevIndex + 1) % frames.length);
    }, interval);

    return () => clearInterval(intervalId);
  }, [streamingState, frames.length, interval]);

  if (streamingState === StreamingState.Responding) {
    return <Text color={customColors.grey}>{frames[frameIndex]}</Text>;
  } else if (nonRespondingDisplay) {
    return <Text>{nonRespondingDisplay}</Text>;
  }
  return null;
};