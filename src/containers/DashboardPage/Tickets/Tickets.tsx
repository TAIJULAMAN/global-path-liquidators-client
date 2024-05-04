import { Helmet } from "react-helmet-async";
import DashboardCommonLayout from "../DashboardCommonLayout";
import { FC, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export interface AccountPageProps {
  className?: string;
}
const Tickets: FC<AccountPageProps> = ({ className = "" }) => {
  let userDetails: any;
  const userDetailsString = localStorage.getItem("UserDetails");
  if (userDetailsString !== null) {
    userDetails = JSON.parse(userDetailsString);
  } else {
    // Handle the case where "UserDetails" is not present in localStorage
  }
  const userEmail = userDetails?.user?.email;
  const userId = userDetails?.user?.userId;

  const navigate = useNavigate();
  const [problemImage, setProblemImage] = useState<File | null>(null);
  const [subject, setSubject] = useState("");
  const [priority, setPriority] = useState("2");
  const [problemType, setType] = useState("");
  const [message, setMessage] = useState("");
  const [issuedate, setIssuDate] = useState(getCurrentDate());
  console.log(issuedate);

  const handleFileUpload = async (event: any) => {
    setProblemImage(event.target.files[0]);
  };
  const handleTicket = async (e: any) => {
    e.preventDefault();
    if (
      subject === "" ||
      message === "" ||
      priority === "" ||
      problemType === "" ||
      issuedate === "" ||
      problemImage === null
    ) {
      Swal.fire({
        icon: "error",
        toast: true,
        title: `Please fill all the fields`,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    }
    const ticketInfo = new FormData();
    ticketInfo.append("user_id", userDetails?.user?.user_id);
    ticketInfo.append("ticket_subject", subject);
    ticketInfo.append("ticket_type", problemType);
    ticketInfo.append("ticket_priority", priority);
    ticketInfo.append("ticket_desc", message);
    ticketInfo.append("ticket_issued", issuedate);
    ticketInfo.append("ticket_doc", problemImage ? problemImage : "");

    console.log(ticketInfo);
    try {
      const response: any = await axios.post(
        "https://darktechteam.com/api/tickets/create",
        ticketInfo,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.success);
      if (response) {
        Swal.fire({
          icon: "success",
          title: "SuccessFull",
          text: "Ticket created successfully",
        });
        navigate("/alltickets");
      }
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  const [fileInputs, setFileInputs] = useState([1]); // Initial state with one file input

  const addFileInput = () => {
    setFileInputs((prevState) => [...prevState, fileInputs.length + 1]);
  };

  function getCurrentDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  return (
    <div className={`nc-AccountPage ${className}`} data-nc-id="AccountPage">
      <Helmet>
        <title>Ticketing || Global Path Liquidators</title>
      </Helmet>
      <DashboardCommonLayout>
        <div className="">
          <div className="flex justify-between items-center gap-y-3">
            <h2 className="text-xl font-semibold my-6">Add Ticket</h2>
            <Link to="/alltickets">
              <button className="block py-1 px-4 bg-blue-500 hover:bg-blue-700 text-white rounded">
                Go Back
              </button>
            </Link>
          </div>

          <form className=" shadow-xl border rounded-lg p-4">
            <div>
              <div className="flex space-x-5 items-center my-6">
                <div className="w-full">
                  <label className="mb-2.5 block text-black dark:text-white">
                    User Name
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="User name"
                    value={`${userDetails?.user?.first_name} ${userDetails?.user?.last_name}`}
                    className="w-full rounded border-slate-200 border-opacity-50 bg-transparent py-3 px-5  outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
                <div className="w-full">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Email Address
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Email"
                    value={userEmail}
                    className="w-full rounded border-slate-200 border-opacity-50 bg-transparent py-3 px-5  outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark  dark:focus:border-primary"
                  />
                </div>
              </div>
              <div className="w-full">
                <label className="mb-2.5 block text-black dark:text-white">
                  Subject
                </label>
                <input
                  required
                  type="text"
                  placeholder="Subject"
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full rounded border-slate-200 border-opacity-50 bg-transparent py-3 px-5  outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>
              <div className="flex space-x-5 items-center my-6">
                <div className="w-full xl:w-1/3">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Ticket Type
                  </label>
                  <select
                    className="w-full rounded border-slate-200 border-opacity-50 bg-transparent py-3 px-5  outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value={1}>Website</option>
                    <option value={2}>Merchandise</option>
                    <option value={3}>Payment</option>
                    <option value={4}>Shipment</option>
                  </select>
                </div>

                <div className="w-full xl:w-1/3">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Select Priority
                  </label>
                  <select
                    className="w-full rounded border-slate-200 border-opacity-50 bg-transparent py-3 px-5  outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    onChange={(e) => setPriority(e.target.value)}
                  >
                    <option>High</option>
                    <option selected>Medium</option>
                    <option>Low</option>
                  </select>
                </div>

                <div className="w-full xl:w-1/3">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Issue Date
                  </label>
                  <input
                    required
                    type="date"
                    defaultValue={getCurrentDate()}
                    onChange={(e) => {
                      const date = new Date(e.target.value);
                      const formattedDate = date.toISOString().split("T")[0];
                      setIssuDate(formattedDate);
                    }}
                    className="w-full rounded border-slate-200 border-opacity-50 bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
              </div>
              {/* 16 Small Boxes for Birth Number */}
              <div className="w-full my-6">
                <label className="mb-2.5 block text-black dark:text-white">
                  Message
                </label>
                <textarea
                  required
                  placeholder="Write Here...."
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full rounded border-slate-200 border-opacity-200 bg-transparent py-3 px-5  outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>
              <div className="w-full">
                <div className="">
                  <div className="text-md text-natural-900 font-semibold mb-2 dark:text-white">
                    Problem Image
                  </div>
                  <input
                    required
                    type="file"
                    className="p-2 border rounded-md text-sm w-full focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                    placeholder="Enter Product image"
                    name="image"
                    onChange={handleFileUpload}
                  />
                </div>

                {/* <button
                  onClick={addFileInput}
                  className="bg-red-600 text-white py-2 px-4 rounded flex items-center"
                >
                
                  Add More
                </button> */}
              </div>
              <button
                onClick={handleTicket}
                className="bg-green-700 hover:bg-green-900 text-white py-2 px-8 rounded block mx-auto mt-4"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </DashboardCommonLayout>
    </div>
  );
};

export default Tickets;
