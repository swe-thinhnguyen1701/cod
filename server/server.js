const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const path = require("path");

const { resolvers, typeDefs } = require("./schemas");

const sequelize = require("./config/connection");

const { populateData } = require("./utils");

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const app = express();
const PORT = process.env.PORT || 3001;

const startApolloServer = async () => {
    try {
        await sequelize.sync({ force: false });
        await populateData();

        await server.start();

        app.use(express.urlencoded({ extended: false }));
        app.use(express.json());

        app.use("/graphql", expressMiddleware(server));

        if (process.env.NODE_ENV === "production") {
            app.use(express.static(path.join(__dirname, "../client/dist")));

            app.get("*", (_req, res) => {
                res.sendFile(path.join(__dirname, "../client/dist/index.html"))
            })
        }

        app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
    } catch (error) {
        console.log(error);
    }
}

startApolloServer();