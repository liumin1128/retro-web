import { isWechat } from '@/utils/common';

export const NAV_TABS = [
  { pathname: '/', label: '动态' },
  { pathname: '/about/download', label: '下载' },
];

export const ENV = process.env.NODE_ENV !== 'production';
export const STORE_USER_KEY = 'react.mobi.user';
export const STORE_THEME_KEY = 'react.mobi.theme.key';
export const CURRENT_PATCH = 'react.mobi.theme.key';
export const USER_TOKEN = 'react.mobi.user.token';
export const USER_INFO_KEY = 'react.mobi.user.info';
export const USER_SETTING_THEME = 'react.mobi.user.setting.theme';
export const PATH_BEFORELOGIN = 'react.mobi.path.before.login';
export const QINIUURL = 'https://imgs.react.mobi';
export const QINIU_UPLOADURL = 'https://upload-z1.qiniup.com';

export const API_URL = process.env.API_URL || '';

export const WECHAT_OAUTH_URL = isWechat()
  ? `${API_URL}/oauth/wx`
  : `${API_URL}/oauth/wechat`;
export const GITHUB_OAUTH_URL = `${API_URL}/oauth/github`;
