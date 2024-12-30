const params = new URLSearchParams(window.location.search);
const productId = params.get("id");
const nameEl = document.getElementById("productName");
const brandEl = document.getElementById("productBrand");
const descriptionEl = document.getElementById("productDescription");
const priceEl = document.getElementById("price");
const imgEl = document.getElementById("img");
const favoriteBtn = document.getElementById("favoriteBtn");
const recommendationsDiv = document.getElementById("recommendations");
favoriteBtn.innerText = "Add to Favorite";

let isLoggedIn = window.localStorage.getItem("token") ? true : false;

if (isLoggedIn) {
  logoutDiv.style.display = "block";
  signupDiv.style.display = "none";
}

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

    window.localStorage.removeItem("token");
    window.localStorage.removeItem("username");
    window.localStorage.removeItem("id");
    window.localStorage.removeItem("role");
    document.location.href = "/";
  } catch (error) {
    console.error(`Error occur: ${error.message}`);
  }
});

const fetchProductDetails = async () => {
  try {
    const res = await fetch(`/products/details/${productId}`);
    if (!res.ok) {
      throw new Error("error getting data ", res.status);
    }

    const datajson = await res.json();
    const recommendations = datajson.recommendations;
    const data = datajson.product;
    nameEl.innerText = data.name;
    brandEl.innerText = data.brand.replace(/([a-z])([A-Z])/g, "$1 $2");
    priceEl.innerText = "$" + data.price + "USD";
    descriptionEl.innerText = data.description;
    imgEl.src = data.imageURL;
    // console.log(recommendations);
    getMoreBrandProducts(recommendations);
  } catch (error) {
    console.error("Get product details failed, ", error);
  }
};
fetchProductDetails();

const getMoreBrandProducts = (recArr) => {
  if (recArr.length > 5) {
    recArr.splice(5);
  }
  // console.log(recArr);
  recommendationsDiv.innerHTML = "";
  recArr.forEach((rec) => {
    const div = `
        <div class="bg-white shadow-md rounded-lg overflow-hidden">
        <a target="" href="productDetails.html?id=${rec._id}"> 
              <img
                class="w-full h-40 object-cover"
                src="${rec.imageURL}"
                alt="Product Image"
              /></a>
              <div class="p-4">
                <h3 class="text-lg font-medium text-gray-800">
                 ${rec.name}
                </h3>
                <p class="text-gray-500 text-sm">Price: ${rec.price}</p>
              </div>
            </div>`;

    recommendationsDiv.innerHTML += div;
  });
};

const favProduct = async (id) => {
  try {
    if (isLoggedIn === false) {
      alert("Please Login First");
      return;
    }

    favoriteBtn.innerText = "Added";
    const response = await fetch(`/products`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: id,
        userId: window.localStorage.getItem("id"),
      }),
    });

    if (!response.ok) {
      const errorText = await response.json();
      alert(errorText.message);
      console.log(`Error: ${response.status} - ${errorText}`);
    }

    const dataJson = await response.json();
    console.log(dataJson.user);
    // console.log("Newly faved product:", newlyFavedProduct);
    document.location.href = "/";
  } catch (error) {
    console.error("Error in favProduct function:", error);
  }
};

favoriteBtn.addEventListener("click", () => favProduct(productId));
