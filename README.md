# IPFS Encrypted Journal

Stores markdown entries to IPFS

## UI
Using styled-elements for static layout and easy styling

## Security
Entries are encrypted by Keybase's TripleSec lib. The encryption key is the sha2 (TODO finalize if we want to use sha2) hash of the data to be encrypted.
The encryption key is then stored locally and used later on retrieve.

## Deployment
All static assets hosted on ipfs
