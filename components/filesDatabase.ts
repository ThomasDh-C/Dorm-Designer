import Dexie from 'dexie';
import { Shape } from './atoms/shapes';

export class FilesDatabase extends Dexie {
    // Declare implicit table properties.
    // (just to inform Typescript. Instanciated by Dexie in stores() method)
    files: Dexie.Table<IFile, string>; // number = type of the primkey
    //...other tables goes here...

    constructor () {
        super("FilesDatabase");
        this.version(1).stores({
            files: "id, floorplan, name, scale, occupancy, shapes"
        });
        // The following line is needed if your typescript
        // is compiled using babel instead of tsc:
        this.files = this.table("files");
    }
}

interface IFile {
    floorplan: string,
    name: string,
    id: string,
    scale: number,
    occupancy: number,
    shapes: Array<Shape>,
}