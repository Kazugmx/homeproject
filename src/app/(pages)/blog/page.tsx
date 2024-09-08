"use client"
import { useSearchParams } from "next/navigation";

const BlogArticlePage = () => {
	const searchParams = useSearchParams();
	const pageNum = searchParams.get("page");
	if (pageNum===null) {
		return (
			<div>
				<p>Page not found</p>
			</div>
		);
	}
	return (
		<div>
			<p>Page: {pageNum}</p>
		</div>
	);
};
export default BlogArticlePage;
