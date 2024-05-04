import React, { FC } from "react";
import Card3Small from "./Card3Small";
import WidgetHeading1 from "./WidgetHeading1";

export interface WidgetPostsProps {
  className?: string;
}

const WidgetPosts: FC<WidgetPostsProps> = ({
  className = "bg-neutral-100 dark:bg-neutral-800",
}) => {
  return (
    <div
      className={`nc-WidgetPosts rounded-3xl overflow-hidden ${className}`}
      data-nc-id="WidgetPosts"
    >
      <WidgetHeading1
        title="🎯 Popular Posts"
        viewAll={{ label: "View all", href: "/#" }}
      />
      <div className="flex flex-col divide-y divide-neutral-200 dark:divide-neutral-700">
        {[1, 1, 1, 1, 1, 1].map((_, index) => (
          <Card3Small
            className="p-4 xl:px-5 xl:py-6 hover:bg-neutral-200 dark:hover:bg-neutral-700"
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

export default WidgetPosts;
