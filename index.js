const intersection = (entries, observer) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      entry.target.src = entry.target.dataset.src;
      observer.unobserve(entry.target);
    }
  });
}

const lazyload = () => {
  const images = document.querySelectorAll(".card-image");
  const options = {
    root: null,
    rootMatgin: "0px",
    threshold: 0
  }
  const observer = new IntersectionObserver(intersection, options);
  
  images.forEach(image => observer.observe(image));
}

const createCard = (item) => {
  let link = item.description.replaceAll(" ", "%20");
  console.log(link);
  card = `
    <article class="card">
      <figure class="card-image-container">
        <a href="https://wa.me/+573203700302?text=Me%20interesa%20el%20producto%20${link}" target="_blank" rel="noreferrer">
          <img data-src=${item.image} alt=${item.title} loading="lazy" class="card-image"/>
        </a>
      </figure>
      <p class="card-title">${item.title}</p>
      <p class="card-description">${item.description}</p>
      <p class="card-price">${item.price}</p>
    </article>
  `;
  return card;
}

const createCardList = (data) => {
  const list = document.querySelector("#products");
  let cardList = "";

  for(const category in data) {
    if(data[category].length) {
      for(const item of data[category]) {
        cardList += createCard(item);
      }
    }
  }
  list.innerHTML = cardList;
  lazyload();
}

const getData = () => {
  fetch("data.json")
    .then(res => res.json())
    .then(res => createCardList(res));
}

getData();