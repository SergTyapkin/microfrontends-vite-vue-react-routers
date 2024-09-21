export const TEXT_STAGE_START = new Date('2024-09-15T07:00:00.000Z');
export const MK_SEC_REGISTRATION_START = TEXT_STAGE_START;
export const TEXT_STAGE_END = new Date('2024-09-22T20:59:59.999Z');
export const MAIN_STAGE_START = new Date('2024-09-23T07:00:00.000Z');
export const MK_SEC_START = new Date('2024-09-24T07:00:00.000Z');
export const MAIN_STAGE_END = new Date('2024-09-25T20:59:59.999Z');


export const Pages = {
  taskSelecting: 'taskSelecting',
  taskAdding: 'taskAdding',
  taskFinished: 'taskFinishedPlug',
  defaultWorkspace: 'defaultWorkspace',
  openShift: 'openShift',
}

export const ContainerStates = {
  empty: 0,
  onPlace: 1,
}

export const BoxStates = {
  debugNone: -1,
  empty: 0,
  selectedToLink: 1,
  linked: 2,
  withOrder: 3,
}

export const headerHeight = 80;

export const ErrorCodes = {
  userNotFound: 0,
  goodsNotFound: 4,
}

export const IMAGES_MAX_RES = 720;

export const HTTP = {
  OK: 200,
  CREATED: 201,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  CONFLICT: 409,
  GONE: 410,
  IM_A_TEAPOT: 418,
  LOCKED: 423,
}

export const AnswerTypeIds = {
  text: 0,
  photo: 1,
  textPhoto: 2,
  QR: 3,
  another: 4,
}

export const TaskTypeIds = {
  text: 0,
  image: 1,
  video: 2,
}
