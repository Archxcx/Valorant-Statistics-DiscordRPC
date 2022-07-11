var c = {};
var colors = {};

Reset = "\x1b[0m";
c.Reset = Reset;
c.Bright = "\x1b[1m";
c.Dim = "\x1b[2m";
c.Underscore = "\x1b[4m";
c.Blink = "\x1b[5m";
c.Reverse = "\x1b[7m";
c.Hidden = "\x1b[8m";

c.Black = "\x1b[30m";
c.Red = "\x1b[31m";
c.Green = "\x1b[32m";
c.Yellow = "\x1b[33m";
c.Blue = "\x1b[34m";
c.Magenta = "\x1b[35m";
c.Cyan = "\x1b[36m";
c.White = "\x1b[37m";

c.BgBlack = "\x1b[40m";
c.BgRed = "\x1b[41m";
c.BgGreen = "\x1b[42m";
c.BgYellow = "\x1b[43m";
c.BgBlue = "\x1b[44m";
c.BgMagenta = "\x1b[45m";
c.BgCyan = "\x1b[46m"
c.BgWhite = "\x1b[47m";

function update() {
  Object.keys(c).forEach(function(clr) {
    colors[clr] = function(str) {
      return c[clr] + str + Reset;
    };
  });
  colors.raw = c;
};
update()

colors.add = function(name,clr) {
  colors[name] = function(str) {
    return clr.replace("{text}",str);
  };
}

colors.raw = c;

module.exports = colors;
