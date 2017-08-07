import { describe, it } from 'meteor/practicalmeteor:mocha';
import { assert, expect } from 'meteor/practicalmeteor:chai';
import { sinon } from 'meteor/practicalmeteor:sinon';
import { Factory } from 'meteor/dburles:factory';
import { Random } from 'meteor/random';

import { onErc20ContractReceiving } from '/imports/ethereum';
import { Accounts } from '../../accounts/accounts';
import { Proposals } from '../proposals';
import './methods';

const message = 'test';
const address = '0xfA491DF8780761853D127A9f7b2772D688A0E3B5';
const signature = '0x5114be20852022069b61b73ddc3becf3995d7373076c0cd99e6ca7b44883f15b7c088d88c2a1e8e968454c9a6270ca92a973c1a72c8c5c90079371b1ba823c931c';

let contract;
onErc20ContractReceiving((c) => { contract = c; });

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
    describe('proposals.vote', () => {
      it('throws exception if proposal not found', () => {
        expect(() => Meteor.call('proposals.vote', Random.id(), 'test', true))
          .to.throw('Proposal not found');
      });

      it('throws exception if signature is wrong', () => {
        const { _id: proposalId } = Factory.create('proposal');
        expect(() => Meteor.call('proposals.vote', proposalId, 'test', true))
          .to.throw('Something wrong with signature');
      });

      it('throws exception if no tokens associated with account', () => {
        const { _id: proposalId } = Factory.create('proposal', { statement: message });
        sinon.stub(contract, 'balanceOf', () => 0);
        expect(() => Meteor.call('proposals.vote', proposalId, signature, true))
          .to.throw('You do not have aeternity tokens');
        contract.balanceOf.restore();
      });

      it('throws exception if already voted with the same vote', () => {
        const { _id: proposalId } = Factory.create('proposal', { statement: message });
        sinon.stub(contract, 'balanceOf', () => 5);
        Meteor.call('proposals.vote', proposalId, signature, true);
        expect(() => Meteor.call('proposals.vote', proposalId, signature, true))
          .to.throw('Already voted in this proposal');
        contract.balanceOf.restore();
      });

      it('allows to vote', () => {
        const { _id: proposalId, upVoteAmount } =
          Factory.create('proposal', { statement: message });
        sinon.stub(contract, 'balanceOf', () => 5);
        Meteor.call('proposals.vote', proposalId, signature, true);
        contract.balanceOf.restore();
        const proposal = Proposals.findOne(proposalId);
        expect(proposal.votes[address]).to.be.an('object');
        expect(proposal.votes[address].signature).to.equal(signature);
        expect(proposal.votes[address].upVote).to.equal(true);
        expect(proposal.upVoteAmount).to.equal(upVoteAmount + 5);
      });

      it('allows to change the decision', () => {
        const { _id: proposalId, upVoteAmount, downVoteAmount } =
          Factory.create('proposal', { statement: message });
        sinon.stub(contract, 'balanceOf', () => 5);
        Meteor.call('proposals.vote', proposalId, signature, true);
        Meteor.call('proposals.vote', proposalId, signature, false);
        contract.balanceOf.restore();
        const proposal = Proposals.findOne(proposalId);
        expect(proposal.votes[address].upVote).to.equal(false);
        expect(proposal.upVoteAmount).to.equal(upVoteAmount);
        expect(proposal.downVoteAmount).to.equal(downVoteAmount + 5);
      });
    });
  });
});
