// basic piping
// no optimisations
// todo: modularize files
// todo: 
const constvals = require('./constval')
console.log(constvals.vl);
class Predicate{
    static of(type, instruction){
        return new PredicateFactory(type, instruction);
    }
}
class FilterPredicate{
    constructor(instruction){
        this.runner = dataObject => dataObject.filter(instruction); 
    }
}
class MapPredicate{
    constructor(instruction){
        this.runner = dataObject => dataObject.map(instruction); 
    }
}
class ReducePredicate{
    constructor(instruction){
        this.runner = dataObject => dataObject.reduce(instruction); 
    }
}
class CountPredicate{
    constructor(){
        this.runner = dataObject => dataObject.count(); 
    }
}
class PredicateFactory{
    constructor(type, instruction){
         switch(type){
            case "FILTER": return new FilterPredicate(instruction);
            case "MAP": return new MapPredicate(instruction);
            case "REDUCE": return new ReducePredicate(instruction);
            case "COUNT": return new CountPredicate();
            default: return new Error("Predicate Type not found");
         }
    }
}

class Piper{
    constructor(data){
        this.data = data;
    }
    predicate(predicateList){
        this.predicateList = predicateList;
    }
    eval(){
        let result = this.data;
        this.predicateList.map(x => {
            result = x.runner(result);
        });
        return result
    }
};
const objectArray = new Piper([
    {
        key: 'a',
        value: 10
    }, {
        key: 'g',
        value: 190
    }, {
        key: 'x',
        value: 1200
    }, {
        key: 'a',
        value: 1000
    }
]);

const predicate1 = Predicate.of("FILTER", x => x.key === 'a');
const predicate2 = Predicate.of("FILTER", x => x.value > 10);

objectArray.predicate([predicate1, predicate2]);
console.log(objectArray.eval());
