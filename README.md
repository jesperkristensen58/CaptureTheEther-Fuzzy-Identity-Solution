<h1>Solution to the Capture The Ether Fuzzy Identity Challenge</h1>

This repo solves the fuzzy identity challenge: https://capturetheether.com/challenges/accounts/fuzzy-identity/

To solve this, please call:

```
> yarn
> npx hardhat test
```

The solution is coded up under `test/HackIt.js`.

You will see a commented out section which was used to find the nonce that gave the Hack contract the address containing the substring `badc0de`.
I found this after 300 million tries (ran it overnight and it was ready in the morning).

## Contact
[![Twitter URL](https://img.shields.io/twitter/url/https/twitter.com/cryptojesperk.svg?style=social&label=Follow%20%40cryptojesperk)](https://twitter.com/cryptojesperk)


## License
This project uses the following license: [MIT](https://github.com/bisguzar/twitter-scraper/blob/master/LICENSE).
