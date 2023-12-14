import React, { useContext, useMemo, useRef, useState } from "react";
import jwtDecode from "jwt-decode";
import { Modal, Slide } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import originalAxios from 'axios';
import { setOpenForgetPasswordModal } from "../redux/reducers/ModalReducer";
import { useOutsideDetector } from "../hooks/useOutsideDetector";
import { setProfile } from "../redux/reducers/AuthReducer";
import { RefContext } from "../contexts/RefContextProvider";
import axios from "../utilities/axiosConfig"

const ForgetPasswordModal = () => {
	const dispatch = useDispatch();
	const open = useSelector(store => store.ModalReducer.openForgetPasswordModal);
	const email = useSelector(store => store.ModalReducer.details.email);
	const [username, setUsername] = useState("");
	const [doing, setDoing] = useState(false);
	const [completed, setCompleted] = useState(false);
	const { isDark, setDopple, allUsers } = useContext(RefContext);
	const nameExists = allUsers.some(x => x.username.toLowerCase() === username.toLowerCase());
	let container = useRef();

	const close = async () => {
		dispatch(setOpenForgetPasswordModal());
	};

	const confirm = async () => {
		setDoing(true)
		const { data: { ip } } = await originalAxios.get("https://api.ipify.org/?format=json");
		const { data } = await axios.post("/user/google", {
			username: username,
			email,
			ip,
			password: "",
		})
		dispatch(setProfile({ type: 1, ...jwtDecode(data.token) }))
		setDopple(undefined)
		setDoing(false)
		setCompleted(true)
	}

	useMemo(() => {
		console.log(email, allUsers)
		if (email && allUsers.some(x => x.email === email)) {
			dispatch(setProfile({ type: 1, ...allUsers.find(x => x.email === email) }))
			setDopple(undefined)
			close()
		}
	}, [email])
	useOutsideDetector([container], () => open === true && close())

	return (
		<Modal open={open} onClose={close}>
			<div className="absolute w-full h-full bg-menuback backdrop-blur-[5px] outline-none">
				<div className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[calc(100%-40px)] max-w-[450px]" ref={container}>
					<Slide direction="up" in={open} timeout={300}>
						<div className={"border outline-none rounded-[5px] shadow-lg" + (isDark === 0 ? " bg-nav-desktop border-button" : isDark === 1 ? " bg-white border-button" : isDark === 2 ? " bg-white border-button" : isDark === 3 ? " bg-nav-desktop border-button" : "")}>
							<div className="flex justify-center items-center absolute top-0 right-0 w-[35px] h-[35px] md:w-[30px] md:h-[30px] bg-button text-subtext rounded-bl-[5px]">
								<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
									<path d="M2 2L12 12M2 12L12 2" stroke="#8A939D" stroke-width="2" stroke-linecap="square" />
								</svg>
							</div>
							<div className="flex flex-col items-center px-[15px] md:px-[30px] py-[78px] relative">
								<svg xmlns="http://www.w3.org/2000/svg" width="100" height="101" viewBox="0 0 100 101" fill="none">
									<rect y="0.283203" width="100" height="100" rx="15" fill="#23252B" />
									<path fill-rule="evenodd" clip-rule="evenodd" d="M35.7565 38.3069C35.7565 33.4166 39.721 29.4521 44.6113 29.4521C49.5017 29.4521 53.4661 33.4166 53.4661 38.3069V42.7213H35.7565V38.3069ZM30.7565 42.7213V38.3069C30.7565 30.6552 36.9595 24.4521 44.6113 24.4521C52.2631 24.4521 58.4661 30.6551 58.4661 38.3069V42.7213H63.8777V52.4761C56.5739 52.4765 50.6532 58.3975 50.6532 65.7013C50.6532 66.8515 50.8 67.9674 51.0759 69.0313H25.709V42.7213H30.7565ZM46.4533 57.1132C47.6664 56.5032 48.4987 55.2472 48.4987 53.7968C48.4987 51.748 46.8377 50.087 44.7888 50.087C42.74 50.087 41.079 51.748 41.079 53.7968C41.079 55.2458 41.9097 56.5008 43.1209 57.1115V60.4899H46.4533V57.1132Z" fill="#848D97" />
									<path fill-rule="evenodd" clip-rule="evenodd" d="M63.8795 76.1141C69.6302 76.1141 74.2921 71.4522 74.2921 65.7015C74.2921 59.9507 69.6302 55.2888 63.8795 55.2888C58.1287 55.2888 53.4668 59.9507 53.4668 65.7015C53.4668 71.4522 58.1287 76.1141 63.8795 76.1141ZM62.6472 67.2843L62.6554 67.8636H64.5484V67.3903C64.5484 66.5744 64.8503 66.1501 65.9191 65.53C67.0288 64.8691 67.6489 63.9961 67.6489 62.7558V62.7395C67.6489 60.9526 66.1557 59.6635 63.9201 59.6635C61.4968 59.6635 60.1668 61.0669 60.1097 62.9761V62.9925L62.0108 62.9843L62.0271 62.9761C62.0843 61.9726 62.7615 61.328 63.814 61.328C64.8421 61.328 65.5275 61.9562 65.5275 62.813V62.8293C65.5275 63.6289 65.1848 64.0695 64.173 64.6814C63.0471 65.3423 62.5738 66.0767 62.6472 67.2843ZM62.3372 70.4582C62.3372 71.2334 62.8757 71.7392 63.6916 71.7392C64.5239 71.7392 65.0461 71.2334 65.0461 70.4582C65.0461 69.6749 64.5239 69.1691 63.6916 69.1691C62.8757 69.1691 62.3372 69.6749 62.3372 70.4582Z" fill="#848D97" />
								</svg>
								<span className={"mt-[30px] font-bold text-[24px] leading-[28px]" + (isDark === 0 ? " text-white" : isDark === 1 ? " text-title" : isDark === 2 ? " text-title" : isDark === 3 ? " text-white" : "")}>
									Forgot password?
								</span>
								<span className={"mt-[10px] text-[16px] leading-[19px]" + (isDark === 0 ? " text-white" : isDark === 1 ? " text-title" : isDark === 2 ? " text-title" : isDark === 3 ? " text-white" : "")}>
									No worries, we’ll send you reset instructions.
								</span>
								<div className={"flex items-center rounded-[5px] border px-5 h-[50px] relative my-[82px] w-full transition duration-800" + (isDark === 0 ? " bg-inputback" : isDark === 1 ? " bg-[#F7F7FA]" : isDark === 2 ? " bg-[#F7F7FA]" : isDark === 3 ? " bg-inputback" : "") + (nameExists ? " border-[#E93131]" : (isDark === 0 ? " border-button" : isDark === 1 ? " border-[#C4C7CB]" : isDark === 2 ? " border-[#C4C7CB]" : isDark === 3 ? " text-button" : ""))}>
									<input className={"w-0 flex-1" + (isDark === 0 ? " text-white" : isDark === 1 ? " text-title" : isDark === 2 ? " text-title" : isDark === 3 ? " text-white" : "")} placeholder="Choose username" value={username} onChange={e => setUsername(e.target.value)} />
									{nameExists ?
										<svg className="ml-[10px] cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" fill="none" onClick={() => setUsername("")}>
											<path d="M2 1.5L17 16.5M2 16.5L17 1.5" stroke="#E93131" stroke-width="3" stroke-linejoin="round" />
										</svg>
										:
										(username.length > 0 ?
											<svg className="ml-[10px]" xmlns="http://www.w3.org/2000/svg" width="19" height="12" viewBox="0 0 19 12" fill="none">
												<path d="M2 4.72363L7.40001 10.4673L17 1.53271" stroke="#048DFF" strokeWidth="2.97819" strokeLinecap="round" strokeLinejoin="round" />
											</svg>
											: null)
									}
									{nameExists && username.length > 0 &&
										<span className="absolute bottom-[calc(100%+5px)] right-0 text-[14px] leading-[17px] text-[#E93131]">Username is already in use</span>
									}
								</div>
								<button className="flex justify-center items-center space-x-[10px] w-full h-[50px] rounded-[5px] bg-blue2 font-bold text-[14px] leading-[17px] transition hover:bg-blue3 disabled:bg-subtext disabled:text-[#CACACA] mt-[30px]" onClick={close}>
									Reset password
								</button>
								<button className="flex items-center space-x-[10px] text-blue2 font-bold text-[14px] leading-[17px] mt-[30px] self-center">
									<svg xmlns="http://www.w3.org/2000/svg" width="20" height="18" viewBox="0 0 20 18" stroke="currentColor">
										<path d="M2 9L9.28571 2M2 9L9.28571 16M2 9L19 9" strokeWidth="2" strokeLinecap="square" />
									</svg>
									<span>Back to log in</span>
								</button>
								{/* {completed ?
									:
									<>
										<button className="flex justify-center items-center space-x-[10px] w-full h-[50px] rounded-[5px] bg-blue2 font-bold text-[14px] leading-[17px] transition hover:enabled:bg-blue3 disabled:bg-subtext disabled:text-[#CACACA]" onClick={confirm} disabled={nameExists || username.length === 0 || doing}>
											<span>Confirm</span>
											{doing &&
												<svg className='spinnerInner1' viewBox='0 0 120 120'>
													<circle cx='60' cy='60' r='50' />
												</svg>
											}
										</button>
										<span className={"mt-[30px] text-[14px] leading[17px]" + (isDark === 0 ? " text-white" : isDark === 1 ? " text-title" : isDark === 2 ? " text-title" : isDark === 3 ? " text-white" : "")}>You can change this at any time in settings.</span>
									</>
								} */}
							</div>
						</div>
					</Slide>
				</div>
			</div>
		</Modal >
	)
}

export default ForgetPasswordModal;