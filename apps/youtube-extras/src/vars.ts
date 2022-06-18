import { css } from '@emotion/css';
import fwd10Svg from '@material-design-icons/svg/sharp/forward_10.svg';
import fwd30Svg from '@material-design-icons/svg/sharp/forward_30.svg';
import back10Svg from '@material-design-icons/svg/sharp/replay_10.svg';
import back30Svg from '@material-design-icons/svg/sharp/replay_30.svg';

import { type Seeker } from './utils';

interface CustomButton {
  name: string;
  title: string;
  icon: string;
  className?: string[] | string;
  listener: (seeker: Seeker, event: MouseEvent, element: HTMLButtonElement) => void;
}

const generateButtons = <T extends string>(buttons: Record<T, CustomButton[]>) => buttons;

const selectorSingle =
  <T extends Element = Element, A extends boolean = true>(selector: string) =>
  () =>
    document.querySelector<T>(selector) as A extends true ? T : T | null;

const selectorMultiple =
  <T extends Element = Element>(selector: string) =>
  () =>
    document.querySelectorAll<T>(selector);

export const styles = {
  buttonArea: css({
    flex: 'unset',
  }),
  buttonContainer: css`
    flex: initial;
    justify-content: space-between;

    & > .ytd-player {
      flex: initial !important;
    }
  `,
  centerButtons: css`
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  `,
  centerButton: css`
    &&& {
      padding-left: 0;
      padding-right: 0;

      &:first-child,
      &:last-child {
        margin: 0 -5px;
      }
    }

    .ytp-big-mode {
      & :nth-child(2) {
        margin-right: 1rem;
      }

      & :nth-child(3) {
        margin-left: 1rem;
      }
    }
  `,
  buttonIcon: css`
    fill: white;
    height: 50;
    width: 50;
  `,
} as const;

export const selectors = {
  buttonContainer: selectorSingle<HTMLDivElement>('.ytp-chrome-controls'),
  buttonAreas: selectorMultiple<HTMLDivElement>('.ytp-chrome-controls > .ytd-player'),
  centerButtons: selectorSingle<HTMLDivElement, false>(styles.centerButtons),
} as const;

export const buttons = generateButtons({
  center: [
    {
      name: 'back30',
      title: 'Rewind 10 seconds',
      icon: back30Svg,
      listener: (seeker) => seeker.back(30),
    },
    {
      name: 'back10',
      title: 'Rewind 10 seconds',
      icon: back10Svg,
      listener: (seeker) => seeker.back(10),
    },
    {
      name: 'fwd10',
      title: 'Forward 10 seconds',
      icon: fwd10Svg,
      listener: (seeker) => seeker.forward(10),
    },
    {
      name: 'fwd30',
      title: 'Forward 30 seconds',
      icon: fwd30Svg,
      listener: (seeker) => seeker.forward(30),
    },
  ],
});
