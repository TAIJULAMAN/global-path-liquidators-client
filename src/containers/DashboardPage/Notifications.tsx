import React from 'react';
import { Helmet } from 'react-helmet-async';
import DashboardCommonLayout from './DashboardCommonLayout';
import { useGetUserNotificationsQuery, useUpdateNotificationMutation } from 'features/api/notificationsApi';
import { isTemplateSpan } from 'typescript';
import { convertDateTime } from 'components/FormateDate';

const Notifications = () => {
    let userDetails: any;
    const userDetailsString = localStorage.getItem("UserDetails");
    if (userDetailsString !== null) {
        userDetails = JSON.parse(userDetailsString);
    }
    const userId = userDetails?.user?.user_id;
    // console.log(userId)
    const { data: notifications } = useGetUserNotificationsQuery(userId);

    // console.log(notifications?.result)

    const [updateNotificationStatus] = useUpdateNotificationMutation();

    const handleUpdateNotificationStatus = async (id: any) => {
        const readNotification = {
            id: id,
            notification_status: 1
        };

        // console.log(readNotification);

        const response = await updateNotificationStatus(readNotification);

        // console.log(response)
    }

    return (
        <div className={`nc-AccountPage`} data-nc-id="AccountPage">
            <Helmet>
                <title>Notifications || Global Path Liquidators</title>
            </Helmet>
            <DashboardCommonLayout>
                <div className="border rounded-lg divide-y divide-gray-200 dark:border-gray-700 dark:divide-gray-700">
                    <div className="min-w-full overflow-x-auto rounded-lg">
                        <table
                            className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 rounded-lg "
                        >
                            <thead className=" bg-gray-100 dark:bg-gray-800 rounded-lg ">
                                <th
                                    scope="col"
                                    className="px-5 text-center font-bold text-dark dark:text-white py-6 text-xs uppercase"
                                >
                                    SN
                                </th>
                                <th
                                    scope="col"
                                    className="px-5 text-left font-bold text-dark dark:text-white py-6 text-xs uppercase"
                                >
                                    Date & Time
                                </th>
                                <th
                                    scope="col"
                                    className="px-5 text-left font-bold text-dark dark:text-white  py-6 text-xs uppercase"
                                >
                                    Descriptions
                                </th>
                                <th
                                    scope="col"
                                    className="px-5 text-left font-bold text-dark dark:text-white  py-6 text-xs uppercase"
                                >
                                    Type
                                </th>
                            </thead>
                            <tbody>
                                {notifications?.result
                                    ? [...notifications?.result]
                                        .map((item: any, idx: number) => (
                                            <tr key={idx}
                                                className="border-b border-gray-200 dark:border-gray-700"
                                            >
                                                <td
                                                    scope="row"
                                                    className="px-5 text-center py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200"
                                                >
                                                    {idx + 1}
                                                </td>
                                                <td
                                                    scope="row"
                                                    className="px-5 text-left py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200"
                                                >
                                                    {convertDateTime(item.created_at)}
                                                </td>
                                                <td
                                                    scope="row"
                                                    className={`${item.notification_status === 0 ? 'font-semibold' : ''} cursor-pointer px-5 text-left py-4 whitespace-nowrap text-sm  text-gray-800 dark:text-gray-200`}
                                                    onClick={() => handleUpdateNotificationStatus(`${item.notification_id}`)}
                                                >
                                                    {item?.message}
                                                </td>
                                                <td
                                                    scope="row"
                                                    className="px-5 text-left py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200"
                                                >
                                                    <button
                                                        className={`py-1 px-2 w-20 text-center rounded
                                                        ${item.alert_type === 'warning' ? 'text-yellow-600 bg-yellow-100'
                                                                : item.alert_type === 'info' ? 'text-blue-600 bg-blue-100'
                                                                    : item.alert_type === 'urgent' ? 'text-red-600 bg-red-100' : ''}`}
                                                    >
                                                        {item.alert_type}
                                                    </button>

                                                </td>
                                            </tr>

                                        )) : <tr className='text-center font-semibold text-lg p-5'>No Notifications Available</tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </DashboardCommonLayout >
        </div >
    );
};

export default Notifications;