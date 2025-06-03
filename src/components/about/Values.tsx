import React from "react";
import { RiFileCheckLine, RiContactsBook2Line } from "react-icons/ri";
import { IoLogoUsd } from "react-icons/io5";
import { FaUserCheck } from "react-icons/fa6";

const data = [
  {
    id: 1,
    title: "Reliability",
    description:
      "We understand the importance of providing solutions that you can count on.",
  },
  {
    id: 2,
    title: "Transparency",
    description:
      "We understand the importance of providing solutions that you can count on.",
  },
  {
    id: 3,
    title: "Credibility",
    description:
      "We understand the importance of providing solutions that you can count on.",
  },
];

const Values = () => {
  return (
    <section className="w-full h-full bg-[#FEFD0C] ">
      <div className="container mx-auto w-full h-full md:py-[70px] py-[50px] md:px-0 px-4">
        <div className=" w-full">
          <h3 className="text-black xl:text-[42px] text-[32px] tracking-wide font-extrabold text-center">
            Our Values
          </h3>
        </div>
        <div className="w-full flex flex-col xl:flex-row justify-between xl:gap-[100px] gap-[50px] md:mt-9 mt-5">
          <div className="md:grid md:grid-cols-3 w-full gap-12">
            {data?.map((item, index) => (
              <div className="flex w-full md:py-3 py-4" key={item?.id}>
                <div>
                  <h3 className="font-times xl:text-[25px] tracking-wide text-[18px] text-black font-bold">
                    {item?.title}
                  </h3>
                  <p className="text-black font-normal xl:text-[20px] tracking-wide text-sm font-times w-full xl:py-2 py-3 leading-[150%]">
                    {item?.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Values;
