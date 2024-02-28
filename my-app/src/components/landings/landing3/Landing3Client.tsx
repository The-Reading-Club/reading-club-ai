"use client";
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/qnIuqfgX9Uh
 */
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CardHeader, CardContent, Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";

import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
  FaYoutube,
  FaGooglePlay,
  FaAppStore,
  FaAppStoreIos,
  FaPinterest,
} from "react-icons/fa"; // Import social media icons
import Logo from "@/components/Logo";
// import ReadingClubEditor from "@/app/editor/ReadingClubEditor";
import { useEffect, useRef, useState } from "react";
import TRCEditorV2 from "@/components/TRCEditorV2";
import LoomEmbed from "@/components/LoomEmbed";
import { ArrowRightIcon } from "lucide-react";
import YouTubeVideo from "@/components/YouTubeVideo";
import UnstyledExternalLink from "@/components/UnstyledExternalLink";
import Image from "next/image";

import beesImg from "/public/characters/Bees2.png";
// import beeBoy from "/public/characters/Bee-Boy.png";
import beeBoy from "/public/characters/Bee02.png";
import beeMom from "/public/characters/Bee-Mom.png";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
}

const SocialLink: React.FC<SocialLinkProps> = ({ href, icon }) => {
  return (
    <a
      // className="mt-0 px-8 py-1 bg-[#FFF] text-[#000] rounded hover:bg-[#FCF29A] rounded-full inline-flex items-center justify-center"
      className="mt-0 px-2 py-2 bg-white text-primary rounded-full hover:bg-[#FCF29A] rounded-full inline-flex items-center justify-center"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {icon}
    </a>
  );
};

interface Landing3ClientProps {
  data: any;
}

const Landing3Client: React.FC<Landing3ClientProps> = ({ data }) => {
  // return <p>{JSON.stringify(data, null, 2)}</p>;

  // const [testTipTapContentState, setTipTapContentState] = useState(
  //   data["storiesTiptapFormat"][0]
  // );

  // useEffect(() => {
  //   setTipTapContentState(data["storiesTiptapFormat"][0]);
  // }, [data]);

  // https://chat.openai.com/c/fb6b02de-1725-4123-b2b5-e519c5a8e0c2
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      const { scrollWidth, clientWidth } = scrollContainerRef.current;
      const centerPosition = (scrollWidth - clientWidth) / 2;
      scrollContainerRef.current.scrollLeft = centerPosition;
    }
  }, []);

  // STUPID WORKAROUND

  const router = useRouter();
  const pathname = usePathname();

  // const session = useSession();

  // const userIsLoggedIn = session.data?.user ? true : false;

  if (pathname !== "/") return null;

  // if (userIsLoggedIn) {
  //   // router.push("/feed");
  //   return null;
  // }

  return (
    <div
      className="flex flex-col min-h-screen"
      style={
        {
          // backgroundImage: "url(/BG-Archiv3.jpg)",
          // backgroundRepeat: "repeat",
          // backgroundSize: "cover", // Ensures the background image covers the entire section
          // backgroundRepeat: "no-repeat", // Prevents repeating the background image
          // backgroundPosition: "center", // Centers the background image
          // backgroundImage: "url(/BG-9.jpg)",
        }
      }
    >
      <header
        className="px-6 lg:py-1 py-4 flex items-center justify-center bg-primary"
        style={
          {
            // backgroundImage: "url(/BG-Honeycomb.jpg)",
            // backgroundSize: "cover", // Ensures the background image covers the entire section
            // backgroundRepeat: "no-repeat", // Prevents repeating the background image
            // backgroundPosition: "center", // Centers the background image
          }
        }
      >
        {/* <div>TEST</div> */}
        {/* <Logo width={10} height={10} /> */}

        <div className="items-center ">
          <Logo />
        </div>
        {false && (
          <Link className="items-center hidden lg:flex" href="#">
            {/* <BookIcon className="w-6 h-6 text-[#FFC122]" /> */}
            <span className="ml-2 text-2xl bg-[#FFC122] font-bold text-[#FFF] ">
              Reading Club AI
            </span>
          </Link>
        )}
        <nav
          className="
        lg:ml-auto
        flex gap-4
        flex-wrap
        justify-center
        mb-0
        lg:mb-0

        mr-0
        lg:mr-9

        "
        >
          <SocialLink
            href="https://www.youtube.com/@ReadingClubAI"
            icon={<FaYoutube />}
          />
          <SocialLink
            href="https://www.twitter.com/ReadingClubAI"
            icon={<FaTwitter />}
          />
          {/* <SocialLink
            href="https://www.linkedin.com/company/ReadingClubAI"
            icon={<FaLinkedinIn />}
          />
          <SocialLink
            href="https://www.pinterest.com/readingclubai"
            icon={<FaPinterest />}
          />
          <SocialLink
            href="https://www.instagram.com/ReadingClubAI"
            icon={<FaInstagram />}
          />
          <SocialLink
            href="https://www.facebook.com/ReadingClubAI"
            icon={<FaFacebookF />}
          />
          <SocialLink
            href="https://www.tiktok.com/@ReadingClubAI"
            icon={<FaTiktok />}
          /> */}
          {false && (
            <>
              <Link
                // className="text-2xl font-medium hover:underline text-[#FAF8DA]"
                className="mt-0 px-8 py-1 bg-[#FFF] text-[#000] rounded hover:bg-[#FCF29A] rounded-full"
                href="#"
              >
                Home
              </Link>
              <Link
                // className="text-sm font-medium hover:underline text-[#FAF8DA]"
                className="mt-0 px-8 py-1 bg-[#FFF] text-[#000] rounded hover:bg-[#FCF29A] rounded-full"
                href="#"
              >
                Services
              </Link>
              <Link
                // className="text-sm font-medium hover:underline text-[#FAF8DA]"
                className="mt-0 px-8 py-1 bg-[#FFF] text-[#000] rounded hover:bg-[#FCF29A] rounded-full"
                href="#"
              >
                About
              </Link>
              <Link
                // className="text-sm font-medium hover:underline text-[#FAF8DA]"
                className="mt-0 px-8 py-1 bg-[#FFF] text-[#000] rounded hover:bg-[#FCF29A] rounded-full"
                href="#"
              >
                Contact
              </Link>
            </>
          )}
        </nav>
      </header>
      <main className="flex-1">
        <section
          className="w-full bg-center bg-cover 
          flex items-center justify-center lg:bg-contain lg:pb-0 pb-20
          flex-col 
          lg:flex-col lg:justify-start
          relative
          "
          // style={{
          //   backgroundImage: "url(/BG-Archiv3.jpg)",
          // }}
          // style={{
          //   backgroundImage: "url(/BG-Stories-Bookshelf-2.jpg)",
          //   // backgroundRepeat: "repeat",
          //   // backgroundSize: "contain", // Ensures the background image covers the entire section
          //   // backgroundRepeat: "no-repeat", // Prevents repeating the background image
          //   // backgroundPosition: "center", // Centers the background image
          //   // border: "2px solid purple",
          // }}
          style={
            {
              // border: "4px solid black",
            }
          }
        >
          <div
            className="absolute top-0 left-0 w-full h-full bg-center bg-cover z-0"
            // opacity-50
            style={
              {
                // backgroundImage: "url(/BG-Stories-Bookshelf-2.jpg)",
                // backgroundImage: "url(/BG-9.jpg)",
              }
            }
          ></div>
          <div
            className="text-center 
            lg:w-[90%]
            lg:text-center text-[#FFC122] 
            lg:pt-20
            p-5 z-10 pb-0"
            // style={{ border: "2px solid orange" }}
          >
            <h1 className="lg:text-6xl text-5xl  font-bold">
              {/* https://chat.openai.com/c/24650459-ac0d-46af-aef3-c81eabf0fb9b */}
              {`Transforming bedtime stories into interactive adventures`}
              {/* {`Write & Share`}
              <br />
              {`Children's Books with AI`} */}
            </h1>
            <p className="mt-5 lg:text-2xl text-xl text-bold text-[#3c4043]">
              {`Bringing children’s imaginations to life with the help of AI`}
            </p>
            {/* https://tailwind-hover-effects.vercel.app */}
            <div
              className="flex lg:flex-row flex-col justify-center"
              // style={{ border: "2px solid purple" }}
            >
              <div>
                <Image
                  src={beeMom}
                  alt="bees"
                  height={200}
                  width={200}
                  className="p-10 pt-5 lg:block hidden"
                  // style={{ border: "2px solid red" }}
                />
              </div>
              <Link
                href="https://www.readingclub.ai/drafts"
                // href="http://localhost:3000/drafts"
                // target="_blank"
                rel="noopener noreferrer"
                className="text-[#3c4043]"
              >
                <Button className="mt-8 px-16 py-8 bg-[#FFF] text-darkFont rounded hover:bg-[#FFF] rounded-full text-2xl font-bold border-4 border-[#FFC122]">
                  Write a book
                  {/* <ArrowRightIcon className="absolute right-6" /> */}
                </Button>
              </Link>
              <div
                className="flex flex-col justify-end"
                // style={{ border: "2px solid black" }}
              >
                <Image
                  src={beeBoy}
                  alt="bees"
                  height={200}
                  width={200}
                  className="p-14 pt-5 lg:block hidden"
                  // style={{ border: "2px solid red" }}
                />
              </div>
            </div>
            {false && (
              <>
                <p className="mt-5 lg:text-2xl text-xl text-bold p-5 lg:p-0 text-[#3c4043]">
                  {/* Join our community and start your journey. */}
                  Download our app on{" "}
                  <Link
                    href={
                      "https://play.google.com/store/apps/details?id=com.TheReadingClub.TheReadingClub&hl=en_US&gl=US"
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-underline"
                  >
                    Google Play
                  </Link>{" "}
                  &{" "}
                  <Link
                    href={
                      "https://apps.apple.com/us/app/reading-club-childrens-books/id1528070520"
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    // className="text-[#FFC122]"
                  >
                    App Store
                  </Link>
                </p>
                <p className="lg:text-2xl text-xl text-bold text-[#3c4043] lg:mb-0 mb-0">
                  {`30,000+ downloads and counting!`}
                </p>
              </>
            )}
          </div>
          <div
            className="lg:w-auto md:w-[70%] w-[90%] flex justify-center z-10
            "
            style={
              {
                // border: " 2px solid green",
                // width: "90%",
              }
            }
          >
            {/* <LoomEmbed
              videoId={`2dc7a0864d804cb8a78c0b3a5ea593fc`}
              width="800px"
              height="450px"
            /> */}
            <YouTubeVideo videoId="kU_exK_0oxI" />
          </div>
        </section>
        {false && (
          <section
            className="py-12 px-6 bg-[#FAF8DA]"
            style={
              {
                // backgroundImage: "url(/BG-Archiv3.jpg)",
                // https://chat.openai.com/c/91c904c0-186c-46b5-817a-2312a35ca980
                // backgroundSize: "cover", // Ensures the background image covers the entire section
                // backgroundRepeat: "no-repeat", // Prevents repeating the background image
                // backgroundPosition: "center", // Centers the background image
              }
            }
          >
            <h2 className="text-4xl font-bold text-center text-[#FFC122]">
              Our Mission
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-center text-lg text-[#FFF]">
              {`At Reading Club AI, we aim to revolutionize the way high quality children's books are written and published, making it affordable and enjoyable for everyone in all languages worldwide.`}
            </p>
          </section>
        )}
        {false && (
          <section
            className="py-12 lg:px-0 px-10"
            style={
              {
                // backgroundImage: "url(/BG-Registro.jpg)",
                // backgroundImage: "url(/BG-Archiv3.jpg)",
                // backgroundImage: "url(/BG-Honeycomb.jpg)",
                // // https://chat.openai.com/c/91c904c0-186c-46b5-817a-2312a35ca980
                // backgroundSize: "cover", // Ensures the background image covers the entire section
                // backgroundRepeat: "no-repeat", // Prevents repeating the background image
                // backgroundPosition: "center", // Centers the background image
              }
            }
          >
            {false && (
              <h2 className="text-4xl font-bold text-center text-[#FFC122] bg-[#FAF8DA]">
                Powerful Features
              </h2>
            )}
            <div className="mt-8-cancel mt-0 max-w-4xl mx-auto grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 text-center">
              <Card className="bg-accent2">
                <CardHeader className="text-[#FFF]">
                  {/* <BotIcon className="w-6 h-6 mx-auto mb-2" /> */}
                  <h3 className="text-2xl font-bold">AI-Powered Writing</h3>
                </CardHeader>
                <CardContent className="text-[#FFF]">
                  <p className="text-lg">
                    Our AI-powered interface helps you generate creative and
                    engaging stories for children 10x faster.
                  </p>
                </CardContent>
              </Card>
              {/* <Card className="bg-[#FFF]">
              <CardHeader className="text-[#000]">
                <PencilIcon className="w-6 h-6 mx-auto mb-2" />
                <h3 className="text-2xl font-semibold">
                  Editing & Proofreading
                </h3>
              </CardHeader>
              <CardContent className="text-[#000]">
                <p className="text-sm">
                  Our team of professional editors ensure your book is polished
                  and ready for publishing.
                </p>
              </CardContent>
            </Card> */}
              <Card className="bg-[#F5911F]">
                <CardHeader className="text-[#FFF]">
                  {/* <BookIcon className="w-6 h-6 mx-auto mb-2" /> */}
                  <h3 className="text-2xl font-bold">Share with Family</h3>
                </CardHeader>
                <CardContent className="text-[#FFF]">
                  <p className="text-lg">
                    {`Create & share stories with your family. It's like Goodreads, but for children's books and your inner circle.`}
                  </p>
                </CardContent>
              </Card>
              {false && (
                <Card className="bg-[#F5911F]">
                  <CardHeader className="text-[#FFF]">
                    {/* <MessageCircleIcon className="w-6 h-6 mx-auto mb-2" /> */}
                    <h3 className="text-2xl font-semibold">Community</h3>
                  </CardHeader>
                  <CardContent className="text-[#FFF]">
                    <p className="text-lg">
                      Join a community of like-minded authors and share your
                      journey.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </section>
        )}

        {false && (
          <section
            className="bg-cover lg:pt-12"
            style={{
              backgroundImage: "url(/BG-Archiv2.jpg)",
              // scrollSnapAlign: "center",
              // border: "5px solid red",
              // paddingLeft: "100%",
              // overflow: "scroll",
            }}
          >
            <div
              ref={scrollContainerRef}
              // className="px-24"
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                // justifyContent: "center",
                // border: "5px solid green",
                // width: "1000px",
                overflow: "scroll",
                // scrollPaddingLeft: 1000,
                // marginLeft: "100%",
              }}
            >
              {data["storiesTiptapFormat"].map((storyData: any, i: number) => {
                // return <>HELLO</>;
                //mobile class
                // const mobileClass = i > 0 ? `hidden` : `flex`;
                const mobileClass = i != 4 ? `hidden` : `flex`;
                return (
                  <div
                    key={`read-editor-${i}`}
                    className={`lg:flex ${mobileClass}`}
                    style={{
                      flexDirection: "column",
                      // flexDirection: "row",
                      alignItems: "center",
                      height: "850px",
                      // minWidth: "500px",
                      minWidth: "60%",
                      // border: "5px solid black",
                    }}
                  >
                    {/* <ReadingClubEditor editorContent={storyData} /> */}
                    <TRCEditorV2
                      editorContent={storyData}
                      key={`trc-editor-${i}`}
                      editorKey={`trc-editor-${i}-LANDING`}
                    />
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {false && (
          <section className="py-12 px-6 bg-[#FAF8DA]">
            <h2 className="text-4xl font-bold text-center text-[#F5911F]">
              Testimonials
            </h2>
            <div className="mt-8 max-w-2xl mx-auto grid gap-6 grid-cols-1 sm:grid-cols-2">
              <Card className="bg-[#FAF8DA]">
                <CardContent className="text-[#F5911F]">
                  <p className="text-sm">
                    {`"The AI writing assistant is amazing. It has made writing so
                    much easier and fun."`}
                  </p>
                  <div className="mt-4 flex items-center">
                    {/* <Avatar
                      className="w-12 h-12"
                      src="/placeholder.svg?height=50&width=50"
                    /> */}
                    <div className="ml-4">
                      <p className="text-sm font-medium">John Doe</p>
                      <p className="text-xs">Author</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-[#FAF8DA]">
                <CardContent className="text-[#F5911F]">
                  <p className="text-sm">
                    {`"The community is very supportive and inspiring. I've
                    learned so much."`}
                  </p>
                  <div className="mt-4 flex items-center">
                    {/* <Avatar
                      className="w-12 h-12"
                      src="/placeholder.svg?height=50&width=50"
                    /> */}
                    <div className="ml-4">
                      <p className="text-sm font-medium">Jane Doe</p>
                      <p className="text-xs">Author</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        )}
      </main>
      <footer className="py-12 px-6 bg-[#FFC122] text-[#FFF]">
        <div className="max-w-4xl mx-auto flex flex-wrap lg:justify-between justify-between gap-x-5 gap-y-5 lg:p-0 px-10 items-start">
          <div>
            {/* <BookIcon className="w-6 h-6 text-[#FFC122]" /> */}
            <span className="text-lg font-bold">Contact us</span>
            {/* <p className="text-sm opacity-80">Ottawa, ON, Canada</p> */}
            <UnstyledExternalLink href="mailto:jose@readingclub.ai">
              <p className="mt-1 text-sm opacity-70 font-bold">
                jose@readingclub.ai
              </p>
            </UnstyledExternalLink>
          </div>
          <div>
            {/* <BookIcon className="w-6 h-6 text-[#FFC122]" /> */}
            <span className="text-lg font-bold">Social</span>
            {/* <p className="text-sm opacity-80">Ottawa, ON, Canada</p> */}
            <UnstyledExternalLink href="https://www.youtube.com/@ReadingClubAI">
              <p className="mt-1 text-sm opacity-70 font-bold">YouTube</p>
            </UnstyledExternalLink>
            <UnstyledExternalLink href="https://www.twitter.com/ReadingClubAI">
              <p className="mt-1 text-sm opacity-70 font-bold">Twitter</p>
            </UnstyledExternalLink>
          </div>
          <div>
            {/* <BookIcon className="w-6 h-6 text-[#FFC122]" /> */}
            <span className="text-lg font-bold">Help and support</span>
            {/* <p className="text-sm opacity-80">Ottawa, ON, Canada</p> */}
            <UnstyledExternalLink href="https://readingclub.canny.io">
              <p className="mt-1 text-sm opacity-70 font-bold">
                Give us feedback
              </p>
            </UnstyledExternalLink>
          </div>
          {/* <div className="mt-4 md:mt-0 text-[#FAF8DA] font-bold text-center">
            <span className="text-lg font-bold opacity-100">
              The Reading Club, Inc.
            </span>
            <p className="text-sm opacity-80">Ottawa, ON, Canada</p>
            <p className="mt-1 text-sm opacity-80">jose@readingclub.ai</p>
          </div> */}
        </div>
      </footer>
    </div>
  );
};
export default Landing3Client;

// // function BookIcon(props) {
// //   return (
// //     <svg
// //       {...props}
// //       xmlns="http://www.w3.org/2000/svg"
// //       width="24"
// //       height="24"
// //       viewBox="0 0 24 24"
// //       fill="none"
// //       stroke="currentColor"
// //       strokeWidth="2"
// //       strokeLinecap="round"
// //       strokeLinejoin="round"
// //     >
// //       <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
// //     </svg>
// //   );
// }

// function BotIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M12 8V4H8" />
//       <rect width="16" height="12" x="4" y="8" rx="2" />
//       <path d="M2 14h2" />
//       <path d="M20 14h2" />
//       <path d="M15 13v2" />
//       <path d="M9 13v2" />
//     </svg>
//   );
// }

// function MessageCircleIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />
//     </svg>
//   );
// }

// function PencilIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
//       <path d="m15 5 4 4" />
//     </svg>
//   );
// }
