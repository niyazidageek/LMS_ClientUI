import * as Yup from 'yup';

const profileSettingsSchema = Yup.object().shape(
    {

        name: Yup.string()
            .min(5, 'Should be 5 character long!')
            .max(15, 'Should not exceed 15 characters!')
            .required('Required!'),

        surname: Yup.string()
            .min(5, 'Should be 5 character long!')
            .max(15, 'Should not exceed 15 characters!')
            .required('Required!'),

        bio: Yup.string()
        .min(5, 'Should be 5 character long!')
        .max(50, 'Should not exceed 50 characters!')
    }
);

export default profileSettingsSchema;