import React from 'react';

const Comment = ({item,handleDownload,formatDate}:{item:any,handleDownload:any,formatDate:any}) => {
    const attachmentss = JSON.parse(item?.attachments);
    
    return (
        <div>
            <div  className={`${item?.sent_by === 'user' ? 'text-right' : 'text-left'}`}>
                      {item?.sent_by === 'admin' ? (
                        <div className="bg-gray-100 dark:bg-gray-800 shadow rounded-xl rounded-bl-none inline-block max-w-2/3 p-2 my-1">
                          <p className="py-2" dangerouslySetInnerHTML={{ __html: item?.comment }}></p>
                          <div className="text-right">
                           
                           <small className="text-xs">{formatDate(item?.ticket_issued)}</small>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-blue-100 dark:text-gray-800 shadow rounded-xl rounded-br-none inline-block max-w-2/3 p-2 my-1 mr-2">
                          <p className="py-2">{item?.comment}</p>
                          <div>
                            {
                                attachmentss?.map((item: any, index: number) => (
                                  <small
                                  key={index}
                                    onClick={() => handleDownload(item?.attachment_url)}
                                    className="text-[14px] text-blue-600 underline hover:text-blue-800 cursor-pointer mr-2"
                                  >File</small>))
                            }
                            <small className="text-xs">{formatDate(item?.comment_created_at)}</small>
                          </div>
                        </div>
                      )}
                    </div>
        </div>
    );
};

export default Comment;