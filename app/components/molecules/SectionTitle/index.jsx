import classnames from 'classnames';
import { Noto_Sans_TC, Aldrich } from 'next/font/google';

const notoSansTC = Noto_Sans_TC({
	weight: ['400', '500', '700'],
	subsets: ['latin'],
});

const aldrich = Aldrich({
	weight: ['400'],
	subsets: ['latin'],
});

const SectionTitle = ({ className, titleZh, titleEn }) => (
	<div className={classnames('flex flex-col tracking-widest', className)}>
		<h1
			className={classnames(
				notoSansTC.className,
				'text-white font-semibold text-xl md:text-4xl lg:text-5xl leading-tight mb-4'
			)}
		>
			{titleZh}
		</h1>
		<h1
			className={classnames(
				aldrich.className,
				'uppercase text-white font-normal leading-tight text-lg md:text-4xl lg:text-5xl mb-8 md:mb-16'
			)}
		>
			{titleEn}
		</h1>
	</div>
);

export default SectionTitle;
