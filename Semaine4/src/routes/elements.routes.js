import express from 'express';
import HttpErrors from 'http-errors';
import ELEMENTS from '../data/elements.js'

const router = express.Router();

class ElementsRoutes {

    constructor() {
        router.get('/', this.getAll);
        router.post('/', this.post);
        router.get('/:symbol', this.getOne);
        router.delete('/:symbol', this.delete);

    }

    getAll(req, res, next) {
        res.status(200); //Etape 1
        // res.set('Content-Type', 'application/json'); //Etape 2
         res.json(ELEMENTS); //Etape 3

         

       
    }

    getOne(req, res, next) {
        const symbolElement = req.params.symbol
       /* let planet;
       
        for (let p of PLANETS){

            if(p.id == idPlanet){
                planet =p;
                break;
            }
            
         
        }*/
        const element = ELEMENTS.find(p => p.symbol == symbolElement);
        if(element){
            res.status(200).json(element);
        }else{ 
        return next(HttpError.NotFound(`L'élement ${symbol} n'existe pas`));
       
    }
}

    post(req, res, next) {

        
    }
    
    delete(req, res, next) {
     
    }
}

new ElementsRoutes();

export default router;