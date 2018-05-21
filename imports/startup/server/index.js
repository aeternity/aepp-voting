import { init } from './tokenContract';

init()
  .then(() => import('./register'))
  .catch((error) => {
    console.error(error); // eslint-disable-line no-console
    process.exit(1);
  });
