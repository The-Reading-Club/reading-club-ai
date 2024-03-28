"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Header from "@/components/auth/Header";
import Social from "@/components/auth/Social";

import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import BackButton from "../BackButton";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel?: string;
  backButtonHref: string;
  showSocial?: boolean;
}

const CardWrapper: React.FC<CardWrapperProps> = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
}) => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent className="p-6 pt-0">{children}</CardContent>
      {showSocial && (
        <CardFooter>
          {/* <div className="w-full flex flex-col gap-y-2">
            <p className="text-muted-foreground text-sm">Or continue with</p>
            <div className="w-full flex flex-row gap-x-2">
              <button className="w-full flex items-center justify-center bg-primary text-white rounded-md py-2">
                Google
              </button>
              <button className="w-full flex items-center justify-center bg-primary text-white rounded-md py-2">
                Facebook
              </button>
            </div>
          </div> */}
          <Social />
        </CardFooter>
      )}
      <CardFooter>
        {backButtonLabel && (
          <BackButton label={backButtonLabel} href={backButtonHref} />
        )}
      </CardFooter>
    </Card>
  );
};

export default CardWrapper;
