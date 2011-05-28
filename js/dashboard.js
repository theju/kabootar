dojo.require("dojo.date");

dojo.ready(function() { 
    var cols = {"today": 0, "yesterday": -1, "week": -7, "month": -31};
    function fetchColData(dateDiff) {
	var today = new Date();
	var dashboardDataURL = "/dashboard/data/";
	var reqDate = dojo.date.add(today, "day", dateDiff);
	var def = dojo.xhrGet({
	    url: dashboardDataURL,
	    handleAs: "json",
	    sync: false,
	    content: {date: reqDate.toJSON().split("T")[0].split("-").join("")}
	});
	def.then(function(resp) { 
	    _.each(resp[0], function(val, key, list) { 
		if (dojo.byId(key) === null) {
		    var tableRow = dojo.create("tr", {id: key}, "dashboardTable");
		    var tableCol = dojo.create("td", null, tableRow);
		    tableCol.innerHTML = '<a href="' + dashboardDataURL + '?action=' + key + '">' + key + '</a>';
		} else {
		    var tableRow = dojo.byId(key);
		}
		var tableCol = dojo.create("td", null, tableRow);
		tableCol.innerHTML = val?val:"-";
	    });
	}, function(err) { 
	    // TODO: Message flashing showing the error.
	});
    }
    _.each(cols, function(val, key, list) { 
	fetchColData(val);
    });
});
