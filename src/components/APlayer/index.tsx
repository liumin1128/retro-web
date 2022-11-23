// https://zhuanlan.zhihu.com/p/538567487
// tslint:disable
// eslint-disable
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import React, { useEffect, useState } from 'react';
import dynamicFile from 'dynamic-file';

const APlayerRoot = () => {
  const [ok, setOk] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line no-empty
    if (ok) {
    } else {
      dynamicFile([
        'https://cdn.jsdelivr.net/npm/aplayer/dist/APlayer.min.css',
        'https://cdn.jsdelivr.net/npm/aplayer/dist/APlayer.min.js',
        'https://cdn.jsdelivr.net/npm/meting@2/dist/Meting.min.js',
      ]).then(() => {
        setOk(true);
        // const ap = new APlayer({
        //   container: document.getElementById('aplayer'),
        //   fixed: true,
        // });
      });
    }

    // // const ap = new APlayer({
    // //   container: document.getElementById('player'),
    // //   mini: false,
    // //   autoplay: false,
    // //   theme: '#FADFA3',
    // //   loop: 'all',
    // //   order: 'random',
    // {
    //   /*  preload: 'auto', */
    // }
    // {
    //   /*  volume: 0.7, */
    // }
    // {
    //   /*  mutex: true, */
    // }
    // {
    //   /*  listFolded: false, */
    // }
    // {
    //   /*  listMaxHeight: 90, */
    // }
    // {
    //   /*  lrcType: 3, */
    // }
    // {
    //   /*  audio: [ */
    // }
    // {
    //   /*    { */
    // }
    // //       title: '半岛铁盒',
    // //       author: '周杰伦',
    // //       url: 'https://echeverra.cn/wp-content/uploads/2022/05/周杰伦-半岛铁盒.mp3',
    // //       pic: 'https://echeverra.cn/wp-content/uploads/2022/05/周杰伦-半岛铁盒-mp3-image.png',
    // //     },
    // //     {
    // //       title: '给我一首歌的时间',
    // //       author: '周杰伦',
    // //       url: 'https://echeverra.cn/wp-content/uploads/2021/06/周杰伦-给我一首歌的时间.mp3',
    // //       pic: 'https://echeverra.cn/wp-content/uploads/2021/06/周杰伦-给我一首歌的时间-mp3-image.png',
    // //     },
    // //   ],
    // // });
  }, [ok]);
  // 分享周杰伦的BB机的歌单《Jay 周杰伦【完美歌单】》https://y.music.163.com/m/playlist?app_version=8.8.70&id=7070399884&userid=430083095&dlt=0846&creatorId=415063370 (@网易云音乐)
  // 分享Zacharyeah的歌单《周杰伦最全歌曲集》https://y.music.163.com/m/playlist?app_version=8.8.70&id=11860849&userid=430083095&dlt=0846&creatorId=3647122 (@网易云音乐)
  // https://i.y.qq.com/n2/m/share/details/taoge.html?hosteuin=NKSz7KCFNeoz&id=8514579953&appversion=111100&ADTAG=wxfshare&appshare=iphone_wx
  return (
    <div>
      {ok && (
        <meting-js
          server="netease"
          type="playlist"
          id="7070399884"
          fixed="true"
          theme="#00266b"
          mini="true"
        />
      )}
    </div>
  );
};

export default APlayerRoot;
