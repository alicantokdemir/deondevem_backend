import { pick } from 'lodash';
import { EtapaEntity, Product, ProductEntity } from '../../types';

export function makeProduct(data: ProductEntity, etapas: EtapaEntity[]): Product {
    return {
        ...pick(data, [
            'id',
            'nome',
            'plantada_no',
            'plantada_na_data',
            'created_at',
            'updated_at',
        ]),
        etapas,
    };
}
