const STORAGE = { donors: "raktsetu-donors", requests: "raktsetu-requests", theme: "raktsetu-theme" };
const groups = ["A+", "A−", "B+", "B−", "AB+", "AB−", "O+", "O−"];
const compatibility = { "A+": ["A+", "A−", "O+", "O−"], "A−": ["A−", "O−"], "B+": ["B+", "B−", "O+", "O−"], "B−": ["B−", "O−"], "AB+": groups, "AB−": ["AB−", "A−", "B−", "O−"], "O+": ["O+", "O−"], "O−": ["O−"] };
const cities = { Mumbai: [19.076, 72.8777], Delhi: [28.6139, 77.209], Bengaluru: [12.9716, 77.5946], Pune: [18.5204, 73.8567], Hyderabad: [17.385, 78.4867], Dhaka: [23.8103, 90.4125], Chattogram: [22.3569, 91.7832], Sylhet: [24.8949, 91.8687] };
const sampleDonors = [
  { id: "s1", name: "Arjun", blood: "O+", city: "Mumbai", distance: 2.4, lat: 19.094, lon: 72.862, available: true, sample: true, lastDonation: "2026-10-11" },
  { id: "s2", name: "Priya", blood: "A+", city: "Mumbai", distance: 4.8, lat: 19.035, lon: 72.901, available: true, sample: true, lastDonation: "2026-09-20" },
  { id: "s3", name: "Kabir", blood: "O−", city: "Mumbai", distance: 7.2, lat: 19.125, lon: 72.847, available: true, sample: true, lastDonation: "2026-08-04" },
  { id: "s4", name: "Nisha", blood: "B+", city: "Delhi", distance: 3.1, lat: 28.632, lon: 77.193, available: true, sample: true, lastDonation: "2026-10-10" },
  { id: "s5", name: "Rohan", blood: "AB+", city: "Bengaluru", distance: 5.6, lat: 13.019, lon: 77.573, available: true, sample: true, lastDonation: "2026-09-30" },
  { id: "s6", name: "Ananya", blood: "B−", city: "Pune", distance: 8.5, lat: 18.493, lon: 73.823, available: true, sample: true, lastDonation: "2026-09-02" },
  { id: "s7", name: "Dev", blood: "A−", city: "Mumbai", distance: 11.4, lat: 19.021, lon: 72.855, available: true, sample: true, lastDonation: "2026-10-01" },
  { id: "s8", name: "Ishita", blood: "AB−", city: "Delhi", distance: 6.7, lat: 28.581, lon: 77.238, available: true, sample: true, lastDonation: "2026-09-14" },
  { id: "s9", name: "Vikram", blood: "O+", city: "Hyderabad", distance: 4.2, lat: 17.412, lon: 78.466, available: true, sample: true, lastDonation: "2026-10-25" },
  { id: "s10", name: "Tara", blood: "A+", city: "Pune", distance: 4.9, lat: 18.559, lon: 73.798, available: true, sample: true, lastDonation: "2026-08-28" },
  { id: "s11", name: "Sameer", blood: "O−", city: "Bengaluru", distance: 9.3, lat: 12.948, lon: 77.638, available: true, sample: true, lastDonation: "2026-10-03" },
  { id: "s12", name: "Mehul", blood: "B−", city: "Hyderabad", distance: 7.8, lat: 17.361, lon: 78.512, available: true, sample: true, lastDonation: "2026-09-18" },
  { id: "s13", name: "Sana", blood: "AB+", city: "Mumbai", distance: 13.6, lat: 19.143, lon: 72.932, available: true, sample: true, lastDonation: "2026-10-15" },
  { id: "s14", name: "Aditya", blood: "A−", city: "Bengaluru", country: "India", distance: 12.2, lat: 13.001, lon: 77.548, available: true, sample: true, lastDonation: "2026-08-19" },
  { id: "s15", name: "Rahim", blood: "O+", city: "Dhaka", country: "Bangladesh", distance: 2.8, lat: 23.825, lon: 90.407, available: true, sample: true, lastDonation: "2026-10-12" },
  { id: "s16", name: "Nusrat", blood: "B+", city: "Dhaka", country: "Bangladesh", distance: 5.4, lat: 23.779, lon: 90.432, available: true, sample: true, lastDonation: "2026-09-22" },
  { id: "s17", name: "Tanvir", blood: "A−", city: "Chattogram", country: "Bangladesh", distance: 3.6, lat: 22.371, lon: 91.806, available: true, sample: true, lastDonation: "2026-08-30" },
  { id: "s18", name: "Maliha", blood: "AB+", city: "Sylhet", country: "Bangladesh", distance: 4.1, lat: 24.905, lon: 91.875, available: true, sample: true, lastDonation: "2026-10-05" }
];
const $ = (selector) => document.querySelector(selector);
const stored = (key, fallback) => JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));
let donors = stored(STORAGE.donors, []);
let requests = stored(STORAGE.requests, [
  { id: "r1", blood: "O−", hospital: "City Care Hospital", city: "Mumbai", urgency: "Critical", units: 2, posted: "12 min ago", status: "Active" },
  { id: "r2", blood: "A+", hospital: "Sunrise Medical", city: "Delhi", urgency: "Urgent", units: 3, posted: "34 min ago", status: "Active" },
  { id: "r3", blood: "B+", hospital: "Fortis Memorial", city: "Bengaluru", urgency: "Routine", units: 1, posted: "2 hrs ago", status: "Active" },
  { id: "r4", blood: "AB−", hospital: "Green Valley Hospital", city: "Pune", urgency: "Urgent", units: 2, posted: "3 hrs ago", status: "Active" },
  { id: "r5", blood: "O+", hospital: "Apollo Care Centre", city: "Hyderabad", urgency: "Routine", units: 1, posted: "5 hrs ago", status: "Active" },
  { id: "r6", blood: "A−", hospital: "Lotus Multispeciality", city: "Mumbai", country: "India", urgency: "Critical", units: 4, posted: "6 hrs ago", status: "Active" },
  { id: "r7", blood: "O+", hospital: "Dhaka Medical College", city: "Dhaka", country: "Bangladesh", urgency: "Critical", units: 2, posted: "18 min ago", status: "Active" },
  { id: "r8", blood: "B−", hospital: "Chattogram General Hospital", city: "Chattogram", country: "Bangladesh", urgency: "Urgent", units: 1, posted: "1 hr ago", status: "Active" }
]);
const allDonors = () => [...donors, ...sampleDonors];
const initials = (name) => name.split(" ").map((word) => word[0]).join("").slice(0, 2).toUpperCase();
const showToast = (message) => { const toast = $("#toast"); toast.textContent = message; toast.classList.add("show"); window.setTimeout(() => toast.classList.remove("show"), 3200); };
const save = (key, value) => localStorage.setItem(key, JSON.stringify(value));
const countryCities = { India: ["Mumbai", "Delhi", "Bengaluru", "Pune", "Hyderabad"], Bangladesh: ["Dhaka", "Chattogram", "Sylhet"] };
const updateCityOptions = (select, country, includeAny = false) => {
  const current = select.value;
  const options = country === "Any" ? Object.values(countryCities).flat() : countryCities[country];
  select.innerHTML = `${includeAny ? '<option value="Any">Anywhere</option>' : ""}${options.map((city) => `<option value="${city}">${city}${includeAny ? `, ${country === "Any" ? (Object.keys(countryCities).find((key) => countryCities[key].includes(city))) : country}` : ""}</option>`).join("")}`;
  if ([...select.options].some((option) => option.value === current)) select.value = current;
};
const openRequestModal = () => { document.body.classList.add("request-modal-open"); $("#request-blood").classList.add("modal-view"); };
const closeRequestModal = () => { document.body.classList.remove("request-modal-open"); $("#request-blood").classList.remove("modal-view"); };
const distanceBetween = (from, to) => {
  const radians = (value) => value * Math.PI / 180;
  const earthRadius = 6371;
  const latitude = radians(to.lat - from[0]);
  const longitude = radians(to.lon - from[1]);
  const a = Math.sin(latitude / 2) ** 2 + Math.cos(radians(from[0])) * Math.cos(radians(to.lat)) * Math.sin(longitude / 2) ** 2;
  return earthRadius * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};
const donatedWithin90Days = (donor) => !donor.lastDonation || (Date.now() - new Date(donor.lastDonation).getTime()) <= 90 * 24 * 60 * 60 * 1000;

function renderRequests() {
  $("#request-list").innerHTML = requests.slice(0, 3).map((request) => `<article class="request-card"><div class="request-card-top"><span class="group-badge">${request.blood}</span><span class="urgency ${request.urgency === "Routine" ? "routine" : ""}">${request.urgency}</span></div><h3>${request.hospital}</h3><p>${request.city}, ${request.country || "India"} · ${request.units} unit${request.units > 1 ? "s" : ""} needed</p><div class="request-card-footer"><span>${request.posted || "Just now"}</span><a href="#find-blood" data-request-group="${request.blood}">Help this patient ↗</a></div></article>`).join("");
  $("#request-stat").textContent = String(347 + requests.filter((request) => request.id.startsWith("local")).length);
}

const RESULTS_PAGE_SIZE = 3;
let displayedMatches = [];
let displayedGroup = "";
let displayedCity = "Any";
let displayedPage = 0;
function renderResultsPage() {
  const matches = displayedMatches;
  const group = displayedGroup;
  const city = displayedCity;
  const result = $("#donor-results");
  $("#results-title").textContent = matches.length ? group ? `${matches.length} compatible donor${matches.length === 1 ? "" : "s"} found` : `${matches.length} donor${matches.length === 1 ? "" : "s"} available` : "No nearby donors found";
  $("#results-subtitle").textContent = matches.length
    ? group ? `Showing the closest matches for ${group} in ${city === "Any" ? "all cities" : city}` : "Showing all available donors"
    : "Try expanding your distance or searching nearby cities.";
  if (!matches.length) { result.innerHTML = `<div class="empty-state"><span class="empty-icon">♡</span><strong>No match in this radius yet</strong><p>Try searching anywhere or post a request to alert the community.</p><a class="button button-primary" href="#request-blood">Post a request <span>→</span></a></div>`; return; }
  const pageCount = Math.ceil(matches.length / RESULTS_PAGE_SIZE);
  const pageMatches = matches.slice(displayedPage * RESULTS_PAGE_SIZE, (displayedPage + 1) * RESULTS_PAGE_SIZE);
  result.innerHTML = pageMatches.map((donor) => `<article class="donor-result"><div class="donor-avatar">${initials(donor.name)}</div><div class="donor-info"><strong>${donor.name} <span class="group-badge">${donor.blood}</span></strong><div class="donor-meta">${donor.city} · ${donor.sample ? "Sample donor" : "Registered donor"}</div><div class="match-type">${donor.blood === group ? "✓ Exact match" : "✓ Compatible match"}</div><div class="contact-actions"><a href="https://wa.me/?text=Hello ${donor.name}, I found you through BloodLink." target="_blank" rel="noreferrer">WhatsApp ↗</a><a href="sms:?body=Hello ${donor.name}, I found you through BloodLink.">SMS ↗</a></div></div><div class="donor-distance"><strong>${donor.distance.toFixed(1)} km</strong><small>away</small></div></article>`).join("") + (pageCount > 1 ? `<div class="results-pagination"><button type="button" data-results-page="${displayedPage - 1}" ${displayedPage === 0 ? "disabled" : ""}>← Previous</button><span>Page ${displayedPage + 1} of ${pageCount}</span><button type="button" data-results-page="${displayedPage + 1}" ${displayedPage === pageCount - 1 ? "disabled" : ""}>Next donors →</button></div>` : "");
}
function renderResults(matches, group, city) {
  displayedMatches = matches;
  displayedGroup = group;
  displayedCity = city;
  displayedPage = 0;
  renderResultsPage();
}
const renderAllDonors = () => {
  const matches = allDonors().filter((donor) => donor.available && donatedWithin90Days(donor)).map((donor) => ({ ...donor, distance: Number(donor.distance) || 0 })).sort((a, b) => a.distance - b.distance);
  renderResults(matches, "", "Any");
};
const demoRequest = { patient: "Baby Aria", blood: "O−", units: "2", urgency: "Critical — within 6 hours", hospital: "Dhaka Medical College", country: "Bangladesh", city: "Dhaka", requester: "Nadia Rahman", contact: "8801812345678", notes: "Urgently needed for surgery today." };
const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
async function fillDemoRequest() {
  openRequestModal();
  const button = $("#demo-fill");
  button.disabled = true; button.classList.add("busy"); button.textContent = "✦ Filling…";
  for (const [name, value] of Object.entries(demoRequest)) {
    const field = document.querySelector(`#request-form [name="${name}"]`);
    if (!field) continue;
    field.classList.add("demo-active");
    if (field.tagName === "SELECT") { field.value = value; field.dispatchEvent(new Event("change", { bubbles: true })); await pause(350); }
    else { field.value = ""; for (const character of value) { field.value += character; await pause(24); } }
    field.classList.remove("demo-active");
  }
  button.disabled = false; button.classList.remove("busy"); button.textContent = "✓ Demo filled"; showToast("Demo request filled and ready to submit.");
  setTimeout(() => { button.textContent = "✨ Fill demo"; }, 1800);
}
$("#demo-fill").addEventListener("click", fillDemoRequest);
document.addEventListener("click", (event) => {
  const pageButton = event.target.closest("[data-results-page]");
  if (!pageButton || pageButton.disabled) return;
  displayedPage = Number(pageButton.dataset.resultsPage);
  renderResultsPage();
});

$("#distance-range").addEventListener("input", (event) => { $("#distance-value").textContent = `${event.target.value} km`; });
$("#search-country").addEventListener("change", (event) => updateCityOptions($("#search-city"), event.target.value, true));
document.querySelectorAll('select[name="country"]').forEach((countrySelect) => countrySelect.addEventListener("change", (event) => updateCityOptions(event.target.parentElement.parentElement.querySelector('select[name="city"]'), event.target.value)));
$("#search-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const group = $("#search-blood").value; const country = $("#search-country").value; const city = $("#search-city").value; const maxDistance = Number($("#distance-range").value);
  if (!group) return;
  const matches = allDonors().filter((donor) => donor.available && donatedWithin90Days(donor) && compatibility[group].includes(donor.blood) && (country === "Any" || (donor.country || "India") === country) && (city === "Any" || donor.city === city)).map((donor) => {
    const distance = city === "Any" || !donor.lat ? donor.distance : distanceBetween(cities[city], donor);
    return { ...donor, distance };
  }).filter((donor) => donor.distance <= maxDistance).sort((a, b) => (a.blood === group ? 0 : 1) - (b.blood === group ? 0 : 1) || a.distance - b.distance);
  renderResults(matches, group, city);
});

$("#donor-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.currentTarget));
  const donor = { ...data, id: `local-${Date.now()}`, name: data.name.split(" ")[0], available: Boolean(data.available), distance: 1.2, sample: false };
  donors.push(donor); save(STORAGE.donors, donors); event.currentTarget.reset(); event.currentTarget.querySelector('[name="available"]').checked = true;
  $("#donor-stat").textContent = (12584 + donors.length).toLocaleString(); showToast("You’re registered! Thank you for joining the bridge.");
});

$("#request-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.currentTarget));
  const urgency = data.urgency.split(" ")[0]; const request = { ...data, id: `local-${Date.now()}`, posted: "Just now", status: "Active", urgency };
  requests.unshift(request); save(STORAGE.requests, requests); renderRequests(); event.currentTarget.reset(); showToast("Request posted — matching donors are ready to help.");
  closeRequestModal(); document.querySelector("#community").scrollIntoView({ behavior: "smooth" });
});

$("#theme-toggle").addEventListener("click", () => { document.body.classList.toggle("dark"); localStorage.setItem(STORAGE.theme, document.body.classList.contains("dark") ? "dark" : "light"); });
if (localStorage.getItem(STORAGE.theme) === "dark") document.body.classList.add("dark");
document.addEventListener("click", (event) => {
  const requestLink = event.target.closest('a[href="#request-blood"]');
  if (requestLink) { event.preventDefault(); openRequestModal(); return; }
  const link = event.target.closest("[data-request-group]");
  if (!link) return;
  $("#search-blood").value = link.dataset.requestGroup; $("#find-blood").scrollIntoView({ behavior: "smooth" });
});
$("#request-close").addEventListener("click", closeRequestModal);
document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeRequestModal(); });
renderRequests();
renderAllDonors();
