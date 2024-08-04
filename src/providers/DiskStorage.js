import fs from 'fs';
import path from 'path';
import { TMP_FOLDER, UPLOADS_FOLDER } from '../configs/upload.js';

export default class DiskStorage{
    async saveFile(file){
        await fs.promises.rename(
            path.resolve(TMP_FOLDER, file),
            path.resolve(UPLOADS_FOLDER, file)
        );

        return file;
    }

    async deleteFile(file){
        const filePath = path.resolve(UPLOADS_FOLDER, file);

        try{
            await fs.promises.stat(filePath);
        } catch {
            return;
        }

        await fs.promises.unlink(filePath);
    }
}
