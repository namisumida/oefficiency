function redraw() {
  div_labels.attr("x", function(d,i) {
              return margin.left + max_circle_r*(2*i+1) + w_btwn_min*i;
            });

  hold_circles.attr("cx", function(d,i) {
                if (d.division=="mens") {
                  var div = 0;
                }
                else if (d.division=="mixed") {
                  var div = 1;
                }
                else { div = 2; }
                return margin.left + max_circle_r*(2*div+1) + w_btwn_min*div;
              })
              .attr("cy", function(d) {
                return margin.top + 20 + max_circle_r + (max_circle_r - (max_circle_r * d.holds_percent));
              })
              .attr("r", function(d) {
                return max_circle_r*d.holds_percent;
              });

  hold_circles_avg.attr("cx", function(d,i) {
                    return margin.left + max_circle_r*(2*i+1) + w_btwn_min*i;
                  })
                  .attr("cy", function(d) {
                    return margin.top + 20 + max_circle_r + (max_circle_r - (max_circle_r * d.holds_percent));
                  })
                  .attr("r", function(d) {
                    return max_circle_r * d.holds_percent;
                  });

  hold_avg_label.text("Avg. conversion rate")
                .attr("x", 0)
                .attr("y", function() {
                  if (w_svg>=590) {
                    return margin.top + 45 + max_circle_r*2
                  }
                  else { return margin.top + 40 + max_circle_r*2; }
                })
                .call(wrap, w_labels);

  hold_avg_text.attr("x", function(d,i) {
                 return margin.left + max_circle_r*(2*i+1) + w_btwn_min*i;
               })
               .attr("y", function(d) {
                 return margin.top + 55 + max_circle_r*2;
               });

  // single possession score circles
  single_circles.attr("cx", function(d,i) {
                  if (d.division=="mens") {
                    var div = 0;
                  }
                  else if (d.division=="mixed") {
                    var div = 1;
                  }
                  else { div = 2; }
                  return margin.left + max_circle_r*(2*div+1) + w_btwn_min*div;
                })
                .attr("cy", function(d) {
                  return margin.top + 20 + max_circle_r + (max_circle_r - (max_circle_r * d.singleholds_percent));
                })
                .attr("r", function(d) {
                  return max_circle_r * d.singleholds_percent;
                });

  single_circles_avg.attr("cx", function(d,i) {
                      return margin.left + max_circle_r*(2*i+1) + w_btwn_min*i;
                    })
                    .attr("cy", function(d) {
                      return margin.top + 20 + max_circle_r + (max_circle_r - (max_circle_r * d.singleholds_percent));
                    })
                    .attr("r", function(d) {
                      return max_circle_r * d.singleholds_percent;
                    });

  single_avg_label.text("Avg. single- possession score rate")
                  .attr("x", 0)
                  .attr("y", function() {
                    if (w_svg>=590) {
                      return margin.top + 85 + max_circle_r*2;
                    }
                    else { return margin.top + 90 + max_circle_r*2; }
                  })
                  .call(wrap, w_labels);

  single_avg_text.attr("x", function(d,i) {
                   return margin.left + max_circle_r*(2*i+1) + w_btwn_min*i;
                 })
                 .attr("y", function(d) {
                   return margin.top + 100 + max_circle_r*2;
                 });

  // On mouseover of circles
  hold_circles.on("mouseover", function(d) {

    var currentElement = d3.select(this);
    var currentID = d.game_id;

    // Determine starting x position
    var xPosition;
    if (d.division=="mens") {
      xPosition = margin.left;
    }
    else if (d.division=="mixed") {
      xPosition = margin.left + max_circle_r*2 + w_btwn_min;
    }
    else { xPosition = margin.left + max_circle_r*4 + w_btwn_min*2; }

    // Hide averages
    hold_avg_text.style("fill", "none");
    single_avg_text.style("fill", "none");
    hold_avg_label.style("fill", "none");
    single_avg_label.style("fill", "none");
    hold_circles_avg.style("opacity", .2);
    single_circles_avg.style("opacity", .2);

    // Change opacity of mouseover circle
    currentElement.style("opacity", 1)
                  .style("stroke-width", 5);
    single_circles.filter(function(d) {
                    return d.game_id == currentID;
                  })
                  .style("opacity", 1)
                  .style("stroke-width", 5);

    // Create a tooltip
    var tooltip = svg.append("g")
       .attr("id", "tooltip")
       .attr("transform", "translate(" + xPosition + "," + (margin.top + 55 + max_circle_r*2) + ")")
       .attr("width", max_circle_r*2)
    // Add details
    tooltip.append('text')
           .attr("x", max_circle_r)
           .attr("y", 5)
           .text(function() {
             return d.year + " " + d.tournament + " " + d.game_type;
           })
           .attr("class", "tooltip_text");
    tooltip.append("text")
           .attr("x", max_circle_r)
           .attr("y", 18)
           .text(function() {
             return teamName_convert(d.win_team) + " (" + d.score.split("-")[0] + ") vs. " + teamName_convert(d.lose_team) + " (" + d.score.split("-")[1] + ")";
           })
           .attr("class", "tooltip_text");
    tooltip.append("text")
           .attr("x", max_circle_r)
           .attr("y", 45)
           .text(function() {
             return d3.format(".0%")(d.holds_percent)
           })
           .attr("class", "avg_text")
           .style("fill", color1);
    tooltip.append("text")
           .attr("x", max_circle_r)
           .attr("y", 75)
           .text(function() {
             return d3.format(".0%")(d.singleholds_percent)
           })
           .attr("class", "avg_text")
           .style("fill", color2);

  }) // end on mouseover

  hold_circles.on("mouseout", function(d) {
    svg.select("#tooltip") //remove tooltip
       .remove();

    var currentElement = d3.select(this);
    // Show averages again
    hold_avg_text.style("fill", color1);
    single_avg_text.style("fill", color2);
    hold_avg_label.style("fill", "black");
    single_avg_label.style("fill", "black");
    hold_circles_avg.style("opacity", 1)
                    .style("stroke-width", 4.5);
    single_circles_avg.style("opacity", 1)
                      .style("stroke-width", 4.5);

    // Change opacity of mouseover circle
    currentElement.style("opacity", .2);
    single_circles.style("opacity", .2);

  }) // end on mouseout

 // Mouseover on single hold circles
  single_circles.on("mouseover", function(d) {

    var currentElement = d3.select(this);
    var currentID = d.game_id;

    // Determine starting x position
    var xPosition;
    if (d.division=="mens") {
      xPosition = margin.left;
    }
    else if (d.division=="mixed") {
      xPosition = margin.left + max_circle_r*2 + w_btwn_min;
    }
    else { xPosition = margin.left + max_circle_r*4 + w_btwn_min*2; }

    // Hide averages
    hold_avg_text.style("fill", "none");
    single_avg_text.style("fill", "none");
    hold_avg_label.style("fill", "none");
    single_avg_label.style("fill", "none");
    hold_circles_avg.style("opacity", .2);
    single_circles_avg.style("opacity", .2);

    // Change opacity of mouseover circle
    currentElement.style("opacity", 1)
                  .style("stroke-width", 5);
    hold_circles.filter(function(d) {
                  return d.game_id == currentID;
                })
                .style("opacity", 1)
                .style("stroke-width", 5);

    // Create a tooltip
    var tooltip = svg.append("g")
       .attr("id", "tooltip")
       .attr("transform", "translate(" + xPosition + "," + (margin.top + 55 + max_circle_r*2) + ")")
       .attr("width", max_circle_r*2)
    // Add details
    tooltip.append('text')
           .attr("x", max_circle_r)
           .attr("y", 5)
           .text(function() {
             return d.year + " " + d.tournament + " " + d.game_type;
           })
           .attr("class", "tooltip_text");
    tooltip.append("text")
           .attr("x", max_circle_r)
           .attr("y", 18)
           .text(function() {
             return teamName_convert(d.win_team) + " (" + d.score.split("-")[0] + ") vs. " + teamName_convert(d.lose_team) + " (" + d.score.split("-")[1] + ")";
           })
           .attr("class", "tooltip_text");
    tooltip.append("text")
           .attr("x", max_circle_r)
           .attr("y", 45)
           .text(function() {
             return d3.format(".0%")(d.holds_percent)
           })
           .attr("class", "avg_text")
           .style("fill", color1);
    tooltip.append("text")
           .attr("x", max_circle_r)
           .attr("y", 75)
           .text(function() {
             return d3.format(".0%")(d.singleholds_percent)
           })
           .attr("class", "avg_text")
           .style("fill", color2);

  }) // end on mouseover

  single_circles.on("mouseout", function(d) {
    svg.select("#tooltip") //remove tooltip
       .remove();

    var currentElement = d3.select(this);
    // Show averages again
    hold_avg_text.style("fill", color1);
    single_avg_text.style("fill", color2);
    hold_avg_label.style("fill", "black");
    single_avg_label.style("fill", "black");
    hold_circles_avg.style("opacity", 1)
                    .style("stroke-width", 4.5);
    single_circles_avg.style("opacity", 1)
                      .style("stroke-width", 4.5);

    // Change opacity of mouseover circle
    currentElement.style("opacity", .2);
    hold_circles.style("opacity", .2);

  }) // end on mouseout
}; // end redraw function
