import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import pickBy from 'lodash/pickBy';
import isNil from 'lodash/isNil';
import isEmpty from 'lodash/isEmpty';

dayjs.extend(weekday);

// react获取当前页面的路径，带/#/
export const getCurrentPath = () => {
  const path = window.location.hash;
  return path;
};

// 获取当地浏览器环境，判断是否是wechat浏览器
export const isWechat = () => {
  return /(micromessenger)/i.test(navigator.userAgent);
};

// 根据文件名，判断是否是视频类型的文件, 不区分大小写
export const isVideo = (fileName: string) => {
  const videoType = ['mp4', 'avi', 'rmvb', 'rm', 'flv', '3gp', 'mkv', 'mov'];
  const suffix = fileName.split('.').pop() || '';
  return videoType.includes(suffix.toLowerCase());
};

// 使用dayjs获取当前月份包含哪些日期，并输出一个由日期构成的数组
export const getMonthDays = (date: string) => {
  const days = [];
  const month = dayjs(date).month();
  const year = dayjs(date).year();
  const daysInMonth = dayjs(date).daysInMonth();
  for (let i = 1; i <= daysInMonth; i += 1) {
    days.push(dayjs(`${year}-${month + 1}-${i}`));
  }
  return days;
};

// 使用dayjs获取当前月份包含哪些日期，并输出一个由日期构成的数组
export const getMonthWorkDays = (date: string) => {
  const days = [];
  const month = dayjs(date).month();
  const year = dayjs(date).year();
  const daysInMonth = dayjs(date).daysInMonth();
  for (let i = 1; i <= daysInMonth; i += 1) {
    const day = dayjs(`${year}-${month + 1}-${i}`);
    if (day.weekday() < 6 && day.weekday() > 0) {
      days.push(day);
    }
  }
  return days;
};

export const pickObject = (values: Record<string, unknown>) =>
  pickBy(values, (value) => !(isNil(value) && isEmpty(value)));
