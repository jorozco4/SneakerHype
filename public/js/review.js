const altImage = $("#altShoeImg");
const next = $("#forward")
const back = $("#back")

 function renderSneaker() {
  const img = document.createElement("img")
  const img2 = document.createElement("img");
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  let array = [];
  let index = 0;

  fetch(
    `https://v1-sneakers.p.rapidapi.com/v1/sneakers?limit=10&name=${userInfo.name}&releaseYear=${userInfo.year}&brand=${userInfo.brand}`,
   {
       method: "GET",
      headers: {
         "x-rapidapi-key": "d838877240msh4581997fdf08b6ap14f151jsnaf1bcef3ad7c", //0c1a9a5c52msh230a7f2d99ccc15p10ad0djsn27e4137a93bc-------13943e8640mshd73f872e7bb17cfp1a3907jsn56f6f191aa1a
       "x-rapidapi-host": "v1-sneakers.p.rapidapi.com",
      },
    }
   )
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      if (data.results.length === 0) {
        alert("No shoes exist using these search parameters. Please try another search.")
        document.location.replace('/')



      }
       img.src = data.results[0].media.smallImageUrl;
       img2.src = data.results[1].media.thumbUrl;
       $("#shoe-img").append(img);
       $("#altShoeImg").append(img2)
       $("#shoe-name").html(data.results[0].shoe);
       $("#relDate").html("Release Date: " + data.results[0].releaseDate);       
       $("#retailPrice").html("Current Cost: $" + data.results[0].retailPrice);
       $("#colorway").html("Colorway: " + data.results[0].colorway)
       $("#styleID").html("Style ID: " + data.results[0].styleId)
       $("#amazon").append("<a id=amazon href=\"https://www.amazon.com/s?k=" + userInfo.brand + "+" + userInfo.name +"&rh=n%3A679312011&ref=nb_sb_noss\">Amazon</a>")

      for (i = 0; i < data.results.length; i++) {
        array.push(data.results[i]);
      } 

      next.click (function (e) {
        e.preventDefault()
        if (index + 1 >= data.results.length) {
          index = 0
          img.src = data.results[0].media.smallImageUrl;
          $("#shoe-name").html(data.results[0].shoe);
          $("#relDate").html("Release Date: " + data.results[0].releaseDate);       
          $("#retailPrice").html("Current Cost: $" + data.results[0].retailPrice);
          $("#colorway").html("Colorway: " + data.results[0].colorway)
          $("#styleID").html("Style ID: " + data.results[0].styleId);
        } else if (index < data.results.length) {
          index ++;
          img.src = array[index].media.smallImageUrl
          $("#shoe-img").append(img)
          $("#shoe-name").html(array[index].shoe);
          $("#relDate").html("Release Date: " + array[index].releaseDate);       
          $("#retailPrice").html("Current Cost: $" + array[index].retailPrice);
          $("#colorway").html("Colorway: " + array[index].colorway)
          $("#styleID").html("Style ID: " + array[index].styleId);
        }
      })

      back.click (function (e) {
        e.preventDefault()
        if (index + 1 >= data.results.length) {
          index = 0
          img.src = data.results[0].media.smallImageUrl;
          $("#shoe-name").html(data.results[0].shoe);
          $("#relDate").html("Release Date: " + data.results[0].releaseDate);       
          $("#retailPrice").html("Current Cost: $" + data.results[0].retailPrice);
          $("#styleID").html("Style ID: " + data.results[0].styleId);
        } else if (index < data.results.length) {
          index --;
          img.src = array[index].media.smallImageUrl
          $("#shoe-img").append(img)
          $("#shoe-name").html(array[index].shoe);
          $("#relDate").html("Release Date: " + array[index].releaseDate);       
          $("#retailPrice").html("Current Cost: $" + array[index].retailPrice);
          $("#styleID").html("Style ID: " + array[index].styleId);
        }
      })


     }).catch((err) => {
       console.error(err);
    });
 }
   
$(function(){
 $("div.star-rating > s, div.star-rating-rtl > s").on("click", function(e) {

  // remove all active classes first, needed if user clicks multiple times
  $(this).closest('div').find('.active').removeClass('active');

  $(e.target).parentsUntil("div").addClass('active'); // all elements up from the clicked one excluding self
  $(e.target).addClass('active');  // the element user has clicked on


      num = $(e.target).parentsUntil("div").length+1;
      localStorage.setItem("rating", JSON.stringify(num));
      })
    })

const renderReview = async (e) => {
  e.preventDefault()
  const review_title = document.querySelector('input[name="review_title"]').value
  const review = document.querySelector('input[name="review"]').value
  const rating = JSON.parse(localStorage.getItem("rating"))

  console.log(rating)

  const product_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

    const response = await fetch('/api/review/', {
      method: 'POST',
      body: JSON.stringify({review_title, review, rating, product_id}),
      headers: {'Content-Type': 'application/json'}
    });

    if (response.ok) {
      location.reload()
      console.log("okay")
    } else {
      alert(response.statusText)
    }
  }

renderSneaker();
document.querySelector(".newReview").addEventListener("submit", renderReview);