# GitHub Store

GitHub Store is a small pseudo app created by Janos Szathmary,  as a part of the interview process at Scalable Capital.

The purpose of this app is to test the skills of the candidate.

__GitHub Store was tested with the following GitHub users: facebook, ScaCap__

## List of the used ECMA6 features
* __arrow functions__ used almost everywhere
  * For scope safeness (this keyword), compactness and clarity
  
* __spread operator__ as the shorter version of Object.assign()
  * This is needed to avoid mutation in the Redux store, it's used everywhere in the reducers
  
* __string interpolation__  used for easy variable replacement in Strings
  * For example in the __commitActions__'s __initCommitsForRepo__ function

* __const__ used almost everywhere
  * To avoid mutations and better scoping
  
* __destructuring assignment__ for better readability
  * Used for getting properties from __props__ for example in __RepoListView__ class

* and many more... like __class definition__, __import/export__, __async/await__

## Usefull npm/yarn commands

### To install the dependencies
```
yarn install
```

### To start the application
```
yarn start
```

### To run tests
```
yarn test
```

## Limitations

### Searching for commits
Searching for commits in forked repos is not allowed, even GitHub itself can't do that.

For example __Bubble-Picker__ is a forked repository in ScaCap: https://github.com/ScaCap/Bubble-Picker

Searching for __"Merge"__ does not give you any results:

https://github.com/ScaCap/Bubble-Picker/search?q=Merge&type=Commits&utf8=%E2%9C%93


### Using the GitHub API
Please keep in mind the GitHub API's rate-limitation rule: You can only do 60 requests/hour anonymously.

Source: https://developer.github.com/v3/#rate-limiting

## What else could have been done
* Add localizations (for example react-i18next) instead of hardcoded values
* Implement more tests
* Give feedback for the user if an error happens
* Use nice loaders during back-end calls (for example spinning icons)
* Improve overall design

## License
GitHub Store is an Open Source software released under the [Apache 2.0 license](http://www.apache.org/licenses/LICENSE-2.0.html).





