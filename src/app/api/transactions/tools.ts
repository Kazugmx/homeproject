import type { PrismaClient } from "@prisma/client";

export const SearchTransactions = async (search: string,prisma:PrismaClient) => {
	return await prisma.transaction.findMany({
		where: {
			OR: [
				{
					description: {
						contains: search,
					},
				},
				{
					category: {
						contains: search,
					},
				},
			],
		},
	});
};