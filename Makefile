update-db:
	npx prisma generate /
	npx prisma db push


format-prisma:
	npx prisma format