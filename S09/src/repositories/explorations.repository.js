import Exploration from '../models/exploration.model.js';

class ExplorationsRepository {
    retrievByID(idExploration,retrieveOptions){
        const retrieveQuery= Exploration.findById(idExploration);

        if(retrieveOptions.planet){

        }

        return retrieveQuery;
    }
    transform(exploration,transformOptions){
        if(transformOptions.embed && transformOptions.embed.planet)
        {

        }else{
            exploration.planet ={href:`${process.env.BASE_URL}/planets/${exploration.planet}`}
        }
       
       exploration.href =`${process.env.BASE_URL}/explorations/${exploration._id}`;
       delete exploration._id;
    
    }
    
}


export default new ExplorationsRepository();