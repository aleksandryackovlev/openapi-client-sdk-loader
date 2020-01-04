# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.1.2](https://github.com/aleksandryackovlev/openapi-client-sdk-loader/compare/v0.1.1...v0.1.2) (2020-01-04)


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