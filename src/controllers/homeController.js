exports.homePage = (req, res) => {
  res.render(`index`, {
    title: "this is the title",
    numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  });
  return;
};

exports.handlePost = (req, res) => {
  res.send(`handlePost`);
  return;
};
