import { Server as HttpServer } from 'http';
import util from 'util';
import cors from 'cors';
import express from 'express';
import multer from 'multer';
import { json } from 'body-parser';
import helmet from 'helmet';
import { merge } from 'lodash';
import morgan from 'morgan';
import productRouter from '@features/product/product-router';
import { errorHandler, notFoundHandler } from '@middleware/errorHandlers';
import path from 'path';

export type Server = Omit<HttpServer, 'close'> & { close: () => Promise<void> };

export async function startServer({ port = process.env.PORT } = {}): Promise<Server> {
    const app = express();

    app.use('/uploads', express.static(__dirname + '/uploads'));

    app.use(cors());

    app.use(helmet());
    app.use(json());

    if (process.env.NODE_ENV !== 'test') {
        app.use(morgan(process.env.NODE_ENV !== 'production' ? 'dev' : 'common'));
    }

    app.use('/products', productRouter);

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path.join(__dirname, '/uploads/'));
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + '.jpeg');
        },
    });

    const upload = multer({ storage: storage });

    app.post('/upload', upload.single('file'), async (req: any, res) => {
        try {
            console.log('uploading...');
            console.log(req.file.filename);
            res.json({ file: req.file });
        } catch (error) {
            console.log(error);
        }
    });

    app.use(notFoundHandler);
    app.use(errorHandler);

    return new Promise((resolve) => {
        const server = app.listen(port, () => {
            console.log(`> server listening on port ${port}`);
            const close = util.promisify(server.close);
            resolve(merge(server, { close }));
        });
    });
}
