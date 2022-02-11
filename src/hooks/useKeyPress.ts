// https://github.com/isxiaoxin/front_end_wheel/tree/master/hooks/useKeyPress

import { useCallback, useEffect, MutableRefObject } from 'react';

type KeyType = KeyboardEvent['keyCode'] | KeyboardEvent['key'];
type KeyFilter = KeyType | Array<KeyType>;
type EventHandler = (event: KeyboardEvent) => void;
type keyEvent = 'keydown' | 'keyup';
type BasicElement = HTMLElement | Element | Document | Window;
type TargetElement = BasicElement | MutableRefObject<null | undefined>;
type EventOptions = {
  events?: Array<keyEvent>;
  target?: TargetElement;
};

const modifierKey: Record<string, (event: KeyboardEvent) => boolean> = {
  ctrl: (event: KeyboardEvent) => event.ctrlKey,
  shift: (event: KeyboardEvent) => event.shiftKey,
  alt: (event: KeyboardEvent) => event.altKey,
  meta: (event: KeyboardEvent) => event.metaKey,
};

const defaultEvents: Array<keyEvent> = ['keydown'];

/**
 * 判断对象类型
 * @param obj 参数对象
 * @returns String
 */
function isType<T>(obj: T): string {
  return Object.prototype.toString
    .call(obj)
    .replace(/^\[object (.+)\]$/, '$1')
    .toLowerCase();
}

/**
 * 获取当前元素
 * @param target TargetElement
 * @param defaultElement 默认绑定的元素
 */
function getTargetElement(
  target?: TargetElement,
  defaultElement?: BasicElement,
) {
  if (!target) {
    return defaultElement;
  }

  if ('current' in target) {
    return target.current;
  }

  return target;
}

/**
 * 按键是否激活
 * @param event 键盘事件
 * @param keyFilter 当前键
 */
const keyActivated = (event: KeyboardEvent, keyFilter: KeyFilter) => {
  const type = isType(keyFilter);
  const { keyCode } = event;

  if (type === 'number') {
    return keyCode === keyFilter;
  }

  if (type === 'string') {
    const keyCodeArr = (keyFilter as string).split(' ');
    // 符合条件的长度
    let genLen = 0;
    // 组合键

    keyCodeArr.forEach((key: string) => {
      const genModifier = modifierKey[key];
      if ((genModifier && genModifier(event)) || `${keyCode}` === key) {
        genLen += 1;
      }
    });

    return genLen === keyCodeArr.length;
  }

  return false;
};

/**
 * 键盘按下预处理方法
 * @param event 键盘事件
 * @param keyFilter 键码集
 */
const genKeyFormate = (event: KeyboardEvent, keyFilter: KeyFilter) => {
  const type = isType(keyFilter);

  if (type === 'string' || type === 'number') {
    return keyActivated(event, keyFilter as KeyType);
  }

  // 多个键
  if (type === 'array') {
    const temp = (keyFilter as KeyType[]).some((item: KeyType) =>
      keyActivated(event, item),
    );
    // console.log('temp');
    // console.log(temp);
    return temp;
  }

  return false;
};

/**
 * 监听键盘按下/松开
 * @param keyCode
 * @param eventHandler
 * @param options
 */
const useKeyPress = (
  keyCode: KeyFilter,
  eventHandler?: EventHandler,
  options: EventOptions = {},
) => {
  const { target, events = defaultEvents } = options;

  const callbackHandler = useCallback(
    (event) => {
      const sss = genKeyFormate(event, keyCode);
      // console.log('sss');
      // console.log(sss);

      if (sss) {
        // console.log('-----');
        if (typeof eventHandler === 'function') {
          eventHandler(event);
        }
      }
    },
    [keyCode, eventHandler],
  );

  useEffect(() => {
    const el = getTargetElement(target, window)!;
    // console.log('el');
    // console.log(el);

    events.forEach((eventName) => {
      el.addEventListener(eventName, callbackHandler);
    });

    return () => {
      events.forEach((eventName) => {
        el.removeEventListener(eventName, callbackHandler);
      });
    };
  }, [target, keyCode, events, callbackHandler]);
};

export default useKeyPress;
