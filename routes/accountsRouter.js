import express from 'express';

const router = express.Router();

router.post('/deposito', () => { });
router.post('/saque', () => { });
router.get('/consultarSaldo', () => { });
router.delete('/:agência/:conta', () => { });
router.post('/trasnferencia', () => { });


export default router;