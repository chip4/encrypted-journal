# Md Editor [WIP]

First project with choo. Currently shows a markdown editor and preview.

## UI
Using [choo framework](https://github.com/choojs/choo) with [styled-elements](https://github.com/styled-components/styled-elements) for layoout/styling. [Nanocomponents](https://github.com/choojs/nanocomponent) is used to wrap [Code Mirror](http://codemirror.net/) and handle its internal state. [W3.CSS](https://www.w3schools.com/w3css/default.asp) is used as base stylesheet.

## Deployment
All static assets to be hosted on ipfs. Using [ipscend](https://github.com/diasdavid/ipscend) to ease the process.

## TODO
* keep list of all posted entries
* publish markdown entries to ipfs using js-ipfs in the browser
* encryption of notes using one-time keys
* refactor the w3schools toggle switch into its own module
