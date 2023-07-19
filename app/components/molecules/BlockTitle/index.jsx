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

import styles from './styles.module.scss';

const BlockTitle = ({ titleZh, titleEn }) => (
	<div className={classnames('flex flex-col tracking-widest', styles.blockTitle)}>
		<h2 className={notoSansTC.className}>
			{titleZh}
			<span className={aldrich.className}>{titleEn}</span>
		</h2>
		<div />
	</div>
);

export default BlockTitle;
