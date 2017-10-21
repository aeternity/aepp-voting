import { Comments } from 'meteor/arkham:comments-ui';

import '../comments';

Comments.ui.config({
  limit: 1000,
});

Comments.ui.setContent({
  'placeholder-textarea': 'Your comment...',
});
