const client = supabase.createClient(
SUPABASE_URL,
SUPABASE_KEY
);

let allParts = [];

const results =
document.getElementById("results");

const stats =
document.getElementById("stats");

const search =
document.getElementById("search");

const brandFilter =
document.getElementById("brandFilter");

const unitFilter =
document.getElementById("unitFilter");

const stockFilter =
document.getElementById("stockFilter");

async function loadParts(){

const { data, error } =
await client
.from("public_parts")
.select("*")
.limit(1000);

if(error){
console.error(error);
return;
}

allParts = data;

buildFilters(data);

applyFilters();
}

function buildFilters(data){

const brands =
[...new Set(
data.map(x=>x.brand).filter(Boolean)
)];

brands.sort();

brands.forEach(b=>{

brandFilter.innerHTML +=
`<option value="${b}">
${b}
</option>`;
});

const units =
[...new Set(
data.map(x=>x.unit_type).filter(Boolean)
)];

units.sort();

units.forEach(u=>{

unitFilter.innerHTML +=
`<option value="${u}">
${u}
</option>`;
});
}

function applyFilters(){

let filtered =
allParts.filter(part=>{

const q =
search.value.toLowerCase();

const matchSearch =
(part.part_number || "")
.toLowerCase()
.includes(q)

||

(part.description || "")
.toLowerCase()
.includes(q);

const matchBrand =
!brandFilter.value
||
part.brand === brandFilter.value;

const matchUnit =
!unitFilter.value
||
part.unit_type === unitFilter.value;

const matchStock =
!stockFilter.value
||
part.stock_status === stockFilter.value;

return (
matchSearch
&& matchBrand
&& matchUnit
&& matchStock
);
});

render(filtered);
}

function render(items){

results.innerHTML = "";

stats.innerHTML =
`${items.length} Parts Found`;

items.forEach(part=>{

let stockClass = "available";

if(part.stock_status==="Low Stock"){
stockClass="low";
}

if(part.stock_status==="Out of Stock"){
stockClass="out";
}

results.innerHTML += `

<div class="card">

<div class="part-number">
${part.part_number}
</div>

<div class="desc">
${part.description}
</div>

<div class="brand">
${part.brand}
</div>

<div class="brand">
${part.unit_type || ""}
</div>

<div class="stock ${stockClass}">
${part.stock_status}
</div>

</div>

`;
});
}

search.addEventListener(
"input",
applyFilters
);

brandFilter.addEventListener(
"change",
applyFilters
);

unitFilter.addEventListener(
"change",
applyFilters
);

stockFilter.addEventListener(
"change",
applyFilters
);

loadParts();
