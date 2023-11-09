import mongoose from 'mongoose';
import config from './config';
import User from './models/User';
import * as crypto from 'crypto';
import Category from './models/Category';
import Product from './models/Product';
import Transaction from './models/Transaction';

const run = async () => {
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection('users');
    await db.dropCollection('categories');
    await db.dropCollection('products');
    await db.dropCollection('transactions');
  } catch (e) {
    console.log('Collection were not present');
  }

  const [user1, user2] = await User.create(
    {
      email: 'sam@gmail.com',
      password: 'user',
      token: crypto.randomUUID(),
      role: 'user',
      displayName: 'Sam Smith ',
      phone: '0772 77-22-77',
    },
    {
      email: 'oleg@gmail.com',
      password: 'oleg',
      token: crypto.randomUUID(),
      role: 'user',
      displayName: 'Oleg Mongol ',
      phone: '0552 82-78-76',
    },
    {
      email: 'admin@gmail.com',
      password: 'admin',
      token: crypto.randomUUID(),
      role: 'admin',
      displayName: 'Administrator',
      phone: '0555 55-55-55',
    },
  );

  const [honey, herbs, driedFruits] = await Category.create(
    {
      title: 'Мёд',
      description:
        'Мед - это натуральное сладкое вещество, производимое пчелами из цветочного нектара. Он имеет густую консистенцию с характерным золотистым цветом и сладким, цветочным вкусом.',
    },
    {
      title: 'Лечебные травы',
      description:
        'Лечебные травы - это растения, которые используются в медицинских целях из-за своих полезных свойств и потенциальных лечебных свойств. Они часто применяются в традиционной медицине для облегчения различных здоровотворных проблем, таких как пищеварительные расстройства, воспаления, улучшение иммунитета и снятие стресса.',
    },
    {
      title: 'Сухофрукты',
      description:
        'Сухофрукты - это фрукты, прошедшие процесс сушки, в результате которого они теряют большую часть влаги, но сохраняют свои питательные свойства. Среди популярных сухофруктов можно найти изюм, чернослив, финики, инжир, абрикосы и другие. ',
    },
  );

  const [
    honey1,
    honey2,
    honey3,
    honey4,
    herbs1,
    herbs2,
    herbs3,
    herbs4,
    driedFruits1,
    driedFruits2,
    driedFruits3,
    driedFruits4,
  ] = await Product.create(
    {
      title: 'Связистый мед',
      description:
        'Связистый мед обладает богатым ароматом и глубоким, насыщенным вкусом. Он собирается из цветущих растений на лугах и полях.',
      category: honey._id,
      price: 300,
      amount: 20,
      image: 'fixtures/honey.svg',
    },
    {
      title: 'Акациевый мед:',
      description:
        ' Акациевый мед обладает нежным, сладким вкусом и прозрачной текстурой. Он производится из нектара цветущего дерева акации.',
      category: honey._id,
      price: 500,
      amount: 20,
      image: 'fixtures/honey.svg',
    },
    {
      title: 'Гречишный мед',
      description:
        'Гречишный мед имеет интенсивный аромат и темно-коричневый цвет. Он производится из цветов гречихи и обладает богатым вкусом с нотами карамели.',
      category: honey._id,
      price: 400,
      amount: 20,
      image: 'fixtures/White-honey.svg',
    },
    {
      title: 'Липовый мед',
      description:
        'Липовый мед обладает светлым оттенком и нежным, цветочным ароматом. Он собирается из цветов липы и обладает мягким, сладким вкусом.',
      category: honey._id,
      price: 300,
      amount: 20,
      image: 'fixtures/White-honey.svg',
    },
    {
      title: 'Травяной сбор для иммунитета',
      description:
        ' Этот сбор трав содержит эхинацею, шиповник и зверобой, которые способствуют укреплению иммунной системы и повышению ее защитных функций.',
      category: herbs._id,
      price: 200,
      amount: 20,
      image: 'fixtures/herbs.svg',
    },
    {
      title: 'Сбор трав для пищеварения',
      description:
        'Этот сбор включает мяту, ромашку и фенхель, которые помогают улучшить пищеварение, снизить вздутие и уменьшить дискомфорт в желудке.',
      category: herbs._id,
      price: 200,
      amount: 20,
      image: 'fixtures/herbs.svg',
    },
    {
      title: 'Березовый сбор для очищения',
      description:
        'Этот сбор содержит березовые почки, крапиву и зверобой, которые помогают очистить организм от токсинов, улучшить функцию почек и стимулировать мочеотделение.',
      category: herbs._id,
      price: 300,
      amount: 20,
      image: 'fixtures/herbs.svg',
    },
    {
      title: 'Сбор трав для успокоения нервной системы',
      description:
        'Этот сбор включает валериану, пустырник и мелиссу, которые помогают снять напряжение, улучшить сон и смягчить нервное возбуждение.',
      category: herbs._id,
      price: 300,
      amount: 20,
      image: 'fixtures/herbs.svg',
    },
    {
      title: 'Фруктовый микс "Энергия"',
      description:
        ' Этот сбор содержит смесь из чернослива, изюма, фиников и кураги, обогащенных витаминами и минералами, которые придают энергию и восстанавливают силы.',
      category: driedFruits._id,
      price: 300,
      amount: 20,
      image: 'fixtures/driedFruits.svg',
    },
    {
      title: 'Сухофруктовый набор "Витамины"',
      description:
        ' Этот набор включает в себя смесь из изюма, чернослива, кураги и вишни, богатых витаминами и антиоксидантами, которые способствуют поддержанию здоровья и укреплению иммунитета.',
      category: driedFruits._id,
      price: 350,
      amount: 20,
      image: 'fixtures/driedFruits.svg',
    },
    {
      title: 'Тропический микс "Экзотика"',
      description:
        'Этот микс содержит смесь из сушеного ананаса, манго, банана и кокоса, создавая экзотический вкус и богатство питательных веществ тропических фруктов.',
      category: driedFruits._id,
      price: 400,
      amount: 20,
      image: 'fixtures/driedFruits.svg',
    },
    {
      title: 'Ягодный сбор "Здоровье"',
      description:
        'Этот сбор включает в себя смесь из сушеных черники, малины, клюквы и красной смородины, обогащенных антиоксидантами, способствующими укреплению иммунной системы и поддержанию здоровья.',
      category: driedFruits._id,
      price: 300,
      amount: 20,
      image: 'fixtures/driedFruits.svg',
    },
  );

  await Transaction.create(
    {
      user: user1._id,
      kits: [
        {
          product: honey1._id,
          amount: 1,
          price: honey1.price,
        },
        {
          product: honey2._id,
          amount: 1,
          price: honey2.price,
        },
        {
          product: driedFruits1._id,
          amount: 1,
          price: driedFruits1.price,
        },
      ],
      totalPrice: 1100,
    },
    {
      user: user1._id,
      kits: [
        {
          product: herbs3._id,
          amount: 1,
          price: herbs3.price,
        },
        {
          product: honey2._id,
          amount: 1,
          price: honey2.price,
        },
        {
          product: driedFruits3._id,
          amount: 1,
          price: driedFruits3.price,
        },
      ],
      totalPrice: 1200,
    },
    {
      user: user1._id,
      kits: [
        {
          product: honey4._id,
          amount: 3,
          price: honey4.price,
        },
      ],
      totalPrice: 900,
    },
    {
      user: user2._id,
      kits: [
        {
          product: honey4._id,
          amount: 1,
          price: honey4.price,
        },
        {
          product: driedFruits2._id,
          amount: 1,
          price: driedFruits2.price,
        },
        {
          product: herbs3._id,
          amount: 1,
          price: herbs3.price,
        },
      ],
      totalPrice: 950,
    },
    {
      user: user2._id,
      kits: [
        {
          product: honey1._id,
          amount: 2,
          price: honey1.price,
        },
        {
          product: driedFruits3._id,
          amount: 2,
          price: driedFruits3.price,
        },
      ],
      totalPrice: 1400,
    },
    {
      user: user2._id,
      kits: [
        {
          product: herbs1._id,
          amount: 1,
          price: herbs1.price,
        },
        {
          product: herbs2._id,
          amount: 1,
          price: herbs2.price,
        },
        {
          product: herbs3._id,
          amount: 1,
          price: herbs3.price,
        },
        {
          product: honey3._id,
          amount: 1,
          price: honey3.price,
        },
        {
          product: herbs4._id,
          amount: 1,
          price: herbs4.price,
        },
        {
          product: driedFruits4._id,
          amount: 1,
          price: driedFruits4.price,
        },
      ],
      totalPrice: 1700,
    },
  );

  await db.close();
};
run().catch(console.error);
