const { Router } = require('express');


const picWordService = require('../services/picWordServices');
const checkPicWordInput = require('./helpers/checkPicWordInput');
const verifyToken = require('../middlewares/verifyToken');

const router = Router();

router.get('/', verifyToken, (req, res, next) => {
    const _id = req.user ? req.user._id : null;
    picWordService.getAll(req.query)
        .then(picWords => {
            picWords.forEach(c => c.isCreator = c.creatorId == _id);
            res.status(200).json(picWords);
        })
        .catch(err => {
            console.log('ingGetAllPicWordError');
            let errors;
            if (err.errors) {
                errors = Object.keys(err.errors).map(x => ({ message: err.errors[x].message }));
            } else {
                errors = { errors: [{ message: err.message }] };
            }
            console.log(errors);
            res.status(422).json({ errors, title: 'Get PicWord Page' });
            return;
        });
});

router.get('/categories', verifyToken, (req, res, next) => {
    const _id = req.user ? req.user._id : null;
    picWordService.getCategories(req.query)
        .then(picWords => {
            picWords.forEach(c => c.isCreator = c.creatorId == _id);
            res.status(200).json(picWords);
        })
        .catch(err => {
            console.log('ingGetAllCategoriesError');
            let errors;
            if (err.errors) {
                errors = Object.keys(err.errors).map(x => ({ message: err.errors[x].message }));
            } else {
                errors = { errors: [{ message: err.message }] };
            }
            console.log(errors);
            res.status(422).json({ ...errors, title: 'Get Categories Page' });
            return;
        });
});

router.get('/category/:cat', verifyToken, (req, res, next) => {
    const _id = req.user ? req.user._id : null;
    picWordService.getCategory(req.params.cat)
        .then(picWords => {
            picWords.forEach(c => c.isCreator = c.creatorId == _id);
            res.status(200).json(picWords);
        })
        .catch(err => {
            console.log('ingGetOneCategoryError');
            let errors;
            if (err.errors) {
                errors = Object.keys(err.errors).map(x => ({ message: err.errors[x].message }));
            } else {
                errors = { errors: [{ message: err.message }] };
            }
            console.log(errors);
            res.status(422).json({ errors, title: 'Get One Category Page' });
            return;
        });
});

router.get('/byUser/:userId', verifyToken, (req, res) => {
    const userId = req.params.userId;
    // const errors = req.errors;
    // if (errors && errors.errors.length > 0) {
    //     res.status(422).render('auth/login', { ...errors, title: 'Login page', username });
    //     // next(errors);
    //     return;
    // }
    console.log('inPicWord getOne by userId api route');
    picWordService.getOneByUserId(userId)
        .then((picWords) => {
            if (picWords.length === 0) {
                res.status(204).end();
                // res.status(204).json({errors : {message: "You haven't created any picWords yet"}});
                return;
            }
            res.status(302).json(picWords);
            return;
        })
        .catch(err => {
            let errors;
            console.log("inGetOneByUseIdError");
            if (err.errors) {
                errors = Object.keys(err.errors).map(x => ({ message: err.errors[x].message }));
            } else {
                errors = { errors: [{ message: err.message }] };
            }
            console.log(errors);
            res.status(422).json({ errors, title: 'Get One PicWord By User Id Page' });
            return err;
        });
});

router.post('/create', verifyToken, (req, res, next) => { //TODO: checkPicWordInput,

    const errors = req.errors;
    const newPicWord = req.body;

    // newPicWord.incorrect_answers = newPicWord.incorrect_answers.split(' / ')

    // if (errors && errors.errors.length > 0) {
    //     res.status(422).render('picWords/createPicWord', {...errors, ...req.body });
    //     // next(errors);
    //     return;
    // }
    picWordService.create({ ...newPicWord, creatorId: req.user._id, creatorName: req.user.name })
        .then(data => {
            console.log('PicWord created');
            res.status(201).json(data);
            return;
        })
        .catch(err => {
            let errors;
            console.log("inCreatePicWordError");
            if (err.errors) {
                errors = Object.keys(err.errors).map(x => ({ message: err.errors[x].message }));
            } else {
                errors = { errors: [{ message: err.message }] };
            }
            console.log(errors);
            res.status(422).json({ errors, title: 'Create PicWord Page' });
            return err;
        });
});

router.get('/:picWordId', verifyToken, (req, res) => {
    console.log(req.url);
    const picWordId = req.params.picWordId;
    // const errors = req.errors;
    // if (errors && errors.errors.length > 0) {
    //     res.status(422).render('auth/login', { ...errors, title: 'Login page', username });
    //     // next(errors);
    //     return;
    // }
    console.log('inPicWord getOne by picWordId api route');
    picWordService.getOne(picWordId)
        .then((picWord) => {
            res.status(302).json(picWord);
            return;
        })
        .catch(err => {
            let errors;
            console.log("inGetOneByPicWordIdError");
            if (err.errors) {
                errors = Object.keys(err.errors).map(x => ({ message: err.errors[x].message }));
            } else {
                errors = { errors: [{ message: err.message }] };
            }
            console.log(errors);
            res.status(422).json({ errors, title: 'Get One PicWord By PicWord Id Page' });
            return err;
        });
});


// router.get('/details/:prod_id', (req, res, next) => {
//     const _id = req.user ? req.user._id : null;
//     picWordService.getOnePopulated(req.params.prod_id)
//         .then((currentPicWord) => {
//             currentPicWord.isCreator = currentPicWord.creatorId == _id;
//             res.render('picWords/details', { ...currentPicWord });
//             return;
//         })
//         .catch(next);
// });

router.patch('/edit/:picWordId', verifyToken, (req, res, next) => {
    const errors = req.errors;
    const picWordId = req.params.picWordId;
    const newPicWord = req.body;
    console.log('inEdit');
    console.log(picWordId, newPicWord);

    // if (errors && errors.errors.length > 0) {
    //     res.status(422).render('picWords/editPicWord', { ...errors, _id: req.params.prod_id, ...req.body });
    //     // next(errors);
    //     return;
    // }
    picWordService.update(picWordId, { ...newPicWord })
        .then(picWord => {
            res.status(302).json(picWord);
            // console.log(data);
            // res.redirect(`/picWords/details/${data._id}`);
            return;
        })
        .catch(err => {
            let errors;
            console.log("inEditPicWordIdError");
            if (err.errors) {
                errors = Object.keys(err.errors).map(x => ({ message: err.errors[x].message }));
            } else {
                errors = { errors: [{ message: err.message }] };
            }
            console.log(errors);
            res.status(422).json({ errors, title: 'Edit PicWord By PicWord Id Page' });
            return err;
        });
});

router.delete('/delete/:picWordId', verifyToken, (req, res, next) => {
    console.log('inDelete');
    picWordService.removeOne(req.params.picWordId)
        .then((data) => {
            res.status(202).json(data);
            // res.render('picWords/deletePicWord', { ...data });
            return;
        })
        .catch(err => {
            let errors;
            console.log("inDeletePicWordIdError");
            if (err.errors) {
                errors = Object.keys(err.errors).map(x => ({ message: err.errors[x].message }));
            } else {
                errors = { errors: [{ message: err.message }] };
            }
            console.log(errors);
            res.status(422).json({ errors, title: 'Delete PicWord By PicWord Id Page' });
            return err;
        });
});

// router.get('/clearDB', (req, res, next) => {
//     picWordService.clear()
//         .then((data) => res.redirect('/picWords'))
//         .catch(next);
// });


module.exports = router;