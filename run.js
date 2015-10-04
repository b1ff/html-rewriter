const job = require('./index');
job.refactorAllInDirectory(process.argv[2], [
    require('./rewriters/labelRewriter')
]);