import Image from 'next/image';
import classnames from 'classnames';
import { Noto_Sans_TC, Nunito_Sans, Aldrich } from 'next/font/google';

import background1 from '../../public/submission/background-1.png';
import background2 from '../../public/submission/background-2.png';
import styles from './styles.module.scss';

export const metadata = {
	title: 'Submission | TAICHI 2023',
	description: 'TAICHI Submission Page',
	keywords: ''
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
	const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_FETCH_URL}/api/submission`, {
		next: {
			revalidate: 60,
		},
	});

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
		case 'col':
			return (
				<div
					key={`${type}-${idx}`}
					className="flex flex-col algin-start"
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
		case 'br':
			return (
				<div key={`${type}-${idx}`} style={{ marginLeft: indentLevel * 24 }}>
					{content?.map(_content =>
						typeof _content === 'string' ? (
							<br key={_content} />
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

const SubmissionPage = async () => {
	const content = await fetchSubmissionContent();

	return (
		<>
			<div
				className={classnames(
					styles.sectionTitle,
					'flex item-start md:items-center px-6 md:px-8 lg:px-16 py-8 md:py-0 h-48 md:h-32 w-100'
				)}
			>
				<h1 className={classnames(notoSansTC.className, 'text-white text-2xl md:text-5xl font-semibold')}>
					TAICHI 2023
				</h1>
				<h1 className={classnames(notoSansTC.className, 'text-white text-2xl md:text-5xl font-semibold ml-12')}>
					8.19-20 TAIPEI
				</h1>
			</div>

			<div className="container mx-auto px-6 md:px-8 py-8 md:py-24 lg:py-36">
				<section className="mb-14 md:mb-28">
					{content?.slice(0, 1).map(({ title_zh, title_en, blocks }) => (
						<div
							key={title_en}
							className={classnames(
								styles.paperBackdrop,
								'relative w-100 flex flex-col px-6 md:px-12 xl:px-32 py-6 md:py-10 xl:py-20 mb-8 md:mb-16 rounded-3xl'
							)}
						>
							<Image
								src={background1}
								alt="submission-background"
								className="absolute -z-10 -top-8 -right-48"
							/>
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
				<section className="mb-14 md:mb-28">
					<h1
						className={classnames(
							nunitoSansTC.className,
							'text-white font-semibold text-2xl md:text-4xl lg:text-5xl leading-tight mb-4'
						)}
					>
						截止日期
					</h1>
					<h1
						className={classnames(
							aldrich.className,
							'uppercase text-white font-normal leading-tight text-2xl md:text-4xl lg:text-5xl mb-8 md:mb-16'
						)}
					>
						Deadlines
					</h1>
					<div
						className={classnames(
							styles.deadlineBackdrop,
							'relative w-100 flex flex-col md:flex-row gap-8 md:gap-0 justify-between p-8 lg:p-16 xl:p-32 rounded-3xl'
						)}
					>
						<Image
							src={background1}
							alt="submission-background"
							className="absolute -top-40 -z-10 md:-top-96 -right-48"
						/>
						<div className="text-center">
							<h2
								className={classnames(
									notoSansTC.className,
									'text-white text-xl md:text-4xl xl:text-5xl mb-4 md:mb-8'
								)}
							>
								<a href="#Papers">
									論文 <span className={aldrich.className}>Papers</span>
								</a>
							</h2>
							<h2
								className={classnames(
									aldrich.className,
									'text-white font-normal text-xl md:text-3xl xl:text-4xl mb-4'
								)}
							>
								2023/6/4
							</h2>
							<h3 className={classnames(aldrich.className, 'text-white text-lg md:text-2xl font-normal')}>
								23:59 GMT+8
							</h3>
						</div>
						<div className="text-center">
							<h2
								className={classnames(
									notoSansTC.className,
									'text-white text-xl md:text-4xl xl:text-5xl mb-4 md:mb-8'
								)}
							>
								<a href="#Posters">
									海報 <span className={aldrich.className}>Posters</span>
								</a>
							</h2>
							<h2
								className={classnames(
									aldrich.className,
									'text-white font-normal text-xl md:text-3xl xl:text-4xl mb-4'
								)}
							>
								2023/6/16
							</h2>
							<h3 className={classnames(aldrich.className, 'text-white text-lg md:text-2xl font-normal')}>
								23:59 GMT+8
							</h3>
						</div>
						<div className="text-center">
							<h2
								className={classnames(
									notoSansTC.className,
									'text-white text-xl md:text-4xl xl:text-5xl mb-4 md:mb-8'
								)}
							>
								<a href="#Demos">
									展示 <span className={aldrich.className}>Demos</span>
								</a>
							</h2>
							<h2
								className={classnames(
									aldrich.className,
									'text-white font-normal text-xl md:text-3xl xl:text-4xl mb-4'
								)}
							>
								2023/6/16
							</h2>
							<h3 className={classnames(aldrich.className, 'text-white text-lg md:text-2xl font-normal')}>
								23:59 GMT+8
							</h3>
						</div>
					</div>
				</section>
				<section>
					<h1
						className={classnames(
							nunitoSansTC.className,
							'text-white font-semibold text-2xl md:text-4xl lg:text-5xl leading-tight mb-4'
						)}
					>
						參與號招
					</h1>
					<h1
						className={classnames(
							aldrich.className,
							'uppercase text-white font-normal leading-tight text-2xl md:text-4xl lg:text-5xl mb-8 md:mb-16'
						)}
					>
						Call For Participation
					</h1>
					{content?.slice(1, -1).map(({ title_zh, title_en, blocks }) => (
						<div
							key={title_en}
							className={classnames(
								styles.paperBackdrop,
								'relative w-100 flex flex-col px-6 md:px-12 xl:px-32 py-6 md:py-10 xl:py-20 mb-8 md:mb-16 rounded-3xl'
							)}
							id={title_en}
						>
							<Image
								src={background2}
								alt="submission-background"
								className="absolute -z-10 -top-16 -left-48"
							/>
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
							nunitoSansTC.className,
							'text-white font-semibold text-2xl md:text-4xl lg:text-5xl leading-tight mb-4'
						)}
					>
						組織成員
					</h1>
					<h1
						className={classnames(
							aldrich.className,
							'uppercase text-white font-normal leading-tight text-2xl md:text-4xl lg:text-5xl mb-8 md:mb-16'
						)}
					>
						Organizers
					</h1>
					{content?.slice(-1).map(({ title_zh, title_en, blocks }) => (
						<div
							key={title_en}
							className={classnames(
								styles.paperBackdrop,
								'relative w-100 flex flex-col px-6 md:px-12 xl:px-32 py-6 md:py-10 xl:py-20 mb-8 md:mb-16 rounded-3xl'
							)}
						>
							<Image
								src={background2}
								alt="submission-background"
								className="absolute -z-10 -top-16 -left-48"
							/>
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
		</>
	);
};

export default SubmissionPage;
