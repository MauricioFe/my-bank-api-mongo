import express from 'express';

const router = express.Router();

router.put('/deposito', () => { });
router.put('/saque', () => { });
router.get('/consultarSaldo', () => { });
router.delete('/:agência/:conta', () => { });
router.put('/trasnferencia', () => { });
router.get('/mediaSaldo/:agencia', () => { });
router.get('/menorSaldo/:numClientes', () => { });
router.get('/maiorSaldo/:numClientes', () => { });
router.put('/agenciaPrivate', () => { });



export default router;