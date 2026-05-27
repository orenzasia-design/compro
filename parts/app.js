const client = supabase.createClient(
SUPABASE_URL,
SUPABASE_KEY
);

const results =
document.getElementById("results");

const search =
document.getElementById("search");

let parts = [];

async function loadParts(){

const { data, error } =
await client
.from("public_parts")
.select("*")
.limit(500);

if(error){
console.error(error);
return;
}

parts = data;
render(parts);
}

function render(items){

results.innerHTML = "";

items.forEach(part => {

let stockClass = "available";

if(part.stock_status === "Low Stock"){
stockClass = "low";
}

if(part.stock_status === "Out of Stock"){
stockClass = "out";
}

results.innerHTML += `
<div class="card">

<div class="part-number">
${part.part_number}
</div>

<div>
${part.description}
</div>

<div>
${part.brand}
</div>

<div class="stock ${stockClass}">
${part.stock_status}
</div>

</div>
`;
});
}

search.addEventListener("input", e => {

const q =
e.target.value.toLowerCase();

const filtered =
parts.filter(p =>
(p.part_number || "")
.toLowerCase()
.includes(q)
||
(p.description || "")
.toLowerCase()
.includes(q)
);

render(filtered);
});

loadParts();
