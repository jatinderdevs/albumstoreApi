const User = require('../models/user');


const bcrypt = require('bcryptjs');



exports.postregister = async (req, res, next) => {

    const { username, email, Cpassword } = req.body;

    const isexist = await User.findOne({ username: username });

    if (isexist) {
        return res.status(400).send('user already exists')
    }
    const hashpassword = await bcrypt.hash(Cpassword, 12);
    const user = new User({
        username: username,
        email: email,
        password: hashpassword,
    });
    await user.save();

    return res.send(user);


}

exports.postsignin = async (req, res, next) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username: username });

    if (!user) {
        return res.status(400).send('Invalid username/password ');

    }
    const ismatch = await bcrypt.compare(password, user.password);
    if (!ismatch) {

        return res.status(400).send('Invalid username/password ');
    }
    if (user.isadmin) {
        return res.send("admin");
    }
    const token = user.getJwtToken();

    return res.send(token);
}


