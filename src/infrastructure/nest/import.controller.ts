import { Controller, Post, Body, Inject } from '@nestjs/common';
import { PROCESAR_POSTULACION } from '../../application/ports/external/tokens';
import { ProcesarPostulacion } from '../../application/use-cases/procesar-postulacion';

type ImportDto = {
  spreadsheetId: string;
  range?: string;
};

@Controller()
export class ImportController {
  constructor(
    @Inject(PROCESAR_POSTULACION)
    private readonly procesar: ProcesarPostulacion,
  ) {}

  @Post('import')
  async import(@Body() body: ImportDto) {
    const { spreadsheetId, range } = body;
    const result = await this.procesar.execute(spreadsheetId, range);
    return result;
  }
}
