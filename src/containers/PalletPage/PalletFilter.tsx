import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import Slider from "rc-slider";
import React, { Fragment, useState } from "react";
import ButtonThird from "shared/Button/ButtonThird";
import Checkbox from "shared/Checkbox/Checkbox";
import PalletPageStore from "./PalletPageStore";
import { Helmet } from "react-helmet-async";

const PRICE_RANGE = [1, 10000];

const PalletFilter = ({ className = "" }) => {
  const [rangePrices, setRangePrices] = useState([1, 10000]);

  const [manifestState, setManifestState] = useState<string[]>([]);
  const [categoriesState, setCategoriesState] = useState<string[]>([]);
  const [storeState, setStoreState] = useState<string[]>([]);
  const [productConditionState, setProductConditionState] = useState<string[]>(
    []
  );

  const handleChangeCategories = (checked: boolean, name: string) => {
    checked
      ? setCategoriesState([...categoriesState, name])
      : setCategoriesState(categoriesState.filter((i) => i !== name));
  };
  const handleChangeProductCondition = (checked: boolean, name: string) => {
    checked
      ? setProductConditionState([...productConditionState, name])
      : setProductConditionState(
          productConditionState.filter((i) => i !== name)
        );
  };
  const handleChangeStore = (checked: boolean, name: string) => {
    checked
      ? setStoreState([...storeState, name])
      : setStoreState(storeState.filter((i) => i !== name));
  };
  const handleChangeManifest = (checked: boolean, name: string) => {
    checked
      ? setManifestState([...manifestState, name])
      : setManifestState(manifestState.filter((i) => i !== name));
  };

  // categories
  type ICategory = {
    category_id: string;
    category_name: string;
    created_at: string;
    updated_at: string;
    category_status: string;
    cat_id: number;
    condition_id: string;
    condition_name: string;
    store_name: string;
    store_id: string;
    manifest_name: string;
    manifest_id: string;
    manifest_status: string;
  };
  const [allCategories, setAllCategories] = useState<Array<ICategory>>([]);

  React.useEffect(() => {
    const getAllCategories = async () => {
      const response = await fetch(
        "https://darktechteam.com/api/category/all-categories"
      );
      const data = await response.json();
      setAllCategories(data?.result);
    };
    getAllCategories();
  }, []);

  //  condition

  const [allConditions, setAllConditions] = useState<Array<ICategory>>([]);

  React.useEffect(() => {
    const getAllConditions = async () => {
      const response = await fetch(
        "https://darktechteam.com/api/conditions/all-conditions"
      );
      const data = await response.json();
      setAllConditions(data?.result);
    };
    getAllConditions();
  }, []);

  // MainFest

  // Store
  const [allStore, setStore] = useState<Array<ICategory>>([]);
  // console.log(allStore);
  React.useEffect(() => {
    const getStore = async () => {
      const response = await fetch(
        "https://darktechteam.com/api/store/all-stores"
      );
      const data = await response.json();
      setStore(data?.result);
    };
    getStore();
  }, []);

  // const activeCategories = allCategories.filter(
  //   (item) => item.category_status === "active"
  // );

  const renderXClear = () => {
    return (
      <span className="flex-shrink-0 w-4 h-4 rounded-full bg-primary-500 text-white flex items-center justify-center ml-3 cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    );
  };

  const renderTabsCategories = () => {
    return (
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <Popover.Button
              className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border focus:outline-none select-none
                 ${
                   open
                     ? "!border-primary-500 "
                     : "border-neutral-300 dark:border-neutral-700"
                 }
                  ${
                    !!categoriesState.length
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
                  d="M8 2V5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16 2V5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7 13H15"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7 17H12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16 3.5C19.33 3.68 21 4.95 21 9.65V15.83C21 19.95 20 22.01 15 22.01H9C4 22.01 3 19.95 3 15.83V9.65C3 4.95 4.67 3.69 8 3.5H16Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span className="ml-2">Categories</span>
              {!categoriesState.length ? (
                <ChevronDownIcon className="w-4 h-4 ml-3" />
              ) : (
                <span onClick={() => setCategoriesState([])}>
                  {renderXClear()}
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
              <Popover.Panel className="absolute z-40 w-screen max-w-sm px-4 mt-3 left-0 sm:px-0 lg:max-w-md">
                <div className="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                  <div className="relative flex flex-col px-5 py-6 space-y-5">
                    <Checkbox
                      name="All Categories"
                      label="All Categories"
                      defaultChecked={categoriesState.includes("")}
                      onChange={(checked) =>
                        handleChangeCategories(checked, "")
                      }
                    />

                    <div className="w-full border-b border-neutral-200 dark:border-neutral-700" />
                    {allCategories?.map((item) => (
                      <div key={item?.category_id} className="">
                        <Checkbox
                          // value={item?.category_id}
                          name={item?.category_name}
                          label={item?.category_name}
                          defaultChecked={categoriesState.includes(
                            item?.category_id
                          )}
                          onChange={(checked) =>
                            handleChangeCategories(checked, item?.category_id)
                          }
                        />
                      </div>
                    ))}
                  </div>
                  <div className="p-5 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-end justify-end">
                    <ButtonThird
                      onClick={() => {
                        close();
                        setCategoriesState([]);
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
  // ok
  const renderTabManifest = () => {
    return (
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <Popover.Button
              className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border focus:outline-none select-none
                ${open ? "!border-primary-500 " : ""}
                  ${
                    !!manifestState.length
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
                  d="M7.01 18.0001L3 13.9901C1.66 12.6501 1.66 11.32 3 9.98004L9.68 3.30005L17.03 10.6501C17.4 11.0201 17.4 11.6201 17.03 11.9901L11.01 18.0101C9.69 19.3301 8.35 19.3301 7.01 18.0001Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.35 1.94995L9.69 3.28992"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2.07 11.92L17.19 11.26"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3 22H16"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M18.85 15C18.85 15 17 17.01 17 18.24C17 19.26 17.83 20.09 18.85 20.09C19.87 20.09 20.7 19.26 20.7 18.24C20.7 17.01 18.85 15 18.85 15Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span className="ml-2">Manifest</span>
              {!manifestState.length ? (
                <ChevronDownIcon className="w-4 h-4 ml-3" />
              ) : (
                <span onClick={() => setManifestState([])}>
                  {renderXClear()}
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
                  <div className="relative flex flex-col px-5 py-6 space-y-5">
                    {[
                      {
                        manifest_id: 1,
                        manifest_name: "Manifested",
                        manifest_status: "1",
                      },
                      {
                        manifest_id: 2,
                        manifest_name: "Unmanifested",
                        manifest_status: "0",
                      },
                      {
                        manifest_id: 3,
                        manifest_name: "Partially Manifested",
                        manifest_status: "2",
                      },
                    ]?.map((item) => (
                      <div key={item?.manifest_id} className="">
                        <Checkbox
                          name={item?.manifest_name}
                          label={item?.manifest_name}
                          defaultChecked={manifestState.includes(
                            item?.manifest_status
                          )}
                          onChange={(checked) =>
                            handleChangeManifest(checked, item?.manifest_status)
                          }
                        />
                      </div>
                    ))}
                  </div>
                  <div className="p-5 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-end justify-end">
                    <ButtonThird
                      onClick={() => {
                        close();
                        setManifestState([]);
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
  //   ok
  const renderTabProductCondition = () => {
    return (
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <Popover.Button
              className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border focus:outline-none select-none
                ${open ? "!border-primary-500 " : ""}
                  ${
                    !!productConditionState.length
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
                  d="M7.01 18.0001L3 13.9901C1.66 12.6501 1.66 11.32 3 9.98004L9.68 3.30005L17.03 10.6501C17.4 11.0201 17.4 11.6201 17.03 11.9901L11.01 18.0101C9.69 19.3301 8.35 19.3301 7.01 18.0001Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.35 1.94995L9.69 3.28992"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2.07 11.92L17.19 11.26"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3 22H16"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M18.85 15C18.85 15 17 17.01 17 18.24C17 19.26 17.83 20.09 18.85 20.09C19.87 20.09 20.7 19.26 20.7 18.24C20.7 17.01 18.85 15 18.85 15Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span className="ml-2">Product Condition</span>
              {!productConditionState.length ? (
                <ChevronDownIcon className="w-4 h-4 ml-3" />
              ) : (
                <span onClick={() => setProductConditionState([])}>
                  {renderXClear()}
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
                  <div className="relative flex flex-col px-5 py-6 space-y-5">
                    {allConditions.map((item) => (
                      <div key={item?.condition_id} className="">
                        <Checkbox
                          name={item?.condition_name}
                          label={item?.condition_name}
                          defaultChecked={productConditionState.includes(
                            item?.condition_id
                          )}
                          onChange={(checked) =>
                            handleChangeProductCondition(
                              checked,
                              item?.condition_id
                            )
                          }
                        />
                      </div>
                    ))}
                  </div>
                  <div className="p-5 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-end justify-end">
                    <ButtonThird
                      onClick={() => {
                        close();
                        setProductConditionState([]);
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
  //  ok
  const renderTabsStore = () => {
    return (
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <Popover.Button
              className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border focus:outline-none select-none
                ${open ? "!border-primary-500 " : ""}
                  ${
                    !!storeState.length
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

              <span className="ml-2">Store</span>
              {!storeState.length ? (
                <ChevronDownIcon className="w-4 h-4 ml-3" />
              ) : (
                <span onClick={() => setStoreState([])}>{renderXClear()}</span>
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
                  <div className="relative flex flex-col px-5 py-6 space-y-5">
                    {allStore.map((item: any) => (
                      <div key={item?.store_id} className="">
                        <Checkbox
                          name={item?.store_name}
                          label={item?.store_name}
                          defaultChecked={storeState.includes(item?.store_id)}
                          onChange={(checked) =>
                            handleChangeStore(checked, item?.store_id)
                          }
                        />
                      </div>
                    ))}
                  </div>
                  <div className="p-5 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-end justify-end">
                    <ButtonThird
                      onClick={() => {
                        close();
                        setStoreState([]);
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

  const renderTabsPriceRage = () => {
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
                  {renderXClear()}
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
  return (
    <div
      className={`nc-PageCollection ${className}`}
      data-nc-id="PageCollection"
    >
      <Helmet>
        <title>Pallet Page || Global Path Liquidators</title>
      </Helmet>

      <div className="container py-16 lg:pb-28 lg:pt-6 space-y-16 sm:space-y-10 lg:space-y-10">
        <div className="space-y-10 lg:space-y-14">
          <main>
            <h1 className="text-center font-semibold mb-4 text-2xl">
              Pallet Products
            </h1>
            <div className="flex lg:space-x-4">
              {/* FOR DESKTOP */}
              <div className=" lg:flex flex-1 lg:space-x-4 space-y-4 lg:space-y-0">
                {/* {renderTabsPriceRage()} */}
                {renderTabsCategories()}
                {renderTabProductCondition()}
                {renderTabsStore()}
                {renderTabManifest()}
                {renderTabsPriceRage()}
              </div>

              <div className="flex overflow-x-auto lg:hidden space-x-4 "></div>
            </div>

            <PalletPageStore
              categoriesState={categoriesState}
              productConditionState={productConditionState}
              manifestState={manifestState}
              storeState={storeState}
              rangePrices={rangePrices}
            />

            <div className="flex flex-col mt-12 lg:mt-16 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center"></div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default PalletFilter;
