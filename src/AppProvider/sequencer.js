import { stagger } from "framer-motion";

export const textAnimation = ({ id, text, duration, stagger }) => {
	if (!text) return [[]];

	if (text?.animation == "type") {
		return [
			[
				`#${id} li`,
				{ opacity: 1 },
				{
					at: "<",
					duration: 0.00001,
				},
			],
			[
				`#${id} li div`,
				{ opacity: [0, 1], scale: [0, 1], skewX: [0, 6] },
				{
					at: "<",
					type: "spring",
					duration: 1.5,
					delay: stagger(0.08),
				},
			],
			[
				`#${id} small`,
				{ opacity: [0, 1], y: [20, 0], scale: [1.2, 1] },
				{
					at: "<",
					type: "spring",
					duration: 1,
					delay: stagger(0.02),
				},
			],
		];
	}

	if (text?.animation == "swipe") {
		return [
			[
				`#${id} li`,
				{ opacity: [0, 1], x: [-80, 0] },
				{
					at: `-${duration - 0.3}`,
					type: "spring",
					bounce: 0.5,
					delay: stagger(0.1),
					duration: 1,
				},
			],
		];
	}

	return [
		[
			`#${id} li`,
			{ opacity: [0, 1], y: [40, 0] },
			{
				at: `-${duration - 0.3}`,
				type: "spring",
				bounce: 0.35,
				delay: stagger(0.1),
				duration: 1,
			},
		],
	];
};

export const fadeInAnimation = ({
	id,
	isFirstScene,
	fadeInDuration,
	lastSceneDuration,
	defaultSceneDuration,
	index,
}) => [
	`#${id}`,
	{ opacity: 1 },
	{
		duration: isFirstScene ? 0.001 : fadeInDuration,
		...(isFirstScene
			? {}
			: {
					at: `image-${index - 1}`,
					delay: lastSceneDuration ?? defaultSceneDuration,
			  }),
	},
];

export const imageAnimation = ({ id, duration }) => [
	`#${id} #image`,
	{ opacity: 1, scale: [1, 1.2] },
	{
		duration,
	},
];

export const fadeOutAnimation = ({ id, duration }) => [
	`#${id}, #${id} li`,
	{ opacity: 0 },
	{
		at: `+${duration * 0.8}`,
		duration: 0.001,
	},
];

const defaultSceneDuration = 3;

export default function sequencer({ scene, index, lastSceneDuration }) {
	const {
		id,
		text,
		duration = defaultSceneDuration,
		// clip,
		// dimensions,
	} = scene;
	// const radius =
	// 	Math.max(dimensions.width ?? 200, dimensions.height ?? 200) * 3;
	// const clipAnimation = !scene.clip
	// 	? []
	// 	: [`#${id} #${clip}Clip`, { r: [0, radius] }, { duration: 1.5 }];

	const isFirstScene = index == 0;
	const fadeInDuration = 0.00002;

	return [
		fadeInAnimation({
			id,
			isFirstScene,
			fadeInDuration,
			lastSceneDuration,
			defaultSceneDuration,
			index,
		}),
		`image-${index}`,
		imageAnimation({ id, duration }),
		...textAnimation({ id, text, duration, stagger }),
		fadeOutAnimation({ id, duration }),
	];
}
