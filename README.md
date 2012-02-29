# Argumentum
Argumentum is a no-bullshit option parser for node. It doesn't have
complicated chainable APIs so it's much more easier to use.

## Example
Example usage (in CoffeeScript):

```coffeescript
argumentum = require 'argumentum'

config =
  script: 'app'
  commandRequired: yes
  commands:
    new:
      help: 'Create new project'
      options:
        appPath:
          position: 1
          help: 'application path'
          metavar: 'APP_PATH'
          required: yes

        buildPath:
          abbr: 'o'
          help: 'build path'
          metavar: 'DIRECTORY'
          full: 'output'

      callback: (options) ->
        'callback called'

  options:
    version:
      abbr: 'v'
      help: 'display app version'
      flag: true
      callback: ->
        'version called'

argumentum.load(config).parse()
```

Example project that uses argumentum: [brunch](https://github.com/brunch/brunch/blob/master/src/command.coffee)

## Documentation
There are two public API functions in argumentum:

* `argumentum.load()` takes config object (ordinary JS object).
* `argumentum.parse()` parses some string and does appropriate actions. If 
no argument was provided, it parses STDIN.

### Config object

* `commandRequired`: print usage if no command was provided? Usually disabled
in software that works with STDIN.
* `script`: name of script that will show in usage.
* `options`: a js object, where keys are option names and values are their
info. These are options that will be global to each command (`app --globalOpt`).
Option info keys:
    * `abbr`: short option name. E.g. `-v` as an alias to `--version`
    * `flag`: if option was specified then it's true else false.
    * `full`: if specified, this name will be used in parser and documentation
    and option name will be used as a part of `options` passed to `callback`.
    * `help`: description.
    * `metavar`: used in help. Example: `DIRECTORY`, `FILE` etc.
    * `position`: makes option positional. E.g. `app command a b c` will call
    options with positions 1, 2 and 3.
    * `callback`: function that will be executed on calling. If it returns
    string, string will be printed to STDOUT.
* `commands`: a js object, where keys are command names and values are their
info. Command info keys:
    * `abbr`: short command name. E.g. you can make `g` as an alias to
    `generate`.
    * `help`: description.
    * `options`: options that are local to each command
    (`app command --localOpt`). Have same semantics
    as global options.
    * `callback`: function that will be executed on command calling. It takes
    a list of options as first argument. If it returns
    string, string will be printed to STDOUT.

## License
This project is based on [nomnom](https://github.com/harthur/nomnom)
by Heather Arthur.

(The MIT License)

Copyright (c) 2011 Paul Miller (paulmillr.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

