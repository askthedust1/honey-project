'use client';
import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import cls from '../../../styles/_langSelect.module.scss';

interface Props {
  toggleNav?: () => void;
}

const LanguageSwitcher: React.FC<Props> = ({ toggleNav }) => {
  const router = useRouter();

  const [currentLang, setCurrentLang] = useState(router.locale || 'ru');

  const { i18n } = useTranslation();

  const changeLang = (lang: string) => {
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, asPath, { locale: lang });
    i18n.changeLanguage(lang);
    setCurrentLang(lang);
    if (toggleNav) {
      toggleNav();
    }
  };

  return (
    <select
      className={cls.lang_select}
      onChange={(event) => changeLang(event.target.value)}
      value={currentLang}
    >
      <option value="ru">RU</option>
      <option value="en">EN</option>
      <option value="kg">KG</option>
    </select>
  );
};

export default LanguageSwitcher;
