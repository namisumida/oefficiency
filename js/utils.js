// FUNCTIONS
// text wrapping function
function wrap(text, width) {
  text.each(function () {
    var text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.3, // ems
        x = text.attr("x"),
        y = text.attr("y"),
        dy = 0, //parseFloat(text.attr("dy")),
        tspan = text.text(null)
                    .append("tspan")
                    .attr("x", x)
                    .attr("y", y)
                    .attr("dy", dy + "em");
    while (word = words.pop()) {
        line.push(word);
        tspan.text(line.join(" "));
        if (tspan.node().getComputedTextLength() > width) {
            line.pop();
            tspan.text(line.join(" "));
            line = [word];
            tspan = text.append("tspan")
                        .attr("x", x)
                        .attr("y", y)
                        .attr("dy", ++lineNumber * lineHeight + dy + "em")
                        .text(word);
        }
    }
  });
}; // end wrap function

// Time-related
var parseTime = d3.timeParse("%m/%d/%y %I:%M:%S"); // convert strings to Dates
var formatTime = d3.timeFormat("%I:%M"); // convert Dates to strings

// Colors
var red = d3.rgb(212,89,84);
var light_red = d3.rgb(229,155,152);
var dark_red = d3.rgb(135, 63, 53);
var repred = d3.rgb(191,59,39);
var light_repred = d3.rgb(227,128,115);
var dark_repred = d3.rgb(143,44,28);
var maroon = d3.rgb(170,62,71);
var plum = d3.rgb(115,61,71);
var light_plum = d3.rgb(185, 123, 134);
var dark_plum = d3.rgb(86,46,53);

var orange = d3.rgb(234,158,43);
var light_orange = d3.rgb(242,197,128);
var dark_orange = d3.rgb(189,121,18);

var yellow = d3.rgb(232,164,51);
var light_yellow = d3.rgb(241,200,132);
var dark_yellow = d3.rgb(206, 112, 32);
var mustard = d3.rgb(209,167,48);
var light_mustard = d3.rgb(227,203,130);
var dark_mustard = d3.rgb(156,126,34);

var olive = d3.rgb(142, 132, 89);
var lime = d3.rgb(148,157,71);
var teal = d3.rgb(56,118,104);
var green = d3.rgb(148,157,72);
var light_green = d3.rgb(196,202,138);
var dark_green = d3.rgb(112,118,54);

var blue = d3.rgb(20,151,252);
var light_blue = d3.rgb(113,192,253);
var dark_blue = d3.rgb(0, 109, 230);
var demblue = d3.rgb(69,106,131);
var light_demblue = d3.rgb(133,167,190);
var dark_demblue = d3.rgb(51,79,98);

var purple = d3.rgb(116,106,126);
var light_purple = d3.rgb(171,164,178);
var dark_purple = d3.rgb(86,79,94);
