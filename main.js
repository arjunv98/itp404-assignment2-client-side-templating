$('.search-bar button').on('click', function() {
  $('#results').html('<div class="loader">Loading...</div>');

  let searchTerm = $('.search-bar input').val();
  let cleanSearchTerm = DOMPurify.sanitize(searchTerm);
  let url = "https://www.reddit.com/r/" + cleanSearchTerm + ".json";

  let promise = $.ajax({
    type: 'GET',
    url: url
  });

  promise.then(function(posts) {
    posts = posts.data.children;
    let fragment = document.createDocumentFragment();

    posts.forEach(function(post) {
      let div = document.createElement('div');
      div.className = 'post';

      let title = document.createElement('a');
      title.href = post.data.url;
      title.innerText = post.data.title;

      let author = document.createElement('p');
      author.innerText = 'Author: ' + post.data.author;

      let score = document.createElement('p');
      score.innerText = post.data.score + ' upvotes';

      div.appendChild(title);
      div.appendChild(author);
      div.appendChild(score);
      fragment.append(div);
    });

    let sanitizedHtml = DOMPurify.sanitize(fragment);
    $('#results').html(sanitizedHtml);
  });
});