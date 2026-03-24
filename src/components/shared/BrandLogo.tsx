type BrandLogoProps = {
  size?: number;
  className?: string;
  priority?: boolean;
};

export default function BrandLogo({ size = 32, className = "" }: BrandLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="cfBg" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF8A00" />
          <stop offset="1" stopColor="#FF4500" />
        </linearGradient>
      </defs>

      {/* Rounded square background */}
      <rect width="40" height="40" rx="10" fill="url(#cfBg)" />

      {/* Fork — left */}
      <line x1="13" y1="8"  x2="13" y2="14" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="15.5" y1="8" x2="15.5" y2="14" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="18" y1="8"  x2="18" y2="14" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M13 14 Q13 17.5 15.5 17.5 Q18 17.5 18 14" stroke="white" strokeWidth="1.6" fill="none" />
      <line x1="15.5" y1="17.5" x2="15.5" y2="32" stroke="white" strokeWidth="1.6" strokeLinecap="round" />

      {/* Spoon — right */}
      <ellipse cx="26" cy="12.5" rx="3.5" ry="4.5" stroke="white" strokeWidth="1.6" fill="none" />
      <line x1="26" y1="17" x2="26" y2="32" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
