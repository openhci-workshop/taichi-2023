'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import { Noto_Sans_TC, Aldrich } from 'next/font/google';
import { gsap } from 'gsap/dist/gsap';
import { useTrail, a } from '@react-spring/web';

const notoSansTC = Noto_Sans_TC({
	weight: ['400', '500', '700'],
	subsets: ['latin'],
});

const aldrich = Aldrich({
	weight: ['400'],
	subsets: ['latin'],
});

const SectionTitle = ({ className, titleZh, titleEn }) => {
	const [start, setStart] = useState(false);
	const titleRef = useRef(null);
	const titleZhItems = titleZh.split('');
	const titleEnItems = titleEn.split('');

	const config = {
		config: { mass: 5, tension: 10000, friction: 400 },
		// opacity: start ? 1 : 0,
		y: start ? '0%' : '100%',
		reverse: !start,
	};

	const trailZh = useTrail(titleZhItems.length, config);
	const trailEn = useTrail(titleEnItems.length, config);

	useLayoutEffect(() => {
		gsap.to(titleRef.current, {
			scrollTrigger: {
				trigger: titleRef.current,
				start: 'top 80%',
				end: 'bottom 80%',
				scrub: 1,
				onEnter: () => setStart(true),
				onLeaveBack: () => setStart(false),
			},
		});
	});

	return (
		<div className={classnames('flex flex-col', className)} ref={titleRef}>
			<h1
				className={classnames(
					notoSansTC.className,
					'flex text-white font-semibold text-xl md:text-4xl lg:text-5xl leading-tight mb-4 overflow-hidden z-[8]'
				)}
			>
				{trailZh.map((style, index) => (
					<a.p key={index} style={style}>
						{titleZhItems[index]}
					</a.p>
				))}
			</h1>
			<h1
				className={classnames(
					aldrich.className,
					'flex uppercase text-white font-normal leading-tight text-lg md:text-4xl lg:text-5xl mb-8 md:mb-16 overflow-hidden z-[8]'
				)}
			>
				{trailEn.map((style, index) => (
					<a.p
						key={index}
						className={classnames({
							'min-w-[8px] md:min-w-[24px]': titleEnItems[index] === ' ',
						})}
						style={style}
					>
						{titleEnItems[index]}
					</a.p>
				))}
			</h1>
		</div>
	);
};

export default SectionTitle;
