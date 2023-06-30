import { Request, Response, NextFunction } from 'express';

export type MiddlewareFunc = (
    req: Request,
    res: Response,
    next: NextFunction,
) => void | Promise<void>;

export interface EtapaEntity {
    id: string;
    product_id: string;
    descricao: string;
    media_url: Date;
}

export type Etapa = EtapaEntity;

export interface Product extends ProductEntity {
    etapas: Etapa[];
}

export interface ProductEntity {
    id: string;
    nome: string;
    plantada_no: string;
    plantada_na_data: Date;
    created_at: Date;
    updated_at: Date;
}

export interface PaginationOptions {
    limit: number;
    lastCreatedAt: Date;
    order: 'ASC' | 'DESC';
}
