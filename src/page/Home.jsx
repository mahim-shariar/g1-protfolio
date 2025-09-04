import React from "react";
import HeroSection from "../components/Home/HeroSection";
import About from "../components/Home/About";
import MotionCredibilityStrip from "../components/Home/MotionCredibilityStrip";
import FeaturedPortfolio from "../components/Home/FeaturedPortfolio";
import NextGenServices from "../components/Home/NextGenServices";
import WhyWorkWithUs from "../components/Home/WhyWorkWithUs";
import TestimonialSection from "../components/Home/TestimonialSection";
import CallToAction from "../components/Home/CallToAction";
import NextGenFooter from "../components/Shared/NextGenFooter";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <MotionCredibilityStrip />
      {/* <About /> */}
      <FeaturedPortfolio />
      <NextGenServices />
      <WhyWorkWithUs />
      <TestimonialSection />
      <CallToAction />
      <NextGenFooter />
    </div>
  );
};

export default Home;
