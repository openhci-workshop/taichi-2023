import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/atoms/Button';
import classnames from 'classnames';
import { Noto_Sans_TC, Nunito_Sans, Aldrich } from 'next/font/google';

import background1 from '../../public/submission/background-1.png';
import background2 from '../../public/submission/background-2.png';
import cubelogo from '../../public/cubelogo.png';
import styles from './styles.module.scss';

export const metadata = {
	title: 'Home | TAICHI 2023',
	description: 'TAICHI Home Page',
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
	const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_FETCH_URL}/api/submission`, {
		next: {
			revalidate: 60,
		},
	});

	const content = await response.json();
	return content;
}

async function fetchAbout() {
	const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_FETCH_URL}/api/about`, {
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
		default:
			return null;
	}
}

const Home = async () => {
	const content = await fetchSubmissionContent();
	const about = await fetchAbout();

	return (
		<>
			<div className={classnames(styles.sectionHero, 'flex item-start md:items-center relative')}>
				<div className="heroBackground"></div>
				<div className="flex-1 pt-50">
					<div className="p-20">
						<h1
							className={classnames(
								notoSansTC.className,
								'text-white text-2xl md:text-5xl font-semibold relative'
							)}
						>
							TAICHI&apos;23
						</h1>
						<h2 className="mt-20">第九屆台灣人機互動研討會</h2>
						<h2 className="mt-15">Aug. 18 - 20</h2>
						<h2 className="mt-15">@ National Taiwan Univerisity</h2>
					</div>
				</div>
				<div className="flex-1 flex justify-center items-center">
					<div className="m-50 pt-50">
						<Image
							src={cubelogo}
							alt="logo-cube"
							style={{ width: '50%', height: 'auto', transform: 'scale(1.8)' }}
						/>
					</div>
				</div>
			</div>

			<div className="flex justify-between m-10">
				<div className="w-1/2">
					{' '}
					{/* Left div */}
					{<h1>待辦: 要和視覺要主視覺，上面只是mock up</h1>}
				</div>
				<div className="w-1/2 flex flex-row justify-center items-center">
					{' '}
					{/* Right div */}
					<div className="m-5">
						<Link href="https://easychair.org/my/conference?conf=taichi2023" target="_blank">
							<Button>Submit Paper</Button>
						</Link>
					</div>
					<div>
						<Link href="/" target="_blank">
							<Button>Register Now</Button>
						</Link>
					</div>
				</div>
			</div>

			<div className="container mx-auto px-6 md:px-8 py-8 md:py-24 lg:py-36">
				<section>
					{about?.slice(0, 1).map(({ title_zh, title_en, blocks }) => (
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
									'text-white text-2xl md:text-4xl lg:text-5xl mb-2 md:mb-8'
								)}
							>
								{title_zh}
							</h2>
							<h3
								className={classnames(
									aldrich.className,
									'text-white text-2xl md:text-4xl mb-4 md:mb-8'
								)}
							>
								{title_en}
							</h3>
							<div className="flex flex-col gap-y-5">
								{blocks?.map(({ type, content, level }, idx) => renderHTML(type, content, level, idx))}
							</div>
						</div>
					))}
				</section>

				<section className="mb-14 md:mb-28" id="keynote">
					<h1
						className={classnames(
							nunitoSansTC.className,
							'text-white font-semibold text-2xl md:text-4xl lg:text-5xl leading-tight mb-4'
						)}
					>
						主講者
					</h1>
					<h1
						className={classnames(
							aldrich.className,
							'uppercase text-white font-normal leading-tight text-2xl md:text-4xl lg:text-5xl mb-8 md:mb-16'
						)}
					>
						KeyNote Speakers
					</h1>
					<div className="row m-20">
						<div className="flex flex-wrap justify-center -mx-8">
							<div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/3 px-6 mb-4">
								<div
									className={classnames(
										styles.customshadow,
										'rounded-lg overflow-hidden bg-gradient-to-br from-yellow-400 to-green-900'
									)}
								>
									<Image
										src="/speakers/edchi.jpg"
										alt="Card Image"
										className="width-full"
										width={500}
										height={300}
									/>
									<div className="p-4">
										<h1 className="text-lg font-bold mb-2">ED CHI</h1>
										<p className="text-sm text-gray-300 mb-1">Distinguished Scientist</p>
										<p className="text-sm text-gray-300 mb-1">Google DeepMind</p>
										<br />
									</div>
								</div>
							</div>

							<div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/3 px-6 mb-4">
								<div
									className={classnames(
										styles.customshadow,
										'rounded-lg overflow-hidden bg-gradient-to-br from-yellow-400 to-green-900'
									)}
								>
									<Image
										src="/speakers/ellen.png"
										alt="Card Image"
										className="width-full"
										width={500}
										height={300}
									/>
									<div className="p-4">
										<h1 className="text-lg font-bold mb-2">ELLEN YI-LUEN DO</h1>
										<p className="text-sm text-gray-300 mb-1">Professor</p>
										<p className="text-sm text-gray-300 mb-1">ATLAS Institute</p>
										<p className="text-sm text-gray-300 mb-1">University of Colorado Boulder</p>
									</div>
								</div>
							</div>

							<div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/3 px-6 mb-4">
								<div
									className={classnames(
										styles.customshadow,
										'rounded-lg overflow-hidden bg-gradient-to-br from-yellow-400 to-green-900'
									)}
								>
									<Image
										src="/speakers/zhaosd.jpg"
										alt="Card Image"
										className="width-full"
										width={500}
										height={300}
									/>
									<div className="p-4">
										<h1 className="text-lg font-bold mb-2">ED SHENGDONG ZHAO</h1>
										<p className="text-sm text-gray-300 mb-1">Associate Professor</p>
										<p className="text-sm text-gray-300 mb-1">National University of Singapore</p>
										<br />
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section className="mb-14 md:mb-28" id="submission">
					<h1
						className={classnames(
							nunitoSansTC.className,
							'text-white font-semibold text-2xl md:text-4xl lg:text-5xl leading-tight mb-4'
						)}
					>
						參與號召
					</h1>
					<h1
						className={classnames(
							aldrich.className,
							'uppercase text-white font-normal leading-tight text-2xl md:text-4xl lg:text-5xl mb-8 md:mb-16'
						)}
					>
						Call For Participation
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
								2023/5/21
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

				<section id="registration" />

				<section id="agenda" />

				<section className="mb-14 md:mb-28">
					<h1
						className={classnames(
							nunitoSansTC.className,
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

				<section id="award">
					<h1
						className={classnames(
							nunitoSansTC.className,
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
					{about?.slice(1, 4).map(({ title_zh, title_en, blocks }) => (
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
								className="absolute -top-16 -left-48"
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

				<section id="organizers">
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

export default Home;
