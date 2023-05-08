import Link from 'next/link';

const Header = () => {
	return (
		<div className="flex items-center justify-between px-24 fixed top-0 left-0 right-0 border-b-2 h-32 bg-black z-10">
			<Link href="/">
				<h1 className="text-4xl text-white">TAICHI LOGO</h1>
			</Link>
			<nav>
				<Link href="/submission" className="text-white">
					Submission
				</Link>
			</nav>
		</div>
	);
};

export default Header;
