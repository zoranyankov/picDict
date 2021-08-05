const PicWord = require('../models/PicWord');


function create(data) {
    return new PicWord(data).save();
}

async function getOneByUserId(userId) {
    // user = user.toLowerCase(); // first option
    return PicWord.find({ creatorId: userId })
        .then((results) => {
            if (!results) {
                // return { errors: [{ message: 'Wrong User or Password!' }] };
                return { error : { message: 'Wrong User or Password!' }};
                // return false;
            }
            return results;
        })
}

// function clear() {
//     return PicWord.deleteMany({});
// }

async function getAll(query) {
    let { search, from, to } = query;
    if (search || from || to) {
        from = from || Number.MIN_SAFE_INTEGER;
        to = to || Number.MAX_SAFE_INTEGER;
        let patt = new RegExp(search, 'i');
        let founded = PicWord.find({ $and: [{ name: patt }, { difficulty: { $gte: from } }, { difficulty: { $lte: to } }], }).lean();
        return (founded);
    }
    return PicWord.find({}).lean();
}

async function getCategories(query) {
    let founded = PicWord.find({}).select('category creatorId').lean();
    return (founded);
}

async function getCategory(cat) {
    let founded = PicWord.find({category: cat}).lean();
    return (founded);
}

function getOne(_id) {
    return PicWord.findById(_id).lean();
}

// function getOneDetailed(picWordId, userId) {
//     return PicWord
//         .findById(picWordId)
//         .lean()
//         .then((currentPicWord) => {
//             currentPicWord.isCreator = currentPicWord.creatorId == userId;
//             currentPicWord.noSeats = Boolean(currentPicWord.seats <= 0);
//             currentPicWord.isJoined = Boolean(currentPicWord.buddies.some(x => x == userId));
//             currentPicWord.buddiesData = currentPicWord.buddiesData.length > 0 ? currentPicWord.buddiesData.join(', ') : '. . . . .';
//             return currentPicWord;
//         })
// }

// function getOnePopulated(_id) {
//     return PicWord.findById(_id).populate('accessories').lean();
// }

// function edit(_id) {
//     return PicWord.findById(_id).populate('accessories').lean();
// }

function update(picWordId, data) {
    return PicWord.findByIdAndUpdate(picWordId, data).populate('accessories').lean();
}

function removeOne(picWordId) {
    return PicWord.findByIdAndRemove(picWordId);
}

module.exports = {
    create,
    getAll,
    getOneByUserId,
    getOne,
    // clear,
    // getOnePopulated,
    // edit,
    removeOne,
    update,
    // getOneDetailed,
    getCategories,
    getCategory,
};