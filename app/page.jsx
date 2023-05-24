import Head from 'next/head';

export const metadata = {
	title: 'Submission | TAICHI 2023',
	description: 'TAICHI Submission Page',
	keywords: '',
	openGraph: {
		title: 'TAICHI 2023',
		description: 'TAICHI 2023（第九屆臺灣人機互動研討會）為臺灣人機互動學會主辦的年度研討會，旨在集結在臺灣進行科技、設計、人因等多元文化、背景、個人特質的研究人員與從業者交流互動。',
		url: 'https://taichi2023.taiwanchi.org',
		siteName: 'TAICHI',
		images: [
			{
				url: 'https://taichi2023.taiwanchi.org/og.png',
				width: 800,
				height: 600,
			},
		],
		type: 'website',
	},
};

const HomePage = () => {
	return (
		<div>
		</div>
	);
};

export default HomePage;
