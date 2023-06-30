import { toString } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import db from '@db';
import { HttpError, InternalServerError, NotFoundError } from '@errors';
import { EtapaEntity } from '@types';

function handleError(err: unknown): never {
    if (err instanceof HttpError) {
        throw err;
    }
    const message = err instanceof Error ? err.message : toString(err);
    throw new InternalServerError(message);
}

export async function fetchEtapas(productId: string): Promise<EtapaEntity[]> {
    try {
        const etapaEntities = await db.etapas.findByProductId(productId);
        if (!etapaEntities) {
            throw new NotFoundError(`Could not find etapas with product ID ${productId}`);
        }

        return etapaEntities;
    } catch (err) {
        throw handleError(err);
    }
}

export async function createEtapa(etapaRequestData: any): Promise<any> {
    try {
        return await db.etapas.create({
            id: uuidv4(),
            ...etapaRequestData,
        });
    } catch (err) {
        throw handleError(err);
    }
}
