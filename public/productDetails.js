const params = new URLSearchParams(window.location.search);
const productId = params.get("id");
const nameEl = document.getElementById("productName");
const brandEl = document.getElementById("productBrand");
const descriptionEl = document.getElementById("productDescription");
const priceEl = document.getElementById("price");
const imgEl = document.getElementById("img");
const favoriteBtn = document.getElementById("favoriteBtn");
const recommendationsDiv = document.getElementById("recommendations");
let isLoggedIn = false;

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
    priceEl.innerText = data.price;
    descriptionEl.innerText = data.description;
    imgEl.src = data.imageURL;
    console.log(recommendations);
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
  console.log(recArr);
  recommendationsDiv.innerHTML = "";
  recArr.forEach((rec) => {
    const div = `
        <div class="bg-white shadow-md rounded-lg overflow-hidden">
        <a target="_blank" href="productDetails.html?id=${rec._id}"> 
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

favoriteBtn.addEventListener("click", favProducts(productId));

const favProduct = async (id) => {
  try {
    if (isLoggedIn === false) {
      alert("Please Login First");
      return;
    }

    const response = await fetch(`/songs/${currentUserId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ songId }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      alert(`Error: ${response.status} - ${errorText}`);
    }

    const newlyAddedSong = await response.json();
    // console.log("Newly added song:", newlyAddedSong);

    renderLikedSongs(currentUserId);
  } catch (error) {
    console.error("Error in likeSong function:", error);
  }
};
