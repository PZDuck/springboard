function timeWord(s) {

    /**
     * EXAMPLES
     * 
     * 00:00 midnight
     * 00:12 twelve twelve am
     * 01:00 one o'clock am
     * 06:01 six oh one am
     * 12:00 noon
     * 12:09 twelve oh nine pm
     * 23:23 eleven twenty three pm
     * 
     */

    s = s.split(":")
    let hour = +s[0]
    let minutes = s[1].split('')

    let output = []

    // Representation tables

    const hoursRepr = {
        0: "twelve", 1: "one", 2: "two", 3: "three", 4: "four", 5: "five", 6: "six", 
        7: "seven", 8: "eight", 9: "nine", 10: "ten", 11: "eleven"     
    }

    const minutesRepr = {
        0: "oh", 1: "one", 2: "two", 3: "three", 4: "four", 5: "five", 6: "six", 7: "seven", 8: "eight", 9: "nine",
        10: "ten", 11: "eleven", 12: "twelve", 13: "thirteen", 14: "fourteen", 15: "fivteen", 16: "sixteen", 17: "seventeen", 18: "eighteen",
        19: "nineteen", 20: "twenty", 30: "thirty", 40: "forty", 50: "fifty"
    }

    // Special cases for 00:00 and 12:00

    if (hour === 0 && +minutes.join('') === 0) {
        return 'midnight'
    } else if (hour === 12 && +minutes.join('') === 0) {
        return 'noon'
    }

    output.push(hour < 12 ? hoursRepr[hour] : hoursRepr[hour-12])

    if (+minutes.join('') === 0) {
        output.push("o'clock")
    } else if (minutes[0] === "1") {
        minutes = +minutes.join('')
        output.push(minutesRepr[minutes])
    }
    else {
        minutes[0] = +minutes[0] * 10
        minutes[1] = +minutes[1]
        output.push(minutesRepr[minutes[0]])
        if (minutes[1] !== 0) output.push(minutesRepr[minutes[1]])
    }

    output.push(hour < 12 ? "am" : "pm")

    return output.join(' ')
}

module.exports = timeWord