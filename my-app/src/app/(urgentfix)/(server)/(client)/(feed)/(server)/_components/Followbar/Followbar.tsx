"use client";
import { useCurrentUser, useUsers } from "@/lib/hooks/useUsers";
import { capitalizeFirstLetter, devAlert } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import Avatar from "../Avatar";
import { LoremIpsum } from "lorem-ipsum";

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
    return <div>Loading...</div>;
  }

  // devAlert(users);
  if (users.length == 0) {
    // return null;
    return <div>No users</div>;
  }

  return (
    <div className="px-6 py-4 hidden lg:block">
      <div className="bg-secondary3 rounded-xl p-4">
        <h2 className="text-xl font-semibold">Who to follow</h2>
        <div className="flex flex-col gap-6 mt-4">
          {/* TODO USER LIST */}
          {users.map((user: Record<string, any>, i: number) => {
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

            // const isMarketingLayout =
            fetchedUser?.currentUser?.email == "jose@laissez-passer.com-test";
            // const isMarketingLayout = false;

            if (
              isMarketingLayout == true &&
              i > unsplashModelsImgs.length - 1
            ) {
              // i = 0;
              return null;
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
