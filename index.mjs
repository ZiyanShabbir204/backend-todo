import express from "express";
import connectDB from "./config/connectDB.mjs";
import UserRoutes from "./routes/users/user.mjs";
import TodoRoutes from "./routes/todos/todo.mjs";
import cors from "cors"
const app = express();

app.use(express.json());
app.use(cors("*"))
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`your app is listening to port number ${PORT}`);
});
connectDB();
app.get("/", (req, res) => {
  console.log("hello World");
});

app.use("/api/user", UserRoutes);
app.use("/api/todo", TodoRoutes);
