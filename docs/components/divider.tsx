export interface DividerGridProps {
  className: string;
  variant?: "grayscale" | "tailwind" | "stitches";
}

export const DividerGrid: React.FC<DividerGridProps> = ({
  className = "mt-8",
  variant = "grayscale",
}) => (
  <div aria-hidden="true" className={className}>
    <div className="flex flex-row flex-wrap flex-gap-4">
      {Array.from({ length: 36 }).map((_, i, arr) => (
        <div
          key={i}
          style={{ opacity: i === 0 ? 1 : 1 - (1 / arr.length) * i }}
          className={[
            {
              grayscale: "bg-gray-900 dark:bg-gray-500",
              tailwind:
                "bg-gradient-to-br from-green-300 to-blue-300 dark:from-green-800 dark:to-blue-800",
              stitches: "bg-purple-500 dark:bg-purple-900",
            }[variant],
            "w-10",
            "h-10",
            "rounded-md",
          ].join(" ")}
        />
      ))}
    </div>
  </div>
);
