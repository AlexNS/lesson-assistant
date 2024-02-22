import Models from '../../models/index.js';

export async function get(req, res) {
    const courses = await Models.Course.findAll();
    res.send(courses);
}
