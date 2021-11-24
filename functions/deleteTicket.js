const Endpoint = require("../EndPoint");
const connectToDatabase = require("../database");
const {authenticateToken} = require("../common/jwt")

/**
 * @swagger
 * /api/tickets/{id}:
 *   delete:
 *     summary: Retrieve a ticket.
 *     description: Retrieve a ticket from DB.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: id for ticket.
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Ticket info.
 *         content:
 *           application/json:
 *             schema:
 *                  type: object
 *                  properties:
 *                   message:
 *                      type: string
 *                      description: message
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
            const  ticketResponse = await Ticket.findOne({where: {id: req.params.id}});
            if(!ticketResponse){
                res.status(404).send({errorMessage: "Ticket id not found!"});
            }else{
                Ticket.destroy({where:{id:req.params.id}})
                res.status(200).send({message: "Ticket deleted successfully!"});
            }
        }
        }
        catch (err) {
            console.error(JSON.stringify(err));
            res.status(500)
                .send({ "errorMessage": JSON.stringify(err)});
        }
    },
    "delete"
);
