const { json } = require('micro')
const Airtable = require('airtable')
const { info, error } = require('@um/log')

const apiKey = process.env.AIRTABLE_API_KEY || ''

if (!apiKey) {
  throw new Error('missing `AIRTABLE_API_KEY` env var')
}

const getBase = baseId =>
  new Airtable({
    apiKey
  }).base(baseId)

module.exports = async function proxyAirtable(req, res) {
  info(`[REQ] [${req.method}] ${req.url}`)

  const body = await json(req)
  const { baseId, table, data } = body
  const base = getBase(baseId)

  if (!base) {
    error('airtable: unknown `base`', { baseId, table })
    return res.send({ ok: false })
  }

  if (!table) {
    error('airtable: missing `table`', { baseId })
    return res.send({ ok: false })
  }

  const client = base(table)

  client.create(data, { typecast: true }, err => {
    if (err) {
      error('airtable: create error', { error: err })
      return res.send({ ok: false })
    }

    info('airtable: create success')

    return res.send({ ok: true })
  })
}
