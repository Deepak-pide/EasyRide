/**
 * Utility to play the tap sound effect.
 * Assumes tap.mp3 is available in the public folder.
 */
export const playTapSound = () => {
  const audio = new Audio('/tap.mp3');
  audio.play().catch((err) => {
    // Silently fail if audio can't play (e.g., browser policy)
    console.debug('Audio play failed:', err);
  });
};
