import { Modal } from "@mui/material";
import { useRef, useState } from "react";
import Avatar from "react-avatar-edit";
import { cn } from "#/lib/cn";
import { request } from "#/utilities/fetch";

export const AvatarCropModal = ({
  fileUrl,
  setFileUrl,
  open,
  setOpen,
  previews,
  setPreviews,
}) => {
  const [preview, setPreview] = useState([]);
  const avatarEditor = useRef(null);
  const onClose = () => {
    setPreview("");
  };

  const saveImage = async () => {
    setOpen(false);

    const data = new FormData();
    data.append("file", preview);
    data.append("upload_preset", "ml_default");
    data.append("cloud_name", "Honeywell");
    const resp = request(
      "https://api.cloudinary.com/v1_1/Honeywell/image/upload",
      {
        method: "POST",
        body: data,
      },
      true,
    );

    resp.then(respData => {
      console.log("respData", respData);
      if (typeof respData.url === "string") {
        setPreviews([...previews, respData.url]);
      }
    });
  };

  const onCrop = preview => {
    setPreview(preview);
  };

  const onBeforeFileLoad = elem => {
    if (elem.target.files[0].size > 71680) {
      alert("File is too big!");
      elem.target.value = "";
    }
  };

  const close = () => {
    setFileUrl("");
    setPreview("");
    setOpen(false);
  };

  return (
    <Modal open={open}>
      <div
        className={cn(
          "fixed left-1/2 top-1/2 w-[335px] -translate-x-1/2 -translate-y-1/2 rounded-[10px] border border-black5 bg-black2 shadow-lg outline-none md:top-[103px] md:w-[450px] md:translate-y-0",
        )}
      >
        <div className={cn("flex flex-col px-[30px] py-[30px] md:pb-[46px]")}>
          <span
            className={cn(
              "mb-[30px] text-center text-[20px] font-semibold leading-[23.87px] md:text-[24px] md:leading-[28.64px]",
            )}
          >
            Crop Your Image
          </span>
          {fileUrl ? (
            <>
              <div className="avatar-container">
                <Avatar
                  ref={avatarEditor}
                  exportAsSquare
                  cropRadius={0}
                  width={"100%"}
                  height={388}
                  onCrop={_preview => onCrop(_preview)}
                  onClose={onClose}
                  onBeforeFileLoad={elem => onBeforeFileLoad(elem)}
                  src={fileUrl}
                />
              </div>
              <div
                className={cn(
                  "mt-[30px] flex justify-between space-x-[8.5px] md:space-x-3",
                )}
              >
                <button
                  className={cn(
                    "h-[50px] flex-1 rounded-[5px] bg-white text-[14px] font-semibold leading-[16.71px] text-black",
                  )}
                  onClick={close}
                >
                  Cancel
                </button>
                <button
                  className={cn(
                    "gradient-button gradient-button-rounded-sm gradient-button-padding-md h-[50px] flex-1 text-[14px] font-semibold leading-[16.71px]",
                  )}
                  onClick={() => saveImage()}
                >
                  Save Image
                </button>
              </div>
            </>
          ) : (
            <div className={cn("flex items-center justify-center")}>
              <svg className="spinnerInner" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="50" />
              </svg>
            </div>
          )}
          <button
            className={cn(
              "absolute right-0 top-0 flex h-[35px] w-[35px] items-center justify-center rounded-bl-[5px] rounded-tr-[5px] bg-black3",
            )}
            onClick={close}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1L11 11M1 11L11 1"
                stroke="#6A7179"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </Modal>
  );
};
