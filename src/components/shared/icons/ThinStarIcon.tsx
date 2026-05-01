type ThinStarIconProps = {
  className?: string;
};

export default function ThinStarIcon({ className = "" }: ThinStarIconProps) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`.trim()}
      aria-label="Thin star icon"
    >
      <path
        d="M16 0L17.0748 14.9252L32 16L17.0748 17.0748L16 32L14.9252 17.0748L0 16L14.9252 14.9252L16 0Z"
        fill="currentColor"
      />
    </svg>
  );
}
