const Endpoint = require("../EndPoint");
const connectToDatabase = require("../database");
const {authenticateToken} = require("../common/jwt")

/**
 * @swagger
 * /api/tickets/{id}:
 *   patch:
 *     summary: Update ticket.
 *     description: Update ticket info.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: id for ticket.
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
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
    "/api/tickets/:id",
    async (req, res) => {
        try {
            if(!await authenticateToken(req.headers["authorization"] || null)){
                res.status(403).send({errorMessage: "UnAuthorized"});
            }else {
            const { Ticket } = await connectToDatabase();
            const ticketResponse = await Ticket.findOne({ where: { id: req.params.id } });
            if (!ticketResponse) {
                res.status(404).send({ errorMessage: "Ticket id not found!" });
            } else {
                await Ticket.update(req.body, { where: { id: req.params.id } })
                res.status(200).send({
                    message: "Ticket updated successfully!",
                    ticket: await Ticket.findOne({ where: { id: req.params.id } })
                });
            }
        }
    }
        catch (err) {
            console.error(JSON.stringify(err));
            res.status(500)
                .send({ "errorMessage": JSON.stringify(err) });
        }
    },
    "patch"
);
