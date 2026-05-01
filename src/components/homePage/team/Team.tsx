import Container from "@/components/shared/container/Container";
import type { TeamMember } from "@/types/team";
import TeamMembersSlider from "./TeamMembersSlider";
import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";

interface TeamProps {
  teamMembers: TeamMember[];
}

export default function Team({ teamMembers }: TeamProps) {
  return (
    <section className="pb-25 lg:pb-[88px]">
      <Container>
        <motion.div
          key={`home-page-sevices-text-reveal-card-slider}`}
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInAnimation({ y: 30, scale: 0.95, delay: 0.6 })}
          className="w-screen max-w-[1455px]"
        >
          <TeamMembersSlider teamMembers={teamMembers} />
        </motion.div>
      </Container>
    </section>
  );
}
