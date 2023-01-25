import _toNumber from "lodash/toNumber"
import _startCase from "lodash/startCase";
/**
 * this is also called "dough loading" pizzamaking.com moved this to "thickness factor"
 * https://www.pizzatoday.com/departments/in-the-kitchen/2012-april-dough-doctor/
 *
 * @param panSize
 * @param factor
 * @returns {number}
 *
 * simple multiplication (ie: 1 x 1 ) is faster in most browsers than using Math.pow( 1, 2 )
 * https://jsperf.com/math-pow-vs-simple-multiplication/10
 *
 * with a 12 inch pan we get the radius, square it and then multiply it by pi
 *
 * Original Flash Application Math:
 *  dw =
 *  Number(1 + stuffed / 100) * tf_size * Number(1 + br / 100) * (3.141592653589793 * (Number(p_size) / 2)
 *  * (Number(p_size) / 2) + 3.141592653589793 * Number(p_size) * (Number(pan_height) - 0.25));
 *
 *  dwA = tf_size * Number(1 + br / 100) * (3.141592653589793 * (Number(p_size) / 2) * (Number(p_size) / 2)
 *  + 3.141592653589793 * Number(p_size) * (Number(pan_height) - 0.25));
 */
export function circleThicknessFactor({ panSize = 0, factor = 0}) {
    const pi = 3.141592653589793;
    let panRadius = panSize / 2;

    return pi * panRadius * panRadius * factor
}

export function calculateGrams(ingredient) {
    return 28.35 * parseFloat( ingredient );
}

export function Ingredient({ingredientName = '', ingredientPercent = 0, weightGrams = 0, weightOunces = 0} = {}) {
    this.name = ingredientName;
    this.percent = ingredientPercent;
    this.grams = weightGrams;
    this.ounces = weightOunces;

}

export function ingredientTotals({
                                     waterPercent = 0,
                                     saltType = '',
                                     saltPercent = 0,
                                     yeastType = '',
                                     yeastPercent = 0,
                                     additionalIngredients = {}
                                 } = {}) {

    let totals = {};

    const flour = new Ingredient({ingredientName: 'Flour', ingredientPercent: 100});
    const water = new Ingredient({ingredientName: 'Water', ingredientPercent: _toNumber(waterPercent)});
    const yeast = new Ingredient({ingredientName: yeastType, ingredientPercent: _toNumber(yeastPercent)})
    const salt = new Ingredient({ingredientName: saltType, ingredientPercent: _toNumber(saltPercent)})


    let ingObj =
        {
            flour,
            water,
            salt,
            yeast
        }

    Object.entries(additionalIngredients).forEach(([key, value]) => {
        let ingredient = {};
        let ingName = _startCase( key );
        let ingPercent = _toNumber( value );


        ingredient[ingName] = new Ingredient({
            ingredientName: ingName,
            ingredientPercent: ingPercent
        } )

        Object.assign( ingObj, ingredient)

    });


    Object.entries(ingObj).forEach( ( [key, value ] ) => {
        let percentObj = {}

        percentObj[key] = value.percent
        Object.assign( totals, percentObj)
    })



    ingObj['Totals'] = totals;
    ingObj['Totals']['total'] = percentsTotal(ingObj['Totals'])
    // let totalValues =
    console.log( ingObj['Totals']['total'] )


    return ingObj
}


export function percentsTotal( objectValues ) {
    let initialValue = 0
    const reducer = (accumulator, currentValue) => accumulator + currentValue;

    return Object.values(objectValues).reduce(reducer, initialValue);
}