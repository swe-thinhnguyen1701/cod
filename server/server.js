const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const path = require("path");

const { resolvers, typeDefs } = require("./schemas");

const sequelize = require("./config/connection");
const messageDB = require("./config/mongoDB-connection");

const { populateData } = require("./utils");

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const app = express();
const PORT = process.env.PORT || 3001;

const startApolloServer = async () => {
    try {
        messageDB.once("open", () => {
            console.log("connected to MongoDB");
        });

        await sequelize.sync({ force: false });
        await populateData();

        await server.start();

        app.use(express.urlencoded({ extended: false }));
        app.use(express.json());
        app.use(express.static(path.join(__dirname, "public")));

        app.use("/graphql", expressMiddleware(server, {
            context: async ({ req }) => ({ req }),
        }));

        if (process.env.NODE_ENV === "production") {
            app.use(express.static(path.join(__dirname, "../client/dist")));

            app.get("*", (_req, res) => {
                res.sendFile(path.join(__dirname, "../client/dist/index.html"))
            })
        }

        app.listen(PORT, () => {
            console.log(`API server running on port ${PORT}!`);
            console.log(`Use GraphQL at XXXXXXXXXXXXXXXX:${PORT}/graphql`);
        });
    } catch (error) {
        console.log(error);
    }
}

startApolloServer();