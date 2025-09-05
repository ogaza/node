// console.log("the about page's script");

var response = await fetch("./get-records");

if (response?.ok) {
  let records = await response.json();

  console.log("got records");
  console.table(records);
}
