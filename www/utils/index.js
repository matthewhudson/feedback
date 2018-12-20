import { post } from 'axios'

const dev = process.env.NODE_ENV !== 'production'
const airtableHost = dev ? 'http://localhost:4300' : '/api/airtable'

export async function addToAirtable({ baseId, table, data }) {
  return post(airtableHost, {
    baseId,
    table,
    data
  })
}

export default { addToAirtable }
