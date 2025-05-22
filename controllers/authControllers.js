const User = require("../models/User");
const jwt = require('jsonwebtoken');

const MAXAGE = 3 * 24 * 60 * 60;

// Handle Errors
const handleErrors = (err) => {
    // Error code only exists on unique email
    // console.log(err.message, err.code);
    let errors = { email: "", password: "" };

    // Duplicate error code
    if (err.code === 11000) {
        errors.email = "That user is already registered";
        return errors
    }

    // validation errors
    if (err.message.includes("user validation failed")) {
        // get both the error values for both the fields
        Object.values(err.errors).forEach(({ properties }) => {
            // Todo : Brilliant way to copy a json object to another by using for each
            errors[properties.path] = properties.message
        })
    }

    if (err.message==="incorrect email") {
        errors.email = "Incorrect Email or User Not Registered";
    }

    if (err.message==="incorrect password") {
        errors.password = "Incorrect Password";
    }

    return errors;
};

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWTSECRET, {
        expiresIn : MAXAGE
    })
}

module.exports.signup_post = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Todo: User Fix
        const user = await User.create({ email, password });
        const token = createToken(user._id);
        res.cookie('jwt', token, {httpOnly:true, maxAge : MAXAGE * 1000  });
        res.status(201).json({user : user._id});
    } catch (err) {
        const errors = handleErrors(err);
        //Todo: becomes variable.error in backend
        res.status(400).send({ errors });
    }
};

module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Todo: User Fix
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, {httpOnly:true, maxAge : MAXAGE * 1000  });
        res.status(200).json({ user:user._id })
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors })
    }
};

module.exports.logout_get = (req, res) => {
    res.cookie('jwt', '', {maxAge: 1});
    res.redirect('/');
}
