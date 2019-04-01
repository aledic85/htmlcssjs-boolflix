function mostPopularFilms() {

  $.ajax ({

    url: "https://api.themoviedb.org/3/movie/popular",
    method: "GET",
	  data: {
		    api_key: "210aa1b90aa672bcceb73012579eaeef",
		    language: "it-IT"
      },
    success: function(data) {

      var ress = data.results;

      searchResultsMovie(ress);
    },
    error: function(request, state, error) {

      alert("L'indirizzo del server è errato!");
    }
  })
}

function searchMovie() {

  var input = userInputMovie()
  var films = $(".films");

  films.remove();

  var outData = {

    api_key: "210aa1b90aa672bcceb73012579eaeef",
    language: "it-IT",
    query: input,
  }

  $.ajax ({

    url: "https://api.themoviedb.org/3/search/movie",
    method: "GET",
    data: outData,
    success: function(data) {

      var ress = data.results;
      var totalRes = data.total_results;
      var totalPages = data.total_pages;

      if (totalRes == 0) {

        alert("Non abbiamo trovato nessun risultato!");
      }

      if (totalPages > 1) {

        for (var i = 1; i <= totalPages; i++) {

          $.ajax ({

            url: "https://api.themoviedb.org/3/search/movie",
            method: "GET",
            data: {

              api_key: "210aa1b90aa672bcceb73012579eaeef",
              language: "it-IT",
              query: input,
              page: i,
            },
            success: function(data) {

              var ress = data.results;

              searchResultsMovie(ress);
            }
          });
        };
      } else {

        searchResultsMovie(ress);
       }
    },
    error: function(request, state, error) {

      alert("L'indirizzo del server è errato!");
    }
  });
}

function searchTvSeries() {

  var input = userInputTv()
  var films = $(".films");

  films.remove();

  var outData = {

    api_key: "210aa1b90aa672bcceb73012579eaeef",
    language: "it-IT",
    query: input,
  }

  $.ajax ({

    url: "https://api.themoviedb.org/3/search/tv",
    method: "GET",
    data: outData,
    success: function(data) {

      var ress = data.results;
      var totalRes = data.total_results;
      var totalPages = data.total_pages;

      if (totalRes == 0) {

        alert("Non abbiamo trovato nessun risultato!");
      }

      if (totalPages > 1) {

        for (var i = 1; i <= totalPages; i++) {

          $.ajax ({

            url: "https://api.themoviedb.org/3/search/tv",
            method: "GET",
            data: {

              api_key: "210aa1b90aa672bcceb73012579eaeef",
              language: "it-IT",
              query: input,
              page: i,
            },
            success: function(data) {

              var ress = data.results;

              searchResultsTv(ress);
            }
          });
        };
      } else {

        searchResultsTv(ress);
       }
    },
    error: function(request, state, error) {

      alert("L'indirizzo del server è errato!");
    }
  });
}

function userInputMovie() {

  var me = $("#input-txt-movie");
  var meVal = me.val();

  return meVal;
}

function userInputTv() {

  var me = $("#input-txt-tv");
  var meVal = me.val();

  return meVal;
}

function searchResultsMovie(ress) {

  for (var i = 0; i < ress.length; i++) {

    var res = ress[i];
    var title = res.title;
    var vote = res.vote_average;
    var overview = res.overview;
    var id = res.id;
    var language = res.original_language;
    var pos = res.poster_path;
    var poster = "https://image.tmdb.org/t/p/original" + pos;

    if (pos == null) {

      poster = "https://extension.illinois.edu/stain/stains-hi/235.jpg";
    }

    stampResultsMovie(title, convertVote(vote), overview, id, language, poster);
  }
}

function searchResultsTv(ress) {

  for (var i = 0; i < ress.length; i++) {

    var res = ress[i];
    var title = res.name;
    var vote = res.vote_average;
    var overview = res.overview;
    var id = res.id;
    var language = res.original_language;
    var title = res.name;
    var pos = res.poster_path;
    var poster = "https://image.tmdb.org/t/p/original" + pos;

    if (pos == null) {

      poster = "https://extension.illinois.edu/stain/stains-hi/235.jpg";
    }

    stampResultsTv(title, convertVote(vote), overview, id, language, poster);
  }
}

function searchGenreMovie(id) {

  $.ajax ({

    url: "https://api.themoviedb.org/3/movie/" + id + "?api_key=210aa1b90aa672bcceb73012579eaeef",
    method: "GET",
    success: function(data) {

      var genres = data.genres;

      getGenre(genres, id);
    }
  });
}

function searchGenreTv(id) {

  $.ajax ({

    url: "https://api.themoviedb.org/3/tv/" + id + "?api_key=210aa1b90aa672bcceb73012579eaeef",
    method: "GET",
    success: function(data) {

      var genres = data.genres;

      getGenre(genres, id);
    }
  });
}

function searchCastMovie(id) {

  $.ajax ({

    url: "https://api.themoviedb.org/3/movie/" + id + "/credits?api_key=210aa1b90aa672bcceb73012579eaeef",
    method: "GET",
    success: function(data) {

      var casts = data.cast;

      getCast(casts, id);
    }
  });
}

function searchCastTv(id) {

  $.ajax ({

    url: "https://api.themoviedb.org/3/tv/" + id + "/credits?api_key=210aa1b90aa672bcceb73012579eaeef",
    method: "GET",
    success: function(data) {

      var casts = data.cast;

      getCast(casts, id);
    }
  })
}

function getGenre(genres, id) {

  if (genres.length == 0) {

    var liId = $("li[data-id='" + id + 'g' + "']");

    liId.text("Il genere di questo titolo non è presente nel database");
  }

  for (var i = 0; i < genres.length; i++) {

    var genre = genres[i];
    var genreName = genre.name;

    stampGenre(genreName, id);
  }
}

function getCast(casts, id) {

  if (casts.length == 0) {

    var liId = $("li[data-id='" + id + 'c' + "']");

    liId.text("Il cast di questo titolo non è presente nel database");
  }

  for (var i = 0; i < 5 && i < casts.length; i++) {

    var cast = casts[i];
    var name = cast.name;

    stampCast(name, id);
  };
}

function stampCast(name, id) {

  var liId = $("li[data-id='" + id + 'c' + "']");

  liId.text(liId.text() + " " + name);
}

function stampGenre(genre, id) {

  var liId = $("li[data-id='" + id + 'g' + "']");

  liId.text(liId.text() + " " + genre);
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

      flag = null;
  }

  return flag;
}

function stampResultsMovie(title, vote, overview, id, language, poster) {

  var data = {

    title: title,
    vote: vote,
    overview: overview,
    id: id,
    langImg: fromLangToFlag(language),
    lang: language,
    poster: poster,
    idc: id + "c",
    idg: id + "g",
    class: "movie"
  }

  var template = $("#template").html();
  var compiled = Handlebars.compile(template);
  var finalHTML = compiled(data);

  $(".container").append(finalHTML);
  convertVoteTostar(id, vote);
}

function stampResultsTv(title, vote, overview, id, language, poster) {

  var data = {

    title: title,
    vote: vote,
    overview: overview,
    id: id,
    langImg: fromLangToFlag(language),
    lang: language,
    poster: poster,
    idc: id + "c",
    idg: id + "g",
    class: "serie"
  }

  var template = $("#template").html();
  var compiled = Handlebars.compile(template);
  var finalHTML = compiled(data);

  $(".container").append(finalHTML);
  convertVoteTostar(id, vote);
}

function convertVoteTostar(id, vote) {

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
  var type = me.attr("class");
  var liGenre = me.find("li.genre").attr("data-id");
  var liCast = me.find("li.cast").attr("data-id");
  var liGenreText = me.find("li.genre");
  var liCastText = me.find("li.cast");
  var idGenre = liGenre.slice(0, -1);
  var idCast = liCast.slice(0, -1);

  liCastText.text("Cast:");
  liGenreText.text("Genere:")
  me.children("ul").show();
  me.css("cursor", "pointer");

  if (type == "films movie") {

    searchCastMovie(idCast);
    searchGenreMovie(idGenre);
  } else if (type == "films serie") {

    searchCastTv(idCast);
    searchGenreTv(idGenre);
  }
}

function filmLeave() {

  var me = $(this);
  var liGenre = me.find("li.genre");
  var liCast = me.find("li.cast");

  liGenre.text("");
  liCast.text("");
  me.children("ul").hide();
}

function boolflixClick() {

  var films = $(".films");

  films.remove();
  mostPopularFilms();
}

function init() {

  var inputMovie = $("#input-btn-movie");
  var inputTxtMovie = $("#input-txt-movie");
  var inputTv = $("#input-btn-tv");
  var inputTxtTv = $("#input-txt-tv");
  var boolflix = $("h1");

  boolflix.on("click", boolflixClick);
  inputMovie.on("click", searchMovie);
  inputTv.on("click", searchTvSeries);
  $(document).on("mouseenter", ".films", filmEnter);
  $(document).on("mouseleave", ".films", filmLeave);
  mostPopularFilms();
  inputTxtMovie.keyup(function(e) {

    if (e.which == 13) {

      searchMovie();
    }
  });

  inputTxtTv.keyup(function(e) {

    if (e.which == 13) {

      searchTvSeries();
    }
  });
}

$(document).ready(init);
