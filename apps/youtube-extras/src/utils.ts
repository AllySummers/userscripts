import type { YT } from 'youtube';

export const elemFromString = <T extends Element = Element>(str: string): T =>
  new DOMParser().parseFromString(str, 'text/html').body.childNodes[0] as T;

export interface YouTubePlayer
  extends HTMLDivElement,
    Omit<YT.Player, 'addEventListener' | 'removeEventListener'> {}
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

export const modifySvg = (svg: string) => svg.replace(/(?:width|height)=".*?"/g, '');
