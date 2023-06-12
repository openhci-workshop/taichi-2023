import classnames from 'classnames';
import { Nunito_Sans, Aldrich } from 'next/font/google';

const nunitoSansTC = Nunito_Sans({
	weight: ['400', '600', '700'],
	subsets: ['latin'],
});

const aldrich = Aldrich({
	weight: ['400'],
	subsets: ['latin'],
});

import styles from './styles.module.scss';

const BlockTitle = ({ titleZh, titleEn }) => (
	<div className={classnames('flex flex-col', styles.blockTitle)}>
		<h2 className={nunitoSansTC.className}>
			{titleZh}
			<span className={aldrich.className}>{titleEn}</span>
		</h2>
		<div />
	</div>
);

export default BlockTitle;
