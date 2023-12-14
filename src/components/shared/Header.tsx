import { SearchBar } from "../search/SearchBar";
import { Modal } from "./Modal";
import { Logo } from "../icons/Logo";
import { HeaderCreateButton } from "./HeaderCreateButton";
import { HeaderChatsButton } from "./HeaderChatsButton";
import { HeaderAuthButton } from "./HeaderAuthButton";

export function Header() {
  return (
    <header
      className={"z-2 w-full border-b border-button bg-nav lg:bg-nav-desktop"}
    >
      <div className="relative flex h-[75px] items-center justify-between px-5 xl:px-[60px] md1:h-[70px]">
        <Logo />
        <SearchBar />
        <div className="hidden flex-auto justify-end lg:flex">
          <Modal type="waitlist" trigger={<HeaderCreateButton />} />

          <HeaderChatsButton />

          <Modal type="auth" trigger={<HeaderAuthButton />} />
          <Modal type="username" />
        </div>
      </div>
    </header>
  );
}
