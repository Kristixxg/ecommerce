const displayDiv = document.getElementById("displayAllProducts");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const SignInBtn = document.getElementById("signIn");
const searchBtn = document.getElementById("searchBtn");
const pageNum = document.getElementById("pageNum");
const filterPanelDiv = document.getElementById("filterPanel");
const brandDiv = document.getElementById("brandDiv");
const categoryDiv = document.getElementById("categoryDiv");

let currentPage = 1;
let totalPage = 0;

// const fetchProducts = async () => {
//   try {
//     const res = await fetch(`/products?page=${currentPage}`);
//     if (!res.ok) {
//       throw new Error(
//         `Error fetching data, error status: ${res.status} and error message" ${res.message}`
//       );
//       return;
//     }
//     const datajson = await res.json();
//     totalPage = datajson.totalPages;
//     // console.log(totalPage);
//     displayProducts(datajson.products);
//   } catch (error) {
//     console.error(`Unable to get response, error: ${error}`);
//   }
// };
// fetchProducts();

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
      <img src="${element.imageURL}" alt="${element.name}">
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
  console.log("nextBtn clicked, current page: ", currentPage);
  currentPage++;
  console.log("nextBtn clicked, current page added one: ", currentPage);
  pageNum.innerText = "Page" + currentPage;
  if (currentPage === totalPage) {
    nextBtn.disabled = true;
  }
  getSelectedBoxes();
});

prevBtn.addEventListener("click", () => {
  nextBtn.disabled = false;
  console.log("Prev clicked, current page: ", currentPage);
  currentPage--;
  console.log("Prev clicked, current page minus one: ", currentPage);
  pageNum.innerText = "Page" + currentPage;
  if (currentPage === 1) {
    prevBtn.disabled = true;
    console.log("prev button disabled");
  }
  getSelectedBoxes();
});