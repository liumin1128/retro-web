import axios from 'axios';
import request from '@/utils/request';
import { QINIU_UPLOADURL, QINIUURL } from '@/configs/base';

export const getToken = () => {
  return request.get('/common/qiniu/token');
};

export const upload = async (files: File[]): Promise<string[]> => {
  const token = await getToken();

  const list = await Promise.all(
    files.map(async (file) => {
      const data = new FormData();
      data.append('token', token.data.token);
      data.append('file', file);

      const res = await axios({
        data,
        url: QINIU_UPLOADURL,
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return `${QINIUURL}/${res.data.key}`;
    }),
  );

  return list;
};

interface Item {
  id: string;
  file?: File;
  src?: string;
  url?: string;
}

export const uploadItem = async (
  files: (Item | string)[],
): Promise<string[]> => {
  const token = await getToken();

  const urlList: string[] = await Promise.all(
    files.map(async (i: Item | string): Promise<string> => {
      if (typeof i === 'string') return i;

      // 已有url跳过上传
      if (i.url) return i.url;

      // 抛弃异常文件
      if (!i.file) throw new Error('File Error');

      const data = new FormData();
      data.append('token', token.data.token);
      data.append('file', i.file);

      const res = await axios({
        data,
        url: QINIU_UPLOADURL,
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return `${QINIUURL}/${res.data.key}`;
    }),
  );

  return urlList;
};

export async function uploadBase64(base64String: string) {
  const token = await getToken();
  const res = await axios.post(
    'https://up-z1.qiniup.com/putb64/-1',
    base64String.replace('data:image/png;base64,', ''),
    {
      headers: {
        'Content-Type': 'application/octet-stream',
        Authorization: `UpToken ${token?.data?.token}`,
      },
    },
  );

  return `${QINIUURL}/${res.data.key}`;
}
