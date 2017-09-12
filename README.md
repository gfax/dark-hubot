# Dark (hubot edition)

[![Build Status](https://travis-ci.org/gfax/dark-hubot.svg?branch=master)](https://travis-ci.org/gfax/dark-hubot)

Dark is a chat bot built on the [Hubot][hubot] framework.

[hubot]: http://hubot.github.com

- [Features](#features)
- [Setup](#setup)
- [Running locally](#running-locally)
- [Scripting](#scripting)
  - [Advanced usage](#advanced-usage)
- [Persistence](#persistence)
- [Adapters](#adapters)
- [Deployment](#deployment)
  - [Deploying to POSIX or Windows](#deploying-to-posix-or-windows)
- [Restart the bot](#restart-the-bot)

## Features

Ask the bot for some help to get a list of available commands.

    human> dark help

Once the commands are returned, try them out!

    human> map me the cheese board
    dark> http://maps.google.com/maps?q=the%20cheese%20board&hl=en&sll=37.0625,-95.677068&sspn=73.579623,100.371094&vpsrc=0&hnear=the%20cheese%20board&t=m&z=11
          http://maps.google.com/maps/api/staticmap?markers=the%20cheese%20board&size=400x400&maptype=roadmap&sensor=false&format=png

    human> directions from 600 e main street richmond, va to foo dog
    dark> Directions from 600 E Main St, Richmond, VA 23219, USA to 1537 W Main St, Richmond, VA 23220, USA
          1.4 mi - 6 mins
          1. Head northwest on E Main St toward N 6th St (1.4 mi)
          2. Turn left onto S Lombardy St - Destination will be on the left (66 ft)
          http://maps.googleapis.com/maps/api/staticmap?size=400x400&path=weight:3%7Ccolor:red%7Cenc:_~bdFfwswMuc@b%7C@c@dAKp@Cb@E~LA`JAjICtGCb@Op@cAzDcFzR^P&sensor=false

    human> weather 23112
    dark> Weather for Beverly Hills, CA 90210, USA (Powered by DarkSky https://darksky.net/poweredby/)
          Currently: Clear 33.6°C/93°F
          Today: Partly cloudy starting later this afternoon, continuing until tomorrow morning.
          Coming week: No precipitation throughout the week, with temperatures falling to 24°C/75°F on Thursday.

    user1> dark youtube no no no cat remix
    dark> http://www.youtube.com/watch?v=z7OJ3vDqyw8&feature=youtube_gdata

## Setup

You must define the following environment variables

- `HUBOT_SLACK_TOKEN` - If running on Slack, add a bot under your [team settings](https://my.slack.com/apps/A0F7YS25R-bots)
- `HUBOT_DARK_SKY_API_KEY` - Get an API key from [darksky.net](https://darksky.net/dev)
- `HUBOT_DARK_SKY_DEFAULT_LOCATION` - Some location you want the bot to default to
- `HUBOT_UBER_OUTPUT_FORMAT` - Accepted values are `table` (ASCII table), `slack` (ASCII table preceded by code block notation) and `none`. Defaults to `none`.
- `HUBOT_UBER_TOKEN` - Get an [Uber developer token](https://developer.uber.com)
- `HUBOT_YOUTUBE_API_KEY` - Get a [Google developer console token](https://console.developers.google.com/)
- `VIMEO_CLIENT_ID` - [Get developer credentials](https://developer.vimeo.com/)
- `VIMEO_CLIENT_SECRET`
- `VIMEO_ACCESS_TOKEN`

## Running locally

You can test your hubot by running the following, however some plugins will not
behave as expected unless the [environment variables](#configuration) they rely
upon have been set.

You can start Dark locally by running:

    % bin/hubot-console

You'll see some start up output and a prompt:

    [Sat Feb 28 2015 12:38:27 GMT+0000 (GMT)] INFO Using default redis on localhost:6379
    Dark>

Then you can interact with Dark by typing `Dark help`.

    Dark> Dark help
    Dark animate me <query> - The same thing as `image me`, except adds [snip]
    Dark help - Displays all of the help commands that Dark knows about.
    ...

## Scripting

See the [Scripting Guide][scripting-docs].
Smaller scripts can be found in `scripts/`.
Larger scripts are found on the npm registry and can included by adding
them to `external-scripts.json`

[scripting-docs]: https://github.com/github/hubot/blob/master/docs/scripting.md

You can get a list of available hubot plugins on
[npmjs.com][npmjs] or by using `npm search`:

    % npm search hubot-scripts panda
    NAME             DESCRIPTION                        AUTHOR DATE       VERSION KEYWORDS
    hubot-pandapanda a hubot script for panda responses =missu 2014-11-30 0.9.2   hubot hubot-scripts panda
    ...


To use a package, check the package's documentation, but in general it is:

1. Use `npm install --save` to add the package to `package.json` and install it
2. Add the package name to `external-scripts.json` as a double quoted string

### Advanced usage

It is also possible to define `external-scripts.json` as an object to
explicitly specify which scripts from a package should be included. The example
below, for example, will only activate two of the six available scripts inside
the `hubot-fun` plugin, but all four of those in `hubot-auto-deploy`.

```json
{
  "hubot-fun": [
    "crazy",
    "thanks"
  ],
  "hubot-auto-deploy": "*"
}
```

**Be aware that not all plugins support this usage and will typically fallback
to including all scripts.**

[npmjs]: https://www.npmjs.com

## Persistence

If you are going to use the `hubot-redis-brain` package (strongly suggested),
you will need to add the Redis to Go addon on Heroku which requires a verified
account or you can create an account at [Redis to Go][redistogo] and manually
set the `REDISTOGO_URL` variable.

    % heroku config:add REDISTOGO_URL="..."

If you don't need any persistence feel free to remove the `hubot-redis-brain`
from `external-scripts.json` and you don't need to worry about redis at all.

[redistogo]: https://redistogo.com/

## Adapters

Adapters are the interface to the service you want your hubot to run on, such
as Campfire or IRC. There are a number of third party adapters that the
community have contributed. Check [Hubot Adapters][hubot-adapters] for the
available ones.

If you would like to run a non-Campfire or shell adapter you will need to add
the adapter package as a dependency to the `package.json` file in the
`dependencies` section.

Once you've added the dependency with `npm install --save` to install it you
can then run hubot with the adapter.

    % bin/hubot -a <adapter>

Where `<adapter>` is the name of your adapter without the `hubot-` prefix.

[hubot-adapters]: https://github.com/github/hubot/blob/master/docs/adapters.md

## Deployment

    % heroku create --stack cedar
    % git push heroku master

If your Heroku account has been verified you can run the following to enable
and add the Redis to Go addon to your app.

    % heroku addons:add redistogo:nano

If you run into any problems, checkout Heroku's [docs][heroku-node-docs].

You'll need to edit the `Procfile` to set the name of your hubot.

More detailed documentation can be found on the [deploying hubot onto
Heroku][deploy-heroku] wiki page.

### Deploying to POSIX or Windows

If you would like to deploy to either a GNU Linux/Mac or Windows operating system.
Please check out the [deploying hubot onto UNIX][deploy-unix] and [deploying
hubot onto Windows][deploy-windows] wiki pages.

[heroku-node-docs]: http://devcenter.heroku.com/articles/node-js
[deploy-heroku]: https://github.com/github/hubot/blob/master/docs/deploying/heroku.md
[deploy-unix]: https://github.com/github/hubot/blob/master/docs/deploying/unix.md
[deploy-windows]: https://github.com/github/hubot/blob/master/docs/deploying/windows.md

## Restart the bot

You may want to get comfortable with `heroku logs` and `heroku restart` if
you're having issues.
