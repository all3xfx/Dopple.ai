import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  openUsernameModal: false,
  openSignModal: false,
  openBioModal: false,
  openChatModal: false,
  openMenuModal: false,
  openShareModal: false,
  openChatSettingsModal: false,
  openWaitlistModal: false,
  details: {},
};

export const ModalReducer = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setOpenUsernameModal: (state, action) => {
      state.openUsernameModal = !state.openUsernameModal;
    },
    setOpenSignModal: (state, action) => {
      state.openSignModal = !state.openSignModal;
    },
    setOpenBioModal: (state, action) => {
      state.referral = action.payload;
      state.openBioModal = !state.openBioModal;
    },
    setOpenShareModal: (state, action) => {
      state.openShareModal = !state.openShareModal;
    },
    setOpenChatModal: (state, action) => {
      state.openChatModal = !state.openChatModal;
    },
    setOpenWaitlistModal: (state, action) => {
      state.openWaitlistModal = !state.openWaitlistModal;
    },
    setOpenChatSettingsModal: (state, action) => {
      state.openChatSettingsModal = !state.openChatSettingsModal;
    },
    setOpenMenuModal: (state, action) => {
      state.openMenuModal = !state.openMenuModal;
    },
    setDetails: (state, action) => {
      state.details = action.payload;
    },
    setReferralDopple: (state, action) => {
      state.referral = action.payload;
    },
  },
});

export const {
  setOpenUsernameModal,
  setOpenSignModal,
  setOpenChatSettingsModal,
  setOpenBioModal,
  setOpenShareModal,
  setOpenChatModal,
  setOpenWaitlistModal,
  setOpenMenuModal,
  setDetails,
  setReferralDopple,
} = ModalReducer.actions;

export default ModalReducer.reducer;

