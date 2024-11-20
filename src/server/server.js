const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser'); 

app.use(bodyParser.json());
app.use(cors({
    origin : 'http://localhost:3000'
}));

const stripe = require('stripe')('sk_test_51QFsx3EJAsUd94etXfHbLK0ycybB26eHa9QYe9sKOxNgvDtXp6dkB2i6CgiOr7rOqh9x15PSav66dm2VC3CMxnEv00zDlXYt9z');

app.post('/create-payment-intent', async (req, res) => {
    const { paymentMethodId, priceID } = req.body;

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode : 'subscription',
            line_items: [
                {
                    price: priceID,
                    quantity: 1
                },
            ],
            success_url: 'http://localhost:3000/',
            cancel_url: 'http://localhost:3000/',
        });
        res.json({ url: session.url});
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});