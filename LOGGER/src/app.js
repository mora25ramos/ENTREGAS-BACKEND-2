// Ejemplo de uso del logger en un endpoint
app.get('/loggerTest', (req, res) => {
    const logger = getLogger();
    logger.debug('This is a debug message');
    logger.http('This is an HTTP message');
    logger.info('This is an info message');
    logger.warning('This is a warning message');
    logger.error('This is an error message');
    logger.fatal('This is a fatal message');
    res.send('Logger test completed');
  });