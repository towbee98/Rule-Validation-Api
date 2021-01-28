const app = require("./app.js");
const PORT = process.env.PORT || 5700;
app.listen(PORT, () => {
  console.log(`Server running at PORT ${PORT}`);
});
