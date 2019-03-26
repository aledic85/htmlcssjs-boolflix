function ajaxCall() {

  var li = $(".films");
  li.remove();

  var outData = {

    api_key: "210aa1b90aa672bcceb73012579eaeef",
    language: "it-IT",
    query: userInput(),
  }

  $.ajax ({

    url: "https://api.themoviedb.org/3/search/movie",
    method: "GET",
    data: outData,
    success: function(data) {

      var ress = data.results;
      var totalRes = data.total_results;

      if (totalRes == 0) {

        $.ajax ({

          url: "https://api.themoviedb.org/3/search/tv",
          method: "GET",
          data: outData,
          success: function(data) {

            var ress = data.results;
            var totalRes = data.total_results;

            if (totalRes == 0) {

              alert("Non abbiamo trovato nessun risultato!")
            }

            searchResults(ress);
          },
          error: function(request, state, error) {

            alert("L'indirizzo del server è errato!");
          }
        });
      }

      searchResults(ress);
    },
    error: function(request, state, error) {

      alert("L'indirizzo del server è errato!");
    }
  });
}

function userInput() {

  var me = $("#input-txt");
  var meVal = me.val();

  return meVal;
}

function searchResults(ress) {

  for (var i = 0; i < ress.length; i++) {

    var res = ress[i];
    var title = res.title;
    var vote = res.vote_average;
    var overview = res.overview;
    var id = res.id;
    var language = res.original_language;
    var name = res.name;
    var pos = res.poster_path;
    var poster = "https://image.tmdb.org/t/p/original" + pos;

    stampResults(title, convertVote(vote), overview, id, language, name, poster);
  }
}

function convertVote(vote) {

  var finalVote = vote / 2;
  var voteInt = Math.ceil(finalVote);

  return voteInt;
}

function stampResults(title, vote, overview, id, language, name, poster) {

  var data = {

    title: title,
    vote: vote,
    overview: overview,
    id: id,
    lang: language,
    name: name,
    poster: poster
  }

  var template = $("#template").html();
  var compiled = Handlebars.compile(template);
  var finalHTML = compiled(data);

  $(".container").append(finalHTML);
  voteTostar(id, vote);
}

function voteTostar(id, vote) {

  var liId = $("li[data-id='" + id + "']");

  for (var i = 0; i < 5; i++) {

    var jsStar = document.createElement("i");
    var jqStar = $(jsStar);
    jqStar.addClass("fa-star");

    if (i < vote) {

      jqStar.addClass("fas");
    }

    jqStar.addClass("far");
    liId.append(jqStar);
  }
}

function filmEnter() {

  var me = $(this);

  me.css("background-color", "grey");
  me.children("ul").show();
}

function filmLeave() {

  var me = $(this);

  me.children("ul").hide();
}

function init() {

  var input = $("#input-btn");

  input.on("click", ajaxCall);
  $(document).on("mouseenter", ".films", filmEnter);
  $(document).on("mouseleave", ".films", filmLeave);
}

$(document).ready(init);
