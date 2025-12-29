export class CodedError extends Error {
  constructor(code, message) {
    super(message);
    this.code = code;
    this.name = 'CodedError';
  }
}

export class UnavailabilityError extends Error {
  constructor(moduleName, message) {
    super(message || `${moduleName} is not available`);
    this.name = 'UnavailabilityError';
  }
}

export const PermissionStatus = {
  DENIED: 'denied',
  GRANTED: 'granted',
  UNDETERMINED: 'undetermined',
};

export const createPermissionHook = (permissionType) => {
  return () => [
    { status: PermissionStatus.GRANTED, canAskAgain: true, granted: true },
    () => Promise.resolve({ status: PermissionStatus.GRANTED, canAskAgain: true, granted: true }),
  ];
};

export const requireNativeModule = () => ({});

export const NativeModulesProxy = {};

export default {
  CodedError,
  UnavailabilityError,
  PermissionStatus,
  createPermissionHook,
  requireNativeModule,
  NativeModulesProxy,
};
