// Search Shows by sending an axios request
async function searchShows(query) {
  const response = await axios.get('http://api.tvmaze.com/search/shows', {params: {q: query}})
  return response
}


// Populate shows list
function populateShows(response) {
  const $showsList = $("#shows-list");
  $showsList.empty();

  for (let obj of response.data) {

    let showId = obj.show.id
    let showName = obj.show.name
    let showSummary = obj.show.summary
    let showImage

    if (!obj.show.image) {
      showImage = "https://tinyurl.com/tv-missing"
    } else {
      showImage = obj.show.image.medium
    }

    let $item = $(
      `<div class="col-md-6 col-lg-3 Show" data-showId="${showId}">
         <div class="card" data-show-id="${showId}">
           <div class="card-body">
             <img class="card-img-top" src="${showImage}">
             <h5 class="card-title">${showName}</h5>
             <p class="card-text">${showSummary}</p>
             <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#episodesModal">
             Launch demo modal
             </button>
           </div>
         </div>
       </div>
      `);

    $showsList.append($item);
  }
}


// Handle search form submission
$("#search-form").on("submit", async function handleSearch (evt) {
  evt.preventDefault();

  let query = $("#search-query").val();
  if (!query) return;

  let shows = await searchShows(query);

  populateShows(shows);
});


// Handle episodes search and populating the incoming data
$("#shows-list").on("click", "button", async function handleEpisodes (event) {
  let show = event.target.closest(".Show")
  let episodes = await getEpisodes(show.dataset.showid)
  populateEpisodes(episodes.data)
})


// Given a show ID, return list of episodes: 
async function getEpisodes(id) {
  const response = await axios.get(`http://api.tvmaze.com/shows/${id}/episodes`)
  return response
}


// Populate episodes into modal window 
function populateEpisodes(episodes) {
  const $episodesList = $(".episodes-list")
  $episodesList.empty()

  for (episode of episodes) {
    let $item = $(`<li>Season ${episode.season} - Episode ${episode.number}: ${episode.name}</li>`)
    $episodesList.append($item)
  }
}