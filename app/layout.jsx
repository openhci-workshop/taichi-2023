import { Noto_Sans_TC } from 'next/font/google';

import Header from '@/components/organisms/Header';

import './globals.css';

const notoSansTC = Noto_Sans_TC({
	weight: ['400', '700'],
	subsets: ['latin'],
});

export const metadata = {
	title: 'TAICHI 2023',
	description: 'TAICHI Home Page',
	keywords: '',
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={notoSansTC.className}>
				<Header />
				<main className="flex flex-col items-center pt-16">{children}</main>
			</body>
		</html>
	);
}
