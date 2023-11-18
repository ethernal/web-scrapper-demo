// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	await prisma.user.upsert({
		where: { email: `admin@example.com` },
		create: {
			email: `admin@example.com`,
			firstName: 'Admin',
			lastName: 'Super',
		},
		update: {
			firstName: 'Admin',
			lastName: 'Super',
		},
	});
}

console.log('Seeding the database');
main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
    console.log('Completed seeding the database');
	});
