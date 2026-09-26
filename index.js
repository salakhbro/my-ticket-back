const express = require("express");
const cors = require("cors");
const { connect } = require("mongoose");
const dns = require("dns");

require("dotenv").config();

const adminRouter = require("./routes/adminRoute.js");
const langRouter = require("./routes/langRoute.js");
const payment_methodRoute = require("./routes/payment_methodRoute.js");
const delivery_methodRoute = require("./routes/delivery_methodRoute.js");
const ticket_statusRoute = require("./routes/ticket_statusRoute.js");
const seat_typeRoute = require("./routes/seat_typeRoute.js");
const typesRouter = require("./routes/typesRoute.js");
const regionRouter = require("./routes/regionRoute.js");
const districtRouter = require("./routes/districtRoute.js");
const humanCategoryRouter = require("./routes/human_categoryRoute.js");
const eventTypeRouter = require("./routes/event_typeRoute.js");
const eventRouter = require("./routes/eventRoute.js");
const customerRouter = require("./routes/CustomerRoute.js");
const customerCardRouter = require("./routes/customer_cardRoute.js");
const customerAddressRouter = require("./routes/customer_addressRoute.js");
const venueRouter = require("./routes/venueRoute.js");
const venuePhotoRouter = require("./routes/venue_photoRoute.js");
const venueTypesRouter = require("./routes/venue_typesRoute.js");
const seatRouter = require("./routes/seatRoute.js");
const ticketRouter = require("./routes/ticketRoute.js");
const cartRouter = require("./routes/cartRoute.js");
const cartItemRouter = require("./routes/cart_itemRoute.js");
const bookingRouter = require("./routes/bookingRoute.js");

const app = express();


// Middleware
app.use(cors());
app.use(express.json());


// DNS
dns.setServers([
    "8.8.8.8",
    "1.1.1.1",
]);


// MongoDB
const ConnectionToDB = async () => {
    try {
        await connect(process.env.MONGO_URL);

        console.log("MongoDB is connected");
    } catch (error) {
        console.error(
            "MongoDB connection error:",
            error.message
        );
    }
};

ConnectionToDB();


// ==================== ROUTES ====================

app.use("/api/admin", adminRouter);
app.use("/api/lang", langRouter);
app.use("/api/payment-method", payment_methodRoute);
app.use("/api/delivery-method", delivery_methodRoute);
app.use("/api/ticket-status", ticket_statusRoute);
app.use("/api/seat-type", seat_typeRoute);
app.use("/api/types", typesRouter);
app.use("/api/region", regionRouter);
app.use("/api/district", districtRouter);
app.use("/api/human-category", humanCategoryRouter);
app.use("/api/event-type", eventTypeRouter);
app.use("/api/event", eventRouter);
app.use("/api/customers", customerRouter);
app.use("/api/customer-cards", customerCardRouter);
app.use("/api/customer-address", customerAddressRouter);
app.use("/api/venues", venueRouter);
app.use("/api/venue-photos", venuePhotoRouter);
app.use("/api/venue-types", venueTypesRouter);
app.use("/api/seat", seatRouter);
app.use("/api/ticket", ticketRouter);
app.use("/api/cart", cartRouter);
app.use("/api/cart-items", cartItemRouter);
app.use("/api/booking", bookingRouter)

// ==================== SWAGGER ====================

const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",

        info: {
            title: "API Documentation",
            version: "1.0.0",
        },
        servers: [
            {
                url: "http://localhost:3000/api",
                description: "Development server",
            },
        ],
    },

    apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocs)
);


// ==================== SERVER ====================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(
        `Server is running on http://localhost:${PORT}`
    );

    console.log(
        `Swagger is running on http://localhost:${PORT}/api-docs`
    );
});