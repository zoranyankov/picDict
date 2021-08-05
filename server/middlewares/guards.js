const picWordService = require('../services/picWordServices');

// const isPicWordCreator = (req, res, next) => {
//         picWordService.getOne(req.params._id)
//             .then(picWord => {
//                 if (picWord.creatorId !== req.user._id) {
//                     // res.redirect(`/picWords/details/${req.params._id}`); // another option
//                     res.redirect(`/picWords`);
//                     return;
//                 }
//                 next();
//             })
//         .catch(err => console.log('Error : ' + err));
//     }

// const isCreator = (req, res, next) => {
//     const picWordId = req.params.prod_id;
//     picWordService.getOne(picWordId)
//         .then(picWord => {
//             if (picWord.creatorId !== req.user._id) {
//                 if ((req.path).match('remove')) {
//                     // let prod_id = req.path.split('/')[1]; // first try
//                     res.redirect(`/picWords/details/${picWordId}`);
//                     return;
//                 }
//                 // res.redirect(`/picWords/details/${req.params._id}`); // another option
//                 res.redirect(`/picWords`);
//                 return;
//             }
//             next();
//         })
//         .catch(err => console.log('Error : ' + err));
// }

module.exports = {
    // isPicWordCreator,
}