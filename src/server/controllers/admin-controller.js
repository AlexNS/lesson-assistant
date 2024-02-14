import { ResourcesConfig } from "../config/config.js";

export function main(req, res) {
    res.render('admin', { MainJsPath: ResourcesConfig.AdminMainJsPath, layout: './layouts/admin' });
}

