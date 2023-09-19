import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/atoms/Button';
import classnames from 'classnames';
import { Noto_Sans_TC, Nunito_Sans, Aldrich } from 'next/font/google';

import NavBar from '@/components/organisms/NavBar';
import SectionTitle from '@/components/molecules/SectionTitle';
import BlockTitle from '@/components/molecules/BlockTitle';
import Carousel from '@/components/organisms/Carousel';
import Select from '@/components/organisms/Select';
import Footer from '@/components/organisms/Footer';
import Gallery from '@/components/organisms/Gallery';

import logo from '../public/logo_hero.png';
import cube from '../public/tai_cube.png';
import styles from './styles.module.scss';
import Threejs from './components/organisms/Motion';

const agendaItemsList = [
	{
		name: "Day 1",
		id: "/ Day 1 /"
	},
	{
		name: "Day 2",
		id: "/ Day 2 /"
	},
]

export const metadata = {
	title: 'TAICHI 2023',
	description: 'TAICHI 2023',
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

async function fetchContent() {
	const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_FETCH_URL}/api/home`)

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
    case 'bold':
			return (
				<div key={`${type}-${idx}`} style={{ marginLeft: (indentLevel - 1) * 24 }}>
					{content?.map(_content =>
						typeof _content === 'string' ? (
							<p
								key={_content}
								dangerouslySetInnerHTML={{ __html: _content }}
								className="text-xs md:text-lg text-white leading-looser font-bold tracking-widest"
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
					className="flex flex-col md:flex-row md:justify-start md:gap-8 lg:gap-12 xl:gap-16"
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
		case 'grid-center':
			return (
				<div
					key={`${type}-${idx}`}
					className="grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-5 mb-1 last:mb-0 items-center"
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
		case 'image-organizer':
			return (
				<div key={`${type}-${idx}`} style={{ marginLeft: (indentLevel - 1) * 24 }}>
					{content?.map(_content =>
						typeof _content === 'string' ? (
							<Image
								key={_content}
								src={"" + _content}
								alt={_content}
								width={471}
								height={102}
								className=""
							/>
						) : (
							renderHTML(_content.type, _content.content, _content.level)
						)
					)}
				</div>
			);
    case 'name':
      return (
        <div
          key={`${type}-${idx}`}
          className="flex flex-row md:flex-col gap-4 md:gap-0 items-center md:items-start mt-4"
          style={{ marginLeft: (indentLevel - 1) * 24 }}
        >
					<img src={"/staff/" + content[0].content[0] + ".jpg"} alt={content[0].content} className="w-20 sm:w-40 md:w-48 lg:w-64 rounded-xl md:rounded-3xl" />
					<div className='flex flex-col'>
          {content?.map(_content => 
            typeof _content === 'string' ? (
							<p
								key={_content}
								dangerouslySetInnerHTML={{ __html: _content }}
								className="text-xs md:text-lg text-white leading-looser font-normal tracking-widest"
							/>
						) : (
							<a key={_content} className={classnames(`${content[2] && "underline"}`)} href={content[2]?.content[0]} target="_blank" rel="noreferrer" style={content[2] && {cursor: "pointer"}}>
								{renderHTML(_content.type, _content.content, _content.level)}
							</a>
						)
					)}
					</div>
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
									'text-white font-normal text-base md:text-2xl lg:text-3xl mb-4 tracking-widest'
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
		case 'timeline':
			return (
				<div className="pl-0 md:pl-0 py-0 md:py-16" key={`${type}-${idx}`}>
					<div className={classnames(
						styles.timeline,
						"flex w-full flex-col md:flex-row justify-center md:justify-between")
					}>
						<div className={classnames(styles.timelineMobile, "text-transparent md:hidden")}>.</div>
						{content?.map(_content => renderHTML(_content.type, _content.content, _content.level))}
					</div>
				</div>
			);
		case 'timeline-item':
		return (
			<div className="flex flex-row-reverse md:flex-col md:space-y-4 items-center md:items-center justify-end md:justify-center py-4 md:py-0" key={`${type}-${idx}`}>
				{content?.map(_content => renderHTML(_content.type, _content.content, _content.level))}
			</div>
		);
		case 'timeline-dot':
			return (
				<div className={classnames(styles.timelineDot, "mx-4 md:mx-0 text-transparent text-xs")} key={`${type}-${idx}`}>.</div>
			)
		case 'timeline-date':
			return (
				<div key={`${type}-${idx}`} style={{ marginLeft: (indentLevel - 1) * 24, width: "102px"}}>
					{content?.map(_content =>
						typeof _content === 'string' ? (
							<h2
								key={_content}
								dangerouslySetInnerHTML={{ __html: _content }}
								className={classnames(
									aldrich.className,
									'text-base md:text-2xl font-semibold tracking-widest'
								)}
							/>
						) : (
							renderHTML(_content.type, _content.content, _content.level)
						)
					)}
				</div>
			)
		case 'agenda':
			return (
				<div key={`${type}-${idx}`} className='flex flex-col' style={{ marginLeft: (indentLevel - 1) * 24}}>
					<div className='flex flex-row items-center justify-between w-full pb-8'>
						<Select items={agendaItemsList} />
						<Link href="/agenda">
							<Button variant="outline">詳細議程</Button>
						</Link>
					</div>
					<div id="agenda" className='flex flex-row gap-8 md:gap-16 overflow-x-scroll overflow-y-hidden'>
						{content?.map(_content =>
							typeof _content === 'string' ? (
								<div key={_content}>
									{content?.map(_content => renderHTML(_content.type, _content.content, _content.level))}
								</div>
							) : (
								renderHTML(_content.type, _content.content, _content.level)
							)
						)}
					</div>
				</div>
			)
		case 'agenda-day':
			return (
				<div id={content[0].content[0]} key={`${type}-${idx}`} className='flex flex-col min-w-[274px] md:min-w-[548px] p-6 md:p-8 mb-2 rounded-xl md:rounded-3xl border-white border-[0.5px]' style={{ marginLeft: (indentLevel - 1) * 24 }}>
					{content?.map(_content =>
						typeof _content === 'string' ? (
							<div
								key={_content}
							>
								{content?.map(_content => renderHTML(_content.type, _content.content, _content.level))}
							</div>
						) : (
							renderHTML(_content.type, _content.content, _content.level)
						)
					)}
				</div>
			)
		case 'agenda-day-title':
			return (
				<div key={`${type}-${idx}`} style={{ marginLeft: (indentLevel - 1) * 24}}>
					{content?.map(_content =>
						typeof _content === 'string' ? (
							<p
								key={_content}
								dangerouslySetInnerHTML={{ __html: _content }}
								className="text-xs md:text-lg text-white leading-looser font-bold tracking-widest mb-2"
							/>
						) : (
							renderHTML(_content.type, _content.content, _content.level)
						)
					)}
				</div>
			)
		case 'agenda-day-col':
			return (
				<div key={`${type}-${idx}`} className='' style={{ marginLeft: (indentLevel - 1) * 24 }}>
					{content?.map(_content =>
						typeof _content === 'string' ? (
							<div
								key={_content}
								className='flex flex-row'
							>
								{content?.map(_content => renderHTML(_content.type, _content.content, _content.level))}
							</div>
						) : (
							renderHTML(_content.type, _content.content, _content.level)
						)
					)}
				</div>
			)
		case 'agenda-day-items':
			return (
				<div key={`${type}-${idx}`} className={classnames('flex flex-row mb-1 gap-2 sm:gap-4 md:gap-16')} style={{ marginLeft: (indentLevel - 1) * 24 }}>
					{content?.map(_content =>
						typeof _content === 'string' ? (
							<div
								key={_content}
							>
								{content?.map(_content => renderHTML(_content.type, _content.content, _content.level))}
							</div>
						) : (
							renderHTML(_content.type, _content.content, _content.level)
						)
					)}
				</div>
			)
		case 'agenda-day-item':
			return (
				<div key={`${type}-${idx}`} className='min-w-[100px] md:min-w-[140px]' style={{ marginLeft: (indentLevel - 1) * 24 }}>
					{content?.map(_content =>
						typeof _content === 'string' ? (
							<p
								key={_content}
								dangerouslySetInnerHTML={{ __html: _content }}
								className="text-xs md:text-lg text-white leading-loose"
							/>
						) : (
							renderHTML(_content.type, _content.content, _content.level)
						)
					)}
				</div>
			)
			case 'agenda-day-item-caption':
				return (
					<div key={`${type}-${idx}`} className='min-w-[100px] md:min-w-[140px] my-1' style={{ marginLeft: 24 }}>
						{content?.map(_content =>
							typeof _content === 'string' ? (
								<p
									key={_content}
									dangerouslySetInnerHTML={{ __html: _content }}
									className="text-xs md:text-base text-slate-200"
								/>
							) : (
								renderHTML(_content.type, _content.content, _content.level)
							)
						)}
					</div>
				)
		case 'divider':
			return (
				<hr key={`${type}-${idx}`} className={classnames('solid', styles.divider)} style={{ marginTop: "8px", marginBottom: "8px" }} />
			)
		default:
			return null;
	}
}

const HomePage = async () => {
	const content = await fetchContent();

	return (
		<div className={classnames(styles.background)}>
			<NavBar />

      <div className="w-screen h-full fixed left-0 top-0 z-10">
        <Threejs />
      </div>

			<div className={classnames('flex flex-col items-start py-6 md:py-12 relative z-10')} id="header">
				<div className="container w-screen mx-auto px-6 md:px-8">
					<Image src={logo} alt="logo" className="h-auto w-full md:w-2/3 lg:w-1/2 mt-4 mb-8" />
					<h1 className={classnames(notoSansTC.className, 'text-white text-xl md:text-3xl font-semibold tracking-widest tracking-widest')}>
						第九屆台灣人機互動研討會
					</h1>
					<h3
						className={classnames(
							aldrich.className,
							'text-white text-base md:text-2xl font-semibold mt-4 mb-8 tracking-widest'
						)}
					>
						2023/8/19 - 20 <u><a href="https://goo.gl/maps/gDdEZKBsBKFrowWs5" target="_blank">國立臺灣大學德田館</a></u>
					</h3>
					<div
						className={classnames(
							'flex flex-row space-x-4 mt-20 mb-0 md:mb-4 md:space-x-6 md:items-start w-full justify-center md:justify-start'
						)}
					>
						<Link href="https://taichi2023.kktix.cc/events/6844edd1" target="_blank">
							<Button variant="normal">註冊會議</Button>
						</Link>
						<Link href="https://easychair.org/my/conference?conf=taichi2023" target="_blank">
							<Button variant="outline">論文投稿</Button>
						</Link>
					</div>
				</div>
			</div>

			{/* <Image src={cube} alt="cube" className={classnames(styles.cube, 'h-auto w-1/2 md:w-1/3')} /> */}

			<div className="container mx-auto px-6 md:px-8 py-8 md:py-24 lg:py-36 relative z-20" id="about">
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

				{/* 議程簡介 Simple Agenda */}
				<section className="mb-14 md:mb-28" id="agenda-parent">
					<SectionTitle titleZh="議程簡介" titleEn="Agenda" />
					{content?.slice(1, 2).map(({ title_zh, title_en, blocks }) => (
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

				{/* 活動花絮 Gallery */}
				<section className="mb-14 md:mb-28" id="awards">
					<SectionTitle titleZh="活動花絮" titleEn="Photos" />
					<div className={classnames(styles.carousel, 'flex justify-center items-center m-24')}>
						<Gallery />
					</div>
				</section>

				{/* 獲獎資訊 Awards */}
				<section className="mb-14 md:mb-28" id="awards">
					<SectionTitle titleZh="獲獎資訊" titleEn="Awards" />
					{content?.slice(2, 3).map(({ title_zh, title_en, blocks }) => (
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

				{/* 主辦承辦 Organizers */}
				<section className="mb-14 md:mb-28" id="organizers">
					<SectionTitle titleZh="主辦單位" titleEn="Organizers" />
					{content?.slice(3, 4).map(({ title_zh, title_en, blocks }) => (
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

				{/* 贊助單位 Sponsors */}
				<section className="mb-14 md:mb-28" id="sponsors">
					<SectionTitle titleZh="贊助單位" titleEn="Sponsors" />
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
								<div className='flex flex-row items-center justify-start w-full pb-8'>
									<Link href="/sponsors">
										<Button variant="outline">企業專訪</Button>
									</Link>
								</div>
							</div>
						</div>
					))}
				</section>

				<Footer />
			</div>
		</div>
	);
};

export default HomePage;