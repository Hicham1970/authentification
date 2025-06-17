import * as Yup from "yup"

export const schemaArticle = Yup.object().shape({
    title: Yup.string().trim().required("Le titre est obligatoire"),
    description: Yup.string().trim().required("Le contenu est obligatoire"),
    image: Yup.string(),
})