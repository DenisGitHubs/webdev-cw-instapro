import { USER_POSTS_PAGE, AUTH_PAGE, POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage } from "../index.js";
import { formatDistanceToNow } from "date-fns";
import { AddLikes, disLikes, getPosts } from "../api.js";
import { getToken, user } from "../index.js";

export let checkToken = [];

const ruLocale = require('date-fns/locale/ru')
export function renderPostsPageComponent({ appEl, allUsersAndComments, ruLocale, checkToken }) {

let userName = '';
if({user} === !null) {
  userName = {user}.user.name 
} 
  const appHtml =
    allUsersAndComments.map((user) => {
      let indexName = null;
      let indexLikesLength = user.likes.length
      let other = 0;
      if (user.likes.length > 1) {
        indexName = user.likes[0].name === userName ? user.likes[1].name : user.likes[0].name;
        other = user.likes.length - 1;
      }
      if (user.likes.length === 1) {
        indexName = user.likes[0].name === userName ? null : user.likes[0].name;
      
      }


      const createDate = formatDistanceToNow(new Date(user.createdAt), '2015, 0, 1, 0, 0, 15', { locale: ruLocale });
      return `
                  <li class="post">
                    <div class="post-header" data-user-id=${user.user.id}>
                        <img src=${user.user.imageUrl} class="post-header__user-image">
                        <p class="post-header__user-name">${user.user.name}</p>
                    </div>
                    <div class="post-image-container">
                      <img class="post-image" src=${user.imageUrl}>
                    </div>
                    <div class="post-likes">
                      <button data-post-id=${user.id} data-like=${user.isLiked} class="like-button">
                      "${user.isLiked ? '<img src="./assets/images/like-active.svg">' : '<img src="./assets/images/like-not-active.svg">'}"  
                      </button>
                      <p class="post-likes-text" data-index=${indexLikesLength} first-name=${indexName}>
                        Нравится: <strong>${user.likes.length == 0 ? 0 : user.likes.length == 1 ? user.likes[0].name : `${user.likes[0].name} и ещё ${other}`}</strong>
                      </p>
                    </div>
                    <p class="post-text">
                      <span class="user-name">${user.user.name}: </span>
                      ${user.description}
                    </p>
                    <p class="post-date">
                    ${createDate}
                    </p>
                  </li>
`;
    })
      .join("")
  appEl.innerHTML = appHtml;
  // userHeadApp.innerHTML = "";

  renderHeaderComponent({
    element: document.querySelector(".header-container"),

  });
  likeButton({checkToken});
  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
    });
  }

}


function likeButton() {

  let likesDivs = document.querySelectorAll(".post-likes");
  for (const likeDiv of likesDivs) {
    let found = likeDiv.querySelector(".post-likes-text")
    let foundIndex = likeDiv.querySelector(".post-likes-text").getAttribute("data-index")
    let firstName = likeDiv.querySelector(".post-likes-text").getAttribute("first-name")
  
  
    let likeChange = likeDiv.querySelector(".like-button")

    likeChange.addEventListener('click', () => {
  
  
      let id = likeChange.getAttribute('data-post-id');
      
      if (likeChange.getAttribute('data-like') === "true") {
        foundIndex = Number(foundIndex) - 1;
        if (Number(foundIndex) === 0) {
          found.innerHTML = `Нравится: 0`
  
        }
        
        if (Number(foundIndex) === 1) {
          found.innerHTML = `Нравится:<strong> ${firstName} <strong>`
  
        }
        if (Number(foundIndex) > 1) {
          found.innerHTML = `Нравится:<strong> ${firstName} и еще ${Number(foundIndex) - 1} <strong>`
          console.log(object);
  
  
        }
  
  
        disLikes({ id, token: getToken() })
          likeChange.setAttribute('data-like', "false"),
          likeChange.innerHTML = `<img src="./assets/images/like-not-active.svg">`;
  
  
      } else {
        checkToken = getToken();
        if(checkToken)
        {
          if (Number(foundIndex) > 0) {
            found.innerHTML = `Нравится:<strong> Вам и еще ${foundIndex} <strong>`
  
            foundIndex = Number(foundIndex) + 1;
  
          }
          if (Number(foundIndex) === 0) {
            found.innerHTML = "Нравится: <strong>Вам <strong>"
            // console.log(foundIndex)
            foundIndex = Number(foundIndex) + 1;
  
          }
  
  
          AddLikes({
            id, token: checkToken
          })
          likeChange.setAttribute('data-like', "true")
          likeChange.innerHTML = `<img src="./assets/images/like-active.svg">`
        }
        AddLikes({
          id, token: checkToken
        })
        .catch((Error) => {
          console.error(Error);
            goToPage(AUTH_PAGE);
  
        })
      }
  
    });
    
  }
  
    }
