import mongoose from 'mongoose';
import config from './config';
import User from './models/User';
import * as crypto from 'crypto';
import Category from './models/Category';
import Product from './models/Product';
import Transaction from './models/Transaction';
import Banner from "./models/Banner";

const run = async () => {
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection('users');
    await db.dropCollection('categories');
    await db.dropCollection('products');
    await db.dropCollection('transactions');
    await db.dropCollection('banners');
  } catch (e) {
    console.log('Collection were not present');
  }

  const [user1, user2] = await User.create(
    {
      email: 'sam@gmail.com',
      password: 'user',
      passwordConfirm: 'user',
      token: crypto.randomUUID(),
      role: 'user',
      displayName: 'Sam Smith ',
      phone: '0772 77-22-77',
    },
    {
      email: 'oleg@gmail.com',
      password: 'oleg',
      passwordConfirm: 'oleg',
      token: crypto.randomUUID(),
      role: 'user',
      displayName: 'Oleg Mongol ',
      phone: '0552 82-78-76',
    },
    {
      email: 'admin@gmail.com',
      password: 'admin',
      passwordConfirm: 'admin',
      token: crypto.randomUUID(),
      role: 'admin',
      displayName: 'Administrator',
      phone: '0555 55-55-55',
    },
  );

  const [honey, herbs, driedFruits] = await Category.create(
    {
      title: 'Мёд',
      image: 'fixtures/honey2.jpeg',
      description:
        'Мед - это натуральное сладкое вещество, производимое пчелами из цветочного нектара. Он имеет густую консистенцию с характерным золотистым цветом и сладким, цветочным вкусом.',
    },
    {
      title: 'Лечебные травы',
      image: 'fixtures/herbs_category.svg',
      description:
        'Лечебные травы - это растения, которые используются в медицинских целях из-за своих полезных свойств и потенциальных лечебных свойств. Они часто применяются в традиционной медицине для облегчения различных здоровотворных проблем, таких как пищеварительные расстройства, воспаления, улучшение иммунитета и снятие стресса.',
    },
    {
      title: 'Сухофрукты',
      image: 'fixtures/fruits_category.svg',
      description:
        'Сухофрукты - это фрукты, прошедшие процесс сушки, в результате которого они теряют большую часть влаги, но сохраняют свои питательные свойства. Среди популярных сухофруктов можно найти изюм, чернослив, финики, инжир, абрикосы и другие. ',
    },
  );

  const [
    honey1,
    honey2,
    honey3,
    honey4,
    honey5,
    honey6,
    honey7,
    herbs1,
    herbs2,
    herbs3,
    herbs4,
    herbs5,
    herbs6,
    herbs7,
    driedFruits1,
    driedFruits2,
    driedFruits3,
    driedFruits4,
    driedFruits5,
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
        title: 'Каштановый мед',
        description:
            'Каштановый мед считается одним из самых ценных сортов, среди всех видов меда получаемых пасечниками в разных регионах России.',
        category: honey._id,
        price: 500,
        amount: 20,
        image: 'fixtures/honey3.png',
      },
      {
        title: 'Цветочный мед',
        description:
            'Цветочный мёд - продукт пчеловодства, в котором соединены пыльца и нектар с разных цветущих растений.',
        category: honey._id,
        price: 600,
        amount: 20,
        image: 'fixtures/honey3.png',
      },
      {
        title: 'Прополисный мёд',
        description:
            'Насыщенный продукт, который обладает одновременно противовоспалительными, питательными и антибактериальными свойствами.',
        category: honey._id,
        price: 700,
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
        title: 'Ромашковый чай',
        description:
            'Ромашка аптечная это неприхотливое полевое растение семейства сложноцветных. Она широко распространена в Северной Америки и Евразии и встречается почти во всех регионах обоих полушарий, не считая тропического и субтропического поясов.',
        category: herbs._id,
        price: 100,
        amount: 20,
        image: 'fixtures/herbs.svg',
      },
      {
        title: 'Эвкалиптовый напиток',
        description:
            'Эвкалипт это вечнозеленое древесное растение семейства Миртовые. Больше всего различных видов эвкалипта произрастает в Новой Зеландии, Тасмании и лесах Австралии. Некоторые его виды встречаются на Филиппинах, в Индонезии и в Новой Гвинее. В северном полушарии растет всего один вид эвкалипта – это Эвкалипт радужный.',
        category: herbs._id,
        price: 400,
        amount: 20,
        image: 'fixtures/herbs.svg',
      },
      {
        title: 'Чай из лепестков роз',
        description:
            'Розы это не только красивые и популярные цветы с восхитительным ароматом, но и лекарственное растение.',
        category: herbs._id,
        price: 600,
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
      amount: 0,
      image: 'fixtures/driedFruits.svg',
    },
      {
        title: 'Чай травяной сбор фруктовый ягодный "Ягодная поляна"',
        description:
            'Наслаждайтесь ярким и ароматным праздником вкусов с нашим фруктово-ягодным чаем "Ягодная поляна", где сочные ягоды и ароматные фрукты создают неповторимый букет удовольствия в каждом глотке.',
        category: driedFruits._id,
        price: 500,
        amount: 10,
        image: 'fixtures/driedFruits.svg',
      },
  );

  await Transaction.create(
    {
      user: user1._id,
      address: 'проспект Чуй, 35',
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
          product: honey5._id,
          amount: 1,
          price: honey5.price,
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
      address: '6 микрорайон, 5 дом, 43 квартира',
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
          product: honey6._id,
          amount: 1,
          price: honey6.price,
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
      address: 'ул. Малдыбаева 7/1',
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
        user: user1._id,
        address: 'ул. Малдыбаева 7/1',
        kits: [
          {
            product: driedFruits5._id,
            amount: 2,
            price: driedFruits5.price,
          },
        ],
        totalPrice: 500,
      },
      {
        user: user1._id,
        address: 'ул. Малдыбаева 7/1',
        kits: [
          {
            product: honey7._id,
            amount: 1,
            price: honey7.price,
          },
        ],
        totalPrice: 700,
      },
    {
      user: user2._id,
      address: 'Медерова, 35',
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
      address: 'Ахунбаева, 23',
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
        address: 'Ахунбаева, 23',
        kits: [
          {
            product: herbs5._id,
            amount: 1,
            price: herbs5.price,
          },
          {
            product: herbs6._id,
            amount: 1,
            price: herbs6.price,
          },
          {
            product: herbs7._id,
            amount: 1,
            price: herbs7.price,
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
      address: 'Логвиненко, 32',
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

  await Banner.create(
      {
        image: 'fixtures/landing.png',
        description: 'landing1'
      },
      {
        image: 'fixtures/landing2.png',
        description: 'landing2'
      },
      {
        image: 'fixtures/landing3.png',
        description: 'landing3'
      },
  )

  await db.close();
};
run().catch(console.error);
