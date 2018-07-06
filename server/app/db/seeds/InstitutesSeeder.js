const mongoose = require('mongoose');
const fs = require('fs');
const csv = require('csv-parse');
const Institute = require('../models/Institute');
const seed_utils = require('../../utils/seed_utils');
/**
 * DB connection
 */
mongoose.connect(`mongodb://case_user:I6K8Zuf3z2m3AduY@cluster0-shard-00-00-fkk6w.mongodb.net:27017,cluster0-shard-00-01-fkk6w.mongodb.net:27017,cluster0-shard-00-02-fkk6w.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true`);
/**
 * Reads the CSV and save them to the database
 */
fs.readFile('app/files/csv/ubs.csv', (err, fileData) => {
    csv(fileData, {columns:true}, (err, rows) => {
        Institute.insertMany(rows.map(r => (
            new Institute({
                name: r.nom_estab,
                address: r.dsc_endereco,
                city: r.dsc_cidade,
                neighborhood: r.dsc_bairro,
                phone: r.dsc_telefone,
                loc: {
                    type: "Point",
                    coordinates: [r.vlr_longitude, r.vlr_latitude]
                },
                scores: {
                    size: seed_utils.getScore(r.dsc_estrut_fisic_ambiencia),
                    adaptation_for_seniors: seed_utils.getScore(r.dsc_adap_defic_fisic_idosos),
                    medical_equipment: seed_utils.getScore(r.dsc_equipamentos),
                    medicine: seed_utils.getScore(r.dsc_medicamentos)
                },
                created_at: new Date(),
                updated_at: new Date(),
            })
        ))).then(() => {
            console.log("Dados inseridos com sucesso!");
            mongoose.disconnect();
        }).catch(err => console.log(err));
    });
});
