import Image from 'next/image';
import classnames from 'classnames';
import { Noto_Sans_TC, Nunito_Sans, Aldrich } from 'next/font/google';

import background1 from '../../public/submission/background-1.png';
import background2 from '../../public/submission/background-2.png';
import styles from './styles.module.scss';

export const metadata = {
	title: 'About | TAICHI 2023',
	description: 'TAICHI About Page',
	keywords: '',
};

const notoSansTC = Noto_Sans_TC({
	weight: ['300', '400', '500', '700'],
	subsets: ['latin'],
});

const nunitoSansTC = Nunito_Sans({
	weight: ['400', '600', '700'],
	subsets: ['latin'],
});

const aldrich = Aldrich({
	weight: ['400'],
	subsets: ['latin'],
});

async function fetchSubmissionContent() {
	const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_FETCH_URL}/api/about`, {
		next: {
			revalidate: 60,
		},
	});

	// For loading test
	// await new Promise(resolve => setTimeout(resolve, 1000));

	const content = await response.json();
	return content;
}

function renderHTML(type, content, indentLevel, idx = Math.random()) {
	switch (type) {
		case 'ul':
			return (
				<ul key={`${type}-${idx}`} className="list-disc" style={{ marginLeft: indentLevel * 24 }}>
					{content?.map(_content =>
						typeof _content === 'string' ? (
							<li
								key={_content}
								dangerouslySetInnerHTML={{ __html: _content }}
								className={classnames(
									notoSansTC.className,
									'text-xs md:text-base text-white leading-loose font-light'
								)}
							/>
						) : (
							renderHTML(_content.type, _content.content, _content.level)
						)
					)}
				</ul>
			);
		case 'ol':
			return (
				<ol key={`${type}-${idx}`} className="list-roman" style={{ marginLeft: indentLevel * 24 }}>
					{content?.map(_content =>
						typeof _content === 'string' ? (
							<li
								key={_content}
								dangerouslySetInnerHTML={{ __html: _content }}
								className={classnames(
									notoSansTC.className,
									'text-xs md:text-base text-white leading-loose font-light'
								)}
							/>
						) : (
							renderHTML(_content.type, _content.content, _content.level)
						)
					)}
				</ol>
			);
		case 'h2':
			return (
				<div key={`${type}-${idx}`} style={{ marginLeft: (indentLevel - 1) * 24 }}>
					{content?.map(_content =>
						typeof _content === 'string' ? (
							<h2
								key={_content}
								dangerouslySetInnerHTML={{ __html: _content }}
								className={classnames(
									notoSansTC.className,
									'text-lg md:text-2xl font-semibold leading-8 mb-1'
								)}
							/>
						) : (
							renderHTML(_content.type, _content.content, _content.level)
						)
					)}
				</div>
			);
		case 'h3':
			return (
				<div key={`${type}-${idx}`} style={{ marginLeft: (indentLevel - 1) * 24 }}>
					{content?.map(_content =>
						typeof _content === 'string' ? (
							<h3
								key={_content}
								dangerouslySetInnerHTML={{ __html: _content }}
								className={classnames(
									notoSansTC.className,
									'text-base md:text-xl font-semibold leading-8 mb-1'
								)}
							/>
						) : (
							renderHTML(_content.type, _content.content, _content.level)
						)
					)}
				</div>
			);
		case 'h4':
			return (
				<div key={`${type}-${idx}`} style={{ marginLeft: (indentLevel - 1) * 24 }}>
					{content?.map(_content =>
						typeof _content === 'string' ? (
							<h4
								key={_content}
								dangerouslySetInnerHTML={{ __html: _content }}
								className={classnames(
									notoSansTC.className,
									'text-xs md:text-base font-semibold leading-8'
								)}
							/>
						) : (
							renderHTML(_content.type, _content.content, _content.level)
						)
					)}
				</div>
			);
		case 'row':
			return (
				<div
					key={`${type}-${idx}`}
					className="flex flex-col md:flex-row justify-between"
					style={{ marginLeft: (indentLevel - 1) * 24 }}
				>
					{content?.map(_content => renderHTML(_content.type, _content.content, _content.level))}
				</div>
			);
		case 'date':
			return (
				<div key={`${type}-${idx}`} style={{ marginLeft: (indentLevel - 1) * 24 }}>
					{content?.map(_content =>
						typeof _content === 'string' ? (
							<h2
								key={_content}
								dangerouslySetInnerHTML={{ __html: _content }}
								className={classnames(
									aldrich.className,
									'text-white font-normal text-xl md:text-3xl lg:text-4xl mb-4'
								)}
							/>
						) : (
							renderHTML(_content.type, _content.content, _content.level)
						)
					)}
				</div>
			);
		case 'p':
			return (
				<div key={`${type}-${idx}`} style={{ marginLeft: (indentLevel - 1) * 24 }}>
					{content?.map(_content =>
						typeof _content === 'string' ? (
							<p
								key={_content}
								dangerouslySetInnerHTML={{ __html: _content }}
								className="text-xs md:text-base text-white leading-8"
							/>
						) : (
							renderHTML(_content.type, _content.content, _content.level)
						)
					)}
				</div>
			);
		case 'button':
			return (
				<div key={`${type}-${idx}`} style={{ marginLeft: indentLevel * 24 }}>
					{content?.map(_content =>
						typeof _content === 'string' ? (
							<button
								key={_content}
								type="button"
								dangerouslySetInnerHTML={{ __html: _content }}
								className="text-lg text-dark-gray bg-dark-yellow rounded-full leading-normal px-5 py-3"
							/>
						) : (
							renderHTML(_content.type, _content.content, _content.level)
						)
					)}
				</div>
			);
		default:
			return null;
	}
}

const AboutPage = async () => {
	const content = await fetchSubmissionContent();

	return (
		<div className="container mx-auto px-4 md:px-2 py-8 md:py-24 lg:py-36">
			<section className="mb-14 md:mb-28">
				<h1
					className={classnames(
						notoSansTC.className,
						'text-white font-semibold text-2xl md:text-4xl lg:text-5xl leading-tight mb-4'
					)}
				>
					會議地點
				</h1>
				<h1
					className={classnames(
						aldrich.className,
						'uppercase text-white font-normal leading-tight text-2xl md:text-4xl lg:text-5xl mb-8 md:mb-16'
					)}
				>
					VENUE
				</h1>
			</section>
			<section>
				<h1
					className={classnames(
						notoSansTC.className,
						'text-white font-semibold text-2xl md:text-4xl lg:text-5xl leading-tight mb-4'
					)}
				>
					獲獎資訊
				</h1>
				<h1
					className={classnames(
						aldrich.className,
						'uppercase text-white font-normal leading-tight text-2xl md:text-4xl lg:text-5xl mb-8 md:mb-16'
					)}
				>
					AWARD
				</h1>
				{content?.slice(0, 1).map(({ title_zh, title_en, blocks }) => (
					<div
						key={title_en}
						className={classnames(
							styles.paperBackdrop,
							'relative w-100 flex flex-col px-6 md:px-12 xl:px-32 py-6 md:py-10 xl:py-20 mb-8 md:mb-16 rounded-3xl'
						)}
					>
						<Image src={background1} alt="submission-background" className="absolute -top-8 -right-48" />
						<h2
							className={classnames(
								notoSansTC.className,
								'text-white text-2xl md:text-4xl lg:text-5xl mb-4 md:mb-8'
							)}
						>
							{title_zh} <span className={aldrich.className}>{title_en}</span>
						</h2>
						<div className="flex flex-col gap-y-5">
							{blocks?.map(({ type, content, level }, idx) => renderHTML(type, content, level, idx))}
						</div>
					</div>
				))}
				{content?.slice(1, 4).map(({ title_zh, title_en, blocks }) => (
					<div
						key={title_en}
						className={classnames(
							styles.paperBackdrop,
							'relative w-100 flex flex-col px-6 md:px-12 xl:px-32 py-6 md:py-10 xl:py-20 mb-8 md:mb-16 rounded-3xl'
						)}
					>
						<Image src={background2} alt="submission-background" className="absolute -top-16 -left-48" />
						<h2
							className={classnames(
								notoSansTC.className,
								'text-white text-2xl md:text-4xl lg:text-5xl mb-4 md:mb-8'
							)}
						>
							{title_zh} <span className={aldrich.className}>{title_en}</span>
						</h2>
						<div className="flex flex-col gap-y-5">
							{blocks?.map(({ type, content, level }, idx) => renderHTML(type, content, level, idx))}
						</div>
					</div>
				))}
			</section>
            <section>
				<h1
					className={classnames(
						notoSansTC.className,
						'text-white font-semibold text-2xl md:text-4xl lg:text-5xl leading-tight mb-4'
					)}
				>
					會議組織
				</h1>
				<h1
					className={classnames(
						aldrich.className,
						'uppercase text-white font-normal leading-tight text-2xl md:text-4xl lg:text-5xl mb-8 md:mb-16'
					)}
				>
					ORGANIZATION
				</h1>
				{content?.slice(4).map(({ title_zh, title_en, blocks }) => (
					<div
						key={title_en}
						className={classnames(
							styles.paperBackdrop,
							'relative w-100 flex flex-col px-6 md:px-12 xl:px-32 py-6 md:py-10 xl:py-20 mb-8 md:mb-16 rounded-3xl'
						)}
					>
						<Image src={background1} alt="submission-background" className="absolute -top-8 -right-48" />
						<h2
							className={classnames(
								notoSansTC.className,
								'text-white text-2xl md:text-4xl lg:text-5xl mb-4 md:mb-8'
							)}
						>
							{title_zh} <span className={aldrich.className}>{title_en}</span>
						</h2>
						<div className="flex flex-col gap-y-5">
							{blocks?.map(({ type, content, level }, idx) => renderHTML(type, content, level, idx))}
						</div>
					</div>
				))}
				{content?.slice(5).map(({ title_zh, title_en, blocks }) => (
					<div
						key={title_en}
						className={classnames(
							styles.paperBackdrop,
							'relative w-100 flex flex-col px-6 md:px-12 xl:px-32 py-6 md:py-10 xl:py-20 mb-8 md:mb-16 rounded-3xl'
						)}
					>
						<Image src={background2} alt="submission-background" className="absolute -top-16 -left-48" />
						<h2
							className={classnames(
								notoSansTC.className,
								'text-white text-2xl md:text-4xl lg:text-5xl mb-4 ml-2 md:mb-8 ml-4'
							)}
						>
							{title_zh} <span className={aldrich.className}>{title_en}</span>
						</h2>
						<div className="flex flex-col gap-y-5">
							{blocks?.map(({ type, content, level }, idx) => renderHTML(type, content, level, idx))}
						</div>
					</div>
				))}
			</section>
            <section>
				<h1
					className={classnames(
						notoSansTC.className,
						'text-white font-semibold text-2xl md:text-4xl lg:text-5xl leading-tight mb-4'
					)}
				>
					主辦單位
				</h1>
				<h1
					className={classnames(
						aldrich.className,
						'uppercase text-white font-normal leading-tight text-2xl md:text-4xl lg:text-5xl mb-8 md:mb-16'
					)}
				>
					ORGANIZATION
				</h1>
				{content?.slice(5).map(({ title_zh, title_en, blocks }) => (
					<div
						key={title_en}
						className={classnames(
							styles.paperBackdrop,
							'relative w-100 flex flex-col px-6 md:px-12 xl:px-32 py-6 md:py-10 xl:py-20 mb-8 md:mb-16 rounded-3xl'
						)}
					>
						<Image src={background1} alt="submission-background" className="absolute -top-8 -right-48" />
						<h2
							className={classnames(
								notoSansTC.className,
								'text-white text-2xl md:text-4xl lg:text-5xl mb-4 md:mb-8'
							)}
						>
							{title_zh} <span className={aldrich.className}>{title_en}</span>
						</h2>
						<div className="flex flex-col gap-y-5">
							{blocks?.map(({ type, content, level }, idx) => renderHTML(type, content, level, idx))}
						</div>
					</div>
				))}
				{content?.slice(5).map(({ title_zh, title_en, blocks }) => (
					<div
						key={title_en}
						className={classnames(
							styles.paperBackdrop,
							'relative w-100 flex flex-col px-6 md:px-12 xl:px-32 py-6 md:py-10 xl:py-20 mb-8 md:mb-16 rounded-3xl'
						)}
					>
						<Image src={background2} alt="submission-background" className="absolute -top-16 -left-48" />
						<h2
							className={classnames(
								notoSansTC.className,
								'text-white text-2xl md:text-4xl lg:text-5xl mb-4 md:mb-8'
							)}
						>
							{title_zh} <span className={aldrich.className}>{title_en}</span>
						</h2>
						<div className="flex flex-col gap-y-5">
							{blocks?.map(({ type, content, level }, idx) => renderHTML(type, content, level, idx))}
						</div>
					</div>
				))}
			</section>
		</div>
	);
};

export default AboutPage;
