var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const responseMap = function (items, summaryField) {
    const result = [];
    for (const item of items) {
        const obj = { month: months[item.month-1] };
        obj[summaryField] = parseInt(item.value);
        result.push(obj)
    }
    return result;
}

const filterCounts = function(filterTickets) {
    return filterTickets.reduce((p, c) => {
        var name = months[new Date(c.creationDate).getMonth()];
        console.log(name);
        if (!p.hasOwnProperty(name)) {
          p[name] = 0;
        }
        p[name]++;
        return p;
      }, {});
}

const filterProfit = function(filterTickets) {
    return filterTickets.reduce((p, c) => {
        var name = months[new Date(c.creationDate).getMonth()];
        console.log(name);
        if (!p.hasOwnProperty(name)) {
          p[name] = 0;
        }
        p[name]= p[name] + c.ticketPrice;
        return p;
      }, {});
}
module.exports = { responseMap,filterCounts, filterProfit};
