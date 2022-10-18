const { GoogleSpreadsheet } = require("google-spreadsheet");
const credential = require("../../credential-spreadsheet.json");
const docID = process.env.DOCID;

const definePage = async (page) => {
    let index = 1;
    if (page == "sem_acesso") {
        index = 1;
    } else if (page == "sem_suporte") {
        index = 2;
    } else if (page == 'desatualizado') {
        index = 3;
    } else {
        index = 4;
    }

    const doc = new GoogleSpreadsheet(docID);
    await doc.useServiceAccountAuth(credential);
    await doc.loadInfo();
    const sheet = await doc.sheetsByIndex[index - 1];
    await sheet.loadHeaderRow();

    return { sheet }
}

const getDataSpreedsheet = async (pagina, cod, nome, login, cidade, bairro, router) => {
    const { sheet } = await definePage(pagina)
    try {
        await sheet.addRow({
            cod,
            nome,
            login,
            cidade,
            bairro,
            router,
        });
    } catch (e) {
        console.error(e);
    }
}

const addData = async (req, res) => {
    const { pagina, cod, nome, login, cidade, bairro, router } = req.body
    await getDataSpreedsheet(pagina, cod, nome, login, cidade, bairro, router);
    return res.status(200).json("Dados cadastrados");
}

module.exports = { addData }
