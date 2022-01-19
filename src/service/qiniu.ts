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
