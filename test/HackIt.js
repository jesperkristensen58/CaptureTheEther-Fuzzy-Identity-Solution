/**
 * @notice Solve the Fuzzy Identity Challenge: https://capturetheether.com/challenges/accounts/fuzzy-identity/
 * @author Jesper Kristensen (@cryptojesperk)
 */
const {expect} = require('chai');
const {ethers, upgrades} = require('hardhat');
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe('Solve the Fuzzy Identity Challenge', function() {
  
  async function deployFixture() {
    [badcoder, hackooor] = await ethers.getSigners();

    // deploy the token
    const Challenge = await ethers.getContractFactory("FuzzyIdentityChallenge");
    challenge = await Challenge.connect(badcoder).deploy();
    await challenge.deployed();
    console.log("Challenge Contract address:", challenge.address);

    return { challenge, badcoder, hackooor };
  }

  it('Should solve the challenge', async () => {
    const { challenge, badcoder, hackooor } = await loadFixture(deployFixture);

    // make sure the challenge is deployed
    expect(await challenge.address).to.not.be.null;
    expect(await challenge.address).to.be.properAddress;

    let from = await hackooor.address;

    let nonce = 318142985; // found by trial and error below (uncomment to find again and set this to 0):
    // so it took ~300 million tries to find.
    // this nonce gives the hack contract the address: 0x347badc0deC708fE48155b6c2d55127538084667

    /* FIND THE NONCE */
    // // CODE FOR MINING THE NONCE GIVING THE "0xadc0de" start for the contract address:
    // let nonce = 0;
    // console.time();
    // let nonce = 0;
    // while (true) {
    //   let res = await ethers.utils.getContractAddress({ from, nonce });
    //   if(res.includes('badc0de')) {
    //     break;
    //   }
    //   if (nonce % 1000000 == 0) {
    //     console.log(nonce);
    //     console.log(res);
    //   }
    //   nonce += 1;
    // }
    // console.log(nonce);
    // console.time();
    /* DONE */

    // set the found nonce of the hackooor
    await network.provider.send("hardhat_setNonce", [
      from,
      "0x" + nonce.toString(16)
    ]);

    // deploy the hacker contract
    let Hack = await ethers.getContractFactory("Hack");
    let hack = await Hack.connect(hackooor).deploy(); // hacker deploys this
    await hack.deployed();
    console.log("Hack Contract address:", hack.address); // confirm it starts iwth "0xadc0de" 

    // and hack the puzzle!
    let tx = await hack.hackIt(challenge.address);
    await tx.wait();
  });
});
