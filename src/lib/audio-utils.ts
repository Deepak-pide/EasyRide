
/**
 * @fileOverview Utility for playing UI sounds. 
 * Optimized to ensure sound playback does not block the UI thread or navigation.
 */

const playSound = (path: string) => {
  if (typeof window === 'undefined') return;

  // Use a fresh audio instance for each play to allow overlapping sounds
  // and ensure navigation isn't blocked by a singleton's state.
  const audio = new Audio(path);
  audio.currentTime = 0;
  
  // We don't await the play() promise to ensure it's completely non-blocking.
  // This allows the page transition to start immediately.
  audio.play().catch(() => {
    // Silently fail if blocked by browser policy (common for first-time interactions)
  });
};

export const playTapSound = () => {
  playSound('/tap.mp3');
};

export const playUnlockSound = () => {
  playSound('/unlock.wav');
};
