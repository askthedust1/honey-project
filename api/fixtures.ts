import mongoose from 'mongoose';
import config from './config';
import User from './models/User';
import * as crypto from 'crypto';
import Category from './models/Category';
import Product from './models/Product';
import Transaction from './models/Transaction';
import Banner from './models/Banner';

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
      token: crypto.randomUUID(),
      role: 'user',
      displayName: 'Sam Smith ',
      phone: '0772 77-22-77',
      address: 'Some street 1',
    },
    {
      email: 'oleg@gmail.com',
      password: 'oleg',
      token: crypto.randomUUID(),
      role: 'user',
      displayName: 'Oleg Mongol ',
      phone: '0552 82-78-76',
      address: 'Some street 2',
    },
    {
      email: 'admin@gmail.com',
      password: 'admin',
      token: crypto.randomUUID(),
      role: 'admin',
      displayName: 'Administrator',
      phone: '0555 55-55-55',
      address: 'Some street 3',
    },
  );

  const [honey, herbs, driedFruits] = await Category.create(
    {
      image: 'fixtures/honey2.jpeg',
      isActive: true,
      translations: {
        en: {
          title: 'Honey',
          description:
            'En Мед - это натуральное сладкое вещество, производимое пчелами из цветочного нектара. Он имеет густую консистенцию с характерным золотистым цветом и сладким, цветочным вкусом.',
        },
        ru: {
          title: 'Мед',
          description:
            'Мед - это натуральное сладкое вещество, производимое пчелами из цветочного нектара. Он имеет густую консистенцию с характерным золотистым цветом и сладким, цветочным вкусом.',
        },
        kg: {
          title: 'Бал',
          description:
            'Мед - это натуральное сладкое вещество, производимое пчелами из цветочного нектара. Он имеет густую консистенцию с характерным золотистым цветом и сладким, цветочным вкусом.',
        },
      },
    },
    {
      image: 'fixtures/herbs_category.svg',
      isActive: false,
      translations: {
        en: {
          title: 'Herbs',
          description:
            'En Лечебные травы - это растения, которые используются в медицинских целях из-за своих полезных свойств и потенциальных лечебных свойств. Они часто применяются в традиционной медицине для облегчения различных здоровотворных проблем, таких как пищеварительные расстройства, воспаления, улучшение иммунитета и снятие стресса.',
        },
        ru: {
          title: 'Лечебные травы',
          description:
            'Лечебные травы - это растения, которые используются в медицинских целях из-за своих полезных свойств и потенциальных лечебных свойств. Они часто применяются в традиционной медицине для облегчения различных здоровотворных проблем, таких как пищеварительные расстройства, воспаления, улучшение иммунитета и снятие стресса.',
        },
        kg: {
          title: 'Чөптөр',
          description:
            'KG Лечебные травы - это растения, которые используются в медицинских целях из-за своих полезных свойств и потенциальных лечебных свойств. Они часто применяются в традиционной медицине для облегчения различных здоровотворных проблем, таких как пищеварительные расстройства, воспаления, улучшение иммунитета и снятие стресса.',
        },
      },
    },
    {
      image: 'fixtures/fruits_category.svg',
      isActive: false,
      translations: {
        en: {
          title: 'Dried fruits',
          description:
            'En Сухофрукты - это фрукты, прошедшие процесс сушки, в результате которого они теряют большую часть влаги, но сохраняют свои питательные свойства. Среди популярных сухофруктов можно найти изюм, чернослив, финики, инжир, абрикосы и другие. ',
        },
        ru: {
          title: 'Сухофрукты',
          description:
            'Сухофрукты - это фрукты, прошедшие процесс сушки, в результате которого они теряют большую часть влаги, но сохраняют свои питательные свойства. Среди популярных сухофруктов можно найти изюм, чернослив, финики, инжир, абрикосы и другие. ',
        },
        kg: {
          title: 'Кургатылган жемиштер',
          description:
            'Сухофрукты - это фрукты, прошедшие процесс сушки, в результате которого они теряют большую часть влаги, но сохраняют свои питательные свойства. Среди популярных сухофруктов можно найти изюм, чернослив, финики, инжир, абрикосы и другие. ',
        },
      },
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
      category: honey._id,
      oldPrice: 300,
      actualPrice: 300,
      amount: 20,
      image: 'fixtures/honey.svg',
      isHit: true,
      translations: {
        ru: {
          title: 'Связистый мед',
          description:
            'Связистый мед обладает богатым ароматом и глубоким, насыщенным вкусом. Он собирается из цветущих растений на лугах и полях.',
        },
        en: {
          title: 'Cohesive honey',
          description:
            'Cohesive honey has a rich aroma and a deep, rich taste. It is collected from flowering plants in meadows and fields.',
        },
        kg: {
          title: 'Бириккен бал',
          description:
            'Бириккен бал бай жыпар жытка жана терең, бай даамга ээ. Ал жайыттарда жана талааларда гүлдөгөн өсүмдүктөрдөн чогултулат.',
        },
      },
    },
    {
      category: honey._id,
      oldPrice: 500,
      actualPrice: 500,
      amount: 20,
      image: 'fixtures/honey.svg',
      isHit: true,
      translations: {
        ru: {
          title: 'Акациевый мед',
          description:
            'Акациевый мед обладает нежным, сладким вкусом и прозрачной текстурой. Он производится из нектара цветущего дерева акации.',
        },
        en: {
          title: 'Acacia honey',
          description:
            'Acacia honey has a delicate, sweet taste and a transparent texture. It is made from the nectar of the flowering acacia tree.',
        },
        kg: {
          title: 'Акация балы',
          description:
            'Акация балы назик, таттуу даамга жана тунук текстурага ээ. Ал гүлдөгөн акация дарагынын ширесинен жасалат.',
        },
      },
    },
    {
      category: honey._id,
      oldPrice: 400,
      actualPrice: 400,
      amount: 20,
      image: 'fixtures/White-honey.svg',
      isHit: true,
      translations: {
        ru: {
          title: 'Гречишный мед',
          description:
            'Гречишный мед имеет интенсивный аромат и темно-коричневый цвет. Он производится из цветов гречихи и обладает богатым вкусом с нотами карамели.',
        },
        en: {
          title: 'Buckwheat honey',
          description:
            'Buckwheat honey has an intense aroma and dark brown color. It is made from buckwheat flowers and has a rich taste with notes of caramel.',
        },
        kg: {
          title: 'Гречка бал',
          description:
            'Гречка балынын жыты күчтүү жана кочкул күрөң түскө ээ. Ал гречка гүлдөрүнөн жасалган жана карамель ноталары менен бай даамга ээ.',
        },
      },
    },
    {
      category: honey._id,
      oldPrice: 300,
      actualPrice: 300,
      amount: 20,
      image: 'fixtures/White-honey.svg',
      translations: {
        ru: {
          title: 'Липовый мед',
          description:
            'Липовый мед обладает светлым оттенком и нежным, цветочным ароматом. Он собирается из цветов липы и обладает мягким, сладким вкусом.',
        },
        en: {
          title: 'Linden honey',
          description:
            'Linden honey has a light shade and a delicate, floral aroma. It is collected from linden flowers and has a mild, sweet taste.',
        },
        kg: {
          title: 'Линден балы',
          description:
            'Линден балы жарык көлөкө жана назик, гүл жыты бар. Ал линден гүлдөрүнөн чогултулган жана жумшак, таттуу даамы бар.',
        },
      },
    },
    {
      category: honey._id,
      oldPrice: 500,
      actualPrice: 500,
      amount: 20,
      image: 'fixtures/honey3.png',
      translations: {
        ru: {
          title: 'Каштановый мед',
          description:
            'Каштановый мед считается одним из самых ценных сортов, среди всех видов меда получаемых пасечниками в разных регионах России.',
        },
        en: {
          title: 'Chestnut honey',
          description:
            'Chestnut honey is considered one of the most valuable varieties among all types of honey obtained by beekeepers in different regions of Russia.',
        },
        kg: {
          title: 'Каштан бал',
          description:
            'Каштан балы Россиянын ар кайсы аймактарында балчылар тарабынан алынган балдын бардык түрлөрүнүн ичинен эң баалуу сорттордун бири болуп эсептелет.',
        },
      },
    },
    {
      category: honey._id,
      oldPrice: 400,
      actualPrice: 400,
      amount: 20,
      image: 'fixtures/honey3.png',
      translations: {
        ru: {
          title: 'Цветочный мед',
          description:
            'Цветочный мёд - продукт пчеловодства, в котором соединены пыльца и нектар с разных цветущих растений.',
        },
        en: {
          title: 'Flower honey',
          description:
            'Flower honey is a beekeeping product that combines pollen and nectar from different flowering plants.',
        },
        kg: {
          title: 'Гүл балы',
          description:
            'Гүл балы – ар түрдүү гүлдүү өсүмдүктөрдүн чаңчалары менен нектарын бириктирген аарычылык продуктусу.',
        },
      },
    },
    {
      category: honey._id,
      oldPrice: 300,
      actualPrice: 300,
      amount: 20,
      image: 'fixtures/White-honey.svg',
      translations: {
        ru: {
          title: 'Прополисный мёд',
          description:
            'Насыщенный продукт, который обладает одновременно противовоспалительными, питательными и антибактериальными свойствами.',
        },
        en: {
          title: 'Propolis honey',
          description:
            'A rich product that has both anti-inflammatory, nutritional and antibacterial properties.',
        },
        kg: {
          title: 'Прополис бал',
          description:
            'Сезгенүүгө каршы, аш болумдуу жана антибактериалдык касиеттерге ээ болгон бай продукт.',
        },
      },
    },
    {
      category: herbs._id,
      oldPrice: 200,
      actualPrice: 200,
      amount: 0,
      image: 'fixtures/herbs.svg',
      translations: {
        ru: {
          title: 'Травяной сбор для иммунитета',
          description:
            'Этот сбор трав содержит эхинацею, шиповник и зверобой, которые способствуют укреплению иммунной системы и повышению ее защитных функций.',
        },
        en: {
          title: 'Herbal tea for immunity',
          description:
            "This herbal collection contains echinacea, rose hips and St. John's wort, which help strengthen the immune system and increase its protective functions.",
        },
        kg: {
          title: 'Иммунитет үчүн чөп чай',
          description:
            'Бул чөптөрдүн коллекциясында иммундук системаны чыңдоого жана анын коргоочу функцияларын жогорулатууга жардам берген эхинацея, роза жамбаштары жана звено бар.',
        },
      },
    },
    {
      category: herbs._id,
      oldPrice: 200,
      actualPrice: 200,
      amount: 20,
      image: 'fixtures/herbs.svg',
      translations: {
        ru: {
          title: 'Сбор трав для пищеварения',
          description:
            'Этот сбор включает мяту, ромашку и фенхель, которые помогают улучшить пищеварение, снизить вздутие и уменьшить дискомфорт в желудке.',
        },
        en: {
          title: 'Collection of herbs for digestion',
          description:
            'This blend includes mint, chamomile, and fennel to help improve digestion, reduce bloating, and reduce stomach discomfort.',
        },
        kg: {
          title: 'Аш сиңирүү үчүн чөптөрдү чогултуу',
          description:
            'Бул аралашмага жалбыз, ромашка жана фенхель кирет, сиңирүүнү жакшыртат, шишиктерди азайтат жана ашказандагы дискомфортту азайтат.',
        },
      },
    },
    {
      category: herbs._id,
      oldPrice: 300,
      actualPrice: 300,
      amount: 20,
      image: 'fixtures/herbs.svg',
      isHit: true,
      translations: {
        ru: {
          title: 'Березовый сбор для очищения',
          description:
            'Этот сбор включает мяту, ромашку и фенхель, которые помогают улучшить пищеварение, снизить вздутие и уменьшить дискомфорт в желудке.',
        },
        en: {
          title: 'Birch collection for cleansing',
          description:
            'This blend includes mint, chamomile, and fennel to help improve digestion, reduce bloating, and reduce stomach discomfort.',
        },
        kg: {
          title: 'Тазалоо үчүн кайың коллекциясы',
          description:
            'Бул аралашмага жалбыз, ромашка жана фенхель кирет, сиңирүүнү жакшыртат, шишиктерди азайтат жана ашказандагы дискомфортту азайтат.',
        },
      },
    },
    {
      category: herbs._id,
      oldPrice: 300,
      actualPrice: 300,
      amount: 20,
      image: 'fixtures/herbs.svg',
      translations: {
        ru: {
          title: 'Сбор трав для успокоения нервной системы',
          description:
            'Этот сбор включает валериану, пустырник и мелиссу, которые помогают снять напряжение, улучшить сон и смягчить нервное возбуждение.',
        },
        en: {
          title: 'Collection of herbs to calm the nervous system',
          description:
            'This collection includes valerian, motherwort and lemon balm, which help relieve tension, improve sleep and soothe nervous agitation.',
        },
        kg: {
          title: 'Нерв системасын тынчтандыруучу чөптөрдү чогултуу',
          description:
            'Бул коллекцияда чыңалууну басаңдатууга, уйкуну жакшыртууга жана нерв толкундануусун басаңдатууга жардам берген валериана, энелик жана лимон бальзамы кирет.',
        },
      },
    },
    {
      category: herbs._id,
      oldPrice: 300,
      actualPrice: 300,
      amount: 20,
      image: 'fixtures/herbs.svg',
      translations: {
        ru: {
          title: 'Ромашковый чай',
          description:
            'Ромашка аптечная - это неприхотливое полевое растение семейства сложноцветных. Она широко распространена в Северной Америки и Евразии и встречается почти во всех регионах обоих полушарий, не считая тропического и субтропического поясов.',
        },
        en: {
          title: 'Chamomile tea',
          description:
            'Chamomile is an unpretentious field plant of the Asteraceae family. It is widespread in North America and Eurasia and is found in almost all regions of both hemispheres, not counting the tropical and subtropical zones.',
        },
        kg: {
          title: 'Ромашка чайы',
          description:
            'Ромашка - Asteraceae тукумундагы жөнөкөй өсүмдүк. Түндүк Америкада жана Евразияда кеңири таралган жана тропикалык жана субтропиктик зоналарды эсепке албаганда, эки жарым шардын дээрлик бардык аймактарында кездешет.',
        },
      },
    },
    {
      category: herbs._id,
      oldPrice: 400,
      actualPrice: 400,
      amount: 20,
      image: 'fixtures/herbs.svg',
      translations: {
        ru: {
          title: 'Эвкалиптовый напиток',
          description:
            'Эвкалипт это вечнозеленое древесное растение семейства Миртовые. Больше всего различных видов эвкалипта произрастает в Новой Зеландии, Тасмании и лесах Австралии. Некоторые его виды встречаются на Филиппинах, в Индонезии и в Новой Гвинее. В северном полушарии растет всего один вид эвкалипта – это Эвкалипт радужный.',
        },
        en: {
          title: 'Eucalyptus drink',
          description:
            'Eucalyptus is an evergreen woody plant of the Myrtaceae family. The largest variety of eucalyptus species grows in New Zealand, Tasmania and the forests of Australia. Some of its species are found in the Philippines, Indonesia and New Guinea. Only one species of eucalyptus grows in the northern hemisphere - Eucalyptus rainbowus.',
        },
        kg: {
          title: 'Эвкалипт суусундугу',
          description:
            'Эвкалипт - Myrtaceae тукумундагы дайыма жашыл дарактуу өсүмдүк. Эвкалипт түрлөрүнүн эң чоң сорту Жаңы Зеландияда, Тасманияда жана Австралиянын токойлорунда өсөт. Анын айрым түрлөрү Филиппин, Индонезия жана Жаңы Гвинеяда кездешет. Түндүк жарым шарда эвкалипттин бир гана түрү өсөт - Eucalyptus rainbowus.',
        },
      },
    },
    {
      category: herbs._id,
      oldPrice: 300,
      actualPrice: 300,
      amount: 20,
      image: 'fixtures/herbs.svg',
      translations: {
        ru: {
          title: 'Чай из лепестков роз',
          description:
            'Розы это не только красивые и популярные цветы с восхитительным ароматом, но и лекарственное растение.',
        },
        en: {
          title: 'Rose petal tea',
          description:
            'Roses are not only beautiful and popular flowers with a delightful aroma, but also a medicinal plant.',
        },
        kg: {
          title: 'Роза гүлү чай',
          description:
            'Розалар жагымдуу жыты бар кооз жана популярдуу гүлдөр гана эмес, ошондой эле дарылык өсүмдүк.',
        },
      },
    },
    {
      category: driedFruits._id,
      oldPrice: 300,
      actualPrice: 300,
      amount: 20,
      isHit: true,
      image: 'fixtures/driedFruits.svg',
      translations: {
        ru: {
          title: 'Фруктовый микс "Энергия"',
          description:
            'Этот сбор содержит смесь из чернослива, изюма, фиников и кураги, обогащенных витаминами и минералами, которые придают энергию и восстанавливают силы.',
        },
        en: {
          title: 'Fruit mix "Energy"',
          description:
            'This collection contains a mixture of prunes, raisins, dates and dried apricots, enriched with vitamins and minerals that give energy and restore strength.',
        },
        kg: {
          title: 'Жемиш аралашмасы "Энергия"',
          description:
            'Бул коллекцияда кара өрүктүн, мейиздин, курма жана кургатылган өрүктүн аралашмасы бар, алар энергия берүүчү жана күч-кубатты калыбына келтирүүчү витаминдер жана минералдар менен байытылган.',
        },
      },
    },
    {
      category: driedFruits._id,
      oldPrice: 350,
      actualPrice: 350,
      amount: 20,
      image: 'fixtures/driedFruits.svg',
      translations: {
        ru: {
          title: 'Сухофруктовый набор "Витамины"',
          description:
            'Этот набор включает в себя смесь из изюма, чернослива, кураги и вишни, богатых витаминами и антиоксидантами, которые способствуют поддержанию здоровья и укреплению иммунитета.',
        },
        en: {
          title: 'Dried fruit set "Vitamins"',
          description:
            'This set includes a blend of raisins, prunes, dried apricots and cherries, rich in vitamins and antioxidants that help support health and strengthen the immune system.',
        },
        kg: {
          title: 'Кургатылган жемиш топтому "Витаминдер"',
          description:
            'Бул комплект ден соолукту чыңдоо жана иммундук системаны бекемдөөгө жардам берген витаминдерге жана антиоксиданттарга бай мейиз, кара өрүк, кургатылган өрүк жана алчанын аралашмасын камтыйт.',
        },
      },
    },
    {
      category: driedFruits._id,
      oldPrice: 400,
      actualPrice: 400,
      amount: 20,
      image: 'fixtures/driedFruits.svg',
      translations: {
        ru: {
          title: 'Тропический микс "Экзотика"',
          description:
            'Этот микс содержит смесь из сушеного ананаса, манго, банана и кокоса, создавая экзотический вкус и богатство питательных веществ тропических фруктов.',
        },
        en: {
          title: 'Tropical mix "Exotic"',
          description:
            'This mix contains a blend of dried pineapple, mango, banana and coconut, creating the exotic taste and nutritional richness of a tropical fruit.',
        },
        kg: {
          title: 'Тропикалык аралашма "Экзотикалык"',
          description:
            'Бул аралашма кургатылган ананас, манго, банан жана кокостун аралашмасын камтыйт, тропикалык жемиштердин экзотикалык даамын жана аш болумдуу байлыгын жаратат.',
        },
      },
    },
    {
      category: driedFruits._id,
      oldPrice: 300,
      actualPrice: 300,
      amount: 0,
      isHit: true,
      image: 'fixtures/driedFruits.svg',
      translations: {
        ru: {
          title: 'Ягодный сбор "Здоровье"',
          description:
            'Этот сбор включает в себя смесь из сушеных черники, малины, клюквы и красной смородины, обогащенных антиоксидантами, способствующими укреплению иммунной системы и поддержанию здоровья.',
        },
        en: {
          title: 'Berry collection "Health"',
          description:
            'This blend includes a blend of dried blueberries, raspberries, cranberries and red currants, enriched with antioxidants that help strengthen the immune system and support health.',
        },
        kg: {
          title: 'Берри жыйнагы "Ден соолук"',
          description:
            'Бул аралашмага иммундук системаны чыңдоо жана ден соолукту колдоочу антиоксиданттар менен байытылган кургатылган черники, малина, клюква жана кызыл карагаттын аралашмасы кирет.',
        },
      },
    },
    {
      category: driedFruits._id,
      oldPrice: 500,
      actualPrice: 500,
      amount: 10,
      image: 'fixtures/driedFruits.svg',
      translations: {
        ru: {
          title: 'Чай травяной сбор фруктовый ягодный "Ягодная поляна"',
          description:
            'Наслаждайтесь ярким и ароматным праздником вкусов с нашим фруктово-ягодным чаем "Ягодная поляна", где сочные ягоды и ароматные фрукты создают неповторимый букет удовольствия в каждом глотке.',
        },
        en: {
          title: 'Fruit berry herbal tea "Berry Glade"',
          description:
            'Enjoy a bright and aromatic feast of flavors with our fruit and berry tea "Berry Glade", where juicy berries and aromatic fruits create a unique bouquet of pleasure in every sip.',
        },
        kg: {
          title: 'Мөмө-жемиш чөп чай "Жемиш Шалбаасы"',
          description:
            'Биздин "Жемиш Шалбаасы" мөмө-жемиш чайыбыз менен жаркыраган жана жыпар жыттуу даамдардын майрамынан ырахат алыңыз, мында ширелүү мөмөлөр жана жыпар жыттуу жемиштер ар бир ууртамда уникалдуу ырахаттын букетин жаратат.',
        },
      },
    },
  );

  await Transaction.create(
    {
      user: user1._id,
      dateTime: '3023-11-29T14:18:43.174Z',
      address: 'проспект Чуй, 35',
      kits: [
        {
          product: honey1._id,
          amount: 1,
          price: honey1.actualPrice,
        },
        {
          product: honey2._id,
          amount: 1,
          price: honey2.actualPrice,
        },
        {
          product: honey5._id,
          amount: 1,
          price: honey5.actualPrice,
        },
        {
          product: driedFruits1._id,
          amount: 1,
          price: driedFruits1.actualPrice,
        },
      ],
      totalPrice: 1100,
    },
    {
      user: user1._id,
      dateTime: '3023-12-29T14:18:43.174Z',
      address: '6 микрорайон, 5 дом, 43 квартира',
      kits: [
        {
          product: herbs3._id,
          amount: 1,
          price: herbs3.actualPrice,
        },
        {
          product: honey2._id,
          amount: 1,
          price: honey2.actualPrice,
        },
        {
          product: honey6._id,
          amount: 1,
          price: honey6.actualPrice,
        },
        {
          product: driedFruits3._id,
          amount: 1,
          price: driedFruits3.actualPrice,
        },
      ],
      totalPrice: 1200,
    },
    {
      user: user1._id,
      dateTime: '3023-13-29T14:18:43.174Z',
      address: 'ул. Малдыбаева 7/1',
      kits: [
        {
          product: honey4._id,
          amount: 3,
          price: honey4.actualPrice,
        },
      ],
      totalPrice: 900,
    },
    {
      user: user1._id,
      dateTime: '3023-19-29T14:18:43.174Z',
      address: 'ул. Малдыбаева 7/1',
      kits: [
        {
          product: driedFruits5._id,
          amount: 2,
          price: driedFruits5.actualPrice,
        },
      ],
      totalPrice: 500,
    },
    {
      user: user1._id,
      dateTime: '3023-14-29T14:18:43.174Z',
      address: 'ул. Малдыбаева 7/1',
      kits: [
        {
          product: honey7._id,
          amount: 1,
          price: honey7.actualPrice,
        },
      ],
      totalPrice: 700,
    },
    {
      user: user2._id,
      dateTime: '3023-15-29T14:18:43.174Z',
      address: 'Медерова, 35',
      kits: [
        {
          product: honey4._id,
          amount: 1,
          price: honey4.actualPrice,
        },
        {
          product: driedFruits2._id,
          amount: 1,
          price: driedFruits2.actualPrice,
        },
        {
          product: herbs3._id,
          amount: 1,
          price: herbs3.actualPrice,
        },
      ],
      totalPrice: 950,
    },
    {
      user: user2._id,
      dateTime: '3023-16-29T14:18:43.174Z',
      address: 'Ахунбаева, 23',
      kits: [
        {
          product: honey1._id,
          amount: 2,
          price: honey1.actualPrice,
        },
        {
          product: driedFruits3._id,
          amount: 2,
          price: driedFruits3.actualPrice,
        },
      ],
      totalPrice: 1400,
    },
    {
      user: user2._id,
      dateTime: '3023-17-29T14:18:43.174Z',
      address: 'Ахунбаева, 23',
      kits: [
        {
          product: herbs5._id,
          amount: 1,
          price: herbs5.actualPrice,
        },
        {
          product: herbs6._id,
          amount: 1,
          price: herbs6.actualPrice,
        },
        {
          product: herbs7._id,
          amount: 1,
          price: herbs7.actualPrice,
        },
        {
          product: driedFruits3._id,
          amount: 2,
          price: driedFruits3.actualPrice,
        },
      ],
      totalPrice: 1400,
    },
    {
      user: user2._id,
      dateTime: '3023-18-29T14:18:43.174Z',
      address: 'Логвиненко, 32',
      kits: [
        {
          product: herbs1._id,
          amount: 1,
          price: herbs1.actualPrice,
        },
        {
          product: herbs2._id,
          amount: 1,
          price: herbs2.actualPrice,
        },
        {
          product: herbs3._id,
          amount: 1,
          price: herbs3.actualPrice,
        },
        {
          product: honey3._id,
          amount: 1,
          price: honey3.actualPrice,
        },
        {
          product: herbs4._id,
          amount: 1,
          price: herbs4.actualPrice,
        },
        {
          product: driedFruits4._id,
          amount: 1,
          price: driedFruits4.actualPrice,
        },
      ],
      totalPrice: 1700,
    },
  );

  await Banner.create(
    {
      translations: {
        ru: {
          image: 'fixtures/landing.png',
        },
        en: {
          image: 'fixtures/banner-en1.png',
        },
        kg: {
          image: 'fixtures/banner-kg1.png',
        },
      },
      description: 'landing1',
      page: '/products/page/1',
      priority: 1,
    },
    {
      translations: {
        ru: {
          image: 'fixtures/landing2.png',
        },
        en: {
          image: 'fixtures/banner-en2.png',
        },
        kg: {
          image: 'fixtures/banner-kg2.png',
        },
      },
      description: 'landing2',
      page: '/products/page/1',
      priority: 2
    },
    {
      translations: {
        ru: {
          image: 'fixtures/landing3.png',
        },
        en: {
          image: 'fixtures/banner-en2.png',
        },
        kg: {
          image: 'fixtures/banner-kg2.png',
        },
      },
      description: 'landing3',
      page: '/products/page/1',
      priority: 3
    },
  );

  await db.close();
};
run().catch(console.error);
