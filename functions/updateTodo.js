const faunadb = require("faunadb")
q = faunadb.query
require("dotenv").config()

const handler = async event => {
  try {
    const client = new faunadb.Client({ secret:process.env.FAUNADB_SECRET })
    const messageBody = JSON.parse(event.body);
    var result = await client.query(
      q.Update(q.Ref(q.Collection("messages"), messageBody.id), {
        data: { detail: messageBody.message },
      })
    )

    return {
      statusCode: 200,
      body: JSON.stringify({ message: `${obj.message}` }),
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }