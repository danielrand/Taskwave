// Test for the readableTimeHoursAndMins function
import { readableTimeHoursAndMins } from "../js/script.js";

describe('checking readable time in hours and minutes for correct functionality', function() {
    it('should return 1hr 30 minutes when giving it 90 minutes', function() {
        expect(readableTimeHoursAndMins(90)).toBe('1 hour 30 minutes');
    });
    it('should return 2hrs 30 minutes when giving it 150 minutes', function() {
        expect(readableTimeHoursAndMins(150)).toBe('2 hours 30 minutes');
    });
    it('should return 1hr 15 minutes when giving it 75 minutes', function() {
        expect(readableTimeHoursAndMins(75)).toBe('1 hour 15 minutes');
    });
    it('should return 15 minutes when giving it 15 minutes', function() {
        expect(readableTimeHoursAndMins(15)).toBe('15 minutes');
    });
});

// Test for the sumTaskTimeCategory function
import { sumTaskTimeCategory } from "../js/script.js";
const objectTest = [
    {
        "category": "Appointment",
        "tasks": [
            {
                "task": "Call and make appointment for nose procedure",
                "time": 15
            }
        ]
    },
    {
        "category": "Communication",
        "tasks": [
            {
                "task": "Call Scott and catch up with up",
                "time": 20
            },
            {
                "task": "Recruiter phone call for new opportunity",
                "time": 30
            }
        ]
    },
    {
        "category": "Household",
        "tasks": [
            {
                "task": "Grocery shopping",
                "time": 60
            },
            {
                "task": "Clean kitchen",
                "time": 45
            },
            {
                "task": "Drop off car at mechanic shop for repair",
                "time": 30
            },
            {
                "task": "Fold laundry",
                "time": 20
            },
            {
                "task": "Prepare dinner for tonight",
                "time": 45
            }
        ]
    }
];
describe('checking sumTaskTimeCategory for correct functionality', function() {
    it('should return 15 minutes when giving it 15 minutes', function() {
        expect(sumTaskTimeCategory(objectTest[0])).toBe('15 minutes');
    });
    it('should return 50 minutes when giving it 50 minutes', function() {
        expect(sumTaskTimeCategory(objectTest[1])).toBe('50 minutes');
    });
    it('should return 3 hours 20 minutes when giving it 200 minutes', function() {
        expect(sumTaskTimeCategory(objectTest[2])).toBe('3 hours 20 minutes');
    });
});