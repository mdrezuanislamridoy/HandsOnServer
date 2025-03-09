const app = require("./App");
require("dotenv").config();

const PORT = process.env.PORT || 3005;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
