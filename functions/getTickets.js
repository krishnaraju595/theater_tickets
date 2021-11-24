const Endpoint = require("../EndPoint");
const connectToDatabase = require("../database");
const {authenticateToken} = require("../common/jwt")
/**
 * @swagger
 * /api/tickets:
 *   get:
 *     summary: Retrieve a list of tickets.
 *     description: Retrieve a list of tickets from DB.
 *     responses:
 *       200:
 *         description: A list of tickets.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  type: object
 *                  properties:
 *                   id:
 *                      type: string
 *                      description: The ticket ID.
 *                   customerName:
 *                      type: string
 *                      description: The customer name.
 *                   performanceTitle:
 *                      type: string
 *                      description: The performance title.
 *                   performanceTime:
 *                      type: string
 *                      description: The performance duration.
 *                   creationDate:
 *                      type: string
 *                      description: The creation date.
 *                   ticketPrice:
 *                      type: number
 *                      description: The ticket amount
 * 
 */

module.exports = new Endpoint(
    "/api/tickets",
    async (req, res) => {
        try {
            if(!await authenticateToken(req.headers["authorization"] || null)){
                res.status(403).send({errorMessage: "UnAuthorized"});
            }else {
            const { Ticket } = await connectToDatabase();
            const allTickets = await Ticket.findAll();
            res.status(200)
                .send(allTickets);
            }
        }
        catch (err) {
            console.error(JSON.stringify(err));
            res.status(500)
                .send({ "errorMessage": JSON.stringify(err)});
        }
    }
);
