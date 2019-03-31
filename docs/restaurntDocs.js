 /**
 * @api {post} /api/restaurants  create restaurant
 * @apiName AddRestaurant
 * @apiGroup Restaurant
 * @apiParamExample {json} Request-Example:
 *{
 *	"restaurant":
 *	{
 *   "openingHours" : {
 *      "sunday" : {
 *           "open" : 12,
 *          "close" : 23
 *     }
 *   },
 *  "imagesUrl" : [],
 *   "dishes" : ["5c97778449942b3d528e885b"],
 *   "name" : "port said",
 *  "chef" : "5c9777e549942b3d528e885e",
 *   "cuisine" :{
 *   	"name":"italian",
 *   	"imageUrl":"https://www.tokyo.grand.hyatt.co.jp/en/restaurants/french-kitchen-tokyo/"
 *   	},
 *   "openingDate" : "2019-03-22",
 *   "address" : "har sinay 3",
 *   "phone" : "1232482181",
 *   "about" : "hupster place blablalbal. ",
 *   "rating" : 6
 *	}
 *}
 * @apiVersion 0.0.1
 */


/**
 * @api {get} /api/restaurants/?sortField=new get restaurants by sortField contidtion
 * @apiName GetRestaurantsSortedBy
 * @apiGroup Restaurant
 * @apiParam {string} how to sort the restaurants(open/newpopular/cuisine).
 * @apiVersion 0.0.1
 */


 /**
 * @api {get} /api/restaurants/home get all cuisine of restaurants 
 * @apiName Home
 * @apiGroup Restaurant
 * @apiVersion 0.0.1
 * * @apiSuccessExample Example data on success:
 * [
 *     {
 *         "name": "fffffffff",
 *        "imageUrl": "https://www.tokyo.grand.hyatt.co.jp/en/restaurants/french-kitchen-tokyo/"
 *    },
 *    {
 *        "name": "israli",
 *        "imageUrl": "https://www.tokyo.grand.hyatt.co.jp/en/restaurants/french-kitchen-tokyo/"
 *    }
 * ]
 * 
 */


 /**
 * @api {get} /api/restaurants/?sortField='contitionToSortBy' get restaurants by sortField contidtion
 * @apiName GetRestaurantsSortedBy
 * @apiGroup Restaurant
 * @apiParam {string}[sortField] how to filter the restaurants(open/new/popular/cuisine).
 * @apiVersion 0.0.1
 */

/**
 * @api {get} /api/restaurants/search/?q=itialian partial search feature [restaurants/chefs/cuisine] 
 * @apiName SearchRestaurants
 * @apiGroup Restaurant
 * @apiParam {string}[q] the word to search by.
 * * @apiSuccessExample Example data on success:
 *[
 *  {
 *       "imagesUrl": [],
 *       "name": "mashia",
 *       "chef": {
 *           "name": "Yossi Shitrit"
 *       },
 *       "cuisine": {
 *           "name": "italian",
 *           "imageUrl": "www.italy.com"
 *       }
 *   },
 *   {
 *       "imagesUrl": [],
 *       "name": "pizza hut",
 *       "chef": {
 *           "name": "Meir Adoni"
 *       },
 *       "cuisine": {
 *           "name": "italian",
 *           "imageUrl": "www.italy.com"
 *       }
 *   }
 *]
 * @apiVersion 0.0.1
 */

/**
 * @api {get} /api/restaurants/:id/?action=open get action of restaurant by id
 * @apiName getRestaurantActionById
 * @apiGroup Restaurant
 * @apiParam {string}[id] the word to search by.
 * @apiParam {string}[action] action to do by restaurant id[menu, info, profile,dishes,open]
 * @apiVersion 0.0.1
 * @apiSuccessExample Example data on success:
 * {
 *   "isOpen": true
 *}
 */


