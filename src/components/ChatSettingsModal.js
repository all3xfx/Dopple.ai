import React, { Fragment, useContext, useMemo, useRef, useState } from "react";
import { Slide } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setDetails, setOpenChatSettingsModal, setOpenSignModal } from "../redux/reducers/ModalReducer";
import { RefContext } from "../contexts/RefContextProvider";
import HtmlTooltip from "./HtmlTooltip";
import { languages } from "../config";
import { useOutsideDetector } from "../hooks/useOutsideDetector";
import { useCookies } from "react-cookie";

const ChatSettingsModal = () => {
	const dispatch = useDispatch();
	const open = useSelector(store => store.ModalReducer.openChatSettingsModal);
	const profile = useSelector(store => store.AuthReducer.profile);
    const [, setCookies] = useCookies(["themeid"])
	const { isDark, setIsDark, language, setLanguage, alignment, setAlignment, textSize, setTextSize } = useContext(RefContext);
	const [chatFilter, setChatFilter] = useState(false);
	const [autoDelete, setAutoDelete] = useState(false);
	const [isLanguageShown, setIsLanguageShown] = useState(false);
	const [languageUnsaved, setLanguageUnsaved] = useState(language);
	const [voiceFrequency, setVoiceFrequency] = useState("0");
	let container = useRef();
	let tooltip = useRef();

	const setTheme = (i) => {
		if (profile) {
			setIsDark(i)
            setCookies("themeid", i)
		} else login()
	}

	const setNewAlignment = (i) => {
		if (profile) setAlignment(i)
		else login()
	}

	const _setIsLanguageShown = () => {
		if (profile) setIsLanguageShown(true)
		else login()
	}

	const login = () => {
		dispatch(setOpenSignModal());
		dispatch(setDetails({ openLoginOrSignup: true }))
	}

	const apply = () => {
		setIsLanguageShown(false)
		setLanguage(languageUnsaved)
	}

	const close = async () => {
		dispatch(setOpenChatSettingsModal());
	};

	useOutsideDetector([container, tooltip], () => open === true && close())

	return (
		<div className={"absolute w-full h-full transition duration-300" + (isDark === 1 ? " dark" : "") + (open ? " bg-menuback z-[1300] backdrop-blur-[5px]" : " pointer-events-none")}>
			<div className="fixed bottom-0 right-0 h-full" ref={container}>
				<Slide direction="left" in={open} timeout={300}>
					<div className={"outline-none w-[400px] h-full" + (isDark === 0 ? " bg-[#17181C]" : isDark === 1 ? " bg-white" : isDark === 2 ? " bg-candynav" : isDark === 3 ? " bg-galaxynav border-l border-galaxybutton" : "")}>
						<div className="py-[25px] px-5 relative overflow-auto max-h-full">
							<button className={"flex justify-center items-center absolute top-[13px] right-[20px] w-[45px] h-[45px] rounded-[5px] transition duration-800" + (isDark === 0 ? " bg-button hover:bg-[#34363C]" : isDark === 1 ? " bg-[#EDEDF0] hover:bg-[#DCDCE0]" : isDark === 2 ? " bg-candybutton" : isDark === 3 ? " bg-galaxybutton" : "")} onClick={close}>
								<svg className={isDark === 0 ? "text-blue2" : isDark === 1 ? "text-blue2" : isDark === 2 ? "text-candybuttonhighlight" : isDark === 3 ? "text-galaxybuttonhighlight" : ""} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 23 23" fill="none" stroke="currentColor">
									<path d="M2 2L21 21M2 21L21 2" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
								</svg>
							</button>
							{isLanguageShown &&
								<button className={"flex items-center space-x-[10px] absolute top-[27px] left-[20px] font-bold text-[14px] leading-[17px]" + (isDark === 0 ? " text-blue2" : isDark === 1 ? " text-blue2" : isDark === 2 ? " text-candybuttonhighlight" : isDark === 3 ? " text-galaxybuttonhighlight" : "")} onClick={() => setIsLanguageShown(false)}>
									<svg xmlns="http://www.w3.org/2000/svg" width="19" height="17" viewBox="0 0 19 17" stroke="currentColor">
										<path d="M1 8.5L8.28571 1.5M1 8.5L8.28571 15.5M1 8.5L18 8.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
									</svg>
								</button>
							}
							<div className="flex flex-col items-center">
								<span className={"font-bold text-[18px] leading-[22px] mb-[26px]" + (isDark === 0 ? "" : isDark === 1 ? " text-title" : isDark === 2 ? " text-candytitle" : "")}>{isLanguageShown ? "Language" : "Settings"}</span>
								<div className={"flex mb-[15px] text-[14px] leading-[17px] w-full border-b" + (isDark === 0 ? " border-button" : isDark === 1 ? " border-[#EDEDF0]" : isDark === 2 ? " border-candybutton" : isDark === 3 ? " border-galaxybutton" : "")}>
									<div className={"flex justify-center items-center space-x-[5px] h-10 flex-1 border-b-2 font-bold" + (isDark === 0 ? " text-white border-blue2" : isDark === 1 ? " text-title border-blue2" : isDark === 2 ? " text-candytitle border-candybuttonhighlight" : isDark === 3 ? " text-galaxytitle border-[#5200FF]" : "")}>
										<svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="currentColor">
											<path d="M16.8118 9.12488L13.8844 12.1558C13.4993 12.5545 13.3067 12.7538 13.0733 12.8916C12.9959 12.9373 12.9155 12.9777 12.8327 13.0126C12.5828 13.1178 12.308 13.1535 11.7583 13.2248L8.46977 13.6516C7.50765 13.7764 7.02659 13.8389 6.70846 13.6152C6.60703 13.5439 6.51974 13.4544 6.45105 13.3512C6.2356 13.0275 6.31025 12.5482 6.45956 11.5895L6.96474 8.3461C7.04661 7.82049 7.08754 7.55769 7.19232 7.31904C7.22706 7.2399 7.26689 7.16311 7.31157 7.08913C7.4463 6.86602 7.63756 6.68118 8.02006 6.31151L11.4339 3.01221H5.86367C4.36378 3.01221 3.61383 3.01221 3.0881 3.39417C2.91831 3.51753 2.769 3.66685 2.64564 3.83664C2.26367 4.36237 2.26367 5.11231 2.26367 6.61221V13.9604C2.26367 15.4603 2.26367 16.2102 2.64564 16.7359C2.769 16.9057 2.91831 17.055 3.0881 17.1784C3.61383 17.5604 4.36378 17.5604 5.86367 17.5604H13.2118C14.7117 17.5604 15.4617 17.5604 15.9874 17.1784C16.1572 17.055 16.3065 16.9057 16.4299 16.7359C16.8118 16.2102 16.8118 15.4603 16.8118 13.9604V9.12488Z" />
											<path fill-rule="evenodd" clip-rule="evenodd" d="M15.5817 1.04245C15.8501 0.774014 16.2448 0.733445 16.4632 0.951839L19.2373 3.7259C19.4557 3.9443 19.4151 4.33895 19.1466 4.60739L17.1844 6.56963L15.3684 4.75361L13.6195 3.00464L15.5817 1.04245ZM12.6474 3.97674L8.95511 7.66905C8.8475 7.77666 8.77198 7.91028 8.7404 8.04896L7.90708 11.7085C7.86247 11.9045 7.90972 12.0914 8.03478 12.2137C8.15983 12.336 8.34829 12.3796 8.5441 12.3315L12.1515 11.446C12.2862 11.4129 12.4155 11.3386 12.52 11.234L16.2123 7.54174L14.3963 5.7257L12.6474 3.97674Z" />
										</svg>
										<span>Chat Preferences</span>
									</div>
									<HtmlTooltip
										className={"remix-tooltip"}
										placement="bottom"
										title={
											<Fragment>
												<div className={"flex flex-col items-start space-y-3 relative z-[999999] p-5 dopple-tooltip rounded-[10px]" + (isDark === 0 ? " bg-nav after:border-t-nav shadow-tooltip-dark" : isDark === 1 ? " bg-white after:border-t-white shadow-tooltip-light" : isDark === 2 ? " bg-candynav after:border-t-candynav shadow-tooltip-candy" : isDark === 3 ? " bg-galaxynav after:border-t-galaxynav shadow-tooltip-galaxy" : "")} ref={tooltip}>
													<div className={"flex items-center space-x-[5px]" + (isDark === 0 ? " text-white" : isDark === 1 ? " text-title" : isDark === 2 ? " text-candytitle" : isDark === 3 ? " text-galaxytitle" : "")}>
														<span className="font-Inter font-bold text-[14px] leading-[17px]">Coming Soon for Dopple+ members.</span>
													</div>
												</div>
											</Fragment>
										}
									>
										<div className={"flex justify-center items-center space-x-[5px] h-10 flex-1" + (isDark === 0 ? " text-subtext" : isDark === 1 ? " text-subtext" : isDark === 2 ? " text-candybuttonhighlight" : isDark === 3 ? " text-galaxysubtext" : "")}>
											{(isDark === 0 || isDark === 1) ?
												<svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
													<path d="M3.02734 14.2283L5.99263 14.2283C6.75163 14.2283 7.44523 13.7986 7.78329 13.1191L11.0154 6.62206C11.3534 5.9425 12.047 5.51286 12.806 5.51286L17.6376 5.51286M17.6376 5.51286L15.2094 7.94101M17.6376 5.51286L15.2094 3.08471" stroke="#848D97" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="round" />
													<path fill-rule="evenodd" clip-rule="evenodd" d="M8.27039 8.7722L7.11179 6.44325C6.9005 6.01852 6.467 5.75 5.99263 5.75L3.02734 5.75L2.27734 5.75V4.25H3.02734H5.99263C7.03625 4.25 7.98995 4.84075 8.45479 5.77514L9.10807 7.08834L8.27039 8.7722ZM9.94575 12.1399L10.3439 12.9403C10.8087 13.8747 11.7624 14.4654 12.806 14.4654L15.8269 14.4654L14.6791 15.6132L14.1488 16.1436L15.2094 17.2042L15.7397 16.6739L18.1679 14.2457C18.4608 13.9528 18.4608 13.478 18.1679 13.1851L15.7397 10.7569L15.2094 10.2266L14.1487 11.2873L14.6791 11.8176L15.8269 12.9654L12.806 12.9654C12.3317 12.9654 11.8982 12.6969 11.6869 12.2722L10.7834 10.4561L9.94575 12.1399Z" fill="#848D97" />
												</svg>
												:
												(isDark === 2 ?
													<svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
														<path fill-rule="evenodd" clip-rule="evenodd" d="M3.44531 13.4783L7.18489 13.4783L11.3137 5.17881L11.5206 4.76286H11.9852L16.2449 4.76286L15.097 3.61504L14.5667 3.08471L15.6274 2.02405L16.1577 2.55438L18.5859 4.98253L19.1162 5.51286L18.5859 6.04319L16.1577 8.47134L15.6274 9.00167L14.5667 7.94101L15.097 7.41068L16.2449 6.26286L12.4497 6.26286L8.32096 14.5623L8.11404 14.9783H7.64946L3.44531 14.9783H2.69531V13.4783H3.44531ZM2.69531 4.33471H3.44531H7.64946H8.11404L8.32096 4.75066L9.40226 6.92424L8.5771 8.63327L7.18489 5.83471H3.44531H2.69531V4.33471ZM10.5316 12.5621L11.3577 10.8549L12.4497 13.0501H16.2449L15.097 11.9023L14.5667 11.372L15.6274 10.3113L16.1577 10.8416L18.5859 13.2698L19.1162 13.8001L18.5859 14.3305L16.1577 16.7586L15.6274 17.2889L14.5667 16.2283L15.097 15.6979L16.2449 14.5501H11.9851H11.5206L11.3137 14.1342L10.5316 12.5621Z" fill="#DD57AF" />
													</svg>
													:
													isDark === 3 ?
														<svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
															<path fill-rule="evenodd" clip-rule="evenodd" d="M3.44531 13.4784L7.18489 13.4784L11.3137 5.17893L11.5206 4.76298H11.9852L16.2449 4.76298L15.097 3.61516L14.5667 3.08483L15.6274 2.02417L16.1577 2.5545L18.5859 4.98265L19.1162 5.51298L18.5859 6.04331L16.1577 8.47146L15.6274 9.00179L14.5667 7.94113L15.097 7.4108L16.2449 6.26298L12.4497 6.26298L8.32096 14.5624L8.11404 14.9784H7.64946L3.44531 14.9784H2.69531V13.4784H3.44531ZM2.69531 4.33483H3.44531H7.64946H8.11404L8.32096 4.75078L9.40226 6.92436L8.5771 8.63339L7.18489 5.83483H3.44531H2.69531V4.33483ZM10.5316 12.5622L11.3577 10.855L12.4497 13.0502H16.2449L15.097 11.9024L14.5667 11.3721L15.6274 10.3114L16.1577 10.8418L18.5859 13.2699L19.1162 13.8002L18.5859 14.3306L16.1577 16.7587L15.6274 17.2891L14.5667 16.2284L15.097 15.6981L16.2449 14.5502H11.9851H11.5206L11.3137 14.1343L10.5316 12.5622Z" fill="#9277FF" />
														</svg>
														: null
												)
											}
											<span>Dopple Remix</span>
										</div>
									</HtmlTooltip>
								</div>
								{!isLanguageShown ?
									<>
										<div className="flex flex-col w-full">
											<span className={"pl-[15px] text-[14px] leading-[17px]" + (isDark === 0 ? " text-subtext" : isDark === 1 ? " text-subtext" : isDark === 2 ? " text-candybuttonhighlight" : isDark === 3 ? " text-galaxysubtext" : "")}>Chat Appearance</span>
											<div className={"flex justify-between items-center p-5 mt-[10px] rounded-[5px]" + (isDark === 0 ? " bg-button" : isDark === 1 ? " bg-[#EDEDF0] text-title" : isDark === 2 ? " bg-candybutton text-candytitle" : isDark === 3 ? " bg-galaxybutton text-white" : "")}>
												<button className={"flex flex-col items-center space-y-2 text-[14px] leading-[17px] transition duration-800 group" + (isDark === 0 ? " text-blue2" : "")} onClick={() => setTheme(0)}>
													<div className={"rounded-[5px] border transition duration-800" + (isDark === 0 ? " border-blue2 group-hover:border-blue2" : isDark === 1 ? " border-[#8A939D] group-hover:border-blue2" : isDark === 2 ? " border-[#8A939D] group-hover:border-candybuttonhighlight" : isDark === 3 ? " border-[#8A939D] group-hover:border-[#5200FF]" : "")}>
														<img className="w-[60px]" src="/images/account/darktheme-desktop.svg" alt="" />
													</div>
													<span>Dark</span>
													{isDark === 0 ?
														<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 21 20" fill="none">
															<rect x="0.5" width="20" height="20" rx="10" fill="#048DFF" />
															<path d="M5.5 9.14286L9.1 13L15.5 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
														</svg>
														:
														<div className={"w-[20px] h-[20px] rounded-full border" + (isDark === 0 ? " bg-inputback border-[#31333C]" : isDark === 1 ? " bg-white1 border-[#C6CED8]" : isDark === 2 ? " bg-candynav border-candybuttonhighlight" : isDark === 3 ? " bg-[rgba(11,3,16,.5)] border-galaxybuttonhighlight" : "")} />
													}
												</button>
												<button className={"flex flex-col items-center space-y-2 text-[14px] leading-[17px] transition duration-800 group" + (isDark === 1 ? " text-blue2" : "")} onClick={() => setTheme(1)}>
													<div className={"rounded-[5px] border transition duration-800" + (isDark === 0 ? " border-[#8A939D] group-hover:border-blue2" : isDark === 1 ? " border-blue2 group-hover:border-blue2" : isDark === 2 ? " border-[#8A939D] group-hover:border-candybuttonhighlight" : isDark === 3 ? " border-[#8A939D] group-hover:border-[#5200FF]" : "")}>
														<img className="w-[60px]" src="/images/account/lighttheme-desktop.svg" alt="" />
													</div>
													<span>Light</span>
													{isDark === 1 ?
														<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 21 20" fill="none">
															<rect x="0.5" width="20" height="20" rx="10" fill="#048DFF" />
															<path d="M5.5 9.14286L9.1 13L15.5 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
														</svg>
														:
														<div className={"w-[20px] h-[20px] rounded-full border" + (isDark === 0 ? " bg-inputback border-[#31333C]" : isDark === 1 ? " bg-white1 border-[#C6CED8]" : isDark === 2 ? " bg-candynav border-candybuttonhighlight" : isDark === 3 ? " bg-[rgba(11,3,16,.5)] border-galaxybuttonhighlight" : "")} />
													}
												</button>
												<button className={"flex flex-col items-center space-y-2 text-[14px] leading-[17px] transition duration-800 group" + (isDark === 2 ? " text-candybuttonhighlight" : "")} onClick={() => setTheme(2)}>
													<div className={"rounded-[5px] border transition duration-800" + (isDark === 0 ? " border-[#8A939D] group-hover:border-blue2" : isDark === 1 ? " border-[#8A939D] group-hover:border-blue2" : isDark === 2 ? " border-candybuttonhighlight group-hover:border-candybuttonhighlight" : isDark === 3 ? " border-[#8A939D] group-hover:border-[#5200FF]" : "")}>
														<img className="w-[60px]" src="/images/account/candytheme-desktop.svg" alt="" />
													</div>
													<span>Candy</span>
													{isDark === 2 ?
														<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 21 21" fill="none">
															<rect x="0.375" y="0.25" width="20" height="20" rx="10" fill="#DD57AF" />
															<path d="M5.375 9.39286L8.975 13.25L15.375 7.25" stroke="white" stroke-width="2" />
														</svg>
														:
														<div className={"w-[20px] h-[20px] rounded-full border" + (isDark === 0 ? " bg-inputback border-[#31333C]" : isDark === 1 ? " bg-white1 border-[#C6CED8]" : isDark === 2 ? " bg-candynav border-candybuttonhighlight" : isDark === 3 ? " bg-[rgba(11,3,16,.5)] border-galaxybuttonhighlight" : "")} />
													}
												</button>
												<button className={"flex flex-col items-center space-y-2 text-[14px] leading-[17px] transition duration-800 group" + (isDark === 3 ? " text-[#5200FF]" : "")} onClick={() => setTheme(3)}>
													<div className={"rounded-[5px] border transition duration-800" + (isDark === 0 ? " border-[#8A939D] group-hover:border-blue2" : isDark === 1 ? " border-[#8A939D] group-hover:border-blue2" : isDark === 2 ? " border-[#8A939D] group-hover:border-candybuttonhighlight" : isDark === 3 ? " border-[#5200FF] group-hover:border-[#5200FF]" : "")}>
														<img className="w-[60px]" src="/images/account/galaxytheme-desktop.svg" alt="" />
													</div>
													<span>Galaxy</span>
													{isDark === 3 ?
														<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 21 21" fill="none">
															<rect x="0.125" y="0.25" width="20" height="20" rx="10" fill="#5200FF" />
															<path d="M5.125 9.39286L8.725 13.25L15.125 7.25" stroke="white" stroke-width="2" />
														</svg>
														:
														<div className={"w-[20px] h-[20px] rounded-full border" + (isDark === 0 ? " bg-inputback border-[#31333C]" : isDark === 1 ? " bg-white1 border-[#C6CED8]" : isDark === 2 ? " bg-candynav border-candybuttonhighlight" : isDark === 3 ? " bg-[rgba(11,3,16,.5)] border-galaxybuttonhighlight" : "")} />
													}
												</button>
											</div>
											<span className={"pl-[15px] text-[14px] leading-[17px] mt-[15px]" + (isDark === 0 ? " text-subtext" : isDark === 1 ? " text-subtext" : isDark === 2 ? " text-candybuttonhighlight" : isDark === 3 ? " text-galaxysubtext" : "")}>Chat Alignment</span>
											<div className={"flex justify-between items-center p-5 mt-[10px] rounded-[5px]" + (isDark === 0 ? " bg-button" : isDark === 1 ? " bg-[#EDEDF0] text-title" : isDark === 2 ? " bg-candybutton text-candytitle" : isDark === 3 ? " bg-galaxybutton text-white" : "")}>
												<div />
												<button className={"flex flex-col items-center space-y-2 text-[14px] leading-[17px] transition duration-800 group" + (alignment === 0 ? (isDark === 0 ? " text-blue2" : isDark === 1 ? " text-blue2" : isDark === 2 ? " text-candybuttonhighlight" : isDark === 3 ? " text-[#5200FF]" : "") : "")} onClick={() => setNewAlignment(0)}>
													<div className={"overflow-hidden rounded-[5px] border transition duration-800" + (alignment === 0 ? (isDark === 0 ? " border-blue2 group-hover:border-blue2" : isDark === 1 ? " border-blue2 group-hover:border-blue2" : isDark === 2 ? " border-[#FF36F7] group-hover:border-[#FF36F7]" : isDark === 3 ? " border-[#5200FF] group-hover:border-[#5200FF]" : "") : (isDark === 0 ? " border-subtext" : isDark === 1 ? " border-subtext" : isDark === 2 ? " border-transparent" : isDark === 3 ? " border-galaxybuttonhighlight" : ""))}>
														{isDark === 0 && <img src="/images/messages/alignments/left and right.svg" alt="" />}
														{isDark === 1 && <img src="/images/messages/alignments/left and right-light.svg" alt="" />}
														{isDark === 2 && <img src="/images/messages/alignments/left and right-candy.svg" alt="" />}
														{isDark === 3 && <img src="/images/messages/alignments/left and right-galaxy.svg" alt="" />}
													</div>
													<span>Left and Right</span>
													{alignment === 0 ?
														(isDark === 0 || isDark === 1 ?
															<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 21 20" fill="none">
																<rect x="0.5" width="20" height="20" rx="10" fill="#048DFF" />
																<path d="M5.5 9.14286L9.1 13L15.5 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
															</svg>
															:
															isDark === 2 ?
																<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 21" fill="none">
																	<rect y="0.25" width="20" height="20" rx="10" fill="#DD57AF" />
																	<path d="M5 9.39286L8.6 13.25L15 7.25" stroke="white" stroke-width="2" />
																</svg>
																:
																isDark === 3 ?
																	<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 21" fill="none">
																		<rect y="0.25" width="20" height="20" rx="10" fill="#5200FF" />
																		<path d="M5 9.39286L8.6 13.25L15 7.25" stroke="white" stroke-width="2" />
																	</svg>
																	:
																	null
														)
														:
														<div className={"w-[20px] h-[20px] rounded-full border" + (isDark === 0 ? " bg-inputback border-[#31333C]" : isDark === 1 ? " bg-white1 border-[#C6CED8]" : isDark === 2 ? " bg-candynav border-candybuttonhighlight" : isDark === 3 ? " bg-[rgba(11,3,16,.5)] border-galaxybuttonhighlight" : "")} />
													}
												</button>
												<button className={"flex flex-col items-center space-y-2 text-[14px] leading-[17px] transition duration-800 group" + (alignment === 1 ? (isDark === 0 ? " text-blue2" : isDark === 1 ? " text-blue2" : isDark === 2 ? " text-candybuttonhighlight" : isDark === 3 ? " text-[#5200FF]" : "") : "")} onClick={() => setNewAlignment(1)}>
													<div className={"overflow-hidden rounded-[5px] border transition duration-800" + (alignment === 1 ? (isDark === 0 ? " border-blue2 group-hover:border-blue2" : isDark === 1 ? " border-blue2 group-hover:border-blue2" : isDark === 2 ? " border-[#FF36F7] group-hover:border-[#FF36F7]" : isDark === 3 ? " border-[#5200FF] group-hover:border-[#5200FF]" : "") : (isDark === 0 ? " border-subtext" : isDark === 1 ? " border-subtext" : isDark === 2 ? " border-transparent" : isDark === 3 ? " border-galaxybuttonhighlight" : ""))}>
														{isDark === 0 && <img src="/images/messages/alignments/left.svg" alt="" />}
														{isDark === 1 && <img src="/images/messages/alignments/left-light.svg" alt="" />}
														{isDark === 2 && <img src="/images/messages/alignments/left-candy.svg" alt="" />}
														{isDark === 3 && <img src="/images/messages/alignments/left-galaxy.svg" alt="" />}
													</div>
													<span>Left Aligned</span>
													{alignment === 1 ?
														(isDark === 0 || isDark === 1 ?
															<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 21 20" fill="none">
																<rect x="0.5" width="20" height="20" rx="10" fill="#048DFF" />
																<path d="M5.5 9.14286L9.1 13L15.5 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
															</svg>
															:
															isDark === 2 ?
																<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 21" fill="none">
																	<rect y="0.25" width="20" height="20" rx="10" fill="#DD57AF" />
																	<path d="M5 9.39286L8.6 13.25L15 7.25" stroke="white" stroke-width="2" />
																</svg>
																:
																isDark === 3 ?
																	<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 21" fill="none">
																		<rect y="0.25" width="20" height="20" rx="10" fill="#5200FF" />
																		<path d="M5 9.39286L8.6 13.25L15 7.25" stroke="white" stroke-width="2" />
																	</svg>
																	:
																	null
														)
														:
														<div className={"w-[20px] h-[20px] rounded-full border" + (isDark === 0 ? " bg-inputback border-[#31333C]" : isDark === 1 ? " bg-white1 border-[#C6CED8]" : isDark === 2 ? " bg-candynav border-candybuttonhighlight" : isDark === 3 ? " bg-[rgba(11,3,16,.5)] border-galaxybuttonhighlight" : "")} />
													}
												</button>
												<div />
											</div>
											<span className={"pl-[15px] text-[14px] leading-[17px] mt-[15px]" + (isDark === 0 ? " text-subtext" : isDark === 1 ? " text-subtext" : isDark === 2 ? " text-candybuttonhighlight" : isDark === 3 ? " text-galaxysubtext" : "")}>Text Size</span>
											<div className={"flex items-center space-x-[10px] rounded-[5px] px-[15px] pt-[30px] pb-[25px] mt-[10px]" + (isDark === 0 ? " bg-button" : isDark === 1 ? " bg-[#EDEDF0] text-title" : isDark === 2 ? " bg-candybutton text-candytitle" : isDark === 3 ? " bg-galaxybutton text-white" : "")}>
												<span className={"text-[16px] leading-[19px]" + (isDark === 1 ? " text-title" : "")}>A</span>
												<div className="relative flex-1">
													<div className="flex items-center space-x-0.5">
														<div className={"w-1 h-1 rounded-full " + (isDark === 3 ? "bg-[#322995]" : "bg-subtext")} />
														<div className={"flex-1 h-[2px] rounded-[5px] " + (textSize >= 16 ? (isDark === 0 ? "bg-blue2" : isDark === 1 ? "bg-blue2" : isDark === 2 ? "bg-[#FF36F7]" : isDark === 3 ? "bg-[#5200FF]" : "") : (isDark === 0 ? "bg-[#8FCCFF]" : isDark === 1 ? "bg-[#8FCCFF]" : isDark === 2 ? "bg-candybuttonhighlight" : isDark === 3 ? "bg-galaxysubtext" : ""))} />
														<div className={"w-1 h-1 rounded-full " + (isDark === 3 ? "bg-[#322995]" : "bg-subtext")} />
														<div className={"flex-1 h-[2px] rounded-[5px] " + (textSize >= 18 ? (isDark === 0 ? "bg-blue2" : isDark === 1 ? "bg-blue2" : isDark === 2 ? "bg-[#FF36F7]" : isDark === 3 ? "bg-[#5200FF]" : "") : (isDark === 0 ? "bg-[#8FCCFF]" : isDark === 1 ? "bg-[#8FCCFF]" : isDark === 2 ? "bg-candybuttonhighlight" : isDark === 3 ? "bg-galaxysubtext" : ""))} />
														<div className={"w-1 h-1 rounded-full " + (isDark === 3 ? "bg-[#322995]" : "bg-subtext")} />
														<div className={"flex-1 h-[2px] rounded-[5px] " + (textSize >= 20 ? (isDark === 0 ? "bg-blue2" : isDark === 1 ? "bg-blue2" : isDark === 2 ? "bg-[#FF36F7]" : isDark === 3 ? "bg-[#5200FF]" : "") : (isDark === 0 ? "bg-[#8FCCFF]" : isDark === 1 ? "bg-[#8FCCFF]" : isDark === 2 ? "bg-candybuttonhighlight" : isDark === 3 ? "bg-galaxysubtext" : ""))} />
														<div className={"w-1 h-1 rounded-full " + (isDark === 3 ? "bg-[#322995]" : "bg-subtext")} />
													</div>
													<input type="range" min="14" max="20" step="2" className={"absolute top-1/2 left-0 -translate-y-1/2 w-full h-[30px] rounded-full" + (isDark === 0 ? " range-desktop-dark" : isDark === 1 ? " range-desktop-light" : isDark === 2 ? " range-desktop-candy" : isDark === 3 ? " range-desktop-galaxy" : "")} value={textSize} onChange={e => profile && setTextSize(parseInt(e.target.value))} onClick={() => !profile && dispatch(setOpenSignModal())} />
												</div>
												<span className={"text-[24px] leading-[28px]" + (isDark === 1 ? " text-title" : "")}>A</span>
											</div>
											<span className={"pl-[15px] text-[14px] leading-[17px] mt-[15px]" + (isDark === 0 ? " text-subtext" : isDark === 1 ? " text-subtext" : isDark === 2 ? " text-candybuttonhighlight" : isDark === 3 ? " text-galaxysubtext" : "")}>Voice Messages</span>
											<div className={"flex flex-col space-y-5 rounded-[5px] pt-5 pb-[30px] px-[15px] mt-[10px]" + (isDark === 0 ? " bg-button" : isDark === 1 ? " bg-[#EDEDF0] text-title" : isDark === 2 ? " bg-candybutton text-candytitle" : isDark === 3 ? " bg-galaxybutton text-white" : "")}>
												<div className={"flex justify-between items-center text-[14px] leading-[17px]" + (isDark === 0 ? " text-subtext" : isDark === 1 ? " text-subtextlight" : isDark === 2 ? " text-candybuttonhighlight" : isDark === 3 ? " text-galaxysubtext" : "")}>
													<span className={"transition duration-800" + (voiceFrequency === "0" ? (isDark === 0 ? " text-white" : isDark === 1 ? " text-title" : isDark === 2 ? " text-candytitle" : isDark === 3 ? " text-white" : "") : "")}>Never</span>
													<span className={"transition duration-800" + (voiceFrequency === "1" ? (isDark === 0 ? " text-white" : isDark === 1 ? " text-title" : isDark === 2 ? " text-candytitle" : isDark === 3 ? " text-white" : "") : "")}>Sometimes</span>
													<span className={"transition duration-800" + (voiceFrequency === "2" ? (isDark === 0 ? " text-white" : isDark === 1 ? " text-title" : isDark === 2 ? " text-candytitle" : isDark === 3 ? " text-white" : "") : "")}>Always</span>
												</div>
												<HtmlTooltip
													className={"voice-frequency-tooltip"}
													placement="right-start"
													title={
														<Fragment>
															<div className={"flex flex-col items-start space-y-3 relative z-[999999] p-5 dopple-tooltip rounded-[10px]" + (isDark === 0 ? " bg-nav after:border-t-nav shadow-tooltip-dark" : isDark === 1 ? " bg-white after:border-t-white shadow-tooltip-light" : isDark === 2 ? " bg-candynav after:border-t-candynav shadow-tooltip-candy" : isDark === 3 ? " bg-galaxynav after:border-t-galaxynav shadow-tooltip-galaxy" : "")}>
																<div className={"flex items-center space-x-[5px]" + (isDark === 0 ? " text-white" : isDark === 1 ? " text-title" : isDark === 2 ? " text-candytitle" : isDark === 3 ? " text-galaxytitle" : "")}>
																	<span className="font-Inter font-bold text-[14px] leading-[17px]">Coming Soon</span>
																</div>
															</div>
														</Fragment>
													}
												>

													<div className={"w-full h-[2px] relative" + (isDark === 0 ? " bg-subtext" : isDark === 1 ? " bg-subtext" : isDark === 2 ? " bg-candysubtext" : isDark === 3 ? " bg-galaxysubtext" : "")}>
														<div className={"absolute top-1/2 left-0 -translate-y-1/2 w-[2px] h-[6px] rounded-full" + (isDark === 0 ? " bg-subtext" : isDark === 1 ? " bg-subtext" : isDark === 2 ? " bg-candysubtext" : isDark === 3 ? " bg-galaxysubtext" : "")} />
														<input type="range" min="0" max="2" step="1" className={"absolute top-1/2 left-0 -translate-y-1/2 w-full h-[30px] rounded-full z-[1]" + (isDark === 0 ? " range-desktop-dark" : isDark === 1 ? " range-desktop-light" : isDark === 2 ? " range-desktop-candy" : isDark === 3 ? " range-desktop-galaxy" : "")} value={voiceFrequency} onChange={e => profile && setVoiceFrequency(e.target.value)} disabled />
														<div className={"absolute top-1/2 right-0 -translate-y-1/2 w-[2px] h-[6px] rounded-full" + (isDark === 0 ? " bg-subtext" : isDark === 1 ? " bg-subtext" : isDark === 2 ? " bg-candysubtext" : isDark === 3 ? " bg-galaxysubtext" : "")} />
													</div>
												</HtmlTooltip>
											</div>
											<span className={"pl-[15px] text-[14px] leading-[17px] mt-[15px]" + (isDark === 0 ? " text-subtext" : isDark === 1 ? " text-subtext" : isDark === 2 ? " text-candybuttonhighlight" : isDark === 3 ? " text-galaxysubtext" : "")}>Chat Preferences</span>
											<div className={"flex flex-col space-y-[15px] rounded-[5px] px-[15px] py-5 mt-[10px]" + (isDark === 0 ? " bg-button" : isDark === 1 ? " bg-[#EDEDF0] text-title" : isDark === 2 ? " bg-candybutton text-candytitle" : isDark === 3 ? " bg-galaxybutton text-white" : "")}>
												<div className="flex justify-between items-center space-x-[10px]">
													<div className="flex items-center space-x-[5px] text-[14px] leading-[17px]">
														<span className={(isDark === 0 ? "text-white" : isDark === 1 ? "text-title" : isDark === 2 ? "text-candybuttonhighlight" : isDark === 3 ? "text-white" : "")}>#NoFilter Mode</span>
														<HtmlTooltip
															className={"filtermode-tooltip"}
															placement="bottom-start"
															title={
																<Fragment>
																	<div className={"flex flex-col items-start space-y-3 relative z-[999999] p-5 dopple-tooltip rounded-[10px]" + (isDark === 0 ? " bg-nav after:border-t-nav shadow-tooltip-dark" : isDark === 1 ? " bg-white after:border-t-white shadow-tooltip-light" : isDark === 2 ? " bg-candynav after:border-t-candynav shadow-tooltip-candy" : isDark === 3 ? " bg-galaxynav after:border-t-galaxynav shadow-tooltip-galaxy" : "")}>
																		<div className={"flex items-center space-x-[5px]" + (isDark === 0 ? " text-white" : isDark === 1 ? " text-title" : isDark === 2 ? " text-candytitle" : isDark === 3 ? " text-galaxytitle" : "")}>
																			<span className="font-Inter font-bold text-[18px] leading-[22px]">#NoFilter Mode</span>
																		</div>
																		<div className="flex items-start space-x-[10px]">
																			<span className={"font-Inter text-[14px] leading-[17px] max-w-[258px]" + (isDark === 0 ? " text-subtext" : isDark === 1 ? " text-subtext" : isDark === 2 ? " text-candysubtext" : isDark === 3 ? " text-galaxysubtext" : "")}>
																				Coming soon to Dopple+ Members Only. #NoFilter allows users to toggle off filters for all Dopple chats.
																			</span>
																		</div>
																	</div>
																</Fragment>
															}
														>
															<svg className={(isDark === 0 ? "text-blue2" : isDark === 1 ? "text-blue2" : isDark === 2 ? "text-[#FF36F7]" : isDark === 3 ? "text-[#5200FF]" : "")} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
																<path d="M9.1665 9.15022C9.1665 8.92921 9.2543 8.71725 9.41058 8.56097C9.56686 8.40469 9.77882 8.31689 9.99984 8.31689C10.2209 8.31689 10.4328 8.40469 10.5891 8.56097C10.7454 8.71725 10.8332 8.92921 10.8332 9.15022V14.1502C10.8332 14.3712 10.7454 14.5832 10.5891 14.7395C10.4328 14.8958 10.2209 14.9836 9.99984 14.9836C9.77882 14.9836 9.56686 14.8958 9.41058 14.7395C9.2543 14.5832 9.1665 14.3712 9.1665 14.1502V9.15022ZM9.99984 5.04272C9.77882 5.04272 9.56686 5.13052 9.41058 5.2868C9.2543 5.44308 9.1665 5.65504 9.1665 5.87606C9.1665 6.09707 9.2543 6.30903 9.41058 6.46531C9.56686 6.62159 9.77882 6.70939 9.99984 6.70939C10.2209 6.70939 10.4328 6.62159 10.5891 6.46531C10.7454 6.30903 10.8332 6.09707 10.8332 5.87606C10.8332 5.65504 10.7454 5.44308 10.5891 5.2868C10.4328 5.13052 10.2209 5.04272 9.99984 5.04272Z" />
																<path fillRule="evenodd" clipRule="evenodd" d="M9.99984 1.66675C5.39734 1.66675 1.6665 5.39758 1.6665 10.0001C1.6665 14.6026 5.39734 18.3334 9.99984 18.3334C14.6023 18.3334 18.3332 14.6026 18.3332 10.0001C18.3332 5.39758 14.6023 1.66675 9.99984 1.66675ZM3.33317 10.0001C3.33317 11.7682 4.03555 13.4639 5.28579 14.7141C6.53603 15.9644 8.23173 16.6667 9.99984 16.6667C11.7679 16.6667 13.4636 15.9644 14.7139 14.7141C15.9641 13.4639 16.6665 11.7682 16.6665 10.0001C16.6665 8.23197 15.9641 6.53628 14.7139 5.28604C13.4636 4.03579 11.7679 3.33341 9.99984 3.33341C8.23173 3.33341 6.53603 4.03579 5.28579 5.28604C4.03555 6.53628 3.33317 8.23197 3.33317 10.0001Z" />
															</svg>
														</HtmlTooltip>
														<span className={"text-[14px] leading-[17px]" + (isDark === 0 ? " text-subtext" : isDark === 1 ? " text-subtextlight" : isDark === 2 ? " text-candybuttonhighlight" : isDark === 3 ? " text-galaxysubtext" : "")}>(Coming Soon)</span>
													</div>
													<button className={"w-[50px] h-[30px] relative rounded-[22px] transition duration-800 group" + (chatFilter ? (isDark === 0 ? " bg-blue2" : isDark === 1 ? " bg-blue2" : isDark === 2 ? " bg-candysubtext" : isDark === 3 ? " bg-galaxybuttonhighlight" : "") : (isDark === 0 ? " bg-inputback" : isDark === 1 ? " bg-inputback" : isDark === 2 ? " bg-candynav" : isDark === 3 ? " bg-inputback" : ""))} onClick={() => setChatFilter(!chatFilter)} disabled>
														<div className={"absolute top-1/2 -translate-y-1/2 w-[26px] h-[26px] rounded-full transition-all duration-800" + (chatFilter ? " left-[22px] bg-white group-hover:bg-subtext" : " left-[2px]" + (isDark === 0 ? " bg-subtext group-hover:bg-white" : isDark === 1 ? " bg-subtext group-hover:bg-white" : isDark === 2 ? " bg-candysubtext" : isDark === 3 ? " bg-[#7747DC]" : ""))} />
													</button>
												</div>
												<div className={"w-full h-[1px]" + (isDark === 0 ? " bg-[#31333C]" : isDark === 1 ? " bg-[#C4C7CB]" : isDark === 2 ? " bg-candybuttonhighlight" : isDark === 3 ? " bg-[rgba(156,116,243,.5)]" : "")} />
												<div className="flex justify-between items-center space-x-[10px]">
													<div className={"flex items-center space-x-[5px] text-[14px] leading-[17px]" + (isDark === 0 ? " text-white" : isDark === 1 ? " text-title" : isDark === 2 ? " text-candybuttonhighlight" : isDark === 3 ? " text-white" : "")}>
														<span>Auto-Delete Chat (24hrs)</span>
													</div>
													<button className={"w-[50px] h-[30px] relative rounded-[22px] transition duration-800 group" + (autoDelete ? (isDark === 0 ? " bg-blue2" : isDark === 1 ? " bg-blue2" : isDark === 2 ? " bg-candysubtext" : isDark === 3 ? " bg-galaxybuttonhighlight" : "") : (isDark === 0 ? " bg-inputback" : isDark === 1 ? " bg-inputback" : isDark === 2 ? " bg-candynav" : isDark === 3 ? " bg-inputback" : ""))} onClick={() => setAutoDelete(!autoDelete)} disabled>
														<div className={"absolute top-1/2 -translate-y-1/2 w-[26px] h-[26px] rounded-full transition-all duration-800" + (autoDelete ? " left-[22px] bg-white group-hover:bg-subtext" : " left-[2px]" + (isDark === 0 ? " bg-subtext group-hover:bg-white" : isDark === 1 ? " bg-subtext group-hover:bg-white" : isDark === 2 ? " bg-candysubtext" : isDark === 3 ? " bg-[#7747DC]" : ""))} />
													</button>
												</div>
											</div>
											<span className={"pl-[15px] text-[14px] leading-[17px] mt-[15px]" + (isDark === 0 ? " text-subtext" : isDark === 1 ? " text-subtext" : isDark === 2 ? " text-candybuttonhighlight" : isDark === 3 ? " text-galaxysubtext" : "")}>Language</span>
											<button className={"flex items-center space-x-[10px] rounded-[5px] transition duration-800 p-[15px] relative mt-[5px]" + (isDark === 0 ? " bg-button hover:bg-black5" : isDark === 1 ? " bg-[#EDEDF0] hover:bg-[#DDD]" : isDark === 2 ? " bg-candybutton hover:bg-candybuttonhighlight text-candytitle" : isDark === 3 ? " bg-galaxybutton hover:bg-[#322995] text-white" : "")} onClick={_setIsLanguageShown}>
												<div className="flex items-center space-x-[10px] w-0 flex-1">
													<img className="w-5 h-5" src={languages[language].flag} alt="" />
													<span className={"w-0 flex-1 truncate text-left text-[14px] leading-[17px]" + (isDark === 1 ? " text-title" : "")}>{languages[language].name}</span>
												</div>
												<svg xmlns="http://www.w3.org/2000/svg" width="9" height="16" viewBox="0 0 9 16" fill="none">
													<path d="M0.344159 0.830173C0.123794 1.04165 -3.62117e-08 1.32843 -4.92825e-08 1.62745C-6.23532e-08 1.92647 0.123794 2.21326 0.344159 2.42473L6.16269 8.00681L0.344159 13.5889C0.130039 13.8016 0.0115589 14.0864 0.0142368 14.3821C0.0169157 14.6778 0.140537 14.9606 0.358477 15.1697C0.576417 15.3788 0.871237 15.4974 1.17944 15.5C1.48764 15.5025 1.78456 15.3889 2.00626 15.1834L8.65584 8.80409C8.87621 8.59261 9 8.30583 9 8.00681C9 7.70778 8.87621 7.421 8.65584 7.20953L2.00626 0.830173C1.78583 0.618763 1.4869 0.5 1.17521 0.5C0.86352 0.5 0.56459 0.618763 0.344159 0.830173Z" fill="#848D97" />
												</svg>
											</button>
										</div>
										{/* <button className="flex justify-center items-center rounded-[5px] font-bold text-[16px] leading-[19px] transition duration-800 bg-blue2 hover:bg-blue3 min-h-[50px] mt-[45.75px] w-[300px] disabled:bg-subtext" onClick={save}>Save Changes</button> */}
									</>
									:
									<>
										<div className="flex flex-col w-full bg-[#31333C] rounded-[5px] overflow-hidden">
											{languages.map((x, i) =>
												<button className={"flex justify-between items-center space-x-[10px] p-[15px] text-[16px] leading-[19px] border-b transition duration-800" + (isDark === 0 ? " bg-button hover:bg-[#31333C] border-[#31333C] text-white" : isDark === 1 ? " bg-[#EDEDF0] hover:bg-[#C6CED8] border-[#C6CED8] text-title" : isDark === 2 ? " bg-candybutton hover:bg-candysubtext border-candysubtext text-candytitle" : isDark === 3 ? " bg-galaxybutton hover:bg-[rgba(156,116,243,.5)] border-[rgba(156,116,243,.5)] text-galaxytitle" : "")} key={i} onClick={() => setLanguageUnsaved(i)}>
													<div className="flex items-center space-x-[10px] w-0 flex-1">
														<img src={x.flag} alt="" />
														<span className="w-0 flex-1 truncate text-left">{x.name}</span>
													</div>
													{i === languageUnsaved ?
														<>
															{(isDark === 0 || isDark === 1) &&
																<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
																	<rect width="30" height="30" rx="15" fill="#048DFF" />
																	<path d="M7.5 13.7143L12.9 19.5L22.5 10.5" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
																</svg>
															}
															{isDark === 2 &&
																<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
																	<rect width="30" height="30" rx="15" fill="white" />
																	<path d="M7.5 13.7143L12.9 19.5L22.5 10.5" stroke="#DD57AF" stroke-width="3" />
																</svg>
															}
															{isDark === 3 &&
																<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
																	<rect width="30" height="30" rx="15" fill="#5200FF" />
																	<path d="M7.5 13.7143L12.9 19.5L22.5 10.5" stroke="white" stroke-width="3" />
																</svg>
															}
														</>
														:
														<div className={"w-[30px] h-[30px] border rounded-full" + (isDark === 0 ? " bg-inputback border-[#31333C]" : isDark === 1 ? " bg-white1 border-[#C4C7CB]" : isDark === 2 ? " bg-candynav border-candysubtext" : isDark === 3 ? " bg-[rgba(11,3,16,.5)] border-[#5200FF]" : "")} />
													}
												</button>
											)}
										</div>
										<button className={"flex justify-center items-center rounded-[5px] font-bold text-[16px] leading-[19px] w-full h-[50px] mt-[30px] disabled:opacity-50" + (isDark === 0 ? " bg-blue2" : isDark === 1 ? " bg-blue2" : isDark === 2 ? " bg-candysubtext" : isDark === 3 ? " bg-galaxysubtext" : "")} onClick={apply}>Apply</button>
									</>
								}
							</div>
						</div>
					</div>
				</Slide>
			</div >
		</div >
	)
}

export default ChatSettingsModal;