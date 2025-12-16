import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CardMedia from '@mui/material/CardMedia';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { isVideo } from '@/utils/common';

interface IPicturesProps {
  pictures: string[];
}

const Pictures: React.FunctionComponent<IPicturesProps> = (props) => {
  const { pictures } = props;
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<string>('');
  const [videoDimensions, setVideoDimensions] = useState({
    width: 0,
    height: 0,
  });

  const preloadVideoAndGetDimensions = (
    videoUrl: string,
  ): Promise<{ width: number; height: number }> => {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.onloadedmetadata = () => {
        const { videoWidth, videoHeight } = video;

        // 计算在90vw和90vh限制下的最佳尺寸
        const maxWidth = window.innerWidth * 0.9;
        const maxHeight = window.innerHeight * 0.9;

        const aspectRatio = videoWidth / videoHeight;

        let finalWidth = videoWidth;
        let finalHeight = videoHeight;

        // 如果视频太大，按比例缩放
        if (videoWidth > maxWidth) {
          finalWidth = maxWidth;
          finalHeight = finalWidth / aspectRatio;
        }

        if (finalHeight > maxHeight) {
          finalHeight = maxHeight;
          finalWidth = finalHeight * aspectRatio;
        }

        resolve({ width: finalWidth, height: finalHeight });
      };
      video.onerror = () => {
        reject(new Error('Video load failed'));
      };
      video.src = videoUrl;
    });
  };

  const handleVideoClick = async (videoUrl: string) => {
    try {
      // 预加载视频并获取尺寸
      const dimensions = await preloadVideoAndGetDimensions(videoUrl);
      setVideoDimensions(dimensions);
      setCurrentVideo(videoUrl);
      setVideoModalOpen(true);
    } catch (error) {
      // 如果预加载失败，使用默认尺寸
      setVideoDimensions({
        width: window.innerWidth * 0.9,
        height: window.innerHeight * 0.9,
      });
      setCurrentVideo(videoUrl);
      setVideoModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setVideoModalOpen(false);
    setCurrentVideo('');
    setVideoDimensions({ width: 0, height: 0 });
  };

  if (pictures.length === 0) {
    return null;
  }

  function renderSinglePicture() {
    if (isVideo(pictures[0])) {
      return (
        <Box sx={{ maxWidth: 400, position: 'relative' }}>
          <video
            width="100%"
            style={{
              borderRadius: '10px',
              cursor: 'pointer',
              maxWidth: '400px',
              maxHeight: '400px',
            }}
            // onClick={() => handleVideoClick(pictures[0])}
            poster={`${pictures[0]}?vframe/jpg/offset/1`} // 视频第1秒截图作为封面
          >
            <source src={pictures[0]} type="video/mp4" />
            <track kind="captions" />
          </video>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              borderRadius: '50%',
              width: 60,
              height: 60,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
            onClick={() => handleVideoClick(pictures[0])}
          >
            <PlayArrowIcon sx={{ color: 'white', fontSize: 30 }} />
          </Box>
        </Box>
      );
    }

    const thumbnail = `${pictures[0]}?imageView2/0/w/400`;

    return (
      <Box sx={{ maxWidth: 400 }}>
        <PhotoProvider>
          <PhotoView src={pictures[0]}>
            <CardMedia
              component="img"
              image={thumbnail}
              sx={{
                width: '100%',
                maxWidth: '400px',
                maxHeight: '400px',
                cursor: 'pointer',
                borderRadius: '10px',
              }}
            />
          </PhotoView>
        </PhotoProvider>
      </Box>
    );
  }

  function renderMultiplePictures() {
    return (
      <Box sx={{ maxWidth: 400 }}>
        <PhotoProvider>
          <Grid container spacing={1}>
            {pictures?.map((picture, index) => {
              const size = 200;

              // 如果是视频，显示缩略图和播放按钮
              if (isVideo(picture)) {
                return (
                  <Grid key={`${picture}-${index}`} item xs={4}>
                    <Box
                      sx={{
                        position: 'relative',
                        width: '100%',
                        paddingTop: '100%',
                      }}
                    >
                      <video
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          borderRadius: '4px',
                          cursor: 'pointer',
                        }}
                        poster={`${picture}?vframe/jpg/offset/1`} // 视频第1秒截图作为封面
                        onClick={() => handleVideoClick(picture)}
                      >
                        <source src={picture} type="video/mp4" />
                        <track kind="captions" />
                      </video>
                      <Box
                        sx={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          backgroundColor: 'rgba(0, 0, 0, 0.6)',
                          borderRadius: '50%',
                          width: 30,
                          height: 30,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                        }}
                        onClick={() => handleVideoClick(picture)}
                      >
                        <PlayArrowIcon sx={{ color: 'white', fontSize: 16 }} />
                      </Box>
                    </Box>
                  </Grid>
                );
              }

              const thumbnail = `${picture}?imageView2/0/w/${size}`;

              return (
                <Grid key={`${thumbnail}-${index}`} item xs={4}>
                  <PhotoView src={picture}>
                    <CardMedia
                      image={thumbnail}
                      sx={{
                        width: '100%',
                        height: '100%',
                        paddingTop: '100%',
                        borderRadius: '4px',
                        cursor: 'pointer',
                      }}
                    />
                  </PhotoView>
                </Grid>
              );
            })}
          </Grid>
        </PhotoProvider>
      </Box>
    );
  }

  function renderVideoModal() {
    return (
      <Modal
        open={videoModalOpen}
        onClose={handleCloseModal}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: videoDimensions.width || '90vw',
            height: videoDimensions.height || '90vh',
            maxWidth: '90vw',
            maxHeight: '90vh',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '8px',
          }}
        >
          <IconButton
            onClick={handleCloseModal}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              zIndex: 1,
              bgcolor: 'rgba(0, 0, 0, 0.5)',
              color: 'white',
              '&:hover': {
                bgcolor: 'rgba(0, 0, 0, 0.7)',
              },
            }}
          >
            <CloseIcon />
          </IconButton>
          {currentVideo && (
            <video
              controls
              autoPlay
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
            >
              <source src={currentVideo} type="video/mp4" />
              <track kind="captions" />
            </video>
          )}
        </Box>
      </Modal>
    );
  }

  return (
    <>
      {pictures.length === 1 && renderSinglePicture()}
      {pictures.length > 1 && renderMultiplePictures()}
      {renderVideoModal()}
    </>
  );
};

export default Pictures;
