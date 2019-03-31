/**
 * @api {post} /api/users/signup sign up new User 
 * @apiName AddUser
 * @apiGroup User
 * @apiParamExample {json} Request-Example:
 *{
 *	"user": {
 *		"full_name":"guy slavin",
 *		"email":"guy@gmail.com",
 *		"address": "reut",
 *		"phone_number":"0546838475",
 *		"password":"2019"
 *	}
 *}
 * @apiVersion 0.0.1
 * @apiSuccessExample Example data on success:
 * {
 *  "shopping_bag": [],
 *   "full_name": "guy slavin",
 *  "email": "guy@gmail.com",
 *   "address": "reut",
 *   "phone_number": "0546838475",
 *   "token": 'some - token'
 * }
 */

/**
 * @api {post} /api/users/login login exists User 
 * @apiName AddUser
 * @apiGroup User
 * @apiParamExample {json} Request-Example:
 *{
 *	"email": "guy@gmail.com",
 *	"password":"2019"
 *}
 * @apiVersion 0.0.1
 * @apiSuccessExample Example data on success:
 * {
 *  "shopping_bag": [],
 *   "full_name": "guy slavin",
 *  "email": "guy@gmail.com",
 *   "address": "reut",
 *   "phone_number": "0546838475",
 *   "token": 'some - token'
 * }
 */

 /**
 * @api {get} /api/users/shoppingBag get the shopping bag of the user
 * @apiName GetUserShoppingBag
 * @apiGroup User
 * @apiHeader  {string} [token] token of the user request
 * @apiParam {email}[email] email of user.
 * @apiVersion 0.0.1
 * @apiSuccessExample Example data on success:
 * {
 *   "shopping_bag": [],
 *   "_id": "5c9774da49942b3d528e8857",
 *   "total_price": 0
 *  }
 */

 /**
 * @api {get} /api/users/shoppingBag/?quantity=true get the shopping bag size of the user
 * @apiName GetUserShoppingBagSize
 * @apiGroup User
 * @apiHeader  {string} [token] token of the user request
 * @apiParam {email}[email] email of user.
 * @apiParam {boolean}[quantity] true to get the size of the shopping bag.
 * @apiVersion 0.0.1
 * @apiSuccessExample Example data on success:
 * {
 *   "size":1
 *  }
 */

 /**
 * @api {post} /api/users/shoppingBag add meal to the shopping bag of the user
 * @apiName AddMeal
 * @apiGroup User
 * @apiHeader  {string} [token] token of the user request
 * @apiParamExample {json} Request-Example:
 *{
 *	"meal":
 *	{
 *		"user_id":"5c9774da49942b3d528e8857",
 *		"name":"pizza",
 *		"changes":["with bread"],
 *		"sides":[],
 *		"quantity":2,
 *		"price": 75,
 *		"dish_id":"5c97774849942b3d528e885a"
 *	}
 *}
 * @apiVersion 0.0.1
 * @apiSuccessExample Example data on success:
 *{
    "shopping_bag": [
        {
            "changes": [
                "with bread"
            ],
            "sides": [],
            "_id": "5c97a173e5431046e1354f35",
            "name": "pizza",
            "quantity": 2,
            "price": 75,
            "total_price": 150,
            "dish_id": "5c97774849942b3d528e885a",
            "imageUrl": "https://www.qsrmagazine.com/sites/default/files/styles/story_page/public/phut_0.jpg?itok=Bzo3z1cD"
        }
    ],
    "_id": "5c9774da49942b3d528e8857",
    "full_name": "guy2",
    "email": "guy@gmail.com",
    "address": "reut",
    "phone_number": "111111111",
    "total_price": 150
* }
 */

 /**
 * @api {post} /api/users/order/?order=true add order to the orders collection 
 * @apiName AddOrder
 * @apiGroup User
 * @apiHeader  {string} [token] token of the user request
 * @apiParam {email}[email] email of user.
 * @apiVersion 0.0.1
 * @apiSuccessExample Example data on success:
 * "your order has been made. Thank you for using our service"
 */

 /**
 * @api {get} /api/users/:id  find user by id 
 * @apiName FindUserById
 * @apiGroup User
 * @apiHeader  {string} [token] token of the user request
 * @apiVersion 0.0.1
 * @apiSuccessExample Example data on success:
 * {  
 *   "full_name": "guy2",
 *   "address": "reut",
 *   "phone_number": "111111111"
 * }
 */


 /**
 * @api {post} /api/users/password update user password
 * @apiName UpdatePassword
 * @apiGroup User
 * @apiHeader  {string} [token] token of the user request
 * @apiParamExample {json} Request-Example:
 *     {
 *      "password": pass,
 *      "new_password":newPass
 *     }
 * @apiVersion 0.0.1
 * @apiSuccessExample Example data on success:
 *  "password has been changed"
 * @apiErrorExample example:
 *  Incorrect password. please enter password again.
 */

 /**
 * @api {post} /api/users/contactUs send mail to admin for contact
 * @apiName ContactUs
 * @apiGroup User
 * @apiHeader  {string} [token] token of the user request
 * @apiParamExample {json} Request-Example:
 *     {
 *	        "email":"slavin.navot@gmail.com",
 *      	"message":"Hi, this is my first email using node js. test!"
 *     }
 * @apiVersion 0.0.1
 * @apiSuccessExample Example data on success:
 *Thank you for your message. The mail has been sent. we will be back in touch with you soon..
 */