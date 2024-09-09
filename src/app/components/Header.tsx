import Link from "next/link";

const Header = () => {
	return (
		<header className="bg-black py-5">
			<div className="container mx-auto flex ">
				<h1 className="text-white m-3 text-[20px] ">
					<Link href="/top" className="text-white">
						家計簿アプリ
					</Link>
				</h1>
				<ul className="flex ">
					<li className="mr-5 m-3 outline-offset-2 outline-cyan-700">
						<Link href="/transaction" className="text-white ">
							記録を追加
						</Link>
					</li>
					<li className="m-3 outline-offset-2 outline-cyan-700">
						<Link href="/balance" className="text-white ">
							記録を見る
						</Link>
					</li>
				</ul>
			</div>
		</header>
	);
};

export default Header;
