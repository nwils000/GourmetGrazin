import Client from 'shopify-buy'

const client = Client.buildClient({
  domain: 'enw00b-et.myshopify.com',
  storefrontAccessToken: 'cebbb972172a4226ceae6519c1152bc0',
  apiVersion: '2024-01',
})

export default client
