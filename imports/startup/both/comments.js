import { Comments } from 'meteor/arkham:comments-ui';

Comments.config({
  publishUserFields: {
    'services.ethereum.id': 1,
  },
  generateUsername: user => (user.services ? user.services.ethereum.id : 'Loading...'),
  sortingOptions: [{ value: 'oldest', label: 'Oldest', sortSpecifier: { createdAt: 1 } }],
});
