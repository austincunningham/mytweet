define('app',['exports', 'aurelia-framework', 'aurelia-event-aggregator', './services/messages', './services/mytweet-service'], function (exports, _aureliaFramework, _aureliaEventAggregator, _messages, _mytweetService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.App = undefined;

  var _mytweetService2 = _interopRequireDefault(_mytweetService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var App = exports.App = (_dec = (0, _aureliaFramework.inject)(_mytweetService2.default, _aureliaFramework.Aurelia, _aureliaEventAggregator.EventAggregator), _dec(_class = function () {
    function App(mts, au, ea) {
      var _this = this;

      _classCallCheck(this, App);

      this.au = au;
      this.mts = mts;
      ea.subscribe(_messages.LoginStatus, function (msg) {
        if (msg.status.success === true) {
          au.setRoot('home').then(function () {
            _this.router.navigateToRoute('tweet');
          });
        } else {
          au.setRoot('app').then(function () {
            _this.router.navigateToRoute('login');
          });
        }
      });
      ea.subscribe(_messages.FollowingStatus, function (msg) {
        if (msg.status.success === true) {
          au.setRoot('home').then(function () {
            _this.router.navigateToRoute('following');
          });
        } else {
          au.setRoot('home').then(function () {
            _this.router.navigateToRoute('report');
          });
        }
      });

      ea.subscribe(_messages.TweetStatus, function (msg) {
        if (msg.status.success === true) {
          au.setRoot('home').then(function () {
            _this.router.navigateToRoute('report');
          });
        }
      });

      ea.subscribe(_messages.DeleteStatus, function (msg) {
        if (msg.status.success === true) {
          au.setRoot('home').then(function () {
            _this.router.navigateToRoute('tweet');
          });
        }
      });
    }

    App.prototype.configureRouter = function configureRouter(config, router) {
      config.map([{ route: ['', 'login'], name: 'login', moduleId: 'viewmodels/login/login', nav: true, title: 'Login' }, { route: 'signup', name: 'signup', moduleId: 'viewmodels/signup/signup', nav: true, title: 'Signup' }]);

      config.mapUnknownRoutes(function (instruction) {
        return 'login';
      });

      this.router = router;
    };

    App.prototype.attached = function attached() {
      var _this2 = this;

      if (this.mts.isAuthenticated()) {
        this.au.setRoot('home').then(function () {
          _this2.router.navigateToRoute('tweet');
        });
      }
    };

    return App;
  }()) || _class);
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('home',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Home = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Home = exports.Home = (_dec = (0, _aureliaFramework.inject)(_aureliaFramework.Aurelia), _dec(_class = function () {
    function Home(au) {
      _classCallCheck(this, Home);

      this.aurelia = au;
    }

    Home.prototype.configureRouter = function configureRouter(config, router) {
      config.map([{ route: ['', 'home'], name: 'tweet', moduleId: 'viewmodels/tweet/tweet', nav: true, title: 'Tweet' }, { route: 'report', name: 'report', moduleId: 'viewmodels/report/report', nav: true, title: 'All Tweets' }, { route: 'mytweets', name: 'mytweets', moduleId: 'viewmodels/mytweets/mytweets', nav: true, title: 'My Tweets' }, { route: 'findusertweets', name: 'findusertweets', moduleId: 'viewmodels/findusertweets/findusertweets', nav: true, title: 'Find User Tweets' }, { route: 'following', name: 'following', moduleId: 'viewmodels/following/following', nav: true, title: 'Following' }, { route: 'settings', name: 'settings', moduleId: 'viewmodels/settings/settings', nav: true, title: 'Settings' }, { route: 'logout', name: 'logout', moduleId: 'viewmodels/logout/logout', nav: true, title: 'Logout' }]);

      config.mapUnknownRoutes(function (instruction) {
        return 'dashboard';
      });

      this.router = router;
    };

    return Home;
  }()) || _class);
});
define('main',['exports', './environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  Promise.config({
    longStackTraces: _environment2.default.debug,
    warnings: {
      wForgottenReturn: false
    }
  });

  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('services/async-http-client',['exports', 'aurelia-framework', 'aurelia-http-client', './fixtures', 'aurelia-event-aggregator', './messages'], function (exports, _aureliaFramework, _aureliaHttpClient, _fixtures, _aureliaEventAggregator, _messages) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var _fixtures2 = _interopRequireDefault(_fixtures);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var AsyncHttpClient = (_dec = (0, _aureliaFramework.inject)(_aureliaHttpClient.HttpClient, _fixtures2.default, _aureliaEventAggregator.EventAggregator), _dec(_class = function () {
    function AsyncHttpClient(httpClient, fixtures, ea) {
      _classCallCheck(this, AsyncHttpClient);

      this.http = httpClient;
      this.http.configure(function (http) {
        http.withBaseUrl(fixtures.baseUrl);
      });
      this.ea = ea;
    }

    AsyncHttpClient.prototype.get = function get(url) {
      return this.http.get(url);
    };

    AsyncHttpClient.prototype.post = function post(url, obj) {
      return this.http.post(url, obj);
    };

    AsyncHttpClient.prototype.delete = function _delete(url) {
      return this.http.delete(url);
    };

    AsyncHttpClient.prototype.authenticate = function authenticate(url, user) {
      var _this = this;

      this.http.post(url, user).then(function (response) {
        var status = response.content;
        if (status.success) {
          localStorage.mytweet = JSON.stringify(response.content);
          _this.http.configure(function (configuration) {
            configuration.withHeader('Authorization', 'bearer ' + response.content.token);
          });
        }
        _this.ea.publish(new _messages.LoginStatus(status));
      }).catch(function (error) {
        var status = {
          success: false,
          message: 'service not available'
        };
        _this.ea.publish(new _messages.LoginStatus(status));
      });
    };

    AsyncHttpClient.prototype.clearAuthentication = function clearAuthentication() {
      localStorage.mytweet = null;
      this.http.configure(function (configuration) {
        configuration.withHeader('Authorization', '');
      });
    };

    AsyncHttpClient.prototype.isAuthenticated = function isAuthenticated() {
      var authenticated = false;
      if (localStorage.mytweet !== 'null') {
        authenticated = true;
        this.http.configure(function (http) {
          var auth = JSON.parse(localStorage.mytweet);
          http.withHeader('Authorization', 'bearer ' + auth.token);
        });
      }
      return authenticated;
    };

    return AsyncHttpClient;
  }()) || _class);
  exports.default = AsyncHttpClient;
});
define('services/fixtures',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Fixtures = function Fixtures() {
    _classCallCheck(this, Fixtures);

    this.baseUrl = 'http://35.160.157.123:4000';
  };

  exports.default = Fixtures;
});
define('services/messages',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var LoginStatus = exports.LoginStatus = function LoginStatus(status, email) {
    _classCallCheck(this, LoginStatus);

    this.status = status;
    this.email = email;
  };

  var FollowingStatus = exports.FollowingStatus = function FollowingStatus(status, user) {
    _classCallCheck(this, FollowingStatus);

    this.status = status;
    this.user = user;
  };

  var TweetStatus = exports.TweetStatus = function TweetStatus(status) {
    _classCallCheck(this, TweetStatus);

    this.status = status;
  };

  var DeleteStatus = exports.DeleteStatus = function DeleteStatus(status, user) {
    _classCallCheck(this, DeleteStatus);

    this.status = status;
    this.user = user;
  };
});
define('services/mytweet-service',['exports', 'aurelia-framework', './fixtures', './messages', 'aurelia-event-aggregator', './async-http-client'], function (exports, _aureliaFramework, _fixtures, _messages, _aureliaEventAggregator, _asyncHttpClient) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var _fixtures2 = _interopRequireDefault(_fixtures);

  var _asyncHttpClient2 = _interopRequireDefault(_asyncHttpClient);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var MyTweetService = (_dec = (0, _aureliaFramework.inject)(_fixtures2.default, _aureliaEventAggregator.EventAggregator, _asyncHttpClient2.default), _dec(_class = function () {
    function MyTweetService(data, ea, ac) {
      _classCallCheck(this, MyTweetService);

      this.users = [];
      this.tweets = [];
      this.user = undefined;
      this.mytweets = [];
      this.alltweets = [];
      this.email = '';

      this.ea = ea;
      this.ac = ac;
    }

    MyTweetService.prototype.register = function register(firstName, lastName, email, password) {
      var _this = this;

      var newUser = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
      };
      this.users[email] = newUser;
      this.ac.post('/api/users/register', newUser).then(function (res) {
        _this.getUsers();
      });
    };

    MyTweetService.prototype.login = function login(email, password) {
      var user = {
        'email': email,
        'password': password
      };
      this.ac.authenticate('/api/users/login', user);
      this.user = user;
    };

    MyTweetService.prototype.submitTweet = function submitTweet(message, date, email, number) {
      var _this2 = this;

      var tweet = {
        message: message,
        name: email,
        id: number,
        date: date
      };
      var status = {
        success: false,
        message: 'Message length greater than 140 characters'
      };

      tweet.date = Number(date);
      tweet.id = Math.floor(Math.random() * 1000000000);
      for (var i = 0; i < this.users.length; i++) {
        if (this.user.email === this.users[i].email && tweet.message.length < 140) {
          status.success = true;
          status.message = '';
          this.tweets.push(tweet);
          this.ac.post('/api/tweet/' + this.users[i]._id, tweet).then(function (res) {
            _this2.getTweets();
          });
        }
      }
      console.log('submitted tweet ' + tweet.message + ' from ' + tweet.name);
      this.ea.publish(new _messages.TweetStatus(status));
    };

    MyTweetService.prototype.logout = function logout() {
      var status = {
        success: false,
        message: ''
      };
      this.ac.clearAuthentication();
      this.ea.publish(new _messages.LoginStatus(status));
    };

    MyTweetService.prototype.getTweets = function getTweets() {
      var _this3 = this;

      this.ac.get('/api/tweets').then(function (res) {
        _this3.tweets = res.content;
      });
    };

    MyTweetService.prototype.getUsers = function getUsers() {
      var _this4 = this;

      this.ac.get('/api/users').then(function (res) {
        _this4.users = res.content;
      });
    };

    MyTweetService.prototype.findUser = function findUser(email) {
      this.email = email;
      for (var i = 0; i < this.tweets.length; i++) {
        if (this.tweets[i].name === this.email) {
          this.tweets[i].date = new Date(this.tweets[i].date);
          this.mytweets.push(this.tweets[i]);
        }
      }
    };

    MyTweetService.prototype.settings = function settings(firstName, lastName, email, password, _id) {
      var _this5 = this;

      var editedUser = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        _id: _id
      };

      var status = {
        success: false,
        message: ''
      };

      this.ac.post('/api/users/settings', editedUser).then(function (res) {
        _this5.getUsers();
        status.success = true;
        status.message = 'User updated';
        _this5.ea.publish(new _messages.LoginStatus(status));
      });
    };

    MyTweetService.prototype.follow = function follow(id) {
      var _this6 = this;

      var status = {
        success: false,
        message: 'Following Attempt Failed'
      };
      this.ac.post('/api/users/follow/' + id, this.user).then(function (res) {
        _this6.getUsers();
        _this6.alltweets = [];
        for (var i = 0; i < _this6.users.length; i++) {
          if (_this6.users[i].email === _this6.user.email) {
            _this6.user = _this6.users[i];
            status.success = true;
            status.message = 'following';
            _this6.ea.publish(new _messages.FollowingStatus(status, _this6.user));
          }
        }
      });
    };

    MyTweetService.prototype.unfollow = function unfollow(id) {
      var _this7 = this;

      var status = {
        success: false,
        message: 'Login Attempt Failed'
      };
      this.ac.post('/api/users/unfollow/' + id, this.user).then(function (res) {
        _this7.getUsers();
        _this7.alltweets = [];
        for (var i = 0; i < _this7.users.length; i++) {
          if (_this7.users[i].email === _this7.user.email) {
            _this7.user = _this7.users[i];
            status.success = false;
            status.message = 'logged in';
            _this7.ea.publish(new _messages.FollowingStatus(status, _this7.user));
          }
        }
      });
    };

    MyTweetService.prototype.isAuthenticated = function isAuthenticated() {
      return this.ac.isAuthenticated();
    };

    MyTweetService.prototype.deleteTweet = function deleteTweet(id) {
      var _this8 = this;

      var status = {
        success: false,
        message: 'Delete Attempt Failed'
      };

      this.ac.delete('/api/tweets/' + id, this.user).then(function (res) {
        _this8.getUsers();
        _this8.getTweets();
        for (var i = 0; i < _this8.users.length; i++) {
          if (_this8.users[i].email === _this8.user.email) {
            _this8.user = _this8.users[i];
            status.success = true;
            status.message = 'Tweet deleted';
            _this8.ea.publish(new _messages.DeleteStatus(status, _this8.user));
          }
        }
      });
    };

    MyTweetService.prototype.deleteAllTweets = function deleteAllTweets(user) {
      var _this9 = this;

      var status = {
        success: false,
        message: 'Delete Attempt Failed'
      };
      for (var j = 0; j < this.tweets.length; j++) {
        if (this.tweets[j].name === this.user.email) {
          this.ac.delete('/api/tweets/' + this.tweets[j]._id, this.user).then(function (res) {
            _this9.getUsers();
            _this9.getTweets();
            for (var i = 0; i < _this9.users.length; i++) {
              if (_this9.users[i].email === _this9.user.email) {
                _this9.user = _this9.users[i];
                status.success = true;
                status.message = 'Tweet deleted';
                _this9.ea.publish(new _messages.DeleteStatus(status, _this9.user));
              }
            }
          });
        }
      }
    };

    return MyTweetService;
  }()) || _class);
  exports.default = MyTweetService;
});
define('viewmodels/findusertweets/findusertweets',['exports', 'aurelia-framework', '../../services/mytweet-service'], function (exports, _aureliaFramework, _mytweetService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.FindUserTweets = undefined;

  var _mytweetService2 = _interopRequireDefault(_mytweetService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var FindUserTweets = exports.FindUserTweets = (_dec = (0, _aureliaFramework.inject)(_mytweetService2.default), _dec(_class = function () {
    function FindUserTweets(mts) {
      _classCallCheck(this, FindUserTweets);

      this.tweets = [];
      this.mytweets = [];
      this.email = '';

      this.myTweetService = mts;
      mts.getTweets();
      mts.getUsers();
      mts.mytweets = [];
      this.mytweets = this.myTweetService.mytweets;
    }

    FindUserTweets.prototype.findUser = function findUser() {
      console.log('email = ' + this.email);
      this.myTweetService.findUser(this.email);
    };

    return FindUserTweets;
  }()) || _class);
});
define('viewmodels/following/following',['exports', 'aurelia-framework', '../../services/mytweet-service'], function (exports, _aureliaFramework, _mytweetService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Following = undefined;

  var _mytweetService2 = _interopRequireDefault(_mytweetService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Following = exports.Following = (_dec = (0, _aureliaFramework.inject)(_mytweetService2.default), _dec(_class = function () {
    function Following(mts) {
      _classCallCheck(this, Following);

      this.tweets = [];
      this.alltweets = [];

      this.myTweetService = mts;
      mts.getTweets();
      mts.getUsers();
      mts.alltweets = [];
      this.user = mts.user;
      this.users = mts.users;
      for (var x = 0; x < this.users.length; x++) {
        if (this.users[x].email === this.user.email) {
          this.user = this.users[x];
        }
      }

      for (var i = 0; i < mts.tweets.length; i++) {
        mts.tweets[i].date = new Date(mts.tweets[i].date);
        for (var j = 0; j < this.user.following.length; j++) {
          console.log(this.user.following[j] + ' ' + mts.tweets[i].tweeter);
          if (this.user.following[j] === mts.tweets[i].tweeter) {
            console.log('push');
            mts.alltweets.push(mts.tweets[i]);
          }
        }
      }
      mts.alltweets = mts.alltweets.sort(Comparator);

      function Comparator(a, b) {
        if (a.date < b.date) return -1;
        if (a.date > b.date) return 1;
        return 0;
      }
      this.alltweets = mts.alltweets;
      this.alltweets = this.myTweetService.alltweets;
    }

    Following.prototype.unfollow = function unfollow(id) {
      this.myTweetService.unfollow(id);
    };

    return Following;
  }()) || _class);
});
define('viewmodels/login/login',['exports', 'aurelia-framework', '../../services/mytweet-service'], function (exports, _aureliaFramework, _mytweetService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Login = undefined;

  var _mytweetService2 = _interopRequireDefault(_mytweetService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Login = exports.Login = (_dec = (0, _aureliaFramework.inject)(_mytweetService2.default), _dec(_class = function () {
    function Login(mts) {
      _classCallCheck(this, Login);

      this.email = 'lisa@simpson.com';
      this.password = 'secret';

      this.myTweetService = mts;
      this.prompt = '';
    }

    Login.prototype.login = function login(e) {
      console.log('Trying to log in ' + this.email);
      this.myTweetService.login(this.email, this.password);
    };

    return Login;
  }()) || _class);
});
define('viewmodels/logout/logout',['exports', 'aurelia-framework', '../../services/mytweet-service'], function (exports, _aureliaFramework, _mytweetService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Logout = undefined;

  var _mytweetService2 = _interopRequireDefault(_mytweetService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Logout = exports.Logout = (_dec = (0, _aureliaFramework.inject)(_mytweetService2.default), _dec(_class = function () {
    function Logout(myTweetService) {
      _classCallCheck(this, Logout);

      this.myTweetService = myTweetService;
    }

    Logout.prototype.logout = function logout() {
      console.log('logging out');
      this.myTweetService.logout();
    };

    return Logout;
  }()) || _class);
});
define('viewmodels/mytweets/mytweets',['exports', 'aurelia-framework', '../../services/mytweet-service'], function (exports, _aureliaFramework, _mytweetService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.MyTweet = undefined;

  var _mytweetService2 = _interopRequireDefault(_mytweetService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var MyTweet = exports.MyTweet = (_dec = (0, _aureliaFramework.inject)(_mytweetService2.default), _dec(_class = function () {
    function MyTweet(mts) {
      _classCallCheck(this, MyTweet);

      this.tweets = [];
      this.mytweets = [];

      this.myTweetService = mts;
      mts.getTweets();
      mts.getUsers();
      this.user = mts.user;
      mts.mytweets.length = 0;
      for (var i = 0; i < mts.tweets.length; i++) {
        if (mts.tweets[i].name === this.user.email) {
          mts.tweets[i].date = new Date(mts.tweets[i].date);
          mts.mytweets.push(mts.tweets[i]);
        }
      }
      this.mytweets = mts.mytweets;
      this.mytweets = this.myTweetService.mytweets;
    }

    MyTweet.prototype.deleteTweet = function deleteTweet(id) {
      this.myTweetService.deleteTweet(id);
    };

    MyTweet.prototype.deleteAllTweets = function deleteAllTweets() {
      this.myTweetService.deleteAllTweets(this.user);
    };

    return MyTweet;
  }()) || _class);
});
define('viewmodels/report/report',['exports', 'aurelia-framework', '../../services/mytweet-service'], function (exports, _aureliaFramework, _mytweetService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Report = undefined;

  var _mytweetService2 = _interopRequireDefault(_mytweetService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Report = exports.Report = (_dec = (0, _aureliaFramework.inject)(_mytweetService2.default), _dec(_class = function () {
    function Report(mts) {
      _classCallCheck(this, Report);

      this.tweets = [];
      this.alltweets = [];

      this.myTweetService = mts;
      mts.getTweets();
      mts.getUsers();
      mts.alltweets = [];
      for (var i = 0; i < mts.tweets.length; i++) {
        mts.tweets[i].date = new Date(mts.tweets[i].date);
        mts.alltweets.push(mts.tweets[i]);
      }
      this.users = mts.users;
      this.alltweets = mts.alltweets;
      this.alltweets = this.myTweetService.alltweets;
    }

    Report.prototype.follow = function follow(id) {
      this.myTweetService.follow(id);
    };

    return Report;
  }()) || _class);
});
define('viewmodels/settings/settings',['exports', 'aurelia-framework', '../../services/mytweet-service'], function (exports, _aureliaFramework, _mytweetService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Settings = undefined;

  var _mytweetService2 = _interopRequireDefault(_mytweetService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Settings = exports.Settings = (_dec = (0, _aureliaFramework.inject)(_mytweetService2.default), _dec(_class = function () {
    function Settings(mts) {
      _classCallCheck(this, Settings);

      this.user = this.user;
      this.firstName = '';
      this.lastName = '';
      this.email = '';
      this.password = '';
      this._id = '';

      this.myTweetService = mts;
      mts.getTweets();
      mts.getUsers();
      this.user = mts.user;
      for (var _iterator = mts.users, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref = _i.value;
        }

        var c = _ref;

        if (c.email === this.user.email) {
          this.user = c;
        }
      }
      this.firstName = this.user.firstName;
      this.lastName = this.user.lastName;
      this.email = this.user.email;
      this.password = '*****';
      this._id = this.user._id;
    }

    Settings.prototype.settings = function settings(e) {
      this.myTweetService.settings(this.firstName, this.lastName, this.email, this.password, this._id);
    };

    return Settings;
  }()) || _class);
});
define('viewmodels/signup/signup',['exports', 'aurelia-framework', '../../services/mytweet-service'], function (exports, _aureliaFramework, _mytweetService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Signup = undefined;

  var _mytweetService2 = _interopRequireDefault(_mytweetService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Signup = exports.Signup = (_dec = (0, _aureliaFramework.inject)(_mytweetService2.default), _dec(_class = function () {
    function Signup(mts) {
      _classCallCheck(this, Signup);

      this.firstName = 'Marge';
      this.lastName = 'Simpson';
      this.email = 'marge@simpson.com';
      this.password = 'secret';

      this.myTweetService = mts;
    }

    Signup.prototype.register = function register(e) {
      this.showSignup = false;
      this.myTweetService.register(this.firstName, this.lastName, this.email, this.password);
      this.myTweetService.login(this.email, this.password);
    };

    return Signup;
  }()) || _class);
});
define('viewmodels/tweet/tweet',['exports', 'aurelia-framework', '../../services/mytweet-service', 'aurelia-event-aggregator', '../../services/messages'], function (exports, _aureliaFramework, _mytweetService, _aureliaEventAggregator, _messages) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.tweet = undefined;

  var _mytweetService2 = _interopRequireDefault(_mytweetService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var tweet = exports.tweet = (_dec = (0, _aureliaFramework.inject)(_mytweetService2.default, _aureliaEventAggregator.EventAggregator), _dec(_class = function () {
    function tweet(mts, ea) {
      var _this = this;

      _classCallCheck(this, tweet);

      this.message = '';
      this.date = new Date();
      this.users = [];
      this.tweets = [];
      this.statusMessage = '';

      this.myTweetService = mts;
      mts.getTweets();
      mts.getUsers();
      this.users = mts.users;
      this.tweets = mts.tweets;
      this.user = mts.user;
      this.ea = ea;
      this.ea.subscribe(_messages.TweetStatus, function (msg) {
        _this.statusMessage = msg.status.message;
      });
    }

    tweet.prototype.submitTweet = function submitTweet() {
      console.log('Message = ' + this.message);
      var date = new Date();

      this.myTweetService.submitTweet(this.message, this.date, this.user.email);
    };

    return tweet;
  }()) || _class);
  ;
});
define('text!app.html', ['module'], function(module) { module.exports = "<template>\r\n  <require from=\"nav-bar.html\"></require>\r\n  <div class=\"ui container page-host\">\r\n    <nav-bar router.bind=\"router\"></nav-bar>\r\n    <router-view></router-view>\r\n  </div>\r\n</template>\r\n"; });
define('text!home.html', ['module'], function(module) { module.exports = "<template>\r\n  <require from=\"nav-bar.html\"></require>\r\n  <div class=\"ui container page-host\">\r\n    <nav-bar router.bind=\"router\"></nav-bar>\r\n    <router-view></router-view>\r\n  </div>\r\n</template>\r\n"; });
define('text!nav-bar.html', ['module'], function(module) { module.exports = "<template bindable=\"router\">\r\n  <nav class=\"ui inverted menu\">\r\n    <header class=\"header item\"><a href=\"/\"> MyTweet </a></header>\r\n    <div class=\"right menu\">\r\n      <div repeat.for=\"row of router.navigation\">\r\n        <a class=\"${row.isActive ? 'active' : ''} item\"  href.bind=\"row.href\">${row.title}</a>\r\n      </div>\r\n    </div>\r\n  </nav>\r\n</template>\r\n"; });
define('text!viewmodels/findusertweets/findusertweets.html', ['module'], function(module) { module.exports = "<template>\r\n<div class=\"ui segment\">\r\n  <div class=\"ten wide column\">\r\n    <form submit.trigger=\"findUser()\" class=\"ui form\" >\r\n      <div class=\"ui form\">\r\n        <div  class=\"field\">\r\n          <label>User Email Address</label>\r\n          <field >\r\n            <input type=\"text\" name=\"email\" value.bind=\"email\" id=\"data\" >\r\n          </field>\r\n        </div>\r\n      </div>\r\n      <button  class=\"ui black labeled submit icon button\">\r\n        <i class=\"icon edit\"></i> Submit\r\n      </button>\r\n    </form>\r\n    <section class=\"ui raised segment\">\r\n      <div class=\"ui grid\">\r\n        <article class=\"fourteen wide column\">\r\n          <table class=\"ui fixed celled table segment\">\r\n            <thead>\r\n            <tr>\r\n              <th>Tweet</th>\r\n              <th>Name</th>\r\n            </tr>\r\n            </thead>\r\n            <tbody>\r\n            <tr repeat.for=\"tweet of mytweets\">\r\n              <td> ${tweet.message} <h6>${tweet.date}</h6></td>\r\n              <td> ${tweet.name}</td>\r\n            </tr>\r\n            </tbody>\r\n          </table>\r\n        </article>\r\n      </div>\r\n    </section>\r\n</template>\r\n"; });
define('text!viewmodels/following/following.html', ['module'], function(module) { module.exports = "<template>\r\n\r\n  <section class=\"ui stacked segment\">\r\n    <article class=\"eight wide column\">\r\n      <table class=\"ui celled table segment\">\r\n        <thead>\r\n        <tr>\r\n          <th>Message</th>\r\n          <th>Follow</th>\r\n        </tr>\r\n        </thead>\r\n        <tbody>\r\n        <tr repeat.for=\"tweet of alltweets\">\r\n          <td> ${tweet.message} <h6>${tweet.date}</h6></td>\r\n          <td>\r\n            <form submit.trigger=\"unfollow(tweet.tweeter)\" class=\"ui form\" method=\"post\">\r\n              <button  class=\"ui black active button\">\r\n                <i class=\"remove user icon\"></i> Unfollow\r\n              </button>\r\n              ${tweet.name}\r\n            </form>\r\n          </td>\r\n        </tr>\r\n        </tbody>\r\n      </table>\r\n    </article>\r\n  </section>\r\n\r\n</template>\r\n"; });
define('text!viewmodels/login/login.html', ['module'], function(module) { module.exports = "<template>\r\n\r\n  <form submit.delegate=\"login($event)\" class=\"ui stacked segment form\">\r\n    <h3 class=\"ui header\">Log-in</h3>\r\n    <div class=\"field\">\r\n      <label>Email</label> <input placeholder=\"Email\" value.bind=\"email\"/>\r\n    </div>\r\n    <div class=\"field\">\r\n      <label>Password</label> <input type=\"password\" value.bind=\"password\"/>\r\n    </div>\r\n    <button class=\"ui black submit button\">Login</button>\r\n    <h3>${prompt}</h3>\r\n  </form>\r\n\r\n</template>\r\n"; });
define('text!viewmodels/logout/logout.html', ['module'], function(module) { module.exports = "<template>\r\n\r\n  <form submit.delegate=\"logout($event)\" class=\"ui stacked segment form\">\r\n    <h3 class=\"ui header\">Are you sure you want to log out?</h3>\r\n    <button class=\"ui black submit button\">Logout</button>\r\n  </form>\r\n\r\n</template>\r\n"; });
define('text!viewmodels/mytweets/mytweets.html', ['module'], function(module) { module.exports = "<template>\r\n  <script>\r\n    $('.ui.checkbox')\r\n    .checkbox()\r\n  ;\r\n  </script>\r\n\r\n\r\n  <section class=\"ui stacked segment\">\r\n    <article class=\"eight wide column\">\r\n      <table class=\"ui celled table segment\">\r\n        <thead>\r\n        <tr>\r\n          <th>Message</th>\r\n          <th>Tweeter</th>\r\n          <th>Press for Deletion\r\n          </th>\r\n        </tr>\r\n        </thead>\r\n        <tbody>\r\n        <tr repeat.for=\"tweet of mytweets\">\r\n          <td> ${tweet.message} <h6>${tweet.date}</h6></td>\r\n          <td> ${tweet.name}</td>\r\n          <td>\r\n            <form submit.trigger=\"deleteTweet(tweet._id)\" class=\"ui form\" method=\"post\">\r\n              <button  class=\"ui black active button\">\r\n                <i class=\"icon trash\"></i> Delete\r\n              </button>\r\n            </form>\r\n          </td>\r\n        </tr>\r\n        </tbody>\r\n      </table>\r\n      <form submit.trigger=\"deleteAllTweets()\" class=\"ui form\" method=\"post\">\r\n        <button  class=\"ui black active button\">\r\n          <i class=\"icon trash\"></i> Delete All Tweets\r\n        </button>\r\n      </form>\r\n    </article>\r\n  </section>\r\n\r\n</template>\r\n"; });
define('text!viewmodels/report/report.html', ['module'], function(module) { module.exports = "<template>\r\n\r\n  <section class=\"ui stacked segment\">\r\n    <article class=\"eight wide column\">\r\n      <table class=\"ui celled table segment\">\r\n        <thead>\r\n        <tr>\r\n          <th>Message</th>\r\n          <th>Follow</th>\r\n        </tr>\r\n        </thead>\r\n        <tbody>\r\n        <tr repeat.for=\"tweet of alltweets\">\r\n          <td> ${tweet.message} <h6>${tweet.date}</h6></td>\r\n          <td>\r\n            <form submit.trigger=\"follow(tweet.tweeter)\" class=\"ui form\" method=\"post\">\r\n              <button  class=\"ui black active button\">\r\n                <i class=\"icon add user\"></i> Follow\r\n              </button>\r\n              ${tweet.name}\r\n            </form>\r\n          </td>\r\n        </tr>\r\n        </tbody>\r\n      </table>\r\n    </article>\r\n  </section>\r\n\r\n</template>\r\n"; });
define('text!viewmodels/settings/settings.html', ['module'], function(module) { module.exports = "<template>\r\n\r\n  <form submit.delegate=\"settings($event)\" class=\"ui form stacked segment\">\r\n    <h3 class=\"ui dividing header\"> Update Users Details </h3>\r\n    <div class=\"field\">\r\n      <label>First Name </label> <input value.bind=\"firstName\">\r\n    </div>\r\n    <div class=\"field\">\r\n      <label>Last Name </label> <input value.bind=\"lastName\">\r\n    </div>\r\n    <div class=\"field\">\r\n      <label>Email </label> <input value.bind=\"email\">\r\n    </div>\r\n    <div class=\"field\">\r\n      <label>Password </label> <input value.bind=\"password\">\r\n    </div>\r\n    <button class=\"ui black submit button\">Update</button>\r\n  </form>\r\n\r\n</template>\r\n"; });
define('text!viewmodels/signup/signup.html', ['module'], function(module) { module.exports = "<template>\r\n\r\n  <form submit.delegate=\"register($event)\" class=\"ui form stacked segment\">\r\n    <h3 class=\"ui dividing header\"> Sign up new User </h3>\r\n    <div class=\"field\">\r\n      <label>First Name </label> <input value.bind=\"firstName\">\r\n    </div>\r\n    <div class=\"field\">\r\n      <label>Last Name </label> <input value.bind=\"lastName\">\r\n    </div>\r\n    <div class=\"field\">\r\n      <label>Email </label> <input value.bind=\"email\">\r\n    </div>\r\n    <div class=\"field\">\r\n      <label>Password </label> <input value.bind=\"password\">\r\n    </div>\r\n    <button class=\"ui black submit button\">Add</button>\r\n  </form>\r\n\r\n</template>\r\n"; });
define('text!viewmodels/tweet/tweet.html', ['module'], function(module) { module.exports = "<template>\r\n  <section class=\"ui raised segment\" xmlns=\"http://www.w3.org/1999/html\">\r\n    <div class=\"ui grid\">\r\n      <div class=\"ten wide column\">\r\n        <form submit.trigger=\"submitTweet()\" class=\"ui form\" >\r\n          <div class=\"ui form\">\r\n            <div  class=\"field\">\r\n              <label>Tweet</label>\r\n              <textarea rows=\"5\" name=\"message\" input type=\"string\" value.bind=\"message\" id=\"data\">\r\n\r\n                          </textarea>\r\n            </div>\r\n          </div>\r\n          <button  class=\"ui black labeled submit icon button\">\r\n            <i class=\"icon edit\"></i> Submit\r\n          </button>\r\n        </form>\r\n        <h1 class=\"ui header\"><span id=\"count\">${140 - message.length }</span> characters left</h1>\r\n        <h1 class=\"ui header\"><span id=\"statusMessage\">${statusMessage}</span></h1>\r\n      </div>\r\n    </div>\r\n  </section>\r\n\r\n</template>\r\n\r\n"; });
//# sourceMappingURL=app-bundle.js.map