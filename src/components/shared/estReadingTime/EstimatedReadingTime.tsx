import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { calculateReadingTime } from "@/utils/calculateReadingTime";
import { BlogPost } from "@/types/blogPost";
import ClockIcon from "@/components/shared/icons/ClockIcon";

interface EstimatedReadingTimeProps {
  post: BlogPost;
  className?: string;
}

export default function EstimatedReadingTime({
  post,
  className = "",
}: EstimatedReadingTimeProps) {
  const readingTime = calculateReadingTime(post);

  return (
    <div
      className={twMerge(
        clsx(
          `flex items-center gap-[5px] shrink-0 w-fit rounded-full bg-brown px-3 py-1.5`,
          className,
        ),
      )}
    >
      <ClockIcon className="text-beige" />

      <p className="text-[12px] font-normal leading-[120%] text-beige">
        {readingTime} min
      </p>
    </div>
  );
}
