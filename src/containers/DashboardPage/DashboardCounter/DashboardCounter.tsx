import React, { useEffect, useState } from "react";

import Label from "components/Label/Label";
import Select from "shared/Select/Select";

import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from "apexcharts";
// import { queries } from "@testing-library/react";
import { useGetUserOrdersWithQuiresQuery } from "features/api/orderApi";
import { useGetAllDealDataQuery } from "features/api/dealApi";

const DashboardCounter = () => {

  let userDetails: any;
  const userDetailsString = localStorage.getItem("UserDetails");
  if (userDetailsString !== null) {
    userDetails = JSON.parse(userDetailsString);
  }
  const userId = userDetails?.user?.user_id;

  const [ordersMonth, setOrdersMonth] = useState('');
  const [ordersCategory, setOrdersCategory] = useState('all');
  const [ordersStatus, setOrdersStatus] = useState('all');
  const [totalOrders, setTotalOrders] = useState(0);

  // console.log(ordersMonth)


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

  const { data: orders, isLoading } = useGetUserOrdersWithQuiresQuery(queries, {
    refetchOnMountOrArgChange: true,
  });

  // console.log(orders)

  useEffect(() => {
    if (!isLoading) {
      setTotalOrders(orders?.result?.length)
    }
  }, [orders, isLoading])

  const processDealType = (dt: string): string => {
    // Split the string by '_'
    const words: string[] = dt.split('_');

    // Capitalize the first letter of each word
    const capitalizedWords: string[] = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));

    // Join the words back together with spaces
    const result: string = capitalizedWords.join(' ');

    return result;

  }

  const columnChartOpts: ApexOptions = {
    chart: {
      height: 350,
      type: 'bar',
      toolbar: {
        show: false,
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '45%',
        // endingShape: 'rounded'
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    series: [{
      name: 'Orders',
      data: [totalOrders]
    }],
    colors: ['#34c38f', '#556ee6', '#f46a6a'],
    xaxis: {
      categories: [''],
    },
    yaxis: {
      title: {
        text: '',
        style: {
          fontWeight: '500',
        },
      }
    },
    grid: {
      borderColor: '#9ca3af20',
    },
    fill: {
      opacity: 1

    },
    tooltip: {
      y: {
        formatter: function (val) {
          return "" + val + ""
        }
      }
    }
  }


  return (
    // <!-- component -->
    <>

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
          </Select>
        </div>
      </div>

      {orders?.result?.length > 0 ? (
        <div className="p-6">
          <ReactApexChart
            className='apex-charts'
            options={columnChartOpts}
            height={350}
            series={columnChartOpts.series}
            type='bar'
          />
        </div>
      ) : (
        <div className="border border-slate-200 dark:border-slate-700 rounded-lg">
          <p className="text-center py-4">No orders found</p>
        </div>
      )}



      {/* <div
        role="list"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2"
      >
        <div className="col-span-1 divide-y divide-gray-200  shadow border rounded-lg">
          <div className="bg-gray-950 rounded-t-lg">
            <div className=" flex divide-x divide-gray-200">
              <p className="text-white ps-4 py-3 flex text-center text-lg font-bold">
                Total Bidding
              </p>
            </div>
          </div>
          <div className="  flex w-full items-center justify-between space-x-6 p-6">
            <div className="flex-1 truncate">
              <div className="flex items-center space-x-3">
                <h1 className="text-5xl font-bold text-gray-900 dark:text-gray-200">10</h1>
              </div>
            </div>
            <BsWalletFill className="w-10 h-10" />
          </div>
        </div>

        <div className="col-span-1 divide-y divide-gray-200  shadow border rounded-lg">
          <div className="bg-gray-950 rounded-t-lg">
            <div className=" flex divide-x divide-gray-200">
              <p className="text-white ps-4 py-3 flex text-center text-lg font-bold">
                Total Order
              </p>
            </div>
          </div>
          <div className="  flex w-full items-center justify-between space-x-6 p-6">
            <div className="flex-1 truncate">
              <div className="flex items-center space-x-3">
                <h1 className="text-5xl font-bold text-gray-900 dark:text-gray-200">8</h1>
              </div>
            </div>
            <BsCart3 className="w-10 h-10" />
          </div>
        </div>
        <div className="col-span-1 divide-y divide-gray-200  shadow border border rounded-lg">
          <div className="bg-gray-950 rounded-t-lg">
            <div className=" flex divide-x divide-gray-200">
              <p className="text-white ps-4 py-3 flex text-center text-lg font-bold">
                Total Deposits
              </p>
            </div>
          </div>
          <div className="  flex w-full items-center justify-between space-x-6 p-6">
            <div className="flex-1 truncate">
              <div className="flex items-center space-x-3">
                <h1 className="text-5xl font-bold text-gray-900 dark:text-gray-200">$ 10.00</h1>
              </div>
            </div>
            <RiMoneyDollarCircleFill className="w-10 h-10" />
          </div>
        </div>
        <div className="col-span-1 divide-y divide-gray-200  shadow border rounded-lg">
          <div className="bg-gray-950 rounded-t-lg">
            <div className=" flex divide-x divide-gray-200">
              <p className="text-white ps-4 py-3 flex text-center text-lg font-bold">
                Total Bids Win
              </p>
            </div>
          </div>
          <div className="  flex w-full items-center justify-between space-x-6 p-6">
            <div className="flex-1 truncate">
              <div className="flex items-center space-x-3">
                <h1 className="text-5xl font-bold text-gray-900 dark:text-gray-200">6</h1>
              </div>
            </div>
            <TbChessKing className="w-10 h-10" />
          </div>
        </div>
      </div> */}

      {/* <div>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-semibold">Labels</h2>
        </div>
        <div className="flex justify-evenly items-center gap-1">
          <div className="px-8 py-4 w-2/3 rounded-lg bg-green-600">
            <p className="font-medium text-white text-center">
              Pending Labels
            </p>
            <p className="text-xl font-bold text-white text-center">2</p>
          </div>
          <div className="px-8 py-4 w-2/3 rounded-lg bg-yellow-500">
            <p className="font-medium text-white text-center">Received Labels</p>
            <p className="text-xl font-bold text-white text-center">2</p>
          </div>
        </div>
      </div> */}
      {/* <div>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-semibold">Ticket & Supports</h2>
        </div>
        <div className="flex justify-evenly items-center gap-1">
          <div className="px-8 py-4 w-2/3 rounded-lg bg-green-600">
            <p className="font-medium text-white text-center">
              Answered Tickets
            </p>
            <p className="text-xl font-bold text-white text-center">2</p>
          </div>
          <div className="px-8 py-4 w-2/3 rounded-lg bg-yellow-500">
            <p className="font-medium text-white text-center">Open Tickets</p>
            <p className="text-xl font-bold text-white text-center">2</p>
          </div>

          <div className="px-8 py-4 w-2/3 rounded-lg bg-red-600">
            <p className="font-medium text-white text-center">
              Closed Tickets
            </p>
            <p className="text-xl font-bold text-white text-center">2</p>
          </div>
          <div className="px-8 py-4 w-2/3 rounded-lg bg-indigo-600">
            <p className="font-medium text-white text-center">All Tickets</p>
            <p className="text-xl font-bold text-white text-center">10</p>
          </div>
        </div>
      </div> */}
    </>

  );
};

export default DashboardCounter;
