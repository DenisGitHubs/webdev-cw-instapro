import { goToPage, logout, user } from "../index.js";
import { ADD_POSTS_PAGE, AUTH_PAGE, POSTS_PAGE } from "../routes.js";

export function renderHeaderComponent({ element }) {
  element.innerHTML = `
  <div class="page-header">
      <h1 class="logo">instapro</h1>
      <button class="header-button add-or-login-button">
      ${
        user
          ? `<div title="Добавить пост" class="add-post-sign"></div>`
          : "Войти"
      }
      </button>
      ${
        user
          ? `<button title="${user.name}" class="header-button logout-button">Выйти</button>`
          : ""
      }  
      </button>
  </div>
  
`;

  element
    .querySelector(".add-or-login-button")
    .addEventListener("click", () => {

      if (user) {
        if (document.getElementById("user-head")) {
          document.getElementById("user-head").remove()
        }
        goToPage(ADD_POSTS_PAGE);
      } else {
        if (document.getElementById("user-head")) {
          document.getElementById("user-head").remove()
        }
        goToPage(AUTH_PAGE);
      }
    });

  element.querySelector(".logo").addEventListener("click", () => {
    goToPage(POSTS_PAGE);
    if (document.getElementById("user-head")) {
      document.getElementById("user-head").remove()
    }
  });

  element.querySelector(".logout-button")?.addEventListener("click", logout);

  return element;
}
