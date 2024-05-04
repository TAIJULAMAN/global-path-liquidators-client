import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const SubscribeCheckbox = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCheckboxChange = async () => {
    if (!isChecked) {
      const confirmed = await confirmSubscription();
      if (!confirmed) {
        // If user doesn't confirm, do nothing
        return;
      }
    }

    setIsChecked(!isChecked);

    if (!isChecked) {
      setLoading(true);
      const userDetailsString = localStorage.getItem("UserDetails");
      if (userDetailsString !== null) {
        const userDetails = JSON.parse(userDetailsString);
        try {
          const subscribeInfo = {
            user_id: userDetails?.user?.user_id,
            email: userDetails?.user?.email,
            auction_subscriber: 1,
          };

          const response = await axios.post(
            "https://darktechteam.com/api/subscription/new_subscriber",
            subscribeInfo,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          console.log(response);
          setLoading(false);
        } catch (error) {
          console.error("Error subscription:", error);
          setLoading(false);
        }
      }
    }
  };

  const confirmSubscription = async () => {
    const result = await Swal.fire({
      title: 'Subscribe Confirmation',
      text: 'Are you sure you want to subscribe?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    });

    return result.isConfirmed;
  };

  return (
    <div className='flex items-center gap-2 my-4'>
      <input
      className='border'
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
        disabled={loading}
      />
      {loading && <span>Loading...</span>}
      <h2 className=''>Subscribe for Auction</h2>
    </div>
  );
};

export default SubscribeCheckbox;
