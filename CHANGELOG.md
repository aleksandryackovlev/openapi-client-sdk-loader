# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [2.0.3](https://github.com/aleksandryackovlev/openapi-client-sdk-loader/compare/v2.0.2...v2.0.3) (2020-01-29)


### Bug Fixes

* **templates:** add application/hal+json handling ([c86666b](https://github.com/aleksandryackovlev/openapi-client-sdk-loader/commit/c86666b09d8988edc7f4996c6ff9b973a0ecfde6))

### [2.0.2](https://github.com/aleksandryackovlev/openapi-client-sdk-loader/compare/v2.0.1...v2.0.2) (2020-01-26)

### [2.0.1](https://github.com/aleksandryackovlev/openapi-client-sdk-loader/compare/v2.0.0...v2.0.1) (2020-01-24)

## [2.0.0](https://github.com/aleksandryackovlev/openapi-client-sdk-loader/compare/v1.0.0...v2.0.0) (2020-01-23)


### ⚠ BREAKING CHANGES

* **js-template:** parameter data now should be a plain object for content types multipart/formdata
and application/x-www-form-urlencoded

### Features

* **js-template:** handle different types of requests ([1dc4934](https://github.com/aleksandryackovlev/openapi-client-sdk-loader/commit/1dc49346b344383f695549e4d9b4b2fe567e1b00))
* **ts-template:** handle different types of requests ([6204441](https://github.com/aleksandryackovlev/openapi-client-sdk-loader/commit/62044418400efbfa4d68ea1983a2d451664b7401))


### Bug Fixes

* **compile:** convert string type with binary format into object for schema validation ([950b94a](https://github.com/aleksandryackovlev/openapi-client-sdk-loader/commit/950b94a6d2bcb240cb8a3b33c5e91f77d8c4f3d8))

## [1.0.0](https://github.com/aleksandryackovlev/openapi-client-sdk-loader/compare/v0.3.0...v1.0.0) (2020-01-21)


### ⚠ BREAKING CHANGES

* **ts-template:** instead of returning of one response of particular type now every operation returns
json, text and raw responses

### Features

* **js-template:** change the response shape ([5aab85f](https://github.com/aleksandryackovlev/openapi-client-sdk-loader/commit/5aab85f87c445a4d7fb1fc8f1b1e84d6e6ddf8ab))
* **js-template:** handle multiply types of responses ([7e3871d](https://github.com/aleksandryackovlev/openapi-client-sdk-loader/commit/7e3871d859805216a25c919e36cb93c560586c02))
* **templates:** handle charsets in requests' content types ([5f4d991](https://github.com/aleksandryackovlev/openapi-client-sdk-loader/commit/5f4d991268639094c48f993ec592de2f7c15e3aa))
* **ts-template:** add json, text and raw responses to operations ([0844b52](https://github.com/aleksandryackovlev/openapi-client-sdk-loader/commit/0844b5228f503af224d1b11564d07955dca538b2))
* **ts-template:** handle multiple status codes in responses ([be3995c](https://github.com/aleksandryackovlev/openapi-client-sdk-loader/commit/be3995c56ba816725fe7de641a6c6fa492d45032))


### Bug Fixes

* **ts-template:** fix the error with the calling text and json on the body ([a0ed189](https://github.com/aleksandryackovlev/openapi-client-sdk-loader/commit/a0ed1896425441aebfc73743ad95ce07d2ec6fde))
* **ts-template:** fix the shape of the request ([7450605](https://github.com/aleksandryackovlev/openapi-client-sdk-loader/commit/7450605b8361203894d85d63311720e535520d5b))

## [0.3.0](https://github.com/aleksandryackovlev/openapi-client-sdk-loader/compare/v0.2.6...v0.3.0) (2020-01-12)


### Features

* **loader:** add baseUrl option to the loader ([f55bdc4](https://github.com/aleksandryackovlev/openapi-client-sdk-loader/commit/f55bdc4230e7e621eabc8eca7d70eed7c87455c7))
* **loader:** make multifile docs watchable ([ecfc972](https://github.com/aleksandryackovlev/openapi-client-sdk-loader/commit/ecfc97240232ca485380f245060c60de4c1f2eae))

### [0.2.6](https://github.com/aleksandryackovlev/openapi-client-sdk-loader/compare/v0.2.5...v0.2.6) (2020-01-11)


### Features

* **compile:** make application/json content type default for requests ([5e781c6](https://github.com/aleksandryackovlev/openapi-client-sdk-loader/commit/5e781c6886544c03f3361ab8789d8ad01564bf3f))

### [0.2.5](https://github.com/aleksandryackovlev/openapi-client-sdk-loader/compare/v0.2.4...v0.2.5) (2020-01-05)

### [0.2.4](https://github.com/aleksandryackovlev/openapi-client-sdk-loader/compare/v0.2.3...v0.2.4) (2020-01-05)

### [0.2.3](https://github.com/aleksandryackovlev/openapi-client-sdk-loader/compare/v0.2.2...v0.2.3) (2020-01-05)

### [0.2.2](https://github.com/aleksandryackovlev/openapi-client-sdk-loader/compare/v0.2.1...v0.2.2) (2020-01-05)

### [0.2.1](https://github.com/aleksandryackovlev/openapi-client-sdk-loader/compare/v0.2.0...v0.2.1) (2020-01-05)


### Bug Fixes

* **dependencies:** move prettier from dev dependencies to production ones ([ecfae8e](https://github.com/aleksandryackovlev/openapi-client-sdk-loader/commit/ecfae8e26a5498357a6cfc0d9ebe4a3b365276eb))

## [0.2.0](https://github.com/aleksandryackovlev/openapi-client-sdk-loader/compare/v0.1.1...v0.2.0) (2020-01-04)


### Features

* **compile:** add js compiler ([72a137d](https://github.com/aleksandryackovlev/openapi-client-sdk-loader/commit/72a137dbf3ea370bc84b71a8368e0ebc8a1b7eb6))
* **template:** generate js code from swagger ([812a52c](https://github.com/aleksandryackovlev/openapi-client-sdk-loader/commit/812a52c5eb211a4ceec5a80a61d678f943f20a2d))


### Bug Fixes

* **options:** change templates depending on compiler name ([39a1e86](https://github.com/aleksandryackovlev/openapi-client-sdk-loader/commit/39a1e86a7e394064a01ad03ae81326d23d67597c))

### [0.1.1](https://github.com/aleksandryackovlev/openapi-client-sdk-loader/compare/v0.1.0...v0.1.1) (2020-01-01)

## [0.1.0](https://github.com/aleksandryackovlev/openapi-client-sdk-loader/compare/v0.0.2...v0.1.0) (2020-01-01)


### Features

* **compile:** add operations interfaces during compilation ([fa8193b](https://github.com/aleksandryackovlev/openapi-client-sdk-loader/commit/fa8193bdf269ffb2354680cdbd1d9c897426680d))
* **compile:** add options for conditional skipping of invalid swagger files ([9cc08f8](https://github.com/aleksandryackovlev/openapi-client-sdk-loader/commit/9cc08f8b0e14644f2f08bd88b9a4b2bfeac492d8))
* **compile:** compile interfaces for request bodies ([73e6d19](https://github.com/aleksandryackovlev/openapi-client-sdk-loader/commit/73e6d195a77424d8882a2ec138b8d3cb17cf0faa))
* **compile:** compile response models and interfaces in the ts compiler ([b46b143](https://github.com/aleksandryackovlev/openapi-client-sdk-loader/commit/b46b1431caf431694f9b4fb3901b891d3efcb36b))
* **compile:** compile server info in the ts compiler ([86f405f](https://github.com/aleksandryackovlev/openapi-client-sdk-loader/commit/86f405f9eba01f720dc60383a70e4b2d08bba58c))
* **compile:** generate operations from the api object ([9afd403](https://github.com/aleksandryackovlev/openapi-client-sdk-loader/commit/9afd403585e52b8388876374bbf769882acafc80))
* **compile:** obtain operations info from the swagger object in the compile function ([174ae27](https://github.com/aleksandryackovlev/openapi-client-sdk-loader/commit/174ae27e845c776bc4eab9d4792f52cf72b93aa7))
* **compile:** prepare secureScemes for operations during compilation ([ccfd681](https://github.com/aleksandryackovlev/openapi-client-sdk-loader/commit/ccfd6813ac27d45e84cf57de5b01361d817f3ae0))
* **config:** add options for formatting the output ([829aa43](https://github.com/aleksandryackovlev/openapi-client-sdk-loader/commit/829aa43b944ea663f1e7b6650b4a264e21286cad))
* **template:** show response models and server info in the ts template ([c7b1448](https://github.com/aleksandryackovlev/openapi-client-sdk-loader/commit/c7b1448c9bdcfcb0bc31c777abab454f9749f525))
* **templates:** add ajv errors props to validation errors ([29bd024](https://github.com/aleksandryackovlev/openapi-client-sdk-loader/commit/29bd024c3dbb73528a6e24ba45003944a701ddbf))
* **templates:** add config handling in operations in the ts template ([f1d7a46](https://github.com/aleksandryackovlev/openapi-client-sdk-loader/commit/f1d7a46c957c6573be4288a1d78687716e797f48))
* **templates:** add handlebars templates for source code compilation ([a3fa16e](https://github.com/aleksandryackovlev/openapi-client-sdk-loader/commit/a3fa16ea13cdacb9a463dde83e93c5a9e8fa652c))
* **templates:** add options for conditional schema checking for responses and requests ([665c32d](https://github.com/aleksandryackovlev/openapi-client-sdk-loader/commit/665c32d0bd2d73f59607725b9a9242579cfed97a))
* **templates:** describe request interfaces in the ts template ([dae89d1](https://github.com/aleksandryackovlev/openapi-client-sdk-loader/commit/dae89d1cff9331bdce7afeff67344119bc29b7b1))


### Bug Fixes

* **compile:** deref all references in request bodies ([21276aa](https://github.com/aleksandryackovlev/openapi-client-sdk-loader/commit/21276aaf1e1d3aa7c5188bac3bb027ab8795f46f))
* **compile:** fix models' compilation when the components section is not described the doc ([9c36b0f](https://github.com/aleksandryackovlev/openapi-client-sdk-loader/commit/9c36b0fdf1625e5e7551ea74c9065d97dfa5ff19))
* **compile:** fix the structure of the info ([cd6f1d5](https://github.com/aleksandryackovlev/openapi-client-sdk-loader/commit/cd6f1d543fbfdefd527999fd6af5b43674d0bee4))
* **compile:** fix the typo in the security schemes compilation ([616f873](https://github.com/aleksandryackovlev/openapi-client-sdk-loader/commit/616f87360eb697d3e5b07b4937825b7a04cbe02d))
* **loader:** skip file processing if the extension is not compatible with the loader ([8f38458](https://github.com/aleksandryackovlev/openapi-client-sdk-loader/commit/8f38458823356f6ca9a18ab46c2b091e750dba21))
* **package.json:** fix the main script in the package.json ([c5e8915](https://github.com/aleksandryackovlev/openapi-client-sdk-loader/commit/c5e8915283592d589137716030fdbd45e30609c1))
* **readme:** fix the typo in readme ([900ffed](https://github.com/aleksandryackovlev/openapi-client-sdk-loader/commit/900ffedff1cd54bcf67246025aaf43fd0f80f4d6))
* **template:** add binary to unknown formats in ajv validation ([3e1919a](https://github.com/aleksandryackovlev/openapi-client-sdk-loader/commit/3e1919ae1fc086b08407348b7f140ebff8512d87))
* **template:** fix the schema validation errors with intagers format ([da82059](https://github.com/aleksandryackovlev/openapi-client-sdk-loader/commit/da820592d05ae3cc71fcadc0342457a4a6523c08))
* **template:** fix the type of the request body in the ts template ([044a94b](https://github.com/aleksandryackovlev/openapi-client-sdk-loader/commit/044a94b50a8fc147ed9aea6c015f284c5e493057))
* **template:** remove schema validation for the formData body ([1170d7a](https://github.com/aleksandryackovlev/openapi-client-sdk-loader/commit/1170d7a892b5041784367210af667c42c6f624db))
* **templates:** add types to error responses in the ApiError ([6527ad1](https://github.com/aleksandryackovlev/openapi-client-sdk-loader/commit/6527ad19a4ccba9258532416f2bdd51843ef7604))
* **templates:** fix shemas compilation in the ts compiler ([0cbd236](https://github.com/aleksandryackovlev/openapi-client-sdk-loader/commit/0cbd2363d7a075da5b681720fd2259a319aa0536))

### 0.0.2 (2019-12-12)


### Features

* **compiler:** add openapi models compilement ([2928233](https://github.com/null/openapi-client-sdk-loader/commit/29282332dc83a1400b1b8da78a39aa56f8d838c0))
* **utils:** add json schema to typescript compiler ([997c1a1](https://github.com/null/openapi-client-sdk-loader/commit/997c1a18373ed27a137b549ae21f771f0fee205f))

# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.