


const loadAllPost = async () => {
  const response = await fetch("https://openapi.programming-hero.com/api/retro-forum/posts");
  const data = await response.json();
  const posts = data.posts;
  // console.log((posts));
  showAllPost(posts)
}

const showAllPost = (posts) => {
  // console.log(posts);

  const postCardContainer = document.getElementById('posts-card-container');
  postCardContainer.textContent = '';

  posts.forEach(post => {
    // console.log(post);

    let isActive = null;

    if (post.isActive) {
      isActive = "bg-green-600";
    } else {
      isActive = "bg-red-600"
    };

    const newCard = document.createElement('div')
    newCard.classList = `flex gap-3 w-full bg-gray-50 shadow-md p-10 rounded-3xl mb-10`;
    newCard.innerHTML = `
      <!-- author icon -->
            <div class="w-12 h-12 bg-cover bg-center bg-[url('${post.image}')] rounded-xl flex justify-end">
              <div class="w-3 h-3 ${isActive} rounded-full mr-[-3px] mt-[-3px]"></div>
            </div>
            <!-- author content -->
            <div class="flex flex-col gap-4 w-full">
              <div class="flex gap-6 text-lg font-semibold">
                <h5># <span>${post.category}</span> </h5>
                <h5>Author: <span>${post?.author?.name}</span></h5>
              </div>
              <div>
                <h2 id="post-title" class="text-2xl font-extrabold">${post.title}</h2>
              </div>
              <div>
                <p class="description font-medium text-gray-500">${post.description}</p>
              </div>
              <hr class="border border-gray-300 border-dashed">
              <div class="flex justify-stretch">
                <div class="flex flex-1 gap-8">
                  <div class="comment">
                    <i class="fa-regular fa-message"></i>
                    <span>${post.comment_count}</span>
                  </div>
                  <div class="impression">
                    <i class="fa-regular fa-eye"></i>
                    <span>${post.view_count}</span>
                  </div>
                  <div class="read-time">
                    <i class="fa-regular fa-clock"></i>
                    <span> ${post.posted_time} min</span>
                  </div>
                </div>
                <div class="w-8 h-8 bg-green-500 flex justify-center items-center rounded-full cursor-pointer">
                  <i onclick="markAsRead(event)" class="fa-regular fa-envelope-open"></i>
                </div>
              </div>
            </div>
    `;

    postCardContainer.appendChild(newCard)

  });
};

const markAsRead = (event) => {
  const title = event.target.parentNode.parentNode.parentNode.childNodes[3].childNodes[1].innerText;
  const view_count = event.target.parentNode.parentNode.parentNode.lastChild.previousSibling.childNodes[1].childNodes[3].childNodes[3].innerText;
  console.log(view_count);

  const markReadContainer = document.getElementById('mark-read-container');

  const markReadCard = document.createElement('div')
  markReadCard.classList = `bg-white p-4 flex rounded-2xl mb-8 justify-between items-center`;
  markReadCard.innerHTML = `
         
           <h1 class="text-xl font-extrabold">${title}</h1>
           <div class="flex items-center gap-3">
            <i class="fa-regular fa-eye"></i>
            <span>${view_count}</span>
           </div>
  `;
  markReadContainer.appendChild(markReadCard);
}

loadAllPost()

const loadLatestPost = async () => {
  const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
  const data = await res.json();

  const latestPostContainer = document.getElementById('latest-post-container');

  data.forEach(latest => {
    // console.log(latest);

    const newCard = document.createElement('div');
    newCard.classList = `border p-8 rounded-3xl flex flex-col justify-between shadow-sm w-full`;
    newCard.innerHTML = `
          <div class="">
            <img class="w-full rounded-2xl" src="${latest.cover_image}" alt="">
          </div>
          <div class="date flex gap-3 items-center font-normal text-gray-500">
            <i class="fa-regular fa-calendar-minus"></i>
            <span>${latest?.author?.posted_date ? latest?.author?.posted_date : "No Publish Date"}</span>
          </div>

          <div class="title font-extrabold text-xl">
            <h1>${latest.title}</h1>
          </div>

          <div>
            <p class="font-normal text-lg ">${latest.description} </p>
          </div>

          <div class="author flex items-center gap-4">
            <div class="w-10 h-10 rounded-full">
              <img class="rounded-full" src="${latest.profile_image}" alt="">
            </div>
            <div>
              <h4 class="font-extrabold text-lg">${latest.author.name}</h4>
              <p class="text-gray-500">${latest?.author?.designation ? latest.author.designation : "Unknown"}</p>
            </div>
          </div>
    `;
    latestPostContainer.appendChild(newCard)

  })
}

loadLatestPost()


document.getElementById('search-button').addEventListener('click', function () {
  const inputField = document.getElementById('input-field');
  const inputText = inputField.value;

  if (!inputText) return;

  const postByQuery = async (inputText) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${inputText}`);
    const data = await response.json();
    const queryPost = data.posts;

    showAllPost(queryPost)

  }

  postByQuery(inputText)


})