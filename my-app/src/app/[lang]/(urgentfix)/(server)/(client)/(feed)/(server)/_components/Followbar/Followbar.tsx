"use client";
import { useCurrentUser, useUsers } from "@/lib/hooks/useUsers";
import { capitalizeFirstLetter, devAlert, getRandomIndexes } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import Avatar from "../Avatar";
import { LoremIpsum } from "lorem-ipsum";
import { ClipLoader } from "react-spinners";
import Link from "next/link";

const Followbar = () => {
  const { data: users, isLoading } = useUsers();

  const { data: fetchedUser, isLoading: isLoading2 } = useCurrentUser();

  const lorem = new LoremIpsum({
    sentencesPerParagraph: {
      max: 8,
      min: 4,
    },
    wordsPerSentence: {
      max: 16,
      min: 4,
    },
  });

  if (isLoading == true || isLoading2 == true) {
    // return <div>Loading test...</div>;
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#FFC122" size={40} />
      </div>
    );
  }

  // devAlert(users);
  if (users.length == 0) {
    // return null;
    return <div>No users</div>;
  }

  const usersIndexes = getRandomIndexes(users.length, 1);

  return (
    <div className="px-6 py-4 hidden lg:block">
      <div className="bg-secondary3 rounded-t-xl p-4">
        <h2 className="text-xl font-semibold">Who to follow</h2>
        <div className="flex flex-col gap-6 mt-4">
          {/* TODO USER LIST */}
          {users
            .filter((u: Record<string, any>, i: number) => {
              const alexisID = "107403167432202867640";
              const joseID = "111666551165404184521";

              const featured =
                [alexisID, joseID].includes(u.id) || usersIndexes.includes(i);

              if ([alexisID, joseID].includes(u.id) == false)
                if (
                  u.name.includes("Jose") ||
                  u.name.includes("José") ||
                  u.name.includes("Alvarez") ||
                  u.name.includes("Alexis") ||
                  u.name.includes("Diamond")
                )
                  return false;

              return featured;
            })
            .sort((a: Record<string, any>, b: Record<string, any>) => {
              // https://chat.openai.com/c/7bea4d27-0578-451c-9e8b-94990e5f6a95
              // "107403167432202867640" should be first
              if (a.id === "107403167432202867640") return -1;
              if (b.id === "107403167432202867640") return 1;

              // "111666551165404184521" should be second
              if (a.id === "111666551165404184521") return -1;
              if (b.id === "111666551165404184521") return 1;

              // For all others, their order doesn't matter
              return 0;
            })
            .map((user: Record<string, any>, i: number) => {
              if (false)
                return (
                  <div key={user.id} className="flex flex-row gap-4">
                    <Avatar userId={user.id} />
                    <div className="flex flex-col">
                      <p className="font-semibold text-sm">{user.name}</p>
                    </div>
                  </div>
                );

              if (false)
                return (
                  <div key={user.id} className="flex gap-4 items-center">
                    <Image
                      src={user.image}
                      alt={user.name}
                      className="w-12 h-12 rounded-full"
                      width={48}
                      height={48}
                    />
                    <div>
                      <h3 className="font-semibold">{user.name}</h3>
                      {/* <p className="text-accent2">{user.email}</p> */}
                    </div>
                  </div>
                );

              const firstName = capitalizeFirstLetter(lorem.generateWords(1));
              const lastName = capitalizeFirstLetter(lorem.generateWords(1));

              const isMarketingLayout =
                fetchedUser?.currentUser?.email ==
                "jose@laissez-passer.com-test";
              // const isMarketingLayout = false;

              if (
                isMarketingLayout == true &&
                i > unsplashModelsImgs.length - 1
              ) {
                // i = 0;
                return null;
              }

              let coFounderTitle = null;
              if (user.name === "Alexis Diamond") {
                coFounderTitle = "Co-founder, CEO";
              } else if (user.name === "José Alvarez") {
                coFounderTitle = "Co-founder, CTO";
              }

              const marketingComponent = (
                <>
                  <Image
                    // src={user.image}
                    src={unsplashModelsImgs[i]}
                    alt={user.name}
                    className="w-12 h-12 rounded-full"
                    width={48}
                    height={48}
                  />
                  {/* <Avatar userId={user.id} /> */}
                  <div>
                    {/* <h3 className="font-semibold">{user.name}</h3> */}
                    <h3 className="font-semibold">{`${firstName} ${lastName}`}</h3>
                    {/* <p className="text-accent2">{user.email}</p> */}
                  </div>
                </>
              );

              const productionComponent = (
                <>
                  {/* <Image
                  // src={user.image}
                  src={unsplashModelsImgs[i]}
                  alt={user.name}
                  className="w-12 h-12 rounded-full"
                  width={48}
                  height={48}
                /> */}
                  <Avatar userId={user.id} />
                  <div>
                    <h3 className="font-semibold">{user.name}</h3>
                    {/* <h3 className="font-semibold">{`${firstName} ${lastName}`}</h3> */}
                    {/* <p className="text-accent2">{user.email}</p> */}
                    {coFounderTitle != null && (
                      <p className="text-darkFont">{coFounderTitle}</p>
                    )}
                  </div>
                </>
              );

              return (
                <div key={user.id} className="flex gap-4 items-center">
                  {/* <p>{JSON.stringify(fetchedUser)}</p> */}
                  {isMarketingLayout == true
                    ? marketingComponent
                    : productionComponent}
                </div>
              );
            })}
        </div>
      </div>
      {/* <div className="bg-secondary3 px-6 py-4 rounded-b-xl hover:bg-red-500"> */}
      <Link
        href={"/connect"}
        className="block bg-secondary3 px-6 py-4 rounded-b-xl hover:bg-secondary2"
      >
        See more
      </Link>
      <div className="text-darkFont py-10">
        <h1 className="font-bold">
          Which upcoming feature are you most excited about for readingclub.ai?
        </h1>
        <br />
        <p>
          You can always email the CTO at{" "}
          <a href="mailto:jose@readingclub.ai">jose@readingclub.ai</a> with your
          ideas.{" "}
          <span className="italic">
            {`We'll be happy to share a 50% off promo code on our subscription if
            you do!`}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Followbar;

const unsplashModelsImgs = [
  "https://0opmmv83e2pndbdg.public.blob.vercel-storage.com/unsplash-models/Screenshot%202024-02-29%20at%2010.16.33%20AM-tvUqpUKwr1KDqnh8ba3mEOE6JVogzl.png",
  "https://0opmmv83e2pndbdg.public.blob.vercel-storage.com/unsplash-models/Screenshot%202024-02-29%20at%2010.14.11%20AM-ZKxUDStyaNNZ7nWYDgnooFRL7q2BrZ.png",
  "https://0opmmv83e2pndbdg.public.blob.vercel-storage.com/unsplash-models/Screenshot%202024-02-29%20at%2010.14.51%20AM-7qSL3uydysJtVuNsCshaWffBZe4R4E.png",
  "https://0opmmv83e2pndbdg.public.blob.vercel-storage.com/unsplash-models/Screenshot%202024-02-29%20at%2010.16.02%20AM-yFsdx1gABWHfE0FYPuZHs4X8mmroOZ.png",
  "https://0opmmv83e2pndbdg.public.blob.vercel-storage.com/unsplash-models/Screenshot%202024-02-29%20at%2010.16.26%20AM-dXSUkcaWnr0eW1HNwqiSo2X7ms8P3h.png",
  "https://0opmmv83e2pndbdg.public.blob.vercel-storage.com/unsplash-models/Screenshot%202024-02-29%20at%2010.14.45%20AM-NDype9qWSupv2qWYtIcA0aisBHDHsc.png",
  "https://0opmmv83e2pndbdg.public.blob.vercel-storage.com/unsplash-models/Screenshot%202024-02-29%20at%2010.14.20%20AM-N94OU7iMXKiitfTfC3KlcOTQSyU1qY.png",
  "https://0opmmv83e2pndbdg.public.blob.vercel-storage.com/unsplash-models/Screenshot%202024-02-29%20at%2010.13.41%20AM-DgHbGuVlN4Qq4YNl0eOPHHge04hhvl.png",
  "https://0opmmv83e2pndbdg.public.blob.vercel-storage.com/unsplash-models/Screenshot%202024-02-29%20at%2010.13.59%20AM-8ZsShImhxkfmSAGBLrLXl5QaMRNtnp.png",
  "https://0opmmv83e2pndbdg.public.blob.vercel-storage.com/unsplash-models/Screenshot%202024-02-29%20at%2010.15.48%20AM-76CpCbeEUa5zL2KdCyNCIjZQ3Wmcrk.png",
];

export const ContactPromo = () => {
  return (
    <div className="text-darkFont py-10">
      <h1 className="font-bold">
        Which upcoming feature are you most excited about for readingclub.ai?
      </h1>
      <br />
      <p>
        You can always email the CTO at{" "}
        <a href="mailto:jose@readingclub.ai">jose@readingclub.ai</a> with your
        ideas.{" "}
        <span className="italic">
          {`We'll be happy to share a 50% off promo code on our subscription if
            you do!`}
        </span>
      </p>
    </div>
  );
};
