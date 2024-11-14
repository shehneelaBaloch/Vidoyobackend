// netlify/functions/order.js
const { MongoClient } = require("mongodb");

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const client = new MongoClient(process.env.MONGODB_URI);
  try {
    const orderData = JSON.parse(event.body);

    await client.connect();
    const database = client.db("myDatabase");
    const collection = database.collection("orders");

    await collection.insertOne(orderData);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Order placed successfully' }),
    };
  } catch (error) {
    console.error("Error:", error);
    return { statusCode: 500, body: 'Failed to place order' };
  } finally {
    await client.close();
  }
};
