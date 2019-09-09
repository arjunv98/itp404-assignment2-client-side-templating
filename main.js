const postsTemplate = Handlebars.compile(
  document.getElementById('posts-template').innerHTML
);

const headerTemplate = Handlebars.compile(
  document.getElementById('header-template').innerHTML
);

Handlebars.registerHelper('format-num', function(num) {
  return num.toLocaleString();
});

$('.search-bar button').on('click', async function(e) {
  e.preventDefault();
  $('#results').html('<div class="loader">Loading...</div>');

  let searchTerm = $('.search-bar input').val();
  let cleanSearchTerm = DOMPurify.sanitize(searchTerm);
  let url = "https://www.reddit.com/r/" + cleanSearchTerm + ".json";

  try {
    let posts = await $.ajax({
      type: 'GET',
      url: url
    });
    
    posts = posts.data.children;
    let firstPost = posts[0];

    let sanitizedHeader = headerTemplate({ firstPost });
    let sanitizedPosts = postsTemplate({ posts });

    $('#header').html(sanitizedHeader);
    $('#results').html(sanitizedPosts); 
  } catch (error) {
    $('#results').html('Oops, something went wrong.')
    console.log(error);
  }
});

/* Can search by hitting return */
$('.search-bar').on('keypress', function(e) {
  if(e.which == 13) {
    $('.search-bar button').click();
  }
});