import { toString } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import db from '@db';
import { makeProduct } from '@features/product/product-helpers';
import { HttpError, InternalServerError, NotFoundError } from '@errors';
import { Product } from '@types';

function handleError(err: unknown): never {
    if (err instanceof HttpError) {
        throw err;
    }
    const message = err instanceof Error ? err.message : toString(err);
    throw new InternalServerError(message);
}

export async function fetchProduct(id: string): Promise<Product> {
    try {
        const productEntity = await db.products.findById(id);
        if (!productEntity) {
            throw new NotFoundError(`Could not find product with ID ${id}`);
        }
        const etapas = await db.etapas.findByProductId(id);
        return makeProduct(productEntity, etapas);
    } catch (err) {
        throw handleError(err);
    }
}

export async function createProduct(postRequestData: any): Promise<Product> {
    try {
        const postEntity = await db.products.create({
            id: uuidv4(),
            ...postRequestData,
        });
        return makeProduct(postEntity, []);
    } catch (err) {
        throw handleError(err);
    }
}
