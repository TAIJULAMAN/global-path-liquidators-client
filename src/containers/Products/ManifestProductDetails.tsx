import axios from 'axios';
import { useGetProductManifestListQuery } from 'features/api/productApi';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const ManifestProductDetails = () => {

    const { state } = useLocation();
    // console.log(state)

    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response: any = await axios.get(`https://darktechteam.com/api/products/product-manifest?url=${state}`);
                // console.log('Response:', response);
                setData(response?.data?.result);
            } catch (error: any) {
                console.error('Error fetching data:', error);
                setError('Error fetching data: ' + error.message);
            }
        };

        fetchData();
    }, [state]);

    const { data: manifestList } = useGetProductManifestListQuery(state);

    // console.log(manifestList);
    return (
        <div className="container py-16">

            <div className='mx-auto w-full mb-5'>
                <h2 className='text-lg font-semibold'>Manifest List</h2>
            </div>

            <div className="border rounded-lg divide-y divide-gray-200 dark:border-gray-700 dark:divide-gray-700">
                <div className="min-w-full overflow-x-auto rounded-lg">
                    <table
                        className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 rounded-lg "
                    >
                        <thead className=" bg-gray-100 dark:bg-gray-800 rounded-lg ">

                            {data?.columnNames?.length > 0 ?
                                (data?.columnNames || []).map((colNa: any, id: any) => {
                                    const columnName = colNa.replace(/_/g, ' ');
                                    return (
                                        <th
                                            scope="col"
                                            className="px-5 text-left font-bold text-dark dark:text-green-400 py-6 text-xs uppercase"
                                            key={id}
                                        >
                                            {columnName}
                                        </th>
                                    );
                                }) : <></>
                            }
                        </thead>
                        <tbody>
                            {data?.products?.length > 0 ?
                                (data?.products).map((product: any, key: any) => (
                                    <tr key={key}
                                        className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                                    >
                                        {
                                            (data?.columnNames || [])?.map((columnName: any, id: any) => (
                                                <td
                                                    key={id}
                                                    scope="row"
                                                    className="px-5 text-left py-4 whitespace-nowrap text-sm  text-gray-800 dark:text-gray-200"
                                                >
                                                    {product[columnName] ? product[columnName] : "-"}
                                                </td>
                                            ))
                                        }
                                    </tr>

                                )) : <p className='text-center font-semibold text-lg p-5'>There is no manifest information's to show</p>
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManifestProductDetails;