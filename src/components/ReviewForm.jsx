import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Modal } from "@mui/material";
import { setReviews } from "../api/moviesDB";
import { toast } from "react-toastify";

const ratingValidation = z.coerce
  .number()
  .min(0, { message: `rating cannot be less than 0` })
  .max(10, { message: `rating cannot exceed 10` })
  .optional();

const schema = z.object({
  plot: ratingValidation,
  visuals: ratingValidation,
  sound: ratingValidation,
  characters: ratingValidation,
  overall: z.coerce
    .number({ invalid_type_error: "Overall rating is required" })
    .min(1, { message: `Overall rating cannot be less than 1` })
    .max(10, { message: `rating cannot exceed 10` }),
  review: z
    .string()
    .min(20, { message: `Review must contain more than 20 characters` })
    .max(350, { message: `Review must not contain more than 350 characters` }),
});

const RatingInput = ({ formId, register, required, error, review }) => {
  return (
    <div className="mb-5">
      <div className="flex items-center">
        <label htmlFor={formId} className="text-lg font-semibold me-auto">
          {formId.charAt(0).toUpperCase() + formId.slice(1)}
        </label>
        <input
          type="number"
          defaultValue={review?.rating[formId]}
          {...register(formId)}
          id={formId}
          placeholder={required ? null : "optional"}
          className="rounded-md  max-w-24 bg-white dark:bg-mdb-sec-200 shadow-inner focus:shadow bg-transparent p-2 mx-2 text-gray-900 dark:text-white focus:ring-0 sm:leading-6"
        />
        <span className="text-2xl ms-2">/10</span>
      </div>
      <p className="text-xs font-semibold mt-1 text-red-500">
        {error?.message}
      </p>
    </div>
  );
};

const ReviewForm = ({ type, tmdbId, updateFunc, isReviewed, review }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const handleReview = async (reqBody) => {
    const result = await setReviews(type, tmdbId, reqBody);
    if (result.status === 200) {
      toast.success(isReviewed ? "Review Edited" : "Review Added");
      handleClose();
      updateFunc();
    } else {
      toast.error("Something went wrong");
    }
  };

  const loginAlert = () => toast.warn("Login to continue");

  return (
    <>
      <button
        className="btn bg-mdb-red"
        onClick={sessionStorage.getItem("token") ? handleOpen : loginAlert}
      >
        {isReviewed ? "EDIT" : "ADD"} REVIEW
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modal-box rounded mdb-page overflow-y-scroll mui-modal">
          <form
            onSubmit={handleSubmit((data) => handleReview(data))}
            className=" lg:flex lg:justify-between"
          >
            <div className="mb-16 lg:mb-0">
              <h2 className="text-3xl text-center lg:text-left">Add Rating</h2>
              <hr className="h-1 border-0 my-5 bg-mdb-red" />
              <RatingInput
                formId="plot"
                register={register}
                error={errors.plot}
                review={review}
              />
              <RatingInput
                formId="visuals"
                register={register}
                error={errors.visuals}
                review={review}
              />
              <RatingInput
                formId="sound"
                register={register}
                error={errors.sound}
                review={review}
              />
              <RatingInput
                formId="characters"
                register={register}
                error={errors.characters}
                review={review}
              />
              <RatingInput
                formId="overall"
                register={register}
                error={errors.overall}
                review={review}
                required
              />
            </div>
            <div className="grow lg:ms-16">
              <h2 className="text-3xl text-center lg:text-left">Add Review</h2>
              <hr className="h-1 border-0 my-5 bg-mdb-red" />
              <textarea
                {...register("review")}
                defaultValue={review?.review}
                cols="30"
                rows="9"
                className="rounded-md h-max w-full bg-white dark:bg-mdb-sec-200 shadow-inner focus:shadow bg-transparent p-2 text-gray-900 dark:text-white focus:ring-0 sm:leading-6"
              ></textarea>
              <div className="flex">
                <p className="text-xs font-semibold mt-1 text-red-500">
                  {errors.review?.message}
                </p>
                <button type="submit" className="btn bg-mdb-red  ms-auto mt-3">
                  {isReviewed ? "Edit" : "Add"} review
                </button>
              </div>
            </div>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default ReviewForm;
