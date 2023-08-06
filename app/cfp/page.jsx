import React from 'react'
import Image from 'next/image';
import classnames from 'classnames';
import { Noto_Sans_TC, Aldrich } from 'next/font/google';

import NavBar from '@/components/organisms/NavBar'
import SectionTitle from '@/components/molecules/SectionTitle';
import BlockTitle from '@/components/molecules/BlockTitle';
import Footer from '@/components/organisms/Footer';

import styles from '@/styles.module.scss';

export const metadata = {
	title: 'TAICHI 2023 Call For Participation',
	description: 'TAICHI 2023 Call For Participation',
	keywords: '',
};

const notoSansTC = Noto_Sans_TC({
	weight: ['300', '400', '500', '700'],
	subsets: ['latin'],
});

const aldrich = Aldrich({
	weight: ['400'],
	subsets: ['latin'],
});

async function fetchContent() {
	const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_FETCH_URL}/api/cfp`)
 
  return res.json()
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
		case 'grid-center':
			return (
				<div
					key={`${type}-${idx}`}
					className="grid grid-cols-1 items-center lg:grid-cols-3 gap-2 lg:gap-5 mb-1 last:mb-0"
					style={{ marginLeft: (indentLevel - 1) * 24 }}
				>
					{content?.map(_content => renderHTML(_content.type, _content.content, _content.level))}
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
								height={150}
								className=""
							/>
						) : (
							renderHTML(_content.type, _content.content, _content.level)
						)
					)}
				</div>
			);
		case 'image-platinum':
			return (
				<div key={`${type}-${idx}`} style={{ marginLeft: (indentLevel - 1) * 24 }}>
					{content?.map(_content =>
						typeof _content === 'string' ? (
							<Image
								key={_content}
								src={"" + _content}
								alt={_content}
								width={250}
								height={250}
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

const Cfp = async () => {
  // const content = await fetchContent();

  // return (
  //   <div className={classnames(styles.backgroundAlt)}>
  //     <NavBar />
      
  //     <div className="container mx-auto px-6 md:px-8 py-8 md:py-24 lg:py-36 relative z-20" id="cfp">
  //       {/* 參與號召 Call For Participation */}
	// 			<section className="mb-14 md:mb-28" id="submission">
	// 				<SectionTitle titleZh="參與號召" titleEn="Call For Participation" />
	// 				<div
	// 					className={classnames(
	// 						styles.blockBackdrop,
	// 						'relative w-100 flex flex-col p-8 sm:px-12 sm:py-16 lg:px-20 lg:py-24 mb-8 md:mb-16 gap-4 md:gap-12'
	// 					)}
  //           id="deadlines"
	// 				>
	// 					<BlockTitle titleZh="截稿日期" titleEn="Deadlines" />
	// 					<ul className="flex flex-col md:flex-row gap-4 md:gap-0 mt-7 md:mt-16 justify-around">
	// 						<li className="text-left list-disc md:list-none ml-4 md:ml-0">
	// 							<h2
	// 								className={classnames(
	// 									notoSansTC.className,
	// 									'text-white text-sm md:text-[32px] mb-4 md:mb-8'
	// 								)}
	// 							>
	// 								<a href="#Papers">
	// 									論文 <span className={aldrich.className}>Papers</span>
	// 								</a>
	// 							</h2>
	// 							<h2
	// 								className={classnames(
	// 									aldrich.className,
	// 									'text-white font-normal text-base md:text-3xl xl:text-[40px] mb-4 flex items-center'
	// 								)}
	// 							>
	// 								2023/6/18{' '}
	// 								<span className="md:hidden text-xs leading-8 ml-4 mb-0.5">( 23:59 GMT+8 )</span>
	// 							</h2>
	// 							<h6
	// 								className={classnames(
	// 									aldrich.className,
	// 									'hidden md:block text-white text-sm md:text-[18px] font-normal'
	// 								)}
	// 							>
	// 								23:59 GMT+8
	// 							</h6>
	// 						</li>
	// 						<li className="text-left list-disc md:list-none ml-4 md:ml-0">
	// 							<h2
	// 								className={classnames(
	// 									notoSansTC.className,
	// 									'text-white text-sm md:text-[32px] mb-4 md:mb-8'
	// 								)}
	// 							>
	// 								<a href="#Posters">
	// 									海報 <span className={aldrich.className}>Posters</span>
	// 								</a>
	// 							</h2>
	// 							<h2
	// 								className={classnames(
	// 									aldrich.className,
	// 									'text-white font-normal text-base md:text-3xl xl:text-[40px] mb-4 flex items-center'
	// 								)}
	// 							>
	// 								2023/6/23
	// 								<span className="md:hidden text-xs leading-8 ml-4 mb-0.5">( 23:59 GMT+8 )</span>
	// 							</h2>
	// 							<h6
	// 								className={classnames(
	// 									aldrich.className,
	// 									'hidden md:block text-white text-sm md:text-[18px] font-normal'
	// 								)}
	// 							>
	// 								23:59 GMT+8
	// 							</h6>
	// 						</li>
	// 						<li className="text-left list-disc md:list-none ml-4 md:ml-0">
	// 							<h2
	// 								className={classnames(
	// 									notoSansTC.className,
	// 									'text-white text-sm md:text-[32px] mb-4 md:mb-8'
	// 								)}
	// 							>
	// 								<a href="#Demos">
	// 									展示 <span className={aldrich.className}>Demos</span>
	// 								</a>
	// 							</h2>
	// 							<h2
	// 								className={classnames(
	// 									aldrich.className,
	// 									'text-white font-normal text-base md:text-3xl xl:text-[40px] mb-4 flex items-center'
	// 								)}
	// 							>
	// 								2023/6/23
	// 								<span className="md:hidden text-xs leading-8 ml-4 mb-0.5">( 23:59 GMT+8 )</span>
	// 							</h2>
	// 							<h6
	// 								className={classnames(
	// 									aldrich.className,
	// 									'hidden md:block text-white text-sm md:text-[18px] font-normal'
	// 								)}
	// 							>
	// 								23:59 GMT+8
	// 							</h6>
	// 						</li>
	// 					</ul>
	// 				</div>
	// 				{content?.slice().map(({ title_zh, title_en, blocks }) => (
	// 					<div
	// 						key={title_en}
	// 						className={classnames(
	// 							styles.blockBackdrop,
	// 							'relative w-100 flex flex-col p-8 sm:px-12 sm:py-16 lg:px-20 lg:py-24 mb-8 md:mb-16 gap-4 md:gap-12'
	// 						)}
  //             id={title_en.toLowerCase()}
	// 					>
	// 						<BlockTitle titleZh={title_zh} titleEn={title_en} />
	// 						<div className="flex flex-col gap-8 md:gap-24">
	// 							{blocks?.map(({ type, content, level }, idx) => renderHTML(type, content, level, idx))}
	// 						</div>
	// 					</div>
	// 				))}
	// 			</section>

  //       <Footer />
  //     </div>
  //   </div>
  // )

	return (<div>a</div>)
}

export default Cfp