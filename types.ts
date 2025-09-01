
export enum PipelineStep {
  ACQUISITION = 'Data Acquisition',
  PREPROCESSING = 'Preprocessing',
  SEGMENTATION = 'Segmentation',
  CLASSIFICATION = 'Classification',
  TRACKING = 'Object Tracking & Prediction',
}

export interface Point {
  x: number;
  y: number;
}
