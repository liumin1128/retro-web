// https://zhuanlan.zhihu.com/p/538567487
// tslint:disable
// eslint-disable
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import React, { useEffect } from 'react';
import dynamicFile from 'dynamic-file';

const APlayerRoot = () => {
  useEffect(() => {
    if (window.MetingJSElement) return;

    dynamicFile([
      'https://cdn.jsdelivr.net/npm/aplayer/dist/APlayer.min.css',
      'https://cdn.jsdelivr.net/npm/aplayer/dist/APlayer.min.js',
      'https://cdn.jsdelivr.net/npm/meting@2/dist/Meting.min.js',
      // '/js/meting.js', // 魔改版，将aplayer挂载到window上
    ]).then(() => {
      const ms = window.document.createElement('meting-js');

      ms.setAttribute('server', 'netease');
      ms.setAttribute('type', 'playlist');
      ms.setAttribute('id', '7070399884');
      ms.setAttribute('lrcType', '3');
      ms.setAttribute('fixed', 'true');
      ms.setAttribute('theme', '#00266b');
      // ms.setAttribute('mini', 'true');

      window.document.body.appendChild(ms);
    });

    // return () => {
    // window.aplayer.destroy时会报错
    // if (window.aplayer && typeof window.aplayer.destroy === 'function') {
    //   console.log(window.aplayer.destroy)
    //   window.aplayer.destroy()
    // }
    // };
  }, []);
  // 分享周杰伦的BB机的歌单《Jay 周杰伦【完美歌单】》https://y.music.163.com/m/playlist?app_version=8.8.70&id=7070399884&userid=430083095&dlt=0846&creatorId=415063370 (@网易云音乐)
  // 分享Zacharyeah的歌单《周杰伦最全歌曲集》https://y.music.163.com/m/playlist?app_version=8.8.70&id=11860849&userid=430083095&dlt=0846&creatorId=3647122 (@网易云音乐)
  // https://i.y.qq.com/n2/m/share/details/taoge.html?hosteuin=NKSz7KCFNeoz&id=8514579953&appversion=111100&ADTAG=wxfshare&appshare=iphone_wx
  return <div />;
};

export default APlayerRoot;
