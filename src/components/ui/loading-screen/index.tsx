import React from "react";
import classes from "./styles.module.scss";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-background/30 backdrop-blur-[2px]">
      <div className="flex gap-2.5">
        {Array.from({ length: 3 }).map((_, index) => (
          <Dot key={index} />
        ))}
      </div>
    </div>
  );
}

function Dot() {
  return <div className={classes.dot} />;
}
