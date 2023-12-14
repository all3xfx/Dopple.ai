"use client";

import Image from "next/image";
import { useState, useMemo } from "react";
import Cookies from "js-cookie";
import { useGoogleLogin } from "@react-oauth/google";
import { useModal } from "#/state/modal";

import { request } from "#/utilities/fetch";
import { useUserProfile } from "#/state/profile";

import { cn } from "#/lib/cn";

export function GoogleLoginButton() {
  const setProfile = useUserProfile(state => state.setProfile);
  const setModal = useModal(store => store.setModal);
  const [thirdPartyUser, setThirdPartyUser] = useState<any>({});

  const loginGG = useGoogleLogin({
    onSuccess: codeResponse => setThirdPartyUser(codeResponse),
    onError: error => console.log("Login Failed:", error),
  });

  useMemo(async () => {
    console.log("thirdPartUser", thirdPartyUser);
    if (thirdPartyUser?.access_token) {
      const resp = request(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${thirdPartyUser.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${thirdPartyUser.access_token}`,
            Accept: "application/json",
          },
        },
        true,
      );

      resp.then(googleData => {
        const userData = request(`/user/email/${googleData.email}`, {}, true);

        userData.then(data => {
          if (data.exists) {
            Cookies.set("token", data.token);
            Cookies.set("userId", data.data._id);
            setProfile(data.data);
            setModal("none");
          } else {
            setProfile({ email: googleData.email });
            setModal("username");
          }
        });
      });
    }
  }, [thirdPartyUser]);

  return (
    <button
      type="button"
      className={cn(
        "duration-800 relative h-[45px] rounded-[5px] bg-button text-center text-[14px] font-bold leading-[17px] outline-none transition hover:bg-white hover:text-[#191A1E] md:h-[50px]",
      )}
      onClick={() => loginGG()}
    >
      Continue with Google
      <Image
        width={24}
        height={24}
        className={cn(
          "absolute left-5 top-1/2 h-[23.17px] w-[23.17px] -translate-y-1/2 md:left-[15px] md:h-5 md:w-5",
        )}
        src="/images/google.svg"
        alt=""
      />
    </button>
  );
}
