module.exports = function (mongoose) {

    var BookmarkSchema = new mongoose.Schema({
        grouptitle: String
        , list: [{
            siteurl: String
            , sitename: String
        }]
    });

    var Bookmark = mongoose.model('Bookmark', BookmarkSchema);

    var registerCallback = function (res, err) {
        if (err) {
            return console.log(err);
        };
    }


    var returnList = function (res) {
        Bookmark.find({}, function (err, docs) {
            res.render('index', {
                title: 'My Bookmark Applications'
                , list: docs
            });

        });


    };
    var updateList = function (res, id, childid, name, site) {


        Bookmark.findOneAndUpdate({
                'list._id': id
            }, {
                '$set': {
                    'list.$.siteurl': site
                    , 'list.$.sitename': name
                }
            }, {
                safe: true
            }
            , function (err, model) {
                if (err) {
                    console.log(err);
                    res.json({
                        msg: 'Error in modifying the Bookmark'
                    });
                } else {
                    console.log("Successfully modifying");
                    res.json({
                        msg: 'Successfully modifying'
                    });
                }
            }
        );

    };
    var removeList = function (res, id, childid) {


        Bookmark.findOneAndUpdate({
                _id: id
            }, {
                $pull: {
                    list: {
                        _id: childid
                    }
                }
            }, {
                safe: true
            }
            , function (err, model) {
                if (err) {
                    console.log(err);
                    res.json({
                        msg: 'Error in removing the Bookmark'
                    });
                } else {
                    console.log("Successfully removed");
                    res.json({
                        msg: 'Successfully removed'
                    });
                }
            }
        );

    };
    var addList = function (res, type, name, site) {


        Bookmark.update({
                grouptitle: type
            }, {
                $push: {
                    list: {
                        siteurl: site
                        , sitename: name
                    }
                }
            }, {
                upsert: true
            }
            , function (err, model) {
                if (err) {
                    console.log(err);
                    res.json({
                        msg: 'Error in Adding the Bookmark'
                    });
                } else {
                    console.log("Successfully added");
                    res.json({
                        msg: 'Successfully added'
                    });
                }
            }
        );

    };
    return {
        removeList: removeList
        , returnList: returnList
        , addList: addList
        , updateList: updateList
    }
}