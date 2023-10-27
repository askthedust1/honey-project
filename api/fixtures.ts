import mongoose from 'mongoose';
import config from './config';
import User from './models/User';
import * as crypto from 'crypto';
import Category from "./models/Category";
import Product from "./models/Product";

const run = async () => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection('users');
        await db.dropCollection('categories');
        await db.dropCollection('products');
    } catch (e) {
        console.log('Collection were not present');
    }

    await User.create(
        {
            email: 'admin@gmail.com',
            password: 'admin',
            token: crypto.randomUUID(),
            role: 'admin',
            displayName: 'Administrator',
            phone: '0555 55-55-55'
        },
        {
            email: 'sam@gmail.com',
            password: 'user',
            token: crypto.randomUUID(),
            role: 'user',
            displayName: 'Sam Smith ',
            phone: '0772 77-22-77'
        }
    );

    const [honey, herbs, driedFruits ] = await Category.create({
        title: 'Мёд',
        description:'Мед - это натуральное сладкое вещество, производимое пчелами из цветочного нектара. Он имеет густую консистенцию с характерным золотистым цветом и сладким, цветочным вкусом.'
    }, {
        title:'Лечебные травы',
        description:'Лечебные травы - это растения, которые используются в медицинских целях из-за своих полезных свойств и потенциальных лечебных свойств. Они часто применяются в традиционной медицине для облегчения различных здоровотворных проблем, таких как пищеварительные расстройства, воспаления, улучшение иммунитета и снятие стресса.'
    }, {
        title:'Сухофрукты',
        description:'Сухофрукты - это фрукты, прошедшие процесс сушки, в результате которого они теряют большую часть влаги, но сохраняют свои питательные свойства. Среди популярных сухофруктов можно найти изюм, чернослив, финики, инжир, абрикосы и другие. '
    });

    await Product.create({
        title: 'Связистый мед',
        description:'Связистый мед обладает богатым ароматом и глубоким, насыщенным вкусом. Он собирается из цветущих растений на лугах и полях.',
        category: honey._id,
        price: 300,
        amount:20,
        image: 'fixtures/honey.png'
    }, {
        title: 'Акациевый мед:',
        description:' Акациевый мед обладает нежным, сладким вкусом и прозрачной текстурой. Он производится из нектара цветущего дерева акации.',
        category: honey._id,
        price: 500,
        amount:20,
        image: 'fixtures/honey.png'
    }, {
        title: 'Гречишный мед',
        description:'Гречишный мед имеет интенсивный аромат и темно-коричневый цвет. Он производится из цветов гречихи и обладает богатым вкусом с нотами карамели.',
        category: honey._id,
        price: 400,
        amount:20,
        image: 'fixtures/honey.png'
    }, {
        title: 'Липовый мед',
        description:'Липовый мед обладает светлым оттенком и нежным, цветочным ароматом. Он собирается из цветов липы и обладает мягким, сладким вкусом.',
        category: honey._id,
        price: 300,
        amount:20,
        image: 'fixtures/honey.png'
    }, {
        title: 'Травяной сбор для иммунитета',
        description:' Этот сбор трав содержит эхинацею, шиповник и зверобой, которые способствуют укреплению иммунной системы и повышению ее защитных функций.',
        category: herbs._id,
        price: 200,
        amount:20,
        image: 'fixtures/herbst.jpg'
    }, {
        title: 'Сбор трав для пищеварения',
        description:'Этот сбор включает мяту, ромашку и фенхель, которые помогают улучшить пищеварение, снизить вздутие и уменьшить дискомфорт в желудке.',
        category: herbs._id,
        price: 200,
        amount:20,
        image: 'fixtures/herbst.jpg'
    }, {
        title: 'Березовый сбор для очищения',
        description:'Этот сбор содержит березовые почки, крапиву и зверобой, которые помогают очистить организм от токсинов, улучшить функцию почек и стимулировать мочеотделение.',
        category: herbs._id,
        price: 300,
        amount:20,
        image: 'fixtures/herbst.jpg'
    }, {
        title: 'Сбор трав для успокоения нервной системы',
        description:'Этот сбор включает валериану, пустырник и мелиссу, которые помогают снять напряжение, улучшить сон и смягчить нервное возбуждение.',
        category: herbs._id,
        price: 300,
        amount:20,
        image: 'fixtures/herbst.jpg'
    }, {
        title: 'Фруктовый микс "Энергия"',
        description:' Этот сбор содержит смесь из чернослива, изюма, фиников и кураги, обогащенных витаминами и минералами, которые придают энергию и восстанавливают силы.',
        category: driedFruits._id,
        price: 300,
        amount:20,
        image: 'fixtures/driedFruits.jpg'
    }, {
        title: 'Сухофруктовый набор "Витамины"',
        description:' Этот набор включает в себя смесь из изюма, чернослива, кураги и вишни, богатых витаминами и антиоксидантами, которые способствуют поддержанию здоровья и укреплению иммунитета.',
        category: driedFruits._id,
        price: 350,
        amount:20,
        image: 'fixtures/driedFruits.jpg'
    }, {
        title: 'Тропический микс "Экзотика"',
        description:'Этот микс содержит смесь из сушеного ананаса, манго, банана и кокоса, создавая экзотический вкус и богатство питательных веществ тропических фруктов.',
        category: driedFruits._id,
        price: 400,
        amount:20,
        image: 'fixtures/driedFruits.jpg'
    }, {
        title: 'Ягодный сбор "Здоровье"',
        description:'Этот сбор включает в себя смесь из сушеных черники, малины, клюквы и красной смородины, обогащенных антиоксидантами, способствующими укреплению иммунной системы и поддержанию здоровья.',
        category: driedFruits._id,
        price: 300,
        amount:20,
        image: 'fixtures/driedFruits.jpg'
    });

    await db.close();
};
run().catch(console.error);