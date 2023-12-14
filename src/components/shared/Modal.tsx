"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useModal } from "#/state/modal";

import { AuthModal } from "../modals/AuthModal";
import { WaitlistModal } from "../modals/WaitlistModal";
import { ChatSettingsModal } from "../modals/ChatSettingsModal";
import { UsernameModal } from "../modals/UsernameModal";

interface IProps {
  trigger?: any;
  className?: string;
  type: string;
}

const handleModalType = (type: string) => {
  switch (type) {
    case "auth":
      return <AuthModal />;

    case "waitlist":
      return <WaitlistModal />;

    case "chat":
      return <ChatSettingsModal />;

    case "username":
      return <UsernameModal />;

    default:
      return <></>;
  }
};

export function Modal({ trigger, className, type }: IProps) {
  const modalType = useModal(state => state.type);
  const setModal = useModal(state => state.setModal);

  return (
    <Dialog.Root
      open={type === modalType}
      onOpenChange={open => {
        !open && setModal("none");
      }}
    >
      {trigger && <Dialog.Trigger>{trigger}</Dialog.Trigger>}
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay">
          <Dialog.Content className={className ? className : "DialogContent"}>
            {handleModalType(type)}
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
