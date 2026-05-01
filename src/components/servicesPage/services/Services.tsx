import ServiceSection from "@/components/shared/serviceSection/ServiceSection";
import type { Service } from "@/types/service";

interface ServicesProps {
  services: Service[];
}

export default function Services({ services }: ServicesProps) {
  if (!services || !services.length) return null;

  return services.map((service, index) => (
    <ServiceSection
      key={service._id}
      service={service}
      isFirst={index === 0}
    />
  ));
}
