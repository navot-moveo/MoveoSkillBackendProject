
/**
 * @api {post} /api/admin/signup sign up new Admin 
 * @apiName AddAdmin
 * @apiGroup Admin
 * @apiParamExample {json} Request-Example:
 *{
 *	"admin": {
 *		"name":"navot",
 *		"password":"123456789"
 *	}
 *}
 * @apiVersion 0.0.1
 * @apiSuccessExample Example data on success:
 *{
 *    "name": "navot",
 *    "token": "some - token"
 *}
 */


/**
 * @api {post} /api/admin/login login exists Admin
 * @apiName loginAdmin
 * @apiGroup Admin
 * @apiParamExample {json} Request-Example:
 *{
 *		"name":"navot",
 *		"password":"123456789"
 *}
* @apiSuccessExample Example data on success:
 *{
 *    "name": "navot",
 *   "token": "some - token"
 *}
 * @apiErrorExample {string} Error 500 Incorrect Password
 * "Incorrect password. please enter password again."
 * @apiVersion 0.0.1
 */

 /**
 * @api {get} /api/admin/?objectType=user get all users
 * @apiName GetUsers
 * @apiHeader  {string} [token] token of the admin request
 * @apiGroup Admin
 * @apiParam {string}[objectType] icon/dishCatagory/user
 * @apiVersion 0.0.1
 */


 /**
 * @api {get} api/admin/orders/?userId=5c9774da49942b3d528e8857 get all orders of a user 
 * @apiName GetUserOrderById
 * @apiHeader  {string} [token] token of the admin request
 * @apiGroup Admin
 * @apiParam {string}[userId] user id
 * @apiVersion 0.0.1
 * @apiSuccessExample Example data on success:
 * [
 *   {
 *       "shopping_bag": [
 *           {
 *               "changes": [
 *                   "with bread"
 *               ],
 *               "sides": [],
 *               "name": "pizza",
 *               "quantity": 2,
 *               "price": 75,
 *               "total_price": 150,
 *               "imageUrl": "https://www.qsrmagazine.com/sites/default/files/styles/story_page/public/phut_0.jpg?itok=Bzo3z1cD"
 *           }
 *       ],
 *       "total_price": 150
 *   }
 *]
 */


/**
 * @api {post} /api/admin/?objectType=icon create icon[vegan,vegitarian,spicy]
 * @apiName AddIcon
 * @apiGroup Admin
 * @apiHeader  {string} [token] token of the admin request
 * @apiParam {string}[objectType] icon/dishCatagory/user
 * @apiVersion 0.0.1
 * @apiParamExample {json} Request-Example:
 *{
 *	"object": 
 *	{
 *		"name":"spicy",
 *		"imageUrl":"https://thumbs.dreamstime.com/z/vegan-icon-specially-designed-small-size-viewing-black-vector-logo-white-background-119831532.jpg"
 *	}
 *}
 */

 /**
 * @api {post} /api/admin/?objectType=dishCatagory create dishCatagory
 * @apiName AddDishCatagory
 * @apiGroup Admin
 * @apiHeader  {string} [token] token of the admin request
 * @apiParam {string}[objectType] icon/dishCatagory/user
 * @apiVersion 0.0.1
 * @apiParamExample {json} Request-Example:
 *{
 *	"object": 
 *	{
 *		"name":"breakfast",
 *		"imageUrl":"https://thumbs.dreamstime.com/z/vegan-icon-specially-designed-small-size-viewing-black-vector-logo-white-background-119831532.jpg"
 *	}
 *}
 */


 /**
 * @api {get} /api/admin/?objectType=icon get all icons 
 * @apiName GetIcons
 * @apiGroup Admin
 * @apiHeader  {string} [token] token of the admin request
 * @apiParam {string}[objectType] icon/dishCatagory/user
 * @apiVersion 0.0.1
 * @apiSuccessExample Example data on success:
 *[
 *   {
 *       "name": "vegan",
 *       "imageUrl": "https://thumbs.dreamstime.com/z/vegan-icon-specially-designed-small-size-viewing-black-vector-logo-white-background-119831532.jpg"
 *   },
 *   {
 *       "name": "vegitarian",
 *       "imageUrl": "https://thumbs.dreamstime.com/z/vegan-icon-specially-designed-small-size-viewing-black-vector-logo-white-background-119831532.jpg"
 *   },
 *   {
 *       "name": "spicy",
 *       "imageUrl": "https://thumbs.dreamstime.com/z/vegan-icon-specially-designed-small-size-viewing-black-vector-logo-white-background-119831532.jpg"
 *   }
 *]
 */