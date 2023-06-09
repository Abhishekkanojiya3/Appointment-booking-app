const firebase = require('../db');
const jwt = require('jsonwebtoken');
const config = require('../config');
// signup
exports.signup = (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(422).json({
            email: "email is required",
            password: "password is required",
        });
    }
    firebase
        .auth()
        .createUserWithEmailAndPassword(req.body.email, req.body.password)
        .then((data) => {
            return res.status(201).json(data);
        })
        .catch(function(error) {
            let errorCode = error.code;
            let errorMessage = error.message;
            if (errorCode == "auth/weak-password") {
                return res.status(500).json({ error: errorMessage });
            } else {
                return res.status(500).json({ error: errorMessage });
            }
        });
};
// signin
exports.signin = (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(422).json({
            email: "email is required",
            password: "password is required",
        });
    }
    firebase
        .auth()
        .signInWithEmailAndPassword(req.body.email, req.body.password)
        .then((userCredential) => {
            const user = userCredential.user;

            // Generate JWT token with user-specific data
            const token = jwt.sign({ uid: user.uid, email: user.email }, 'secretkey');

            return res.status(200).json({ user, token });
        })
        .catch(function(error) {
            let errorCode = error.code;
            let errorMessage = error.message;
            if (errorCode === "auth/wrong-password") {
                return res.status(500).json({ error: errorMessage });
            } else {
                return res.status(500).json({ error: errorMessage });
            }
        });
};
exports.verifyEmail = (req, res) => {
    firebase
        .auth()
        .currentUser.sendEmailVerification()
        .then(function() {
            return res.status(200).json({ status: "Email Verification Sent!" });
        })
}