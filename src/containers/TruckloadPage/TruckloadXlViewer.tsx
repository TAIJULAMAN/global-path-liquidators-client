import React, { useEffect, useState } from 'react';

const TruckloadXlViewer = () => {
    const [pallets, setPallets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://darktechteam.com/api/pallet-deals/all-pallets?page=1&limit=10');
                const data = await response.json();
                console.log('API Response:', data); // Log the API response
                setPallets(data.result);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    return (
        <div>
            <h1>Pallets Data</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Pallet ID</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Product Count</th>
                            {/* Add more table headers as needed */}
                        </tr>
                    </thead>
                    <tbody>
                        {pallets.map((pallet: any) => (
                            <tr key={pallet?.pallet_id}>
                                <td>{pallet?.pallet_id}</td>
                                <td>{pallet?.product_name}</td>
                                <td>{pallet?.pallet_price}</td>
                                <td>{pallet?.product_count}</td>
                                {/* Add more table cells as needed */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

        </div>
    );
};

export default TruckloadXlViewer;