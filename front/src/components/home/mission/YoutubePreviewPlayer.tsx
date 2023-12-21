import React, { useEffect, useRef } from 'react';
import cls from '../../../styles/_mission.module.scss';

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
  }
}

interface YoutubePreviewPlayerProps {
  videoId: string;
}

const YoutubePreviewPlayer: React.FC<YoutubePreviewPlayerProps> = ({ videoId }) => {
  const playerRef = useRef<YT.Player | null>(null);

  useEffect(() => {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';

    const handleApiReady = () => {
      if (!playerRef.current) {
        playerRef.current = new YT.Player('youtube-player-preview', {
          height: '315',
          width: '560',
          videoId,
          events: {
            onReady: (event) => {
              const previewContainer = document.getElementById('youtube-preview-container');
              if (previewContainer) {
                previewContainer.addEventListener('click', () => {
                  event.target?.playVideo();
                });
              }
            },
          },
        });
      }
    };

    if (window.YT && window.YT.Player) {
      handleApiReady();
    } else {
      window.onYouTubeIframeAPIReady = handleApiReady;
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }

    return () => {
      window.onYouTubeIframeAPIReady = undefined;
    };
  }, [videoId]);

  return (
    <div className={cls.youtubePreviewContainer} id="youtube-preview-container">
      <div className={cls.youtubePlayerPreview} id="youtube-player-preview"></div>
    </div>
  );
};

export default YoutubePreviewPlayer;
