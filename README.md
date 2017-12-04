# Æternity voting app

### Overview


The voting app is deployed at [vote.aepps.com](https://vote.aepps.com/). The voting app helps to get feedback from the community about ongoing topics.

A user which holds AE tokens can up or down vote a statement by signing with his ETH account, where he holds his AE tokens. He can use myetherwallet or Metamask for signing. The voting weight is equal to his share in the total distributed AE tokens. 

A user can also create a new statement (also with signature) and comment on statments (for this you login by signing a login message).

The votes are constantly updated. So if a user sends his tokens to a different address, this is detetected and only the currently hold amount is counted.

Have fun voting! 

![Screenshot](https://i.imgur.com/GWDNsix.png)



### Features wanted for the future:
- Questions with several options to vote on (and even add your own). So the community can answer not only yes/no questions though also open questions like "what is the best option?"



## Tech stack

Core technologies are:
* Vue.js as a front-end framework
* Meteor.js as a backend and a build tool
* MongoDB - database

## Getting the project running

### Installing

```sh
$ meteor npm install
```

### Running

```sh
$ npm start
```

### Vue components
We use file components. A single SomeFile.vue files that contain markup, styles and logic

### VueX
VueX is a kind of a flux architecture for Vue. Basic principles:
* keep the client-side state out of the components. It should be contained in a special reactive states in VueX stores
* no direct store mutations from the components. You should dispatch (commit) actions (here mutations), and the actual logic should happen in a VueX store
That helps to keep logic separate from presentation, encapsulates apps client-side business logic into centralized blocks and
makes an apps code much more transparent and easy to maintain, especially when an app gets larger.

### Styling

'SCSS' pre-processor is used. Styles are contained directly inside vue component files.
Common style files like fonts, mixins and variables and in `/imports/core/ui/styles` folder. They should be explicitly imported inside vue components.
Basic styles should be imported or defined inside top some level component (in our case - MainLayout.vue)

## Project Structure

* "client" and "server" folders are loaded on the client and server respectively
* "lib" folders are loaded first
* "imports" folder holds all the main app's logic, divided into modules

Each top-level feature should be contained in a related module.

Basic module structure:

```
.
+-- moduleName/
|   +-- api/    - logic layer
|   |   +-- store/   - vuex store. all the client side logic, includung actions and state mutation should happen here and only here
|   |   |   +-- module_store.js
|   |   |   models/   - db collection related models
|   |   |   +-- collectionName.js
|   |   |   +-- collectionName_methods.js
|   |   |   +-- collectionName_pubs.js
|   |   |   +-- collectionName_hooks.js
|   |   +-- methods/   - methods, not related to some model
|   |   +-- static/    - static data
|   |   +-- utils/     - utils and helper methods
|   +-- startup/   - some initialization logic
|   |   +-- client/
|   |   +-- server/
|   +-- ui/   - view layer
|   |   +-- layouts/    - components that contain pages
|   |   +-- pages/      - components that have a corresponding route
|   |   +-- components/ - components that are first level building blocks for pages
|   |   +-- particles/  - components that are particles for another components

```

There is a special module called `core`.
It holds app initialization logic, routes, core vuex store and features, shared by other modules.
Holds top level app components like "MainLayout".
Think of in as a master module, and of all the other modules as sub-modules.

It's not mandatory that a module should contain all the specified folders.
There can be presentational only modules or api only modules.

### General structure

```
.
+-- app/
|   +-- client/
|   |   +-- main.html   -   main html entry
|   |   +-- main.js     -   main client entry. generally used to import startup/client from the 'core' module.
|   +-- i18n/
|   +-- imports/
|   |   +-- core/
|   |   +-- someModule/
|   |   +-- someOtherModule/
|   +-- lib/            - loaded first
|   +-- public/
|   |   +-- fonts/
|   |   +-- images/
|   +-- server/
|   |   +-- main.js     - main server entry. generally used to import startup/server from the 'core' module.

```
