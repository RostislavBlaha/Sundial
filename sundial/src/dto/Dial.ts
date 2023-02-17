export interface DialDto {
    id: Number,
    name: String,
    annotations: AnnotationDto[],
    segments: SegmentDto[],
    levels: String[]
}

export interface AnnotationDto{
    id: Number,
    label: String,
    value: String
}

export interface SegmentDto {
    id: Number,
    name: String,
    level: Number
}

