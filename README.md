# Encrypted Journal

Will store encrypted markdown entries to IPFS. Currently shows a markdown editor and preview.

## UI
Using styled-elements for static layout and easy styling

## Security
// TODO None of this is implemented

Entries are encrypted by Keybase's TripleSec lib. The encryption key is the sha2 hash (TODO finalize if I want to use sha2) of the data to be encrypted.
The encryption key is then stored locally and used later on retrieve.

## Deployment
All static assets to be hosted on ipfs. Using [ipscend](https://github.com/diasdavid/ipscend) to ease the process.

## TODO
* keep list of all posted entries
* publish markdown entries to ipfs using js-ipfs in the browser
* encryption of notes using one-time keys
