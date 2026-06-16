export const playTapSound = () => {
  const audio = new Audio('/tap.mp3');
  audio.play().catch(e => console.log('Audio play blocked or file missing:', e));
};

export const playUnlockSound = () => {
  const audio = new Audio('/unlock.wav');
  audio.play().catch(e => console.log('Audio play blocked or file missing:', e));
};
