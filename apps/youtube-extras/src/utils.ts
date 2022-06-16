import type { O as Obj } from 'ts-toolbelt';
import type { YT } from 'youtube';

export type RemoveFunctionKeys<T> = Omit<
  T,
  {
    [K in keyof T]: T[K] extends (...args: any) => any ? K : never;
  }[keyof T]
>;

export type WriteableProperties<T extends Record<PropertyKey, any>> =
  RemoveFunctionKeys<Pick<T, Obj.WritableKeys<T>>>;

export const setElementProperties = <T extends Element>(
  element: T,
  properties: Partial<WriteableProperties<T>>
): T => Object.assign(element, properties);

export const setAttributes = <T extends Element>(
  element: T,
  properties: Record<string, string>
) => {
  Object.entries(properties).forEach(([attribute, value]) =>
    element.setAttribute(attribute, value)
  );
};

export const waitForElem = <T extends Element = Element>(selector: string) =>
  new Promise<T>((resolve) => {
    const getElem = () => document.querySelector<T>(selector);
    const elem = getElem();
    if (elem) resolve(elem);

    const observer = new MutationObserver(() => {
      const observedElem = getElem();
      if (observedElem) {
        resolve(observedElem);
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });

export interface YouTubePlayer
  extends HTMLDivElement,
    Omit<YT.Player, 'addEventListener' | 'removeEventListener'> {}

export const elemFromString = <T extends Element = Element>(str: string): T =>
  new DOMParser().parseFromString(str, 'text/html').body.childNodes[0] as T;

export class Seeker {
  constructor(public player: YouTubePlayer) {}

  forward(time: number) {
    const currentTime = this.player.getCurrentTime();
    this.player.seekTo(Math.min(this.player.getDuration(), currentTime + time));
  }

  back(time: number) {
    const currentTime = this.player.getCurrentTime();
    this.player.seekTo(Math.max(0, currentTime - time));
  }
}

export const modifySvg = (svg: string) =>
  svg.replace(/(?:width|height)=".*?"/g, '');
