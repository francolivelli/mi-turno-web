"use client";
import { useMediaQuery } from "react-responsive";
import CancelBookingLayout from "@/app/components/CancelBookingLayout";

const page = () => {
  const isDesktop = useMediaQuery({
    query: "(min-width: 768px)",
  });

  return (
    <section className="section-a">
      <CancelBookingLayout />
    </section>
  );
};

export default page;
