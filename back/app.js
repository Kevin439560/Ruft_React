const express = require('express');

const app = express();

const pool = require("./db");

const cors = require('cors')

app.use(express.json());
app.use(cors());

app.get('/api/mostrar', async (req, res) =>{
    //em metodo get os parametros devem ser passados pela URL
    const {tabela} = req.query
    try{
        const result = await pool.query(`SELECT * FROM "${tabela}";`);
        //necessario aspas duplas para nomes de colunas e nomes de tabelas
        res.json(result.rows);
        
    }catch(error){
        console.error(error);
        res.status(500).json({message:"Erro ao solicitar do banco de dados!"})
    }
});

app.get('/api/mostrar/item', async (req, res) =>{
    //em metodo get os parametros devem ser passados pela URL
    const {tabela, item} = req.query
    if (!tabela || !item) {

        return res.status(400).json({ error: 'Parâmetros inválidos' });
    
    }
    try{
        const sql = `SELECT "${item}" FROM "${tabela}";`
        console.log(sql)
        const result = await pool.query(sql);
        //necessario aspas duplas para nomes de colunas e nomes de tabelas
        res.json(result.rows);
        
    }catch(error){
        console.error(error);
        res.status(500).json({message:"Erro ao solicitar do banco de dados!"})
    }
});

app.get('/api/buscar/email', async (req, res) =>{
    //em metodo get os parametros devem ser passados pela URL
    const { item } = req.query
    if (!item) {

        return res.status(400).json({ error: 'Parâmetros inválidos' });
    
    }
    try{
        const sql = `SELECT * FROM "USUARIO" WHERE "UEMAIL" = ${item};`
        const result = await pool.query(sql);
        //necessario aspas duplas para nomes de colunas e nomes de tabelas
        res.json(result.rows);
        
    }catch(error){
        console.error(error);
        res.status(500).json({message:"Erro ao solicitar do banco de dados!"})
    }
});

app.get('/api/buscar/id', async (req, res) =>{
    //em metodo get os parametros devem ser passados pela URL
    const {tabela, valor, purpose} = req.query

    if (!tabela || !valor || !purpose) {

        return res.status(400).json({ error: 'Parâmetros inválidos' });
    
    }
    
    try{

        const result = await pool.query(`SELECT "${purpose}" FROM "${tabela}" WHERE "ID" = $1;`,[valor]);
        //necessario aspas duplas para nomes de colunas e nomes de tabelas

        const Valor = result.rows[0];
        res.json({Valor});
        
    }catch(error){
        console.error(error);
        res.status(500).json({message:"Erro ao solicitar do banco de dados!"})
    }

});

app.get('/api/buscar/ide', async (req, res) =>{
    //em metodo get os parametros devem ser passados pela URL
    const {tabela, valor} = req.query

    if (!tabela || !valor) {

        return res.status(400).json({ error: 'Parâmetros inválidos' });
    
    }
    
    try{

        const result = await pool.query(`SELECT * FROM "${tabela}" WHERE "ID" = $1;`,[valor]);
        //necessario aspas duplas para nomes de colunas e nomes de tabelas
        
        const Valor = result.rows[0];
        console.log(Valor)
        res.json({Valor});
        
    }catch(error){
        console.error(error);
        res.status(500).json({message:"Erro ao solicitar do banco de dados!"})
    }

});

app.get('/api/obter/endereco', async (req, res) =>{
    //em metodo get os parametros devem ser passados pela URL
    const {ID} = req.query

    if (!ID) {

        return res.status(400).json({ error: 'Parâmetros inválidos' });
    
    }
    
    try{
        
        const result = await pool.query(`SELECT  "ENDERECO".*
        FROM "USUARIO"
        INNER JOIN "ENDERECO" ON "USUARIO"."ENDID" = "ENDERECO"."ID"
        WHERE "USUARIO"."ID" = $1;`,[ID]);
        //necessario aspas duplas para nomes de colunas e nomes de tabelas
        
        const Valor = result.rows[0];
        console.log(Valor)
        res.json({Valor});
        
    }catch(error){
        console.error(error);
        res.status(500).json({message:"Erro ao solicitar do banco de dados!"})
    }

});


app.get('/api/buscar/favorito', async (req, res) =>{
    //em metodo get os parametros devem ser passados pela URL
    const { valor } = req.query

    if ( !valor ) {

        return res.status(400).json({ error: 'Parâmetros inválidos' });
    
    }
    
    try{

        const result = await pool.query(`SELECT * FROM "FAVORITO"
        JOIN "USUARIO" ON "FAVORITO"."UID" = "USUARIO"."ID"
        JOIN "MENU" ON "FAVORITO"."ITEMID" = "MENU"."ID" WHERE "USUARIO"."ID" = ${valor};`);
        //necessario aspas duplas para nomes de colunas e nomes de tabelas

        res.json(result.rows);
        
    }catch(error){
        console.error(error);
        res.status(500).json({message:"Erro ao solicitar do banco de dados!"})
    }

});



app.post('/api/inserir', async (req, res) => {
    const { tabela, dados } = req.body;

    if (!tabela || !dados) {

        return res.status(400).json({ error: 'Parâmetros inválidos' });
    }

    const colunas = Object.keys(dados);
    const valores = Object.values(dados);
    console.log(valores)
    
    try {
        const sql = `INSERT INTO "${tabela}"("${colunas.join('", "')}") VALUES (${colunas.map((coluna, index) => `$${index + 1}`).join(', ')}) RETURNING "ID";`;

        console.log(sql)
        const result = await pool.query(sql, valores);

        const novoID = result.rows[0].ID;
        res.status(200).json({ message: 'Dados Inseridos Com Sucesso!', novoID });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao inserir o registro no banco de dados' });
    }
    
});


app.post('/api/inserir/ENDERECO', async (req, res) => {

    try {
        const sql = `INSERT INTO "ENDERECO" DEFAULT VALUES RETURNING "ID";`;

        console.log(sql)

        const result = await pool.query(sql);

        const novoID = result.rows[0].ID;
        res.status(200).json({ message: 'Dados Inseridos Com Sucesso!', novoID });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao inserir o registro no banco de dados' });
    }
});
//INSERT INTO "ENDERECO" DEFAULT VALUES;

app.post('/api/inserir/favorito', async (req, res) => {
    const { tabela, dados } = req.body;

    if (!dados) {

        return res.status(400).json({ error: 'Parâmetros inválidos' });
    }

    const colunas = Object.keys(dados);
    const valores = Object.values(dados);

    try {
        const sql = `INSERT INTO "FAVORITO"("${colunas.join('", "')}") VALUES (${colunas.map((coluna, index) => `$${index + 1}`).join(', ')});`;

        const result = await pool.query(sql, valores);

        res.status(200).json({ message: 'Dados Inseridos Com Sucesso!'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao inserir o registro no banco de dados' });
    }
});


app.put('/api/atualizar', async(req, res) =>{

    const { tabela, dados, ID} = req.body

    if (!tabela || !dados) {

        return res.status(400).json({ error: 'Parâmetros inválidos' });
    }

    const colunas = Object.keys(dados);

    const valores = Object.values(dados);

    try{

        const clausulaSet = colunas.map((coluna, index) => {
            // Use o índice para acessar o valor correspondente na lista "valores"
            const valor = valores[index];
            
            // Converte o valor em uma string SQL segura (dependendo do SGBD, pode ser necessário escapar valores)
            const valorSeguro = typeof valor === 'string' ? `'${valor}'` : valor;
            
            // Retorna a cláusula para esta coluna e valor
            return `"${coluna}" = ${valorSeguro}`;
        
        });
        
        const clausulaSetCompleta = clausulaSet.join(' , ');

        const sql = `UPDATE "${tabela}" SET ${clausulaSetCompleta} WHERE "ID" = ${ID};`;

        const result = await pool.query(sql);

        res.json({message: "Atualização Concluída!"})
    
    }catch(error){

        console.error("Erro", error)

    }
});

app.put('/api/atualizar/endereco', async(req, res) =>{

    const {dados, ID} = req.body

    if (!ID || !dados) {

        return res.status(400).json({ error: 'Parâmetros inválidos' });
    }

    const colunas = Object.keys(dados);

    const valores = Object.values(dados);

    try{

        const clausulaSet = colunas.map((coluna, index) => {
            // Use o índice para acessar o valor correspondente na lista "valores"
            const valor = valores[index];
            
            // Converte o valor em uma string SQL segura (dependendo do SGBD, pode ser necessário escapar valores)
            const valorSeguro = typeof valor === 'string' ? `'${valor}'` : valor;
            
            // Retorna a cláusula para esta coluna e valor
            return `"${coluna}" = ${valorSeguro}`;
        
        });
        
        const clausulaSetCompleta = clausulaSet.join(' , ');

        const sql = `UPDATE "ENDERECO" SET ${clausulaSetCompleta} FROM "USUARIO" WHERE 
        "ENDERECO"."ID" = "USUARIO"."ENDID" AND "USUARIO"."ID" = ${ID};`;
        console.log(sql)
        const result = await pool.query(sql);

        res.json({message: "Atualização Concluída!"})
    
    }catch(error){

        console.error("Erro", error)

    }
});

app.delete('/api/remover', async(req, res) =>{

    const{ tabela, dados } = req.query;

    if (!tabela || !dados ) {

        return res.status(400).json({ error: `Parâmetros inválidos = dados` });

    }

    const data = JSON.parse(dados)

    const colunas = Object.keys(data);

    const valores = Object.values(data);
    
    try{

        const clausulaWhere = colunas.map((coluna, index) => {
            // Use o índice para acessar o valor correspondente na lista "valores"
            const valor = valores[index];
          
            // Converte o valor em uma string SQL segura (dependendo do SGBD, pode ser necessário escapar valores)
            const valorSeguro = typeof valor === 'string' ? `'${valor}'` : valor;
          
            // Retorna a cláusula para esta coluna e valor
            return `"${coluna}" = ${valorSeguro}`;

        });

        const clausulaWhereCompleta = clausulaWhere.join(' AND ');
  
        const sql = `DELETE FROM "${tabela}" WHERE ${clausulaWhereCompleta}`;

        const result = await pool.query(sql);

        res.json({message: "Remoção Concluída!"})

    }catch(error){

        console.error("Erro", error)

    }

});

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Escutando na porta ${PORT}`);
});



