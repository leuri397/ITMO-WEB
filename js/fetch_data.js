function genErrorBanner(err) {
    image = document.getElementById('loader-background');
    image.src = './images/error-background.jpg';
    text = document.getElementById('loader-text');
    text.innerText = "Ошибка"
}

function genComments(comment) {
    placeholder = document.getElementsByClassName('loaded-content')[0]
    placeholder.innerHTML = ''
    comment.forEach((x, i) => {
        article = document.createElement('article')
        header = document.createElement('h2')
        header.innerText = x.name
        commentBody = document.createElement('p')
        commentBody.innerText = x.body
        article.appendChild(header)
        article.appendChild(commentBody)
        placeholder.appendChild(article)
    });
}

first_comment = Math.floor(Math.random()*200)
fetch('https://jsonplaceholder.typicode.com/comments?_start=' + first_comment + '&_limit=3')
  .then(response => response.json())
  .then(genComments, genErrorBanner)
