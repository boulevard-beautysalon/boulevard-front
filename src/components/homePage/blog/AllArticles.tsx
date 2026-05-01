import Link from "next/link";
import Button from "@/components/shared/buttons/Button";
import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";

export default function AllArticles() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      exit="exit"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeInAnimation({ scale: 0.95, duration: 1, delay: 0.3 })}
    >
      <div className="flex gap-5 justify-between items-center px-4 py-5 mb-3 xl:mb-0 rounded-[20px] bg-black text-beige">
        <p className="max-w-[240px] xl:max-w-[205px] text-[14px] leading-[120%] font-light">
          Læs vores blog om hudpleje og behandlinger i Horsens
        </p>
        <Link href="/blog" className="hidden xl:block">
          <Button variant="beige" className="w-[223px] h-[56px]">
            Til alle materialer
          </Button>
        </Link>
      </div>

      <Button href="/blog" variant="brown" className="xl:hidden w-full h-14">
        Til alle materialer
      </Button>
    </motion.div>
  );
}
