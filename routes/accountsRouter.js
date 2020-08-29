import express from 'express';
import { deposito, saque, consultarSaldo, deleteAccount, transferencia, mediaSaldo, menorSaldo, maiorSaldo, agenciaPrivate, getAll } from '../controllers/accountsController.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const bacon = await getAll();
        res.send(bacon)
    } catch (error) {
        res.status(500).send(error);
    }
})
router.patch('/deposito', async (req, res) => {
    try {
        res.send(await deposito(req.body));
    } catch (error) {
        res.status(500).send("Erro na requisição " + error);
    }
});
router.patch('/saque', async (req, res) => {
    try {
        res.send(await saque(req.body));
    } catch (error) {
        res.status(500).send("Erro na requisição " + error);
    }
});
router.get('/consultarSaldo', (req, res) => { });
router.delete('/:agência/:conta', (req, res) => { });
router.put('/trasnferencia', (req, res) => { });
router.get('/mediaSaldo/:agencia', (req, res) => { });
router.get('/menorSaldo/:numClientes', (req, res) => { });
router.get('/maiorSaldo/:numClientes', (req, res) => { });
router.put('/agenciaPrivate', (req, res) => { });



export default router;