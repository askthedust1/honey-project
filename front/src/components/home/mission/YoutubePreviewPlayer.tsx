import React, { useState } from 'react';
import cls from '../../../styles/_mission.module.scss';

interface YoutubePreviewPlayerProps {
  videoId: string;
}

const YoutubePreviewPlayer: React.FC<YoutubePreviewPlayerProps> = ({ videoId }) => {
  const [isOverlayVisible, setIsOverlayVisible] = useState(true);
  const [videoSrc, setVideoSrc] = useState('');

  const handleOverlayClick = () => {
    setIsOverlayVisible(false);
    setVideoSrc(`https://www.youtube.com/embed/${videoId}?rel=0&autoplay=1`);
  };

  return (
    <div className={cls.youtubePreviewContainer} id="youtube-preview-container">
      {isOverlayVisible && (
        <div onClick={handleOverlayClick} className={cls.overlay}>
          <button className={cls.playButton}></button>
        </div>
      )}
      <div className={cls.youtubePlayerPreview} id="youtube-player-preview">
        <iframe
          id="youtube-player-iframe"
          width="100%"
          height="100%"
          src={videoSrc}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default YoutubePreviewPlayer;
