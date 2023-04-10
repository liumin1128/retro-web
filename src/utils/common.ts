// react获取当前页面的路径，带/#/
export const getCurrentPath = () => {
  const path = window.location.hash;
  return path;
};

// 获取当地浏览器环境，判断是否是wechat浏览器
export const isWechat = () => {
  return /(micromessenger)/i.test(navigator.userAgent);
};
