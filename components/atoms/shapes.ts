export interface Shape {
    id?: string,
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
    shapes: Array<Shape>,
}
