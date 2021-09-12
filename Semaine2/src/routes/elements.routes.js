import express from 'express';
import HttpError from 'http-errors';
import ELEMENTS from '../data/elements.js'
import HttpStatus from 'http-status';

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
        const newElement = req.body;
        const element = ELEMENTS.find(p => p.symbol == newElement.symbol);

        if(element){
            //Doublon detected
            return next(HttpError.Conflict(`L'element  avec le symbole ${newElement.symbol} existe déjà`));

        }else{
            ELEMENTS.push(newElement);
            res.status(HttpStatus.CREATED).json(newElement);

        }


        ELEMENTS.push(newElement);        

        
    }
    
    delete(req, res, next) {
        const index = ELEMENTS.findIndex(p=>p.symbol == req.params.symbol);
        if(index===-1){
            return next(HttpError.NotFound(`L'élement avec le symbole ${newElement.symbol} n'existe pas`))
        }else{
            ELEMENTS.splice(index,1);
            res.status(204).end();
            console.log('delete methode');
        }
     
    }
}

new ElementsRoutes();

export default router;