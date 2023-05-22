import _toNumber from "lodash/toNumber"
import _startCase from "lodash/startCase";
import _floor from "lodash/floor"


const gram = 28.3495; // how many grams are in 1 ounce
const ounce = 1;
const pi= 3.141592653589793;
const roundTo = 3;

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
export function circleThicknessFactor({panSize = 0, factor = 0}) {
    // const pi = 3.141592653589793;
    let panRadius = panSize / 2;

    return pi * panRadius * panRadius * factor
}

export function squareThicknessFactor({ panWidth = 0, panLength = 0, factor = 0}) {
    return  panWidth * panLength
}

/**
 *
 * @param ounces
 * @returns {number}
 */
export function ouncesToGrams( ounces ) {
    return ounces * gram;
}

/**
 *
 * @param grams
 * @returns {number}
 */
export function gramsToOunces( grams ) {
    return grams / gram;
}

export function cmToInches( cm ) {
    return cm / 2.54
}

/**
 *
 * @param inputObject
 * @param keyToExclude
 * @returns {any}
 */
export function filterObjectExclude( inputObject, keyToExclude ) {
    return Object.fromEntries(Object.entries(inputObject).filter(([key]) => !key.includes(keyToExclude)))
}

/**
 *
 * @param inputObject
 * @param keyWordInclude
 * @returns {any}
 */
export function filterObject( inputObject, keyWordInclude ) {
    return Object.fromEntries(Object.entries(inputObject).filter(([key]) => key.includes(keyWordInclude)))
}

export function clampNumber( input ) {
    return _floor(input, roundTo)
}

/**
 *
 * @param ingredientName
 * @param ingredientPercent
 * @param weightGrams
 * @param weightOunces
 * @constructor
 */
export function Ingredient({ingredientName = '', ingredientPercent = 0, weightGrams = 0, weightOunces = 0} = {}) {
    this.name = ingredientName;
    this.percent = ingredientPercent;
    this.grams = weightGrams;
    this.ounces = weightOunces;
}

/**
 *
 * @param waterPercent
 * @param saltType
 * @param saltPercent
 * @param yeastType
 * @param yeastPercent
 * @param additionalIngredients
 * @returns {{salt: Ingredient, flour: Ingredient, water: Ingredient, yeast: Ingredient}}
 */
export function ingredientPercentTotals({
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

    // make and combine an object with all the ingredients from the form
    // and place it in the ingredient object created above
    let combinedIngredients = combineIngredients( ingObj, additionalIngredients)
    // get all ingredient percentages
    Object.entries(combinedIngredients).forEach(([key, value]) => {
        let percentObj = {}

        percentObj[key] = value.percent
        Object.assign(totals, percentObj)
    })



    combinedIngredients['Totals'] = totals;
    combinedIngredients['Totals']['totalPercent'] = percentsTotal(combinedIngredients['Totals'])
    combinedIngredients['Totals']['weights'] = {};

    return combinedIngredients
}

export function combineIngredients( base, additional ) {

    // make and combine an object with all the ingredients from the form
    // and place it in the ingredient object created above
   Object.entries(additional).forEach(([key, value]) => {
        let ingredient = {};
        let ingName = _startCase(key);
        let ingPercent = _toNumber(value);

        ingredient[ingName] = new Ingredient({
            ingredientName: ingName,
            ingredientPercent: ingPercent
        })

        Object.assign(base, ingredient)

    });

    return base;
}

/**
 *
 * @param objectValues
 * @returns {unknown}
 */
export function percentsTotal(objectValues) {
    let initialValue = 0
    const reducer = (accumulator, currentValue) => accumulator + currentValue;

    return _floor(Object.values(objectValues).reduce(reducer, initialValue), roundTo);
}

export function calculateDoughWeight({
                                         measure = '',
                                         doughBase = {},
                                         ingredients = {},
                                         totalIngredientsPercent = 0
                                     }) {

    let ddw = desiredDoughWeight( measure, doughBase, totalIngredientsPercent );
    let dbNumber = _toNumber(doughBase.dbNumber);


    if ( measure === 'metric' ) {
        ddw =  ouncesToGrams(ddw)
    }
    if (measure === 'metric' && doughBase.calcBy === 'weight' ) {
        ddw = gramsToOunces(ddw)
    }


    let flourWeight = calculateFlourWeight( measure, ddw, totalIngredientsPercent)

    // take flour out of the object before calculations since we have the flour amount above in flour weight
    let ingredientObject  = filterObjectExclude(ingredients, 'flour')

    // create an object for ingredientObj then add in the weights
    Object.entries(ingredientObject).forEach(([key, value]) => {
        let ingredientWeight = getIngredientWeight({flourWeight: flourWeight.ounces, ingredientPercent: value.percent})
        value.ounces = _floor( ingredientWeight * dbNumber, roundTo )
        value.grams = _floor(ouncesToGrams(value.ounces), roundTo)
    })
    ingredients.flour.ounces = _floor(flourWeight.ounces * dbNumber, roundTo) ;
    ingredients.flour.grams = _floor(flourWeight.grams  * dbNumber, roundTo ) ;


    return ingredients ;
}

function calculateFlourWeight( measure, desiredDoughWeight, ingredientPercentTotals ) {
    let flourWeight = _floor(desiredDoughWeight / ingredientPercentTotals * 100, roundTo) ;

    if (measure === 'metric' ) {
        return {
            ounces: gramsToOunces( flourWeight ),
            grams: flourWeight
        }
    }

    return  {
        ounces: flourWeight,
        grams: ouncesToGrams(flourWeight)
    }
}

export function calculateThicknessFactor(pizzaShape = '', width = 0, length = 0, desiredDoughWeight = 0, measurementType ) {
    // round / circle pie thickness factor
    let panRadius = width / 2
    let panSquare = Math.pow( panRadius, 2 );
    let panArea = pi * panSquare

    if ( pizzaShape === 'square' ) {
        panArea = width * length
        return  _floor( desiredDoughWeight / panArea, 5)
    }


    return _floor( desiredDoughWeight / panArea, 5)

    // square/rectangle thickness factor

}

/**
 * @param measureType
 * @param ingredientTotals
 * @param doughBase
 * @returns {number}
 */
export function calculateDoughByFactor({
                                         measureType = '',
                                         ingredientTotals = 0,
                                         doughBase = {},
                                     }) {
    const measure = measureType;

    // const calculateBy = doughBase.calcBy
    // const dbNumber = doughBase.dbNumber
    const shape = doughBase.pizzaShape
    let pizzaWidth = doughBase.pizzaWidth
    let pizzaLength = doughBase.pizzaLength
    let factor = _toNumber(doughBase.factor);
    // take the 'loading factor' or 'Thickness factor
    // and multiply it by the desired pizza size (pizzaWidth) sq
    // so for a 16 inch pizza at 0.0973 factor
    // get the square of the new size:
    // 16/2 = 8 // the radius
    // 8^2 = 64
    // 3.14 * 64 = 200.96
    // 0.973 * 200.96 = 19.553

    if (measure === 'metric') {
        pizzaWidth = cmToInches(pizzaWidth)
    }
    if (measure === 'metric' && shape === 'square') {
        pizzaLength = cmToInches(pizzaLength)
    }

    let radius = pizzaWidth / 2
    let square = Math.pow( radius, 2 );
    let surfaceArea = pi * square;
    let totalDoughWeight = factor * surfaceArea

    if (shape === 'square' ) {
        surfaceArea = pizzaWidth * pizzaLength
        totalDoughWeight = factor * surfaceArea
    }

    return totalDoughWeight;

}

export function desiredDoughWeight(measure, doughBase, ingredientPercents ) {

    let ddw = calculateDoughByFactor({measureType: measure, ingredientTotals: ingredientPercents, doughBase})

    if (doughBase.calcBy === 'weight') {
        // ddw = getFlourByWeight({desiredDoughWeight: factor, ingredientPercents: ingredientPercents }
        return doughBase.factor
    }


    return ddw;
}

function sumFilter( filter, objectToFilter ) {

   return Object.fromEntries( Object.entries(objectToFilter).filter(([key]) => !key.includes(filter)) )
}

export function getIngredientWeight ( {flourWeight = 0 , ingredientPercent = 0, measureType ='' } = {} ) {
    let fw = flourWeight;
    if (measureType === 'metric') {
        fw = gramsToOunces(fw)
    }

    return _floor(fw  * ingredientPercent / 100, roundTo)
}
