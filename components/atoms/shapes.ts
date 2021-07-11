export interface Shape {
    id?: number,
    shape: string,
    imagename?: string,
    x: number,
    y: number,
    relx?: number,
    rely?: number,
    shapescale?: number,
    resizable?: boolean,
    width?: number,
    height?: number,
    rotation?: number,
    fill?: string,
}

export interface MapFile {
    floorplan: string, 
    name: string, 
    id: string, 
    scale: number,
    occupancy: number,
    shape?: Array<Shape>,
}

export const initialShapes: Array<Shape> = [
    {
        id: 0,
        shape: 'img',
        imagename: 'thirtytwofoot',
        x: 10,
        y: 10,
        shapescale: 1,
        resizable: true,
    },
]

export const standardFurniture = (x: number, y: number): Array<Shape> => {
    return (
        [
            {
                shape: 'img',
                imagename: 'bed',
                x: x,
                y: y,
                rotation: 90,
            },
            {
                shape: 'img',
                imagename: 'bookshelf',
                x: x,
                y: y,
                rotation: 90,
            },
            {
                shape: 'img',
                imagename: 'chair',
                x: x,
                y: y,
                rotation: 90,
            },
            {
                shape: 'img',
                imagename: 'desk',
                x: x,
                y: y,
                rotation: 90,
            },
            {
                shape: 'img',
                imagename: 'dresser',
                x: x,
                y: y,
                rotation: 90,
            },
            {
                shape: 'img',
                imagename: 'wardrobe',
                x: x,
                y: y,
                rotation: 90,
            },

        ]
    )
}