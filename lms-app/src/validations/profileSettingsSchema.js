import * as Yup from 'yup';

const profileSettingsSchema = Yup.object().shape(
    {

        name: Yup.string()
            .min(5, 'Should be 5 character long!')
            .max(150, 'Should not exceed 150 characters!')
            .required('Required!'),

        surname: Yup.string()
            .min(5, 'Should be 5 character long!')
            .max(150, 'Should not exceed 150 characters!')
            .required('Required!'),

        bio: Yup.string()
        .min(5, 'Should be 5 character long!')
        .max(250, 'Should not exceed 250 characters!')
    }
);

export default profileSettingsSchema;