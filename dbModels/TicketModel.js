module.exports = (sequelize, type) => {
    return sequelize.define(
        "Tickets",
        {
            id: {
                type: type.STRING(100),
                primaryKey: true,
                allowNull: false,
                field: "id",
            },
            customerName: {
                type: type.STRING(100),
                allowNull: false,
                field: "customer_name",
            },
            performanceTitle: {
                type: type.STRING(100),
                allowNull: false,
                field: "performance_title",
            },
            performanceTime: {
                type: type.STRING(100),
                allowNull: false,
                field: "performance_time",
            },
            creationDate: {
                type: type.DATE,
                allowNull: false,
                field: "creation_date",
            },
            ticketPrice: {
                type: type.BIGINT,
                field: "ticket_price",
            }
        },
        {
            tableName: "tickets",
            timestamps: false,
        }
    );
};
