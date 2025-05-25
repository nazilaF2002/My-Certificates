import env from 'dotenv';
env.config();
import app from './app.js';
const PORT= process.env.PORT || 3001;


app.listen(PORT,()=>{
  console.log(`app is runnig on port ${PORT}`);
})