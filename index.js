// Your code here
function createEmployeeRecord(array){
const employeeRecord = {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []
};
return employeeRecord
}

function createEmployeeRecords(arrayOfArrays) {
    const employeeRecords = [];
  
    arrayOfArrays.forEach((array) => {
      console.log('Processing array:', array);
      const employeeRecord = createEmployeeRecord(array);
      console.log('Created employee record:', employeeRecord);
      employeeRecords.push(employeeRecord);
    });
  
    return employeeRecords;
  }

  function createTimeInEvent(employeeRecord, dateTimeString) {
    const [date, time] = dateTimeString.split(" ");
  
    const timeInEvent = {
      type: "TimeIn",
      date: date,
      hour: parseInt(time, 10)
    };
  
    employeeRecord.timeInEvents.push(timeInEvent);
  
    return employeeRecord;
  }

  function createTimeOutEvent(employeeRecord, dateTimeString) {
    const [date, time] = dateTimeString.split(" ");
  
    const timeOutEvent = {
      type: "TimeOut",
      date: date,
      hour: parseInt(time, 10)
    };
  
    employeeRecord.timeOutEvents.push(timeOutEvent);
  
    return employeeRecord;
  }
  
  function hoursWorkedOnDate(employeeRecord, date) {
    const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
    const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);
  
    const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
  
    return hoursWorked;
  }
  
  function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    const wagesEarned = hoursWorked * employeeRecord.payPerHour;
  
    return wagesEarned;
  }
  
  function allWagesFor(employeeRecord) {
    const dates = employeeRecord.timeInEvents.map(event => event.date);
  
    const totalWages = dates.reduce((accumulator, date) => {
      const wagesEarned = wagesEarnedOnDate(employeeRecord, date);
      return accumulator + wagesEarned;
    }, 0);
  
    return totalWages;
  }
  
  function calculatePayroll(employeeRecords) {
    const totalPayroll = employeeRecords.reduce((accumulator, employeeRecord) => {
      const wages = allWagesFor(employeeRecord);
      return accumulator + wages;
    }, 0);
  
    return totalPayroll;
  }