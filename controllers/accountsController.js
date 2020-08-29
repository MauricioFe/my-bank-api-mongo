import { accountsModel } from '../models/accounts.js'

async function getAll() {
    const account = await accountsModel.find({}).limit(30);
    return account;
}

async function getByAccontAndAgency(agencia, conta) {
    const account = await accountsModel.findOne({ agencia: agencia, conta: conta });
    return account;
}
async function deposito(account) {

    console.log()
    if (account.valor > 0) {
        const deposito = await accountsModel.findOneAndUpdate({ agencia: account.agencia, conta: account.conta }, { $inc: { balance: account.valor } }, { new: true });
        return deposito;
    }
    return "O valor de depósito deve ser maior que 0"
}
async function saque(account) {
    const accountAtual = getByAccontAndAgency(account.agencia, account.conta)
    if (account.valor < accountAtual.balance) {
        const saque = await accountsModel.findOneAndUpdate({ agencia: account.agencia, conta: account.conta }, { $inc: { balance: (account.valor * -1) - 1 } }, { new: true });
        return saque;
    }
    return "Saldo insuficiente"
}
async function consultarSaldo(agencia, conta) {
    const accountAtual = getByAccontAndAgency(agencia, conta)
    if (accountAtual) {
        const saldo = await accountsModel.findOne({ agencia: agencia, conta: conta }, { balance: 1 })
        return saldo;
    }
    return "Conta não existente"
}
async function deleteAccount(agencia, conta) {
    const accountAtual = getByAccontAndAgency(agencia, conta)
    if (accountAtual) {
        const account = await accountsModel.findOneAndDelete({ agencia: agencia, conta: conta });
        const count = await accountsModel.countDocuments({ agencia: agencia });
        return `Contas ativas na agência ${agencia} é:  ${count}`;
    }
    return "Conta não existente"
}
async function transferencia(account) { }
async function mediaSaldo(agencia) {
    const balanceByAgency = await accountsModel.find({ agencia: agencia })
    const balanceList = [];
    balanceByAgency.forEach(balance => {
        balanceList.push(balance.balance);
    });
    const sum = balanceList.reduce((accumulator,current ) => {
        return current + accumulator;
    }, 0);
    const media = sum / balanceList.length;
    console.log(media.toFixed(2))
    return media.toFixed(2);
}
async function menorSaldo(numClientes) { }
async function maiorSaldo(numClientes) { }
async function agenciaPrivate(account) { }

export { getAll, deposito, saque, consultarSaldo, deleteAccount, transferencia, mediaSaldo, menorSaldo, maiorSaldo, agenciaPrivate }