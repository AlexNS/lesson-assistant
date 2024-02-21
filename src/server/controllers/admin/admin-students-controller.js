import Models from '../../models/index.js';

export async function get(req, res) {
    const students = await Models.Student.findAll();
    res.send(students);
}
