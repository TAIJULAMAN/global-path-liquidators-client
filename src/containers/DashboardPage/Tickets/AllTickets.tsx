import React, { FC, useEffect, useState } from "react";
import DashboardCommonLayout from "../DashboardCommonLayout";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { formatDate } from "components/FormateDate";
import { HiOutlineEye } from "react-icons/hi";
export interface AccountPageProps {
  className?: string;
}
const AllTickets: FC<AccountPageProps> = ({ className = "" }) => {
  interface AllTIckets {
    ticket_priority: string;
    ticket_subject: string;
    ticket_status: number;
    ticket_id: number;
    updated_at: string;
    is_answered: number;
    cartId: number;
    product_id: number;
    deal_type_id: number;
    // Add other properties as needed
  }
  const [tickets, setTickets] = useState<AllTIckets[]>([]);



  const answeredTicketsCount = tickets?.filter(ticket => ticket?.is_answered === 1)?.length ?? 0;
  // console.log("Number of tickets with is_answered=1:", answeredTicketsCount);

  const statusClose = tickets.filter(ticket => ticket?.ticket_status === 0)?.length;
  const openClose = tickets.filter(ticket => ticket?.ticket_status === 1)?.length;


  let userDetails: any;
  const userDetailsString = localStorage.getItem("UserDetails");
  if (userDetailsString !== null) {
    userDetails = JSON.parse(userDetailsString);
  } else {
    // Handle the case where "UserDetails" is not present in localStorage
  }
  const userId = userDetails?.user?.user_id;



  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch(
          `https://darktechteam.com/api/tickets/user-tickets/${userId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch tickets");
        }
        const data = await response.json();
        setTickets(data?.result || []);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };

    fetchTickets();
  }, [userId]);

  return (
    <div className={`nc-AccountPage ${className}`} data-nc-id="AccountPage">
      <Helmet>
        <title>Ticketing || Global Path Liquidators</title>
      </Helmet>
      <DashboardCommonLayout>
        <div className="">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-semibold">Ticket & Supports</h2>
            <Link to="/ticket">
              <button className="block py-1 px-4 bg-blue-500 hover:bg-blue-700 text-white rounded">
                Add Ticket
              </button>
            </Link>
          </div>
          <div className="flex justify-evenly items-center gap-1">
            <div className="px-8 py-4 w-2/3 rounded-lg bg-green-600">
              <p className="font-medium text-white text-center">
                Answered Tickets
              </p>
              <p className="text-xl font-bold text-white text-center">{answeredTicketsCount}</p>
            </div>
            <div className="px-8 py-4 w-2/3 rounded-lg bg-yellow-500">
              <p className="font-medium text-white text-center">Open Tickets</p>
              <p className="text-xl font-bold text-white text-center">{openClose}</p>
            </div>

            <div className="px-8 py-4 w-2/3 rounded-lg bg-red-600">
              <p className="font-medium text-white text-center">
                Closed Tickets
              </p>
              <p className="text-xl font-bold text-white text-center">{statusClose}</p>
            </div>
            <div className="px-8 py-4 w-2/3 rounded-lg bg-indigo-600">
              <p className="font-medium text-white text-center">All Tickets</p>
              <p className="text-xl font-bold text-white text-center">{tickets?.length}</p>
            </div>
          </div>
          <div className=" mt-5  border rounded-lg divide-y divide-gray-200 dark:border-gray-700 dark:divide-gray-700">
            <div className="w-full relative overflow-x-auto rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 rounded-lg ">
                <thead className="text-sm bg-gray-100 dark:bg-gray-800 rounded-lg ">
                  <tr>
                    <th scope="col" className="text-left px-6 py-3">
                      Subject
                    </th>
                    <th scope="col" className="text-left px-6 py-3">
                      Last Updated
                    </th>
                    <th scope="col" className="text-left px-6 py-3">
                      User
                    </th>

                    <th scope="col" className="text-left px-6 py-3">
                      Priority
                    </th>
                    <th scope="col" className="text-left px-6 py-3">
                      Status
                    </th>
                    <th scope="col" className="text-center px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                {tickets?.map((item: any, i: any) => (
                  <tbody key={item?.ticket_id}>
                    <tr>
                      <td className="text-left px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                        {item?.ticket_subject}
                      </td>
                      <td className="text-left px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                        {formatDate(item?.updated_at)}
                      </td>
                      <td className="text-left px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                        {item?.first_name} {item?.last_name}
                      </td>

                      <td className="text-left px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                        {item?.ticket_priority}
                      </td>
                      <td className="text-left px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-800">
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


                      </td>

                      <Link to={`/replyTicket/${item?.ticket_id}`}>
                        <td className="flex justify-center cursor-pointer px-6 py-3 text-gray-800 dark:text-gray-200 ">
                          <button className="border rounded-full p-2 text-green-400 bg-green-50 text-sm">
                            <HiOutlineEye />
                          </button>
                        </td>
                      </Link>
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
      </DashboardCommonLayout>
    </div>
  );
};

export default AllTickets;
