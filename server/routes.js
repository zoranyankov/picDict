const { Router } = require('express');
const router = Router();

const authController = require('./controllers/authController');
const picWordController = require('./controllers/picWordController');
const resultController = require('./controllers/resultController');


router.use('/auth', authController);
router.use('/api/picWords', picWordController);
router.use('/api/results', resultController);

// router.get('*', (req, res, next) => {
//     next({ status: 404, message: 'STILL DON\'T HAVE THIS PAGE' });
// })
// router.get('/', (req, res) => {
//     res.status(200).json({message: `Wellcome in Rest Api Root Endpoint \n Nothing to serve yet`});
// });

module.exports = router;