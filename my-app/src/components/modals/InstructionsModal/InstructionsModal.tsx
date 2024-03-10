import { useInstructionsModal } from "@/lib/hooks/useModals";
import React, { useCallback, useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

// import gifTest from "@/../public/gifs/gif-test-2.gif";

import gifInstructions1 from "@/../public/gifs/readingclubai-autocomplete-storybooks-2x-speed.gif";
import gifInstructions2 from "@/../public/gifs/readingclubai-illustrations-storybooks.gif";

import Image from "next/image";
import { cn } from "@/lib/utils";

import useEmblaCarousel from "embla-carousel-react";

import ReactMarkdown from "react-markdown";
import { TrackNextIcon, TrackPreviousIcon } from "@radix-ui/react-icons";

const InlineCode = ({ children }: React.PropsWithChildren) => (
  <code
    style={
      {
        //   backgroundColor: "lightgray",
        //   padding: "2px",
        //   borderRadius: "5px",
      }
    }
    // className="bg-neutral-200 p-1"
    className="bg-secondary text-brownFont p-1"
  >
    {children}
  </code>
);
const renderers = {
  // https://chat.openai.com/c/991524cc-e0a1-4087-adf3-b6145f65078d
  // Use the custom InlineCode component for inline code
  code: (props: any) => {
    return <InlineCode {...props}>{props.children}</InlineCode>;
  },

  // This custom renderer changes the default behavior of the <a> tag
  // to use the Material-UI Link component with the desired styling
  // a: (props: any) => {
  //   return (
  //     <Link
  //       {...props}
  //       target="_blank"
  //       rel="noopener"
  //       style={{ color: "#0077CC" }}
  //     />
  //   );
  // },
};

const instructionsTexts = [
  { label: "Type ```++``` to autocomplete", gif: gifInstructions1 },
  { label: "Use `/` to illustrate", gif: gifInstructions2 },
  //   { label: "Edit prompts to change images", gif: gifInstructions2 },
  //   "Wait for the image to generate",
  //   "Click the Save button to save the image to your gallery",
  //   "Click the Copy button to copy the image to your clipboard",
  //   "Click the Clear button to clear the prompt and image",
];

const InstructionsModal = () => {
  const instructionsModal = useInstructionsModal();

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  //   https://www.embla-carousel.com/get-started/react/
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({
      delay: 7000,
    }),
  ]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    // if (emblaApi) {
    //   console.log(emblaApi.slideNodes()); // Access API
    // }

    if (!emblaApi) {
      return;
    }

    setCount(emblaApi.scrollSnapList().length);
    setCurrent(emblaApi.selectedScrollSnap() + 1);

    emblaApi.on("select", () => {
      console.log("current");
      setCurrent(emblaApi.selectedScrollSnap() + 1);
    });
  }, [emblaApi]);

  //   useEffect(() => {
  //     if (!api) {
  //       return;
  //     }

  //     setCount(api.scrollSnapList().length);
  //     setCurrent(api.selectedScrollSnap() + 1);

  //     api.on("select", () => {
  //       console.log("current");
  //       setCurrent(api.selectedScrollSnap() + 1);
  //     });
  //   }, [api]);

  //   const settings = {
  //     dots: true,
  //     infinite: true,
  //     slidesToShow: 3,
  //     slidesToScroll: 1,
  //     autoplay: true,
  //     speed: 2000,
  //     autoplaySpeed: 10000,
  //     cssEase: "linear",
  //   };

  if (true)
    return (
      <Dialog
        open={instructionsModal.isOpen}
        // open={true}
        onOpenChange={instructionsModal.onClose}
      >
        <DialogContent
        // className="max-w-3xl"
        // className="bg-black"
        >
          {/* <DialogHeader>
            <DialogTitle>Instructions</DialogTitle>
          </DialogHeader> */}
          {/* Apparently it was this dialog description what was screwing the embla carousel up */}
          {/* Not sure, it's probably not this */}
          {/* <DialogDescription
          className="flex grow-0 shrink-0"
          style={{
            border: "2px solid green",
          }}
        > */}
          <div className="embla" ref={emblaRef}>
            <div className="embla__container">
              {instructionsTexts.map((instruction, index) => (
                <div key={`${index}-carousel-item`} className="embla__slide">
                  <div className="flex flex-col gap-5">
                    <h1 className="text-3xl text-darkFont">
                      <ReactMarkdown components={renderers}>
                        {instruction["label"]}
                      </ReactMarkdown>
                    </h1>
                    {/* <span className="text-4xl font-semibold">
           {index + 1}
         </span> */}
                    <Image src={instruction["gif"]} alt="gif" />
                  </div>
                </div>
              ))}

              {/* <div className="embla__slide">Slide 2</div> */}
              {/* <div className="embla__slide">Slide 3</div> */}
            </div>
            {/* <button className="embla__prev" onClick={scrollPrev}>
              Prev
            </button> */}
            {/* <button className="embla__next" onClick={scrollNext}>
              Next
            </button> */}
          </div>
          <div className="py-2 text-center text-sm text-muted-foreground">
            Slide {current} of {count}
          </div>
          {/* </DialogDescription> */}
          <DialogFooter>
            <div className="w-full flex flex-row justify-between">
              <button onClick={scrollPrev}>
                <TrackPreviousIcon />
              </button>
              <button onClick={scrollNext}>
                <TrackNextIcon />
              </button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );

  return (
    <Dialog
      //   open={instructionsModal.isOpen}
      open={true}
      onOpenChange={instructionsModal.onClose}
    >
      <DialogContent
      // className="max-w-3xl"
      // className="bg-black"
      >
        <DialogHeader>
          <DialogTitle>Instructions</DialogTitle>
        </DialogHeader>
        {/* <DialogDescription
          className="flex grow-0 shrink-0"
          style={{
            border: "2px solid green",
          }}
        > */}
        <div className="basis-[100%] grow-0 shrink-0">
          <Carousel
            //   orientation="vertical"
            setApi={setApi}
            //   className="w-full max-w-xs"
            className=""
            style={{
              border: "2px solid red",
              maxWidth: "100%",
            }}
            plugins={[
              Autoplay({
                delay: 2000,
              }),
            ]}
          >
            <CarouselContent className="">
              {Array.from({ length: 3 }).map((_, index) => (
                <CarouselItem
                  key={`${index}-carousel-item`}
                  className=""
                  // className={cn("flex", {
                  //   //   absolute: current !== index,
                  // })}
                >
                  <Card
                    style={{
                      border: "2px solid blue",
                    }}
                  >
                    <CardContent
                      //   DANGER: THIS ONE DAMN THING SOLVED A BUG I AM SURE IT'S THE LIBRARIES FAULT. p-0 don't remove unless sure
                      className="p-0"
                      //   className="flex aspect-square items-center justify-center"
                    >
                      <div className="flex flex-col">
                        <h1 className="text-3xl">Type ++ to autocomplete</h1>
                        {/* <span className="text-4xl font-semibold">
                          {index + 1}
                        </span> */}
                        {/* <Image src={gifTest} alt="gif" /> */}
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          <div className="py-2 text-center text-sm text-muted-foreground">
            Slide {current} of {count}
          </div>
        </div>
        {/* </DialogDescription> */}
        <DialogFooter>
          <button onClick={instructionsModal.onClose}>Next</button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return (
    <Dialog
      //   open={instructionsModal.isOpen}
      open={true}
      onOpenChange={instructionsModal.onClose}
    >
      <DialogContent
      // className="max-w-3xl"
      // className="bg-black"
      >
        <DialogHeader>
          <DialogTitle>Instructions</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          {/* <p>Welcome to the TRC Editor! Here's how to use it:</p>
          <p>1. Type your prompt in the text box.</p>
          <p>2. Click the "Generate" button.</p>
          <p>3. Wait for the image to generate.</p>
          <p>4. Click the "Save" button to save the image to your gallery.</p>
          <p>5. Click the "Copy" button to copy the image to your clipboard.</p>
          <p>6. Click the "Clear" button to clear the prompt and image.</p> */}

          <div
            className="max-w-full"
            style={{
              border: "2px solid red",
            }}
          >
            <Carousel
              setApi={setApi}
              plugins={[
                Autoplay({
                  delay: 2000,
                }),
              ]}
            >
              <CarouselContent>
                <CarouselItem>
                  <Card className="bg-red-100 hidden">
                    <CardContent
                    // className="flex flex-col aspect-square items-center justify-center p-6"
                    //   className="max-w-3xl flex flex-col aspect-square items-center justify-center p-6"
                    >
                      <div>
                        <span>Press ++ for autocomplete</span>
                        {/* <span className="text-4xl font-semibold">
                          {index + 1}
                        </span> */}
                        {/* <Image src={gifTest} alt="gif" /> */}
                      </div>
                      {/* <div> */}
                      {/* <span>Press ++ for autocomplete</span> */}
                      {/* <span className="text-4xl font-semibold">
                        {index + 1}
                      </span> */}
                      {/* <Image src={gifTest} alt="gif" /> */}
                      {/* </div> */}
                    </CardContent>
                  </Card>
                </CarouselItem>
                <CarouselItem>
                  <Card className="bg-red-100">
                    <CardContent
                    // className="flex flex-col aspect-square items-center justify-center p-6"
                    //   className="max-w-3xl flex flex-col aspect-square items-center justify-center p-6"
                    >
                      <div>
                        <span>Press ++ for autocomplete</span>
                        {/* <span className="text-4xl font-semibold">
                          {index + 1}
                        </span> */}
                        {/* <Image src={gifTest} alt="gif" /> */}
                      </div>
                      {/* <div> */}
                      {/* <span>Press ++ for autocomplete</span> */}
                      {/* <span className="text-4xl font-semibold">
                        {index + 1}
                      </span> */}
                      {/* <Image src={gifTest} alt="gif" /> */}
                      {/* </div> */}
                    </CardContent>
                  </Card>
                </CarouselItem>
                <CarouselItem>
                  <Card className="bg-red-100">
                    <CardContent
                    // className="flex flex-col aspect-square items-center justify-center p-6"
                    //   className="max-w-3xl flex flex-col aspect-square items-center justify-center p-6"
                    >
                      <div>
                        <span>Press ++ for autocomplete</span>
                        {/* <span className="text-4xl font-semibold">
                          {index + 1}
                        </span> */}
                        {/* <Image src={gifTest} alt="gif" /> */}
                      </div>
                      {/* <div> */}
                      {/* <span>Press ++ for autocomplete</span> */}
                      {/* <span className="text-4xl font-semibold">
                        {index + 1}
                      </span> */}
                      {/* <Image src={gifTest} alt="gif" /> */}
                      {/* </div> */}
                    </CardContent>
                  </Card>
                </CarouselItem>
                <CarouselItem>
                  <Card className="bg-red-100">
                    <CardContent
                    // className="flex flex-col aspect-square items-center justify-center p-6"
                    //   className="max-w-3xl flex flex-col aspect-square items-center justify-center p-6"
                    >
                      <div>
                        <span>Press ++ for autocomplete</span>
                        {/* <span className="text-4xl font-semibold">
                          {index + 1}
                        </span> */}
                        {/* <Image src={gifTest} alt="gif" /> */}
                      </div>
                      {/* <div> */}
                      {/* <span>Press ++ for autocomplete</span> */}
                      {/* <span className="text-4xl font-semibold">
                        {index + 1}
                      </span> */}
                      {/* <Image src={gifTest} alt="gif" /> */}
                      {/* </div> */}
                    </CardContent>
                  </Card>
                </CarouselItem>
                {false &&
                  Array.from({ length: 3 }).map((_, index) => (
                    <CarouselItem key={index}>
                      <Card className="bg-red-100">
                        <CardContent
                        // className="flex flex-col aspect-square items-center justify-center p-6"
                        //   className="max-w-3xl flex flex-col aspect-square items-center justify-center p-6"
                        >
                          <div>
                            <span>Press ++ for autocomplete</span>
                            {/* <span className="text-4xl font-semibold">
                          {index + 1}
                        </span> */}
                            {/* <Image src={gifTest} alt="gif" /> */}
                          </div>
                          {/* <div> */}
                          {/* <span>Press ++ for autocomplete</span> */}
                          {/* <span className="text-4xl font-semibold">
                        {index + 1}
                      </span> */}
                          {/* <Image src={gifTest} alt="gif" /> */}
                          {/* </div> */}
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
          <div className="py-2 text-center text-sm text-muted-foreground">
            Slide {current} of {count}
          </div>
        </DialogDescription>
        <DialogFooter>
          <button onClick={instructionsModal.onClose}>Next</button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InstructionsModal;
