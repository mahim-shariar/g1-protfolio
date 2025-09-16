import React from "react";
import HeroSection from "../components/Home/HeroSection";
import MotionCredibilityStrip from "../components/Home/MotionCredibilityStrip";
import FeaturedPortfolio from "../components/Home/FeaturedPortfolio";
import NextGenServices from "../components/Home/NextGenServices";
import WhyWorkWithUs from "../components/Home/WhyWorkWithUs";
import TestimonialSection from "../components/Home/TestimonialSection";
import CallToAction from "../components/Home/CallToAction";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <MotionCredibilityStrip />
      <FeaturedPortfolio />
      <NextGenServices />
      <WhyWorkWithUs />
      <TestimonialSection />
      <CallToAction />
    </div>
  );
};

export default Home;
