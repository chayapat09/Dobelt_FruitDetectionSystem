export const NORMAL = 0;
export const DEFECTED = 1;

import fs from 'fs-extra'

import {PythonShell} from 'python-shell';
let pyshell = new PythonShell('./src/service/AI/Result.py');

export const predictionService = async (imageFile : Express.Multer.File , selectedModelId : string) => {
    const fileBuffer = imageFile.buffer;
    const FN = imageFile.originalname.split('.');
    const ext = FN[FN.length - 1];
    await fs.writeFile(`./src/service/AI/fromPiCamera/img.${ext}` , fileBuffer);
    const res = await new Promise<string>((resolve :any , reject : any) => {
        const fn = (message : string) => {
            // received a message sent from the Python script (a simple "print" statement)
            pyshell.off('message',fn);
            resolve(message);
        };
        pyshell.on('message', fn);
        pyshell.send('h');
        setTimeout(() => {
            reject();
        },10000)
    }).catch(err => {
        throw Error('Prediction Error!');
    })

    console.log(res);
    if (res === 'Cat Coin') return 0;
    return 1

}