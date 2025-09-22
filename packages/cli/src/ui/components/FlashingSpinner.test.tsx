/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { render } from 'ink-testing-library';
import { Text } from 'ink';
import { FlashingSpinner } from './FlashingSpinner.js';
import { StreamingContext } from '../contexts/StreamingContext.js';
import { StreamingState } from '../types.js';
import { vi } from 'vitest';
import { customColors } from '../theme/colors.js';

// Mock the useStreamingContext hook
vi.mock('../contexts/StreamingContext.js', () => ({
  useStreamingContext: vi.fn(),
}));

const useStreamingContextMock = vi.mocked(
  require('../contexts/StreamingContext.js').useStreamingContext,
);

describe('FlashingSpinner', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should render null when not in Responding state', () => {
    useStreamingContextMock.mockReturnValue(StreamingState.Idle);
    
    const { lastFrame } = render(<FlashingSpinner />);
    
    expect(lastFrame()).toBe('');
  });

  it('should render the nonRespondingDisplay when provided and not in Responding state', () => {
    useStreamingContextMock.mockReturnValue(StreamingState.Idle);
    
    const { lastFrame } = render(<FlashingSpinner nonRespondingDisplay="Waiting..." />);
    
    expect(lastFrame()).toBe('Waiting...');
  });

  it('should flash between ● and space when in Responding state', () => {
    useStreamingContextMock.mockReturnValue(StreamingState.Responding);
    
    const { lastFrame } = render(<FlashingSpinner />);
    
    // Initially should show the dot
    expect(lastFrame()).toBe('●');
    
    // After 500ms should be space
    vi.advanceTimersByTime(500);
    expect(lastFrame()).toBe(' ');
    
    // After another 500ms should show the dot again
    vi.advanceTimersByTime(500);
    expect(lastFrame()).toBe('●');
  });

  it('should use custom interval', () => {
    useStreamingContextMock.mockReturnValue(StreamingState.Responding);
    
    const { lastFrame } = render(<FlashingSpinner interval={200} />);
    
    // Initially should show the dot
    expect(lastFrame()).toBe('●');
    
    // After 200ms should be space
    vi.advanceTimersByTime(200);
    expect(lastFrame()).toBe(' ');
    
    // After another 200ms should show the dot again
    vi.advanceTimersByTime(200);
    expect(lastFrame()).toBe('●');
  });
});