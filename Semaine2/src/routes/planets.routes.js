import express from 'express';
import PLANETS from '../data/planets.js'
import HttpStatus from 'http-status';

const router =express.Router();

class PlanetsRoutes{
    constructor(){
        router.get('/planets',this.getAll);
        router.get('/planets/:idPlanet',this.getOne);
        router.post('/planets',this.post);


    }

    post(req,res,next){
        
    }
    getAll(req,res,next){
        res.status(200); //Etape 1
       // res.set('Content-Type', 'application/json'); //Etape 2
        res.json(PLANETS); //Etape 3
        router.get('/planets/:idPlanet',this.getOne);

    }

    getOne(req,res,next){

        const idPlanet = req.params.idPlanet
       /* let planet;
       
        for (let p of PLANETS){

            if(p.id == idPlanet){
                planet =p;
                break;
            }
            
         
        }*/
        const planet = PLANETS.find(p => p.id == idPlanet);
        if(planet){
            res.status(200).json(planet);
        }else{ 
        return next(HttpError.NotFound(`La planete ${idPlanet} n'existe pas`));
       // res.json();
    }

    }
}

new PlanetsRoutes();
export default router;