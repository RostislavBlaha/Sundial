export interface DialDto {
    id: number,
    name: string,
    annotations: AnnotationDto[],
    segments: SegmentDto[],
    levels: string[]
}

export interface AnnotationDto{
    id: Number,
    label: String,
    value: String
}

export interface SegmentDto {
    id: number,
    name: string,
    level: number
}

