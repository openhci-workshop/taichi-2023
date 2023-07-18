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
	console.log("start fetching")
	const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_FETCH_URL}/api/submission`, {
		next: {
			revalidate: 60,
		},
	});

	const content = await response.json();
	return content;
	// return backupContent;
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

const backupContent = [
	{
		"title_zh": "",
		"title_en": "",
		"blocks": [
				{
					"type": "p",
					"level": 1,
					"content": [
							"TAICHI 2023（第九屆臺灣人機互動研討會）為臺灣人機互動學會主辦的年度研討會，旨在集結在臺灣進行科技、設計、人因等多元文化、背景、個人特質的研究人員與從業者交流互動。"
					]
				},
				{
					"type": "p",
					"level": 1,
					"content": [
						"本次大會主題為Unity－深化各個在臺灣進行人機互動相關活動的社群－本次TAICHI 2023與學生主辦之年度人機互動工作坊OpenHCI 2023共同籌劃並於同地與<u><a href=\"https://sites.google.com/view/apmar2023/home\" target=\"_blank\">ASMAR</a></u>緊接舉辦。TAICHI 2023主要會議時間將於8月19、20日於臺灣大學校園內舉辦，並且邀請於OpenHCI 2023優異作品至會議展示呈現。"
					]
				}
		]
	},
	{
		"title_zh": "投稿主題",
		"title_en": "Topics",
		"blocks": [
			{
				"type": "ul",
				"level": 1,
				"content": [
					"任何與人機互動有關科技、設計、人因等研究，可參考但不限於下列各議題：",
					"VR, AR MR & XR 虛擬、擴增、混合與延伸實境之設計、發展、應用與研究",
					"Social Computing and Computer Supported Cooperative Work 合作與協作科技在各種社會情境、群體組織中之應用與研究",
					"Understanding People: Theory, Concepts, Methods 探討人在互動情境中的理解與表現",
					"Interaction Techniques and Devices 創新互動技術、科技與裝置",
					"User Experience and Usability 各種使用者族群在不同情境或場域之互動設計",
					"Interaction Using Specific Capabilities and Modalities 創新互動形式",
					"Technology, System, and Engineering 創新互動系統科技",
					"Specific Application Areas 特定應用領域（如教育、健康、家居、無障礙、 永續性、數位落差、安全與隱私等）",
					"Alternative CHI 新型態人機互動",
					"Design 互動產品、服務或系統設計",
					"Games and Play 互動遊戲研究"
				]
			}
		]
	},
	{
		"title_zh": "論文",
		"title_en": "Papers",
		"blocks": [
			{
				"type": "p",
				"level": 1,
				"content": [
					"論文為呈現完整且尚未公開發表之新研究成果的主要媒介。受錄取的論文將被排入研討會發表議程。",
					"論文投稿相關問題請洽 <u><a href=\"mailto:paper2023@taiwanchi.org\">paper2023@taiwanchi.org</a></u>"
				]
			},
			{
				"type": "h3",
				"level": 1,
				"content": [
					"/ 日程 /",
					{
						"type": "row",
						"level": 1,
						"content": [
							{
								"type": "p",
								"level": 1,
								"content": ["截稿日", { "type": "date", "level": 1, "content": ["2023/6/18"] }]
							},
							{
								"type": "p",
								"level": 1,
								"content": ["結果通知", { "type": "date", "level": 1, "content": ["2023/7/13"] }]
							},
							{
								"type": "p",
								"level": 1,
								"content": ["完稿日", { "type": "date", "level": 1, "content": ["2023/7/26"] }]
							}
						]
					}
				]
			},
			{
				"type": "h3",
				"level": 1,
				"content": [
					"/ 投稿格式 /",
					{
						"type": "ul",
						"level": 1,
						"content": [
							"中英文論文投稿均可，所有投稿需依循 ACM SIGCHI 之雙欄寫 paper 格式或採用 DIS 的 pictorial 格式。論文投稿格式範本請至 ACM CHI/UIST/DIS 官方網站下載 <u><a href=\"https://uist.acm.org/2023/cfp/#papers\">Sumbission Formats (paper格式)</a></u>。",
							"論文投稿格式範本如下：",
							{
								"type": "ul",
								"level": 1,
								"content": [
									"Paper 格式（請參考 <u><a href=\"https://uist.acm.org/2023/cfp/#papers\">UIST 2023投稿說明</a></u>）： <u><a href=\"https://portalparts.acm.org/hippo/latex_templates/acmart-primary.zip\">Latex</a></u>, <u><a href=\"https://www.overleaf.com/latex/templates/acm-conference-proceedings-primary-article-template/wbvnghjbzwpc\">Overleaf</a></u> (請用latex標籤: \\documentclass[sigconf,review,anonymous]{acmart}), <u><a href=\"https://uist.acm.org/2023/assets/files/word-two-column-submission-sample.docx\">Word</a></u>",
									"Pictorial 格式（請參考 <u><a href=\"https://dis.acm.org/2023/call-for-papers-and-pictorials/\">DIS 2023投稿說明與論文範本</a></u>）: ",
									{
										"type": "ul",
										"level": 1,
										"content": [
											"<u><a href=\"https://dis.acm.org/2023/wp-content/uploads/2022/11/DIS2023-Pictorials-InDesign-template_Folder.zip\">InDesign</a></u>",
											"<u><a href=\"https://dis.acm.org/2023/wp-content/uploads/2022/11/DIS2023-Pictorials-Word-template-Folder.zip\">Word</a></u>",
											"<u><a href=\"https://dis.acm.org/2023/wp-content/uploads/2022/11/DIS2023-Pictorials-PowerPoint-template-Folder.zip\">Powerpoint</a></u>"
										]
									}
								]
							},
							"全文論文採雙向匿名 (Double-blind) 審查，請上傳匿名後之PDF檔案，論文PDF檔案含附件須小於20MB。",
							"論文頁數以<b>四～八頁為原則</b>（不含參考文獻）。",
							"中文論文字體請使用標楷體，與英文論文相同，均須依循ACM SIGCHI格式規範。",
							"在稿件投稿時，作者可選擇是否願意將受錄取的論文收錄於<b>正式出版 ACM TAICHI 2023 Proceedings</b>。作者亦可選擇將受錄取的論文摘要或全文收錄於非正式出版的 TAICHI 線上論文集。"
						]
					}
				]
			},
			{
				"type": "p",
				"level": 1,
				"content": [
					"在結果通知後，若願意被收錄於 ACM TAICHI 2023 Proceedings 的錄取論文數量足夠多，會另行通知作者將所錄取的論文轉為適合的格式（必須為英文），以收錄在正式出版的 ACM TAICHI 2023 Proceedings。"
				]
			}
		]
	},
	{
		"title_zh": "海報",
		"title_en": "Posters",
		"blocks": [
			{
				"type": "p",
				"level": 1,
				"content": [
					"海報提供作者與研討會參與者直接互動討論正在進行或已在其他研討會發表的研究。受錄取的海報可在研討會海報時段呈現。",
					"海報投稿相關問題請洽 <u><a href=\"mailto:poster2023@taiwanchi.org\">poster2023@taiwanchi.org</a></u>"
				]
			},
			{
				"type": "h3",
				"level": 1,
				"content": [
					"/ 日程 /",
					{
						"type": "row",
						"level": 1,
						"content": [
							{
								"type": "p",
								"level": 1,
								"content": ["截稿日", { "type": "date", "level": 1, "content": ["2023/6/23"] }]
							},
							{
								"type": "p",
								"level": 1,
								"content": ["結果通知", { "type": "date", "level": 1, "content": ["2023/7/14"] }]
							},
							{
								"type": "p",
								"level": 1,
								"content": ["完稿日", { "type": "date", "level": 1, "content": ["2023/7/28"] }]
							}
						]
					}
				]
			},
			{
				"type": "h3",
				"level": 1,
				"content": [
					"/ 投稿格式 /",
					{
						"type": "ul",
						"level": 1,
						"content": [
							"投稿需依循 ACM SIGCHI Publication Format (雙欄)之格式撰寫。檔案必須為 PDF 檔，<b>不需匿名</b>。",
							"標準格式請至 ACM SIGCHI 官方網站下載 <u><a href=\"https://chi2022.acm.org/for-authors/presenting/papers/chi-publication-formats/\">CHI Publication Formats</a></u>。",
							"投稿格式範本如下：<u><a href=\"https://portalparts.acm.org/hippo/latex_templates/acmart-primary.zip\">Latex</a></u>, <u><a href=\"https://www.overleaf.com/latex/templates/acm-conference-proceedings-primary-article-template/wbvnghjbzwpc\">Overleaf</a></u>, <u><a href=\"https://uist.acm.org/2023/assets/files/word-two-column-submission-sample.docx\">Word</a></u>",
							"總頁數<b>至多三頁</b>（不含參考文獻）。",
							"內容中英文皆可，中文字體請使用標楷體。",
							"論文內容必須包含摘要、研究動機、目的、方法、目前成果、以及未來研究規劃。",
							"論文標題需以<b>「 Poster: 」</b>為開頭。",
							"海報稿件只需上傳論文，海報檔案將於確定被接受後上傳。",
							"所有海報將列入海報論文獎審查，得獎者由會議參與者匿名投票選出。",
							"稿件被接受後，作者可選擇將摘要或全文收錄於<b>非正式出版的 TAICHI 線上論文集</b>。"
						]
					}
				]
			}
		]
	},
	{
		"title_zh": "展示",
		"title_en": "Demos",
		"blocks": [
			{
				"type": "p",
				"level": 1,
				"content": [
					"直接於研討會上展現互動概念、手法、裝置或是系統的實作成果。受錄取的展示可在展示時段於研討會場中擺設攤位呈現。",
					"海報投稿相關問題請洽 <u><a href=\"mailto:demo2023@taiwanchi.org\">demo2023@taiwanchi.org</a></u>"
				]
			},
			{
				"type": "h3",
				"level": 1,
				"content": [
					"/ 日程 /",
					{
						"type": "row",
						"level": 1,
						"content": [
							{
								"type": "p",
								"level": 1,
								"content": ["截稿日", { "type": "date", "level": 1, "content": ["2023/6/23"] }]
							},
							{
								"type": "p",
								"level": 1,
								"content": ["結果通知", { "type": "date", "level": 1, "content": ["2023/7/14"] }]
							},
							{
								"type": "p",
								"level": 1,
								"content": ["完稿日", { "type": "date", "level": 1, "content": ["2023/7/28"] }]
							}
						]
					}
				]
			},
			{
				"type": "h3",
				"level": 1,
				"content": [
					"/ 投稿格式 /",
					{
						"type": "ul",
						"level": 1,
						"content": [
							"投稿需依循 ACM SIGCHI Extended Abstract 之格式撰寫。檔案必須為 PDF 檔，<b>不需匿名</b>。標準格式請至 ACM SIGCHI 官方網站下載 <u><a href=\"https://chi2022.acm.org/for-authors/presenting/papers/chi-publication-formats/\">CHI Publication Formats</a></u>。",
							"投稿格式範本如下：<u><a href=\"https://portalparts.acm.org/hippo/latex_templates/acmart-primary.zip\">Latex</a></u>, <u><a href=\"https://www.overleaf.com/latex/templates/acm-conference-proceedings-primary-article-template/wbvnghjbzwpc\">Overleaf</a></u>, <u><a href=\"https://uist.acm.org/2023/assets/files/word-two-column-submission-sample.docx\">Word</a></u>",
							"總頁數<b>至多三頁</b> (不含參考文獻與場地需求申請表) 。內容中英文皆可，中文字體請使用標楷體。",
							"內容必須包含摘要、研究動機、目的、方法、目前成果、以及未來研究規劃。",
							"論文標題需以<b>「 Demo: 」</b>為開頭。 若該論文同時為Poster，論文標題開頭請為: <b>「 Poster & Demo: 」</b>。",
							"鼓勵上傳影片以便衡量系統的互動性以及完整程度。上傳影片前請先以<u><a href=\"https://handbrake.fr/\">HandBrake</a></u>進行壓縮，並輸出成 H.264 之 .mp4 檔案。",
							"展示稿件在參考文獻後面須再附上一份「<u><a href=\"https://www.dropbox.com/s/4nwwza7sudz36jq/TAICHI2023%20%20Demo%20Requirements.docx?dl=0\">場地需求申請表</a></u>」，展示主席將依此提供協助。",
							"所有系統展示將列入系統展示論文獎審查，得獎者由會議參與者匿名投票選出。",
							"稿件被接受後，作者可選擇將摘要或全文收錄於<b>非正式出版的 TAICHI 線上論文集</b>。",
							"屆時請於會議展示時段前完成攤位佈置。"
						]
					}
				]
			}
		]
	},
	{
		"title_zh": "",
		"title_en": "",
		"blocks": [
			{
				"type": "p",
				"level": 1,
				"content": [
					"請點選<u><a href=\"https://taichi2023.kktix.cc/events/6844edd1\">本連結</a></u>前往 KKTIX 報名",
					"為提供學校、實驗室、機構中心或公司行號等單位進行團體報名 (無折扣優惠)，團體報名可填寫<u><a href=\"https://forms.gle/W8nT3ZdMLGETdhWh7\">本表單</u>，團體報名至 2023/8/12 截止"
				]
			}
		]
	},
	{
		"title_zh": "學生志工",
		"title_en": "Student Volunteers",
		"blocks": [
			{
				"type": "p",
				"level": 1,
				"content": [
					"我們自即日起開始招募學生志工 (Student Volunteers) 參與，以協助研討會的各項事宜。如果你對人機互動的議題充滿熱情，歡迎你加入我們的行列，讓我們一起在研討會的規劃與執行中學習、成長，認識更多人機互動領域的新朋友，並且獲得人機互動議題的新知識。",
					"學生志工相關問題請洽 <u><a href=\"mailto:xxx@taiwanchi.org\">sv2023@taiwanchi.org</a></u>"
				]
			},
			{
				"type": "h3",
				"level": 1,
				"content": [
					"/ 日程 /",
					{
						"type": "row",
						"level": 1,
						"content": [
							{
								"type": "p",
								"level": 1,
								"content": ["招募截止", { "type": "date", "level": 1, "content": ["2023/7/30"] }]
							},
							{
								"type": "p",
								"level": 1,
								"content": ["結果通知", { "type": "date", "level": 1, "content": ["2023/8/1"] }]
							},
							{
								"type": "p",
								"level": 1,
								"content": ["行前會議", { "type": "date", "level": 1, "content": ["2023/8/16"] }]
							}
						]
					}
				]
			},
			{
				"type": "h3",
				"level": 1,
				"content": [
					"/ 應徵辦法 /",
					{
						"type": "ul",
						"level": 1,
						"content": [
							"大專院校在學學生",
							"<u><a href=\"https://forms.gle/TCf7SA5f1WmSNzXPA\">立即應徵</a></u>",
							"上傳最多 2 頁個人履歷與學生證或在學證明至上述報名表作為審核",
							"應徵自即日起至 2023/7/30 截止",
							"預計招募 30 名學生志工",
							"結果為隨機抽籤，OPENHCI 2023 幹部或學員有優先順位"
						]
					}
				]
			},
			{
				"type": "h3",
				"level": 1,
				"content": [
					"/ 工作內容 /",
					{
						"type": "ul",
						"level": 1,
						"content": [
							"協助會議期間與會來賓報到、導引與資料發放",
							"協助會議期間報告流程",
							"協助會議前與會議期間會議場所物流與佈置",
							"協助其他機動事項"
						]
					}
				]
			},
			{
				"type": "h3",
				"level": 1,
				"content": [
					"/ 行前會議 /",
					{
						"type": "ul",
						"level": 1,
						"content": [
							"每一位學生志工皆須參加行前會議，以了解研討會活動進行的流程與規劃。",
							"時間：2023/8/16 14:00 - 17:00",
							"地點：<u><a href=\"https://goo.gl/maps/sgfdAami4a7KjcjAA\">國立台灣大學德田館大廳</a></u>"
						]
					}
				]
			},
			{
				"type": "h3",
				"level": 1,
				"content": [
					"/ 注意事項 /",
					{
						"type": "ul",
						"level": 1,
						"content": [
							"學生志工們能免費參與研討會所有舉辦之活動 (包含約一千元的晚宴)",
							"學生志工之需自理住宿事宜",
							"若學生志工已買票註冊會議，將在行前會議中辦理退費",
							"招募結果將於 2023/8/1 透過電子郵件通知"
						]
					}
				]
			}
		]
	},
	{
		"title_zh": "",
		"title_en": "",
		"blocks": [
			{
				"type": "h5",
				"level": 1,
				"content": [
					{
						"type": "h4",
						"level": 1,
						"content": ["會議主席 <span>General Chairs</span>"]
					},
					"<u><a href=\"https://www.lungpancheng.tw/\">鄭龍磻</a></u> (國立臺灣大學資訊工程學系)",
					"畢南怡 (國立臺灣大學資訊管理學系)",
					"詹力韋 (國立陽明交通大學資訊工程學系)"
				]
			},
			{
				"type": "h5",
				"level": 1,
				"content": [
					{ "type": "h4", "level": 1, "content": ["論文主席 <span>Paper Chairs</span>"] },
					"游創文 (國立清華大學科技藝術研究所)",
					"蔡欣叡 (國立政治大學資訊科學系)",
					"韓秉軒 (國立臺北科技大學互動設計系)",
					"蔡文傑 (國立臺灣大學創新設計學院)"
				]
			},
			{
				"type": "h5",
				"level": 1,
				"content": [
					{ "type": "h4", "level": 1, "content": ["海報主席 <span>Poster Chairs</span>"] },
					"張永儒 (國立陽明交通大學資訊工程學系)",
					"程芙茵 (國立中正大學資訊工程學系)",
					"林怡伶 (國立政治大學資訊管理學系)",
					"彭志宏 (國立臺灣大學資訊管理學系)"
				]
			},
			{
				"type": "h5",
				"level": 1,
				"content": [
					{ "type": "h4", "level": 1, "content": ["展示主席 <span>Demo Chairs</span>"] },
					"洪靖雯 (國立台灣大學資訊網路與多媒體研究所)",
					"王秋玄 (國立陽明交通大學資訊工程學系)"
				]
			},
			{
				"type": "h5",
				"level": 1,
				"content": [
					{ "type": "h4", "level": 1, "content": ["出版主席 <span>Publication Chairs</span>"] },
					"王浩全 (美國加州大學戴維斯分校資訊工程學系)",
					"陳盈羽 (國立陽明交通大學傳播與科技學系)"
				]
			},
			{
				"type": "h5",
				"level": 1,
				"content": [
					{ "type": "h4", "level": 1, "content": ["贊助主席 <span>Sponsor Chair</span>"] },
					"陳書儀 (銘傳大學資訊管理學系)"
				]
			},
			{
				"type": "h5",
				"level": 1,
				"content": [
					{ "type": "h4", "level": 1, "content": ["宣傳主席 <span>Publicity Chair</span>"] },
					"侯宗佑 (美國康乃爾大學資訊科學系)"
				]
			},
			{
				"type": "h5",
				"level": 1,
				"content": [{ "type": "h4", "level": 1, "content": ["網路主席 <span>Web Chair</span>"] }, "<u><a href=\"https://www.2023.openhci.com/#組織成員\">OpenHCI 2023 網管部</a></u>"]
			},
			{
				"type": "h5",
				"level": 1,
				"content": [
					{ "type": "h4", "level": 1, "content": ["學生志願者主席 <span>Student Volunteer Chair</span>"] },
					"孫振國 (國立臺灣大學資訊工程學系)"
				]
			}
		]
	},
	{
		"title_zh": "",
		"title_en": "",
		"blocks": [
			{
				"type": "h5",
				"level": 1,
				"content": [
					{
						"type": "h4",
						"level": 1,
						"content": ["金級贊助單位"]
					},
					{
						"type": "grid",
						"level": 1,
						"content": [
							{
								"type": "image",
								"level": 1,
								"content": ["/sponsors/gold_optoma.png"],
								"dimension": {
									"width": 190,
									"height": 100
								}
							}
						]
					}
				]
			},
			{
				"type": "h5",
				"level": 1,
				"content": [
					{
						"type": "h4",
						"level": 1,
						"content": ["銀級贊助單位"]
					},
					{
						"type": "grid",
						"level": 1,
						"content": [
							{
								"type": "image",
								"level": 1,
								"content": ["/sponsors/silver_23Design.png"],
								"dimension": {
									"width": 250,
									"height": 250
								}
							},
							{
								"type": "image",
								"level": 1,
								"content": ["/sponsors/silver_AJA.jpg"],
								"dimension": {
									"width": 146,
									"height": 100
								}
							},
							{
								"type": "image",
								"level": 1,
								"content": ["/sponsors/silver_NCCU.png"],
								"dimension": {
									"width": 159,
									"height": 100
								}
							},
							{
								"type": "image",
								"level": 1,
								"content": ["/sponsors/silver_NTU.jpg"],
								"dimension": {
									"width": 346,
									"height": 100
								}
							}
						]
					}
				]
			}
		]
	}
]

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
				<section className="mb-14 md:mb-28" id="registration">
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
				</section>

				{/* 議程 Agenda */}

				{/* 獲獎資訊 Award */}

				{/* 學生志工 SV */}
				<section className="mb-14 md:mb-28" id="sv">
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
				</section>

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
