import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, Box, Modal } from "@mui/material";
import { toast } from "react-toastify";
import { FaRegEdit } from "react-icons/fa";
import { FcAddImage } from "react-icons/fc";
import { useUserDetail } from "../contexts/UserProvider";
import { editUserData } from "../api/moviesDB";

const userSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must contain at least 3 characters" })
    .max(20, { message: "Username must contain at most 20 characters" })
    .trim(),
  password: z
    .string()
    .min(1, { message: "Password is required to update user details" })
    .min(8, { message: "Password must contain at least 8 characters" }),
  newpassword: z.union([
    z
      .string()
      .min(8, { message: "Password must contain at least 8 characters" })
      .optional(),
    z.literal(""),
  ]),
  profileimg: z
    .any()
    .optional()
    .refine(
      (file) => (file?.size ? file.size : 0) <= 2 * 1024 * 1024,
      "Image size cannot exceed 2MB"
    )
    .refine(
      (file) =>
        file?.size
          ? [
              "image/jpeg",
              "image/jpg",
              "image/png",
              "image/webp",
              undefined,
            ].includes(file?.type)
          : true,
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
});

const ProfileEdit = () => {
  const [open, setOpen] = useState(false);
  const [updateImgPreview, setUpdateImgPreview] = useState(null);
  const { userDetails, setUserDetails } = useUserDetail();
  const {
    register,
    reset,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(userSchema) });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleReset = () => {
    reset();
    setUpdateImgPreview(userDetails?.userimgurl);
  };

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    setUpdateImgPreview(URL.createObjectURL(file));
    setValue("profileimg", file);
  };

  const onSubmit = async (data) => {
    const reqHeader = updateImgPreview
      ? {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        }
      : null;
    const result = await editUserData(data, reqHeader);
    if (result.status === 200) {
      toast.success("Profile Updated");
      setUserDetails(result.data?.userdata);
      reset();
      handleClose();
    } else {
      toast(result.response.data?.error);
    }
  };

  return (
    <>
      <div className="mt-3 mb-20 flex">
        <button onClick={handleOpen} className="btn ms-auto">
          <FaRegEdit size="1.5rem" />
        </button>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modal-box rounded max-w-[35rem] mdb-page overflow-y-scroll mui-modal">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="profileimg"
                className="text-lg font-semibold  my-2"
              >
                <Avatar
                  src={
                    updateImgPreview
                      ? updateImgPreview
                      : userDetails?.userimgurl
                  }
                  sx={{
                    width: 240,
                    height: 240,
                    mx: "auto",
                    border: "2px solid #777",
                  }}
                >
                  <FcAddImage size="10rem" />
                </Avatar>
                <input
                  type="file"
                  accept="image/*"
                  id="profileimg"
                  {...register("profileimg")}
                  onChange={handleImgChange}
                  className="hidden"
                />
              </label>
              <p className="text-xs font-semibold mt-1 text-red-500">
                {errors.profileimg?.message}
              </p>
            </div>
            <div className="h-24">
              <label htmlFor="username" className="text-lg font-semibold my-2">
                Username (Optional)
              </label>
              <input
                type="text"
                id="username"
                {...register("username")}
                autoComplete="username"
                defaultValue={userDetails?.username}
                className="rounded-md w-full bg-white dark:bg-mdb-sec-200 shadow-inner focus:shadow bg-transparent p-2 text-gray-900 dark:text-white focus:ring-0 sm:leading-6"
              />
              <p className="text-xs font-semibold mt-1 text-red-500">
                {errors.username?.message}
              </p>
            </div>
            <div className="h-24">
              <label htmlFor="password" className="text-lg font-semibold my-2">
                Password (Required)
              </label>
              <input
                type="password"
                id="password"
                {...register("password")}
                autoComplete="current-password"
                className="rounded-md w-full bg-white dark:bg-mdb-sec-200 shadow-inner focus:shadow bg-transparent p-2 text-gray-900 dark:text-white focus:ring-0 sm:leading-6"
              />
              <p className="text-xs font-semibold mt-1 text-red-500">
                {errors.password?.message}
              </p>
            </div>
            <div className="h-24">
              <label
                htmlFor="newpassword"
                className="text-lg font-semibold my-2"
              >
                New Password (Optional)
              </label>
              <input
                type="password"
                id="newpassword"
                {...register("newpassword")}
                autoComplete="new-password"
                className="rounded-md w-full bg-white dark:bg-mdb-sec-200 shadow-inner focus:shadow bg-transparent p-2 text-gray-900 dark:text-white focus:ring-0 sm:leading-6"
              />
              <p className="text-xs font-semibold mt-1 text-red-500">
                {errors.newpassword?.message}
              </p>
            </div>
            <div className="flex">
              <button
                onClick={handleReset}
                className="ms-auto me-5 btn bg-slate-600 text-white font-semibold"
              >
                Clear
              </button>
              <button
                onClick={handleClose}
                className="me-5 btn bg-slate-500 text-white font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn bg-mdb-red text-white font-semibold"
              >
                Update
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default ProfileEdit;
