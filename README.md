# DCS Angular2 Blueprint

## Installation

```bash
git clone git@github.com:DcsMarcRemolt/dcs-angular2-blueprint.git
cd dcs-angular2-blueprint
npm install
npm run watch:dev:hmr
```

On second console, start the fake REST backend:

```bash
npm run backend:mock
```

Then open your browser at http://localhost:3000 to view the app.

For best development experience, install

https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd

for a little time travel debugging, state dump/load ...


## Karma tests

Run once with coverage generation:

```bash
npm test
```

Then open coverage/lcov-report/index.html for the coverage report.

Run during development:

```bash
npm run test:watch
```


## Build for production

```bash
npm run build:prod # get coffee
npm run serve:prod # little test server for the production build
```

Then open your browser at http://localhost:8080 to view the app.
