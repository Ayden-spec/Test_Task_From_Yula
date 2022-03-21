const Routes = require('express');
const router = new Routes();

router.get('/get-number-of-banknotes/:id', async (req, res) => {
    try {
        return res.json({
            amount: req.params.id,
            banknotes: {
                5000: 98,
                2000: 30,
                1000: 1840,
                500: 45,
                200: 0,
                100: 734
            }
        })
    } catch (e) {
        console.log(e);
        res.send({ message: "server error" })
    }
})


module.exports = router;