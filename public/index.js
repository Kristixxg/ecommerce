const displayDiv = document.getElementById("displayAllProducts");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const SignInBtn = document.getElementById("signIn");
const searchBtn = document.getElementById("searchBtn");

let currentPage = 1;
let totalPage = 0;

const fetchProducts = async () => {
  try {
    const res = await fetch(`/products?page=${currentPage}`);
    if (!res.ok) {
      throw new Error(
        `Error fetching data, error status: ${res.status} and error message" ${res.message}`
      );
      return;
    }
    const datajson = await res.json();
    totalPage = datajson.totalPages;
    displayProducts(datajson.products);
  } catch (error) {
    console.error(`Unable to get response, error: ${error}`);
  }
};
fetchProducts();

nextBtn.addEventListener("click", () => {
  // if (currentPage === totalPage) {
  //   nextBtn.disabled = true;
  // }
  currentPage++;
  console.log(currentPage);
  fetchProducts();
});

prevBtn.addEventListener("click", (e) => {
  // if (currentPage === 1) {
  //   prevBtn.disabled = true;
  // }
  if (currentPage > 1) {
    currentPage--;
    fetchProducts();
  }
  console.log(currentPage);
});

const displayProducts = async (arr) => {
  displayDiv.innerHTML = "";

  arr.forEach((element) => {
    const productDiv = `
     <div class="flex flex-col flex-none basis-1/3 p-2">
      <img src="${element.imageURL}" alt="${element.name}">
      <div>
       <p>${element.name}</p>
       <p><span>$</span>${element.price}<span>USD</span></p>
      </div>
     </div>`;
    displayDiv.innerHTML += productDiv;
  });
};
