const { Router } = require('express');


const resultService = require('../services/resultServices');
// const { isCreator } = require('../middlewares/guards');
// const checkResultsInput = require('./helpers/checkResultsInput');
const verifyToken = require('../middlewares/verifyToken');

const router = Router();

router.get('/:userId', verifyToken, (req, res) => {
    const userId = req.params.userId;
    // const errors = req.errors;
    // if (errors && errors.errors.length > 0) {
    //     res.status(422).render('auth/login', { ...errors, title: 'Login page', username });
    //     // next(errors);
    //     return;
    // }
    resultService.getAllByUserId(userId)
        .then((results) => {
            if (results.length === 0) {
                res.status(204).end();
                return;
            }
            res.status(302).json(results);
            return;
        })
        .catch(err => {
            console.log('inGetAllResultByUserIdError');
            let errors;
            if (err.errors) {
                errors = Object.keys(err.errors).map(x => ({ message: err.errors[x].message }));
            } else {
                errors = { errors: [{ message: err.message }] };
            }
            console.log(errors);
            res.status(422).json({ errors, title: 'Get All Result By User Id Page' });
            return;
        });
});


// router.get('/', verifyToken, (req, res, next) => {
//     const _id = req.user ? req.user._id : null;
//     picWordService.getAll(req.query)
//         .then(picWords => {
//             picWords.forEach(c => c.isCreator = c.creatorId == _id);
//             res.status(200).json(picWords);
//         })
//         .catch(err => {
//             console.log('ingGetAllResulError');
//             let errors;
//             if (err.errors) {
//                 errors = Object.keys(err.errors).map(x => ({ message: err.errors[x].message }));
//             } else {
//                 errors = { errors: [{ message: err.message }] };
//             }
//             console.log(errors);
//             res.status(422).json({ ...errors, title: 'Get All Result Page' });
//             return;
//         });
// });

router.post('/add', verifyToken, (req, res, next) => { //TODO: checkResultsInput,

    // const { creatorId, quizName, userResults, score } = req.body;
    const { creatorId, userResults, score } = req.body;
    // let newResult = { quizName, userResults, score, creatorId};
    let newResult = { userResults, score, creatorId};
    // const errors = req.errors;
    // const newPicWord = req.body;

    // newPicWord.incorrect_answers = newPicWord.incorrect_answers.split(' / ')

    // // if (errors && errors.errors.length > 0) {
    // //     res.status(422).render('picWords/createPicWord', {...errors, ...req.body });
    // //     // next(errors);
    // //     return;
    // // }
    resultService.createResult(newResult)
        .then(data => {
            console.log('Result created');
            res.status(201).json(data);
            return;
        })
        .catch(err => {
            console.log('inCreateResutlError');
            let errors;
            if (err.errors) {
                errors = Object.keys(err.errors).map(x => ({ message: err.errors[x].message }));
            } else {
                errors = { errors: [{ message: err.message }] };
            }
            console.log(errors);
            res.status(422).json({ errors, title: 'Get Create Result Page' });
            return;
        });
});

// router.get('/delete/:prod_id', isCreator, (req, res, next) => {
//     picWordService.getOnePopulated(req.params.prod_id)
//         .then((data) => {
//             res.render('picWords/deletePicWord', { ...data });
//             return;
//         })
//         .catch(next);
// });
// router.post('/delete/:prod_id', isCreator, (req, res, next) => {
//     picWordService.removeOne(req.params.prod_id)
//         .then((data) => res.redirect('/picWords'))
//         .catch(next);
// });
// router.get('/clearDB', (req, res, next) => {
//     picWordService.clear()
//         .then((data) => res.redirect('/picWords'))
//         .catch(next);
// });


module.exports = router;