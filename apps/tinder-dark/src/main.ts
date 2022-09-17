import { waitForElem } from '@userscripts/utils';

async function main() {
  const mainElem = await waitForElem<HTMLBodyElement>('.theme-light');

  mainElem.classList.remove('theme-light');
  mainElem.classList.add('theme-dark');

  const emojiPicker = await waitForElem<HTMLDivElement>('.emoji-picker');

  emojiPicker.classList.remove('light');
  emojiPicker.classList.add('dark');
}

main()
  .then(() => {})
  .catch((_err) => {});
