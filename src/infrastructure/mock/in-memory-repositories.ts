import { AprendizRepository } from '../../application/ports/repositories/aprendiz-repository';
import { ApoyoRepository } from '../../application/ports/repositories/apoyo-repository';
import { CasoRepository } from '../../application/ports/repositories/caso-repository';
import { EnvioRepository } from '../../application/ports/repositories/envio-repository';
import { Aprendiz } from '../../domain/entities/aprendiz';
import { Apoyo } from '../../domain/entities/apoyo';
import { Caso } from '../../domain/entities/caso';
import { Envio } from '../../domain/entities/envio';
import { Documento } from '../../domain/entities/documento';

export class InMemoryAprendizRepository implements AprendizRepository {
  private byId = new Map<string, Aprendiz>();
  private byDocumento = new Map<string, Aprendiz>();

  async save(aprendiz: Aprendiz): Promise<Aprendiz> {
    this.byId.set(aprendiz.id.value, aprendiz);
    this.byDocumento.set(aprendiz.documento.toString(), aprendiz);
    return aprendiz;
  }

  async findById(id: string): Promise<Aprendiz | null> {
    return this.byId.get(id) ?? null;
  }

  async findByDocumento(documento: Documento): Promise<Aprendiz | null> {
    return this.byDocumento.get(documento.toString()) ?? null;
  }
}

export class InMemoryApoyoRepository implements ApoyoRepository {
  private byId = new Map<string, Apoyo>();
  // index por documento+tipo
  private index = new Set<string>();

  async save(apoyo: Apoyo, aprendizDocumento: Documento): Promise<Apoyo> {
    this.byId.set(apoyo.id.value, apoyo);
    this.index.add(`${aprendizDocumento.toString()}::${apoyo.tipo}`);
    return apoyo;
  }

  async findById(id: string): Promise<Apoyo | null> {
    return this.byId.get(id) ?? null;
  }

  async existsByDocumentoAndTipo(documento: Documento, tipo: string): Promise<boolean> {
    return this.index.has(`${documento.toString()}::${tipo}`);
  }
}

export class InMemoryCasoRepository implements CasoRepository {
  private byId = new Map<string, Caso>();

  async save(caso: Caso): Promise<Caso> {
    this.byId.set(caso.id.value, caso);
    return caso;
  }

  async findById(id: string): Promise<Caso | null> {
    return this.byId.get(id) ?? null;
  }

  async listPending(): Promise<Caso[]> {
    return Array.from(this.byId.values()).filter((c) => c.estado === 'PENDIENTE');
  }
}

export class InMemoryEnvioRepository implements EnvioRepository {
  private byId = new Map<string, Envio>();

  async save(envio: Envio): Promise<Envio> {
    this.byId.set(envio.id.value, envio);
    return envio;
  }

  async findById(id: string): Promise<Envio | null> {
    return this.byId.get(id) ?? null;
  }

  async listRecent(limit = 10): Promise<Envio[]> {
    return Array.from(this.byId.values()).slice(-limit).reverse();
  }
}
