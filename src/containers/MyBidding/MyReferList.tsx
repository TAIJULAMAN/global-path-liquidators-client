
import { FC, useState } from "react";
import { FaRegCopy } from "react-icons/fa";
import copy from "clipboard-copy";
import { useGetReferredUsersQuery } from "features/api/user";

export interface CommonLayoutProps {
  children?: React.ReactNode;
}

const MyRefersList: FC<CommonLayoutProps> = () => {

  const userDetailsString = localStorage.getItem("UserDetails");
  const userDetails = userDetailsString ? JSON.parse(userDetailsString) : null;
  const userId = userDetails?.user?.user_id;
  const referralCode = userDetails?.user?.ref_code;


  const { data: referredUsers } = useGetReferredUsersQuery(userId)

  // console.log(referredUsers)

  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = () => {
    copy(`https://global-path-liquidators-user.netlify.app/signup?ref-code=${referralCode}`);
    setIsCopied(true);

    // Reset the "Copied" state after 2 seconds (optional)
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mt-10 mb-5">
        <div className="text-3xl font-bold uppercase">Referred Users list</div>
      </div>

      <div>
        <div className="flex justify-center items-center gap-2 rounded p-2 bg-gray-200 dark:bg-gray-800 my-3 ">
          <span className="text-blue-400 font-semibold">Referral Link:</span>
          <span>{`https://global-path-liquidators-user.netlify.app/signup?ref-code=${referralCode}`}</span>
          <FaRegCopy
            onClick={handleCopyClick}
            style={{ cursor: "pointer" }}
          />
          {isCopied && <span>Copied!</span>}
        </div>
      </div>

      <div className="border rounded-lg divide-y divide-gray-200 dark:border-gray-700 dark:divide-gray-700 mb-5">
        <div className="min-w-full overflow-x-auto rounded-lg">

          {referredUsers?.result?.length > 0 ? ( // Check if bids array is defined and has elements
            <table
              className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 rounded-lg "
            >
              <thead className=" bg-gray-100 dark:bg-gray-800 rounded-lg ">
                <th
                  scope="col"
                  className="px-5 text-left font-bold text-dark dark:text-white py-6 text-xs uppercase"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-5 text-left font-bold text-dark dark:text-white py-6 text-xs uppercase"
                >
                  Phone
                </th>
                <th
                  scope="col"
                  className="px-5 text-left font-bold text-dark dark:text-white  py-6 text-xs uppercase"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="px-5 text-center font-bold text-dark dark:text-white  py-6 text-xs uppercase"
                >
                  Purchase Amount
                </th>
              </thead>
              <tbody>
                {referredUsers?.result?.map((item: any, idx: number) =>
                  <tr key={idx}
                    className="border-b border-gray-200 dark:border-gray-700"
                  >
                    <td
                      scope="row"
                      className="px-5 text-left py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200"
                    >
                      {item?.first_name + ' ' + item?.last_name}
                    </td>
                    <td
                      scope="row"
                      className="px-5 text-left py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200"
                    >
                      {item?.phone_number}
                    </td>
                    <td
                      scope="row"
                      className="px-5 text-left py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200"
                    >
                      {item?.email}
                    </td>
                    <td
                      scope="row"
                      className="px-5 text-center py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200"
                    >
                      {item?.total_purchased}
                    </td>

                  </tr>
                )
                }
              </tbody>
            </table>
          ) : (
            <p className="text-center py-4">You have no Referred Users</p> // If bids array is empty or undefined
          )}
        </div>
      </div>


    </div>
  );
};

export default MyRefersList;
