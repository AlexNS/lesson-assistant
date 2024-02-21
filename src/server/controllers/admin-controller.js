import { ResourcesConfig } from "../config/config.js";
import bcrypt from 'bcrypt'
import jwt from 'jwt-simple';
import Models from '../models/index.js';
import { AuthConfig } from "../config/config.js";

export function main(req, res) {
    res.render('admin', { MainJsPath: ResourcesConfig.AdminMainJsPath, layout: './layouts/admin' });
}

export async function login(req, res) {
    const user = await Models.User.findOne({
        where: {
            login: req.body.login
        }
    });

    if (user) {
        bcrypt.compare(req.body.password, user.passwordHash, function(err, result) {
            if (result) {
                const jwtPayload = { 
                    id: user.id, 
                    expire: Date.now() + 1000 * 60 * 60 * 24 * 7
                }

                return res.send({ 
                    token: jwt.encode(jwtPayload, AuthConfig.jwtSecret),
                    userInfo: {
                        firstName: user.firstName,
                        lastName: user.lastName,
                        middleName: user.middleName,
                        email: user.email,
                    }
                });
            } else {
                res.sendStatus(401);
            }
        });
    } else {
        res.sendStatus(401);
    }
}