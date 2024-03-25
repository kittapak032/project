const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const run = async () => {
  const password = bcrypt.hashSync('123456');

  const userData = [
    { username: 'andy', password, email: 'andy@gmail', address: '123 Main St' },
    { username: 'bobby', password, email: 'bobby@gmail', address: '456 Elm St' },
    { username: 'candy', password, email: 'candy@gmail', address: '789 Oak St' }
  ];

  const todoData = [
    { title: 'Learn HTML', dueDate: new Date(), userId: 1 },
    { title: 'Learn CSS', dueDate: new Date(), userId: 1 },
    { title: 'Learn JS', dueDate: new Date(), userId: 2 },
    { title: 'Learn React', dueDate: new Date(), userId: 3 }
  ];

  try {
    await prisma.user.createMany({
      data: userData
    });
    await prisma.todo.createMany({
      data: todoData
    });
    console.log('Data successfully inserted.');
  } catch (error) {
    console.error('Error inserting data:', error);
  } finally {
    await prisma.$disconnect();
  }
};

run();
