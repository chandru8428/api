const container = document.getElementById("countries-container");
const searchInput = document.getElementById("search");

let countries = []; // store countries data globally

// Show loading message
container.innerHTML = "<p>⏳ Loading countries...</p>";

// Fetch all countries from API
async function fetchCountries() {
  try {
    const res = await fetch("https://restcountries.com/v3.1/all");

    if (!res.ok) throw new Error("Network response was not ok");

    countries = await res.json();
    showCountries(countries);

    // Enable live search
    searchInput.addEventListener("input", () => {
      const query = searchInput.value.toLowerCase().trim();
      const filtered = countries.filter(c =>
        c.name.common.toLowerCase().includes(query)
      );
      showCountries(filtered, query);
    });

  } catch (error) {
    console.error("Fetch error:", error);
    container.innerHTML = `<p style="color:red">❌ Failed to load countries. Please check your internet connection and try again.</p>`;
  }
}

// Show country cards or messages
function showCountries(data, query = "") {
  container.innerHTML = "";

  if (data.length === 0) {
    container.innerHTML = `<p>😕 No country found for "<strong>${query}</strong>"</p>`;
    return;
  }

  data.forEach(country => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${country.flags?.png}" alt="${country.name.common} Flag">
      <h2>${country.name.common}</h2>
      <p><strong>Capital:</strong> ${country.capital?.[0] || "N/A"}</p>
      <p><strong>Region:</strong> ${country.region}</p>
      <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
    `;

    container.appendChild(card);
  });
}

// Call the function
fetchCountries();
