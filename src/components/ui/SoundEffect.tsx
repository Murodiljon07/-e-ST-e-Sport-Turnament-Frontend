export function SoundWaveLine() {
  return (
    <div className="relative w-32 h-8 overflow-hidden">
      <svg
        viewBox="0 0 128 32"
        className="w-full h-full"
        preserveAspectRatio="none"
      >
        <path
          d="M0 16 Q 8 0, 16 16 T 32 16 T 48 16 T 64 16 T 80 16 T 96 16 T 112 16 T 128 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-ink-1000"
        />
        <animateTransform
          attributeName="transform"
          type="translate"
          from="0 0"
          to="-32 0"
          dur="1.2s"
          repeatCount="indefinite"
        />
      </svg>
    </div>
  );
}
