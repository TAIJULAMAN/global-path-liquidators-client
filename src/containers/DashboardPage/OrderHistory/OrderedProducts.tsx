import React from "react";
import Prices from "components/Prices";
import { useGetOrderDataQuery } from "features/api/orderApi";

const OrderedProducts = ({ orderId }: Record<string, any>) => {
  // const [orders, setOrders] = useState<any[]>([]);
  const { data: orderHistoryData } = useGetOrderDataQuery(orderId, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
  });

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-b-lg">
    {orderHistoryData?.result?.length > 0 ? (
      <div className="p-2 sm:p-8 divide-y divide-y-slate-200 dark:divide-slate-700">
        {orderHistoryData.result.map((order: any, index: number) => (
          <div key={index} className="flex py-5 items-center gap-5 last:pb-0">
            <div>
              <p className="font-semibold">{index + 1}</p>
            </div>
            <div className="relative h-32 w-32 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
              <img
                src={`https://darktechteam.com/api/${order?.product_image}`}
                alt={order?.product_name}
                className="h-full w-full object-contain object-center"
              />
            </div>
            <div className="flex flex-1 flex-col">
              <div>
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-lg font-medium">
                      {order?.product_name}
                    </h3>
                    <p className="mt-1 text-sm text-slate-700 dark:text-slate-400">
                      <span>{order?.category_name}</span>
                    </p>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      <span>{order?.condition_name}</span>
                      <span className="mx-2 border-l border-slate-200 dark:border-slate-700 h-4"></span>
                      <span>{order?.store_name}</span>
                    </p>
                  </div>
                  <Prices price={order?.price} className="mt-0.5" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-center py-4">No orders found</p>
    )}
  </div>
  
  );
};

export default OrderedProducts;
