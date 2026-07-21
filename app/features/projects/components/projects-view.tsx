"use client";

import { Poppins } from "next/font/google";
import { Svg } from "./Svg";
import { SparkleIcon } from "lucide-react";
import { FaGithub } from "react-icons/fa";

const font = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"]
})

export const ProjectsView = () => {
    return (
        <div className="min-h-screen bg-[oklch(14.1%_0.005_285.823)]">
            <div className="justify-center text-3xl text-white items-center pt-48">
                <div className={`flex ml-160 p-5 text-4xl ${font.className}`}>
                    <Svg />
                    Codeflow
                </div>
                <div className="flex justify-center gap-10">
                    <div className="h-40 w-70 border border-gray-800 bg-[oklch(14.8%_0.004_228.8)] rounded-xl">
                        <div className="m-5">
                            <SparkleIcon className="text-gray-300" size={35} />
                            <h1 className="text-xl font-bold mt-13">New</h1>
                        </div>
                    </div>
                    <div className="h-40 w-70 border border-gray-800 bg-[oklch(14.8%_0.004_228.8)] rounded-xl">
                        <FaGithub className="m-5 text-gray-300" size={35} />
                        <h1 className="text-xl font-bold mt-13 ml-5">Import</h1>
                    </div>
                </div>
            </div>
        </div>
    );
};