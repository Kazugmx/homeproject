import Link from "next/link";

const Header = () => {
	return (
		<header className="bg-black py-5">
			<div className="container mx-auto">
				<h1 className="text-white">Nextjs超初心者入門</h1>
				<ul className="flex ">
					<li className="mr-5 m-3">
						<Link href="/" className="text-white">
							Home
						</Link>
					</li>
					<li className="mr-5 m-3">
						<Link href="/about" className="text-white">
							About
						</Link>
					</li>
					<li className="mr-5 m-3">
						<Link href="/blog" className="text-white">
							Blog
						</Link>
					</li>
				</ul>
			</div>
		</header>
	);
};

export default Header;
