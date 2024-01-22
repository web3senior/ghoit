/**
 * Get dashboard
 * @returns
 */
export async function getDashboard(wallet_addr) {
  let requestOptions = {
    method: 'GET',
    redirect: 'follow',
  }

  const response = await fetch(`${import.meta.env.VITE_API_URL}dashboard?wallet_addr=${wallet_addr}`, requestOptions)
  if (!response.ok) throw new Response('Failed to get data', { status: 500 })
  return response.json()
}

/**
 *
 * @returns
 */
export async function getMerchant(wallet_addr) {
  let requestOptions = {
    method: 'GET',
    redirect: 'follow',
  }

  const response = await fetch(`${import.meta.env.VITE_API_URL}merchant/get?wallet_addr=${wallet_addr}`, requestOptions)
  if (!response.ok) throw new Response('Failed to get data', { status: 500 })
  return response.json()
}

/**
 * Login
 * @param {json} post
 * @returns
 */
export async function newMerchant(post,wallet_addr) {
  var requestOptions = {
    method: 'POST',
    body: JSON.stringify(post),
    redirect: 'follow',
  }

  const response = await fetch(`${import.meta.env.VITE_API_URL}merchant/add?wallet_addr=${wallet_addr}`, requestOptions)
  if (!response.ok) throw new Response('Failed to get data', { status: 500 })
  return response.json()
}

export async function getInvoice(wallet_addr) {
  let requestOptions = {
    method: 'GET',
    redirect: 'follow',
  }

  const response = await fetch(`${import.meta.env.VITE_API_URL}invoice/get?wallet_addr=${wallet_addr}`, requestOptions)
  if (!response.ok) throw new Response('Failed to get data', { status: 500 })
  return response.json()
}

export async function getInvoiceDetail(invoiceId, wallet_addr) {
  console.log(invoiceId, wallet_addr)
  let requestOptions = {
    method: 'GET',
    redirect: 'follow',
  }

  const response = await fetch(`${import.meta.env.VITE_API_URL}invoice/detail?wallet_addr=${wallet_addr}&invoice_id=${invoiceId}`, requestOptions)
  if (!response.ok) throw new Response('Failed to get data', { status: 500 })
  return response.json()
}


export async function updateInvoice(invoiceId, txn) {
  console.log(invoiceId, txn)
  let requestOptions = {
    method: 'GET',
    redirect: 'follow',
  }

  const response = await fetch(`${import.meta.env.VITE_API_URL}invoice/update?id=${invoiceId}&txn=${txn}`, requestOptions)
  if (!response.ok) throw new Response('Failed to get data', { status: 500 })
  return response.json()
}

// /////////////////////////////////////////++++++

export const getProfile = async (address, topic0) => {
  let parameters = new URLSearchParams({
    module: 'logs',
    action: 'getLogs',
    fromBlock: 0,
    toBlock: 'latest',
    address: address || '0x4AAcca72145e1dF2aeC137E1f3C5E3D75DB8b5f3',
    topic0: topic0 || '0x1e28352ff00d67474b59b87e6817d6ba65daa0130446266db8640214d8b80609',
    apikey: import.meta.env.VITE_BLOCKSCAN_API_KEY,
  })

  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
  }

  try {
    const response = await fetch(`${import.meta.env.VITE_BLOCKSCAN_API_ADDR + parameters.toString()}`, requestOptions)
    if (!response.ok) throw new Response('Failed to get data', { status: 500 })
    return response.json()
  } catch (error) {
    console.log('error', error)
  }
}

export const getPool = async (address, topic0) => {
  let parameters = new URLSearchParams({
    module: 'logs',
    action: 'getLogs',
    fromBlock: 0,
    toBlock: 'latest',
    address: address,
    topic0: topic0 || '0x69bcb5a6cf6a3c95185cbb451e77787240c866dd2e8332597e3013ff18a1aba1',
    apikey: import.meta.env.VITE_BLOCKSCAN_API_KEY,
  })

  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
  }

  try {
    const response = await fetch(`${import.meta.env.VITE_BLOCKSCAN_API_ADDR + parameters.toString()}`, requestOptions)
    if (!response.ok) throw new Response('Failed to get data', { status: 500 })
    return response.json()
  } catch (error) {
    console.log('error', error)
  }
}

export const getFund = async (address, topic0) => {
  let parameters = new URLSearchParams({
    module: 'logs',
    action: 'getLogs',
    fromBlock: 0,
    toBlock: 'latest',
    address: address || allo.address(),
    topic0: topic0 || '0xbf59838198f4ea92f663f5c1fc697f151a1b746b7dff86d564f250a55cbb4851',
    apikey: import.meta.env.VITE_BLOCKSCAN_API_KEY,
  })

  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
  }

  try {
    const response = await fetch(`${import.meta.env.VITE_BLOCKSCAN_API_ADDR + parameters.toString()}`, requestOptions)
    if (!response.ok) throw new Response('Failed to get data', { status: 500 })
    return response.json()
  } catch (error) {
    console.log('error', error)
  }
}

export const getRecipient = async (address, topic0) => {
  if (address === undefined) throw new Error(`Strategy address is required`)

  let parameters = new URLSearchParams({
    module: 'logs',
    action: 'getLogs',
    fromBlock: 0,
    toBlock: 'latest',
    address: address, // Strategy Address
    topic0: topic0 || '0xa197306e3dd5494a61a695381aa809a53b8e377a685e84e404a85d5a8da6cc62',
    apikey: import.meta.env.VITE_BLOCKSCAN_API_KEY,
  })

  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
  }

  try {
    const response = await fetch(`${import.meta.env.VITE_BLOCKSCAN_API_ADDR + parameters.toString()}`, requestOptions)
    if (!response.ok) throw new Response('Failed to get data', { status: 500 })
    return response.json()
  } catch (error) {
    console.log('error', error)
  }
}
