import Dropzone from "react-dropzone";
import { cn } from "#/lib/cn";

interface IProps {
  dropHandler: (acceptedFiles: any) => void;
}

export function CustomDropzone({ dropHandler }: IProps) {
  return (
    <Dropzone
      maxFiles={1}
      accept={["image/*"]}
      onDrop={acceptedFiles => dropHandler(acceptedFiles)}
    >
      {({ getRootProps, getInputProps }) => (
        <button
          className={cn(
            "flex max-h-[119px] min-h-[119px] min-w-[119px] max-w-[119px] items-center justify-center rounded-[5px] border-2 border-button bg-nav",
          )}
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="51"
            height="50"
            viewBox="0 0 51 50"
            fill="none"
          >
            <path
              d="M50.5 28.5714H29.0714V50H21.9286V28.5714H0.5V21.4286H21.9286V0H29.0714V21.4286H50.5V28.5714Z"
              fill="#23252B"
            />
          </svg>
        </button>
      )}
    </Dropzone>
  );
}
