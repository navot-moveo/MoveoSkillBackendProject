
/**
 * @api {post} /api/dishes  create dish
 * @apiName AddDish
 * @apiGroup Dish
 * @apiParamExample {json} Request-Example:
 *{
 *	"dish": 
 *	{
 *		"name": "israli salad",
 *		"ingredients":["tomatos", "cocumber","carrut"],
 *		"sides":["pepper", "salt","oil olive"],
 *		"changes":["with bread","with brown bread"],
 *		"catagory":"5c97747349942b3d528e8856",
 *		"price": 82.5,
 *		"icons":["5c9773d43da1d33d458a6069"],
 *		"imageUrl":"https://www.qsrmagazine.com/sites/default/files/styles/story_page/public/phut_0.jpg?itok=Bzo3z1cD"
 *		
 *	}
 *}
 * @apiVersion 0.0.1
 */


 


/**
 * @api {get} /api/dishes/:id  get dish by id
 * @apiName GetDishById
 * @apiGroup Dish
 * @apiVersion 0.0.1
* @apiSuccessExample Example data on success:
* {
*    "ingredients": [
*        "tomato",
*        "cocumber",
*        "corn",
*        "musterd"
*    ],
*    "sides": [
*        "lemon",
*        "salt",
*        "peper"
*    ],
*    "changes": [
*        "with agg"
*    ],
*    "icons": [
*        {
*            "name": "vegan",
*            "imageUrl": "https://thumbs.dreamstime.com/z/vegan-icon-specially-designed-small-size-viewing-black-vector-logo-white-background-119831532.jpg"
*        }
*    ],
*    "name": "israeli salad",
*    "price": 51,
*    "imageUrl": "https://www.chef-lavan.co.il/uploads/images/6e5bed504bbde4ee9881ef545b52ac37.jpg"
*}
 */
