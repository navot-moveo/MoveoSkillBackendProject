
/**
 * @api {post} /api/chefs  create chef
 * @apiName AddChef
 * @apiGroup Chef
 * @apiParamExample {json} Request-Example:
 *{
 *	"chef": 
 *	{
 *		"name": "eyal shani",
 *		"personalStory":"eyal shani story....... ",
 *		"imageUrl":"https://images1.ynet.co.il/PicServer5/2017/01/25/7541840/7534819297996980593no.jpg"
 *		
 *	}
 *}
 * @apiVersion 0.0.1
 */


 /**
 * @api {get} /api/chefs  get all chefs
 * @apiName GetChefs
 * @apiGroup Chef
 * @apiVersion 0.0.1
* @apiSuccessExample Example data on success:
* [
*    {
*        "name": "Ran Shmueli",
*        "imageUrl": "https://images1.ynet.co.il/PicServer5/2017/01/25/7541840/7534819297996980593no.jpg"
*    },
*    {
*        "name": "meir adoni",
*        "imageUrl": "https://images1.ynet.co.il/PicServer5/2017/01/25/7541840/7534819297996980593no.jpg"
*    },
*    {
*        "name": "eyal shani",
*        "imageUrl": "https://images1.ynet.co.il/PicServer5/2017/01/25/7541840/7534819297996980593no.jpg"
*    }
*]
 */


/**
 * @api {get} /api/chefs/:id  get chef by id
 * @apiName GetChefById
 * @apiGroup Chef
 * @apiVersion 0.0.1
 * @apiSuccessExample Example data on success:
 *{
 *   "name": "Yossi Shitrit",
 *   "personalStory": "Chef Yossi Shitrit has been living and breathing his culinary dreams for more than two decades, including running the kitchen in his first restaurant, the fondly-remembered Violet, located in Moshav  Udim. Shitrit's creativity and culinary  acumen born of long experience  are expressed in the every detail of each and every dish.",
 *   "imageUrl": "https://media.timeout.com/images/103806642/image.jpg"
 *}
 */
