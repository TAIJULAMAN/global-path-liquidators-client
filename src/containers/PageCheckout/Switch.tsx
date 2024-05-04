import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const Switch = () => {
  const [isChecked, setIsChecked] = useState(false);


  let userDetails: any;
  const userDetailsString = localStorage.getItem("UserDetails");
  if (userDetailsString !== null) {
    userDetails = JSON.parse(userDetailsString);
  }


  const handleToggle = async () => {
    setIsChecked(!isChecked);
    if (!isChecked) {
      // Define this function to get user email
      const subscribeInfo = {
        user_id: userDetails?.user?.user_id,
        email: userDetails?.user?.email,
        auction_subscriber: 1,
      };

      try {
        const response = await axios.post(
          "https://darktechteam.com/api/subscription/new_subscriber",
          subscribeInfo,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response)
      } catch (error) {
        console.error("Error subscription:", error);
      }
    }
  };

  const switchStyle: React.CSSProperties = {
    position: 'relative',
    display: 'inline-block',
    width: '50px',
    height: '26px'
  };

  const sliderStyle: React.CSSProperties = {
    position: 'absolute',
    cursor: 'pointer',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    backgroundColor: isChecked ? '#2196F3' : '#ccc',
    transition: 'background-color .4s',
    borderRadius: '34px'
  };

  const sliderButtonStyle: React.CSSProperties = {
    position: 'absolute',
    content: '""',
    height: '20px',
    width: '20px',
    left: isChecked ? '30px' : '4px',
    bottom: '4px',
    backgroundColor: 'white',
    transition: 'left .4s',
    borderRadius: '50%'
  };

  return (
    <div className='flex items-center gap-2 my-4'>
        <h2 className='' >Subscribe for Aucion</h2>
      <label style={switchStyle}>
        <input type="checkbox" checked={isChecked} onChange={handleToggle} style={{ opacity: 0, width: 0, height: 0 }} />
        <span style={sliderStyle}>
          <span style={sliderButtonStyle}></span>
        </span>
      </label>
      {/* <span style={{ marginLeft: '10px' }}>{isChecked ? 'ON' : 'OFF'}</span> */}
    </div>
  );
};

export default Switch;
