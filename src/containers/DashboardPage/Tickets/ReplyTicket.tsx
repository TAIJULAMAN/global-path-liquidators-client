import React, { FC, useEffect, useState } from "react";
import DashboardCommonLayout from "../DashboardCommonLayout";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { formatDate } from "components/FormateDate";
import { useCreateCommentsForAttachmentMutation, useGetTIcketsCommentQuery } from "features/api/commentApi";
import Comment from "./Comment";
export interface AccountPageProps {
  className?: string;
}
const ReplyTicket: FC<AccountPageProps> = ({ className = "" }) => {
  let userDetails: any;
  const userDetailsString = localStorage.getItem("UserDetails");
  if (userDetailsString !== null) {
    userDetails = JSON.parse(userDetailsString);
  } else {
    // Handle the case where "UserDetails" is not present in localStorage
  }
  const userEmail = userDetails?.user?.email
  const userId = userDetails?.user?.user_id


  interface Comments {
    comment: any;
    ticket_priority: string;
    ticket_subject: string;
    ticket_status: number;
    ticket_id: number;
    updated_at: string;
    cartId: number;
    product_id: number;
    deal_type_id: number;
    attachments: any;
    // Add other properties as needed
  }
  const { ticketId } = useParams();

  const [ticketDetails, setTicketDetails] = useState<Record<string, any>>({});
 

  const ticketStatus = ticketDetails?.ticket_status;


  // const [comments, setComments] = useState<Comments[]>([])

  const [reply, setReply] = useState('')
  const navigate = useNavigate();

  useEffect(() => {
    const getTktData = async () => {
      try {
        const response = await fetch(
          `https://darktechteam.com/api/tickets/ticket/${ticketId}`

        );
        const data = await response.json();
        setTicketDetails(data?.result);
      } catch (error) {
        console.error("Error fetching ticket comments:", error);
      }
    };

    getTktData();
  }, [ticketId]);
  //download attachment 
  const handleDownload = (problemFile: any) => {
    const link = document.createElement('a');
    link.href = `https://darktechteam.com/api/${problemFile}`;
    link.setAttribute('download', 'resume.pdf');
    link.setAttribute('target', '_blank');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // multiple comments
  const [fileInputs, setFileInputs] = useState([0]); // Initial state with one file input
  const [selectedFiles, setSelectedFiles] = useState<any[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const files = e.target.files;
    if (files) {
      setSelectedFiles(prevFiles => [...prevFiles, { index, files }]);
    }
  };

  const addMoreFileInput = () => {
    setFileInputs(prevInputs => [...prevInputs, prevInputs.length]);
  };

  // Post Reply Comment or new chating comment
  const [addAttachment] = useCreateCommentsForAttachmentMutation()
  const handleNewComment = async (e: any) => {
    e.preventDefault();
    const commentInfo = new FormData();
    commentInfo.append("user_id", userId ? userId : null);
    commentInfo.append("ticket_id", ticketId ? ticketId : '');
    commentInfo.append("comment", reply);
    commentInfo.append("sent_by", 'user');

    const filesData = selectedFiles.map(({ files }) => files);
    // Now you can post filesData to your server

    try {
      const response = await axios.post(
        "https://darktechteam.com/api/ticket-comments/new-comment",
        commentInfo,
        {
          headers: {
            'Content-Type': 'application/json'
          },
        }
      );
      const insertId =
        "data" in response ? response?.data?.result?.insertId : undefined;
      console.log(insertId)
      if (response) {
        handleAttachment(insertId)
        // await addAttachment({
        //   comment_id: insertId,
        //   ticket_id: ticketId,
        //   attachments: filesData,
        // })
        //   .then((response: any) => console.log(response))
        //   .catch((error: any) => console.log(error));
        Swal.fire({
          icon: "success",
          toast: true,
          title: "Susscessfully Replied",
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
        setReply('')
      }

      commentsData()
      setSelectedFiles([]) 
      setReply('')// Clear selected files
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };
  const handleAttachment = async (insertId: any) => {
    const attachmentInfo = new FormData();
    const filesData: any[] = selectedFiles.flatMap(({ files }) => Array.from(files));
    attachmentInfo.append("comment_id", insertId);
    if (ticketId !== undefined) {
      attachmentInfo.append("ticket_id", ticketId);
    }
    filesData.forEach(file => {
      attachmentInfo.append("attachments", file);
    });
    try {

      const response = await addAttachment(attachmentInfo);
      console.log(response); // Log server response

      setSelectedFiles([]); // Clear selected files
    } catch (error) {
      console.log(error); // Log any errors
      // Handle error (e.g., show error message)
    }
  };



  /// fetching comment or reply data 
  const {data:comments, refetch:commentsData} = useGetTIcketsCommentQuery(ticketId)

 
  const handleTicketClose = async () => {
    try {
      const response = await fetch(
        `https://darktechteam.com/api/tickets/close-ticket/${ticketId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      //  console.log(response);
      if (response) {
        Swal.fire({
          icon: "success",
          // toast: true,
          title: "Ticket Close Successfully",
          // position: "top-end",
          showConfirmButton: true,
          // timer: 3000,
          // timerProgressBar: true,
        });
        navigate(`/alltickets`);
      }

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Ticket closed successfully
      // You can handle the success response here
    } catch (error) {
      console.error("Error closing ticket:", error);
      // Handle error
    }
  };


  return (
    <div className={`nc-AccountPage ${className}`} data-nc-id="AccountPage">
      <Helmet>
        <title>Reply Ticket || Global Path Liquidators</title>
      </Helmet>
      <DashboardCommonLayout>
        <div className="border rounded-lg dark:border-gray-700 px-3">
          <div className="flex justify-between items-center gap-y-3">
            <h2 className="text-xl font-semibold my-6">Reply ticket</h2>
            <Link to='/alltickets'><button className="block py-1 px-4 bg-blue-500 hover:bg-blue-700 text-white rounded">Go Back</button></Link>

          </div>

          <div className="flex flex-col lg:flex-row gap-5 pb-3">
            <div className="lg:w-2/3 shadow-lg p-4 border rounded-lg dark:border-gray-700">
              <h3 className=" font-semibold mt-2 mb-2">Ticket #{ticketId}</h3>
              <h3 className=" font-semibold mt-2 mb-2">
                Subject: {ticketDetails?.ticket_subject}
              </h3>
              <hr className="my-2" />
              <div className="h-96 overflow-y-auto">
                <div className="flex justify-end">
                  <div className="bg-blue-100 dark:text-gray-800 shadow rounded-xl rounded-br-none rounded-t-lg max-w-2/3 text-right p-2 mr-2">
                    <p><span className="py-2">{ticketDetails?.ticket_desc}</span></p>
                    <div>
                      {
                        ticketDetails?.ticket_document ? (
                          <small
                            onClick={() => handleDownload(ticketDetails?.ticket_document)}
                            className="text-[14px] text-blue-600 underline hover:text-blue-800 cursor-pointer mr-2"
                          >File</small>) : ''
                      }
                      <small className="text-xs">{formatDate(ticketDetails?.ticket_issued)}</small>
                    </div>
                  </div>
                </div>
                {
                  comments?.result?.slice().reverse().map((item: any, index: number) => (
                    
                    <Comment item={item} handleDownload={handleDownload} formatDate={formatDate} key={index}></Comment>
                  )

                  )

                }
              </div>
              <hr className="my-2" />

              {ticketStatus === 1 &&

                <div className="">
                  <div className="w-full">
                    {/* <label className="font-semibold mt-2 mb-2">
                   New Reply
                 </label> */}
                    <textarea
                      required
                      placeholder="Write Here...."
                      onChange={(e) => setReply(e.target.value)}
                      className="w-full bg-slate-200 rounded border-slate-200 border-opacity-200 bg-transparent py-3 px-5  outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                  <div className="w-full">
                    {fileInputs.map((index) => (
                      <div key={index} className="mb-4">
                        <input
                          type="file"
                          required
                          onChange={(e) => handleFileChange(e, index)}
                          className="border border-slate-200 border-opacity-50 bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary w-full"
                        />
                      </div>
                    ))}

                    <button
                      onClick={addMoreFileInput}
                      className="bg-red-600 text-white py-2 px-6 rounded flex items-center"
                    >
                      Add More
                    </button>

                    {/* <button
                      onClick={handleSubmit}
                      className="bg-green-600 text-white py-2 px-6 rounded flex items-center mt-4"
                    >
                      Submit
                    </button> */}
                  </div>
                  <button onClick={handleNewComment} className="bg-green-700 hover:bg-green-800 text-white py-2 px-4 rounded block mx-auto mt-4">
                    Send
                  </button>
                </div>
              }



            </div>

            <div className="flex flex-col gap-x-3 border rounded-lg dark:border-gray-700 shadow-lg p-4 lg:w-1/3 ">
              <div className="flex justify-between items-center gap-y-3">
                <h3 className=" font-semibold mt-2 mb-2">Ticket Details</h3>
                <button
                  disabled={ticketDetails?.ticket_status === 0}
                  onClick={(e) => {
                    e.preventDefault();
                    handleTicketClose();
                  }}
                  className={`bg-red-200 text-red-600 text-xs hover:text-white hover:bg-red-600 p-1 rounded ${ticketDetails?.ticket_status === 0 && 'bg-red-400 text-white opacity-65 hover:bg-none'} `}>
                  {ticketDetails?.ticket_status === 0 ? 'Closed' : 'Close Ticket'}
                </button>
              </div>
              <div className="w-full h-[1px] bg-slate-200"></div>
              <div className="space-y-3 mt-2">
                <p className="overflow-hidden space-y-5"> <span className="font-semibold text-sm">Ticket:</span><span className="text-base ml-2">#{ticketId}</span>  </p>
                <p className="overflow-hidden space-y-5"> <span className="font-semibold text-sm">Name:</span><span className="text-base ml-2">{userDetails?.user?.first_name} {userDetails?.user?.last_name}</span> </p>
                <p className="overflow-hidden space-y-5"> <span className="font-semibold text-sm">Email:</span><span className="text-base ml-2">{userEmail}</span> </p>
                <p className="overflow-hidden space-y-5"> <span className="font-semibold text-sm">Department:</span><span className="text-base ml-2">{ticketDetails?.ticket_type === '1' ? 'Website' : ticketDetails?.ticket_type === '2' ? 'Merchandise' : ticketDetails?.ticket_type === '3' ? 'Payment' : 'Shipment'}</span> </p>
                <p className="overflow-hidden space-y-5"> <span className="font-semibold text-sm">Priority: </span><button className="text-xs px-2 ml-2 bg-red-200 text-red-600 p-1 rounded">{ticketDetails?.ticket_priority}</button> </p>
              </div>
            </div>
          </div>


        </div>
      </DashboardCommonLayout >
    </div >
  );
};

export default ReplyTicket;
