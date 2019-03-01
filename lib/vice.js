
const moment = require("moment");

module.exports = function (vice) {

  return {
    isBestEver() {
      if (vice.longest) {
        return moment(vice.longest.end).diff(vice.longest.start) < moment().diff(vice.last);
      }
      return true;
    },

    vice,

    streakInWords() {
      return moment(vice.last).fromNow(true);
    },

    longestInWords() {
      return vice.longest ? moment(vice.longest.start).from(vice.longest.end, true) : null;
    },

    reset() {
      vice.longest = { start: vice.last, end: moment().format() };
      vice.last = moment().format();
    },


  };

};
