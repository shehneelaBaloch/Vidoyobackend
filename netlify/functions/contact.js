// netlify/functions/contact.js
const { MongoClient } = require("mongodb");

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const client = new MongoClient(process.env.MONGODB_URI);
  try {
    const data = JSON.parse(event.body);

    await client.connect();
    const database = client.db("myDatabase");
    const collection = database.collection("contacts");

    await collection.insertOne(data);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Message sent successfully' }),
    };
  } catch (error) {
    console.error("Error:", error);
    return { statusCode: 500, body: 'Failed to send message' };
  } finally {
    await client.close();
  }
};
