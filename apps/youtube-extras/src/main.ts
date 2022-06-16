import fwd10Svg from '@material-design-icons/svg/sharp/forward_10.svg';
import fwd30Svg from '@material-design-icons/svg/sharp/forward_30.svg';
import back10Svg from '@material-design-icons/svg/sharp/rewind_10.svg';
import back30Svg from '@material-design-icons/svg/sharp/rewind_30.svg';
import {
  elemFromString,
  modifySvg,
  Seeker,
  setElementProperties,
  waitForElem,
  type YouTubePlayer,
} from './utils';

const addButtons = (seeker: Seeker) => {
  const rightButtons = document.querySelector<HTMLDivElement>(
    '.ytp-right-controls'
  );

  const [fwd10, back10, fwd30, back30] = [
    fwd10Svg,
    back10Svg,
    fwd30Svg,
    back30Svg,
  ].map((svg) => {
    const btn = setElementProperties(document.createElement('button'), {
      className: 'ytp-button',
    });
    const svgElem = elemFromString<SVGSVGElement>(modifySvg(svg));
    svgElem.classList.add('style-scope', 'ytd-player');
    svgElem.prepend(
      elemFromString(
        '<use class="ytp-svg-shadow style-scope ytd-player"></use>'
      )
    );
    svgElem.style.fill = 'white';
    svgElem.style.height = '50';
    svgElem.style.width = '50';
    svgElem.setAttribute('viewBox', '-6 -7 40 40');

    btn.appendChild(svgElem);
    return btn;
  });

  back10.addEventListener('click', () => seeker.back(10));
  fwd10.addEventListener('click', () => seeker.forward(10));
  back30.addEventListener('click', () => seeker.back(30));
  fwd30.addEventListener('click', () => seeker.forward(30));

  rightButtons?.prepend(back10, fwd10, back30, fwd30);
};

async function main() {
  const player = await waitForElem<YouTubePlayer>('#movie_player');
  const seeker = new Seeker(player);

  addButtons(seeker);
}

console.log('YOUTUBE EXTRAS SCRIPT');

main()
  .then(() => console.log('Running youtube extras!'))
  .catch((err) => console.log('Youtube extras sad :( ', err));
