import { ReactNode, useCallback } from "react";
// import SwiperType from "swiper";
// import {
// 	Swiper,
// 	SwiperProps,
// 	SwiperSlide,
// 	SwiperSlideProps
// } from "swiper/react/swiper-react";
import "swiper/swiper.scss";

import { Swiper, SwiperSlide } from 'swiper/react';
import { SwiperProps, SwiperSlideProps } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';

import classes from "./swiper.module.scss";
import { joinClasses } from "../../common/utils";
import { Virtual } from 'swiper/modules';

interface Props {
	containerClassName?: string;
	containerProps?: SwiperProps;
	slideClassName?: string;
	slideProps?: SwiperSlideProps;
	slides: ReactNode[];
	fetchNext?: () => void;
}

const isSafari = /iPhone|Mac OS|iPad|iPod/.test(navigator.userAgent);

export default function SwiperComponent({
	containerClassName,
	slideClassName,
	slides,
	containerProps,
	slideProps,
	fetchNext
}: Props) {
	const handleSlideChange = useCallback(
		(swiper: SwiperType) => {
			const prevVideo = document.querySelector<HTMLVideoElement>(
				"#slide-" + swiper.previousIndex + " video"
			)!;
			const curVideo = document.querySelector<HTMLVideoElement>(
				"#slide-" + swiper.activeIndex + " video"
			)!;

			if (!prevVideo.paused) prevVideo.pause();
			if (!isSafari) curVideo.play();

			if (swiper.activeIndex === slides.length - 1) fetchNext?.();
		},
		[fetchNext, slides.length]
	);

	return (
		<Swiper
			modules={[Virtual]}
			direction="vertical"
			className={joinClasses(classes["swiper-container"], containerClassName)}
			onSlideChange={handleSlideChange}
			{...containerProps}
		>
			{slides.map((slide, i) => (
				<SwiperSlide
					key={i}
					className={joinClasses(classes["swiper-slide"], slideClassName)}
					id={"slide-" + i}
					{...slideProps}
				>
					{slide}
				</SwiperSlide>
			))}
		</Swiper>
	);
}