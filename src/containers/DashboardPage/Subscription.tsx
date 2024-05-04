import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import DashboardCommonLayout from './DashboardCommonLayout';

import { useGetSubscriptionsQuery } from 'features/api/subscriptionsApi';

const Subscription = () => {
  
    let userDetails: any;
    const userDetailsString = localStorage.getItem("UserDetails");
    if (userDetailsString !== null) {
        userDetails = JSON.parse(userDetailsString);
    }
    const userId = userDetails?.user?.user_id;
    console.log(userId)
    const { data: subscriptions } = useGetSubscriptionsQuery(userId);
console.log(subscriptions);

    



    return (
        <div className={`nc-AccountPage`} data-nc-id="AccountPage">
            <Helmet>
                <title>Subscriptions || Global Path Liquidators</title>
            </Helmet>
            <DashboardCommonLayout>
                <div className="border rounded-lg divide-y divide-gray-200 dark:border-gray-700 dark:divide-gray-700">
                    <div className="min-w-full overflow-x-auto rounded-lg">
                    <div className=" mt-5  border rounded-lg divide-y divide-gray-200 dark:border-gray-700 dark:divide-gray-700">
            <div className="w-full relative overflow-x-auto rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 rounded-lg ">
                <thead className="text-sm bg-gray-100 dark:bg-gray-800 rounded-lg ">
                  <tr>
                    <th scope="col" className="text-left px-6 py-3">
                     Subscribe
                    </th>
                    {/* <th scope="col" className="text-left px-6 py-3">
                      Last Updated
                    </th> */}
                    <th scope="col" className="text-left px-6 py-3">
                      User
                    </th>

                    {/* <th scope="col" className="text-left px-6 py-3">
                      Priority
                    </th> */}
                    <th scope="col" className="text-left px-6 py-3">
                      Status
                    </th>
                    <th scope="col" className="text-center px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                {subscriptions?.result?.map((item: any, i: any) => (
                  <tbody key={item?.ticket_id}>
                    <tr>
                      <td className="text-left px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                        {item?.ticket_subject}
                      </td>
                      <td className="text-left px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                        {/* {formatDate(item?.updated_at)} */}
                      </td>
                      <td className="text-left px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                        {item?.first_name} {item?.last_name}
                      </td>

                      <td className="text-left px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                        {item?.ticket_priority}
                      </td>
                      {/* <td className="text-left px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-800">
                        {item?.ticket_status !== 1 ? (
                          <span className="bg-red-500 text-white py-2 px-1.5 rounded text-xs">
                            Closed
                          </span>

                        ) : (
                          <>
                            {item?.is_answered === 1 ? (
                              <span className="bg-[#FFCC80] py-2 px-1.5 rounded text-xs w-6">
                                Answered
                              </span>
                            ) : (
                              <span className="bg-green-500 text-white py-2 px-1.5 rounded text-xs w-6">
                                Open
                              </span>
                            )}
                          </>
                        )}


                      </td> */}

                     
                    </tr>

                    {/* <td>
              <span className="w-full flex justify-center items-center p-5">
                No Order data found
              </span>
            </td> */}
                  </tbody>
                ))}
              </table>
            </div>
          </div>
                    </div>
                </div>
            </DashboardCommonLayout >
        </div >
    );
};

export default Subscription;