const Endpoint = require("../EndPoint");
const {generateAccessToken} = require("../common/jwt");


/**
 * @swagger
 * /api/token:
 *   get:
 *     summary: Get Auth token.
 *     description: Get Auth token ( need to send this in every api request).
 *     responses:
 *       200:
 *         description: Ticket info.
 *         content:
 *           application/json:
 *             schema:
 *                  type: object
 *                  properties:
 *                   token:
 *                      type: string
 *                      description: JWT token.
 * 
 */
module.exports = new Endpoint(
    "/api/token",
    async (req, res) => {
        try { 
            res.status(200).send({token: await generateAccessToken()});
            
        }
        catch (err) {
            console.error(JSON.stringify(err));
            res.status(500)
                .send({ "errorMessage": JSON.stringify(err)});
        }
    }
);
