import Prices from "components/Prices";
import { PRODUCTS } from "data/data";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import CommonLayout from "./CommonLayout";
import { SetStateAction, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const AccountOrder = () => {
  interface OrderItem {
    order_id: number;
    user_id: number;
    product_quantity: number;
    product_image: string;
    product_name: string;
    price: number;
    deal_type_name: string;
    order_date: string;
    // Add other properties as needed
  }

  const [orders, setOrders] = useState<OrderItem[]>([]);
  let userDetails: any;
  const userDetailsString = localStorage.getItem("UserDetails");
  if (userDetailsString !== null) {
    userDetails = JSON.parse(userDetailsString);
  } else {
    // Handle the case where "UserDetails" is not present in localStorage
  }
  const userId = userDetails?.user?.user_id;

  console.log(orders);
  useEffect(() => {
    fetch(`https://darktechteam.com/api/orders/user-orders/${userId}`)
      .then((res) => res.json())
      .then((data) => setOrders(data.result));
  }, [userId]);

  function formatDate(dateString: any) {
    const date = new Date(dateString);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let getDate = day + "-" + month + "-" + year;
    return getDate;
  }
  const handlebtn = () => {
    console.log("hello");
  };
  // State to keep track of selected order

  // const renderProductItem = (product: any, index: number) => {
  //   const { image, name } = product;
  //   return (
  //     <div  className="flex py-4 sm:py-7 last:pb-0 first:pt-0">
  //     <div className="h-24 w-16 sm:w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
  //       <img
  //         src={'https://mir-s3-cdn-cf.behance.net/projects/404/a146b9177562833.64d91106d4572.jpg'}
  //         alt={'Hello'}
  //         className="h-full w-full object-cover object-center"
  //       />
  //     </div>

  //     <div className="ml-4 flex flex-1 flex-col">
  //       <div>
  //         <div className="flex justify-between ">
  //           <div>
  //             <h3 className="text-base font-medium line-clamp-1">{'Jersy'}</h3>
  //             <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
  //               <span>{"Natural"}</span>
  //               <span className="mx-2 border-l border-slate-200 dark:border-slate-700 h-4"></span>
  //               <span>{"XL"}</span>
  //             </p>
  //           </div>
  //           <Prices className="mt-0.5 ml-2" />
  //         </div>
  //       </div>
  //       <div className="flex flex-1 items-end justify-between text-sm">
  //         <p className="text-gray-500 dark:text-slate-400 flex items-center">
  //           <span className="hidden sm:inline-block">Qty</span>
  //           <span className="inline-block sm:hidden">x</span>
  //           <span className="ml-2">1</span>
  //         </p>

  //         <div className="flex">
  //           <button
  //             type="button"
  //             className="font-medium text-indigo-600 dark:text-primary-500 "
  //           >
  //             Leave review
  //           </button>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  //   );
  // };

  const renderOrder = () => {
    return (
      <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden z-0">
        {orders?.map((item) => (
          <>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 sm:p-8 bg-slate-50 dark:bg-slate-500/5">
              <div>
                <p className="text-lg font-semibold">#OR00{item?.order_id}</p>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1.5 sm:mt-2">
                  <span>{formatDate(item?.order_date)}</span>
                  <span className="mx-2">·</span>
                  <span className="text-yellow-500">Pending</span>
                </p>
              </div>
              <Link to={`/order-details${item?.order_id}`}>
                <div className="mt-3 sm:mt-0">
                  <button
                    // onClick={(e:any)=>handlebtn(e)}
                    className="py-2.5 px-4 sm:px-6 text-sm font-medium border-slate-600 bg-white rounded-full hover:bg-gray-100"
                  >
                    View Order
                  </button>
                </div>
              </Link>
            </div>
            <div className="h-[1px] w-full bg-gray-200"></div>

            {/* // image show prtoduct details */}
          </>
        ))}
      </div>
    );
  };

  return (
    <div>
      <CommonLayout>
        <div className="space-y-10 sm:space-y-12">
          {/* HEADING */}
          <h2 className="text-2xl sm:text-3xl font-semibold">Order History</h2>
          {renderOrder()}
          {/* {renderOrder()} */}
        </div>
      </CommonLayout>
    </div>
  );
};

export default AccountOrder;
