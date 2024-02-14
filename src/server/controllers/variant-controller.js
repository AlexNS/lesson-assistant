import Models from '../models/index.js';

export async function index(req, res) {
    res.render('variant', { title: `Получение варианта`, layout: './layouts/main' })
}

export async function variant(req, res) {
    if (req.body.email) {
        const student = await Models.Student.findOne({
            where: {
                email: req.body.email
            }
        });
        
        if (student) {
            const variantNumber = student.id % 6 + 1;
            res.redirect(`/variant/thanks/${variantNumber}`);
            return;
        }
    }
   
    res.redirect('/variant/thanks/0');
}

export async function thanks(req, res) {
    const variantNumber = parseInt(req.params['variantNumber']);

    if (variantNumber != 0) {
        res.render('variant-thanks', { layout: './layouts/main', variantNumber });
    } else {
        res.render('variant-not-found', { layout: './layouts/main' });
    }
}