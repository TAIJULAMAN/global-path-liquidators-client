import axios from "axios";
import { useGetCartItemsQuery } from "features/api/cartApi";
import { useGetProductManifestListQuery } from "features/api/productApi";
import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";

const PalletManifest = () => {

  const params = useParams();
  console.log(params)

  const { state } = useLocation();
  console.log(state)

  console.log("hero console");

  const id: any = params?.id;

  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: any = await axios.get(`https://darktechteam.com/api/products/product-manifest?url=${state}`);
        console.log('Response:', response);
        setData(response?.data?.result);
      } catch (error: any) {
        console.error('Error fetching data:', error);
        setError('Error fetching data: ' + error.message);
      }
    };

    fetchData();
  }, [state]);

  const { data: manifestList } = useGetProductManifestListQuery(state);

  console.log(manifestList);

  return (
    <div className="px-24">
      <h2>Manifest</h2>

      <div className="border rounded-lg divide-y divide-gray-200 dark:border-gray-700 dark:divide-gray-700">
        <div className="min-w-full overflow-x-auto">
          <table
            // ref={tableRef}
            className="min-w-full divide-y divide-gray-200 dark:divide-gray-700"
          >
            <thead className="bg-[#42A5F5] text-white dark:bg-gray-700">

              <tr>
                {data?.columnNames?.length > 0 ?
                  (data?.columnNames || []).map((columnName: any, id: any) => (
                    <th
                      scope="col"
                      className="px-2 font-bold text-white py-3 text-center text-xs   uppercase"
                      key={id}
                    >
                      {columnName}
                    </th>
                  )) : <></>
                }
              </tr>
            </thead>
            <tbody>
              {data?.products?.length > 0 ?
                (data?.products).map((item: any, key: any) => (
                  <tr key={key}
                    className="border-b-2 border-gray-300 bg-white dark:bg-gray-800"
                  >
                    <td
                      scope="row"
                      className="text-center px-2 py-4 whitespace-nowrap text-sm  text-gray-800 dark:text-gray-200"
                    >
                      {item?.product_type}
                    </td>
                    <td
                      scope="row"
                      className="text-center px-2 py-4 whitespace-nowrap text-sm  text-gray-800 dark:text-gray-200"
                    >
                      {item?.product_name}
                    </td>{" "}
                    <td
                      scope="row"
                      className="text-center px-2 py-4 whitespace-nowrap text-sm  text-gray-800 dark:text-gray-200"
                    >
                      {item?.category_id}
                    </td>{" "}
                    <td
                      scope="row"
                      className="text-center px-2 py-4 whitespace-nowrap text-sm  text-gray-800 dark:text-gray-200"
                    >
                      {item?.condition_id}
                    </td>
                    <td
                      scope="row"
                      className="text-center px-2 py-4 whitespace-nowrap text-sm  text-gray-800 dark:text-gray-200"
                    >
                      {item?.store_id}
                    </td>
                    <td
                      scope="row"
                      className="text-center px-2 py-4 whitespace-nowrap text-sm  text-gray-800 dark:text-gray-200"
                    >
                      {item?.manifest_status}
                    </td>
                    <td
                      scope="row"
                      className="text-center px-2 py-4 whitespace-nowrap text-sm  text-gray-800 dark:text-gray-200"
                    >
                      {item?.price}
                    </td>
                    <td
                      scope="row"
                      className="text-center px-2 py-4 whitespace-nowrap text-sm  text-gray-800 dark:text-gray-200"
                    >
                      {item?.product_status}
                    </td>
                    <td
                      scope="row"
                      className="text-center px-2 py-4 whitespace-nowrap text-sm  text-gray-800 dark:text-gray-200"
                    >
                      {item?.allow_offers}
                    </td>
                    <td
                      scope="row"
                      className="text-center px-2 py-4 whitespace-nowrap text-sm  text-gray-800 dark:text-gray-200"
                    >
                      {item?.offer_def}
                    </td>
                  </tr>

                )) : <></>
              }

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PalletManifest;
