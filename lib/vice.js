
const moment = require("moment");

module.exports = function (vice) {

  return {
    isBestEver() {
      if (vice.longest) {
        return new Date(vice.longest.end).getTime() - new Date(vice.longest.start).getTime() < new Date().getTime() - new Date(vice.last).getTime();
      }
      return true;
    },

    streakInWords() {
      return moment(vice.last).fromNow(true);
    },

    longestInWords() {
      return vice.longest ? moment(vice.longest.start).from(vice.longest.end, true) : null;
    }
  };
};
