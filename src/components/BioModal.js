import React from "react";
import { Modal } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setOpenBioModal } from "../redux/reducers/ModalReducer";

const BioModal = () => {
	const dispatch = useDispatch();
	const open = useSelector(store => store.ModalReducer.openBioModal);
	const referral = useSelector(store => store.ModalReducer.referral);
	const nav = useNavigate()

	const seeProfile = () => {
		nav("/profile")
		dispatch(setOpenBioModal(referral));
	}

	const close = async () => {
		dispatch(setOpenBioModal());
	};

	return (
		<Modal open={open} onClose={close}>
			<div className="fixed top-1/2 md:top-[103px] left-1/2 -translate-y-1/2 md:translate-y-0 -translate-x-1/2 bg-black2 border border-black5 outline-none rounded-[10px] shadow-lg w-[335px] md:w-[450px]">
				<div className="flex flex-col items-center border-b border-black3 py-[30px] px-4 md:p-[30px] relative overflow-hidden">
					<button className="flex justify-center items-center w-[35px] h-[35px] absolute top-0 right-0 bg-black3 rounded-tr-[5px] rounded-bl-[5px]" onClick={close}>
						<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M1 1L11 11M1 11L11 1" stroke="#6A7179" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
					</button>
					<img className="w-[125px] h-[125px] rounded-full" src={referral?.avatarURL} alt="" />
					<span className="mt-[15px] font-semibold text-[20px] md:text-[24px] leading-[23.87px] md:leading-[28.64px] text-center">{referral?.name}</span>
					<span className="mt-[15px] text-[12px] leading-[18px] text-center">{referral?.bio}</span>
					<div className="flex flex-col space-y-[10px] md:space-y-[15px] mt-[30px] w-full font-semibold text-[12px] md:text-[14px] leading-[14.32px] md:leading-[16.71px]">
						<button className="flex justify-between items-center px-[23.46px] md:px-[30px] h-[40px] md:h-[50px] rounded-[5px] bg-black3 relative">
							<img className="w-6 md:w-[30px] h-6 md:h-[30px]" src="/images/imessage.png" alt="" />
							<span>Chat on iMessage</span>
							<svg className="w-[5.47px] h-[9.38px] md:w-auto md:h-auto" width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M6.70469 5.28973L1.71296 0.29385C1.61988 0.200688 1.50937 0.126788 1.38775 0.0763693C1.26613 0.0259505 1.13578 0 1.00413 0C0.738274 0 0.483301 0.105701 0.295309 0.29385C0.202225 0.387011 0.128386 0.49761 0.0780091 0.619332C0.0276322 0.741054 0.00170425 0.871514 0.00170425 1.00326C0.00170425 1.26935 0.107317 1.52453 0.295309 1.71268L4.5882 5.99915L0.295309 10.2856C0.201736 10.3785 0.127465 10.489 0.07678 10.6108C0.0260953 10.7325 0 10.8631 0 10.995C0 11.1269 0.0260953 11.2575 0.07678 11.3793C0.127465 11.501 0.201736 11.6116 0.295309 11.7044C0.388118 11.7981 0.498536 11.8724 0.620194 11.9232C0.741852 11.9739 0.872341 12 1.00413 12C1.13593 12 1.26642 11.9739 1.38808 11.9232C1.50973 11.8724 1.62015 11.7981 1.71296 11.7044L6.70469 6.70856C6.79826 6.61568 6.87254 6.50517 6.92322 6.38341C6.97391 6.26165 7 6.13105 7 5.99915C7 5.86724 6.97391 5.73665 6.92322 5.61489C6.87254 5.49313 6.79826 5.38262 6.70469 5.28973Z" fill="white" />
							</svg>
						</button>
						<button className="flex justify-between items-center px-[23.46px] md:px-[30px] h-[40px] md:h-[50px] rounded-[5px] bg-black3 relative">
							<img className="w-6 md:w-[30px] h-6 md:h-[30px]" src="/images/whatsapp.png" alt="" />
							<span>Chat on WhatsApp</span>
							<svg className="w-[5.47px] h-[9.38px] md:w-auto md:h-auto" width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M6.70469 5.28973L1.71296 0.29385C1.61988 0.200688 1.50937 0.126788 1.38775 0.0763693C1.26613 0.0259505 1.13578 0 1.00413 0C0.738274 0 0.483301 0.105701 0.295309 0.29385C0.202225 0.387011 0.128386 0.49761 0.0780091 0.619332C0.0276322 0.741054 0.00170425 0.871514 0.00170425 1.00326C0.00170425 1.26935 0.107317 1.52453 0.295309 1.71268L4.5882 5.99915L0.295309 10.2856C0.201736 10.3785 0.127465 10.489 0.07678 10.6108C0.0260953 10.7325 0 10.8631 0 10.995C0 11.1269 0.0260953 11.2575 0.07678 11.3793C0.127465 11.501 0.201736 11.6116 0.295309 11.7044C0.388118 11.7981 0.498536 11.8724 0.620194 11.9232C0.741852 11.9739 0.872341 12 1.00413 12C1.13593 12 1.26642 11.9739 1.38808 11.9232C1.50973 11.8724 1.62015 11.7981 1.71296 11.7044L6.70469 6.70856C6.79826 6.61568 6.87254 6.50517 6.92322 6.38341C6.97391 6.26165 7 6.13105 7 5.99915C7 5.86724 6.97391 5.73665 6.92322 5.61489C6.87254 5.49313 6.79826 5.38262 6.70469 5.28973Z" fill="white" />
							</svg>
						</button>
						<button className="flex justify-between items-center px-[23.46px] md:px-[30px] h-[40px] md:h-[50px] rounded-[5px] bg-black3 relative">
							<img className="w-6 md:w-[30px] h-6 md:h-[30px]" src="/images/telegram.png" alt="" />
							<span>Chat on Telegram</span>
							<svg className="w-[5.47px] h-[9.38px] md:w-auto md:h-auto" width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M6.70469 5.28973L1.71296 0.29385C1.61988 0.200688 1.50937 0.126788 1.38775 0.0763693C1.26613 0.0259505 1.13578 0 1.00413 0C0.738274 0 0.483301 0.105701 0.295309 0.29385C0.202225 0.387011 0.128386 0.49761 0.0780091 0.619332C0.0276322 0.741054 0.00170425 0.871514 0.00170425 1.00326C0.00170425 1.26935 0.107317 1.52453 0.295309 1.71268L4.5882 5.99915L0.295309 10.2856C0.201736 10.3785 0.127465 10.489 0.07678 10.6108C0.0260953 10.7325 0 10.8631 0 10.995C0 11.1269 0.0260953 11.2575 0.07678 11.3793C0.127465 11.501 0.201736 11.6116 0.295309 11.7044C0.388118 11.7981 0.498536 11.8724 0.620194 11.9232C0.741852 11.9739 0.872341 12 1.00413 12C1.13593 12 1.26642 11.9739 1.38808 11.9232C1.50973 11.8724 1.62015 11.7981 1.71296 11.7044L6.70469 6.70856C6.79826 6.61568 6.87254 6.50517 6.92322 6.38341C6.97391 6.26165 7 6.13105 7 5.99915C7 5.86724 6.97391 5.73665 6.92322 5.61489C6.87254 5.49313 6.79826 5.38262 6.70469 5.28973Z" fill="white" />
							</svg>
						</button>
					</div>
				</div>
				<div className="flex justify-center items-center py-[30px] px-4 md:p-[30px]">
					<button className="gradient-button gradient-button-rounded-sm gradient-button-padding-md w-full h-[40px] md:h-[50px] text-[12px] md:text-[14px] leading-[14.32px] md:leading-[16.71px]" onClick={seeProfile}>
						View Profile on Dopple
					</button>
				</div>
			</div>
		</Modal>
	)
}

export default BioModal;