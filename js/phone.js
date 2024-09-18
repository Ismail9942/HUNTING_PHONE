const loadPhones = async (searchText, isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  displayPhone(phones, isShowAll);
  //   console.log(phones);
};

const displayPhone = (phones, isShowAll) => {
  //   console.log(phones);
  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.textContent = "";

  const showAllContainer = document.getElementById("show-all");

  if (phones.length > 12 && !isShowAll) {
    showAllContainer.classList.remove("hidden");
  } else {
    showAllContainer.classList.add("hidden");
  }

  //   console.log("is show all", isShowAll);
  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }
  phones.forEach((phone) => {
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card bg-gray-300   shadow-xl`;
    phoneCard.innerHTML = `
      
      <figure class="px-10 pt-10">
            <img
              src="${phone.image}"
              alt="Shoes"
              class="rounded-xl"
            />
          </figure>
          <div class="card-body items-center text-center">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>${phone.slug}</p>
            <div class="card-actions">
              <button onclick="showDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
            </div>
          </div>
      
      `;

    phoneContainer.appendChild(phoneCard);
    // console.log(phone);
  });

  //   hidden loading spinner
  loadingSpinner(false);
};

const showDetails = async (id) => {
  //   console.log("clicked", id);
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const phone = data.data;
  showPhoneDetails(phone);
};

const showPhoneDetails = (phone) => {
  console.log(phone);

  const phoneName = document.getElementById("show-phone-name");
  phoneName.innerText = phone.name;

  const showDetailsContainer = document.getElementById(
    "show-details-container"
  );

  showDetailsContainer.innerHTML = `
  <img src="${phone.image}" alt="" />
  <p>storage : <span>${phone.mainFeatures?.storage}</span></p>
  <p>Memory: <span>${phone.mainFeatures?.memory}</span></p>
  <p>Display: <span>${phone.mainFeatures?.displauSize}</span></p>
  <p>ChipSet: <span>${phone.mainFeatures?.chipSet}</span></p>
  
  
  `;

  show_detail_modal.showModal();
};

// handleSearch button

const handleSearch = (isShowAll) => {
  loadingSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  loadPhones(searchText, isShowAll);

  //   console.log(searchText);
};

const loadingSpinner = (isLoading) => {
  const loading = document.getElementById("loading-spinner");
  if (isLoading) {
    loading.classList.remove("hidden");
  } else {
    loading.classList.add("hidden");
  }
};

// handle show all

const handleShowAll = () => {
  handleSearch(true);
};

loadPhones();
