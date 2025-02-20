GameOn
======

### Find soccer games in your city
GameOn connects you with the players in your city and allows you to find, organize and share games effortlessly.

> Inspired by [jogabo.com](http://www.jogabo.com)

![Screenshot](/screenshot.png)

Technologies
------------
| On The Server                 | On The Client           | Development           | Unit Tests          |
| ----------------------------- | ----------------------- | --------------------- | ------------------- |
| NodeJS                        | AngularJS               | Grunt                 | Jasmine             |
| Express                       | Twitter Bootstrap       | Docco                 | Karma               |
| MongoDB                       | SASS                    | Bower                 | Istanbul (Coverage) |
| Mongoose                      | SocketIO                | Plato (Analysis)      | PhantomJS           |
| SocketIO (Push Notification)  | MomentJS                | JSHint                |                     |
| PassportJS                    | HTML5 Vibration API     | Live Reload           |                     |  
| Crypto                        | HTML5 Geolocation API   | Compass               |                     |
| Async                         | HTML5 Routing           | Concat                |                     |
|                               | Google Maps API         | HTML/CSS Min          |                     |
|                               | Lodash                  | Uglify                |                     |
|                               | Font Awesome            | Auto Prefixer         |                     |
|                               |                         | Angular Templates     |                     |

Live
----
- [https://gameon.jit.su/](https://gameon.jit.su/)

Annotated Source
----------------
- [http://pablodenadai.github.io/GameOn/docs/app.html](http://pablodenadai.github.io/GameOn/docs/app.html)
![Annotated Source](/annotated-source.png)

Code Coverage
-------------
- [http://pablodenadai.github.io/GameOn/coverage/](http://pablodenadai.github.io/GameOn/coverage/)
![Code Coverage](/code-coverage.png)

Code Analysis
-------------
- [http://pablodenadai.github.io/GameOn/analysis/](http://pablodenadai.github.io/GameOn/analysis/)
![Code Analysis](/code-analysis.png)

Dev Requirements
------------
You need `NodeJS` and `MongoDB` installed and running.
We use `Grunt` as our task runner for the client project. Get the CLI (command line interface).

```bash
$ npm install -g grunt-cli
```

Installation
------------
```bash
$ git clone git@github.com:pablodenadai/gameon.git && cd ./gameon
```

```bash
$ cd server
$ npm install
$ node app/app.js
```

```bash
$ cd client
$ npm install
$ bower install
$ grunt server
```

License
-------
MIT © [Pablo De Nadai](http://www.twitter.com/pablodenadai)

[![githalytics.com alpha](https://cruel-carlota.pagodabox.com/7da1667e7af286435d4348d18b6a52a6 "githalytics.com")](http://githalytics.com/pablodenadai/GameOn)
