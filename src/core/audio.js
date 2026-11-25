let context;

export function playClick() {
  const AudioContextType = window.AudioContext ?? window.webkitAudioContext;
  if (!AudioContextType) return;
  context ??= new AudioContextType();
  if (context.state === 'suspended') context.resume();

  const oscillator = context.createOscillator();
  const gain = context.createGain();
  const start = context.currentTime;

  oscillator.type = 'sine';
  oscillator.frequency.value = 800;
  gain.gain.setValueAtTime(0.1, start);
  gain.gain.exponentialRampToValueAtTime(0.01, start + 0.1);
  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start(start);
  oscillator.stop(start + 0.1);
}
