export const getConfig = async (_: any, __: any, ctx: Context) => {
  const {
    clients: { apps },
    vtex: { logger },
  } = ctx;

  const appId = process.env.VTEX_APP_ID || '';

  try {
    return await apps.getAppSettings(appId);
  } catch (error) {
    logger.error({
      message: 'getConfig-getAppSettings-error',
      error,
    });
  }
};
