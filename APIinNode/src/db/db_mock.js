const db = {
  query,
};

function query(expression, params) {
  var result = { rows: [{ id: 1, username: "admin" }] };

  return new Promise((resolve) => {
    resolve(result);
  });
}

export default db;
