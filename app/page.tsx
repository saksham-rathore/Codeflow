"use client";

import Image from "next/image";
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { ProjectsView } from "./features/projects/components/projects-view";

export default function Home() {
  return (
    <ProjectsView />
  )
}