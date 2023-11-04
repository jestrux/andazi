import { useEffect, useRef } from "react";
import { useAppContext } from "../AppProvider";

export default function Card() {
	const qr = useRef(null);
	const { theme, guest, template } = useAppContext();

	useEffect(() => {
		if (!qr.current) return;

		var el = qr.current;

		const config = {
			text: guest.code,
			width: 70,
			height: 70,
			quietZone: 0,
			colorLight: "rgba(255, 255, 255, 0)",
			colorDark: theme.primaryColor,
			PI: theme.primaryColor,
			correctLevel: window.QRCode.CorrectLevel.H, // L, M, Q, H
		};

		var qrCode = new window.QRCode(el, config);

		return () => qrCode.clear();
	}, [theme]);

	return (
		<div
			id="cardPreview"
			className="relative rounded-xl overflow-hidden w-full"
			style={{
				width: "375px",
				padding: "0.35rem",
				background: theme.borderColor,
			}}
		>
			<style>
				{`/*CSS*/
					:root {
						--theme-color: ${theme.primaryColor};
					}
				`}
			</style>
			<div
				className="text-white h-full rounded-lg flex flex-col"
				style={{
					minHeight: "660px",
					backgroundColor: theme.backgroundColor,
				}}
			>
				<svg
					fill="currentColor"
					className="absolute top-0 left-0 text-[--theme-color]"
					viewBox="0 0 200 200"
					style={{
						width: "940px",
						top: "-480px",
						left: "-183px",
					}}
				>
					<path
						d="M33.7,-45.1C47.5,-36.5,64.9,-31.6,61.8,-24.1C58.7,-16.6,35.1,-6.4,25.1,3.2C15.2,12.9,18.9,22,17,29.3C15.1,36.5,7.5,41.9,0.6,41.1C-6.4,40.3,-12.8,33.4,-25,29.5C-37.1,25.6,-55,24.6,-60.5,17.4C-66.1,10.1,-59.3,-3.5,-49.3,-10.3C-39.2,-17.2,-25.9,-17.3,-17.2,-27.5C-8.4,-37.7,-4.2,-58.1,2.9,-62.1C10,-66.1,20,-53.7,33.7,-45.1Z"
						transform="translate(100 100)"
					></path>
				</svg>

				<div className="z-10 relative">
					<img
						id="couple"
						className="absolute right-0 -mt-1.5 -mr-3 w-56 object-cover object-left-top"
						src={theme.image ?? "/img/couple-2.png"}
						alt=""
						style={{ opacity: theme.imageOpacity }}
					/>

					<div className="relative flex py-1 items-center justify-between px-8 text-white tracking-widest">
						<h5
							className="relative mt-2 text-4xl text-centers great font-bold leading-tight"
							style={{ letterSpacing: "0.1em" }}
						>
							<span className="great -ml-3">
								{template.groom}
							</span>
							<br />
							<span className="absolute mt-2 text-xs uppercase font-mono">
								Weds
							</span>
							<span className="ml-12 great">
								{template.bride}
							</span>
						</h5>

						<div className="flex flex-col mt-4 text-right">
							<span className="mb-6 uppercase text-xs font-bold -mr-4">
								{template.bibleVerse}
							</span>

							<div className="pt-1">
								<span className="uppercase text-sm font- -mr-4">
									{template.date}
								</span>
							</div>
						</div>
					</div>
				</div>

				<div className="absolute flex items-center top-0 left-0 ml-6 pt-4 mt-24 transform rotate-1">
					<div className="mt-2">
						<div ref={qr} className="opacity-70"></div>
					</div>

					<div className="mt-2 ml-2 text-black font-light text-[12px] flex flex-col leading-tight">
						<span className="font-semibold text-[--theme-color] tracking-wider mb-[0.15rem]">
							{guest.code}
						</span>
						<span>Smart Card</span>
						<span className="mt-1">
							powered by{" "}
							<span className="mt-1 text-black text-opacity-75 font-medium">
								@ipfsoftwares
							</span>
						</span>
					</div>
				</div>

				<div className="pt-1 mt-24 px-4 text-center text-black text-opacity-75 leading-loose font-serif text-sm">
					Dear&nbsp;
					<span className="font-serif mt-1 text- text-black font-medium">
						<span className="font-serif font-medium">
							{guest.name}
						</span>
						,&nbsp;
					</span>
					the family of {template.parents} warmly invites you to come
					celebrate with us on this joyous occassion.
				</div>

				<img
					className="mt-3.5 mb-1 w-40 mx-auto block"
					src="/img/dividers/wedding.svg"
					alt=""
				/>

				<div className="mx-4 text-black">
					<div
						className="ps-4 rounded-md overflow-hidden mt-4 relative flex items-center"
						style={{
							backgroundColor: "rgba(0,0,0,0.06)",
						}}
					>
						<div className="w-[93px] text-center overflow-hidde absolute left-0 inset-y-0 flex flex-col justify-center items-center">
							<svg
								className="absolute"
								fill="rgba(0,0,0,0.06)"
								viewBox="0 0 200 200"
								xmlns="http://www.w3.org/2000/svg"
								style={{
									width: "350px",
									left: "-140px",
									transform: "rotate(190deg)",
								}}
							>
								<path
									d="M31.3,-46.7C32.7,-42.1,20.6,-22.4,19.5,-10C18.5,2.4,28.5,7.5,28.7,10C28.8,12.6,19.1,12.7,12.6,25.8C6.2,38.8,3.1,64.9,-7.4,75.2C-18,85.4,-36,79.8,-44.4,67.4C-52.8,55,-51.7,35.7,-47,22C-42.2,8.2,-33.8,0,-33.9,-14.5C-34,-28.9,-42.5,-49.6,-38.2,-53.2C-34,-56.9,-17,-43.6,-1,-42.2C15,-40.8,30,-51.3,31.3,-46.7Z"
									transform="translate(100 100)"
								></path>
							</svg>
							<span className="z-10 mt-2 uppercase leading-none great text-[--theme-color] text-[65px] font-bold">
								{guest.cardType.charAt(0)}
							</span>

							<span
								className="z-10 uppercase text-[--theme-color] text-[14px]"
								style={{ fontFamily: "Eudoras" }}
							>
								{guest.cardType}
							</span>
						</div>

						<div className="pt-3 pb-4 flex-1 mr-4 mont text-right">
							<div>
								<div className="inline-flex items-center">
									<span className="text-[--theme-color] tracking-wide text-[11px]">
										CHURCH
									</span>
									<span className="font-bold pb-[0.1rem] mx-1 leading-none">
										·
									</span>
									<span className="tracking-wide text-[11px]">
										{template.churchTime}
									</span>
								</div>
								<div className="leading-none text-black mt-[0.05rem] text-[13.5px] opacity-75">
									{template.churchLocation}
								</div>
							</div>

							<div className="mt-5">
								<div className="inline-flex items-center">
									<span className="text-[--theme-color] tracking-wide text-[11px]">
										RECEPTION
									</span>
									<span className="font-bold mx-1 leading-none pb-[0.1rem]">
										·
									</span>
									<span className="tracking-wide text-[11px]">
										{template.receptionTime}
									</span>
								</div>
								<div className="leading-none text-black mt-[0.05rem] text-[13.5px] opacity-75">
									{template.receptionLocation}
								</div>
							</div>
						</div>
					</div>
				</div>

				<p className="mt-5 px-6 text-black text-xs font-light font-serif text-center">
					<span className="font-serif opacity-70">Come in </span>{" "}
					<span className="font-serif italic">
						{template.dressCode}{" "}
					</span>
					<span className="font-serif opacity-70">
						with a dash of
					</span>{" "}
					<span className="font-serif italic text-[--theme-color]">
						{template.themeColor}
					</span>
					.
				</p>

				<div className="mt-auto pt-4 mx-4">
					<span className="font-serif text-black text-xs font-medium tracking-wide">
						RSVP CONTACTS
					</span>
					<div className="text-black/60">
						{template.contacts.map((contact, index) => (
							<div key={index}>
								<span className="font-serif eading-none text-xs uppercase tracking-wide">
									{contact.name}
								</span>
								<span className="font-serif leading-none text-sm">
									&nbsp; ( {contact.phoneNumber} )
								</span>
							</div>
						))}
					</div>
				</div>

				<div className="m-4 text-xs text-[--theme-color]">S/N: 101</div>
			</div>

			<div className="-m">
				<img
					className="z-10 absolute right-0 bottom-0 w-64 -mr-32 -mb-12 object-cover"
					src={`/img/flowers/${theme.flower ?? "wedding.png"}`}
					alt=""
				/>
			</div>
		</div>
	);
}
