function DateDifference(Date1, Date2){

    let output = [3];
    output[0] = Math.abs(Math.abs(Date.parse(Date1))-Math.abs(Date.parse(Date2)))/1000;
    output[1] = parseInt(output[0]/3600/24);
    output[2] = parseInt(output[1]/7);
    return output;
}
 console.log(DateDifference("January 7, 2020 13:51:50","January 14, 2020 13:51:50"));