import * as React from "react";
import { config } from "../theme.config";

interface IHeroProps {
  className: string;
}

export const Hero: React.FC<IHeroProps> = ({ className }) => (
  <header className={`pt-4 flex flex-col flex-no-wrap flex-gap-4 ${className}`}>
    <p className="font-bold text-5xl sm:text-6xl">{config.title}</p>
    <blockquote className="text-xl border-0 pl-0 not-italic">
      (estonian) ˈrɑːm <strong className="italic">n.</strong> frame.
    </blockquote>
    <p className="font-bold text-xl">{config.description()}</p>
  </header>
);
