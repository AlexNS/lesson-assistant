import Models from '../../models/index.js';

export async function get(req, res) {
    const questions = await Models.Question.findAll({
        where: { resolved: false },
        order: [ ['createdAt', 'DESC']] 
    });
    res.send(questions);
}
