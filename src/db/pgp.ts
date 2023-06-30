import pgPromise, { IInitOptions, IDatabase } from 'pg-promise';
import EtapaRepository from '../features/etapa/EtapaRepository';
import ProductRepository from '../features/product/ProductRepository';

interface Extensions {
    products: ProductRepository;
    etapas: EtapaRepository;
}

export type ExtendedProtocol = IDatabase<Extensions> & Extensions;

const initOptions: IInitOptions<Extensions> = {
    extend(protocolObj: ExtendedProtocol) {
        protocolObj.etapas = new EtapaRepository(protocolObj);
        protocolObj.products = new ProductRepository(protocolObj);
    },
    receive(data) {
        return data;
    },
};

const pgp = pgPromise(initOptions);

export default pgp;
