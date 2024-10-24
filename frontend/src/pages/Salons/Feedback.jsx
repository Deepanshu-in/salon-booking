/* eslint-disable react/prop-types */
import { useState } from "react";
import avatar from "../../assets/images/user.png";
import { AiFillStar } from "react-icons/ai";
import FeedbackForm from "./FeedbackForm";
import ConvertCreatedAt from "../../utils/ConvertCreatedAt";

const Feedback = ({ reviews, totalRating }) => {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  return (
    <div>
      <div className="mb-[20px] items-center">
        <h4 className=" text-[20px] leading-[30px] font-bold  text-headingColor mb-[30px]">
          All Reviews({totalRating})
        </h4>
        <div className="overflow-scroll h-[400px] border border-primaryColor rounded-lg p-4">
          {reviews?.map((review, index) => {
            return (
              <div key={index} className="h-auto w-auto">
                <div className="flex justify-between gap-10 mb-[30px]">
                  <div className="flex gap-5">
                    <figure className="w-10 h-10 rounded-full overflow-hidden">
                      <img
                        src={review.user?.photo || avatar}
                        alt="User Avatar"
                      />{" "}
                    </figure>
                    <div>
                      <div className="flex flex-col gap-2 md:flex-row md:w-[600px] justify-between">
                        <h5 className="text-[16px] leading-6 text-primaryColor font-bold">
                          {review.user?.name}
                        </h5>
                        <div className="flex gap-1 items-center">
                          {[...Array(review?.rating).keys()].map((index) => (
                            <AiFillStar key={index} color="#0067FF" />
                          ))}
                        </div>
                      </div>
                      <p className="text-[15px] leading-6 text-textColor mt-2 md:mt-0">
                        {ConvertCreatedAt(review?.createdAt)}
                      </p>
                      <p className="text_para mt-2 font-medium text-[15px]">
                        {review?.reviewText}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {!showFeedbackForm && (
        <div className="text-center">
          <button className="btn" onClick={() => setShowFeedbackForm(true)}>
            Give Feedback
          </button>
        </div>
      )}

      {showFeedbackForm && <FeedbackForm />}
    </div>
  );
};

export default Feedback;
