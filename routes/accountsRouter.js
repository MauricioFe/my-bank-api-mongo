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
router.get('/saldo/:agencia/:conta', async (req, res) => {
    let { agencia, conta } = req.params;
    try {
        res.send(await consultarSaldo(agencia, conta))
    } catch (error) {
        res.status(500).send("Erro na requisição " + error);
    }
});
router.delete('/:agencia/:conta', async (req, res) => {
    let { agencia, conta } = req.params;
    try {
        res.send(await deleteAccount(agencia, conta))
    } catch (error) {
        res.status(500).send("Erro na requisição " + error);
    }
});

router.patch('/trasnferencia/:origin/:destiny/:value', async (req, res) => {
    const { origin, destiny, value } = req.params
    try {
        res.send(await transferencia(origin, destiny, value));
    } catch (error) {
        res.status(500).send("Erro na requisição " + error);
    }

});

router.get('/mediaSaldo/:agencia', async (req, res) => {
    let { agencia } = req.params;
    try {
        res.send(await mediaSaldo(agencia))
    } catch (error) {
        res.status(500).send("Erro na requisição " + error);
    }
});
router.get('/menorSaldo/:numClientes', async (req, res) => {
    let { numClientes } = req.params;
    try {
        res.send(await menorSaldo(numClientes))
    } catch (error) {
        res.status(500).send("Erro na requisição " + error);
    }
});
router.get('/maiorSaldo/:numClientes', async (req, res) => {
    let { numClientes } = req.params;
    try {
        res.send(await maiorSaldo(numClientes))
    } catch (error) {
        res.status(500).send("Erro na requisição " + error);
    }
});
router.patch('/agenciaPrivate', async (req, res) => {
    try {
        res.send(await agenciaPrivate())
    } catch (error) {
        res.status(500).send("Erro na requisição " + error);
    }
});
router.get('/bacon', (req, res) =>{
    res.send('bacon');
})


export default router;