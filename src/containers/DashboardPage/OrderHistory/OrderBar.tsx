import React, { useEffect, useState } from "react";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import image1 from "./image/2.png";
import { Link } from "react-router-dom";
import Label from "components/Label/Label";
import Select from "shared/Select/Select";
import { useGetAllDealDataQuery } from "features/api/dealApi";
import { useGetUserOrdersWithQuiresQuery } from "features/api/orderApi";
const OrderBar = () => {
  interface OrderItem {
    order_id: number;
    user_id: number;
    product_quantity: number;
    product_image: string;
    product_name: string;
    price: number;
    deal_type_name: string;
    order_date: string;
    order_status: number;
    // Add other properties as needed
  }

  let userDetails: any;
  const userDetailsString = localStorage.getItem("UserDetails");
  if (userDetailsString !== null) {
    userDetails = JSON.parse(userDetailsString);
  }
  const userId = userDetails?.user?.user_id;

  const [orders, setOrders] = useState<OrderItem[]>([]);

  const [ordersMonth, setOrdersMonth] = useState('');
  const [ordersCategory, setOrdersCategory] = useState('all');
  const [ordersStatus, setOrdersStatus] = useState('all');

  console.log(orders)


  const { data: dealTypes, isLoading: dealTypesLoading } = useGetAllDealDataQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  // console.log(dealTypes)

  const queries = {
    userId: !userId ? null : userId,
    deal_type_id: ordersCategory === 'all' || ordersCategory === 'c-all' ? null : ordersCategory,
    order_status: ordersStatus === 'all' || ordersStatus === 's-all' ? null : ordersStatus,
    order_month: !ordersMonth ? null : ordersMonth,
  };

  const { data: userOrders, isLoading } = useGetUserOrdersWithQuiresQuery(queries, {
    refetchOnMountOrArgChange: true,
  });

  console.log(userOrders)

  useEffect(() => {
    if (!isLoading) {
      setOrders(userOrders?.result)
    }
  }, [userOrders, isLoading])

  const processDealType = (dt: string): string => {
    // Split the string by '_'
    const words: string[] = dt.split('_');

    // Capitalize the first letter of each word
    const capitalizedWords: string[] = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));

    // Join the words back together with spaces
    const result: string = capitalizedWords.join(' ');

    return result;

  }


  // console.log(orders);

  // useEffect(() => {
  //   fetch(`https://darktechteam.com/api/orders/user-orders/${userId}`)
  //     .then((res) => res.json())
  //     .then((data) => setOrders(data.result));
  // }, [userId]);

  function formatDate(dateString: any) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const date = new Date(dateString);
    let day = date.getDate();
    let month = months[date.getMonth()];
    let year = date.getFullYear();

    let formattedDate = month + ' ' + day + ', ' + year;

    return formattedDate;
  }
  return (
    <div>

      <div className="flex justify-between mb-5 gap-5">
        <div className="w-full px-1">
          <Label>Month</Label>
          <div className="mt-1.5 rounded-lg">
            <input
              type="month"
              id="start"
              name="start"
              // defaultValue={"2024-01"}
              // placeholder="select month"
              className="h-11 block w-full text-sm rounded-lg border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 "
              onChange={(e) => setOrdersMonth(e.target.value)}
            />
          </div>
        </div>

        <div className="w-full px-1">
          <Label>Category</Label>
          <Select
            defaultValue='select'
            value={ordersCategory}
            className="mt-1.5 rounded-lg"
            onChange={(e: any) => setOrdersCategory(e.target.value)}
          >
            <option value="all" >Select</option>
            <option value="c-all" >All Category</option>
            {
              dealTypes?.result.map((item: any, id: any) => (
                <option key={id} value={item.deal_type_id}>{processDealType(item.deal_type_name)}</option>
              ))
            }
          </Select>
        </div>
        <div className="w-full px-1">
          <Label>Status</Label>
          <Select
            value={ordersStatus}
            className="mt-1.5 rounded-lg"
            onChange={(e: any) => setOrdersStatus(e.target.value)}
          >
            <option value="all">Select</option>
            <option value="s-all">All Status</option>
            <option value="0">Received</option>
            <option value="1">Processing</option>
            <option value="2">Shipped</option>
            <option value="3"> Delivered</option>
            <option value="4"> Cancel</option>
          </Select>
        </div>
      </div>

      <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden z-0">
        {orders && orders.length > 0 ? (
          orders.map((item, key) => (
            <div key={key}>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 sm:p-8 bg-slate-50 dark:bg-slate-500/5">
                <div>
                  <p className="text-lg font-semibold">#{item?.order_id}</p>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mt-1.5 sm:mt-2">
                    <span>{formatDate(item?.order_date)}</span>
                    <span className="mx-2">·</span>
                    <span className="text-[#FFAB00]">{item?.order_status === 0 ? 'Received' : item?.order_status === 1 ? 'Processing' : item?.order_status === 2 ? 'Shipped' : item?.order_status === 3 ? 'Delivered' : item?.order_status === 4 ? 'Cancel' : ''}</span>
                  </p>
                </div>
                <Link to={`/order-details/${item?.order_id}`}>
                  <div className="mt-3 sm:mt-0">
                    <button
                      // onClick={(e:any)=>handlebtn(e)}
                      className="py-2.5 text-slate-800 px-4 sm:px-6 text-sm font-medium border-slate-600 bg-[#69F0AE] rounded-full hover:bg-[#00E676]"
                    >
                      View Order
                    </button>
                  </div>
                </Link>
              </div>
              <div className="h-[1px] w-full bg-gray-200"></div>
              {/* // image show prtoduct details */}
            </div>
          ))
        ) : (
          <p className="text-center py-4">No orders found</p>
        )}
      </div>
    </div>

  );
};

export default OrderBar;
