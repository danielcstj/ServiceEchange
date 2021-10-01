import express from 'express';
import PLANETS from '../data/planets.js'
import HttpStatus from 'http-status';
import HttpError from 'http-errors';
//import { HTTPError } from 'got';
import planetRepository from '../repositories/planet.repository.js';

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

   async post(req,res,next){
        const newPlanet = req.body;
       
         if(Object.keys(newPlanet).length===0){
             return next(HtppError.BadRequest('La planète ne peut pas contenir aucune donnée'))
         }

        
            res.status(HttpStatus.CREATED).json(newPlanet);

            try {
                const planetAdded = await planetRepository.create(newPlanet);
                planetAdded = planetAdded.toObject({getters:false,virtuals:false});
                planetAdded =planetRepository.transform(planetAdded);
                res.status(201).json(planetAdded);

            }catch(err){
                return next(err);

            }

    }
  async patch(req,res,next){
       

        try{
            let planet = await planetRepository.update(req.params.idPlanet,req.body);
            if(!planet){
                return next(HttpError.NotFound(`La planète avec l'identifiant ${req.params.idPlanet} n'existe pas`))
              
            }

             //permet de transformer une planete en objet
            planet =planet.toObject({getters:false,virtuals:false});
            planet = planetRepository.transform(planet);
             res.status(200).json(planet);

        }catch(err){
            return next(err);
        }
       
    }
    put(req,res,next){
       return next(HttpError.MethodNotAllowed());
    }
    async delete(req,res,next){
        try{
            const deleteResult = await planetRepository.delete(req.params.idPlanet); // On supprime la planete
            //Si la planete n'existe pas 
            if(!deleteResult){
                return next(HttpError.NotFound(`La planète avec l'identifiant ${newPlanet.id} n'existe pas`))
              
            }
            res.status(204).end();

        }catch(err){
           return next(err);
        }
 
    }
  async  getAll(req,res,next){

    const filter ={};


      if(req.query.explorer) 
      {
          filter.discoveredBy = req.query.explorer;
      }
      const transformOptions ={};
      if(req.query.unit){
          const unit = req.query.unit;
          if(unit === 'c'){
              transformOptions.unit =unit;
          }else{
              return next(HttpError.BadRequest('le parametre unit doit avoir la valeur c pour celsius'));
          }
      }

       try{
           let planets = await planetRepository.retrieveAll(filter);
           planets = planets.map(p => {
               p = p.toObject({getters:false,virtuals:false});
               p = planetRepository.transform(p,transformOptions);
               return p;
           });

           res.status(200).json(planets);

       }catch(err){
         return next(err);
       }

    }

  async  getOne(req,res,next){

        const idPlanet = req.params.idPlanet
       /* let planet;
       
        for (let p of PLANETS){

            if(p.id == idPlanet){
                planet =p;
                break;
            }
            
         
        }*/

        const transformOptions ={};
      if(req.query.unit){
          const unit = req.query.unit;
          if(unit === 'c'){
              transformOptions.unit =unit;
          }else{
              return next(HttpError.BadRequest('le parametre unit doit avoir la valeur c pour celsius'));
          }
      }
        try{
        let planet = await planetRepository.retrieveById(idPlanet);
        //J'ai une planete
        if(planet){
            planet = planet.toObject({getters:false,virtuals:false});
            planet =planetRepository.transform(planet,transformOptions);
            res.status(200).json(planet);
        }else{ 
        return next(HttpError.NotFound(`La planete ${idPlanet} n'existe pas`));
       // res.json();
    }

}catch(err){
    return next(err);
}


    }
}

new PlanetsRoutes();
export default router;