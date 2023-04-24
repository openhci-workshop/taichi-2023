import Link from 'next/link';

const Header = () => {
	return (
		<div className="flex items-center justify-between p-8 fixed top-0 left-0 right-0 border-b-2 h-16 bg-white">
			<Link href="/">
				<h1 className="text-4xl">TAICHI LOGO</h1>
			</Link>
			<nav>
				<Link href="/submission">Submission</Link>
			</nav>
		</div>
	);
};

export default Header;
