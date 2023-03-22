import app from "./src/app.js";

const port = process.env.PORT || 5050;

app.listen(port, () => {
    console.log(`Servidor iniciado em http://localhost:${port}!`);
});
