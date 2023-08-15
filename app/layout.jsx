import { Noto_Sans_TC } from 'next/font/google';

import Providers from '@/components/organisms/Providers';

import './globals.css';

const notoSansTC = Noto_Sans_TC({
	weight: ['400', '700'],
	subsets: ['latin'],
});

export const metadata = {
	title: 'TAICHI 2023',
	description:
		'TAICHI 2023（第九屆臺灣人機互動研討會）為臺灣人機互動學會主辦的年度研討會，旨在集結在臺灣進行科技、設計、人因等多元文化、背景、個人特質的研究人員與從業者交流互動。',
	keywords: '',
	openGraph: {
		title: 'TAICHI 2023',
		description:
			'TAICHI 2023（第九屆臺灣人機互動研討會）為臺灣人機互動學會主辦的年度研討會，旨在集結在臺灣進行科技、設計、人因等多元文化、背景、個人特質的研究人員與從業者交流互動。',
		url: process.env.NEXT_PUBLIC_BASE_FETCH_URL,
		siteName: 'TAICHI 2023',
		images: [
			{
				url: `${process.env.NEXT_PUBLIC_BASE_FETCH_URL}/og.png`,
				width: 1200,
				height: 630,
			},
		],
		type: 'website',
	},
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={notoSansTC.className} suppressHydrationWarning>
				<main className="pt-16 md:pt-20 overflow-hidden">
					<Providers>{children}</Providers>
				</main>
			</body>
		</html>
	);
}
