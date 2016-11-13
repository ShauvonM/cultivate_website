import moment = require('moment');
import { Lab } from '../service/lab.service';

export default class DateUtils {

    static MONTH_YEAR = "MMMM, YYYY";
    static DATE_FORMAT = "MMMM Do";
    static DATE_FORMAT_YEAR = "MMMM Do, Y"
    static TIME_FORMAT = "h:mm a";

    static SHORT_TIME = "ha";
    static SHORT_TIME_MINUTES = "h:mma";

    static DAY_NAME = "dddd";
    static DAY_ORDINAL = "Do";

    static ISO_DATE = "YYYY-MM-DD";

    /**
     * Convenience method to format a given moment object to show the date
     */
    static getDateString(time: moment.Moment, year?: boolean): string {
        if (time.get("y") == moment().get('y') && !year) {
            return time.format(this.DATE_FORMAT);
        } else {
            return time.format(this.DATE_FORMAT_YEAR);
        }
    }

    static getISODate(time: moment.Moment): string {
        return time.format(this.ISO_DATE);
    }

    /**
     * Convenience method to format a given moment object to show the time
     */
    static getTimeString(time: moment.Moment): string {
        return time.format(this.TIME_FORMAT);
    }

    static getShortTimeForLab(lab: Lab, index?: number): string {
        let time = this.getStartMomentForLab(lab, index);
        if (time.minutes() > 0) {
            return time.format(this.SHORT_TIME_MINUTES)
        } else {
            return time.format(this.SHORT_TIME);
        }
    }

    /**
     * Gets a string showing a start and end time, like '4:30 pm - 6:00 pm'
     * Accepts a lab, and an optional index of the lab's dates and times
     */
    static getStartToEndTimeString(lab: Lab, index?: number): string {
        return this.getTimeString(this.getStartMomentForLab(lab, index))
             + " - " + this.getTimeString(this.getEndMomentForLab(lab, index));
    }

    /**
     * Returns a moment object for the starting date and time of a lab session
     * Accepts a lab object and an optional index of the lab's dates and times to use
     */
    static getStartMomentForLab(lab: Lab, index?: number): moment.Moment {
        index = index || 0;
        let time = lab.times.length == index + 1 ? lab.times[index] : lab.times[0];
        return moment(lab.dates[index] + 'T' + lab.times[index]);
    }

    /**
     * Returns a moment object for the end of a particular lab session
     * Accepts a lab object and an optional index of the lab's dates and times to use
     * 
     * If a lab is used with a repeatType set, the index will be ignored and the 
     * end of the lab's last session will be returned
     */
    static getEndMomentForLab(lab: Lab, index?: number): moment.Moment {
        if (!lab.repeatType) {
            index = index || lab.dates.length - 1;
            let duration = lab.durations.length == index + 1 ? lab.durations[index] : lab.durations[0];
            return this.getStartMomentForLab(lab, index).clone().add(lab.durations[index], "m");
        } else {
            let startDate = this.getStartMomentForLab(lab);
            let endDate;
            let repeatInterval = lab.repeatInterval || 1;
            let sessionCount = lab.sessionCount || 2; // just get the next session if it is endless
            let count = (sessionCount - 1) * repeatInterval;

            switch(lab.repeatType) {
                case 1: // daily
                    endDate = startDate.clone().add(count, "days");
                    break;
                case 2: // weekly
                    endDate = startDate.clone().add(count, "weeks");
                    break;
                case 3: // monthly by day
                    endDate = startDate.clone().add(count, "months");
                    break;
                case 4: // monthly by week
                    let weekInMonth = this.getWeekInMonth(startDate);
                    let dayInWeek = startDate.day();
                    endDate = startDate.clone();
                    for (let x = 1; x < lab.sessionCount; x++) {
                        endDate.add(repeatInterval, "months");
                        endDate.date(1);
                        endDate.day(((weekInMonth-1) * 6) + dayInWeek);
                    }
                    break;
                case 5: // yearly
                    endDate = startDate.clone().add(count, "years");
                    break;
            }
            return endDate.add(lab.durations[0], "m");
        }
    }

    static getAllDatesForLab(lab: Lab): string[] {

        if (!lab.repeatType) {
            // easy peasy
            return lab.dates;
        } else if (!lab.sessionCount) {
            
            // uh . . .
            return [];

        } else {
            let dates: string[] = [];
            dates.push(lab.dates[0]);
            let startMoment = this.getStartMomentForLab(lab);
            let sessionCount
            let repeatInterval: number = lab.repeatInterval || 1;
            let addString: string;
            switch(lab.repeatType) {
                case 1: // daily
                    addString = 'days';
                    break;
                case 2: // weekly
                    addString = 'weeks';
                    break;
                case 3: // monthly by day
                    addString = 'months';
                    break;
                case 4: // monthly by week

                    // this one is special
                    let weekInMonth = this.getWeekInMonth(startMoment);
                    let dayInWeek = startMoment.day();
                    for (let x = 1; x < lab.sessionCount; x++) {
                        // move to the next month
                        startMoment.add(repeatInterval, "months");
                        // move to the first of the month
                        startMoment.date(1);
                        // find the nth weekday of the month
                        startMoment.day(((weekInMonth-1) * 6) + dayInWeek);
                        dates.push(this.getISODate(startMoment));
                    }

                    break;
                case 5: // yearly
                    addString = 'years';
                    break
            }

            if (addString) {
                let addObj = {};
                addObj[addString] = repeatInterval;
                for (let x = 1; x < lab.sessionCount; x++) {
                    startMoment.add(addObj);
                    dates.push(this.getISODate(startMoment));
                }
            }

            return dates;
        }

    }

    /**
     * Returns a string showing the start and end dates for a repeating lab
     * It will be in the format 'from May 19, 2016 to June 19, 2016' 
     */
    static getStartToEndDateString(lab: Lab): string {
        if (!lab.repeatType) {
            return ""; // you shouldn't even be calling this
        }

        let startDate = this.getStartMomentForLab(lab);
        let startAndEnd = "from " + this.getDateString(startDate);

        startAndEnd += " to " + this.getDateString(this.getEndMomentForLab(lab));

        return startAndEnd;
    }

    static getWeekInMonth (time: moment.Moment): number {
        return Math.ceil(time.get('date') / 7);
    } 

    /**
     * Takes a Lab and returns a string like "every day" or "the last Monday of every month"
     */
    static getRepeatString (lab: Lab): string {
        if (!lab.repeatType) {
            return "";
        }

        let repeatString: string;
        let repeatInterval: string;

        if (!lab.repeatInterval || lab.repeatInterval == 1) {
            repeatInterval = "every";
        } else if (lab.repeatInterval == 2) {
            repeatInterval = "every other";
        } else {
            repeatInterval = "every " + this.getOrdinal(lab.repeatInterval);
        }

        let startTime = this.getStartMomentForLab(lab);

        switch(lab.repeatType) {
            case 1:
                repeatString = repeatInterval + " day"
                break;
            case 2:
                repeatString = repeatInterval + " " + startTime.format(this.DAY_NAME);
                break;
            case 3:
                repeatString = "the " + startTime.format(this.DAY_ORDINAL) + " of " + repeatInterval + " month";
                break;
            case 4:
                let nthWeekOfMonth = this.getWeekInMonth(startTime);
                let nthWeekOfMonthString: string;
                if (nthWeekOfMonth > 3) {
                    nthWeekOfMonthString = "last";
                } else {
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
    }

    /**
     * Utility function to return a "1st" "2nd" "3rd" "4th" etc.
     */
    static getOrdinal (num: number): string {
        let last = num.toString().split('').pop();
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
    }

}