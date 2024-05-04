import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import React, { Fragment } from "react";
import ButtonThird from "shared/Button/ButtonThird";
import Checkbox from "shared/Checkbox/Checkbox";
import RenderXClear from "./RenderXClear";

const FilterComponent = ({
  data,
  filterString,
  filterTitle,
  setUrlQuery,
  setFilterData,
  filterData,
}: {
  data: Array<Record<string, any>>;
  filterString: string;
  filterTitle: string;
  setUrlQuery: React.Dispatch<React.SetStateAction<string>>;
  setFilterData: React.Dispatch<React.SetStateAction<number[]>>;
  filterData: number[];
}) => {
  const handleChange = (checked: boolean, name: number) => {
    checked
      ? setFilterData((prev) => [...prev, name])
      : setFilterData(filterData.filter((i) => i !== name));
  };
  return (
    <div>
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <Popover.Button
              className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border focus:outline-none select-none
                ${open ? "!border-primary-500 " : ""}
                  ${
                    !!filterData.length
                      ? "!border-primary-500 bg-primary-50 text-primary-900"
                      : "border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-500"
                  }
                  `}
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 9V3H15"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3 15V21H9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21 3L13.5 10.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10.5 13.5L3 21"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span className="ml-2">{filterTitle}</span>
              {!filterData.length ? (
                <ChevronDownIcon className="w-4 h-4 ml-3" />
              ) : (
                <span onClick={() => setFilterData([])}>
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
              <Popover.Panel className="absolute z-40 w-screen max-w-sm px-4 mt-3 left-0 sm:px-0 lg:max-w-sm">
                <div className="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                  {filterString === "store" && (
                    <div className="relative flex flex-col px-5 py-6 space-y-5">
                      {data?.map((item: any) => (
                        <div key={item?.store_id} className="">
                          <Checkbox
                            name={item?.store_name}
                            label={item?.store_name}
                            defaultChecked={filterData.includes(item?.store_id)}
                            onChange={(checked) =>
                              handleChange(checked, item?.store_id)
                            }
                          />
                        </div>
                      ))}
                    </div>
                  )}{" "}
                  {filterString === "condition" && (
                    <div className="relative flex flex-col px-5 py-6 space-y-5">
                      {data?.map((item: any) => (
                        <div key={item?.condition_id} className="">
                          <Checkbox
                            name={item?.condition_name}
                            label={item?.condition_name}
                            defaultChecked={filterData.includes(
                              item?.condition_id
                            )}
                            onChange={(checked) =>
                              handleChange(checked, item?.condition_id)
                            }
                          />
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="p-5 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-end justify-end">
                    <ButtonThird
                      onClick={() => {
                        close();
                        setFilterData([]);
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
    </div>
  );
};

export default FilterComponent;
