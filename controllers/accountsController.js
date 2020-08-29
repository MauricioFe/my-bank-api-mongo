import { accountsModel } from '../models/accounts.js'

async function getAll() {
    const account = await accountsModel.find({});
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
    const accountAtual = await getByAccontAndAgency(account.agencia, account.conta)
    if (account.valor < accountAtual.balance) {
        const saque = await accountsModel.findOneAndUpdate({ agencia: account.agencia, conta: account.conta }, { $inc: { balance: (-account.valor) - 1 } }, { new: true });
        return saque;
    }
    return "Saldo insuficiente"
}

async function consultarSaldo(agencia, conta) {
    const accountAtual = await getByAccontAndAgency(agencia, conta)
    if (accountAtual) {
        const saldo = await accountsModel.findOne({ agencia: agencia, conta: conta }, { balance: 1 })
        return saldo;
    }
    return "Conta não existente"
}

async function deleteAccount(agencia, conta) {
    const accountAtual = await getByAccontAndAgency(agencia, conta)
    if (accountAtual) {
        const account = await accountsModel.findOneAndDelete({ agencia: agencia, conta: conta });
        const count = await accountsModel.countDocuments({ agencia: agencia });
        return `Contas ativas na agência ${agencia} é:  ${count}`;
    }
    return "Conta não existente"
}

async function transferencia(origin, destiny, value) {
    const agencyOrigin = await accountsModel.find({ conta: origin });
    const agencyDestiny = await accountsModel.find({ conta: destiny });
    const bacon = []
    if (agencyDestiny[0].agencia === agencyOrigin[0].agencia) {
        const credito = await accountsModel.findOneAndUpdate({ _id: agencyOrigin[0]._id }, { $inc: { balance: -value } }, { new: true });
        const debito = await accountsModel.findOneAndUpdate({ _id: agencyDestiny[0]._id }, { $inc: { balance: value } }, { new: true });
        bacon.push(credito);
        bacon.push(debito);
        return bacon;
    }
    const credito = await accountsModel.findOneAndUpdate({ _id: agencyOrigin[0]._id }, { $inc: { balance: (-value - 8) } }, { new: true });
    const debito = await accountsModel.findOneAndUpdate({ _id: agencyDestiny[0]._id }, { $inc: { balance: value } }, { new: true });
    bacon.push(credito);
    bacon.push(debito);
    return bacon;

}

async function mediaSaldo(agencia) {
    const balanceByAgency = await accountsModel.find({ agencia: agencia })
    const balanceList = [];
    balanceByAgency.forEach(balance => {
        balanceList.push(balance.balance);
    });
    const sum = balanceList.reduce((accumulator, current) => {
        return current + accumulator;
    }, 0);
    const media = sum / balanceList.length;
    return media.toFixed(2);
}

async function menorSaldo(numClientes) {
    const menor = await accountsModel.find({}, { name: 0 }).limit(Number(numClientes)).sort({ balance: 1 });
    return menor;
}

async function maiorSaldo(numClientes) {
    const maior = await accountsModel.find({}).limit(Number(numClientes)).sort({ balance: -1, name: 1 });
    return maior;
}

async function agenciaPrivate() {
    const accounts = await accountsModel.find({});
    const agencies = await accountsModel.distinct("agencia");

    let listaMaiores = [];
    agencies.forEach(agencie => {
        let maioresBalances = 0;
        let maiores = [];
        accounts.forEach(account => {
            if (account.balance > maioresBalances && account.agencia === agencie) {
                maioresBalances = account.balance;
                maiores = account;
            }
        });
        listaMaiores.push(maiores);
    });
    listaMaiores.forEach(async (item) => {
        await accountsModel.findOneAndUpdate({ _id: item._id }, { agencia: 99 }, { new: true });
    });
    const privateAgency = await accountsModel.find({ agencia: 99 });
    return privateAgency;
}

export { getAll, deposito, saque, consultarSaldo, deleteAccount, transferencia, mediaSaldo, menorSaldo, maiorSaldo, agenciaPrivate }