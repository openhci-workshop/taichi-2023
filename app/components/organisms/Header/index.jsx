import Link from 'next/link';
import Image from 'next/image';

import Button from '@/components/atoms/Button';

import Logo from '../../../../public/logo.png';

const Header = () => {
	return (
		<div className="flex items-center justify-between px-4 pl-0 fixed top-0 left-0 right-0 h-16 md:h-20 bg-black z-10">
			<Link href="/">
				<Image src={Logo} alt="taichi-logo" className="h-12 md:h-16 w-auto" />
			</Link>
			<nav>
				<Link href="https://easychair.org/my/conference?conf=taichi2023" target="_blank">
					<Button>論文投稿</Button>
				</Link>
			</nav>
		</div>
	);
};

export default Header;
