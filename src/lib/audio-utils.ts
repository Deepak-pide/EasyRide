/**
 * @fileOverview Utility for playing pre-loaded UI sounds to ensure zero-latency feedback.
 */

// Singleton pattern to pre-load audio and avoid lag during first play
let tapAudio: HTMLAudioElement | null = null;
let unlockAudio: HTMLAudioElement | null = null;

const getTapAudio = () => {
  if (typeof window === 'undefined') return null;
  if (!tapAudio) {
    tapAudio = new Audio('/tap.mp3');
    tapAudio.load();
  }
  return tapAudio;
};

const getUnlockAudio = () => {
  if (typeof window === 'undefined') return null;
  if (!unlockAudio) {
    unlockAudio = new Audio('/unlock.wav');
    unlockAudio.load();
  }
  return unlockAudio;
};

export const playTapSound = () => {
  const audio = getTapAudio();
  if (audio) {
    audio.currentTime = 0;
    audio.play().catch(() => {
      // Silently fail if blocked by browser policy
    });
  }
};

export const playUnlockSound = () => {
  const audio = getUnlockAudio();
  if (audio) {
    audio.currentTime = 0;
    audio.play().catch(() => {
      // Silently fail if blocked by browser policy
    });
  }
};
