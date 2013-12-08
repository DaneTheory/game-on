GameOn
======

### Find soccer games in your city
GameOn connects you with the players in your city and allows you to find, organize and share games effortlessly.

> Inspired by [jogabo.com](http://www.jogabo.com)

![Screenshot](/screenshot.png)

Technologies
------------

| On The Server  | On The Client | Development |
| -------------- |---------------| ------------|
| NodeJS | AngularJS | Grunt |
| Express | Twitter Bootstrap | Docco |
| MongoDB | SASS | Bower |
| Mongoose | SocketIO | Angular Templates |
| SocketIO | MomentJS | Live Reload |
| PassportJS | Google Maps API | JSHint |
| Crypto | HTML5 Route Mode | Compass |
| Async | Lodash | Concat |
|  | Font Awesome | CSS Min |
|  |  | HTML Min |
|  |  | Auto Prefixer |
|  |  | Uglify |

Live Demo
---------

- [http://thegameon.herokuapp.com/](http://thegameon.herokuapp.com/)
- [http://gameon.jit.su/](http://gameon.jit.su/)

Requirements
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

Documentation
-------------

[Work in progress](http://www.wip.com)

Code Coverage
-------------

[Work in progress](http://www.wip.com)

License
-------

MIT © [Pablo De Nadai](http://www.twitter.com/pablodenadai)

[![githalytics.com alpha](https://cruel-carlota.pagodabox.com/7da1667e7af286435d4348d18b6a52a6 "githalytics.com")](http://githalytics.com/pablodenadai/GameOn)
