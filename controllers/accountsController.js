import { accountsModel } from '../models/accounts.js'

async function getAll() {
    const account = await accountsModel.find({}).limit(30);
    return account;
}
async function deposito(account) {
  
    if(account.valor > 0){
        const deposito = await accountsModel.findOneAndUpdate({ agencia: account.agencia, conta: account.conta }, { $inc: {balance:account.valor} }, { new: true });
        return deposito;
    }
    return "O valor de depósito deve ser maior que 0"
    
}
async function saque(account) { 
const saque = await accountsModel.findOneAndUpdate({a})

}
async function consultarSaldo(account) { }
async function deleteAccount(agencia, conta) { }
async function transferencia(account) { }
async function mediaSaldo(agencia) { }
async function menorSaldo(numClientes) { }
async function maiorSaldo(numClientes) { }
async function agenciaPrivate(account) { }

export { getAll, deposito, saque, consultarSaldo, deleteAccount, transferencia, mediaSaldo, menorSaldo, maiorSaldo, agenciaPrivate }