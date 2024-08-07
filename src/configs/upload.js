import path from 'path';
import url from 'url';
import multer from 'multer';
import crypto from 'crypto';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
export const TMP_FOLDER = path.resolve(__dirname, '..', '..', 'tmp');
export const UPLOADS_FOLDER = path.resolve(TMP_FOLDER, 'uploads');

export const MULTER = {
    storage: multer.diskStorage({
        destination: TMP_FOLDER,
        filename(request, file, callback){
            const fileHash = crypto.randomBytes(10).toString("hex");
            const fileName = `${fileHash}-${file.originalname}`;

            return callback(null, fileName);
        }
    })
};

