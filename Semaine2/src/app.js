import express from 'express';

import dayjs from 'dayjs';


const app = express();

app.get('/premiere',(req,res) => {

    res.status(200);
    res.set('Coontent-Type', 'text/plain');
    res.send('Notre première route avec express');
});

app.get('/maths/:operation', (req,res)=>{

    const operation = req.params.operation;
    //console.log(req.query);
    const a = parseInt(req.query.a,10);
    const b = parseInt(req.query.b,10);

    let result =0;
     switch(operation){
         case 'somme':
             result =a+b;
             break;
        case 'difference':
            result = a-b;
             break;
        case 'produit':
            result = a*b;
             break;
        case 'quotient':
            result = a /b;
             break;
        case 'reste':
             result = a%b;
             break;
        default:
            console.log('Opération non reconnue');
            req.status(400).end();
      


     }
   
   // const somme = a + b;
   res.status(200);
   res.set('Coontent-Type', 'text/html');
   res.send(`<b>${result}</b>`);


});

app.get('/date', (req,res)=>{
    //console.log(req.query);
    //const a = parseInt(req.query.a,10);
   // const b = parseInt(req.query.b,10);
    //const somme = a + b;

   const d=dayjs().format('YYYY-MM-DD HH:mm')
   res.status(200);
   res.set('Coontent-Type', 'text/html');
   res.send(`<b>${d}</b>`);


});

export default app;