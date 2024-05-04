import { Popover, Transition } from "@headlessui/react";
import { useGetUserNotificationsQuery, useUpdateNotificationMutation } from "features/api/notificationsApi";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import SwitchDarkMode2 from "shared/SwitchDarkMode/SwitchDarkMode2";

export default function NotificationsDropdown() {

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

    const unreadNotifications: any = notifications?.result.filter((i: any) => i.notification_status === 0);
    return (
        <div className="AvatarDropdown ">
            <Popover className="relative">
                {({ open, close }) => (
                    <>
                        <Popover.Button
                            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none flex items-center justify-center`}
                        >
                            <div className="w-3.5 h-3.5 flex items-center justify-center bg-primary-500 absolute top-1.5 right-1.5 rounded-full text-[10px] leading-none text-white font-medium">
                                <span className="mt-[1px]">{unreadNotifications?.length}</span>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                            </svg>
                        </Popover.Button>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                        >
                            <Popover.Panel className="absolute z-10 w-screen max-w-[300px] px-4 mt-3.5 -right-10 sm:right-0 sm:px-0">
                                <div className="overflow-hidden rounded-3xl shadow-lg ring-1 ring-black ring-opacity-5">
                                    <div className="relative grid grid-cols-1 bg-white dark:bg-neutral-800 p-4 divide-y ">
                                        {
                                            notifications?.result.slice(0, 5).map((m: any, idx: number) => (
                                                <div key={idx} className="p-2">
                                                    <p className={`${m.notification_status === 0 ? 'font-semibold' : ''} text-sm cursor-pointer`}
                                                        onClick={() => handleUpdateNotificationStatus(`${m.notification_id}`)}
                                                    >{m.message} </p>

                                                </div>
                                            ))
                                        }
                                        <Link to='/notifications'>
                                            <p className="text-center text-blue-400 hover:text-blue-600 pt-2 font-semibold text-sm cursor-pointer">See more</p>
                                        </Link>

                                    </div>
                                </div>
                            </Popover.Panel>
                        </Transition>
                    </>
                )}
            </Popover>
        </div >
    );
}
