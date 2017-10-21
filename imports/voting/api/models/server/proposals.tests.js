import { describe, it } from 'meteor/practicalmeteor:mocha';
import { assert, expect } from 'meteor/practicalmeteor:chai';
import { sinon } from 'meteor/practicalmeteor:sinon';
import { Factory } from 'meteor/dburles:factory';
import { Random } from 'meteor/random';
import BigNumber from 'bignumber.js';

import { onErc20ContractReceiving } from '/imports/ethereum';
import { Accounts } from '/imports/accounts';
import { Proposals } from '../proposals';
import '../proposals_methods_server';

const message = 'test';
const address = '0xfa491df8780761853d127a9f7b2772d688a0e3b5';
const upVoteSignature = '0xede222564b846a123ed16446fc0bb9e59e8c3df98ac4883870c1ec5ab3220e6a3d98b4cbbbf4009145260966d8944d0514cf2425e2124e6fd5ebdfc3bb777dd01b';
const downVoteSignature = '0x60c105f35e9e7acf17c1da2b1f87882c137736eaf79909e125c954265c0c58165c972e8151371504e130d7114c95ccb7abeba956e6d695d17f8b544a1843b37c1b';

let contract;
onErc20ContractReceiving((c) => { contract = c; });

const stubContract = ({ balanceOf, decimals = 18 }) => {
  sinon.stub(contract, 'balanceOf', () => new BigNumber(balanceOf).shift(decimals));
  sinon.stub(contract, 'decimals', () => new BigNumber(decimals));
};

const restoreContract = () => {
  contract.balanceOf.restore();
  contract.decimals.restore();
};

describe('proposals', () => {
  it('builds correctly from factory', () => {
    const proposal = Factory.create('proposal');
    expect(proposal).to.be.an('object');
    expect(proposal.statement).to.be.an('string');
    expect(proposal.votes).to.be.an('object');
  });

  describe('collection', () => {
    it('updates vote amounts on account balance change', () => {
      const account = Factory.create('account', { balance: 5 });
      const proposal = Factory.create('proposal', {
        upVoteAmount: 5,
        votes: { [account._id]: { upVote: true } },
      });
      Accounts.update(account._id, { $set: { balance: 10 } });
      expect(Proposals.findOne(proposal._id).upVoteAmount).to.equal(10);
    });
  });

  describe('methods', () => {
    describe('proposals.add', () => {
      it('throws exception if signature is wrong', () => {
        expect(() => Meteor.call('proposals.add', 'test', 'test', true, []))
          .to.throw('invalid-signature');
      });

      it('throws exception if no tokens associated with account', () => {
        stubContract({ balanceOf: 0 });
        expect(() => Meteor.call('proposals.add', message, upVoteSignature, true, []))
          .to.throw('no-tokens');
        restoreContract();
      });

      it('allows to create proposal', () => {
        stubContract({ balanceOf: 5 });
        const { accountId, proposalId } =
          Meteor.call('proposals.add', message, upVoteSignature, true, ['technical']);
        restoreContract();
        expect(accountId).to.equal(address);
        const proposal = Proposals.findOne(proposalId);
        expect(proposal).to.be.an('object');
        expect(proposal.statement).to.equal(message);
        expect(proposal.upVoteAmount).to.equal(5);
        expect(proposal.downVoteAmount).to.equal(0);
        expect(proposal.upVoteRatio).to.equal(1);
        expect(proposal.totalVoteAmount).to.equal(5);
        expect(proposal.tags).to.eql(['technical']);
        expect(proposal.votes[address]).to.be.an('object');
        expect(proposal.votes[address].signature).to.equal(upVoteSignature);
        expect(proposal.votes[address].upVote).to.equal(true);
      });
    });

    describe('proposals.vote', () => {
      it('throws exception if proposal not found', () => {
        expect(() => Meteor.call('proposals.vote', Random.id(), 'test', true))
          .to.throw('proposal-not-found');
      });

      it('throws exception if signature is wrong', () => {
        const { _id: proposalId } = Factory.create('proposal');
        expect(() => Meteor.call('proposals.vote', proposalId, 'test', true))
          .to.throw('invalid-signature');
      });

      it('throws exception if no tokens associated with account', () => {
        const { _id: proposalId } = Factory.create('proposal', { statement: message });
        stubContract({ balanceOf: 0 });
        expect(() => Meteor.call('proposals.vote', proposalId, upVoteSignature, true))
          .to.throw('no-tokens');
        restoreContract();
      });

      it('throws exception if already voted with the same vote', () => {
        const { _id: proposalId } = Factory.create('proposal', { statement: message });
        stubContract({ balanceOf: 5 });
        Meteor.call('proposals.vote', proposalId, upVoteSignature, true);
        expect(() => Meteor.call('proposals.vote', proposalId, upVoteSignature, true))
          .to.throw('already-voted');
        restoreContract();
      });

      it('allows to vote', () => {
        const { _id: proposalId, upVoteAmount } =
          Factory.create('proposal', { statement: message });
        stubContract({ balanceOf: 5 });
        Meteor.call('proposals.vote', proposalId, upVoteSignature, true);
        restoreContract();
        const proposal = Proposals.findOne(proposalId);
        expect(proposal.votes[address]).to.be.an('object');
        expect(proposal.votes[address].signature).to.equal(upVoteSignature);
        expect(proposal.votes[address].upVote).to.equal(true);
        expect(proposal.upVoteAmount).to.equal(upVoteAmount + 5);
      });

      it('allows to change the decision', () => {
        const { _id: proposalId, upVoteAmount, downVoteAmount } =
          Factory.create('proposal', { statement: message });
        stubContract({ balanceOf: 5 });
        Meteor.call('proposals.vote', proposalId, upVoteSignature, true);
        Meteor.call('proposals.vote', proposalId, downVoteSignature, false);
        restoreContract();
        const proposal = Proposals.findOne(proposalId);
        expect(proposal.votes[address].upVote).to.equal(false);
        expect(proposal.upVoteAmount).to.equal(upVoteAmount);
        expect(proposal.downVoteAmount).to.equal(downVoteAmount + 5);
      });
    });
  });
});
