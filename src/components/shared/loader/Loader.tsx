import { twMerge } from "tailwind-merge";

interface LoaderProps {
  className?: string;
}

export default function Loader({ className = "" }: LoaderProps) {
  return (
    <div
      className={twMerge(
        `w-full h-dvh flex items-center justify-center`,
        className,
      )}
    >
      <div className="loader"></div>
    </div>
  );
}
