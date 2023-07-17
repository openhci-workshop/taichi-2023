import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/atoms/Button';
import classnames from 'classnames';
import { Noto_Sans_TC, Nunito_Sans, Aldrich } from 'next/font/google';

import NavBar from '@/components/organisms/NavBar';
import SectionTitle from '@/components/molecules/SectionTitle';
import BlockTitle from '@/components/molecules/BlockTitle';
import Carousel from '@/components/organisms/Carousel';

import logo from '../public/logo_hero.png';
import cube from '../public/tai_cube.png';
import styles from './styles.module.scss';

export const metadata = {
	title: 'TAICHI 2023',
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
									'text-xs md:text-lg text-white leading-looser font-normal tracking-widest'
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
									'text-xs md:text-lg text-white leading-looser font-normal tracking-widest'
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
									'text-lg md:text-2xl font-semibold leading-8 mb-1 tracking-widest'
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
									'text-base md:text-3xl font-semibold leading-8 mb-5 tracking-widest'
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
									styles.h4,
									'text-xs md:text-lg text-white leading-none font-black mb-8 tracking-widest'
								)}
							/>
						) : (
							renderHTML(_content.type, _content.content, _content.level)
						)
					)}
				</div>
			);
		case 'h5':
			return (
				<div key={`${type}-${idx}`} style={{ marginLeft: (indentLevel - 1) * 24 }}>
					{content?.map(_content =>
						typeof _content === 'string' ? (
							<h5
								key={_content}
								dangerouslySetInnerHTML={{ __html: _content }}
								className={classnames(
									notoSansTC.className,
									'text-xs md:text-sm text-white font-normal tracking-widest'
								)}
								style={{ lineHeight: '2 !important' }}
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
		case 'grid':
			return (
				<div
					key={`${type}-${idx}`}
					className="grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-5 mb-1 last:mb-0"
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
									'text-white font-normal text-sm md:text-3xl lg:text-4xl mb-4 tracking-widest'
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
								className="text-xs md:text-lg text-white leading-looser font-normal tracking-widest"
							/>
						) : (
							renderHTML(_content.type, _content.content, _content.level)
						)
					)}
				</div>
			);
		case 'image':
			return (
				<div key={`${type}-${idx}`} style={{ marginLeft: (indentLevel - 1) * 24 }}>
					{content?.map(_content =>
						typeof _content === 'string' ? (
							<Image
								key={_content}
								src={"" + _content}
								alt={_content}
								width={150}
								height={78}
								className=""
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

const HomePage = async () => {
	const content = await fetchSubmissionContent();

	return (
		<>
			<NavBar />

			<div className={classnames(styles.heroBackdrop, 'flex flex-col items-start py-6 md:py-12')}>
				<div className="container mx-auto px-6 md:px-8">
					<Image src={logo} alt="logo" className="h-auto w-full md:w-1/2 lg:w-1/3 mt-4 mb-8" />
					<h1 className={classnames(notoSansTC.className, 'text-white text-lg md:text-2xl font-semibold tracking-widest tracking-widest')}>
						第九屆台灣人機互動研討會
					</h1>
					<h3
						className={classnames(
							aldrich.className,
							'text-white text-base md:text-xl font-semibold mt-2 mb-8 tracking-widest'
						)}
					>
						2023/8/19 - 20 <u><a href="https://goo.gl/maps/gDdEZKBsBKFrowWs5" target="_blank">國立臺灣大學德田館</a></u>
					</h3>
					<div
						className={classnames(
							'flex flex-row space-x-4 mb-8 md:space-x-6 md:items-start w-full justify-center md:justify-start'
						)}
					>
						<Link href="https://easychair.org/my/conference?conf=taichi2023" target="_blank">
							<Button variant="normal">論文投稿</Button>
						</Link>
						<Link href="https://taichi2023.kktix.cc/events/6844edd1" target="_blank">
							<Button variant="outline">註冊會議</Button>
						</Link>
					</div>
				</div>
			</div>

			<Image src={cube} alt="cube" className={classnames(styles.cube, 'h-auto w-1/2 md:w-1/3')} />

			<div className="container mx-auto px-6 md:px-8 py-8 md:py-24 lg:py-36">
				{/* 關於 About */}
				<section className="mb-14 md:mb-28">
					{content?.slice(0, 1).map(({ title_zh, title_en, blocks }) => (
						<div
							key={title_en}
							className={classnames(
								styles.blockBackdrop,
								'relative w-100 flex flex-col p-8 sm:px-12 sm:py-16 lg:px-20 lg:py-24 mb-8 md:mb-16 gap-4 md:gap-12'
							)}
						>
							<div className="flex flex-col gap-8">
								{blocks?.map(({ type, content, level }, idx) => renderHTML(type, content, level, idx))}
							</div>
						</div>
					))}
				</section>

				{/* 主題演講 KeyNote Speakers */}
				<section className="mb-14 md:mb-28" id="keynote">
					<SectionTitle titleZh="主題演講" titleEn="KeyNote Speakers" />
					<div className={classnames(styles.carousel, 'flex justify-center items-center m-24')}>
						<Carousel />
					</div>
				</section>

				{/* 參與號召 Call For Participation */}
				<section className="mb-14 md:mb-28" id="submission">
					<SectionTitle titleZh="參與號召" titleEn="Call For Participation" />
					<div
						className={classnames(
							styles.blockBackdrop,
							'relative w-100 flex flex-col p-8 sm:px-12 sm:py-16 lg:px-20 lg:py-24 mb-8 md:mb-16 gap-4 md:gap-12'
						)}
					>
						<BlockTitle titleZh="截稿日期" titleEn="Deadlines" />
						<ul className="flex flex-col md:flex-row gap-4 md:gap-0 mt-7 md:mt-16 justify-around">
							<li className="text-left list-disc md:list-none ml-4 md:ml-0">
								<h2
									className={classnames(
										notoSansTC.className,
										'text-white text-sm md:text-[32px] mb-4 md:mb-8'
									)}
								>
									<a href="#Papers">
										論文 <span className={aldrich.className}>Papers</span>
									</a>
								</h2>
								<h2
									className={classnames(
										aldrich.className,
										'text-white font-normal text-base md:text-3xl xl:text-[40px] mb-4 flex items-center'
									)}
								>
									2023/6/18{' '}
									<span className="md:hidden text-xs leading-8 ml-4 mb-0.5">( 23:59 GMT+8 )</span>
								</h2>
								<h6
									className={classnames(
										aldrich.className,
										'hidden md:block text-white text-sm md:text-[18px] font-normal'
									)}
								>
									23:59 GMT+8
								</h6>
							</li>
							<li className="text-left list-disc md:list-none ml-4 md:ml-0">
								<h2
									className={classnames(
										notoSansTC.className,
										'text-white text-sm md:text-[32px] mb-4 md:mb-8'
									)}
								>
									<a href="#Posters">
										海報 <span className={aldrich.className}>Posters</span>
									</a>
								</h2>
								<h2
									className={classnames(
										aldrich.className,
										'text-white font-normal text-base md:text-3xl xl:text-[40px] mb-4 flex items-center'
									)}
								>
									2023/6/23
									<span className="md:hidden text-xs leading-8 ml-4 mb-0.5">( 23:59 GMT+8 )</span>
								</h2>
								<h6
									className={classnames(
										aldrich.className,
										'hidden md:block text-white text-sm md:text-[18px] font-normal'
									)}
								>
									23:59 GMT+8
								</h6>
							</li>
							<li className="text-left list-disc md:list-none ml-4 md:ml-0">
								<h2
									className={classnames(
										notoSansTC.className,
										'text-white text-sm md:text-[32px] mb-4 md:mb-8'
									)}
								>
									<a href="#Demos">
										展示 <span className={aldrich.className}>Demos</span>
									</a>
								</h2>
								<h2
									className={classnames(
										aldrich.className,
										'text-white font-normal text-base md:text-3xl xl:text-[40px] mb-4 flex items-center'
									)}
								>
									2023/6/23
									<span className="md:hidden text-xs leading-8 ml-4 mb-0.5">( 23:59 GMT+8 )</span>
								</h2>
								<h6
									className={classnames(
										aldrich.className,
										'hidden md:block text-white text-sm md:text-[18px] font-normal'
									)}
								>
									23:59 GMT+8
								</h6>
							</li>
						</ul>
					</div>
					{content?.slice(1, 5).map(({ title_zh, title_en, blocks }) => (
						<div
							key={title_en}
							className={classnames(
								styles.blockBackdrop,
								'relative w-100 flex flex-col p-8 sm:px-12 sm:py-16 lg:px-20 lg:py-24 mb-8 md:mb-16 gap-4 md:gap-12'
							)}
						>
							<BlockTitle titleZh={title_zh} titleEn={title_en} />
							<div className="flex flex-col gap-8 md:gap-24">
								{blocks?.map(({ type, content, level }, idx) => renderHTML(type, content, level, idx))}
							</div>
						</div>
					))}
				</section>

				{/* 註冊會議 Registration */}
				{/* <section className="mb-14 md:mb-28" id="registration">
					<SectionTitle titleZh="註冊會議" titleEn="Registration" />
					{content?.slice(-4, -3).map(({ title_zh, title_en, blocks }) => (
						<div
							key={title_en}
							className={classnames(
								styles.blockBackdrop,
								'relative w-100 flex flex-col p-8 sm:px-12 sm:py-16 lg:px-20 lg:py-24 mb-8 md:mb-16 gap-4 md:gap-12'
							)}
						>
							<div className="flex flex-col gap-8 md:gap-24">
								{blocks?.map(({ type, content, level }, idx) => renderHTML(type, content, level, idx))}
							</div>
						</div>
					))}
				</section> */}

				{/* 議程 Agenda */}

				{/* 獲獎資訊 Award */}

				{/* 學生志工 SV */}
				{/* <section className="mb-14 md:mb-28" id="sv">
					<SectionTitle titleZh="學生志工" titleEn="Student Volunteers" />
					{content?.slice(-3, -2).map(({ title_zh, title_en, blocks }) => (
						<div
							key={title_en}
							className={classnames(
								styles.blockBackdrop,
								'relative w-100 flex flex-col p-8 sm:px-12 sm:py-16 lg:px-20 lg:py-24 mb-8 md:mb-16 gap-4 md:gap-12'
							)}
						>
							<div className="flex flex-col gap-8 md:gap-24">
								{blocks?.map(({ type, content, level }, idx) => renderHTML(type, content, level, idx))}
							</div>
						</div>
					))}
				</section> */}

				{/* 組織成員 Organizers */}
				<section className="mb-14 md:mb-28" id="organizers">
					<SectionTitle titleZh="組織成員" titleEn="Organizers" />
					{content?.slice(-2,-1).map(({ title_en, blocks }) => (
						<div
							key={title_en}
							className={classnames(
								styles.blockBackdrop,
								styles.organizationWrapper,
								'relative w-100 grid grid-cols-1 lg:grid-cols-2 p-12 sm:px-20 sm:py-16 lg:px-28 lg:py-20 mb-8 md:mb-16 gap-x-24 gap-y-16 lg:gap-y-28'
							)}
						>
							{blocks?.map(({ type, content, level }, idx) => (
								<div key={Math.random()}>{renderHTML(type, content, level, idx)}</div>
							))}
						</div>
					))}
					{content?.slice(-1).map(({ title_zh, title_en, blocks }) => (
						<div
							key={title_en}
							className={classnames(
								styles.blockBackdrop,
								'relative w-100 flex flex-col p-8 sm:px-12 sm:py-16 lg:px-20 lg:py-24 mb-8 md:mb-16 gap-4 md:gap-12'
							)}
						>
							<div className="flex flex-col gap-8 md:gap-24">
								{blocks?.map(({ type, content, level }, idx) => renderHTML(type, content, level, idx))}
							</div>
						</div>
					))}
				</section>

				<div className={classnames(styles.footer, "flex flex-col lg:flex-row items-center lg:items-start space-y-4 lg:space-y-0 lg:justify-start lg:px-20")}>
					<div className="text-xs md:text-base z-10 lg:w-1/3">
						COPYRIGHT © 2023 TAICHI
					</div>
				</div>
			</div>
		</>
	);
};

export default HomePage;
