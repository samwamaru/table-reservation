import express from "express"
import cors from "cors"
import morgan from "morgan"
import connectDatabase from "./database/connect.js"
import router from "./router/routes.js"
import cron from 'node-cron';
import { updateTableAvailability } from "./updateTableAvailability.js" 




const app = express()

//middleware
app.use(express.json()) 
app.use(cors())
app.use(morgan("tiny"))


const port =8080

// app.get("/", (req, res) => {
//     res.send("home get request");
//   });
  
  //api routes 
  app.use("/api", router)

//start server whn we have a valid db connection
try {
    await connectDatabase();
    app.listen(port, () => {
      console.log(`Server connected to http://localhost:${port}`);
    });
  } catch (error) {
    console.log("Cannot connect to the server");
  }
  
  
  cron.schedule('* * * * *', updateTableAvailability);


