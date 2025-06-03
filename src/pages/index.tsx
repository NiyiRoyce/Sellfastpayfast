import React from "react";
import Hero from "../components/home/Hero";
import Steps from "../components/home/Steps";
import PageLayout from "../layouts/PageLayout";
import Review from "../components/home/Review";
import Cta from "../components/home/Cta";

const Home = () => {
  return (
    <PageLayout>
      <Hero />
      <Review />
      <Steps />
       <Cta />
    </PageLayout>
  );
};

export default Home;
