"use strict";
var moment = require('moment');
var DateUtils = (function () {
    function DateUtils() {
    }
    /**
     * Convenience method to format a given moment object to show the date
     */
    DateUtils.getDateString = function (time, year) {
        if (time.get("y") == moment().get('y') && !year) {
            return time.format(this.DATE_FORMAT);
        }
        else {
            return time.format(this.DATE_FORMAT_YEAR);
        }
    };
    DateUtils.getISODate = function (time) {
        return time.format(this.ISO_DATE);
    };
    /**
     * Convenience method to format a given moment object to show the time
     */
    DateUtils.getTimeString = function (time) {
        return time.format(this.TIME_FORMAT);
    };
    DateUtils.getShortTimeForLab = function (lab, index) {
        var time = this.getStartMomentForLab(lab, index);
        if (time.minutes() > 0) {
            return time.format(this.SHORT_TIME_MINUTES);
        }
        else {
            return time.format(this.SHORT_TIME);
        }
    };
    /**
     * Gets a string showing a start and end time, like '4:30 pm - 6:00 pm'
     * Accepts a lab, and an optional index of the lab's dates and times
     */
    DateUtils.getStartToEndTimeString = function (lab, index) {
        return this.getTimeString(this.getStartMomentForLab(lab, index))
            + " - " + this.getTimeString(this.getEndMomentForLab(lab, index));
    };
    /**
     * Returns a moment object for the starting date and time of a lab session
     * Accepts a lab object and an optional index of the lab's dates and times to use
     */
    DateUtils.getStartMomentForLab = function (lab, index) {
        index = index || 0;
        var time = lab.times.length == index + 1 ? lab.times[index] : lab.times[0];
        return moment(lab.dates[index] + 'T' + lab.times[index]);
    };
    /**
     * Returns a moment object for the end of a particular lab session
     * Accepts a lab object and an optional index of the lab's dates and times to use
     *
     * If a lab is used with a repeatType set, the index will be ignored and the
     * end of the lab's last session will be returned
     */
    DateUtils.getEndMomentForLab = function (lab, index) {
        if (!lab.repeatType) {
            index = index || lab.dates.length - 1;
            var duration = lab.durations.length == index + 1 ? lab.durations[index] : lab.durations[0];
            return this.getStartMomentForLab(lab, index).clone().add(lab.durations[index], "m");
        }
        else {
            var startDate = this.getStartMomentForLab(lab);
            var endDate = void 0;
            var repeatInterval = lab.repeatInterval || 1;
            var sessionCount = lab.sessionCount || 2; // just get the next session if it is endless
            var count = (sessionCount - 1) * repeatInterval;
            switch (lab.repeatType) {
                case 1:
                    endDate = startDate.clone().add(count, "days");
                    break;
                case 2:
                    endDate = startDate.clone().add(count, "weeks");
                    break;
                case 3:
                    endDate = startDate.clone().add(count, "months");
                    break;
                case 4:
                    var weekInMonth = this.getWeekInMonth(startDate);
                    var dayInWeek = startDate.day();
                    endDate = startDate.clone();
                    for (var x = 1; x < lab.sessionCount; x++) {
                        endDate.add(repeatInterval, "months");
                        endDate.date(1);
                        endDate.day(((weekInMonth - 1) * 6) + dayInWeek);
                    }
                    break;
                case 5:
                    endDate = startDate.clone().add(count, "years");
                    break;
            }
            return endDate.add(lab.durations[0], "m");
        }
    };
    DateUtils.getAllDatesForLab = function (lab) {
        if (!lab.repeatType) {
            // easy peasy
            return lab.dates;
        }
        else if (!lab.sessionCount) {
            // uh . . .
            return [];
        }
        else {
            var dates = [];
            dates.push(lab.dates[0]);
            var startMoment = this.getStartMomentForLab(lab);
            var sessionCount = void 0;
            var repeatInterval = lab.repeatInterval || 1;
            var addString = void 0;
            switch (lab.repeatType) {
                case 1:
                    addString = 'days';
                    break;
                case 2:
                    addString = 'weeks';
                    break;
                case 3:
                    addString = 'months';
                    break;
                case 4:
                    // this one is special
                    var weekInMonth = this.getWeekInMonth(startMoment);
                    var dayInWeek = startMoment.day();
                    for (var x = 1; x < lab.sessionCount; x++) {
                        // move to the next month
                        startMoment.add(repeatInterval, "months");
                        // move to the first of the month
                        startMoment.date(1);
                        // find the nth weekday of the month
                        startMoment.day(((weekInMonth - 1) * 6) + dayInWeek);
                        dates.push(this.getISODate(startMoment));
                    }
                    break;
                case 5:
                    addString = 'years';
                    break;
            }
            if (addString) {
                var addObj = {};
                addObj[addString] = repeatInterval;
                for (var x = 1; x < lab.sessionCount; x++) {
                    startMoment.add(addObj);
                    dates.push(this.getISODate(startMoment));
                }
            }
            return dates;
        }
    };
    /**
     * Returns a string showing the start and end dates for a repeating lab
     * It will be in the format 'from May 19, 2016 to June 19, 2016'
     */
    DateUtils.getStartToEndDateString = function (lab) {
        if (!lab.repeatType) {
            return ""; // you shouldn't even be calling this
        }
        var startDate = this.getStartMomentForLab(lab);
        var startAndEnd = "from " + this.getDateString(startDate);
        startAndEnd += " to " + this.getDateString(this.getEndMomentForLab(lab));
        return startAndEnd;
    };
    DateUtils.getWeekInMonth = function (time) {
        return Math.ceil(time.get('date') / 7);
    };
    /**
     * Takes a Lab and returns a string like "every day" or "the last Monday of every month"
     */
    DateUtils.getRepeatString = function (lab) {
        if (!lab.repeatType) {
            return "";
        }
        var repeatString;
        var repeatInterval;
        if (!lab.repeatInterval || lab.repeatInterval == 1) {
            repeatInterval = "every";
        }
        else if (lab.repeatInterval == 2) {
            repeatInterval = "every other";
        }
        else {
            repeatInterval = "every " + this.getOrdinal(lab.repeatInterval);
        }
        var startTime = this.getStartMomentForLab(lab);
        switch (lab.repeatType) {
            case 1:
                repeatString = repeatInterval + " day";
                break;
            case 2:
                repeatString = repeatInterval + " " + startTime.format(this.DAY_NAME);
                break;
            case 3:
                repeatString = "the " + startTime.format(this.DAY_ORDINAL) + " of " + repeatInterval + " month";
                break;
            case 4:
                var nthWeekOfMonth = this.getWeekInMonth(startTime);
                var nthWeekOfMonthString = void 0;
                if (nthWeekOfMonth > 3) {
                    nthWeekOfMonthString = "last";
                }
                else {
                    nthWeekOfMonthString = this.getOrdinal(nthWeekOfMonth);
                }
                repeatString = "the " + nthWeekOfMonthString + " " +
                    startTime.format(this.DAY_NAME) + " of " + repeatInterval + " month";
                break;
            case 5:
                repeatString = repeatInterval + " year on " + DateUtils.getDateString(startTime);
                break;
        }
        return repeatString;
    };
    /**
     * Utility function to return a "1st" "2nd" "3rd" "4th" etc.
     */
    DateUtils.getOrdinal = function (num) {
        var last = num.toString().split('').pop();
        if (num == 11 || num == 12 || num == 13) {
            last = "4";
        }
        switch (last) {
            case "1":
                return num + "st";
            case "2":
                return num + "nd";
            case "3":
                return num + "rd";
            default:
                return num + "th";
        }
    };
    DateUtils.MONTH_YEAR = "MMMM, YYYY";
    DateUtils.DATE_FORMAT = "MMMM Do";
    DateUtils.DATE_FORMAT_YEAR = "MMMM Do, Y";
    DateUtils.TIME_FORMAT = "h:mm a";
    DateUtils.SHORT_TIME = "ha";
    DateUtils.SHORT_TIME_MINUTES = "h:mma";
    DateUtils.DAY_NAME = "dddd";
    DateUtils.DAY_ORDINAL = "Do";
    DateUtils.ISO_DATE = "YYYY-MM-DD";
    return DateUtils;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DateUtils;

//# sourceMappingURL=date.utils.js.map
