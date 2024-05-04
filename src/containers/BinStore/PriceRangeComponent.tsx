import { Popover, Transition } from "@headlessui/react";
import Slider from "rc-slider";
import React, { Fragment } from "react";
import ButtonThird from "shared/Button/ButtonThird";
import RenderXClear from "./RenderXClear";

const PriceRangeComponent = ({
  setRangePrices,
  rangePrices,
}: {
  setRangePrices: React.Dispatch<React.SetStateAction<number[]>>;
  rangePrices: Array<number>;
}) => {
  const PRICE_RANGE = [1, 100000];

  return (
    <Popover className="relative">
      {({ open, close }) => (
        <>
          <Popover.Button
            className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border border-primary-500 bg-primary-50 text-primary-900 focus:outline-none `}
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.67188 14.3298C8.67188 15.6198 9.66188 16.6598 10.8919 16.6598H13.4019C14.4719 16.6598 15.3419 15.7498 15.3419 14.6298C15.3419 13.4098 14.8119 12.9798 14.0219 12.6998L9.99187 11.2998C9.20187 11.0198 8.67188 10.5898 8.67188 9.36984C8.67188 8.24984 9.54187 7.33984 10.6119 7.33984H13.1219C14.3519 7.33984 15.3419 8.37984 15.3419 9.66984"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 6V18"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <span className="ml-2 min-w-[90px]">{`${rangePrices[0]}$ - ${rangePrices[1]}$`}</span>
            {rangePrices[0] === PRICE_RANGE[0] &&
            rangePrices[1] === PRICE_RANGE[1] ? null : (
              <span onClick={() => setRangePrices(PRICE_RANGE)}>
                <RenderXClear />
              </span>
            )}
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute z-40 w-screen max-w-sm px-4 mt-3 left-0 sm:px-0 ">
              <div className="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                <div className="relative flex flex-col px-5 py-6 space-y-8">
                  <div className="space-y-5">
                    <span className="font-medium">Price range</span>
                    <Slider
                      range
                      min={PRICE_RANGE[0]}
                      max={PRICE_RANGE[1]}
                      step={1}
                      defaultValue={[rangePrices[0], rangePrices[1]]}
                      allowCross={false}
                      onChange={(_input: number | number[]) =>
                        setRangePrices(_input as number[])
                      }
                    />
                  </div>

                  <div className="flex justify-between space-x-5">
                    <div>
                      <label
                        htmlFor="minPrice"
                        className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                      >
                        Min price
                      </label>
                      <div className="mt-1 relative rounded-md">
                        <span className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-neutral-500 sm:text-sm">
                          $
                        </span>
                        <input
                          type="text"
                          name="minPrice"
                          id="minPrice"
                          className="block w-32 pr-10 pl-4 sm:text-sm border-neutral-200 dark:border-neutral-700 rounded-full bg-transparent"
                          value={rangePrices[0]}
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="maxPrice"
                        className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                      >
                        Max price
                      </label>
                      <div className="mt-1 relative rounded-md">
                        <span className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-neutral-500 sm:text-sm">
                          $
                        </span>
                        <input
                          type="text"
                          name="maxPrice"
                          id="maxPrice"
                          className="block w-32 pr-10 pl-4 sm:text-sm border-neutral-200 dark:border-neutral-700 rounded-full bg-transparent"
                          value={rangePrices[1]}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-5 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-end justify-end">
                  <ButtonThird
                    onClick={() => {
                      setRangePrices(PRICE_RANGE);
                      close();
                    }}
                    sizeClass="px-4 py-2 sm:px-5"
                  >
                    Clear
                  </ButtonThird>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default PriceRangeComponent;
