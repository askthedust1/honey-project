import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import FilterBarItems from '@/components/FilterBar/FilterBarItems';
import cls from '@/styles/_products.module.scss';

interface Props {
  categoryId?: string;
}

const FilterBar: React.FC<Props> = ({ categoryId }) => {
  const { t } = useTranslation('common');
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div onClick={toggleDropdown} className={cls.dropdownContainer}>
      <button className={cls.dropdownDangerToggle}>{t('filter4')} &#9662;</button>
      {showDropdown && <FilterBarItems categoryId={categoryId} />}
    </div>
  );
};

export default FilterBar;
