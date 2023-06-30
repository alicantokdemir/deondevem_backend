import { IDatabase } from 'pg-promise';
import { ProductEntity } from '@types';

export default class PostRepository {
    constructor(private db: IDatabase<any>) {}

    async findById(id: string): Promise<ProductEntity | null> {
        const product = await this.db.oneOrNone<ProductEntity>(
            'SELECT * FROM products p WHERE p.id = $1',
            id,
        );
        return product;
    }

    async create(productRequestData: any): Promise<ProductEntity> {
        const { id } = await this.db.one<{ id: string }>(
            'INSERT INTO products (nome, plantada_no, plantada_na_data) ' +
                'VALUES (${nome}, ${plantada_no}, ${plantada_na_data}) ' +
                'RETURNING id',
            productRequestData,
        );
        const result = await this.findById(id);
        return result!;
    }
}
