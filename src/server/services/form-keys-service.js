import Models from '../models/index.js';

export const FormTypes = {
    REGISTER: 1,
    QUESTION: 2,
    ATTENDANCE: 3
}

const courseForms = [FormTypes.REGISTER, FormTypes.QUESTION];
const lessonForms = [FormTypes.ATTENDANCE];

async function getFormKey(formKeyString, formType) {
    return await Models.FormKey.findOne({ where: {
            key: formKeyString,
            formType: formType,
            active: true
        } 
    });
}

export async function getCourseByFormKey(formKeyString, formType) {
    if (courseForms.indexOf(formType) == -1) {
        throw new Error(`Form type ${formType} provided should not have Course associated with it`);
    }

    const formKey = await getFormKey(formKeyString, formType);

    if (formKey) {
        return await Models.Course.findByPk(formKey.entityId);
    }

    return null;
}

export async function getLessonByFormKey(formKeyString, formType) {
    if (lessonForms.indexOf(formType) == -1) {
        throw new Error(`Form type ${formType} provided should not have Lesson associated with it`);
    }

    const formKey = await getFormKey(formKeyString, formType);

    if (formKey) {
        return await Models.Lesson.findByPk(formKey.entityId);
    }

    return null;
}

export async function getFormKeyByEntityId(formType, entityId) {
    const formKey = await Models.FormKey.findOne({
      formType: formType,
      entityId: entityId
    });

    return formKey?.key;
}
