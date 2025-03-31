$(document).ready(function () {
  $(".model-page").hide();
  $(".team-page").hide();

  $("#logo").click(function () {
    $("." + $(".active").attr("id")).fadeOut();
    setTimeout(function () {
      $(".home-page").fadeIn();
    }, 400);
    $("#" + $(".active").attr("id")).removeClass("active");
    $("#home-page").addClass("active");
    $("title").text("Home | noClue");
  });

  $("#home-page").click(function () {
    $("." + $(".active").attr("id")).fadeOut();
    setTimeout(function () {
      $(".home-page").fadeIn();
    }, 400);
    $("#" + $(".active").attr("id")).removeClass("active");
    $("#home-page").addClass("active");
    $("title").text("Home | noClue");
  });

  $("#model-page").click(function () {
    $("." + $(".active").attr("id")).fadeOut();
    setTimeout(function () {
      $(".model-page").fadeIn();
    }, 400);
    $("#" + $(".active").attr("id")).removeClass("active");
    $("#model-page").addClass("active");
    $("title").text("Model | noClue");
  });

  $("#try-btn").click(function () {
    $("." + $(".active").attr("id")).fadeOut();
    setTimeout(function () {
      $(".model-page").fadeIn();
    }, 400);
    $("#" + $(".active").attr("id")).removeClass("active");
    $("#model-page").addClass("active");
    $("title").text("Model | noClue");
  });

  $("#team-page").click(function () {
    $("." + $(".active").attr("id")).fadeOut();
    setTimeout(function () {
      $(".team-page").fadeIn();
    }, 400);
    $("#" + $(".active").attr("id")).removeClass("active");
    $("#team-page").addClass("active");
    $("title").text("Team | noClue");
  });

  $("#dark-mode-toggle").click(function () {
    var $button = $("html");
    if ($button.attr("data-bs-theme")) {
      $button.removeAttr("data-bs-theme");
      $("#try-btn").removeClass("btn-light").addClass("btn-dark");
      $(".git-btn").removeClass("btn-light").addClass("btn-dark");
    } else {
      $button.attr("data-bs-theme", "dark");
      $("#try-btn").removeClass("btn-dark").addClass("btn-light");
      $(".git-btn").removeClass("btn-dark").addClass("btn-light");
    }
  });
});

let sentimentChart;
document.getElementById("hashtagForm").addEventListener("submit", function (event) {
  event.preventDefault();
  let hashtag = document.getElementById("hashtag").value.trim();
  if (!hashtag) {
    alert("Please enter a hashtag.");
    return;
  }
  fetch("/fetch_tweets", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ hashtag }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        alert(data.error);
        return;
      }
      document.getElementById("chart-heading").innerHTML = `<h2 class="mb-3 mt-5">Sentiment Breakdown</h2>`;
      document.getElementById("tweets").innerHTML = `<h2 class="mb-4 mt-5">Tweets Fetched</h2>`;
      data.tweets.map(tweet => {
        const p = document.createElement("p");
        p.textContent = tweet;
        document.getElementById("tweets").appendChild(p);
        p.classList.add("list-group-item", "list-group-item-action", "mb-0");
      });
      let sentiment = data.sentiment_analysis;
      let ctx = document.getElementById("sentimentChart").getContext("2d");
      if (sentimentChart) {
        sentimentChart.destroy();
      }
      sentimentChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Positive", "Negative", "Neutral"],
          datasets: [{
            data: [sentiment.Positive, sentiment.Negative, sentiment.Neutral],
            backgroundColor: ["green", "red", "yellow"],
          }],
        },
        options: {
          responsive: true,
          plugins: { legend: { display: false } },
          scales: {
            y: { beginAtZero: true, max: 100 },
          },
        },
      });
    })
    .catch((error) => console.error("Error:", error));
});
