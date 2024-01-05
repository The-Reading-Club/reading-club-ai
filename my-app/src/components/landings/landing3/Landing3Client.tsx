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
import ReadingClubEditor from "@/app/editor/ReadingClubEditor";
import { useEffect, useRef, useState } from "react";

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
}

const SocialLink: React.FC<SocialLinkProps> = ({ href, icon }) => {
  return (
    <a
      // className="mt-0 px-8 py-1 bg-[#FFF] text-[#000] rounded hover:bg-[#FCF29A] rounded-full inline-flex items-center justify-center"
      className="mt-0 px-2 py-2 bg-[#FFC122] text-[#FFF] rounded-full hover:bg-[#FCF29A] rounded-full inline-flex items-center justify-center"
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

  return (
    <div
      className="flex flex-col min-h-screen bg-[#FAF8DA]"
      style={
        {
          // backgroundImage: "url(/BG-Archiv3.jpg)",
          // backgroundRepeat: "repeat",
          // backgroundSize: "cover", // Ensures the background image covers the entire section
          // backgroundRepeat: "no-repeat", // Prevents repeating the background image
          // backgroundPosition: "center", // Centers the background image
        }
      }
    >
      <header
        className="px-6 lg:py-1 py-4 flex items-center justify-center"
        style={
          {
            // backgroundImage: "url(/BG-Honeycomb.jpg)",
            // backgroundSize: "cover", // Ensures the background image covers the entire section
            // backgroundRepeat: "no-repeat", // Prevents repeating the background image
            // backgroundPosition: "center", // Centers the background image
          }
        }
      >
        <div className="items-center hidden lg:flex">
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
        mb-10
        lg:mb-0

        mr-0
        lg:mr-9
        "
        >
          <SocialLink
            href="https://www.twitter.com/ReadingClubAI"
            icon={<FaTwitter />}
          />
          <SocialLink
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
            href="https://www.youtube.com/@ReadingClubAI  "
            icon={<FaYoutube />}
          />
          <SocialLink
            href="https://www.tiktok.com/@ReadingClubAI"
            icon={<FaTiktok />}
          />
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
          className="w-full lg:h-[500px] bg-center bg-cover flex items-center justify-center lg:bg-contain lg:pb-0 pb-20"
          // style={{
          //   backgroundImage: "url(/BG-Archiv3.jpg)",
          // }}
          style={{
            backgroundImage: "url(/BG-Registro.jpg)",
            // backgroundRepeat: "repeat",
            // backgroundSize: "contain", // Ensures the background image covers the entire section
            // backgroundRepeat: "no-repeat", // Prevents repeating the background image
            // backgroundPosition: "center", // Centers the background image
            // border: "2px solid red",
          }}
        >
          <div className="text-center text-[#FFC122] p-5">
            <h1 className="lg:text-6xl text-5xl  font-bold">
              {`Write & Publish`}
              <br />
              {`Children's Books with AI`}
            </h1>
            {/* https://tailwind-hover-effects.vercel.app */}
            <Button className="mt-8 px-16 py-8 bg-[#FFF] text-[#FFC122] rounded hover:bg-[#FFF] rounded-full text-2xl font-bold border-4 border-[#FFC122]">
              <Link
                href="https://forms.gle/eDiYjELhFcGiZ58T6"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#3c4043]"
              >
                Join waitlist
              </Link>
            </Button>
            <p className="mt-5 lg:text-2xl text-xl text-bold p-5 lg:p-0 text-[#3c4043]">
              {/* Join our community and start your journey. */}
              Download our learn-to-read app on{" "}
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
          <h2 className="text-4xl font-bold text-center text-[#FFC122] bg-[#FAF8DA]">
            Powerful Features
          </h2>
          <div className="mt-8 max-w-4xl mx-auto grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 text-center">
            <Card className="bg-[#F5911F]">
              <CardHeader className="text-[#FFF]">
                {/* <BotIcon className="w-6 h-6 mx-auto mb-2" /> */}
                <h3 className="text-2xl font-semibold">AI Writing Assistant</h3>
              </CardHeader>
              <CardContent className="text-[#FFF]">
                <p className="text-lg">
                  Our AI assistant helps you generate creative and engaging
                  stories for children.
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
                <h3 className="text-2xl font-semibold">Publishing Support</h3>
              </CardHeader>
              <CardContent className="text-[#FFF]">
                <p className="text-lg">
                  We guide you through the publishing process to make your book
                  available worldwide.
                </p>
              </CardContent>
            </Card>
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
          </div>
        </section>

        {true && (
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
                const mobileClass = i > 0 ? `hidden` : `flex`;
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
                    <ReadingClubEditor
                      // defaultBGClassName="bg-white"
                      // editorContent={testTipTapContentState}
                      editorContent={storyData}
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
      <footer className="py-6 px-6 bg-[#FFC122] text-[#FFF]">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-between items-center">
          <div>
            {/* <BookIcon className="w-6 h-6 text-[#FFC122]" /> */}
            <span className="ml-2 text-lg font-bold">
              The Reading Club, Inc.
            </span>
          </div>
          <div className="mt-4 md:mt-0 text-[#FAF8DA]">
            <p className="text-sm">Ottawa, ON, Canada</p>
            <p className="mt-1 text-sm">contact@thereadingclubapp.com</p>
          </div>
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
