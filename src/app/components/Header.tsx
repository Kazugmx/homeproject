import Link from "next/link";

const Header = () => {
	return (
		<header className="bg-black py-5">
			<div className="container mx-auto">
				<h1 className="text-white">家計簿アプリ</h1>
				<ul className="flex ">
					<li className="mr-5 m-3">
						<Link href="/userpage" className="text-white">
							Userpage
						</Link>
					</li>
					<li className="mr-5 m-3">
						<Link href="/top" className="text-white">
							top
						</Link>
					</li>
				</ul>
			</div>
		</header>
	);
};

export default Header;
