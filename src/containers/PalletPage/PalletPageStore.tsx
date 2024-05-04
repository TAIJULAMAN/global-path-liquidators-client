import BagIcon from "components/BagIcon";
import NotifyAddToCartProduct from "components/NotifyAddToCartProduct";
import NotifyAddTocart from "components/NotifyAddTocart";
import Prices from "components/Prices";
import {
  useCreateCartItemsMutation,
  useGetCartItemsQuery,
} from "features/api/cartApi";
import {
  useGetAllPalletDealsQuery,
  useGetAllPalletDealsWithoutStateQuery,
} from "features/api/palletApi";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import NcImage from "shared/NcImage/NcImage";
import Swal from "sweetalert2";
import config from "utils/config";

interface PalletPageStoreProps {
  categoriesState: any;
  productConditionState: any;
  manifestState: any;
  storeState: any;
  rangePrices: any;
}

const PalletPageStore: React.FC<PalletPageStoreProps> = ({
  categoriesState,
  productConditionState,
  manifestState,
  storeState,
  rangePrices,
}) => {
  // console.log(storeState);
  // console.log(productConditionState);

  // Filter out empty strings
  const filteredArray = manifestState?.filter((item: any) => item !== "");
  // Join the filtered array elements with commas
  const manifest_statuss = filteredArray.join(",");

  const [condition_id] = productConditionState.slice(-2);
  const [category_id] = categoriesState.slice(-2);
  const [store_id] = storeState.slice(-2);
  // console.log(rangePrices);
  const amounts = rangePrices;
  const [startAmt, endAmount] = amounts;
  // Define states for perPage and page
  const [perPage, setPerPage] = useState(16);
  const [page, setPage] = useState(1);

  // Function to handle page change
  const handlePageChange = (pageNumber: any) => {
    setPage(pageNumber);
  };

  // Function to handle perPage change
  const handlePerPageChange = (perPageValue: any) => {
    setPerPage(perPageValue);
  };

  // Construct queries object with updated perPage and page values
  const queries = {
    category_id: !category_id ? null : category_id,
    condition_id: !condition_id ? null : condition_id,
    manifest_status: !manifest_statuss ? null : manifest_statuss,
    store_id: !store_id ? null : store_id,
    price_min: !startAmt ? null : startAmt,
    price_max: !endAmount ? null : endAmount,
    perPage: perPage, // Updated perPage value
    page: page, // Updated page value
  };

  // Call useGetAllPalletDealsQuery hook with updated queries object
  const { data: palletDeals, isLoading } = useGetAllPalletDealsQuery(queries, {
    refetchOnMountOrArgChange: true,
  });

  const metaData = palletDeals?.meta;

  const metaPage = metaData?.page;

  const { data: palletDealsAll } =
    useGetAllPalletDealsWithoutStateQuery(undefined);
  // console.log(palletDealsAll?.result);
  // console.log(palletDeals?.result);

  // const [added,setAdded] = useState(false)
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

  //Hide added item or disabled item
  const [duplicateMap, setDuplicateMap] = useState<Record<string, any>>({});

  useEffect(() => {
    // Initialize the state based on cart items on page load
    const initialDuplicateMap: Record<string, any> = {};
    cart?.result?.forEach((item: any) => {
      initialDuplicateMap[item.product_id] = item;
    });
    setDuplicateMap(initialDuplicateMap);
  }, [cart]); // Make sure to include cart in the dependencies array

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
      duration: 2000,
    });
  };

  const [createCartItem] = useCreateCartItemsMutation();

  const handleAddtoCart = async (productId: any) => {
    const duplicateItem = duplicateMap[productId];

    setDuplicateMap((prevDuplicateMap) => ({
      ...prevDuplicateMap,
      [productId]: duplicateItem,
    }));

    if (duplicateItem) {
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
        const product_quantity = "1";
        const deal_type_id = "3";

        const addItem = { user_id, product_id, product_quantity, deal_type_id };

        const response = await createCartItem(addItem);
        console.log(response);
        notifyAddToCart(productId);
        // if (!response.ok) {
        //   throw new Error("Network response was not ok");
        // }

        // const responseData = await response.json();
        // console.log("check", responseData.result);
        // if (response?.result?.insertId) {

        //   notifyAddToCart(productId)
        // }

        // Handle success response here
      } catch (error) {
        console.error("Error uploading product:", error);
      }
    }
  };

  return (
    <div>
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="relative">
            <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
            <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
          </div>
        </div>
      ) : palletDeals?.result && palletDeals.result.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 mt-8">
          {palletDeals.result.map((item: any, index: any) => (
            <div
              className={`nc-ProductCard relative bg-transparent border rounded-xl`}
              data-nc-id="ProductCard"
              key={index}
            >
              <Link
                to={`/pallet/product/details/${item?.pallet_id}`}
                className="absolute inset-0"
              ></Link>

              <div className="relative flex-shrink-0 bg-slate-50 dark:bg-slate-300 rounded-t-xl overflow-hidden z-1 group">
                <Link
                  to={`/pallet/product/details/${item?.pallet_id}`}
                  className="block"
                >
                  <NcImage
                    containerClassName="flex aspect-w-8 aspect-h-8 w-full h-0 "
                    src={`${config.PHOTO_URL}/${item?.product_image}`}
                    className="object-cover w-full h-full drop-shadow-xl"
                  />
                </Link>
              </div>

              <div className="space-y-4 px-3 pt-5 pb-2.5">
                <div className="flex justify-between items-start w-full ">
                  <div>
                    <h2
                      className={`nc-ProductCard__title text-base font-semibold transition-colors `}
                    >
                      {item?.product_name}
                    </h2>
                  </div>
                  <Prices price={item?.pallet_price} />
                </div>

                <div>
                  <div className="flex justify-between items-center ">
                    <p
                      className={`text-sm text-slate-500 dark:text-slate-400 mt-1 `}
                    >
                      Condition
                    </p>
                    <p
                      className={`text-sm text-natural-500 font-semibold dark:text-green-500 mt-1 `}
                    >
                      {item?.condition_name || "NA"}
                    </p>
                  </div>
                  <div className="flex justify-between items-center ">
                    <p
                      className={`text-sm text-slate-500 dark:text-slate-400 mt-1 `}
                    >
                      Store
                    </p>
                    <p
                      className={`text-sm text-natural-500 font-semibold dark:text-green-500 mt-1 `}
                    >
                      {item?.store_name || "NA"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-end p-3 ">
                <ButtonPrimary
                  className={`flex-1 flex-shrink-0 w-full rounded-lg ${
                    duplicateMap[item?.product_id] !== undefined
                      ? "disabled opacity-50"
                      : ""
                  }`}
                  onClick={() => {
                    addCart(item?.product_id);
                  }}
                  disabled={duplicateMap[item?.product_id] !== undefined} // Disable the button if duplicate is found
                >
                  <BagIcon className="hidden sm:inline-block w-5 h-5 mb-0.5" />
                  <span className="ml-3">Add To Cart</span>
                </ButtonPrimary>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-24">
          <p className="text-2xl text-dark">Products not available</p>
        </div>
      )}

      {/* Pagination */}
      <nav className="flex items-center justify-end space-x-2 mt-5">
        <button
          className="text-gray-400 hover:text-primary p-4 inline-flex items-center gap-2  rounded-md"
          disabled={metaPage === 1}
          onClick={(e) => setPage(page - 1)}
        >
          <span aria-hidden="true">«</span>
          <span className="sr-only">Previous</span>
        </button>

        <span className="rounded-lg bg-primary-200 p-3 inline-block">
          {metaPage}
        </span>

        <button
          className="text-gray-400 hover:text-primary p-4 inline-flex items-center gap-2  rounded-md"
          onClick={() => setPage(page + 1)}
        >
          <span className="sr-only">Next</span>
          <span aria-hidden="true">»</span>
        </button>
      </nav>
    </div>
  );
};

export default PalletPageStore;
