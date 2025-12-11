"use client";
import * as React from "react";
import { motion } from "framer-motion";

type MotionTag = keyof typeof motion;

type Props<Tag extends MotionTag> = {
  tag?: Tag;
} & React.ComponentProps<(typeof motion)[Tag]>;

export default function MotionWrapper<Tag extends MotionTag>({
  tag = "div" as Tag,
  ...props
}: Props<Tag>) {
  const Component = motion[tag] as React.ElementType;
  return (
    <Component
      {...{
        transition: { duration: 0.5, ease: "easeInOut" },
      }}
      {...props}
    />
  );
}
