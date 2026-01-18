export interface GoogleDriveAccessor {
  /**
   * Descargar un fichero (por ejemplo anexos) desde Drive.
   */
  downloadFile(fileId: string): Promise<Buffer>;

  /**
   * Listar archivos dentro de una carpeta (útil si los formularios suben anexos).
   */
  listFilesInFolder(folderId: string): Promise<Array<{ id: string; name: string }>>;
}
