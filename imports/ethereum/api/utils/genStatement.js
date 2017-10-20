export const voteStatement = (upVote, statement) =>
  `I ${upVote ? '' : 'dis'}agree that ${statement}`;

export const adminLoginStatement = () =>
  `I want to login the Æternity Voting on ${(new Date()).toISOString()}`;
