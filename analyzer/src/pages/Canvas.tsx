import React, { useRef } from "react";

import { motion, useTransform, useScroll } from "framer-motion";

const Example = () => {
  return (
    <div className="bg-neutral-800 ">
      <div className="flex h-48 items-center justify-center">
        <span className="font-semibold uppercase underline text-neutral-500 text-2xl">
          How it Works
        </span>
      </div>
      <HorizontalScrollCarousel />
    </div>
  );
};

const HorizontalScrollCarousel = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

  return (
    <section ref={targetRef} className="relative h-[400vh] bg-neutral-900 w-screen">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-4">
          {cards.map((card) => {
            return <Card card={card} key={card.id} />;
          })}
        </motion.div>
      </div>
    </section>
  );
};

const Card = ({ card }) => {
  return (
    <div
      key={card.id}
      className="cursor-pointer group relative h-[450px] w-[350px] overflow-hidden bg-neutral-200"
    >
      <div
        style={{
          backgroundImage: `url(${card.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="absolute inset-0 z-0 transition-transform  duration-300 group-hover:scale-110"
      ></div>
      <div className="absolute inset-0 z-10 grid place-content-center">
        <p className="p-8 text-sm font-[500] uppercase text-black">
          {card.title}
        </p>
      </div>
    </div>
  );
};

export default Example;

const cards = [
  {
    url: "/assets/images/Profile.png",
    title: "1. Create an Account",
    id: 1,
  },
  {
    url: "/assets/images/AnalyzeToken.png",
    title: "2. Search for Tokens",
    id: 2,
  },
  {
    url: "/assets/images/Trading.png",
    title: "3. Test your strategies with our upcoming trading feature",
    id: 3,
  },
  {
    url: "/imgs/abstract/4.jpg",
    title: "4. Follow Pro Traders with Our upcoming Copy trading ",
    id: 4,
  },
  {
    url: "/assets/images/Newsletter.webp",
    title: "5. Stay Informed by subscribing to our newsletter",
    id: 5,
  },
  {
    url: "/assets/images/Discord.webp",
    title: "6. Engage with our discord community",
    id: 6,
  },
  {
    url: "/imgs/abstract/5.jpg",
    title: "7. That's it. And oh, invite your friends :)",
    id: 7,
  },
];
