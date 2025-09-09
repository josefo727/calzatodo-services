import { json } from 'co-body'
import { UserInputError, NotFoundError } from '@vtex/api'

/**
 * Creates a document in Master Data
 */
export async function createDocument(ctx: Context, next: () => Promise<any>) {
  const {
    vtex: {
      route: { params },
    },
    clients: { masterData },
  } = ctx

  const { dataEntity } = params

  if (!dataEntity) {
    throw new UserInputError('Data entity is required')
  }

  try {
    // Get query parameters
    const { schema } = ctx.query

    const body = await json(ctx.req)
    const response = await masterData.createDocumentMD(
      dataEntity as string,
      body,
      schema as string | undefined
    )

    ctx.status = 201
    ctx.body = response
  } catch (error) {
    console.error('Error creating document:', error)
    throw error
  }

  await next()
}

/**
 * Gets a document from Master Data by ID
 */
export async function getDocument(ctx: Context, next: () => Promise<any>) {
  const {
    vtex: {
      route: { params },
    },
    clients: { masterData },
  } = ctx

  const { dataEntity, id } = params

  if (!dataEntity) {
    throw new UserInputError('Data entity is required')
  }

  if (!id) {
    throw new UserInputError('Document ID is required')
  }

  try {
    // Get query parameters
    const { fields = '' } = ctx.query

    // Convert fields string to array if it's not empty
    const fieldsArray = fields ? (fields as string).split(',') : []

    const response = await masterData.getDocumentMD(dataEntity as string, id as string, fieldsArray)

    if (!response) {
      throw new NotFoundError(`Document with ID ${id} not found`)
    }

    ctx.status = 200
    ctx.body = response
  } catch (error) {
    console.error('Error getting document:', error)
    throw error
  }

  await next()
}

/**
 * Updates a document in Master Data
 */
export async function updateDocument(ctx: Context, next: () => Promise<any>) {
  const {
    vtex: {
      route: { params },
    },
    clients: { masterData },
  } = ctx

  const { dataEntity, id } = params

  if (!dataEntity) {
    throw new UserInputError('Data entity is required')
  }

  if (!id) {
    throw new UserInputError('Document ID is required')
  }

  try {
    // Get query parameters
    const { schema } = ctx.query

    const body = await json(ctx.req)
    await masterData.updateDocumentMD(
      dataEntity as string,
      id as string,
      body,
      schema as string | undefined
    )

    // Since updateDocument now returns void, we'll just return a success message
    ctx.status = 200
    ctx.body = { message: 'Document updated successfully' }
  } catch (error) {
    console.error('Error updating document:', error)
    throw error
  }

  await next()
}

/**
 * Deletes a document from Master Data
 */
export async function deleteDocument(ctx: Context, next: () => Promise<any>) {
  const {
    vtex: {
      route: { params },
    },
    clients: { masterData },
  } = ctx

  const { dataEntity, id } = params

  if (!dataEntity) {
    throw new UserInputError('Data entity is required')
  }

  if (!id) {
    throw new UserInputError('Document ID is required')
  }

  try {
    await masterData.deleteDocumentMD(dataEntity as string, id as string)

    ctx.status = 204
    ctx.body = null
  } catch (error) {
    console.error('Error deleting document:', error)
    throw error
  }

  await next()
}

/**
 * Lists documents from Master Data with pagination
 */
export async function listDocuments(ctx: Context, next: () => Promise<any>) {
  const {
    vtex: {
      route: { params },
    },
    query,
    clients: { masterData },
  } = ctx

  const { dataEntity } = params
  const { page = '1', pageSize = '10', fields = '', where = '', sort = '', schema } = query

  if (!dataEntity) {
    throw new UserInputError('Data entity is required')
  }

  try {
    // Convert fields string to array if it's not empty
    const fieldsArray = fields ? (fields as string).split(',') : []

    const result = await masterData.listDocuments(
      dataEntity as string,
      parseInt(page as string, 10),
      parseInt(pageSize as string, 10),
      fieldsArray,
      where as string,
      sort as string,
      schema as string | undefined
    )

    const { data, pagination } = result

    // Set pagination headers for clients that might need them
    ctx.set('X-Total-Count', String(pagination.total))
    ctx.set('X-Page', String(pagination.page))
    ctx.set('X-Page-Size', String(pagination.pageSize))
    ctx.set(
      'Access-Control-Expose-Headers',
      'X-Total-Count, X-Page, X-Page-Size'
    )

    ctx.status = 200
    ctx.body = {
      data,
      pagination
    }
  } catch (error) {
    console.error('Error listing documents:', error)
    throw error
  }

  await next()
}
