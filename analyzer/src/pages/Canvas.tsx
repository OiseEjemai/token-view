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
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className="absolute inset-0 z-0 transition-transform  duration-300 group-hover:scale-110"
      ></div>
      <div className="absolute inset-0 z-10 flex flex-col justify-end p-4">
        <p className="p-2 text-sm font-[500] uppercase text-blak">
          {card.title}
        </p>
        <p className="text-sm font-[300] text-black mt-1">{card.description}</p>
      </div>
    </div>
  );
};

export default Example;

const cards = [
  {
    url: "https://i.imgur.com/QTe6zI3.png",
    title: "1. Create an Account",
    description: "Sign up to gain access to all our tools and resources.",
    id: 1,
  },
  {
    url: "https://i.imgur.com/1VqqSgg.png",
    title: "2. Search for Tokens",
    description: "Find detailed data on various cryptocurrencies to analyze market trends.",
    id: 2,
  },
  {
    url: "https://i.imgur.com/WvGNsrL.png",
    title: "3. Test Your Strategies",
    description: "Experiment with trading strategies using our simulation tools.",
    id: 3,
  },
  {
    url: "https://i.imgur.com/1KU6IAh.jpeg",
    title: "4. Follow Pro Traders",
    description: "Copy trade with seasoned experts to optimize your strategies.",
    id: 4,
  },
  {
    url: "https://i.imgur.com/oPa9333.png",
    title: "5. Stay Informed",
    description: "Subscribe to our newsletter for the latest market insights.",
    id: 5,
  },
  {
    url: "https://i.imgur.com/fvhT8Hy.png",
    title: "6. Join Our Community",
    description: "Connect with like-minded traders in our Discord community.",
    id: 6,
  },
  {
    url: "https://i.imgur.com/ZBDVRhL.jpeg",
    title: "7. Invite Friends",
    description: "Spread the word and help friends learn to trade responsibly.",
    id: 7,
  },
];

// import React, { useRef } from "react";
// import { motion, useTransform, useScroll } from "framer-motion";

// const Example = () => {
//   return (
//     <div className="bg-neutral-800">
//       <div className="flex h-48 items-center justify-center">
//         <span className="font-semibold uppercase underline text-neutral-500 text-2xl">
//           How it Works
//         </span>
//       </div>
//       <HorizontalScrollCarousel />
//     </div>
//   );
// };

// const HorizontalScrollCarousel = () => {
//   const targetRef = useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: targetRef,
//   });

//   const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

//   return (
//     <section ref={targetRef} className="relative h-[400vh] bg-neutral-900 w-screen">
//       <div className="sticky top-0 flex h-screen items-center overflow-hidden overflow-x-scroll snap-x snap-mandatory">
//         <motion.div style={{ x }} className="flex gap-4 snap-x">
//           {cards.map((card) => {
//             return <Card card={card} key={card.id} />;
//           })}
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// const Card = ({ card }) => {
//   return (
//     <div
//       key={card.id}
//       className="cursor-pointer group relative h-[450px] w-[350px] overflow-hidden bg-neutral-200 snap-start"
//     >
//       {/* Background image */}
//       <div
//         style={{
//           backgroundImage: `url(${card.url})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//         }}
//         className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110"
//       ></div>

//       {/* Text overlay */}
//       <div className="absolute inset-0 z-10 flex flex-col justify-end p-4 bg-black/60 transition-opacity duration-300 group-hover:opacity-100 md:opacity-0 md:group-hover:opacity-100">
//         <p className="text-lg font-semibold text-white">{card.title}</p>
//         <p className="text-sm text-gray-300 mt-1">{card.description}</p>
//       </div>
//     </div>
//   );
// };

// export default Example;

// const cards = [
//   {
//     url: "/assets/images/Profile.png",
//     title: "1. Create an Account",
//     description: "Sign up to gain access to all our tools and resources.",
//     id: 1,
//   },
//   {
//     url: "/assets/images/AnalyzeToken.png",
//     title: "2. Search for Tokens",
//     description: "Find detailed data on various cryptocurrencies to analyze market trends.",
//     id: 2,
//   },
//   {
//     url: "/assets/images/Trading.png",
//     title: "3. Test Your Strategies",
//     description: "Experiment with trading strategies using our simulation tools.",
//     id: 3,
//   },
//   {
//     url: "/imgs/abstract/4.jpg",
//     title: "4. Follow Pro Traders",
//     description: "Copy trade with seasoned experts to optimize your strategies.",
//     id: 4,
//   },
//   {
//     url: "/assets/images/Newsletter.webp",
//     title: "5. Stay Informed",
//     description: "Subscribe to our newsletter for the latest market insights.",
//     id: 5,
//   },
//   {
//     url: "/assets/images/Discord.webp",
//     title: "6. Join Our Community",
//     description: "Connect with like-minded traders in our Discord community.",
//     id: 6,
//   },
//   {
//     url: "/imgs/abstract/5.jpg",
//     title: "7. Invite Friends",
//     description: "Spread the word and help friends learn to trade responsibly.",
//     id: 7,
//   },
// ];