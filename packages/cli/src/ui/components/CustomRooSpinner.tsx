/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Text } from 'ink';
import { useStreamingContext } from '../contexts/StreamingContext.js';
import { StreamingState } from '../types.js';

interface CustomRooSpinnerProps {
  /**
   * Optional string to display when not in Responding state.
   * If not provided and not Responding, renders null.
   */
  nonRespondingDisplay?: string;
  /**
   * Whether to enable reverse mirror animation (ping-pong effect)
   */
  reverseMirror?: boolean;
}

export const CustomRooSpinner: React.FC<CustomRooSpinnerProps> = ({
  nonRespondingDisplay,
  reverseMirror = false,
}) => {
  const streamingState = useStreamingContext();
  
  // Define the spinner frames as requested
  const frames = ['·', '✢', '✳', '✶', '✻', '✽'];
  
  const [frameIndex, setFrameIndex] = React.useState(0);
  const [direction, setDirection] = React.useState(1); // 1 for forward, -1 for backward

 React.useEffect(() => {
    if (streamingState !== StreamingState.Responding) return;

    const interval = setInterval(() => {
      setFrameIndex((prevIndex) => {
        if (reverseMirror) {
          // Handle ping-pong animation
          if (direction === 1) {
            // Moving forward
            if (prevIndex >= frames.length - 1) {
              // Reached the end, change direction
              setDirection(-1);
              return prevIndex - 1;
            } else {
              return prevIndex + 1;
            }
          } else {
            // Moving backward
            if (prevIndex <= 0) {
              // Reached the start, change direction
              setDirection(1);
              return prevIndex + 1;
            } else {
              return prevIndex - 1;
            }
          }
        } else {
          // Normal circular animation
          return (prevIndex + 1) % frames.length;
        }
      });
    }, 150); // 150ms between frames for a smooth animation

    return () => clearInterval(interval);
  }, [streamingState, frames.length, reverseMirror, direction]);

 if (streamingState === StreamingState.Responding) {
    return <Text color="#4CAF50">{frames[frameIndex]}</Text>; // Green color similar to other UI elements
  } else if (nonRespondingDisplay) {
    return <Text>{nonRespondingDisplay}</Text>;
  }
  return null;
};