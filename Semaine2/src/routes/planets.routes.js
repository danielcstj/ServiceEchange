import express from 'express';
import PLANETS from '../data/planets.js'
import HttpStatus from 'http-status';
import HttpError from 'http-errors';
//import { HTTPError } from 'got';


const router =express.Router();

class PlanetsRoutes{
    constructor(){
        router.get('/',this.getAll);
        router.get('/:idPlanet',this.getOne);
        router.post('/',this.post);
        router.delete('/:idPlanet', this.delete);
        router.patch('/:idPlanet', this.patch);
        router.put('/:idPlanet', this.put);


    }

    post(req,res,next){
        const newPlanet = req.body;
        const planet = PLANETS.find(p => p.id == newPlanet.id);

        if(planet){
            //Doublon detected
            return next(HttpError.Conflict(`La planète avec l'identifiant ${newPlanet.id} existe déjà`));

        }else{
            PLANETS.push(newPlanet);
            res.status(HttpStatus.CREATED).json(newPlanet);

        }


        PLANETS.push(newPlanet);
    }
    patch(req,res,next){
        return next(HttpError.NoImplemented());
       
    }
    put(req,res,next){
       return next(HttpError.MethodNotAllowed());
    }
    delete(req,res,next){
       const index = PLANETS.findIndex(p=>p.id == req.params.idPlanet);
       if(index===-1){
           return next(HttpError.NotFound(`La planète avec l'identifiant ${newPlanet.id} n'existe pas`))
       }else{
           PLANETS.splice(index,1);
           res.status(204).end();
       }
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