function mostPopularFilms() {

  $.ajax ({

    url: "https://api.themoviedb.org/3/trending/all/week?api_key=210aa1b90aa672bcceb73012579eaeef&language=it-IT",
    method: "GET",
    success: function(data) {

      var ress = data.results;
      searchResults(ress);
    },
    error: function(request, state, error) {

      alert("L'indirizzo del server è errato!");
    }
  })
}

function ajaxCall() {

  var films = $(".films");
  films.remove();

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

    if (pos == null) {

      poster = "https://extension.illinois.edu/stain/stains-hi/235.jpg"
    }

    stampResults(title, convertVote(vote), overview, id, language, name, poster);
  }
}

function convertVote(vote) {

  var finalVote = vote / 2;
  var voteInt = Math.ceil(finalVote);

  return voteInt;
}

function fromLangToFlag(language) {

  var flag;

  switch (language) {
    case "it":

      flag = "img/italy.png";
      break;

    case "en":

      flag = "img/england.png";
      break;

    case "de":

      flag = "img/germany.png";
      break;

    case "fr":

      flag = "img/france.png";
      break;

    case "es":

      flag = "img/spain.png";
      break;

    default:

      flag = "img/unknow.svg";
  }

  return flag;
}

function stampResults(title, vote, overview, id, language, name, poster) {

  var data = {

    title: title,
    vote: vote,
    overview: overview,
    id: id,
    lang: fromLangToFlag(language),
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

  me.children("ul").show();
  me.css("cursor", "pointer")
}

function filmLeave() {

  var me = $(this);

  me.children("ul").hide();
}

function h1Click() {

  var films = $(".films");

  films.remove();
  mostPopularFilms();
}

function init() {

  var input = $("#input-btn");
  var inputTxt = $("#input-txt");
  var h1 = $("h1");

  h1.on("click", h1Click);
  input.on("click", ajaxCall);
  $(document).on("mouseenter", ".films", filmEnter);
  $(document).on("mouseleave", ".films", filmLeave);
  mostPopularFilms();
  inputTxt.keyup(function(e) {

    if (e.which == 13) {

      ajaxCall()
    }
  })
}

$(document).ready(init);
