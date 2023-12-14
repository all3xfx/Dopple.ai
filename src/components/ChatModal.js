import React, { useRef } from "react";
import { Modal, Slide } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setOpenChatModal } from "../redux/reducers/ModalReducer";
import { useOutsideDetector } from "../hooks/useOutsideDetector";

const ChatModal = () => {
	const dispatch = useDispatch();
	const open = useSelector(store => store.ModalReducer.openChatModal);
	const referral = useSelector(store => store.ModalReducer.referral);
	let container = useRef();

	const close = async () => {
		dispatch(setOpenChatModal());
	};

	useOutsideDetector([container], () => open === true && close())

	return (
		<Modal open={open} onClose={close}>
			<div className="absolute w-full h-full bg-menuback backdrop-blur-[5px]">
				<div className="fixed bottom-0 sm1:bottom-1/2 left-1/2 sm1:translate-y-1/2 -translate-x-1/2 w-full sm1:w-[450px]" ref={container}>
					<Slide direction="up" in={open} timeout={300}>
						<div className="bg-nav-desktop outline-none rounded-tl-[34.24px] rounded-tr-[34.24px] sm1:rounded-[10px] shadow-lg">
							<div className="flex flex-col items-center pt-[95px] sm1:pt-[170px] pb-[35px] sm1:pb-[30px] px-5 sm1:px-[30px] relative">
								<img className="w-[150px] sm1:w-[125px] h-[150px] sm1:h-[125px] rounded-[15px] absolute top-[-75px] sm1:top-[30px] left-1/2 -translate-x-1/2" src={referral?.avatarURL+"?tr=w-150,h-150"} alt="" />
								<div className="flex items-center space-x-[5.71px]">
									<span className="font-bold text-[24px] leading-[28px] text-center">{referral?.name}</span>
									<img className="w-5 h-5" src="/images/explore/verified.svg" alt="" />
								</div>
								<span className="mt-[10px] text-subtext font-bold text-[16px] sm1:text-[15px] leading-[19px] sm1:leading-[18px] text-center">{referral?.tagLine}</span>
								<span className="mt-[10px] text-subtext text-[14px] leading-[17px] text-center">{referral?.bio}</span>
								<div className="flex flex-col space-y-[11.41px] sm1:space-y-[15px] mt-5 sm1:mt-[15px] w-full font-bold text-[14px] leading-[17px]">
									{/* <a className="flex justify-between items-center px-5 sm1:px-[30px] py-[10px] rounded-[5px] bg-button relative transition duration-800 hover:bg-blue2 hover:text-white" href="imessage://+17866177929" target="_blank" rel="noreferrer">
										<img className="w-[26.1px] sm1:w-[30px] h-[25px] sm1:h-[30px]" src="/images/dopple.png" alt="" />
										<span>Chat on Dopple</span>
										<svg className="w-[6.52px] h-[10.71px] sm1:w-auto sm1:h-auto" width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M6.70469 5.28973L1.71296 0.29385C1.61988 0.200688 1.50937 0.126788 1.38775 0.0763693C1.26613 0.0259505 1.13578 0 1.00413 0C0.738274 0 0.483301 0.105701 0.295309 0.29385C0.202225 0.387011 0.128386 0.49761 0.0780091 0.619332C0.0276322 0.741054 0.00170425 0.871514 0.00170425 1.00326C0.00170425 1.26935 0.107317 1.52453 0.295309 1.71268L4.5882 5.99915L0.295309 10.2856C0.201736 10.3785 0.127465 10.489 0.07678 10.6108C0.0260953 10.7325 0 10.8631 0 10.995C0 11.1269 0.0260953 11.2575 0.07678 11.3793C0.127465 11.501 0.201736 11.6116 0.295309 11.7044C0.388118 11.7981 0.498536 11.8724 0.620194 11.9232C0.741852 11.9739 0.872341 12 1.00413 12C1.13593 12 1.26642 11.9739 1.38808 11.9232C1.50973 11.8724 1.62015 11.7981 1.71296 11.7044L6.70469 6.70856C6.79826 6.61568 6.87254 6.50517 6.92322 6.38341C6.97391 6.26165 7 6.13105 7 5.99915C7 5.86724 6.97391 5.73665 6.92322 5.61489C6.87254 5.49313 6.79826 5.38262 6.70469 5.28973Z" fill="white" />
										</svg>
									</a> */}
									<a className="flex justify-between items-center px-5 sm1:px-[30px] py-[10px] rounded-[5px] bg-button relative transition duration-800 hover:bg-blue2 hover:text-white" href="imessage://+17866177929" target="_blank" rel="noreferrer">
										<img className="w-[26.1px] sm1:w-[30px] h-[25px] sm1:h-[30px]" src="/images/imessage.png" alt="" />
										<span>Chat on iMessage</span>
										<svg className="w-[6.52px] h-[10.71px] sm1:w-auto sm1:h-auto" width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M6.70469 5.28973L1.71296 0.29385C1.61988 0.200688 1.50937 0.126788 1.38775 0.0763693C1.26613 0.0259505 1.13578 0 1.00413 0C0.738274 0 0.483301 0.105701 0.295309 0.29385C0.202225 0.387011 0.128386 0.49761 0.0780091 0.619332C0.0276322 0.741054 0.00170425 0.871514 0.00170425 1.00326C0.00170425 1.26935 0.107317 1.52453 0.295309 1.71268L4.5882 5.99915L0.295309 10.2856C0.201736 10.3785 0.127465 10.489 0.07678 10.6108C0.0260953 10.7325 0 10.8631 0 10.995C0 11.1269 0.0260953 11.2575 0.07678 11.3793C0.127465 11.501 0.201736 11.6116 0.295309 11.7044C0.388118 11.7981 0.498536 11.8724 0.620194 11.9232C0.741852 11.9739 0.872341 12 1.00413 12C1.13593 12 1.26642 11.9739 1.38808 11.9232C1.50973 11.8724 1.62015 11.7981 1.71296 11.7044L6.70469 6.70856C6.79826 6.61568 6.87254 6.50517 6.92322 6.38341C6.97391 6.26165 7 6.13105 7 5.99915C7 5.86724 6.97391 5.73665 6.92322 5.61489C6.87254 5.49313 6.79826 5.38262 6.70469 5.28973Z" fill="white" />
										</svg>
									</a>
									<a className="flex justify-between items-center px-5 sm1:px-[30px] py-[10px] rounded-[5px] bg-button relative transition duration-800 hover:bg-blue2 hover:text-white" href="imessage://+17866177929" target="_blank" rel="noreferrer">
										<img className="w-[26.1px] sm1:w-[30px] h-[25px] sm1:h-[30px]" src="/images/telegram.png" alt="" />
										<span>Chat on Telegram</span>
										<svg className="w-[6.52px] h-[10.71px] sm1:w-auto sm1:h-auto" width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M6.70469 5.28973L1.71296 0.29385C1.61988 0.200688 1.50937 0.126788 1.38775 0.0763693C1.26613 0.0259505 1.13578 0 1.00413 0C0.738274 0 0.483301 0.105701 0.295309 0.29385C0.202225 0.387011 0.128386 0.49761 0.0780091 0.619332C0.0276322 0.741054 0.00170425 0.871514 0.00170425 1.00326C0.00170425 1.26935 0.107317 1.52453 0.295309 1.71268L4.5882 5.99915L0.295309 10.2856C0.201736 10.3785 0.127465 10.489 0.07678 10.6108C0.0260953 10.7325 0 10.8631 0 10.995C0 11.1269 0.0260953 11.2575 0.07678 11.3793C0.127465 11.501 0.201736 11.6116 0.295309 11.7044C0.388118 11.7981 0.498536 11.8724 0.620194 11.9232C0.741852 11.9739 0.872341 12 1.00413 12C1.13593 12 1.26642 11.9739 1.38808 11.9232C1.50973 11.8724 1.62015 11.7981 1.71296 11.7044L6.70469 6.70856C6.79826 6.61568 6.87254 6.50517 6.92322 6.38341C6.97391 6.26165 7 6.13105 7 5.99915C7 5.86724 6.97391 5.73665 6.92322 5.61489C6.87254 5.49313 6.79826 5.38262 6.70469 5.28973Z" fill="white" />
										</svg>
									</a>
								</div>
								<div className="block sm1:hidden mt-[15px] bg-button w-full h-[1px]" />
								<button className="block sm1:hidden border border-button rounded-[5px] w-full py-[16.5px] font-bold text-[14px] leading-[17px] mt-[15px]" onClick={close}>
									Close
								</button>
							</div>
							<div className="hidden sm1:block p-[30px] border-t border-button w-full">
								<button className="border border-button rounded-[5px] w-full py-[16.5px] font-bold text-[14px] leading-[17px] transition duration-800 hover:border-blue2" onClick={close}>
									Close
								</button>
							</div>
						</div>
					</Slide>
				</div>
			</div>
		</Modal >
	)
}

export default ChatModal;