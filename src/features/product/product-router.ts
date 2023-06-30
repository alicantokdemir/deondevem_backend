import express from 'express';
import * as productController from '@features/product/product-controller';

const router = express.Router();

router.route('/').post(productController.createProduct);

router.route('/:id').get(productController.fetchProduct);

export default router;
