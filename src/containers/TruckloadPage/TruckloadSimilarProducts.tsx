
import React, { useEffect, useId } from 'react';
import Glide from "@glidejs/glide";
import { Link } from 'react-router-dom';
import NcImage from 'shared/NcImage/NcImage';
import Prices from 'components/Prices';
import ButtonPrimary from 'shared/Button/ButtonPrimary';
import BagIcon from 'components/BagIcon';
import Heading from "components/Heading/Heading";
import { useGetAllTruckloadsWithoutQueriesQuery } from 'features/api/truckloadApi';

const TruckloadSimilarProducts = ({ truckload }: any) => {
    // console.log(palletDeal)

    const proId = truckload?.truckload_id;
    const proCat = truckload?.category_name;

    const { data: truckloads, isLoading } = useGetAllTruckloadsWithoutQueriesQuery(undefined)
    console.log(truckloads);

    const remainingTruckloads = truckloads?.result?.filter((item: any) => item?.truckload_id !== proId && item?.category_name === proCat)
    // console.log(remainingPallet)

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


    return (
        <div className="my-8 lg:my-12">
            <div
                className={`nc-SectionSliderCategories container ${UNIQUE_CLASS} flow-root`}
            >
                <Heading
                    className="mb-12 lg:mb-14 text-neutral-900 dark:text-neutral-50"
                    desc=""
                    rightDescText=""
                    hasNextPrev
                >
                    Similar Product
                </Heading>

                {
                    isLoading ? <div className="flex items-center justify-center h-32">
                        <div className="relative">
                            <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
                            <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
                        </div>
                    </div> : <div className="glide__track" data-glide-el="track">
                        {
                            <ul className="glide__slides">
                                {remainingTruckloads?.map((item: any, index: any) => (

                                    <li key={index} className={`glide__slide`}>
                                        <Link
                                            to={`/pallet/product/details/${index}`}
                                            data-nc-id="ProductCard"
                                        >
                                            <div
                                                className={`nc-ProductCard relative flex flex-col bg-transparent border rounded-xl`}
                                                data-nc-id="ProductCard"
                                                key={index}
                                            >
                                                <Link
                                                    to={`/pallet/product/details/${index}`}
                                                    className="absolute inset-0"
                                                ></Link>

                                                <div className="relative flex-shrink-0 bg-slate-50 dark:bg-slate-300 rounded-t-xl overflow-hidden z-1 group">
                                                    <Link to={""} className="block">
                                                        <NcImage
                                                            containerClassName="flex aspect-w-1 aspect-h-1 w-full h-0"
                                                            src={`https://darktechteam.com/api/${item?.product_image}`}
                                                            className="object-cover w-full h-full drop-shadow-xl"
                                                        />
                                                    </Link>
                                                </div>

                                                <div className="space-y-4 px-2.5 pt-5 pb-2.5">
                                                    <div className="flex justify-between items-center ">
                                                        <div>
                                                            <h2
                                                                className={`nc-ProductCard__title text-base font-semibold transition-colors`}
                                                            >
                                                                {item?.product_name}
                                                            </h2>
                                                        </div>
                                                        <Prices price={item?.price} />
                                                    </div>
                                                    <div>
                                                        <div className="flex justify-between items-center ">
                                                            <p
                                                                className={`text-sm text-slate-500 dark:text-slate-400 mt-1 `}
                                                            >
                                                                Category
                                                            </p>
                                                            <p
                                                                className={`text-sm text-natural-500 font-semibold dark:text-green-500 mt-1 `}
                                                            >
                                                                {item?.category_name}
                                                            </p>
                                                        </div>
                                                        <div className="flex justify-between items-center ">
                                                            <p
                                                                className={`text-sm text-slate-500 dark:text-slate-400 mt-1 `}
                                                            >
                                                                Condition
                                                            </p>
                                                            <p
                                                                className={`text-sm text-natural-500 font-semibold dark:text-green-500 mt-1 `}
                                                            >
                                                                {item?.condition_name}
                                                            </p>
                                                        </div>

                                                    </div>

                                                    <div className="flex items-end p-2.5">
                                                        <ButtonPrimary
                                                            className="flex-1 flex-shrink-0 w-full rounded-lg"
                                                        // onClick={() => notifyAddTocart(item.image)}
                                                        >
                                                            <BagIcon className="hidden sm:inline-block w-5 h-5 mb-0.5" />
                                                            <span
                                                                className="ml-3"
                                                            // onClick={() => {
                                                            //     addCart(item?.product_id);
                                                            // }}
                                                            >
                                                                Add to cart
                                                            </span>
                                                        </ButtonPrimary>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </li>
                                ))}

                            </ul>
                        }
                    </div>
                }

            </div>
        </div>
    );
};

export default TruckloadSimilarProducts;