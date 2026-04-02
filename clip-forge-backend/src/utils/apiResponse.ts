export function successResponse(data: any) {
  return {
    success: true,
    data,
  };
}

export function errorResponse(message: string, code = "UNKNOWN_ERROR") {
  return {
    success: false,
    error: {
      message,
      code,
    },
  };
}
