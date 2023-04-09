// react获取当前页面的路径，带/#/
export const getCurrentPath = () => {
  const path = window.location.hash;
  return path;
};
