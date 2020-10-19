const heading = ["font-inter", "font-bold"];

const config = {
  // Components
  "c.heading": heading,
  "c.headingScrollMargin": "scroll-margin-heading",
  "c.h1": [...heading, "text-5xl"],
  "c.h2": [...heading, "text-4xl"],
  "c.h3": [...heading, "text-3xl"],
  "c.h4": [...heading, "text-2xl"],
  "c.h5": [...heading, "text-xl"],
  "c.h6": [...heading, "text-lg"],
  "c.container": ["block", "mx-auto", "max-w-5xl", "px-4"],
  "c.navLink": [
    "font-bold",
    "text-copy",
    "hover:text-primary",
    "focus:text-primary",
    "no-underline",
  ],
  // Utilities
  "u.border": ["border-line", "border-4"],
};

export const cx = (...classNames: (keyof typeof config | ({} & string))[]) =>
  classNames
    .map((className) =>
      config.hasOwnProperty(className) ? config[className] : className
    )
    .flat()
    .filter(Boolean)
    .join(" ");
