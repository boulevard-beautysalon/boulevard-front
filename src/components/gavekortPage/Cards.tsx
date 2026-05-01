import Container from "@/components/shared/container/Container";
import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";
import GiftCardItem from "./GiftCardItem";
import type { GiftCard } from "@/types/giftCard";

const DEFAULT_CARDS: GiftCard[] = [
  {
    _id: "default-500",
    amount: 500,
    description: "Perfekt til en mindre behandling",
    popular: false,
    primary: false,
    order: 0,
  },
  {
    _id: "default-1000",
    amount: 1000,
    description: "Mest populære valg",
    popular: true,
    primary: true,
    order: 1,
  },
  {
    _id: "default-1500",
    amount: 1500,
    description: "Til en luksusoplevelse",
    popular: false,
    primary: false,
    order: 2,
  },
];

interface CardsProps {
  cards: GiftCard[];
}

export default function Cards({ cards }: CardsProps) {
  const list = cards?.length ? cards : DEFAULT_CARDS;

  return (
    <section
      id="gavekort-list"
      className="py-16 lg:py-25 scroll-mt-30"
    >
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInAnimation({
            delay: 0.2,
            y: 30,
            opacity: 0.01,
            duration: 1.2,
          })}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6"
        >
          {list.map((card) => (
            <GiftCardItem key={card._id} card={card} />
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
