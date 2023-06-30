import { IDatabase } from 'pg-promise';
import { EtapaEntity } from '@types';

export default class EtapaRepository {
    constructor(private db: IDatabase<any>) {}

    async findByProductId(productId: string): Promise<EtapaEntity[]> {
        const etapas = await this.db.any<EtapaEntity>(
            'SELECT * FROM etapas e WHERE e.product_id = $1',
            productId,
        );
        return etapas;
    }

    async create(etapaRequestData: any): Promise<boolean> {
        await this.db.one<{ id: string }>(
            'INSERT INTO etapas (product_id, descricao, media_url) ' +
                'VALUES (${product_id}, ${descricao}, ${media_url}) ' +
                'RETURNING id',
            etapaRequestData,
        );
        return true;
    }
}
