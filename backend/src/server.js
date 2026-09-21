import express from "express";
import cors from "cors";
//import prisma from "./database.js";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import categoriesRouter from "./routes/categories.route.js";
import { errorHandler } from "./middleware/error.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());


// // Testing if API is working
// app.get("/", (req, res) => {
//     res.json({
//         message: "API is working!"
//     });
// });


// // Testing Database connection
// app.get("/test-db", async(req, res) => {

//     try{

//         const transactionType = await prisma.transaction_types.findMany();
//         res.json(transactionType);
//     }

//     catch(error){

//         console.error(error);
//         res.status(500).json({
//             error: "Database connection failed."
//         });
//     }
// });


app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/categories", categoriesRouter);

app.use(errorHandler);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server initialized in port ${PORT}`);
    console.log(`Click here: http://localhost:${PORT}`);
});