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

import styles from './styles.module.scss';

const BlockTitle = ({ titleZh, titleEn }) => {
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

	const trail = useTrail(titleZhItems.length + titleEnItems.length, config);

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
		<div className={classnames('flex flex-col', styles.blockTitle)} ref={titleRef}>
			<h2 className={classnames('flex overflow-hidden', notoSansTC.className)}>
				{trail.map((style, index) =>
					index < titleZhItems.length ? (
						<a.p key={index} style={style}>
							{titleZhItems[index]}
						</a.p>
					) : (
						<a.span
							key={index}
							className={classnames(aldrich.className, {
								'ml-2 md:ml-3': index === titleZhItems.length,
								'min-w-[8px] md:min-w-[24px]': titleEnItems[index] === ' ',
							})}
							style={style}
						>
							{titleEnItems[index - titleZhItems.length]}
						</a.span>
					)
				)}
			</h2>
			<div />
		</div>
	);
};

export default BlockTitle;
