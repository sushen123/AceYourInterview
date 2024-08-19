import { cn } from "@/lib/utils";
import {
  IconAdjustmentsBolt,
  IconAutomation,
  IconCloud,
  IconCurrencyDollar,
  IconDeviceLaptop,
  IconEaseInOut,
  IconHeart,
  IconHelp,
  IconPaperclip,
  IconRouteAltLeft,
  IconSourceCode,
  IconTerminal2,
} from "@tabler/icons-react";

export function FeaturesSectionDemo() {
  const features = [
    {
      title: "Built for Everyone",
      description:
        "Students, professionals, dreamers, and doers—we've got you covered.",
      icon: <IconTerminal2 />,
    },
    {
      title: "User-Friendly Interface",
      description:
        "Experience a seamless and intuitive interface.",
      icon: <IconEaseInOut />,
    },
    {
      title: "Mock Interviews",
      description: "Practice with real engineers to boost your confidence.",
      icon: <IconDeviceLaptop />,
    },
    {
      title: "Resume Builder",
      description: "Create a professional resume with ease.",
      icon: <IconPaperclip />,
    },
    {
      title: "Automated Job Applications",
      description: "Apply for jobs that match your skills automatically.",
      icon: <IconAutomation/>,
    },
    {
      title: "Affordable Pricing",
      description:
        "Best prices in the market—no hidden fees, no credit card required.",
      icon: <IconCurrencyDollar />,
    },
 

  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  relative z-10 py-10 max-w-7xl mx-auto">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r  py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-40 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-40 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
        {icon}
      </div>
      <div className="text-lg text-left font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
        <span className=" group-hover/feature:translate-x-2 transition duration-200 inline-block  dark:text-neutral-100  ">
          {title}
        </span>
      </div>
      <p className="text-sm text-left dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};
