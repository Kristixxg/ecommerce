const displayDiv = document.getElementById("displayAllProducts");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const SignInBtn = document.getElementById("signIn");
const logoutBtn = document.getElementById("logoutBtn");
const searchBtn = document.getElementById("searchBtn");
const pageNum = document.getElementById("pageNum");
const filterPanelDiv = document.getElementById("filterPanel");
const brandDiv = document.getElementById("brandDiv");
const categoryDiv = document.getElementById("categoryDiv");
const logoutDiv = document.getElementById("logoutDiv");
const signupDiv = document.getElementById("signupDiv");
const favoritesDiv = document.getElementById("favoritesDiv");
const unfavBtns = document.getElementsByClassName("deleteBtn");
const main = document.getElementById("main");
const adminDiv = document.getElementById("admin");
const coverDiv = document.getElementById("coverDiv");

let currentPage = 1;
let totalPage = 0;

const token = window.localStorage.getItem("token");
const id = window.localStorage.getItem("id");
const role = window.localStorage.getItem("role");
let isLoggedIn = token ? true : false;

function renderJSON(json, container) {
  if (typeof json === "object" && json !== null) {
    const objDiv = document.createElement("div");
    objDiv.classList.add("object");
    for (const key in json) {
      const keyElement = document.createElement("span");
      keyElement.classList.add("key");
      keyElement.textContent = key + ": ";

      objDiv.appendChild(keyElement);
      renderJSON(json[key], objDiv);
      objDiv.appendChild(document.createElement("br"));
    }
    container.appendChild(objDiv);
  } else {
    const valueElement = document.createElement("span");
    valueElement.textContent = json;
    container.appendChild(valueElement);
  }
}

const getAdminContent = async () => {
  try {
    const res = await fetch("/user/all");
    if (!res.ok) {
      throw new Error("error");
      return;
    }

    const allUsers = await res.json();

    const container = document.getElementById("json-container");
    renderJSON(allUsers, container);
  } catch (error) {
    console.error(error);
  }
};

if (role === "admin") {
  main.style.display = "none";
  adminDiv.style.display = "block";
  coverDiv.style.display = "none";

  getAdminContent();
}

const getFavoritedProducts = async () => {
  try {
    const response = await fetch(`/user/products`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("error status: ", response.status);
      return;
    }

    const dataJson = await response.json();
    const { products: productsIdArr, user } = dataJson;
    displayFavoritedProducts(productsIdArr);
  } catch (error) {
    console.error(error);
  }
};

if (isLoggedIn) {
  logoutDiv.style.display = "block";
  signupDiv.style.display = "none";
  favoritesDiv.style.display = "flex";
  getFavoritedProducts();
}

const displayFavoritedProducts = (arr) => {
  favoritesDiv.innerHTML = `  <h4 class="text-slate-600">Favorited Products</h4>`;

  arr.forEach((ele) => {
    const div = `
          <div
            class="flex flex-col items-start space-y-1 p-2 border border-gray-200 rounded shadow"
          >
            <img
              src="${ele.imageURL}"
              alt="Product Name"
              class="w-30 object-cover rounded"
            />
            <div class="text-sm font-semibold">${ele.name}</div>
            <div class="text-sm text-gray-600">$${ele.price} USD</div>
            <button
            data-product-id="${ele._id}"
            class="deleteBtn px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600"
            >
              Unfavorite
            </button>
          </div>`;

    favoritesDiv.innerHTML += div;
  });
};

document.addEventListener("click", async (e) => {
  if (e.target.classList.contains("deleteBtn")) {
    const button = e.target;
    const productId = button.dataset.productId;
    console.log(`Unfavorite button clicked for product ID: ${productId}`);

    const productCard = button.closest(".product-card");
    // const productId = productCard.dataset.productId;
    const userId = localStorage.getItem("id");

    try {
      const response = await fetch(`user/product/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, productId }),
      });

      const data = await response.json();
      // window.location.reload();
      getFavoritedProducts();
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while removing the product.");
    }
  }
});

logoutBtn.addEventListener("click", async () => {
  try {
    const res = await fetch("/user/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      alert("Unable to logout");
      return;
    }

    const dataJson = await res.json();
    console.log(dataJson.message);
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("username");
    window.localStorage.removeItem("id");
    window.localStorage.removeItem("role");
    document.location.href = "/";
  } catch (error) {
    console.error(`Error occur: ${error.message}`);
  }
});

const getSelectedBoxes = async () => {
  const selectedBrands = brandDiv.querySelectorAll(
    'input[type="checkbox"]:checked'
  );
  // console.log(selectedBrands);
  const brandList = [];
  selectedBrands.forEach((ele) => brandList.push(ele.value));
  // console.log(brandList);
  const selectedCategories = categoryDiv.querySelectorAll(
    'input[type="checkbox"]:checked'
  );
  const categorylist = [];
  selectedCategories.forEach((ele) => categorylist.push(ele.value));
  // console.log(categorylist);
  getFilteredProducts(brandList, categorylist);
};

const getFilteredProducts = async (brandArr, categoryArr) => {
  try {
    let url = `/products?page=${currentPage}`;

    if (categoryArr.length !== 0 && brandArr.length !== 0) {
      url = url.concat(
        `&brand=${brandArr.join(";")}&type=${categoryArr.join(";")}`
      );
    } else if (brandArr.length === 0) {
      url += `&type=${categoryArr.join(";")}`;
    } else if (categoryArr.length === 0) {
      url += `&brand=${brandArr.join(";")}`;
    }

    // url = url.toLowerCase();
    // console.log(url);
    const res = await fetch(url);
    if (!res.ok) {
      console.log("Error getting products", res.message);
      displayProducts([]);
      return;
    }

    const datajson = await res.json();
    totalPage = datajson.totalPages;
    const data = datajson.products;
    // console.log(data);
    // console.log(totalPage);
    displayProducts(data);
  } catch (error) {
    console.error(error);
    displayProducts([]);
  }
};

const displayProducts = async (arr) => {
  displayDiv.innerHTML = "";

  if (arr.length === 0) {
    displayDiv.innerHTML = `<p>No Product Found.</p>`;
  }

  arr.forEach((element) => {
    const productDiv = `
     <div class="flex flex-col flex-none basis-1/3 p-2">
     <a target="_blank" href="productDetails.html?id=${element._id}"> <img src="${element.imageURL}" alt="${element.name}"></a>
      <div>
       <p>${element.name}</p>
       <p><span>$</span>${element.price}<span>USD</span></p>
      </div>
     </div>`;
    displayDiv.innerHTML += productDiv;
  });
};

getSelectedBoxes();
filterPanelDiv.addEventListener("change", getSelectedBoxes);

nextBtn.addEventListener("click", () => {
  prevBtn.disabled = false;
  if (totalPage === 1) {
    nextBtn.disabled = true;
    return;
  }
  currentPage++;
  if (currentPage === totalPage) {
    nextBtn.disabled = true;
  }
  pageNum.innerText = "Page" + currentPage;
  getSelectedBoxes();
});

prevBtn.addEventListener("click", () => {
  nextBtn.disabled = false;
  if (currentPage === 1) {
    prevBtn.disabled = true;
    return;
  }
  currentPage--;
  pageNum.innerText = "Page" + currentPage;
  if (currentPage === 1) {
    prevBtn.disabled = true;
    console.log("prev button disabled");
  }
  getSelectedBoxes();
});
