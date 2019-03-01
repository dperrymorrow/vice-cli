
const moment = require("moment");
const format = "LLL";

module.exports = function (vice) {


  if (!vice.last) vice.last = moment().format(format);

  return {
    isBestEver() {
      if (vice.longest) {
        const start = moment(vice.longest.start, format);
        const end = moment(vice.longest.end, format);
        const current = moment(vice.last, format);
        return start.diff(end) < moment().diff(current);
      }
      return true;
    },

    vice,

    streakInWords() {
      return moment(vice.last, format).fromNow(true);
    },

    longestInWords() {
      if (!vice.longest) return null;
      const start = moment(vice.longest.start, format);
      const end = moment(vice.longest.end, format);
      return start.from(end, true);
    },

    reset() {
      if (this.isBestEver()) vice.longest = { start: vice.last, end: moment().format(format) };
      vice.last = moment().format(format);
    },
  };
};
