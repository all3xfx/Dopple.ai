import { useContext, useMemo, useState } from "react";
import { Skeleton, useMediaQuery } from "@mui/material";
import { RefContext } from "../contexts/RefContextProvider";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import axios from "../utilities/axiosConfig";

const ChartCard = ({ action, data, index }) => {
	const nav = useNavigate();
	const matches = useMediaQuery('(min-width:1024px)');
	const matchesMD = useMediaQuery('(max-width:768px)');
	const profile = useSelector(store => store.AuthReducer.profile);
	const { setDopple, setHistory } = useContext(RefContext);
	const [cookies, setCookies] = useCookies(["userid"]);
	const [loaded, setLoaded] = useState(false)
	const [loadedAvatar, setLoadedAvatar] = useState(false)

	const chat = async (e, data) => {
		if (data._id) {
			e.stopPropagation()
			setDopple()
			nav("/messages")

			let userid = Math.random().toString(36).slice(2);
			if (!cookies?.userid) setCookies("userid", userid)
			else userid = cookies?.userid
			const { data: { success, data: _dopples } } = await axios.post("/firebase/getDopplesDataByUser", {
				user: profile?.email ?? userid
			})
			if (success && _dopples.some(x => x._id === data._id)) {
				console.log(_dopples)
				setDopple(_dopples.find(x => x._id === data._id))
			} else {
				let tmp = { ...data }
				tmp.chat_history = []
				setDopple(tmp)
				setHistory([])
			}
		}
	}
	useMemo(async () => {
		setTimeout(() => setLoaded(true), 0)
	}, [])

	return (
		<>
			<div className="flex items-center space-x-2 cursor-pointer" onClick={action}>
				<div className="flex items-center flex-1 group">
					<div className={"w-[65px] h-[65px] md:w-[75px] md:h-[75px] rounded-[15px] overflow-hidden" + ((loaded && loadedAvatar) ? " block" : " hidden")}>
						{data.avatarURL &&
							<img fetchpriority="high" className="w-full h-full object-cover lazyload" src={data.avatarURL + "?tr=w-200,h-200"} alt="" onLoad={() => setLoadedAvatar(true)} />
						}
					</div>
					{!(loaded && loadedAvatar) &&
						<div className={"flex justify-center items-center w-[65px] h-[65px] md:w-[75px] md:h-[75px] rounded-[15px] bg-black5" + ((loaded && loadedAvatar) ? " ml-[11.5px]" : "")}>
							<img className="w-8 md:w-10" src="/images/explore/topcharts/placeholder.svg" alt="" />
						</div>
					}
					<div className="flex items-start space-x-[11.5px] flex-1 ml-[11.5px]">
						{loaded && loadedAvatar ?
							<span className="font-bold text-[16px] leading-[19px] transition duration-800 group-hover:text-blue2">{index}</span>
							:
							<Skeleton variant="circular" sx={{ bgcolor: '#2F3239' }} width={17} height={17} />
						}
						<div className="flex flex-col space-y-[5px] flex-1 w-0">
							<div className="flex items-center space-x-[5.71px]">
								{loaded && loadedAvatar ?
									<>
										<span className="truncate font-bold text-[16px] leading-[19px] transition duration-800 group-hover:text-blue2">{data.name}</span>
										<img className="w-[15px] h-[15px]" src="/images/explore/verified.svg" alt="" />
									</>
									:
									<>
										<Skeleton variant="rounded" sx={{ bgcolor: '#2F3239', borderRadius: "10px" }} width={75} height={10} />
										<Skeleton variant="circular" sx={{ bgcolor: '#2F3239' }} width={17} height={17} />
									</>
								}
							</div>
							{loaded && loadedAvatar ?
								<span className="text-[14px] leading-[17px] text-subtext truncate">{data.tagLine}</span>
								:
								<Skeleton variant="rounded" sx={{ bgcolor: '#2F3239', borderRadius: "10px" }} width={(matchesMD || matches) ? 160 : "100%"} height={10} />
							}
							<div className="flex items-center space-x-[5.71px] text-subtext">
								{loaded && loadedAvatar ?
									<>
										<img src="/images/interactive.svg" alt="" />
										<span className="text-[14px] leading-[17px]">{(data?.messageCount / 1000).toFixed(1) ?? 0}k</span>
									</>
									:
									<>
										<Skeleton variant="circular" sx={{ bgcolor: '#2F3239' }} width={14} height={14} />
										<Skeleton variant="rounded" sx={{ bgcolor: '#2F3239', borderRadius: "10px" }} width={35} height={10} />
									</>
								}
							</div>
						</div>
					</div>
				</div>
				<button className="px-[10px] py-2 text-blue2 rounded-[6px] bg-black12 font-bold text-[14px] leading-[17px] transition duration-800 hover:text-white hover:bg-blue2" onClick={e => chat(e, data)}>CHAT</button>
			</div>
		</>
	)
}

export default ChartCard;