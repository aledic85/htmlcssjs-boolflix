function ajaxCall() {

  var li = $("li");
  li.remove()
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

        alert("Non abbiamo trovato nessun risultato!")
      }

      for (var i = 0; i < ress.length; i++) {

        var res = ress[i];
        var title = res.title;
        var vote = res.vote_average;
        var overview = res.overview;

        stampResults(title, vote, overview);
      }
    },
    error: function(request, state, error) {

      alert("L'indirizzo del server è errato!");
    }
  })
}

function userInput() {

  var me = $("#input-txt");
  var meVal = me.val()

  return meVal
}

function stampResults(title, vote, overview) {

  var data = {

    title: title,
    vote: vote,
    overview: overview
  }

  var template = $("#template").html();
  var compiled = Handlebars.compile(template);
  var finalHTML = compiled(data);

  $(".films").append(finalHTML);
}

function init() {

  var input = $("#input-btn");

  input.on("click", ajaxCall);
}

$(document).ready(init);
