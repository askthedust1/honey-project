import React from 'react';
import { useTranslation } from 'next-i18next';
import cls from '../../../styles/_mission.module.scss';
import YoutubePreviewPlayer from '@/components/home/mission/YoutubePreviewPlayer';

const Mission = () => {
  const { t } = useTranslation('mission');
  const missionVideoUrl = 'yr1WqU-Oyt8';

  return (
    <div className={cls.mission}>
      <h2>{t('titleMission')}</h2>
      <div className={cls.mission_inner}>
        <div className={cls.mission_video}>
          <YoutubePreviewPlayer videoId={missionVideoUrl} />
        </div>
        <div className={cls.mission_article}>
          <p className={cls.mission_texts}>{t('textUp')}</p>
          <p className={cls.mission_texts}>{t('textMiddle')}</p>
          <p className={cls.mission_texts}>{t('textBottom')}</p>
        </div>
      </div>
    </div>
  );
};

export default Mission;
