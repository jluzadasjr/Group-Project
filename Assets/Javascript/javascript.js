$(document).ready(function() {
  
    // Current Date
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    var today = yyyy + mm + dd;
  
    yesterday = "20190204";
  
    console.log(today);
  
    // News Search API/Google Search
    var googleQueryUrl = "";
  
    
      googleQueryUrl =
        "https://newsapi.org/v2/everything?q=NHL&apiKey=78289f4e7eaf44ee97fa8a64479a1163";
      $.ajax({
        url: googleQueryUrl,
        method: "GET"
      }).then(function(response) {
        console.log(response);
        for (var i = 0; i < 5; i++) {
          var title = response.articles[i].title;
          var content = response.articles[i].content;

          console.log(title);
        //   console.log(response.articles[i].content);
          var url = response.articles[i].url;
          // console.log(url);


          newDiv1 = $("<div>");
          newDiv1.attr("id", "divId1" + [i]);
          $("#divId1").attr("action", url);
  
          $("#nhl-headlines").append(newDiv1);


          $("#divId1"+[i]).on("click", function(){
              window.location = url;
          })

          $("#divId1"+[i]).html("<br><p>"+title +"<br><br>"+ content+"</p><br><br>");
        }
      });
  
    // Sports Feed API
    var sportsFeedsKey = "d2b26d10-70fd-44f2-a5fb-08a4fb";
  
    var sportsFeedsPass = "Thisisauselesspassword!";
  
    // Gets Current Schedule
    $.ajax({
      type: "GET",
      url:
        "https://cors-anywhere.herokuapp.com/https://api.mysportsfeeds.com/v1.1/pull/nhl/2018-2019-regular/daily_game_schedule.json?fordate=" +
        today,
      dataType: "json",
      async: true,
      headers: {
        Authorization: "Basic " + btoa(sportsFeedsKey + ":" + sportsFeedsPass)
      },
      data: '{ "comment" }',
      success: function(data) {
        console.log("Thanks for your comment!");
        console.log(data);
  
        for (var i = 0; i < 5; i++) {
          var homeTeam =
            data.dailygameschedule.gameentry[i].homeTeam.Abbreviation;
          var awayTeam =
            data.dailygameschedule.gameentry[i].awayTeam.Abbreviation;
          var date = data.dailygameschedule.gameentry[i].date;
          var time = data.dailygameschedule.gameentry[i].time;
          var location = data.dailygameschedule.gameentry[i].location;
  
          newDiv = $("<div>");
          newDiv.attr("id", "divId" + [i]);
  
          $("#nhl-schedule").append(newDiv);
  
          $("#divId" + [i]).html(
            "<p>" +
              homeTeam +
              " vs " +
              awayTeam +
              "</p><br><p>" +
              "@ " +
              location +
              "</p><br><p>" +
              date +
              " " +
              time +
              "<br><br><br></p>"
          );
        }
      }
    });
  
    // Gets current Score
    $.ajax({
      type: "GET",
      url:
        "https://cors-anywhere.herokuapp.com/https://api.mysportsfeeds.com/v1.1/pull/nhl/2018-2019-regular/scoreboard.json?fordate=" +
        yesterday,
      dataType: "json",
      async: true,
      headers: {
        Authorization: "Basic " + btoa(sportsFeedsKey + ":" + sportsFeedsPass)
      },
      data: '{ "comment" }',
      success: function(data1) {
        console.log(data1);
        console.log(data1.scoreboard.gameScore);
      }
    });

      $.ajax({
    type: "GET",
    url:
      "https://cors-anywhere.herokuapp.com/https://api.mysportsfeeds.com/v1.1/pull/nhl/2018-2019-regular/scoreboard.json?fordate="+yesterday,
    dataType: "json",
    async: true,
    headers: {
      Authorization: "Basic " + btoa(sportsFeedsKey + ":" + sportsFeedsPass)
    },
    data: '{ "comment" }',
    
    success: function(data1) {
      // Gets the total number of games for the day to loop over
      var numGames = data1.scoreboard.gameScore.length;

      for (var i = 0; i < numGames; i++){
        awayScore = data1.scoreboard.gameScore[i].awayScore;
        awayTeam = data1.scoreboard.gameScore[i].game.awayTeam.Abbreviation;

        homeScore = data1.scoreboard.gameScore[i].homeScore;
        homeTeam =   data1.scoreboard.gameScore[i].game.homeTeam.Abbreviation;
        
        newDiv2 = $("<div>");
        newDiv2.attr("id", "newDivId2" + [i]);

        $("#displayDiv").append(newDiv2);

        $("#newDivId2"+[i]).html(homeTeam + ": " + homeScore + " vs " + awayTeam + ": " + awayScore );
    
      }
    }
  });
  });