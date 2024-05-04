import React, { FC, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { BinProduct } from "./BinStore";
import BinProductCard from "./BinProductCard";
import FilterComponent from "./FilterComponent";
import PriceRangeComponent from "./PriceRangeComponent";
import { useGetAllbinstoreQuery } from "features/api/binStore";

export interface SectionGridFeatureItemsProps {
  data?: BinProduct[];
}

const convertISODateToYYYYMMDD = (isoDateString: any) => {
  const date = new Date(isoDateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const BinStoreProducts: FC<SectionGridFeatureItemsProps> = () => {
  const { dayName } = useParams();
  const { weekly_products } = useLocation().state;

  const [metaData, setMetaData] = useState({
    page: 1,
    limit: 10,
    totalPages: 1,
    totalProducts: 2,
  });
  const [allProducts, setAllProducts] = useState<BinProduct[]>([]);
  const [allStore, setStore] = useState<Array<Record<string, any>>>([]);
  const [allConditions, setAllConditions] = useState<
    Array<Record<string, any>>
  >([]);

  const [urlQuery, setUrlQuery] = useState(
    `feature_date_from=${convertISODateToYYYYMMDD(
      weekly_products?.date
    )}&feature_date_to=${convertISODateToYYYYMMDD(weekly_products?.date)}`
  );
  const [filterCondition, setFilterCondition] = useState<number[]>([]);
  const [filterStore, setFilterStore] = useState<number[]>([]);
  const [rangePrices, setRangePrices] = useState([1, 100000]);

  const { data: binStoreData, isLoading: binStoreDataLoading } =
    useGetAllbinstoreQuery(urlQuery, {
      refetchOnFocus: true,
      refetchOnReconnect: true,
      refetchOnMountOrArgChange: true,
    });
  // console.log(rangePrices);
  useEffect(() => {
    setUrlQuery(
      `feature_date_from=${convertISODateToYYYYMMDD(
        weekly_products?.date
      )}&feature_date_to=${convertISODateToYYYYMMDD(weekly_products?.date)}
      &page=${metaData.page}&limit=${metaData.limit}
      ${
        filterStore?.length
          ? "&" +
            filterStore?.map((store: any) => `store_id=${store}`).join("&")
          : ""
      }${
        filterCondition?.length
          ? "&" +
            filterCondition
              ?.map((condition: any) => `condition_id=${condition}`)
              .join("&")
          : ""
      }`
    );
  }, [
    filterStore,
    filterCondition,
    weekly_products?.date,
    rangePrices,
    metaData,
  ]);

  useEffect(() => {
    if (!binStoreDataLoading) {
      setAllProducts(binStoreData?.result);
      setMetaData(binStoreData?.meta);
    }
  }, [binStoreDataLoading, setAllProducts, binStoreData]);
  // console.log(binStoreData);

  // !* Store Filtering
  React.useEffect(() => {
    const getStore = async () => {
      const response = await fetch(
        "https://darktechteam.com/api/store/all-stores"
      );
      const data = await response.json();
      setStore(data?.result);
    };
    getStore();
    const getAllConditions = async () => {
      const response = await fetch(
        "https://darktechteam.com/api/conditions/all-conditions"
      );
      const data = await response.json();
      setAllConditions(data?.result);
    };
    getAllConditions();
  }, []);

  // !* Condition Filtering

  return (
    <>
    <div className="container relative space-y-8 mb-16 mt-8  lg:mb-24 lg:mt-12">
      <div>
        <div className="mb-12 lg:mb-14 text-center text-xl md:text-4xl text-neutral-900 dark:text-neutral-50">
          <span className="font-semibold ">{dayName}</span>
          <span> [ All bin items $10.00 each ]</span>
        </div>
      </div>
      <div className="container py-16 lg:pb-28 lg:pt-6 space-y-16 sm:space-y-10 lg:space-y-10">
        <div className="space-y-10 lg:space-y-14">
          <main>
            <div className="flex lg:space-x-4">
              <div className=" lg:flex flex-1 lg:space-x-4 space-y-4 lg:space-y-0">
                <FilterComponent
                  data={[...allConditions]}
                  filterString="condition"
                  filterTitle="Product Condition"
                  setUrlQuery={setUrlQuery}
                  setFilterData={setFilterCondition}
                  filterData={filterCondition}
                />
                <FilterComponent
                  data={[...allStore]}
                  filterString="store"
                  filterTitle="Store"
                  setUrlQuery={setUrlQuery}
                  setFilterData={setFilterStore}
                  filterData={filterStore}
                />
                {/* <PriceRangeComponent
                  setRangePrices={setRangePrices}
                  rangePrices={rangePrices}
                /> */}
              </div>
            </div>
          </main>
          {!binStoreDataLoading ? (
            <div>
              {allProducts?.length ? (
                <div
                  className={`grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 `}
                >
                  {allProducts?.map((item, index) => (
                    // <ProductCard data={item} key={index} />
                    <BinProductCard item={item} key={index} />
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center h-24 mx-auto">
                  <p className="text-2xl text-dark">Products not available</p>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center h-screen">
              <div className="relative">
                <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
                <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
              </div>
            </div>
          )}
        </div>
      </div>

      <nav className="flex items-center justify-end space-x-2 mt-5">
        <button
          className="text-gray-400 hover:text-primary p-4 inline-flex items-center gap-2  rounded-md"
          disabled={metaData?.page === 1}
          onClick={(e) =>
            setMetaData((prev) => {
              return {
                ...prev,
                page: prev.page - 1,
              };
            })
          }
        >
          <span aria-hidden="true">«</span>
          <span className="sr-only">Previous</span>
        </button>

        <span className="rounded-lg bg-primary-200 p-3 inline-block">
          {metaData?.page}
        </span>

        <button
          className="text-gray-400 hover:text-primary p-4 inline-flex items-center gap-2  rounded-md"
          disabled={metaData?.page === metaData?.totalPages}
          onClick={() =>
            setMetaData((prev) => {
              return {
                ...prev,
                page: prev.page + 1,
              };
            })
          }
        >
          <span className="sr-only">Next</span>
          <span aria-hidden="true">»</span>
        </button>
      </nav>
    </div>
    </>
  );
};

export default BinStoreProducts;
