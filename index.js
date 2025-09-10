const express = require('express');
const { default: mongoose } = require('mongoose');
const cors = require('cors')
require('dotenv').config()
const app = express();

app.use(express.json());
app.use(cors());
// app.use(cors({
//   origin: 'http://localhost:3000', // your React app
//   credentials: true // if you're using cookies/auth
// }));
app.use(express.urlencoded({ extended: true })); // for form-data


const PORT = 5000;

app.use('/api/auth',require('./routes/authRoutes'));
app.use('/api/memories',require('./routes/memoryRoutes'));
app.use('/api/verifyuser',require('./routes/userVerifyRoute'))
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("db connected-------->");
    app.listen(PORT,()=>{
        console.log('port runnig')
    })
}).catch((error)=>{console.log("fucked---------",error)})
