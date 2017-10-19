export const voteStatement = (upVote, statement) =>
  `I ${upVote ? '' : 'dis'}agree that ${statement}`;

export const adminLoginStatement = () =>
  `I want to login the Æternity Voting as admin on ${(new Date()).toISOString()}`;
