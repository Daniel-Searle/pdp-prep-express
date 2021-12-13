const express = require("express");

/**
 * This is going create and start up the express server.
 */
try {
    const port = 8000;
    const app = express();

    app.use(require('./routers/BaseResource'));
    app.listen(port, () => {
        console.log(`Running on port ${port}.`);
    });

} catch (error) {
    console.log('Error in index code: ' + error);
}
