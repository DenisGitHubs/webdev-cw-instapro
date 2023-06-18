import { addPost } from "../api.js";
import { getToken, goToPage } from "../index.js";
import { renderHeaderComponent } from "./header-component.js";
import { renderUploadImageComponent } from "./upload-image-component.js";
import { POSTS_PAGE } from "../routes.js";


export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
  const render = () => {
    let isLoginMode = true;
    let imageUrl = "";
    // TODO: Реализовать страницу добавления поста
    const appHtml = `
</div>
    <div class="form">
      <h3 class="form-title">Добавить пост</h3>
      <div class="form-inputs">
        <div class="upload-image-container"></div>
        <label>
          Опишите фотографию:
          <textarea class="input textarea" rows="4" id="text-foto"></textarea>
          </label>
          <button class="button" id="add-button">Добавить</button>
      </div>
    </div>
  </div>
  `;

    appEl.innerHTML = appHtml;

    const setError = (message) => {
      appEl.querySelector(".form-error").textContent = message;
    };
    renderHeaderComponent({
      element: document.querySelector(".header-container"),
    });
    const uploadImageContainer = appEl.querySelector(".upload-image-container");

    renderUploadImageComponent({
      element: appEl.querySelector(".upload-image-container"),
      onImageUrlChange(newImageUrl) {
        imageUrl = newImageUrl;
      },
    });






    document.getElementById("add-button").addEventListener("click", () => {
      // onAddPostClick({
      //   description: "Описание картинки",
      //   // imageUrl: "https://image.png",
      // });
      // let textFoto = document.getElementById('text-foto');
      // addPost()
      // console.log(imageUrl);
      // uploadImage ({
      //   // description: textFoto.value,
      //   imageUrl
      // });
      const description = document.getElementById("text-foto").value
      console.log(description);

      addPost({ description, imageUrl, token: getToken() })
      goToPage(POSTS_PAGE)
        // .catch((error) => {
        //   console.warn(error);
        //   setError(error.message);
        // });
    });



    // document.getElementById("go_back-button")("click", () => {
    //   renderPostsPageComponent();
    // })
  };
  // const uploadImageAdd = renderUploadImageComponent({
  //   element: appEl.querySelector(".upload-image-container"),
  //   onImageUrlChange(newImageUrl) {
  //     imageUrl = newImageUrl;
  //   },
  // });

  render();

}
