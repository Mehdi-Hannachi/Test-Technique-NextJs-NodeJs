const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./config/connectDB");
const tasks = require("./routes/tasks");
const PORT = process.env.PORT || 8080;

//Parser
app.use(express.json());
app.use(cors());

connectDB();

//Routes
app.use("/task", tasks);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
