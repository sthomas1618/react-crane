/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved, import/extensions */

import { addDecorator, configure } from '@storybook/react';
import { checkA11y } from '@storybook/addon-a11y'

addDecorator(checkA11y)

function loadStories() {
  require('../stories');
}

configure(loadStories, module);
