"use client";

import { ExpandableCardDemo } from "@/components/Features";
import { TiltEffect } from "@/components/ui/hoverTilt";
import { LinkPreview } from "@/components/ui/link-preview";
import { ButtonShootingStarBorder } from "@/components/ui/styleButton";

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="m-1">
      <div className="fixed flex items-center justify-around  ">
        <div className="flex items-center m-3 w-screen ">
          <Image
            style={{
              width: "auto",
              height: "auto",
            }}
            src={"/logo.png"}
            width={30}
            height={30}
            alt="logo"
          />
          <h1 className="font-semibold text-lg text-blue-400 ml-2">
            AceYourInterview
          </h1>
        </div>

        <div className="w-full flex justify-around sm:ml-14 md:ml-32 lg:ml-56">
         <ButtonShootingStarBorder text={"Login"} className="" onClick={onclick} key={"1"} textClass= ""  />

        </div>
      </div>
       
        <div className=" md:grid md:grid-row md:grid-cols-2 h-screen">
          <div className=" flex flex-col justify-center pl-6 sm:pl-20 col-span-1 w-screen md:w-auto h-screen">
            <h1 className="flex items-center  text-4xl font-medium text-neutral-400">
              Ace Your Interview
              <span className="relative mx-2 h-[1em] w-56 overflow-hidden text-blue-500">
                <span className="absolute h-full w-full -translate-y-full animate-slide leading-none text-blue-500">
                  Learn
                </span>
                <span className="absolute h-full w-full -translate-y-full animate-slide leading-none text-green-500 [animation-delay:0.83s]">
                  Practice
                </span>
                <span className="absolute h-full w-full -translate-y-full animate-slide leading-none text-red-400 [animation-delay:1.83s]">
                  Perfect
                </span>
              </span>
            </h1>
            <p className="mt-3 text-left text-xl  text-slate-500 mr-10  ">
            Practice your skills the way they are meant to be practiced - in a real interview setting. AceYourInterview is a  platform that provides the most popular Data Structures, Algorithms and Front-end technical questions asked in a Technical Interview Round, Resumer Building and Many More.
            </p>

            <h1 className="mt-5 text-2xl text-blue-400">Click Here To Explore</h1>
            <div className="flex justify-start mt-5 ">
              <button className="group relative inline-flex h-[calc(48px+8px)] items-center justify-center rounded-full bg-gradient-to-tr from-blue-500 to-green-500 shadow-lg py-1 pl-6 pr-14 font-medium text-neutral-50">
                <span className="z-10 pr-2">
                  <LinkPreview
                    url="https://tailwindcss.com/docs/gradient-color-stops"
                    className="font-semibold bg-clip-text text-transparent  text-white "
                  >
                    Get Started
                  </LinkPreview>
                </span>
                <div className="absolute right-1 inline-flex h-12 w-12 items-center justify-end rounded-full bg-gradient-to-tr from-red-500 to-blue-400 transition-[width] group-hover:w-[calc(100%-8px)]">
                  <div className="mr-3.5 flex items-center justify-center">
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-neutral-50"
                    >
                      <path
                        d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                        fill="currentColor"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </div>
              </button>
            </div>
          </div>
          <div className="items-center flex justify-center mt-10  ">
            <TiltEffect />
        </div>     
      </div>
      <div className="text-center mt-80 md:mt-20 ">
          <h1 className="text-blue-500 font-semibold text-3xl">Features</h1>
          <ExpandableCardDemo />
         </div>
    </div>
  );
}
