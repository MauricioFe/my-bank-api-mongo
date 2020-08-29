import express from 'express';
import mongoose from 'mongoose';
import router from './routes/accountsRouter.js'

const app = express();
app.use(express.json());

app.use('/accounts', router);

app.listen(3000, async () => {
    try {
        console.log("API Started");
    } catch (error) {
        console.log(error)
    }
});
mongoose.connect('mongodb+srv://Mauricio:7468@bootcamp.ijmxh.mongodb.net/MyBank?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(
    console.log("Conectado ao banco Atlas")
).catch(err => {
    console.log("Erro ao conectar ao banco de dados ", err);
});
