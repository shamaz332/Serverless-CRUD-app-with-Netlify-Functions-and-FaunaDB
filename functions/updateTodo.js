const faunadb = require("faunadb")
q = faunadb.query
require("dotenv").config()

const handler = async event => {
  try {
    const client = new faunadb.Client({ secret:process.env.ADMIN_SECRET })
    const messageBody = JSON.parse(event.body);
    var result = await client.query(
      q.Update(q.Ref(q.Collection("task"), messageBody.id), {
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