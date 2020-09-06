import express from 'express';
import mongoose from 'mongoose';
import router from './routes/accountsRouter.js'
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());

app.use('/accounts', router);

app.listen(process.env.PORT, async () => {
    try {
        console.log("API Started");
    } catch (error) {
        console.log(error)
    }
});
mongoose.connect(`mongodb+srv://${process.env.USERDB}:${process.env.SENHA}@bootcamp.ijmxh.mongodb.net/MyBank?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(
    console.log("Conectado ao banco Atlas")
).catch(err => {
    console.log("Erro ao conectar ao banco de dados ", err);
});
