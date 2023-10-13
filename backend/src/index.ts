import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/routes";


dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
	credentials: true,
	origin: true
}));
app.use(router);

app.listen(process.env.APP_PORT, () => {
  console.log(`Running on port ${process.env.APP_PORT}`);
});
