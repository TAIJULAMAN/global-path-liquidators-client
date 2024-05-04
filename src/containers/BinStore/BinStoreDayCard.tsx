import React, { useEffect, useId } from "react";
import Glide from "@glidejs/glide";
import Heading from "components/Heading/Heading";
import { Link } from "react-router-dom";
import { BinProduct, WeekDay } from "./BinStore";
import BinProductCard from "./BinProductCard";

const BinStoreDayCard = (props: {
  key: number;
  dayName: string;
  weeklyProducts: WeekDay;
}) => {
  const { weeklyProducts } = props;
  const id = useId();
  const UNIQUE_CLASS = "glidejs" + id.replace(/:/g, "_");

  useEffect(() => {
    // @ts-ignore
    const OPTIONS: Glide.Options = {
      perView: 4,
      gap: 32,
      bound: true,
      breakpoints: {
        1280: {
          perView: 4,
        },
        1024: {
          gap: 20,
          perView: 3.4,
        },
        768: {
          gap: 20,
          perView: 3,
        },
        640: {
          gap: 20,
          perView: 2.3,
        },
        500: {
          gap: 20,
          perView: 1.4,
        },
      },
    };

    let slider = new Glide(`.${UNIQUE_CLASS}`, OPTIONS);
    slider.mount();
    return () => {
      slider.destroy();
    };
  }, [UNIQUE_CLASS]);

  // console.log(props.day)
  return (
    <div className="my-8 lg:my-12">
      <div
        className={`nc-SectionSliderCategories container ${UNIQUE_CLASS} flow-root`}
      >
        <Heading
          className="mb-12 lg:mb-14 text-neutral-900 dark:text-neutral-50"
          desc=""
          rightDescText="[ All bin items $10.00 each ]"
          hasNextPrev
        >
          $10.00 {props.dayName}
        </Heading>
        <div className="glide__track" data-glide-el="track">
          {weeklyProducts?.products && (
            <ul className="glide__slides">
              {weeklyProducts?.products?.length > 0 &&
                weeklyProducts?.products
                  ?.slice(0, 5)
                  ?.map((bin: BinProduct, index: number) => (
                    <BinProductCard item={bin} key={index} />
                  ))}
              {weeklyProducts?.products?.length > 4 ?
                <li className={`glide__slide`}>
                  <div
                    className={`flex-1 relative w-full h-0 rounded-xl overflow-hidden group aspect-w-11 aspect-h-12 bg-slate-100 dark:bg-slate-300`}
                  >
                    <div>
                      <div className="absolute inset-y-6 inset-x-10 flex flex-col sm:items-center justify-center">
                        <div className="flex relative text-slate-900">
                          <span className="text-lg font-semibold ">
                            More collections
                          </span>
                          <svg
                            className="absolute left-full w-5 h-5 ml-2 rotate-45 group-hover:scale-110 transition-transform"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M18.0701 9.57L12.0001 3.5L5.93005 9.57"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeMiterlimit="10"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                            <path
                              d="M12 20.4999V3.66992"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeMiterlimit="10"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                          </svg>
                        </div>
                        <span className="text-sm mt-1 text-slate-800">
                          Show me more
                        </span>
                      </div>
                    </div>
                    <Link
                      //  dayName={day}
                      to={`/bin-store/products/${props?.dayName}`}
                      state={{ weekly_products: weeklyProducts }}
                      className="opacity-0 group-hover:opacity-100 absolute inset-0 bg-black bg-opacity-10 transition-opacity"
                    ></Link>
                  </div>
                </li> : <></>
              }
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default BinStoreDayCard;
