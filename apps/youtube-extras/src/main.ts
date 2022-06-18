import { makeArray, setElementProperties, waitForElem } from '@userscripts/utils';
import { elemFromString, modifySvg, Seeker, type YouTubePlayer } from './utils';
import { styles, selectors, buttons } from './vars';

const addButtons = (seeker: Seeker) => {
  const buttonContainer = selectors.buttonContainer();

  const centerArea = document.createElement('div');
  centerArea.classList.add(styles.centerButtons, 'style-scope', 'ytd-player');

  const centerButtons = buttons.center.map(({ listener, className = [], icon, title, name }) => {
    const button = setElementProperties(document.createElement('button'), {
      className: [...makeArray(className), 'ytp-button', styles.centerButton].join(' '),
      ariaLabel: title,
      title,
      id: `center-btn-${name}`,
    });

    const svg = elemFromString<SVGSVGElement>(modifySvg(icon));
    svg.classList.add('style-scope', 'ytd-player', styles.buttonIcon);
    svg.prepend(elemFromString('<use class="ytp-svg-shadow style-scope ytd-player"></use>'));
    svg.setAttribute('viewBox', '-6 -7 37 37');

    button.appendChild(svg);
    button.addEventListener('click', function (event) {
      listener(seeker, event, this);
    });

    return button;
  });

  centerArea.prepend(...centerButtons);
  buttonContainer.children[0].insertAdjacentElement('afterend', centerArea);
};

async function main() {
  const player = await waitForElem<YouTubePlayer>('#movie_player');
  const seeker = new Seeker(player);

  selectors.buttonContainer().classList.add(styles.buttonContainer);

  addButtons(seeker);
}

main()
  .then(() => {})
  .catch((_err) => {});
