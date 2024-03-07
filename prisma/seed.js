const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const run = async () => {
  
  const password = bcrypt.hashSync('123456'); 

  
  const userData = [
    { username: 'andy', password, email: 'andy@ggg.mail', address: '123 Main St' },
    { username: 'bobby', password, email: 'bobby@ggg.mail', address: '456 Elm St' },
    { username: 'candy', password, email: 'candy@ggg.mail', address: '789 Oak St' }
  ];

  
  const todoData = [
    { title: 'Learn HTML', dueDate: new Date(), userId: 1 },
    { title: 'Learn CSS', dueDate: new Date(), userId: 1 },
    { title: 'Learn JS', dueDate: new Date(), userId: 2 },
    { title: 'Learn React', dueDate: new Date(), userId: 3 }
  ];

  
  await prisma.user.createMany
  ({ data: userData });
  

};

run();
