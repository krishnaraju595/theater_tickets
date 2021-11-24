const Endpoint = require("../EndPoint");
const connectToDatabase = require("../database");
const { v4: uuidv4 } = require("uuid");
const {authenticateToken} = require("../common/jwt")

/**
 * @swagger
 * /api/tickets:
 *   post:
 *     summary: Retrieve a ticket.
 *     description: Retrieve a ticket from DB.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *                  customerName: Jhon
 *                  performanceTitle: ABC-Movie
 *                  performanceTime: 2-Hours
 *                  ticketPrice: 300
 *             properties:
 *                   customerName:
 *                      type: string
 *                      description: The customer name.
 *                   performanceTitle:
 *                      type: string
 *                      description: The performance title.
 *                   performanceTime:
 *                      type: string
 *                      description: The performance duration.
 *                   ticketPrice:
 *                      type: number
 *                      description: The ticket amount
 *     responses:
 *       200:
 *         description: Ticket info.
 *         content:
 *           application/json:
 *             schema:
 *                  type: object
 *                  properties:
 *                    message:
 *                      type: string
 *                      description: message.
 *                    ticket:
 *                      type: object
 *                      properties:
 *                        id:
 *                          type: string
 *                          description: The ticket ID.
 *                        customerName:
 *                           type: string
 *                           description: The customer name.
 *                        performanceTitle:
 *                           type: string
 *                           description: The performance title.
 *                        performanceTime:
 *                           type: string
 *                           description: The performance duration.
 *                        creationDate:
 *                           type: string
 *                           description: The creation date.
 *                        ticketPrice:
 *                           type: number
 *                           description: The ticket amount
 * 
 */
module.exports = new Endpoint(
    "/api/tickets",
    async (req, res) => {
        try {
            if(!await authenticateToken(req.headers["authorization"] || null)){
                res.status(403).send({errorMessage: "UnAuthorized"});
            }else {
            const request = req.body;
            const { Ticket } = await connectToDatabase();
            const ticketResponse = await Ticket.create({
                id: uuidv4(),
                customerName: request.customerName,
                performanceTitle: request.performanceTitle,
                performanceTime: request.performanceTime,
                creationDate: new Date(),
                ticketPrice: request.ticketPrice
            });
            res.status(200)
                .send({
                    message: "Ticket booked successfully!",
                    ticket: ticketResponse
                });
            }
        }
        catch (err) {
            console.error(JSON.stringify(err));
            res.status(500)
                .send({ "errorMessage": JSON.stringify(err)});
        }
    },
    "post"
);
