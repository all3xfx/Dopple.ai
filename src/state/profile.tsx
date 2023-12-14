import { create } from "zustand";
import Cookies from "js-cookie";

import { request } from "#/utilities/fetch";
import { useModal } from "./modal";

const closeModal = useModal.getState().closeModal;

const initialData = {
  email: "",
  picture: 0,
  pictures: [],
  username: "",
  id: 289,
  token: "",
  type: 2,
};

export const useUserProfile = create<{
  profile: any;
  setProfile: (profile: any) => void;
  signUp: (data: any) => void;
  signIn: (data: any) => void;
  signOut: () => void;
  updateUser: (data: any) => void;
  refreshUser: () => void;
  deleteUser: (data: any) => void;
  uploadImage: (img: any) => void;
}>((set, get) => ({
  profile: initialData,
  setProfile: profile => set({ profile: { ...get().profile, ...profile } }),
  signUp: async formData => {
    const userInfo = request("https://api.ipify.org/?format=json");

    if (userInfo) {
      const { ip } = userInfo;

      const resp = request(
        "/user",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, ip }),
        },
        true,
      );

      resp.then(data => {
        if (data.success && data.token) {
          set({ profile: data.newUser });
          Cookies.set("token", data.token);
          Cookies.set("userId", data.newUser.id);
          closeModal();
        }
      });
    }
  },

  signIn: async formData => {
    const resp = request(
      "/user/signin",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData }),
      },
      true,
    );

    resp.then(data => {
      if (data.success && data.token) {
        set({ profile: data.data });
        Cookies.set("token", data.token);
        Cookies.set("userId", data.data.id);
        closeModal();
      }
    });
  },

  signOut: () => {
    Cookies.remove("token");
    Cookies.remove("userId");
    set({ profile: initialData });
  },

  refreshUser: async () => {
    const userId = Cookies.get("userId");

    if (typeof userId === "string") {
      const userData = request(`/user/${userId}`);

      userData.then(profile => set({ profile }));
    }
  },

  updateUser: async formData => {
    if (get().profile.email.length > 0) {
      const resp = request(
        "/user",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, email: get().profile.email }),
        },
        true,
      );

      resp.then(() => {
        get().refreshUser();
      });
    }
  },

  deleteUser: async formData => {
    const resp = request(
      "/user",
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData }),
      },
      true,
    );

    resp.then(data => {
      if (data.success) {
        get().signOut();
      }
    });
  },

  uploadImage: async image => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "ml_default");
    data.append("cloud_name", "Honeywell");

    const resp = request(
      "https://api.cloudinary.com/v1_1/Honeywell/image/upload",
      {
        method: "POST",
        headers: { "Content-Type": "form/data" },
        body: data,
      },
      true,
    );

    resp.then(data => {
      console.log("RESP DATA: ", data);
      if (data.success) {
        // add url to profile images update user and refresh user
      }
    });
  },
}));
