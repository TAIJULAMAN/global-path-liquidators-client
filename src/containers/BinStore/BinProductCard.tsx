import BagIcon from "components/BagIcon";
import NotifyAddToCartProduct from "components/NotifyAddToCartProduct";
import Prices from "components/Prices";
import {
  useCreateCartItemsMutation,
  useGetCartItemsQuery,
} from "features/api/cartApi";
import { useGetDealBySignQuery } from "features/api/dealApi";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import NcImage from "shared/NcImage/NcImage";
import Swal from "sweetalert2";

const BinProductCard = ({
  item,
  key,
}: {
  item: Record<string, any>;
  key: number;
}) => {
  const navigate = useNavigate();
  let userDetails: any;
  const userDetailsString = localStorage.getItem("UserDetails");
  if (userDetailsString !== null) {
    userDetails = JSON.parse(userDetailsString);
  } else {
    // Handle the case where "UserDetails" is not present in localStorage
  }
  const userId = userDetails?.user?.user_id;

  const { data: cart } = useGetCartItemsQuery(userId);

  //already added work start when item already added in cart=========

  const [duplicateMap, setDuplicateMap] = useState<Record<string, any>>({});

  useEffect(() => {
    // Initialize the state based on cart items on page load
    const initialDuplicateMap: Record<string, any> = {};
    cart?.result?.forEach((item: any) => {
      initialDuplicateMap[item.product_id] = item;
    });
    setDuplicateMap(initialDuplicateMap);
  }, [cart]);

  const { data: dealTypeData, isLoading: dealTypeLoading } =
    useGetDealBySignQuery("bin", {
      refetchOnMountOrArgChange: true,
    });

  const [binDealInfo, setBinDealInfo] = useState<any>({});
  useEffect(() => {
    if (!dealTypeLoading) {
      // console.log(dealTypeData?.result);
      setBinDealInfo(dealTypeData?.result);
    }
  }, [dealTypeLoading, dealTypeData]);
  const addCart = (productId: any) => {
    if (userDetails) {
      handleAddtoCart(productId);
    } else {
      navigate("/login");
    }
  };
  const notifyAddToCart = (id: any) => {
    toast.custom((t) => <NotifyAddToCartProduct show={t.visible} id={id} />, {
      position: "top-right",
      id: "nc-product-notify",
      duration: 3000,
    });
  };

  const [createCartItem] = useCreateCartItemsMutation();

  const handleAddtoCart = async (productId: any) => {
    const duplicate = cart?.result?.find(
      (item: any) => item.product_id === productId
    );

    if (duplicate) {
      Swal.fire({
        icon: "error",
        toast: true,
        title: "Item already added to cart",
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    } else {
      try {
        const user_id = userId;
        const product_id = productId;
        const deal_type_id = binDealInfo?.deal_type_id;
        const addItem = { user_id, product_id, deal_type_id };

        await createCartItem(addItem)
          .then((res) => {
            notifyAddToCart(productId);
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              toast: true,
              title: "Failed to add item to cart",
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
            });
            console.error("Error uploading product:", err);
          }); // console.log(response);
      } catch (error) {
        console.error("Error uploading product:", error);
      }
    }
  };
  return (
    <div
      className={`nc-ProductCard relative flex flex-col bg-transparent border rounded-xl`}
      data-nc-id="ProductCard"
      key={item?.bin_id}
    >
      <Link
        to={`/bin-store/product/details/${item?.bin_id}`}
        state={{ bin: item }}
        className="absolute inset-0"
      ></Link>

      <div className="relative flex-shrink-0 bg-slate-50 dark:bg-slate-300 rounded-t-xl overflow-hidden z-1 group">
        <Link
          to={`/bin-store/product/details/${item?.bin_id}`}
          state={{ bin: item }}
          className="block"
        >
          <NcImage
            containerClassName="flex aspect-w-11 aspect-h-12 w-full h-0"
            src={`https://darktechteam.com/api/${item?.product_image}`}
            className="object-cover w-full h-full drop-shadow-xl"
          />
        </Link>
      </div>

      <div className="space-y-4 px-2.5 pt-5 pb-2.5">
        {/* {renderVariants()}  */}

        <div className="flex justify-between items-center ">
          <div>
            <h2
              className={`nc-ProductCard__title text-base font-semibold transition-colors`}
            >
              {item.product_name}
            </h2>
          </div>
          <Prices price={10} />
        </div>

        <div className="flex items-end p-3 ">
          <ButtonPrimary
            className={`flex-1 flex-shrink-0 w-full rounded-lg ${duplicateMap[item?.product_id] !== undefined
              ? "disabled opacity-50"
              : ""
              }`}
            onClick={() => {
              addCart(item?.product_id);
            }}
            disabled={duplicateMap[item?.product_id] !== undefined}
          >
            <BagIcon className="hidden sm:inline-block w-5 h-5 mb-0.5" />
            <span className="ml-3">Add To Cart</span>
          </ButtonPrimary>
        </div>
      </div>
    </div>
  );
};

export default BinProductCard;
