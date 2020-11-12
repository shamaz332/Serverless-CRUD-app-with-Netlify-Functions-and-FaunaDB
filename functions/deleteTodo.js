const faunadb = require("faunadb");
q = faunadb.query;
require("dotenv").config()
const handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }
    const client = new faunadb.Client({
      secret:"fnAD6M-o9uACB4lYdz8SDfauG0rT2BnCDJSx0GjY"
    });
    const messageBody = JSON.parse(event.body);
    const result = await client.query(
      q.Delete(q.Ref(q.Collection("products"), messageBody.id))
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ message: `delted` }),
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};

module.exports = { handler };
