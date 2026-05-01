type StarIconProps = {
  className?: string;
};

export default function StarIcon({ className = "" }: StarIconProps) {
  return (
    <svg
      width="37"
      height="38"
      viewBox="0 0 37 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`.trim()}
      aria-label="Star icon"
    >
      <path
        d="M0 37.0259C0 37.0259 11.7798 24.0041 11.7798 18.513C11.7798 13.0218 0 0 0 0C0 0 13.0219 11.7929 18.5 11.7929C23.9781 11.7929 37 0 37 0C37 0 25.207 13.0218 25.207 18.513C25.207 23.991 37 37.0259 37 37.0259C37 37.0259 23.9781 25.2331 18.5 25.2331C13.0219 25.2331 0 37.0259 0 37.0259Z"
        fill="currentColor"
      />
    </svg>
  );
}
