import { describe, it } from 'meteor/practicalmeteor:mocha';
import { expect } from 'meteor/practicalmeteor:chai';

import { getEthereumAddress } from '../signature';
import { voteStatement } from '../genStatement';

describe('getEthereumAddress', () => {
  const address = '0xfa491df8780761853d127a9f7b2772d688a0e3b5';

  it('correct process signatures', () => {
    const statement = 'test';
    const upVoteSignature = '0xede222564b846a123ed16446fc0bb9e59e8c3df98ac4883870c1ec5ab3220e6a3d98b4cbbbf4009145260966d8944d0514cf2425e2124e6fd5ebdfc3bb777dd01b';
    const downVoteSignature = '0x60c105f35e9e7acf17c1da2b1f87882c137736eaf79909e125c954265c0c58165c972e8151371504e130d7114c95ccb7abeba956e6d695d17f8b544a1843b37c1b';

    expect(getEthereumAddress(voteStatement(true, statement), upVoteSignature)).to.equal(address);
    expect(getEthereumAddress(voteStatement(false, statement), downVoteSignature)).to.equal(address);
  });

  it('correct process signatures with non-ASCII chars', () => {
    const statement = 'тест';
    const upVoteSignature = '0xfe81406e7dc7de1b0b9c1857fdb7b18209bba9c45b329c5b6cca4cf67c73d9c801fbb08453bb7ce85f7c4ea1340962adfd544c7757feafa5ba269291ce18a7261b';
    const downVoteSignature = '0x59baa2616675b31ab207d4aa2005d0b14262b505fa2701340000d59abf3384533094457851f7e9175ad2c5c0765a8a6b0254fae4964fdb274a2781089fe540281c';

    expect(getEthereumAddress(voteStatement(true, statement), upVoteSignature)).to.equal(address);
    expect(getEthereumAddress(voteStatement(false, statement), downVoteSignature)).to.equal(address);
  });
});
