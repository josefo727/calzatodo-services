import type { InstanceOptions, IOContext } from '@vtex/api'
import { MasterData as VTEXMasterData } from '@vtex/api'

export default class MasterData extends VTEXMasterData {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(context, options)
  }

  /**
   * Creates a document in Master Data
   * @param dataEntity The data entity name
   * @param fields The object to be created
   * @param schema Optional schema name
   * @returns The created document response
   */
  public async createDocumentMD(
    dataEntity: string,
    fields: object,
    schema?: string
  ) {
    return super.createDocument({
      dataEntity,
      fields,
      schema,
    })
  }

  /**
   * Gets a document from Master Data by ID
   * @param dataEntity The data entity name
   * @param id The document ID
   * @param fields Optional fields to be returned
   * @returns The document
   */
  public async getDocumentMD<T>(
    dataEntity: string,
    id: string,
    fields: string[] = []
  ): Promise<T> {
    return super.getDocument({
      dataEntity,
      id,
      fields,
    })
  }

  /**
   * Updates a document in Master Data
   * @param dataEntity The data entity name
   * @param id The document ID
   * @param fields The object to be updated
   * @param schema Optional schema name
   * @returns Promise<void>
   */
  public async updateDocumentMD(
    dataEntity: string,
    id: string,
    fields: object,
    schema?: string
  ): Promise<void> {
    return this.updatePartialDocument({
      dataEntity,
      id,
      fields,
      schema,
    })
  }

  /**
   * Deletes a document from Master Data
   * @param dataEntity The data entity name
   * @param id The document ID
   */
  public async deleteDocumentMD(
    dataEntity: string,
    id: string
  ): Promise<void> {
    return super.deleteDocument({
      dataEntity,
      id,
    }).then(() => {})
  }

  /**
   * Lists documents from Master Data with pagination
   * @param dataEntity The data entity name
   * @param page The page number (starting from 1)
   * @param pageSize The page size
   * @param fields The fields to be returned (array of field names)
   * @param where The where clause (VTEX Master Data query syntax)
   * @param sort The sort clause (VTEX Master Data query syntax)
   * @param schema Optional schema name
   * @returns The list of documents with pagination info
   */
  public async listDocuments<T>(
    dataEntity: string,
    page: number = 1,
    pageSize: number = 10,
    fields: string[] = [],
    where: string = '',
    sort: string = '',
    schema?: string
  ) {
    return this.searchDocumentsWithPaginationInfo<T>({
      dataEntity,
      fields,
      where,
      pagination: {
        page,
        pageSize,
      },
      schema,
      sort,
    })
  }
}
