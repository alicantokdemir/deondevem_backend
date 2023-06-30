import { Request, Response } from 'express';
import { pick } from 'lodash';
import * as productService from '../../features/product/product-service';
import * as etapaService from '../../features/etapa/etapa-service';
import asyncWrapper from '../../middleware/asyncWrapper';

export const fetchProduct = asyncWrapper(async (req: Request, res: Response): Promise<void> => {
    const product = await productService.fetchProduct(req.params.id);
    res.json(product);
});

export const createProduct = asyncWrapper(async (req: Request, res: Response): Promise<void> => {
    const productRequestData = pick(req.body, ['nome', 'plantada_no', 'plantada_na_data']);
    const etapaRequestData = req.body.etapas;
    const product = await productService.createProduct(productRequestData);
    for (const etapa of etapaRequestData) {
        await etapaService.createEtapa({ ...etapa, product_id: product.id });
    }

    res.status(201).json({ id: product.id });
});
