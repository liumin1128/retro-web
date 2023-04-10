// react获取当前页面的路径，带/#/
export const getCurrentPath = () => {
  const path = window.location.hash;
  return path;
};

// 获取当地浏览器环境，判断是否是wechat浏览器
export const isWechat = () => {
  return /(micromessenger)/i.test(navigator.userAgent);
};

// 根据文件名，判断是否是视频类型的文件
export const isVideo = (fileName: string) => {
  const ext = fileName.split('.').pop() || '';
  return ['mp4', 'mov', 'avi', 'rmvb', 'rm', 'flv', 'mkv'].includes(ext);
};
