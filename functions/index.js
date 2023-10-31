
const functions = require('firebase-functions');
const express = require('express');
const admin = require('firebase-admin');
const app = express();
const bcryptjs = require('bcryptjs');

admin.initializeApp({
    credential: admin.credential.cert('./permissions.json'),
    databaseURL: "https://fb-api-9406c.firebaseio.com"
})

app.get('/hello-word', (req, res) => {
    return res.status(200).json({ message: 'Hello Word' })
});

app.post('/login', async (req, res) =>{
    const user = req.body.user; 
    const password = req.body.password;
    if(user == 'admin' && password == '123456'){
        let passwordHash = await bcryptjs.hash(password,8);
        res.json({
            message: '¡AUTENTICACIÓN EXITOSA!',
            passwordHash: passwordHash
        });
    }else{
        res.json({
            message: 'INGRESE NUEVAMENTE SUS CREDENCIALES'
        })
    }
});

app.get('/compare', (req,res) => {
    let hashSaved = '$2a$08$uLoWqn3yxS.EcOTdDTpM/.rC.dUqXnEEKvkWicNBz35yO2ZAkVH.q';
    let compare = bcryptjs.compareSync('12356', hashSaved);
    if(compare){
        res.json('OK');
    }else{
        res.json('no son iguales');
    }
})

app.use(require('./routes/products.routes'))

exports.app = functions.https.onRequest(app);
