const {PrismaClient} =require('@prisma/client')
const prisma = new PrismaClient()

async function run() {
    await prisma.$executeRawUnsafe('DROP Database thebook_02')
    await prisma.$executeRawUnsafe('CREATE Database thebook_02')
}
console.log('Reset DB')
run()