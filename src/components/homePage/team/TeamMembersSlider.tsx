"use client";
import { SwiperSlide } from "swiper/react";
import SwiperWrapper from "@/components/shared/swper/SwiperWrapper";
import TeamCard from "./TeamCard";
import { ReactNode } from "react";
import type { TeamMember } from "@/types/team";

interface TeamMembersSliderProps {
  teamMembers: TeamMember[];
  uniqueKey?: string;
  component?: ReactNode;
}

export default function TeamMembersSlider({
  teamMembers,
  uniqueKey,
  component,
}: TeamMembersSliderProps) {
  if (!teamMembers || !teamMembers.length) return null;

  return (
    <SwiperWrapper
      loop
      breakpoints={{
        0: {
          spaceBetween: 20,
          slidesPerView: "auto",
        },
      }}
      uniqueKey={uniqueKey}
      component={component}
      swiperClassName="team-members-cards-slider"
      buttonsClassName="pr-5 lg:pr-6 mr-5 sm:mr-[calc(100%-640px+20px)] md:mr-[calc(100%-768px+20px)] 
          lg:mr-[calc(100%-1024px+24px)] xl:mr-[calc(100%-1280px+24px)]"
      buttonsPosition="center"
    >
      {teamMembers.map((teamMember) => (
        <SwiperSlide key={teamMember._id}>
          <TeamCard teamMember={teamMember} />
        </SwiperSlide>
      ))}
    </SwiperWrapper>
  );
}
