const Endpoint = require("../EndPoint");
const connectToDatabase = require("../database");
const { Op } = require('sequelize');
const {authenticateToken} = require("../common/jwt")

const {responseMap, filterCounts} = require("../common/mapper")


/**
 * @swagger
 * /api/analytics/visited:
 *   get:
 *     summary: get people analytics.
 *     description: how many people visited theater between 2 dates with division by months.
 *     parameters:
 *       - in: query
 *         name: startDate
 *         required: true
 *         description: creationDate from.
 *         schema:
 *           type: string
 *           example: 2020-01-10
 *       - in: query
 *         name: endDate
 *         required: true
 *         description: creationDate end.
 *         schema:
 *           type: string
 *           example: 2022-01-10
 *       - in: query
 *         name: method
 *         required: true
 *         description: Type of method.
 *         schema:
 *           type: string
 *           example: aggregation
 *           enum:
 *              - aggregation
 *              - algorithm
 * 
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
 *                   month:
 *                      type: string
 *                      description: month name.
 *                   summaryProfit:
 *                      type: number
 *                      description: customers visited in the month.
 * 
 */

module.exports = new Endpoint(
    "/api/analytics/visited",
    async (req, res) => {
        try {
            if(!await authenticateToken(req.headers["authorization"] || null)){
                res.status(403).send({errorMessage: "UnAuthorized"});
            }else {
            const method = req.query.method;
            let startDate = req.query.startDate;
            let endDate = req.query.endDate;
            const { Ticket, sequelize } = await connectToDatabase();
            if(method =="aggregation"){
            const visitedResponse = await sequelize.query(`SELECT date_part('month', creation_date) AS month, count(id) as value FROM tickets WHERE creation_date BETWEEN '${startDate}' AND '${endDate}' GROUP BY month`, { type: sequelize.QueryTypes.SELECT });
            // const visitedResponse = await Ticket.findAll({where : {"creationDate" : {[Op.between] : [startDate , endDate ]}}})
            res.status(200).send(responseMap(visitedResponse, "summaryVisits"));
            }
            else {
                let startDate = new Date(req.query.startDate);
                let endDate = new Date(req.query.endDate);
                const filterTickets= [];
                const allTickets = await Ticket.findAll({ raw: true});
                for(const ticket of allTickets){
                    if(ticket.creationDate>startDate && ticket.creationDate<endDate){
                        filterTickets.push(ticket);
                    }
                }
                const counts = await filterCounts(filterTickets);
                const result= [];
                for (const key of Object.keys(counts)){
                    result.push({month:key, summaryVisits: counts[key]})
                   }
                res.status(200).send(result);
            }
        }
    }
        catch (err) {
            console.error(JSON.stringify(err));
            res.status(500)
                .send({ "errorMessage": JSON.stringify(err) });
        }
    }
);


