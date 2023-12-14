import Image from "next/image";
import { useModal } from "#/state/modal";
import { cn } from "#/lib/cn";

interface IProps {
  mode: number;
}

export function ChatSettingsButton({ mode }: IProps) {
  const setModal = useModal(store => store.setModal);

  return (
    <button
      className={cn(
        "duration-800 flex h-[45px] w-[45px] items-center justify-center rounded-[5px] transition",
        {
          "bg-button hover:bg-[#34363C]": mode === 0,
          "bg-[#EDEDF0] hover:bg-[#DCDCE0]": mode === 1,
          "bg-candybutton hover:bg-[#DD14D5]": mode === 2,
          "bg-galaxybutton hover:bg-[#5200FF]": mode === 3,
        },
      )}
      onClick={() => setModal("chat")}
    >
      {mode === 0 && (
        <Image
          width={21}
          height={21}
          className=""
          src="/images/messages/settings/settings-dark.svg"
          alt=""
        />
      )}
      {mode === 1 && (
        <Image
          width={21}
          height={21}
          className=""
          src="/images/messages/settings/settings-light.svg"
          alt=""
        />
      )}
      {mode === 2 && (
        <Image
          width={21}
          height={21}
          className=""
          src="/images/messages/settings/settings-candy.svg"
          alt=""
        />
      )}
      {mode === 3 && (
        <Image
          width={21}
          height={21}
          className=""
          src="/images/messages/settings/settings-galaxy.svg"
          alt=""
        />
      )}
    </button>
  );
}
